<?php

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST,PUT,DELETE, OPTIONS");         
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }
    
    
    
    // $http_origin = $_SERVER['HTTP_ORIGIN'];

    // $allowed_domains = array(
    //     'http://example.com',
    //     'https://example.com',
    //     'http://app.example.com',
    //     'https://app.example.com',
    //     'http://www.example.com',
    //     'https://www.example.com'
    // );
    
    // if (in_array(strtolower($http_origin), $allowed_domains))
    // {  
    //     // header("Access-Control-Allow-Origin: *");
    //     header("Access-Control-Allow-Origin: $http_origin");
    //     header('Access-Control-Allow-Credentials: true');
    // }
    define('HOME_DIR', dirname(dirname(__FILE__)));

    //sécurité : on definie une constante pour bien obliger les utilisateur à passer par l'index
    if(!defined('CONSTANT')){
        define('CONSTANT',NULL);
    }

    try{
        if (isset($_GET['module']) ) {
            if (isset($_GET['action']) ) {

                $module = htmlspecialchars($_GET['module']);

                switch ($module) {
                    
                    case 'user':
                        require_once('user/user.module.php');
                    break;

                    case 'folder':
                        require_once('folder/folder.module.php');
                    break;

                    case 'note':
                        require_once('note/note.module.php');
                    break;
                }
            }
            else{
                http_response_code(400);
                echo json_encode(
                    array("message" => "action not found")
                );
            }
        }
        else{
            http_response_code(400);
            echo json_encode(
                array("message" => "module not found")
            );
        }
    }
    catch(Exception $e){
        echo $e->getMessage();
    }
