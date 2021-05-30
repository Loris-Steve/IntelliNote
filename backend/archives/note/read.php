<!-- api/read.php -->

<?php
    // $_SERVER['DOCUMENT_ROOT']
    define('HOME_DIR', dirname(dirname(__FILE__)));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once HOME_DIR.'/config/database.php';
    include_once HOME_DIR.'/class/notes.php';

    $database = new DB();
    $db = $database->getConnection();

    $items = new Note($db);

    if(isset($_GET['idNote']) ){
        $items->idNote = $_GET['idNote']; 
    }
    if(isset($_GET['name']) ){
        $items->name = $_GET['name'];
    }
    if(isset($_GET['content']) ){
        $items->content = $_GET['content'];
    }
    if(isset($_GET['pos']) ){
        $items->pos = $_GET['pos'];
    }
    if(isset($_GET['id_Folder']) ){
        $items->id_Folder = $_GET['id_Folder'];
    }
  
    $stmt = $items->getNoteByParams();
    $itemCount = $stmt->rowCount();


    echo json_encode($itemCount);

    if($itemCount > 0){
        
        $noteArr = array();
        $noteArr["body"] = array();
        $noteArr["itemCount"] = $itemCount;

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "idNote" => $idNote,
                "name" => $name,
                "content" => $content,
                "pos" => $pos,
                "id_Folder" => $id_Folder
            );

            array_push($noteArr["body"], $e);
        }
        echo json_encode($noteArr);
    }

    else{
        http_response_code(404);
        echo json_encode(
            array("message" => "Data not found.")
        );
    }
?>