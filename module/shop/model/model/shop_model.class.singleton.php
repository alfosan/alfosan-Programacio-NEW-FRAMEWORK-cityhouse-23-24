<?php
    class shop_model {
        private $bll;
        static $_instance;

        function __construct() {
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_list_viviendas($args) {
            return $this -> bll -> get_list_viviendas_BLL($args);
        }

        // public function get_all_vivienda($args) {
        //     return $this -> bll -> get_all_vivienda_BLL($args);
        // }

        // public function get_redirect_shop($args) {
        //     return $this -> bll -> get_redirect_shop_BLL($args);
        // }
        
        

        
        
    }
?>
