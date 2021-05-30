<!-- api/read.php -->

<?php
    // $_SERVER['DOCUMENT_ROOT']
    define('HOME_DIR', dirname(dirname(__FILE__)));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once HOME_DIR.'/config/database.php';
    include_once HOME_DIR.'/class/folders.php';

    $database = new DB();
    $db = $database->getConnection();

    $items = new Folder($db);

    if(isset($_GET['idFolder']) ){
        $items->idFolder = $_GET['idFolder']; 
    }
    if(isset($_GET['name']) ){
        $items->name = $_GET['name'];
    }
    if(isset($_GET['id_User']) ){
        $items->id_User = $_GET['id_User'];
    }
    if(isset($_GET['id_Folder']) ){
        $items->id_Folder = $_GET['id_Folder'];
    }
  
    $stmt = $items->getFolderByParams();
    $itemCount = $stmt->rowCount();

    echo json_encode($itemCount);

    if($itemCount > 0){
        
        $folderArr = array();
        $folderArr["body"] = array();
        $folderArr["itemCount"] = $itemCount;

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "idFolder" => $idFolder,
                "name" => $name,
                "id_User" => $id_User,
                "id_Folder" => $id_Folder
            );

            array_push($folderArr["body"], $e);
        }
        echo json_encode($folderArr);
    }

    else{
        http_response_code(404);
        echo json_encode(
            array("message" => "Data not found.")
        );
    }
?>