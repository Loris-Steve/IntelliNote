<?php
require "vendor/autoload.php";
use \Firebase\JWT\JWT;

class ControllerGenerique {

    static protected $config;

    public function __construct(){
        self::initConfig();
    }
    
    public static function initConfig(){
        require("./config/config.php");
        self::$config = $config;
    }

    public function verifyToken() {
        $jwt = null;
        if(isset($_SERVER['HTTP_AUTHORIZATION'])){

            $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
            
            $arr = explode(" ", $authHeader);
            /* 
            echo json_encode(array(
                "message" => "sd" .$arr[1]
            )); */
            
            $jwt = $arr[1];
            
            if($jwt){
                
                try {
                    
                    return JWT::decode($jwt, self::$config["SECRET_KEY"], array('HS256'));
                    
                }catch (Exception $e){
                    
                    http_response_code(401);
                    
                    echo json_encode(array(
                        "message" => "Access denied.",
                        "error" => $e->getMessage()
                    ));
                }
            }
        }
        else{
            http_response_code(400);
            echo json_encode(array("message" => "Credentials not found"));
        }
    }
        
}
    
    ?>