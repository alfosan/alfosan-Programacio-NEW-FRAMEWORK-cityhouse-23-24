<?php
    class login_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function insert_user($db, $id, $username_reg, $hashed_pass, $email_reg, $avatar, $token_email) {

            $sql = "INSERT INTO users (id, username, password, email, user_type, avatar, token_email, activate)
            VALUES ('$id', '$username_reg', '$hashed_pass', '$email_reg', 'client', '$avatar', '$token_email', 0)";

            return $stmt = $db->ejecutar($sql);
        }
       
        public function select_user($db, $username, $email){

			$sql = "SELECT id, username, password, email, user_type, avatar, token_email, activate FROM users WHERE username = '$username' OR email = '$email'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
    }

?>