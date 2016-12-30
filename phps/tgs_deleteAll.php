<?php
     
     //1.连接数据库
     try{
         $pdo = new PDO("mysql:host=localhost;dbname=test", "lw", "lww655");
         $pdo->query('set names utf8');  //字符集 
     }catch(PDOException $e){
         die("数据库连接失败".$e->getMessage());
     }
     
     //删除所有数据
     $sql= "TRUNCATE table targets";
     $result = $pdo->exec($sql);
      
     //4.释放资源
     $stmt = null;
     $pdo = null;
     

?>