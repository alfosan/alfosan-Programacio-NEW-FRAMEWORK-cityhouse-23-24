<?php
class ctrl_ad {

    static $_instance;

    function __construct() {
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function view() {
        common::load_view('top_page_ad.html', VIEW_PATH_AD . 'publicar_anuncio.html');
    }
}
?>