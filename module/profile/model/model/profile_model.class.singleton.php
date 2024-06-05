<?php
class carrito_model {

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
    
}
?>
