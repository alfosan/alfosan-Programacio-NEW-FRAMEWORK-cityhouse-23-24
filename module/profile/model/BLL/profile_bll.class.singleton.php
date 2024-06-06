<?php
class profile_bll {
    private $dao;
    private $db;
    static $_instance;

    function __construct() {
        $this->dao = profile_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    
    function get_load_factura_BLL($username) {
        return $this->dao->select_factura_user_DAO($this->db, $username);
    }
    // function get_load_factura_BLL($username) {
    //     $facturas = $this->dao->select_factura_user_DAO($username);
    //     $groupedFacturas = [];
    
    //     foreach ($facturas as $factura) {
    //         $id_factura = $factura['id_factura'];
    //         if (!isset($groupedFacturas[$id_factura])) {
    //             $groupedFacturas[$id_factura] = [
    //                 'id_factura' => $id_factura,
    //                 'username' => $factura['username'],
    //                 'fecha' => $factura['fecha'], // Puedes agregar más datos de la factura aquí
    //                 'items' => [] // Lista de elementos de factura asociados a esta factura
    //             ];
    //         }
    //         // Agregar el elemento de factura a la lista de elementos de esta factura
    //         $groupedFacturas[$id_factura]['items'][] = [
    //             'tipo' => $factura['tipo'],
    //             'name_city' => $factura['name_city'],
    //             'price' => $factura['price'],
    //             'cant' => $factura['cant']
    //             // Puedes agregar más campos si es necesario
    //         ];
    //     }
    
        // Convertir el array asociativo a un array indexado
//         return array_values($groupedFacturas);
//     }
}
?>
