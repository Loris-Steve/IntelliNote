<?php

if(!defined ('CONSTANT') )
    die ('accès interdit') ;

require_once('generique/generique.modele.php');

    class modeleUser extends ModeleGenerique{

        // table
        private $dbTable = "users";

        // col
        public $idUser;
        public $name;
        public $email;
        public $password;

        // db conn
        public function __construct(){
            parent::__construct();
        }

        // GET Users
        public function findUserByParams(){
            $params_query = "";
            if($this->idUser){
                $params_query = $params_query." AND idUser = :idUser ";
            }
            if($this->name){
                $params_query = $params_query." AND name LIKE :name ";
            }
            if($this->email){
                $params_query = $params_query." AND email = :email ";
            }
  
            $sqlQuery = "SELECT idUser, name, email, password FROM " . $this->dbTable . " WHERE 1=1 ".$params_query." LIMIT 20";
            
            $stmt = self::$bdd->prepare($sqlQuery);

            if($this->idUser){
                $this->idUser=htmlspecialchars(strip_tags($this->idUser));
                $stmt->bindParam(":idUser", $this->idUser);
            }
            if($this->name){
                $this->name=htmlspecialchars(strip_tags("%".$this->name."%"));
                $stmt->bindParam(":name", $this->name);
            }
            if($this->email){
                $stmt->bindParam(":email", $this->email);
                $this->email=htmlspecialchars(strip_tags($this->email));
            }
            if($this->password){
                $this->password=htmlspecialchars(strip_tags($this->password));
                $stmt->bindParam(":password", $this->password);
            }
            $stmt->execute();
            return $stmt;
        }

        // CREATE User
        public function createUser(){
            //echo "name ".$this->name." email ".$this->email." password ".$this->password ;

            $sqlQuery = "INSERT INTO
                        ". $this->dbTable ."
                    SET
                        name = :name, 
                        email = :email, 
                        password = :password";
        
                        //echo "query : ".$sqlQuery;
            $stmt = self::$bdd->prepare($sqlQuery);
        
            // sanitize
            $this->name=htmlspecialchars(strip_tags($this->name));
            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->password=htmlspecialchars(strip_tags($this->password));
        
            // bind data
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":password", password_hash($this->password,PASSWORD_DEFAULT));
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // GET User
        public function getSingleUser(){
            $sqlQuery = "SELECT
                        idUser,
                        name, 
                        email, 
                        password
                      FROM
                        ". $this->dbTable ."
                    WHERE 
                       email = ? 
                    LIMIT 0,1";

            $stmt =  self::$bdd->prepare($sqlQuery);

            $this->email=htmlspecialchars(strip_tags($this->email));

            $stmt->bindParam(1, $this->email);

            if($stmt->execute()){
                
                return $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
            }
            else
                return false;
        }        

        // UPDATE User
        public function updateUser(){
            //echo "name ".$this->name." email ".$this->email." password ".$this->password ;
            $params_query = "";
            if($this->name){
                $params_query = $params_query."name = :name,";
            }
            if($this->email){
                $params_query = $params_query."email = :email,";
            }
            if($this->password){
                $params_query = $params_query."password = :password";
            }
            else{
                $params_query = substr($params_query, 0 , -1);//on enlève la ","
            }

            $sqlQuery = "UPDATE
                        ". $this->dbTable ."
                    SET
                        ".$params_query." 
                    WHERE 
                        idUser = :idUser";
        
            $stmt =  self::$bdd->prepare($sqlQuery);
        
            $stmt->bindParam(":idUser", $this->idUser);
            $this->idUser=htmlspecialchars(strip_tags($this->idUser));
        
            if($this->name){
                $this->name=htmlspecialchars(strip_tags($this->name));
                $stmt->bindParam(":name", $this->name);
            }
            if($this->email){
                $stmt->bindParam(":email", $this->email);
                $this->email=htmlspecialchars(strip_tags($this->email));
            }
            if($this->password){
                $stmt->bindParam(":password", $this->password);
                $this->password=htmlspecialchars(strip_tags(password_hash($this->password,PASSWORD_DEFAULT)));
            }
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // DELETE User
        function deleteUser(){
            $sqlQuery = "DELETE FROM " . $this->dbTable . " WHERE idUser = ?";
            $stmt =  self::$bdd->prepare($sqlQuery);
        
            $this->idUser=htmlspecialchars(strip_tags($this->idUser));
        
            $stmt->bindParam(1, $this->idUser);
        
            if($stmt->execute()){
                return true;
            }
            return false;
        }

    }
?>
