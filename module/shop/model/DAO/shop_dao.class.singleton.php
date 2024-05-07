<?php
    class shop_dao {
        static $_instance;
        
        private function __construct() {
        }
        
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        public function select_all_cars($db, $orderby, $total_prod, $items_page) {

            $sql = "SELECT c.*, b.*, t.*, ct.* FROM cars c INNER JOIN brand b INNER JOIN type t INNER JOIN category ct ON c.brand = b.cod_brand " 
            . "AND c.type = t.cod_type AND c.category = ct.cod_category ORDER BY $orderby visits DESC LIMIT $total_prod, $items_page";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }


?>

