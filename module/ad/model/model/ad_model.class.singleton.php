<?php
class ad_model {

    private $bll;
    static $_instance;

    function __construct() {
        $this->bll = ad_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    
    
}
?>
