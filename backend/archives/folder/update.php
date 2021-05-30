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
    
    $item = new Folder($db);
    
    $data = json_decode(file_get_contents("php://input"));
    
    $item->idFolder = $data->idFolder;
    
    // folder values
    $item->name = $data->name;
    $item->id_User = $data->id_User;
    $item->id_Folder = $data->id_Folder;
    // if($item->name != "" || $item->id_User || $item->id_Folder){
    // }
    if($item->updateFolder()){
        echo json_encode("Folder record updated.");
    } else{
        http_response_code(500);
        echo json_encode(
            array("message" => "Folder record could not be updated.")
        );
    }
?>