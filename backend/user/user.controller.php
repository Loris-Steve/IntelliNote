<?php

if(!defined ('CONSTANT') )
    die ('accès interdit') ;

require_once('user/user.modele.php');

    class controllerUser {

        // conn
        private $modeleUser;

        public function __construct () {
            //parent::__construct();// on lui donne accès aux méthodes de la class controleur generique
            $this->modeleUser = new modeleUser();
            
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
                $action = htmlspecialchars($_GET['action']);
                if(property_exists( $data,"password") && $action != "singnIn"){
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
                http_response_code(400);
                echo json_encode(array("message" => "User aleready exist"));
            }
        }

        // GET User
        public function singnIn(){
            $dataRow = $this->modeleUser->getSingleUser();
            if($dataRow){
                $user_Arr = array(
                    "idUser" => $dataRow['idUser'],
                    "name" => $dataRow['name'],
                    "email" => $dataRow['email'],
                    "password" => $dataRow['password']
                );
                
                http_response_code(200);
                echo json_encode($user_Arr);

            }
            else{
                http_response_code(404);
                echo json_encode(array("message" => "User record not found."));
            }
                
        }        

        // UPDATE User
        public function updateUser(){
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

        // DELETE User
        function deleteUser(){
            if(isset($_GET['idUser']) ){
                $this->modeleUser->idUser = $_GET['idUser'];
            }
            if($this->modeleUser->deleteUser()){
                echo json_encode("User deleted.");
            } else{
                http_response_code(500);
                echo json_encode(
                    array("message" => "User was not deleted")
                );
            }
        }

        
        // GET Users
        public function getUser(){
            $this->modeleUser->findUserByParams();
        }


    }
?>
