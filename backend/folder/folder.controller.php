<?php

if(!defined ('CONSTANT') )
    die ('accès interdit') ;

require_once('generique/generique.controller.php');
require_once('folder/folder.modele.php');

    class controllerFolder extends ControllerGenerique {

        // conn
        private $modeleFolder;

        public function __construct () {
            parent::__construct();

            $this->modeleFolder = new modeleFolder();
            
            $data = json_decode(file_get_contents("php://input"));
            if($data){

                if(property_exists( $data,"idFolder")){
                    $this->modeleFolder->idFolder = $data->idFolder;
                }
                if(property_exists( $data,"name")){
                    $this->modeleFolder->name = $data->name;
                }
                if(property_exists( $data,"id_User")){
                    $this->modeleFolder->id_User = $data->id_User;
                }
                if(property_exists( $data,"id_Folder")){
                    $this->modeleFolder->id_Folder = $data->id_Folder;
                }
            }
        }

        // CREATE Folder
        public function createFolder(){
            $decoded = self::verifyToken();
            if($decoded && $decoded->data->idUser){
                if($this->modeleFolder->createFolder()){
                    echo json_encode("folder was created");
                } else{
                    http_response_code(500);
                    echo json_encode(
                        array("message" => "Folder was not created.")
                    );
                }
            }
        }
 

        // UPDATE Folder
        public function updateFolder(){
            $decoded = self::verifyToken();
            $datarow = $this->modeleFolder->getSingleFolder();
            //il faut verifier en plus si le dossier lui appartient
            if($datarow && $decoded && $decoded->data->idUser == $datarow["id_User"]){
                if($this->modeleFolder->updateFolder()){
                    echo json_encode("Folder record updated.");
                }
                else{
                    http_response_code(500);
                    echo json_encode(
                        array("message" => "Folder record could not be updated.")
                    );
                }
            }
            else{
                http_response_code(404);
                echo json_encode(array("message" => "Credentials not found"));
            }
        }

      
        // GET Folders
        public function getFolder(){

            if(isset($_GET['idFolder']) ){
                $this->modeleFolder->idFolder = $_GET['idFolder']; 
            }
            if(isset($_GET['name']) ){
                $this->modeleFolder->name = $_GET['name'];
            }
            if(isset($_GET['id_User']) ){
                $this->modeleFolder->id_User = $_GET['id_User'];
            }
            if(isset($_GET['id_Folder']) ){
                $this->modeleFolder->id_Folder = $_GET['id_Folder'];
            }
            
            $decoded = self::verifyToken();
            if($decoded && $decoded->data->idUser){
                $stmt =$this->modeleFolder->findFolderByParams();
                if($stmt){
                    $itemCount = $stmt->rowCount();

                    $folderArr = array();

                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                        extract($row);
                        $e = array(
                            "idFolder" => $idFolder,
                            "name" => $name,
                            "id_User" => $id_User,
                            "id_Folder" => $id_Folder
                        );

                        array_push($folderArr, $e);
                    }
                    echo json_encode($folderArr);
                }
                else{
                    http_response_code(404);
                    echo json_encode(
                        array("message" => "Data not found.")
                    );
                }
            }
        }

        // DELETE Folder
        function deleteFolder(){
            $decoded = self::verifyToken();
            if($decoded && $decoded->data->idUser){
                if(isset($_GET['idFolder']) ){
                    $this->modeleFolder->idFolder = $_GET['idFolder']; 
                }
                if($this->modeleFolder->deleteFolder()){
                    echo json_encode("Folder deleted.");
                } else{
                    http_response_code(500);
                    echo json_encode(
                        array("message" => "Folder was not deleted")
                    );
                }
            }
        }

    }
?>
