
<?php
// include('module/home/model/BLL/home_bll.class.singleton.php');
class home_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = home_bll::getInstance(); 
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_category() {
            return $this -> bll -> get_category_BLL();
        }
        
        public function get_type() {
            return $this -> bll -> get_type_BLL();
        }

        public function get_city() {
            return $this -> bll -> get_city_BLL();
        }

        public function get_operation() {
            return $this -> bll -> get_operation_BLL();
        }
        
        public function get_custom() {
            return $this -> bll -> get_custom_BLL();
        }
        
        public function get_recomendations() {
            return $this -> bll -> get_recomendations_BLL();
        }
                
        public function get_most_visited() {
            return $this -> bll -> get_most_visited_BLL();
        }
        
        public function get_ultimas_busquedas($args) {
            return $this->bll->get_ultimas_busquedas_BLL($args);
        }

    }
?>