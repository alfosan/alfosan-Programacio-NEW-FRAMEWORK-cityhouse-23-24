<?php
class ctrl_carrito {

    static $_instance;

    function __construct() {
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function view() {
        common::load_view('top_page_carrito.html', VIEW_PATH_CARRITO . 'carrito.html');
    }

    // function add_to_carrito() {
    //     if (isset($_POST['id_vivienda']) && isset($_POST['username'])) {
    //         $id_vivienda = $_POST['id_vivienda'];
    //         $username = $_POST['username'];
    //         try {
    //             $response = common::load_model('carrito_model', 'get_add_to_carrito', [$id_vivienda, $username]);
    //             echo json_encode($response);
    //         } catch (Exception $e) {
    //             echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    //         }
    //     } else {
    //         echo json_encode(['status' => 'error', 'message' => 'Invalid parameters']);
    //     }
    // }

    function add_to_carrito() {
        echo json_encode(common::load_model('carrito_model', 'get_add_to_carrito', [$_POST['id_vivienda'], $_POST['username'], $_POST['img_vivienda'], $_POST['name_city'], $_POST['price'], $_POST['tipos']]));
    }
    
    function carrito_info_vivienda() {
        echo json_encode(common::load_model('carrito_model', 'get_carrito_info_vivienda', [$_POST['id_vivienda']]));
    }

    function count_carrito() {
        if (isset($_POST['username'])) {
            $username = $_POST['username'];
            $response = common::load_model('carrito_model', 'get_contador_carrito', [$username]);
            echo json_encode(['status' => 'success', 'data' => $response]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid parameters']);
        }
    }
    
    function load_carrito() {
        echo json_encode(common::load_model('carrito_model', 'get_load_carrito', [$_POST['username']]));
    }

    function delete_to_carrito() {
        echo json_encode(common::load_model('carrito_model', 'get_delete_to_carrito', [$_POST['id_vivienda'],$_POST['username']]));
    }

    function delete_to_carrito_all() {
        echo json_encode(common::load_model('carrito_model', 'get_delete_to_carrito_all', [$_POST['id_vivienda'],$_POST['username']]));
    }

    function vaciar_carrito() {
        echo json_encode(common::load_model('carrito_model', 'get_vaciar_carrito', [$_POST['access_token']]));
    }
    
    
    
    
    
    
}
?>
