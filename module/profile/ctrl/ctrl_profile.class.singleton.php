<?php
class ctrl_profile {

    static $_instance;

    function __construct() {
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function view_facturas() {
        common::load_view('top_page_profile.html', VIEW_PATH_PROFILE . 'facturas.html');
    }

    function view_likes() {
        common::load_view('top_page_profile.html', VIEW_PATH_PROFILE . 'likes.html');
    }

    public function load_factura() {
        $response = common::load_model('profile_model', 'get_load_factura', [$_POST['username']]);
        echo json_encode($response);
    }

    function generate_pdf_factura() {
        echo json_encode(common::load_model('profile_model', 'get_generate_pdf_factura', [$_POST['id_factura']]));
    }

    public function all_vivienda_liked() {
        $response = common::load_model('profile_model', 'get_all_vivienda_liked', [$_POST['username']]);
        echo json_encode($response);
    }
 
    public function print_vivienda_liked() {
        $response = common::load_model('profile_model', 'get_print_vivienda_liked', [$_POST['ids_viviendas']]);
        echo json_encode($response);
    }

    public function generate_qr() {
        $response = common::load_model('profile_model', 'get_generate_qr', [$_POST['id_factura']]);
        echo json_encode($response);
    }
    
    

    

    
    
}
?>
