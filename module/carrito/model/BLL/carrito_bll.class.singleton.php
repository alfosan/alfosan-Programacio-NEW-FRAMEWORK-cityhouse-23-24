<?php
// include('module/home/model/DAO/home_dao.class.singleton.php');


class carrito_bll {
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

    
    

}
?>
