
<?php
if(!defined ('CONSTANT') )
    die ('accès interdit') ;

require_once('folder/folder.controller.php');

try{
        
    $contFolder = new controllerFolder();

    $action = htmlspecialchars($_GET['action']);

    switch ($action) {

        case 'create':
            $contFolder->createFolder();
        break;
        
        case 'update':
            $contFolder->updateFolder();
        break;

        case 'delete':
            $contFolder->deleteFolder();
        break;

        case 'find':
            $contFolder->getFolder();
        break;
    }
}
catch(Exception $e){
    echo $e->getMessage();
}