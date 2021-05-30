<?php
    define('HOME_DIR', dirname(dirname(__FILE__)));
    
    // header("Access-Control-Allow-Origin: *");
    // header("Content-Type: application/json; charset=UTF-8");
    // header("Access-Control-Allow-Methods: POST");
    // header("Access-Control-Max-Age: 3600");
    // header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Access-Control-Allow-Origin: http://localhost:3000");   
    header("Content-Type: application/json; charset=UTF-8");    
    header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");    
    header("Access-Control-Max-Age: 3600");    
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 
   
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
        return 0;    
     }    
     
    include_once HOME_DIR.'/config/database.php';
    include_once HOME_DIR.'/class/users.php';

    $database = new DB();
    $db = $database->getConnection();

    $item = new User($db);
    
    $data = json_decode(file_get_contents("php://input"));

    if(isset($data->email) and isset($data->password)){

    $item->email = $data->email;
    $item->password = $data->password;

    $item->getSingleUser();

        if($item->name != null){
            $user_Arr = array(
                "idUser" => $item->idUser,
                "name" => $item->name,
                "email" => $item->email,
                "password" => $item->password
            );
            
            http_response_code(200);
            echo json_encode($user_Arr);
        }
        else{
            http_response_code(404);
            echo json_encode("User record not found.");
        }
    }
    else{
        http_response_code(404);
        echo json_encode("credentials not found.");
    }
?>