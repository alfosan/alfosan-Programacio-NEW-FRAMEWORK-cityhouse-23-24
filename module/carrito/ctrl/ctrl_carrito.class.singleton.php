<?php
class ctrl_carrito {

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
        common::load_view('top_page_carrito.html', VIEW_PATH_CARRITO . 'carrito.html');
    }

    

}

?>
