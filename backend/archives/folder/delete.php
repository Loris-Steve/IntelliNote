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
    
    $item->idFolder = $item->idFolder = isset($_GET['idFolder']) ? $_GET['idFolder'] : die();
    
    if($item->deleteFolder()){
        echo json_encode("Folder deleted.");
    } else{
        http_response_code(500);
        echo json_encode(
            array("message" => "Folder not deleted")
        );
    }
?>