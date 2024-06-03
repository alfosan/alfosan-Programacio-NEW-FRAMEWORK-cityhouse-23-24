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

    function add_to_carrito_DAO($db, $id_vivienda, $username) {
        $sql = "INSERT INTO carrito (id_vivienda, username) VALUES ('$id_vivienda', '$username')";
        return $db->ejecutar($sql);
    }

    function contador_carrito_DAO($db, $username) {
        $sql = "SELECT COUNT(id_carrito) as count FROM carrito WHERE username = '$username'";
        $stmt = $db->ejecutar($sql);
        $result = $db->listar($stmt);
        return ['count' => $result[0]['count']];
    }
    

    
}
?>
