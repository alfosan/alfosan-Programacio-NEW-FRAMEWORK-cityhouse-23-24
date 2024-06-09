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

    function view_profile() {
        common::load_view('top_page_profile.html', VIEW_PATH_PROFILE . 'profile.html');
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

    public function know_user_profile() {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $access_token = $_GET['access_token'];
            $response = common::load_model('profile_model', 'get_know_user_profile', [$access_token]);
            echo json_encode($response);
        } else {
            echo json_encode(['error' => 'Invalid request method']);
        }
    }

    public function change_user_profile() {
        $response = common::load_model('profile_model', 'get_change_user_profile', [$_POST['access_token'], $_POST['new_username']]);
        echo json_encode($response);
    }
    
    
    
    
    

    

    
    
}
?>
