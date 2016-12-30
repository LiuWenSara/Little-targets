 var tasks = angular.module('todo', ['ionic'])

 tasks.config(function($httpProvider) {});

 tasks.run(function($ionicPlatform) {
   $ionicPlatform.ready(function() {
     if (window.cordova && window.cordova.plugins.Keyboard) {
       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
     }
     if (window.StatusBar) {
       StatusBar.styleDefault();
     }
   });
 });

 tasks.controller('TodoTask', function($scope, $http, $timeout, $interval, $ionicModal, $ionicSideMenuDelegate, $ionicPopup) {

   // Create our modal
   $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
     $scope.taskModal = modal;
   }, {
     scope: $scope
   });

   $ionicModal.fromTemplateUrl('concenter.html', function(modal) {
     $scope.concenterModal = modal;
   }, {
     scope: $scope
   });

   //$http的post传送的参数是JSON格式的，php后端获取的是JSON数据，不能用$POST_['...']
   $scope.tasks = [];
   //读取数据库数据
   $http.get('./phps/tgs_read.php')
     .success(function(resp) {
       $scope.tasks = resp;
       angular.forEach($scope.tasks, function(task) {
         task.done = task.done == 1 ? true : false;
       });

       $timeout(function() {
         if ($scope.tasks.length == 0) {
           while (true) {
             var taskContent = prompt('请输入您的第一个小目标：');
             if (taskContent) {
               $http.post('./phps/tgs_insert.php', {
                   id: $scope.tasks.length + 1,
                   data: taskContent,
                   done: false,
                 })
                 .success(function(resp) {
                   if (resp.success) {
                     $scope.tasks.push({
                       content: taskContent,
                       done: false,
                     });
                   } else {
                     console.log(resp);
                   }
                 });
               break;
             }
           }
         }
       });
     });

   //储存完成状态
   $scope.change = function(task) {
     $scope.task_count = $scope.tasks.indexOf(task) + 1;
     $scope.task_done = task.done;
     $http.post('./phps/tgs_change.php', {
       check: $scope.task_count,
       done: $scope.task_done
     });
   };

   //添加新目标
   $scope.createTask = function(task) {
     $http.post('./phps/tgs_insert.php', {
         id: $scope.tasks.length + 1,
         data: task.content,
         done: false,
       })
       .success(function(resp) {
         if (resp.success) {
           $scope.tasks.push({
             content: task.content,
             done: false,
           });
           $scope.taskModal.hide();
           task.content = '';
         } else {
           console.log(resp);
         }
       });
   };

   //计算完成数
   $scope.count = function() {
     var count = 0;
     angular.forEach($scope.tasks, function(task) {
       count += task.done ? 0 : 1;
     });
     return count;
   };
   //监听任务完成度
   $scope.$watch('tasks', function(count) {
     if ($scope.count() == 0 && $scope.tasks.length >= 1) {
       $ionicPopup.alert({
         title: '奖励',
         template: '任务完成！'
       });
     }
   }, true);
   //删除选中目标
   $scope.deleteTask = function(task) {
     $scope.task_count = $scope.tasks.indexOf(task) + 1;
     $http.post('./phps/tgs_delete.php', {
         check: $scope.task_count
       })
       .success(function() {
         $scope.tasks.splice($scope.tasks.indexOf(task), 1);
       });
     $http.post('./phps/tgs_changeId.php', {
       check: $scope.task_count
     });
   };
   //删除所有任务
   $scope.deleteAllTask = function() {
     $http.get('./phps/tgs_deleteAll.php')
       .success(function() {
         $scope.tasks.splice(0, $scope.tasks.length);
       });
   };
   //新目标添加列表
   $scope.newTask = function() {
     $scope.taskModal.show();
   };
   //专注模式开始
   $scope.concenter = function() {
     $scope.concenterModal.show();
   };
   //专注模式推出
   $scope.closeConcenter = function() {
     $scope.concenterModal.hide();
   };
   //关闭新添加列表
   $scope.closeNewTask = function() {
     $scope.taskModal.hide();
   };
   var count;
   $scope.ifShow = true; //初设0:0是否显示
   //倒计时显示
   $scope.timeDown = function(num) {
     $scope.ifShow = null;
     $scope.ifShow = false;
     $scope.time = num;
     if (angular.isDefined(count)) return;
     count = $interval(function() {
       if ($scope.time > 0) {
         var btn = document.getElementById('ifWork');
         btn.disabled = true;
         $scope.time -= 1;
         $scope.m = Math.floor($scope.time / 60);
         $scope.yu = $scope.time % 60;
         $scope.countdown = $scope.m + ':' + $scope.yu;
         if ($scope.time == 0) {
           var btn = document.getElementById('ifWork');
           btn.disabled = null;
           btn.disabled = false;
         }
       }
     }, 1000);
   };
 });