<?php
// include('module/home/model/DAO/home_dao.class.singleton.php');


class home_bll {
    private $dao;
    static $_instance;

    function __construct() {
        $this -> dao = home_dao::getInstance();
        $this -> db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_category_BLL() {
       
        return $this -> dao -> select_data_category($this -> db);
    }

    public function get_type_BLL() {
    
        return $this -> dao -> select_data_type($this -> db);
    }
    
    public function get_city_BLL() {
        
        return $this -> dao -> select_data_city($this -> db);
    }

    public function get_operation_BLL() {

        return $this -> dao -> select_data_operation($this -> db);
    }

    public function get_custom_BLL() {

        return $this -> dao -> select_data_custom($this -> db);
    }
    
    public function get_recomendations_BLL() {
    
        return $this -> dao -> select_data_recomendations($this -> db);
    }

    public function get_most_visited_BLL() {

        return $this -> dao -> select_data_most_visited($this -> db);
    }

    public function get_ultimas_busquedas_BLL($args) {
        return $this->dao->select_data_ultimas_busquedas($this->db, $args);
    }
    

}
?>
