<!-- api/read.php -->

<?php
    // $_SERVER['DOCUMENT_ROOT']
    define('HOME_DIR', dirname(dirname(__FILE__)));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once HOME_DIR.'/config/database.php';
    include_once HOME_DIR.'/class/users.php';

    $database = new DB();
    $db = $database->getConnection();

    $items = new User($db);

    $stmt = $items->getUser();
    $itemCount = $stmt->rowCount();


    echo json_encode($itemCount);

    if($itemCount > 0){
        
        $userArr = array();
        $userArr["body"] = array();
        $userArr["itemCount"] = $itemCount;

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "idUser" => $idUser,
                "name" => $name,
                "email" => $email,
                "password" => $password
            );

            array_push($userArr["body"], $e);
        }
        echo json_encode($userArr);
    }

    else{
        http_response_code(404);
        echo json_encode(
            array("message" => "Data not found.")
        );
    }
?>