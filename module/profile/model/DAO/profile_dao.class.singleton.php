<?php
class carrito_dao {
    static $_instance;

    private function __construct() {
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    
}
?>
