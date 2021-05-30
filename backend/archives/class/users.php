<?php
    class User{

        // conn
        private $conn;

        // table
        private $dbTable = "users";

        // col
        public $idUser;
        public $name;
        public $email;
        public $password;

        // db conn
        public function __construct($db){
            $this->conn = $db;
        }

        // GET Users
        public function getUser(){
            $sqlQuery = "SELECT idUser, name, email, password FROM " . $this->dbTable . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        // CREATE User
        public function createUser(){
            //echo "name ".$this->name." email ".$this->email." password ".$this->password." ;

            $sqlQuery = "INSERT INTO
                        ". $this->dbTable ."
                    SET
                        name = :name, 
                        email = :email, 
                        password = :password";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->name=htmlspecialchars(strip_tags($this->name));
            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->password=htmlspecialchars(strip_tags($this->password));
        
            // bind data
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":password", $this->password);
        
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
                       email = ? AND
                       password = ?
                    LIMIT 0,1";

            $stmt = $this->conn->prepare($sqlQuery);

            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->password=htmlspecialchars(strip_tags($this->password));
            
            $stmt->bindParam(1, $this->email);
            $stmt->bindParam(2, $this->password);

            $stmt->execute();

            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->idUser = $dataRow['idUser'];
            $this->name = $dataRow['name'];
            $this->email = $dataRow['email'];
            $this->password = $dataRow['password'];
        }        

        // UPDATE User
        public function updateUser(){
            $sqlQuery = "UPDATE
                        ". $this->dbTable ."
                    SET
                        name = :name, 
                        email = :email, 
                        password = :password
                    WHERE 
                        idUser = :idUser";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->name=htmlspecialchars(strip_tags($this->name));
            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->password=htmlspecialchars(strip_tags($this->password));
            $this->idUser=htmlspecialchars(strip_tags($this->idUser));
        
            // bind data
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":password", $this->password);
            $stmt->bindParam(":idUser", $this->idUser);

        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // DELETE User
        function deleteUser(){
            $sqlQuery = "DELETE FROM " . $this->dbTable . " WHERE idUser = ?";
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->idUser=htmlspecialchars(strip_tags($this->idUser));
        
            $stmt->bindParam(1, $this->idUser);
        
            if($stmt->execute()){
                return true;
            }
            return false;
        }

    }
?>
