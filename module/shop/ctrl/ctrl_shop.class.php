<?php
    class ctrl_shop {

        function view() {
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }
        
        function list_viviendas() {
            echo json_encode(common::load_model('shop_model', 'get_list_viviendas', [$_POST['start_index'], $_POST['end_index']]));
        }

        function details_vivienda() {
            echo json_encode(common::load_model('shop_model', 'get_details_vivienda', [$_POST['id_vivienda']]));
        }

        public function load_filter_shop() {
            echo json_encode(common::load_model('shop_model', 'get_load_filter_shop'));
        }

        public function count_shop() {
            echo json_encode(common::load_model('shop_model', 'get_count_shop', [$_POST['filter_shop'] ?? array(), $_POST['orderBy'] ?? array()]));
        }
        
        public function count_all() {
            echo json_encode(common::load_model('shop_model', 'get_count_all'));
        }

        public function count_more_viviendas_related() {
            echo json_encode(common::load_model('shop_model', 'get_count_more_viviendas_related',[$_POST['name_city'] ?? array()]));
        }

        public function vivienda_related() {
            echo json_encode(common::load_model('shop_model', 'get_vivienda_related',[$_POST['city'] ?? array(),$_POST['loaded'] ?? array(),$_POST['items'] ?? array()]));
        }

        
        
        //         // En tu controlador ctrl_shop

        // public function load_filter_shop() {
        //     // Definir los argumentos que se necesitan para get_load_filter_shop
        //     $filter_shop = isset($_POST['filter_shop']) ? $_POST['filter_shop'] : array();
        //     $orderBy = isset($_POST['orderBy']) ? $_POST['orderBy'] : array();
        //     $start_index = isset($_POST['start_index']) ? $_POST['start_index'] : 0;
        //     $end_index = isset($_POST['end_index']) ? $_POST['end_index'] : PHP_INT_MAX;
            
        //     // Llamar a la función common::load_model pasando los argumentos
        //     echo json_encode(common::load_model('shop_model', 'get_load_filter_shop', $filter_shop, $orderBy, $start_index, $end_index));
        // }

        
                
        
        // function load_filter_shop() {
        //     echo 'NIJANSIJDNAIJS987987';
        //     echo json_encode(common::load_model('shop_model', 'get_redirect_shop',[$_POST['filter_shop'],$_POST['orderBy'],$_POST['start_index'], $_POST['end_index']]));
        // }
         
        
        // echo json_encode(common::load_model('shop_model', 'get_list', [$_POST['start_index'], $_POST['end_index']]));


        // function list($start_index, $end_index) {
        //     echo json_encode(common::load_model('shop_model', 'get_list', [$start_index, $end_index]));
        // }
        
    }
?>