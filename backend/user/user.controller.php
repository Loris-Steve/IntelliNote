<?php

if(!defined ('CONSTANT') )
    die ('accès interdit') ;

require "vendor/autoload.php";
use \Firebase\JWT\JWT;

require_once('generique/generique.controller.php');
require_once('user/user.modele.php');

    class controllerUser extends ControllerGenerique {

        // conn
        private $modeleUser;

        public function __construct () {
            parent::__construct();// on lui donne accès aux méthodes de la class controleur generique

            $this->modeleUser = new modeleUser();
            // on recupère les valeurs envoyer via la methode POST 
            $data = json_decode(file_get_contents("php://input"));
            if($data){
                if(property_exists( $data,"idUser")){
                    $this->modeleUser->idUser = $data->idUser;
                }
                if(property_exists( $data,"name")){
                    $this->modeleUser->name = $data->name;
                }
                if(property_exists( $data,"email")){
                    $this->modeleUser->email = $data->email;
                }
                
                if(property_exists( $data,"password")){
                    $this->modeleUser->password = $data->password;
                }
            }
        }

        // CREATE User
        public function createUser(){
            //echo "name ".$this->modeleUser->name." email ".$this->modeleUser->email." password ".$this->modeleUser->password ;
            $dataRow = $this->modeleUser->getSingleUser();
            if(!$dataRow){
                if($this->modeleUser->createUser()){
                    echo json_encode("user was created");
                } else{
                    http_response_code(500);
                    echo json_encode(
                        array("message" => "User was not created.")
                    );
                }
            }
            else{
                echo json_encode(array("message" => "User aleready exist"));
                http_response_code(400);
            }
        }

        // GET User
        public function singnIn(){
            $dataRow = $this->modeleUser->getSingleUser();
            if($dataRow){
                if(password_verify(htmlspecialchars($this->modeleUser->password), $dataRow['password'])){

                    $secret_key = self::$config["SECRET_KEY"];
                    $issuer_claim = self::$config["THE_ISSUER"]; // this can be the servername
                    $audience_claim = self::$config["THE_AUDIENCE"];
                    $issuedat_claim = time(); // issued at
                    $notbefore_claim = $issuedat_claim + self::$config["BEFORE_CLAIM"]; //not before in seconds
                    $expire_claim = $issuedat_claim + self::$config["EXPIRE_CLAIM"]; // expire time in seconds
                    $token = array(
                        "iss" => $issuer_claim,
                        "aud" => $audience_claim,
                        "iat" => $issuedat_claim,
                        "nbf" => $notbefore_claim,
                        "exp" => $expire_claim,
                        "data" => array(
                            "idUser" => $dataRow['idUser'],
                            "name" => $dataRow['name'],
                            "email" => $dataRow['email']
                    ));

                     $jwt = JWT::encode($token, $secret_key);
                    $user_Arr = array(
                        "idUser" => $dataRow['idUser'],
                        "name" => $dataRow['name'],
                        "email" => $dataRow['email'],
                        "expireAt" => $expire_claim,
                        "token" => $jwt
                    );
                    
                    http_response_code(200);
                    echo json_encode($user_Arr);
                }
                else{
                    http_response_code(404);
                    echo json_encode(array("message" => "Credentials not found"));
                }

            }
            else{
                http_response_code(404);
                echo json_encode(array("message" => "User  not found."));
            }
                
        }        

        // UPDATE User
        public function updateUser(){

            $decoded = self::verifyToken();
            if($decoded && $decoded->data->idUser == $this->modeleUser->idUser){
                echo "id present";
                if($this->modeleUser->updateUser()){
                    echo json_encode("User record updated.");
                }
                else{
                    http_response_code(500);
                    echo json_encode(
                        array("message" => "User record could not be updated.")
                    );
                }
            }
                
        }

        // DELETE User
        function deleteUser(){
            if(isset($_GET['idUser']) ){
                $this->modeleUser->idUser = $_GET['idUser'];
            }
            $decoded = self::verifyToken();
            if($decoded && $decoded->data->idUser == $this->modeleUser->idUser){
                if($this->modeleUser->deleteUser()){
                    echo json_encode("User deleted.");
                } else{
                    http_response_code(500);
                    echo json_encode(
                        array("message" => "User was not deleted")
                    );
                }
            }
        }

        
        // GET Users
        public function getUser(){
            //$this->modeleUser->findUserByParams();
        }


    }
?>
