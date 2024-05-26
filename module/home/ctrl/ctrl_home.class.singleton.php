<?php
class ctrl_home {

    static $_instance;
            
    function __construct() {
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    
    function view(){
        // echo 'hola view';
        common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
    }

    function carrusel_categorys() {
        echo json_encode(common::load_model('home_model', 'get_category'));
    }
    
    function carrusel_principal_type() {
        echo json_encode(common::load_model('home_model', 'get_type'));

    }

    function carrusel_city() {
        // echo json_encode('HOLAAA');    
        echo json_encode(common::load_model('home_model', 'get_city'));
    }

    function carrusel_operations() {
        echo json_encode(common::load_model('home_model', 'get_operation'));
    }

    function carrusel_principal_custom() {
        echo json_encode(common::load_model('home_model', 'get_custom'));
    }

    function carrusel_recomendations() {
        echo json_encode(common::load_model('home_model', 'get_recomendations'));
    }

    function carrusel_mas_visitadas() {
        echo json_encode(common::load_model('home_model', 'get_most_visited'));
    }

    function carrusel_ultimas_busquedas() {
        echo json_encode(common::load_model('home_model', 'get_ultimas_busquedas',$_POST['ids']));
    }

}

?>
