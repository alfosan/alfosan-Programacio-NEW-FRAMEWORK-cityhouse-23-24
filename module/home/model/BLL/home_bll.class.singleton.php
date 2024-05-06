<?php
include('module/home/model/DAO/home_dao.class.singleton.php');


class home_bll {
    private $dao;
    static $_instance;

    function __construct() {
        $this -> dao = home_dao::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    // public function get_carrusel_BLL() {
    //     $db = connect::con(); // Establece la conexión
    //     $result = $this -> dao -> select_data_carrusel($db); // Usa la conexión
    //     connect::close($db); // Cierra la conexión
    //     return $result;
    // }

    public function get_category_BLL() {
        $db = connect::con();
        $result = $this -> dao -> select_data_category($db);
        connect::close($db);
        return $result;
    }

    // public function get_type_BLL() {
    //     $db = connect::con();
    //     $result = $this -> dao -> select_data_type($db);
    //     connect::close($db);
    //     return $result;
    // }
}
?>
