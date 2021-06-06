<?php

if(!defined ('CONSTANT') )
    die ('accès interdit') ;
    
try{

    require_once( "sparqllib.php" );
}
catch(Exception $e){
    echo " voila  !!";
}

 class Sparql {
    
     public function searchSpectacle(){

        $db = sparql_connect( "https://data.bnf.fr/sparql" );
        if( !$db ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }
        sparql_ns( "rdf","http://www.w3.org/1999/02/22-rdf-syntax-ns#" );
        sparql_ns( "dbp","http://dbpedia.org/property/" );
        sparql_ns( "dbo","http://dbpedia.org/ontology/" );
        sparql_ns( "xsd","http://www.w3.org/2001/XMLSchema#" );
        
        $sparql = "PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX rdagroup1elements: <http://rdvocab.info/Elements/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX dcterms: <http://purl.org/dc/terms/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX dcmitype: <http://purl.org/dc/dcmitype/>
        SELECT ?Spectacle ?Titre ?Date ?focus ?Nom_Lieu ?Latitude ?Longitude
        WHERE {
        ?Spectacle rdf:type dcmitype:Event .
        ?Spectacle dcterms:title ?Titre .
        ?Spectacle dcterms:date ?Date .
        ?Spectacle rdagroup1elements:placeOfProduction ?Lieu .
        ?Lieu foaf:focus ?focus .
        ?focus rdfs:label ?Nom_Lieu .
        ?focus geo:lat ?Latitude .
        ?focus geo:long ?Longitude .";

        $result = sparql_query( $sparql ); 
        if( !$result ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }
         
        $fields = sparql_field_array( $result );
         
        print "<p>Number of rows: ".sparql_num_rows( $result )." results.</p>";
        print "<table>";
        print "<tr>";
        foreach( $fields as $field )
        {
           print "<th>$field</th>";
        }
        print "</tr>";
        while( $row = sparql_fetch_array( $result ) )
        {
           print "<tr>";
           foreach( $fields as $field )
           {
              print "<td>$row[$field]</td>";
           }
           print "</tr>";
        }
        print "</table>";
    }
     
    public function searchBasket(){
        $db = sparql_connect( "https://dbpedia.org/sparql" );
        if( !$db ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }
        sparql_ns( "rdf","http://www.w3.org/1999/02/22-rdf-syntax-ns#" );
        sparql_ns( "dbp","http://dbpedia.org/property/" );
        sparql_ns( "dbo","http://dbpedia.org/ontology/" );
        sparql_ns( "xsd","http://www.w3.org/2001/XMLSchema#" );
        //https://data.bnf.fr/sparql

        
        $sparql = "select * where {
            ?s rdf:type dbo:BasketballPlayer .
            ?s dbp:nationality ?o .
            ?s dbo:draftPick ?draftPick .
            ?s dbo:draftRound ?draftRound .
            ?s dbo:draftTeam	?draftTeam .
            ?s  dbo:draftYear ?draftYear .
            filter (regex(?o,\"French\")) 
            } order  by asc(xsd:integer(?draftPick))";

        $result = sparql_query( $sparql ); 
        if( !$result ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }
        
        $fields = sparql_field_array( $result );
        
        $equipe = array();
        $equipe["itemCount"] = sparql_num_rows( $result );
        
        foreach( $fields as $field )
        {
           $equipe[$field] = array();
        }

        $test = array('draftYear','draftTeam','draftPick','draftRound');
        while( $row = sparql_fetch_array( $result ) )
        {
            $e = array();

            foreach( $fields as $field )
            {
                array_push($e,$row[$field]);

            }
            array_push($equipe,$e);
        }

        echo json_encode($equipe);
         

 }
}

?>