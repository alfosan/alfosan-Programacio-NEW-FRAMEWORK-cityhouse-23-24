<?php
    class ctrl_login {

        function view() {
            common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'login.html');
        }

        public function register() {
            echo json_encode(common::load_model('login_model', 'get_register', [$_POST['username_reg'], $_POST['passwd1_reg'], $_POST['email_reg']]));
        }

        public function verify_email() {
            $token_email = $_POST['token_email'];  
            $verify = common::load_model('login_model', 'get_verify_email', $token_email);
            echo json_encode($verify);
        }
        

        function recover_view() {
            common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'recover_pass.html');
        }
        
        public function send_recover_email() {
            if (isset($_POST['email_forg'])) {
                $email = $_POST['email_forg'];
                echo json_encode(common::load_model('login_model', 'get_recover_email', $email));
            } else {
                echo json_encode('error');
            }
        }
        
        // function register() {
        //     if ($_GET['module'] == 'login' && $_GET['op'] == 'register') {
        //         $response = common::load_model('login_model', 'get_register', [$_POST['username_reg'], $_POST['passwd1_reg'], $_POST['email_reg']]);
        //         echo json_encode($response);
        //     }
        // }
        
        // function login() {
        //     echo json_encode(common::load_model('login_model', 'get_login', [$_POST['username'], $_POST['password']]));
        // }

        // function recover_view() {
        //     common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'recover_pass.html');
        // }

        // function register() {
        //     echo json_encode(common::load_model('login_model', 'get_register', [$_POST['username_reg'], $_POST['pass_reg'], $_POST['email_reg']]));
        // }

        // function social_login() {
        //     echo json_encode(common::load_model('login_model', 'get_social_login', [$_POST['id'], $_POST['username'], $_POST['email'], $_POST['avatar']]));
        // } 

        // function send_recover_email() {
        //     echo json_encode(common::load_model('login_model', 'get_recover_email', $_POST['email_forg']));
        // }

        // function verify_token() {
        //     echo json_encode(common::load_model('login_model', 'get_verify_token', $_POST['token_email']));
        // }

        // function new_password() {
        //     echo json_encode(common::load_model('login_model', 'get_new_password', [$_POST['token_email'], $_POST['password']]));
        // }  
    
        // function logout() {
        //     echo json_encode('Done');
        // } 

        // function data_user() {
        //     echo json_encode(common::load_model('login_model', 'get_data_user', $_POST['token']));
        // }

        // function activity() {
        //     echo json_encode(common::load_model('login_model', 'get_activity'));
        // }

        // function controluser() {
        //     echo json_encode(common::load_model('login_model', 'get_controluser', $_POST['token']));
        // }

        // function refresh_token() {
        //     echo json_encode(common::load_model('login_model', 'get_refresh_token', $_POST['token']));
        // } 
        
        // function token_expires() {
        //     echo json_encode(common::load_model('login_model', 'get_token_expires', $_POST['token']));
        // }

        // function refresh_cookie() {
        //     session_regenerate_id();
        // } 
    
    }
    
?>