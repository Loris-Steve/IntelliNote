<?php
    define('HOME_DIR', dirname(dirname(__FILE__)));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once HOME_DIR.'/config/database.php';
    include_once HOME_DIR.'/class/users.php';
    
    $database = new DB();
    $db = $database->getConnection();
    
    $item = new User($db);
    
    $data = json_decode(file_get_contents("php://input"));
    
    $item->idUser = $data->idUser;
    
    // employee values
    $item->name = $data->name;
    $item->email = $data->email;
    $item->password = $data->password;
    
    if($item->updateUser()){
        echo json_encode("User record updated.");
    } else{
        http_response_code(500);
        echo json_encode(
            array("message" => "User record could not be updated.")
        );
    }
?>