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

    function get_add_to_carrito_BLL($id_vivienda, $username, $img_vivienda, $name_city, $price, $tipos) {
        try {
            return $this->dao->add_to_carrito_DAO($this->db, $id_vivienda, $username, $img_vivienda, $name_city, $price, $tipos);
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

    function get_load_carrito_BLL($username) {
        try {
            return $this->dao->load_carrito_DAO($this->db, $username);
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    function get_carrito_info_vivienda_BLL($id_vivienda) {
        try {
            return $this->dao->select_carrito_vivienda_DAO($this->db, $id_vivienda);
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    
    
}
?>
