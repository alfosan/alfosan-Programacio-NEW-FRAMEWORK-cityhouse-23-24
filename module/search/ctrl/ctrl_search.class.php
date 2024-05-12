<?php
    class ctrl_search {

        function search_type() {
            echo json_encode(common::load_model('search_model', 'get_search_type'));
        }

        
        function search_category_null() {
            echo json_encode(common::load_model('search_model', 'get_search_category_null'));
        }

        function search_category() {
            if (isset($_POST['tipo'])) {
                $tipo = $_POST['tipo'];
                echo json_encode(common::load_model('search_model', 'get_search_category', $tipo));
            } else {
                echo json_encode(['error' => 'El "tipo" no está definido en POST.']);
            }
        }
        
        // function search_category() {
        //     echo json_encode(common::load_model('search_model', 'get_search_category', $_POST['tipo']));
        // }
        
        function autocomplete_search() {
            echo json_encode(common::load_model('search_model', 'get_autocomplete_search'));
        }

        
        // function car_brand() {
        //     if(empty($_POST['car_type'])){
        //         echo json_encode(common::load_model('search_model', 'get_car_brand'));
        //     }else{
        //         echo json_encode(common::load_model('search_model', 'get_car_type_brand', $_POST['car_type']));
        //     }
        // }
        
        // function autocomplete() {
        //     if (!empty($_POST['car_type']) && empty($_POST['car_brand'])){
        //         echo json_encode(common::load_model('search_model', 'get_auto_car_type', [$_POST['car_type'], $_POST['complete']]));
        //     }else if(empty($_POST['car_type']) && !empty($_POST['categoria'])){
        //         echo json_encode(common::load_model('search_model', 'get_auto_car_brand', [$_POST['car_brand'], $_POST['complete']]));
        //     }else if(!empty($_POST['car_type']) && !empty($_POST['car_brand'])){
        //         echo json_encode(common::load_model('search_model', 'get_auto_car_type_brand', [$_POST['car_type'], $_POST['car_brand'], $_POST['complete']]));
        //     }else {
        //         echo json_encode(common::load_model('search_model', 'get_auto', $_POST['complete']));
        //     }
        // }
    }
?>