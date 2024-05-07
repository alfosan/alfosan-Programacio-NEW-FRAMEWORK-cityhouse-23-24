<?php
class ctrl_home {
    
    function view(){
        // echo 'hola view';
        common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
    }

    // function carrusel_categorys() {
    //     $categoryData = common::load_model('home_model', 'get_category');
    //     echo json_encode($categoryData);
    // }
    
    // function carrusel_principal_type() {
    //     $typeData = common::load_model('home_model', 'get_type');
    //     echo json_encode($typeData);
    // }

    function carrusel_city() {
        // echo json_encode('HOLAAA');
        
        echo json_encode(common::load_model('home_model', 'get_city'));

    }

    // function carrusel_operations() {
    //     $operationData = common::load_model('home_model', 'get_operation');
    //     echo json_encode($operationData);
    // }

    // function carrusel_principal_custom() {
    //     $customData = common::load_model('home_model', 'get_custom');
    //     echo json_encode($customData);
    // }

    // function carrusel_recomendations() {
    //     $recomendationsData = common::load_model('home_model', 'get_recomendations');
    //     echo json_encode($recomendationsData);
    // }
    // function carrusel_mas_visitadas() {
    //     $morevistData = common::load_model('home_model', 'get_most_visited');
    //     echo json_encode($morevistData);
    // }


}

?>
