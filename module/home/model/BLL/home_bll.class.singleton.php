<?php
include('module/home/model/DAO/home_dao.class.singleton.php');


class home_bll {
    private $dao;
    static $_instance;

    // function __construct() {
    //     $this -> dao = home_dao::getInstance();
    // }

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

    // public function get_category_BLL() {
    //     $db = connect::con();
    //     $result = $this -> dao -> select_data_category($db);
    //     connect::close($db);
    //     return $result;
    // }

    // public function get_type_BLL() {
    //     $db = connect::con();
    //     $result = $this -> dao -> select_data_type($db);
    //     connect::close($db);
    //     return $result;
    // }
    
    public function get_city_BLL() {
        return $this -> dao -> select_data_city($this -> db);

    }

    // public function get_operation_BLL() {
    //     $db = connect::con();
    //     $result = $this -> dao -> select_data_operation($db);
    //     connect::close($db);
    //     return $result;
    // }

    // public function get_custom_BLL() {
    //     $db = connect::con();
    //     $result = $this -> dao -> select_data_custom($db);
    //     connect::close($db);
    //     return $result;
    // }
    
    // public function get_recomendations_BLL() {
    //     $db = connect::con();
    //     $result = $this -> dao -> select_data_recomendations($db);
    //     connect::close($db);
    //     return $result;
    // }
    // public function get_most_visited_BLL() {
    //     $db = connect::con();
    //     $result = $this -> dao -> select_data_most_visited($db);
    //     connect::close($db);
    //     return $result;
    // }

}
?>
