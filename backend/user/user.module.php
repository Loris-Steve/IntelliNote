
<?php
if(!defined ('CONSTANT') )
    die ('accès interdit') ;

require_once('user/user.controller.php');

try{
        
    $contUser = new controllerUser();

    $action = htmlspecialchars($_GET['action']);

    switch ($action) {

        case 'create':
            $contUser->createUser();
        break;
        
        case 'singnIn':
            $contUser->singnIn();
        break;

        case 'update':
            $contUser->updateUser();
        break;

        case 'delete':
            $contUser->deleteUser();
        break;

        case 'find':
            $contUser->getUser();
        break;
    }
}
catch(Exception $e){
    echo $e->getMessage();
}