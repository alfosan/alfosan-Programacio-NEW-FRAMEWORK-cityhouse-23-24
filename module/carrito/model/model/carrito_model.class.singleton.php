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
        $access_token = $args[0];
        return $this->bll->get_contador_carrito_BLL($access_token);
    }

    function get_load_carrito($args) {
        $access_token = $args[0];
        return $this->bll->get_load_carrito_BLL($access_token);
    }
 
    function get_carrito_info_vivienda($args) {
        $id_vivienda = $args[0];
        return $this->bll->get_carrito_info_vivienda_BLL($id_vivienda);
    }   

    function get_delete_to_carrito($args) {
        $id_vivienda = $args[0];
        $username = $args[1];
        return $this->bll->get_delete_to_carrito_BLL($id_vivienda,$username);
    } 
    
    
    function get_delete_to_carrito_all($args) {
        $id_vivienda = $args[0];
        $username = $args[1];
        return $this->bll->get_delete_to_carrito_all_BLL($id_vivienda,$username);
    } 


    function get_vaciar_carrito($args) {
        $access_token = $args[0];
        return $this->bll->get_vaciar_carrito_BLL($access_token);
    } 

    function get_insert_factura($args) {
        $all_data_carrito = $args[0]; // Obtén el array del carrito
        return $this->bll->get_insert_factura_BLL($all_data_carrito);
    }
    
    public function get_restar_stock($args) {
        $all_data_carrito = $args[0];
        return $this->bll->get_restar_stock_BLL($all_data_carrito);
    }
    


    
    
}
?>
