<?php

if(!defined ('CONSTANT') )
    die ('accès interdit') ;

require_once('generique/generique.modele.php');

    class modeleFolder extends ModeleGenerique{

        // table
        private $dbTable = "folders";
        private $LIMIT = 20;// number row result

        // col
        public $idFolder;
        public $name;
        public $id_User;
        public $id_Folder;

        // db conn
        public function __construct(){
            parent::__construct();
        }

        // GET Folders
        public function findFolderByParams(){
            $limit = $this->id_User ? "" : " LIMIT ".$this->LIMIT;// un il y a un idUser on envoi tout les résultats
            $params_query = "";
            if($this->idFolder){
                $params_query = $params_query." AND idFolder = :idFolder ";
            }
            if($this->name){
                $params_query = $params_query." AND name LIKE :name ";
            }
            if($this->id_User){
                $params_query = $params_query." AND id_User = :id_User ";
            }
            if($this->id_Folder){
                $params_query = $params_query." AND id_Folder = :id_Folder";
            }
            
            $sqlQuery = "SELECT idFolder, name, id_Folder, id_User FROM " . $this->dbTable . " WHERE 1=1 ".$params_query.$limit;
            
            //echo $this->idFolder." requete : ".$sqlQuery;
            
            $stmt = self::$bdd->prepare($sqlQuery);

            if($this->idFolder){
                $this->idFolder=htmlspecialchars(strip_tags($this->idFolder));
                $stmt->bindParam(":idFolder", $this->idFolder);
            }
            if($this->name){
                $this->name=htmlspecialchars(strip_tags("%".$this->name."%"));
                $stmt->bindParam(":name", $this->name);
            }
            if($this->id_User){
                $stmt->bindParam(":id_User", $this->id_User);
                $this->id_User=htmlspecialchars(strip_tags($this->id_User));
            }
            if($this->id_Folder){
                $this->id_Folder=htmlspecialchars(strip_tags($this->id_Folder));
                $stmt->bindParam(":id_Folder", $this->id_Folder);
            }

            $stmt->execute();
            return $stmt;
        }

        // CREATE Folder
        public function createFolder(){
            //echo "name ".$this->name." id_Folder ".$this->id_Folder." id_User ".$this->id_User ;
            $params_query = "" ;
            if($this->id_Folder){
                $params_query = $params_query." id_Folder = :id_Folder,";
            }
            $sqlQuery = "INSERT INTO
                        ". $this->dbTable ."
                    SET
                        name = :name, 
                        ".$params_query." 
                        id_User = :id_User";
        
               //echo json_encode("wwsql query : ".$sqlQuery) ;
            $stmt = self::$bdd->prepare($sqlQuery);
        
            // sanitize
            $this->name=htmlspecialchars(strip_tags($this->name));
            $this->id_User=htmlspecialchars(strip_tags($this->id_User));
            
            // bind data
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":id_User", $this->id_User);

            if($this->id_Folder){
                echo "enter 2";

                $this->id_Folder=htmlspecialchars(strip_tags($this->id_Folder));
                $stmt->bindParam(":id_Folder", $this->id_Folder);
            }
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // GET Folder // NOT USE  !!!!!
        public function getSingleFolder(){
            $sqlQuery = "SELECT
                        idFolder,
                        name, 
                        id_Folder, 
                        id_User
                      FROM
                        ". $this->dbTable ."
                    WHERE 
                       idFolder = ?
                    LIMIT 0,1";

            $stmt = self::$bdd->prepare($sqlQuery);
            
            $stmt->bindParam(1, $this->idFolder);

            if($stmt->execute()){
                
                return $stmt->fetch(PDO::FETCH_ASSOC);
                
            }
            else{
                false;
            }
        }        

        // UPDATE Folder
        public function updateFolder(){
            //echo "name ".$this->name." id_User ".$this->id_User." id_Folder ".$this->id_Folder." idFolder : ".$this->idFolder ;
            $params_query = "";
            if($this->name != ""){
                $params_query = $params_query."name = :name,";
            }
            if($this->id_User != ""){
                $params_query = $params_query."id_User = :id_User,";
            }
            if($this->id_Folder != ""){
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
                        idFolder = :idFolder";
        
           //echo "query : ".$sqlQuery;
            $stmt = self::$bdd->prepare($sqlQuery);
        
            $this->idFolder=htmlspecialchars(strip_tags($this->idFolder));
            $stmt->bindParam(":idFolder", $this->idFolder);

            if($this->name){
                $this->name=htmlspecialchars(strip_tags($this->name));
                $stmt->bindParam(":name", $this->name);
            }
            if($this->id_User){
                $stmt->bindParam(":id_User", $this->id_User);
                $this->id_User=htmlspecialchars(strip_tags($this->id_User));
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

        // DELETE Folder
        function deleteFolder(){
            $sqlQuery = "DELETE FROM " . $this->dbTable . " WHERE idFolder = ?";
            $stmt = self::$bdd->prepare($sqlQuery);
        
            $this->idFolder=htmlspecialchars(strip_tags($this->idFolder));
        
            $stmt->bindParam(1, $this->idFolder);
        
            if($stmt->execute()){
                return true;
            }
            return false;
        }

    }
?>
