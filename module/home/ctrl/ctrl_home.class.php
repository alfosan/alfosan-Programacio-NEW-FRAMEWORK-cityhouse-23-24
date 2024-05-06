<?php
class ctrl_home {
    
    function view(){
        echo 'hola view';
        common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
    }

    function carrusel_categorys() {
        $categoryData = common::load_model('home_model', 'get_category');
        echo json_encode($categoryData);
    }

    // function category() {
    //     //
    //     echo json_encode(common::load_model('home_model', 'get_category'));
    // }
    
    // function type() {
    //     // echo json_encode('Hola');
    //     echo json_encode(common::load_model('home_model', 'get_type'));
    // }

}

?>
