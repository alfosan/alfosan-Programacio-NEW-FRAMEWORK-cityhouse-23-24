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

        public function get_details_vivienda($args) {
            return $this -> bll -> get_details_vivienda_BLL($args);
        }

        public function get_load_filter_shop() {
            $filter_shop = isset($_POST['filter_shop']) ? $_POST['filter_shop'] : array();
            $orderBy = isset($_POST['orderBy']) ? $_POST['orderBy'] : array();
            $start_index = isset($_POST['start_index']) ? $_POST['start_index'] : 0;
            $end_index = isset($_POST['end_index']) ? $_POST['end_index'] : PHP_INT_MAX;
            return $this->bll->get_load_filter_shop_BLL($filter_shop, $orderBy, $start_index, $end_index);
        }

        public function get_load_filter_home() {
            $filter_shop = isset($_POST['filter_shop']) ? $_POST['filter_shop'] : array();
            $orderBy = isset($_POST['orderBy']) ? $_POST['orderBy'] : array();
            $start_index = isset($_POST['start_index']) ? $_POST['start_index'] : 0;
            $end_index = isset($_POST['end_index']) ? $_POST['end_index'] : PHP_INT_MAX;
            return $this->bll->get_load_filter_home_BLL($filter_shop, $orderBy, $start_index, $end_index);
        }
        
        public function get_count_shop($args) {
            $filter_shop = $args[0] ?? array();
            $orderBy = $args[1] ?? array();
            if (!is_array($filter_shop) || !is_array($orderBy)) {
                return array();
            }
            return $this->bll->get_count_shop_BLL([$filter_shop, $orderBy]);
        }

        public function get_count_home($args) {
            return $this -> bll -> get_count_home_BLL($args);

        }

        public function get_count_all() {
            return $this -> bll -> get_count_all_BLL();
        }

        public function get_count_more_viviendas_related($args) {
            return $this -> bll -> get_count_more_viviendas_related_BLL($args);
        }

        public function get_vivienda_related($args) {
            return $this -> bll -> get_vivienda_related_BLL($args);
        }
        

        

        

        
        
        // public function get_all_vivienda($args) {
        //     return $this -> bll -> get_all_vivienda_BLL($args);
        // }

        // public function get_redirect_shop($args) {
        //     return $this -> bll -> get_redirect_shop_BLL($args);
        // }
        
        

        
        
    }
?>
