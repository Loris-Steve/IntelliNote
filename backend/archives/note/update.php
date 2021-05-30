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
    
    $data = json_decode(file_get_contents("php://input"));
    
    if($data->idNote){

        $item->idNote = $data->idNote;
        
        // folder values
        $item->name = $data->name;
        $item->content = $data->content;
        $item->pos = $data->pos;
        $item->id_Folder = $data->id_Folder;
        
        if($item->updateNote()){
            echo json_encode("Note record updated.");
        } else{
            echo json_encode("Note record could not be updated.");
        }
    }
    else{
        http_response_code(400);
        echo json_encode(
            array("message" => "Param idNote not found to updated.")
    );
    }
?>