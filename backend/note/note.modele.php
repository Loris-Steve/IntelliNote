<?php

if(!defined ('CONSTANT') )
    die ('accès interdit') ;

require_once('generique/generique.modele.php');

    class modeleNote extends ModeleGenerique{

        // table
        private $dbTable = "notes";

        // col
        public $idNote;
        public $name;
        public $content;
        public $pos;
        public $id_Folder;

        // db conn
        public function __construct(){
            parent::__construct();
        }

        // GET Notes
        public function findNoteByParams(){
            $params_query = "";
            if($this->idNote){
                $params_query = $params_query." AND idNote = :idNote ";
            }
            if($this->name){
                $params_query = $params_query." AND name LIKE :name ";
            }
            if($this->content){
                $params_query = $params_query." AND content LIKE :content ";
            }
            if($this->pos){
                $params_query = $params_query." AND pos = :pos ";
            }
            if($this->id_Folder){
                $params_query = $params_query." AND id_Folder = :id_Folder";
            }
            
            $sqlQuery = "SELECT idNote, name, id_Folder, content, pos FROM " . $this->dbTable . " WHERE 1=1 ".$params_query." LIMIT 20";
            
            //echo $this->idNote." requete : ".$sqlQuery;
            
            $stmt = self::$bdd->prepare($sqlQuery);
            if($this->idNote){
                $this->idNote=htmlspecialchars(strip_tags($this->idNote));
                $stmt->bindParam(":idNote", $this->idNote);
            }
            if($this->name){
                $this->name=htmlspecialchars(strip_tags("%".$this->name."%"));
                $stmt->bindParam(":name", $this->name);
            }
            if($this->content){
                $this->content=htmlspecialchars(strip_tags("%".$this->content."%"));
                $stmt->bindParam(":content", $this->content);
            }
            if($this->pos){
                $stmt->bindParam(":pos", $this->pos);
                $this->pos=htmlspecialchars(strip_tags($this->pos));
            }
            if($this->id_Folder){
                $this->id_Folder=htmlspecialchars(strip_tags($this->id_Folder));
                $stmt->bindParam(":id_Folder", $this->id_Folder);
            }

            $stmt->execute();
            return $stmt;
        }

        
        // GET Notes
        public function getUserNotes(){
            $sqlQuery = "SELECT idNote, n.name, n.id_Folder, content, pos FROM "
             . $this->dbTable . " n , folders f where n.id_Folder = f.idFolder AND
              f.id_User = ? ";

            $stmt = self::$bdd->prepare($sqlQuery);
            
            $stmt->bindParam(1, $this->idUser);

            if($stmt->execute()){
                return $stmt;
            }
            else
                return false;
        }

        // CREATE Note
        public function createNote(){
            //echo "name ".$this->name." id_Folder ".$this->id_Folder." content ".$this->content." ;
            $params_query = "";

            if($this->content){
                $params_query = $params_query."content = :content,";
            }
            if($this->pos){
                $params_query = $params_query."pos = :pos,";
            }
            if($this->id_Folder){
                $params_query = $params_query."id_Folder = :id_Folder";
            }
            else{
                $params_query = substr($params_query, 0 , -1);//on enlève la ","
            }

           $sqlQuery = "INSERT INTO
                        ". $this->dbTable ."
                    SET
                        name = :name, 
                        ".$params_query;
        
            $stmt = self::$bdd->prepare($sqlQuery);
        
            // sanitize
            $this->name=htmlspecialchars(strip_tags($this->name));
            // bind data
            $stmt->bindParam(":name", $this->name);

            if($this->content){
                $stmt->bindParam(":content", $this->content);
                $this->content=htmlspecialchars(strip_tags($this->content));
            }
            if($this->pos){
                $this->pos=htmlspecialchars(strip_tags($this->pos));
                $stmt->bindParam(":pos", $this->pos);
            }
            if($this->id_Folder){
                $this->id_Folder=htmlspecialchars(strip_tags($this->id_Folder));
                $stmt->bindParam(":id_Folder", $this->id_Folder);
            }
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }
        
        // UPDATE Note
        public function updateNote(){
            $params_query = "";
            if($this->name){
                $params_query = $params_query."name = :name,";
            }
            if($this->content){
                $params_query = $params_query."content = :content,";
            }
            if($this->pos){
                $params_query = $params_query."pos = :pos,";
            }
            if($this->id_Folder){
                $params_query = $params_query."id_Folder = :id_Folder";
            }
            else{
                $params_query = substr($params_query, 0 , -1);//on enlève la ","
            }

            $sqlQuery = "UPDATE
                        ". $this->dbTable ."
                    SET
                    ".$params_query." 
                    WHERE 
                    idNote = :idNote";
                    
            //echo "query : ".$sqlQuery;
            $stmt = self::$bdd->prepare($sqlQuery);
            
            $this->idNote=htmlspecialchars(strip_tags($this->idNote));
            $stmt->bindParam(":idNote", $this->idNote);
            
            if($this->name){
                $this->name=htmlspecialchars(strip_tags($this->name));
                $stmt->bindParam(":name", $this->name);
            }
            if($this->content){
                $stmt->bindParam(":content", $this->content);
                $this->content=htmlspecialchars(strip_tags($this->content));
            }
            if($this->pos){
                $stmt->bindParam(":pos", $this->pos);
                $this->pos=htmlspecialchars(strip_tags($this->pos));
            }
            if($this->id_Folder){
                $this->id_Folder=htmlspecialchars(strip_tags($this->id_Folder));
                $stmt->bindParam(":id_Folder", $this->id_Folder);
            }
            
            if($stmt->execute()){
                return true;
            }
            return false;
        }
        
        // DELETE Note
        function deleteNote(){
            $sqlQuery = "DELETE FROM " . $this->dbTable . " WHERE idNote = ?";
            echo "idNote : ".$this->idNote."query ".$sqlQuery ;
            $stmt = self::$bdd->prepare($sqlQuery);
            
            $this->idNote=htmlspecialchars(strip_tags($this->idNote));
            
            $stmt->bindParam(1, $this->idNote);
            
            if($stmt->execute()){
                return true;
            }
            return false;
        }  

    }
?>
