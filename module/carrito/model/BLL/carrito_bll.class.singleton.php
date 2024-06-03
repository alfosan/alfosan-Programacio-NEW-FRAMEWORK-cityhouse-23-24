<?php
class carrito_bll {
    private $dao;
    private $db;
    static $_instance;

    function __construct() {
        $this->dao = carrito_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function get_add_to_carrito_BLL($id_vivienda, $username) {
        try {
            return $this->dao->add_to_carrito_DAO($this->db, $id_vivienda, $username);
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    function get_contador_carrito_BLL($username) {
        try {
            return $this->dao->contador_carrito_DAO($this->db, $username);
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }
    
}
?>
