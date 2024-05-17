<?php
class login_model {
    private $bll;
    static $_instance;
    
    function __construct() {
        $this -> bll = login_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_register($args) {
        $res = $this -> bll -> get_register_BLL($args);
        return $res;
    }
    

    public function get_login($args) {
        return $this -> bll -> get_login_BLL($args);
    }
}