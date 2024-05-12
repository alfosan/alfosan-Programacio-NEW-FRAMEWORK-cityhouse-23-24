<?php
    class search_dao{
        static $_instance;

        private function __construct() {
        }
    
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        function select_search_type($db){

			$sql="SELECT * FROM tipo";  

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_search_category_null($db){
            $sql="SELECT DISTINCT * FROM category";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_search_category($db, $tipo){
            $sql="SELECT ca.*
            FROM category ca
            INNER JOIN vivienda_category v_c ON ca.id_category = v_c.id_category
            INNER JOIN vivienda v ON v_c.id_vivienda = v.id_vivienda
            INNER JOIN tipo t ON v.id_type = t.id_type
            WHERE t.tipos = '$tipo'
            GROUP BY id_category;";


            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_autocomplete_search($db){
            $sql= "SELECT DISTINCT name_city FROM city";
            
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);

        }
        
    }

?>