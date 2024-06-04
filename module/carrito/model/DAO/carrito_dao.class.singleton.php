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

    function add_to_carrito_DAO($db, $id_vivienda, $username, $img_vivienda, $name_city, $price, $tipos) {
        $sql = "INSERT INTO carrito (id_vivienda, username, img_vivienda, name_city, price, tipos) 
                VALUES ('$id_vivienda', '$username', '$img_vivienda', '$name_city', '$price', '$tipos')";
        return $db->ejecutar($sql);
    }
    

    function contador_carrito_DAO($db, $username) {
        $sql = "SELECT COUNT(id_carrito) as count FROM carrito WHERE username = '$username'";
        $stmt = $db->ejecutar($sql);
        $result = $db->listar($stmt);
        return ['count' => $result[0]['count']];
    }

    function load_carrito_DAO($db, $username) {
        $sql = "SELECT *,COUNT(id_carrito) AS encargos FROM carrito WHERE username = '$username' GROUP BY id_vivienda";
        $stmt = $db->ejecutar($sql);
        $result = $db->listar($stmt);
        return $result;
    }

    function select_carrito_vivienda_DAO($db, $id_vivienda) {
        $sql = "SELECT v.img_vivienda, v_o.price,c.name_city,t.tipos,v.stock
        FROM vivienda v 
        INNER JOIN vivienda_operation v_o ON v.id_vivienda = v_o.id_vivienda 
        INNER JOIN city c ON c.id_city = v.id_city
        INNER JOIN tipo t ON t.id_type = v.id_type
        WHERE v.id_vivienda = '$id_vivienda'";
        $stmt = $db->ejecutar($sql);
        $result = $db->listar($stmt);
        return $result;
    }

    
    function delete_carrito_vivienda_DAO($db, $id_vivienda, $username) {
        $sql = "DELETE FROM `carrito`
        WHERE id_vivienda = $id_vivienda
        AND username = '$username'
        LIMIT 1;";
        return $db->ejecutar($sql);
    }

    function delete_all_carrito_vivienda_DAO($db, $id_vivienda, $username) {
        $sql = "DELETE FROM `carrito`
        WHERE id_vivienda = $id_vivienda
        AND username = '$username'";
        return $db->ejecutar($sql);
    }

    function delete_vaciar_carrito_DAO($db, $username) {
        $sql = "DELETE FROM `carrito`
        WHERE username = '$username'";
        return $db->ejecutar($sql);
    }

    

    
    
    

    
}
?>
