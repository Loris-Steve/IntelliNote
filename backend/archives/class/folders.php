<?php
    class Folder{

        // conn
        private $conn;

        // table
        private $dbTable = "folders";

        // col
        public $idFolder;
        public $name;
        public $id_Folder;
        public $id_User;

        // db conn
        public function __construct($db){
            $this->conn = $db;
        }

        // GET Folders
        public function getFolderByParams(){
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
            
            $sqlQuery = "SELECT idFolder, name, id_Folder, id_User FROM " . $this->dbTable . " WHERE 1=1 ".$params_query." LIMIT 20";
            
            //echo $this->idFolder." requete : ".$sqlQuery;
            
            $stmt = $this->conn->prepare($sqlQuery);
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
            //echo "name ".$this->name." id_Folder ".$this->id_Folder." id_User ".$this->id_User." ;
            $id_Folder_query = $this->id_Folder === "" ? "" : "id_Folder = :id_Folder,";
            $sqlQuery = "INSERT INTO
                        ". $this->dbTable ."
                    SET
                        name = :name, 
                        ".$id_Folder_query." 
                        id_User = :id_User";
        
                        echo "sql query : ".$sqlQuery ;
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->name=htmlspecialchars(strip_tags($this->name));
            $this->id_User=htmlspecialchars(strip_tags($this->id_User));
            
            // bind data
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":id_User", $this->id_User);

            if($this->id_Folder){
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

            $stmt = $this->conn->prepare($sqlQuery);

            $stmt->bindParam(1, $this->idFolder);

            $stmt->execute();

            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $this->name = $dataRow['name'];
            $this->id_Folder = $dataRow['id_Folder'];
            $this->id_User = $dataRow['id_User'];

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
            $stmt = $this->conn->prepare($sqlQuery);
        
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
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->idFolder=htmlspecialchars(strip_tags($this->idFolder));
        
            $stmt->bindParam(1, $this->idFolder);
        
            if($stmt->execute()){
                return true;
            }
            return false;
        }

    }
?>
