<?php
class profile_bll {
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

    
    function get_load_factura_BLL($username) {
        return $this->dao->select_factura_user_DAO($this->db, $username);
    }

    public function get_generate_pdf_factura_BLL($id_factura) {
        $data = $this->dao->select_generate_pdf_factura_DAO($this->db, $id_factura);
    
        if ($data) {
            require_once 'utils/pdf_generate.inc.php';
    
            $pdfPath = pdf_generator::generate_factura_pdf($id_factura, $data);
            
            return ['status' => 'success', 'url' => $pdfPath];
        } else {
            return ['status' => 'error'];
        }
    }

    function get_all_vivienda_liked_BLL($username) {
        return $this->dao->select_all_vivienda_liked_DAO($this->db, $username);
    }

    
    function get_print_vivienda_liked_BLL($ids_viviendas) {
        return $this->dao->select_print_vivienda_liked_DAO($this->db, $ids_viviendas);
    }
}
?>
