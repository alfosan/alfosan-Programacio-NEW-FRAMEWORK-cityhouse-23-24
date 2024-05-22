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

        // public function insert_user($db, $username, $email, $password){
        //     $hashed_pass = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
        //     $hashavatar = md5(strtolower(trim($email))); 
        //     $avatar = "https://i.pravatar.cc/500?u=$hashavatar";
        //     $sql ="   INSERT INTO `users`(`username`, `password`, `email`, `type_user`, `avatar`) 
        //     VALUES ('$username','$hashed_pass','$email','client','$avatar')";

        //     return $stmt = $db->ejecutar($sql);
        // }
        public function insert_user($db, $id, $username_reg, $hashed_pass, $email_reg, $avatar, $token_email) {

            $sql = "INSERT INTO users (id_user, username, password, email, type_user, avatar, token_email, activate)
            VALUES ('$id', '$username_reg', '$hashed_pass', '$email_reg', 'client', '$avatar', '$token_email', 0)";

            return $stmt = $db->ejecutar($sql);
        }
       
        public function select_user($db, $username_reg, $email_reg){
			$sql = "SELECT `username`, `password`, `email`, `type_user`, `token_email`, `avatar` FROM `users` WHERE username='$username_reg' OR email = '$email_reg'";
            
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_verify_email($db, $token_email){

			$sql = "SELECT token_email FROM users WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        } 

        public function update_verify_email($db, $token_email){

            $sql = "UPDATE users SET activate = 1, token_email= '' WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
            return "update";
        }

        public function select_recover_password($db, $email) {
            $sql = "SELECT `email` FROM `users` WHERE email = '$email' AND password NOT LIKE ('')";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        
        public function update_recover_password($db, $email, $token_email) {
            $sql = "UPDATE `users` SET `token_email`= '$token_email', `activate`= '0' WHERE `email` = '$email'";
            $stmt = $db->ejecutar($sql);
            return "ok";
        }
    }

?>