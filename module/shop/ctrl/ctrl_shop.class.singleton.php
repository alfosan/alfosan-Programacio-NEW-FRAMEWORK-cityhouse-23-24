<?php
    class ctrl_shop {

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

        public function load_filter_home() {
            echo json_encode(common::load_model('shop_model', 'get_load_filter_home'));
        }
        

        public function count_shop() {
            echo json_encode(common::load_model('shop_model', 'get_count_shop', [$_POST['filter_shop'] ?? array(), $_POST['orderBy'] ?? array()]));
        }
        
        public function count_home() {
            $filter_shop = isset($_POST['filter_shop']) ? $_POST['filter_shop'] : array();
            echo json_encode(common::load_model('shop_model', 'get_count_home', [$filter_shop]));
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

        public function vivienda_liked() {
            echo json_encode(common::load_model('shop_model', 'get_vivienda_liked', [$_GET['access_token'], $_GET['id_vivienda'], $_GET['isLiked']]));
        }
        
        public function know_likes_user() {
            echo json_encode(common::load_model('shop_model', 'get_know_likes_user', [$_GET['access_token']]));
        }
        
        public function count_likes() {
            if (!isset($_GET['id_vivienda'])) {
                echo json_encode(['error' => 'id_vivienda not provided']);
                return;
            }
            $result = common::load_model('shop_model', 'get_count_likes', [$_GET['id_vivienda']]);
            echo json_encode($result);
        }

        
        
    }
?>