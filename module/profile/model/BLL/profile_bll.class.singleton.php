<?php
class carrito_bll {
    private $dao;
    private $db;
    static $_instance;

    function __construct() {
        $this->dao = profile_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

        
}
?>
