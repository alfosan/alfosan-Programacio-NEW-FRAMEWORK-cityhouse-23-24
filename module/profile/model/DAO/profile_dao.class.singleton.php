<?php
class profile_dao {
    static $_instance;

    private function __construct() {
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_factura_user_DAO($db, $username){
        $sql = "SELECT * FROM `facturas` WHERE username='$username'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }


}
?>
