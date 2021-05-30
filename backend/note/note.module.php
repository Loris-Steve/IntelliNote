
<?php
if(!defined ('CONSTANT') )
    die ('accès interdit') ;

require_once('note/note.controller.php');

try{
        
    $contNote = new controllerNote();

    $action = htmlspecialchars($_GET['action']);

    switch ($action) {

        case 'create':
            $contNote->createNote();
        break;
        
        case 'user_notes':
            $contNote->getUserNotes();
        break;
        
        case 'update':
            $contNote->updateNote();
        break;

        case 'delete':
            $contNote->deleteNote();
        break;

        case 'find':
            $contNote->getNote();
        break;
    }
}
catch(Exception $e){
    echo $e->getMessage();
}