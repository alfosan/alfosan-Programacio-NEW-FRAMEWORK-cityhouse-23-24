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

    public function load_factura() {
        $response = common::load_model('profile_model', 'get_load_factura', [$_POST['username']]);
        echo json_encode($response);
    }

    function generate_pdf_factura() {
        echo json_encode(common::load_model('profile_model', 'get_generate_pdf_factura', [$_POST['id_factura']]));
    }
    
    
    

    
    
}
?>
