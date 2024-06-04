<?php
class carrito_model {

    private $bll;
    static $_instance;

    function __construct() {
        $this->bll = carrito_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function get_add_to_carrito($args) {
        $id_vivienda = $args[0];
        $username = $args[1];
        $img_vivienda = $args[2];
        $name_city = $args[3];
        $price = $args[4];
        $tipos = $args[5];
        return $this->bll->get_add_to_carrito_BLL($id_vivienda, $username, $img_vivienda, $name_city, $price, $tipos);
    }

    function get_contador_carrito($args) {
        $username = $args[0];
        return $this->bll->get_contador_carrito_BLL($username);
    }

    function get_load_carrito($args) {
        $username = $args[0];
        return $this->bll->get_load_carrito_BLL($username);
    }
 
    function get_carrito_info_vivienda($args) {
        $id_vivienda = $args[0];
        return $this->bll->get_carrito_info_vivienda_BLL($id_vivienda);
    }   
}
?>
