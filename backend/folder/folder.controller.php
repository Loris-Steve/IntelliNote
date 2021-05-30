<?php

if(!defined ('CONSTANT') )
    die ('accès interdit') ;
    
require_once('folder/folder.modele.php');

    class controllerFolder {

        // conn
        private $modeleFolder;

        public function __construct () {
            //parent::__construct();// on lui donne accès aux méthodes de la class controleur generique
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
            if($this->modeleFolder->createFolder()){
                echo json_encode("folder was created");
            } else{
                http_response_code(500);
                echo json_encode(
                    array("message" => "Folder was not created.")
                );
            }
        }

        // GET Folder
        public function singnIn(){
            $dataRow = $this->modeleFolder->getSingleFolder();
            if($dataRow){
                $folder_Arr = array(
                    "idFolder" => $dataRow['idFolder'],
                    "name" => $dataRow['name'],
                    "id_User" => $dataRow['id_User'],
                    "password" => $dataRow['password']
                );
                
                http_response_code(200);
                echo json_encode($folder_Arr);

            }
            else{
                http_response_code(404);
                echo json_encode("Folder record not found.");
            }
                
        }        

        // UPDATE Folder
        public function updateFolder(){
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

        // DELETE Folder
        function deleteFolder(){
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
?>
