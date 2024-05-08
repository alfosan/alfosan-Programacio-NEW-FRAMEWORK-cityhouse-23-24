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