<?php
    define('HOME_DIR', dirname(dirname(__FILE__)));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once HOME_DIR.'/config/database.php';
    include_once HOME_DIR.'/class/notes.php';
    
    $database = new DB();
    $db = $database->getConnection();
    
    $item = new Note($db);
    
    $item->idNote = $item->idNote = isset($_GET['idNote']) ? $_GET['idNote'] : die();

    if($item->deleteNote()){
        echo json_encode("Note deleted.");
    } else{
        http_response_code(500);
        echo json_encode(
            array("message" => "Note was not deleted")
        );
    }
?>