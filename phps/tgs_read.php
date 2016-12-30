<?php
    
    //1.连接数据库
    try{
        $pdo = new PDO("mysql:host=localhost;dbname=test", "lw", "lww655");
        $pdo->query('set names utf8');  //字符集 
    }catch(PDOException $e){
        die("数据库连接失败".$e->getMessage());
    }
    
    //2.执行query（查询）返回一个预处理对象
    $sql= "SELECT * FROM targets";
    $stmt = $pdo->query($sql);
    $list = $stmt->fetchAll(PDO::FETCH_ASSOC);    //处理成关联数组
    echo json_encode($list);
    
    //4.释放资源
    $stmt = null;
    $pdo = null;
    
?>