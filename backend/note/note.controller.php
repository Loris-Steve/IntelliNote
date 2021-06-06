<?php

if(!defined ('CONSTANT') )
    die ('accès interdit') ;

require_once('generique/generique.controller.php');
require_once('note/note.modele.php');

    class controllerNote extends ControllerGenerique {

        // conn
        private $modeleNote;

        public function __construct () {
            parent::__construct();// on lui donne accès aux méthodes de la class controleur generique
            $this->modeleNote = new modeleNote();
            
            $data = json_decode(file_get_contents("php://input"));
            if($data){

                if(property_exists( $data,"idNote")){
                    $this->modeleNote->idNote = $data->idNote;
                }
                if(property_exists( $data,"name")){
                    $this->modeleNote->name = $data->name;
                }
                if(property_exists( $data,"content")){
                    $this->modeleNote->content = $data->content;
                }
                if(property_exists( $data,"pos")){
                    $this->modeleNote->pos = $data->pos;
                }
                if(property_exists( $data,"id_Folder")){
                    $this->modeleNote->id_Folder = $data->id_Folder;
                }
            }
        }

        // CREATE Note
        public function createNote(){
            $decoded = self::verifyToken();
            if($decoded && $decoded->data->idUser){
                if($this->modeleNote->createNote()){
                    echo json_encode("note was created");
                } else{
                    http_response_code(500);
                    echo json_encode(
                        array("message" => "Note was not created.")
                    );
                }
            }
            
        }    

        // UPDATE Note
        public function updateNote(){
            $decoded = self::verifyToken();
            $datarow = $this->modeleNote->getSingleNote();
            //il faut verifier en plus si le dossier lui appartient
            if($datarow && $decoded && $decoded->data->idUser == $datarow["id_User"]){
                if($this->modeleNote->updateNote()){
                    echo json_encode("Note record updated.");
                }
                else{
                    http_response_code(500);
                    echo json_encode(
                        array("message" => "Note record could not be updated.")
                    );
                }
            }
            else{
                http_response_code(404);
                echo json_encode(array("message" => "Credentials not found"));
            }
        }

      
        // GET Notes
        public function getNote(){
            $decoded = self::verifyToken();
            if($decoded && $decoded->data->idUser){
                if(isset($_GET['idNote']) ){
                    $this->modeleNote->idNote = $_GET['idNote']; 
                }
                if(isset($_GET['name']) ){
                    $this->modeleNote->name = $_GET['name'];
                }
                if(isset($_GET['content']) ){
                    $this->modeleNote->content = $_GET['content'];
                }
                if(isset($_GET['id_Folder']) ){
                    $this->modeleNote->id_Folder = $_GET['id_Folder'];
                }
                        
                $stmt =$this->modeleNote->findNoteByParams();
                $itemCount = $stmt->rowCount();

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
                            "id_Folder" => $id_Folder
                        );

                        array_push($noteArr["body"], $e);
                    }
                    echo json_encode($noteArr);
                }

                else{
                    http_response_code(400);
                    echo json_encode(
                        array("message" => "Data not found.")
                    );
                }
            }
        }

        // DELETE Note
        function getUserNotes(){
            $decoded = self::verifyToken();
            if($decoded && $decoded->data->idUser){
                if(isset($_GET['id_User']) ){
                    $this->modeleNote->idUser = $_GET['id_User']; 
                    $stmt = $this->modeleNote->getUserNotes();
                    if($stmt){

                        $itemCount = $stmt->rowCount();
                        
                        // echo json_encode($itemCount);
                        
                        $noteArr = array();
                        
                        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                            extract($row);
                            $e = array(
                                "idNote" => $idNote,
                                "name" => $name,
                                "content" => $content,
                                "pos" => $pos,
                                "id_Folder" => $id_Folder
                            );
                            
                            array_push($noteArr, $e);
                        }
                        echo json_encode($noteArr);
                    }
                    else{
                        http_response_code(500);
                        echo json_encode(
                            array("message" => "Some error occurred while retrieving notes.")
                        );
                    }
                }
                else{
                    http_response_code(404);
                    echo json_encode(
                        array("message" => "idUser not found.")
                    );
                }
            }
        }

        // DELETE Note
        function deleteNote(){
            $decoded = self::verifyToken();
            
            if(isset($_GET['idNote']) ){
                $this->modeleNote->idNote = $_GET['idNote']; 
            }
            
            $datarow = $this->modeleNote->getSingleNote();
            //il faut verifier en plus si le dossier lui appartient
            if($datarow && $decoded && $decoded->data->idUser == $datarow["id_User"]){
                if($this->modeleNote->deleteNote()){
                    echo json_encode("Note deleted.");
                } else{
                    http_response_code(500);
                    echo json_encode(
                        array("message" => "Note was not deleted")
                    );
                }
            }
            else{
                http_response_code(404);
                echo json_encode(array("message" => "Credentials not found"));
            }
        }

    }
?>
