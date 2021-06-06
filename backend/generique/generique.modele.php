<?php

class ModeleGenerique {

    static protected $bdd;

    public function __construct(){
        self::initConnexion();
    }
    
    public static function initConnexion(){
       require('./config/database.php');
       $database = new DB();
       self::$bdd = $database->getConnection();
    }

}

?>