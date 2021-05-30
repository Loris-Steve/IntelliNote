<?php
    define('HOME_DIR', dirname(dirname(__FILE__)));
    
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once HOME_DIR.'/config/database.php';
    include_once HOME_DIR.'/class/folders.php';

    $database = new DB();
    $db = $database->getConnection();

    $item = new User($db);

    $item->idUser = isset($_GET['idUser']) ? $_GET['idUser'] : die();
  
    $item->getSingleUser();

    if($item->name != null){
        $user_Arr = array(
            "name" => $item->name,
            "email" => $item->email,
            "password" => $item->password
        );
      
        http_response_code(200);
        echo json_encode($user_Arr);
    }
      
    else{
        http_response_code(500);
        echo json_encode(
            array("message" => "User record not found.")
        );
    }
?>