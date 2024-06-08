<?php
class profile_model {

    private $bll;
    static $_instance;

    function __construct() {
        $this->bll = profile_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_load_factura($args) {
        $username = $args[0];
        return $this->bll->get_load_factura_BLL($username);
    }

    public function get_generate_pdf_factura($args) {
        $id_factura = $args[0];
        return $this->bll->get_generate_pdf_factura_BLL($id_factura);
    }

    
    public function get_all_vivienda_liked($args) {
        $username = $args[0];
        return $this->bll->get_all_vivienda_liked_BLL($username);
    }

    public function get_print_vivienda_liked($args) {
        $ids_viviendas = $args[0];
        return $this->bll->get_print_vivienda_liked_BLL($ids_viviendas);
    }

    public function get_generate_qr($args) {
        $id_factura = $args[0];
        return $this->bll->get_generate_qr_BLL($id_factura);
    }

    

    

    
    
}
?>