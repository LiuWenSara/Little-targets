<?php
     
     //1.连接数据库
     try{
         $pdo = new PDO("mysql:host=localhost;dbname=test", "lw", "lww655");
         $pdo->query('set names utf8');  //字符集 
     }catch(PDOException $e){
         die("数据库连接失败".$e->getMessage());
     }
     
     //2.接收数据并转换为php数组
     $dataJson = file_get_contents("php://input");   //获取POST原始数据（JSON）
     $data = json_decode($dataJson, true);   //将JSON数据强制转换为数组对象
     $check=$data['check'];
 
     //3.删除一条数据
     $sql="DELETE FROM targets WHERE id='$check'";

     $result = $pdo->exec($sql);

     //4.释放资源
     $stmt = null;
     $pdo = null;
     

?>