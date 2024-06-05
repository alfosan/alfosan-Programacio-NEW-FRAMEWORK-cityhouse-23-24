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

    
    
}
?>
