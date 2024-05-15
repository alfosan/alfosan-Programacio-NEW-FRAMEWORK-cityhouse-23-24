<?php
	class login_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = login_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_register_BLL($args) {
			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT);
			$hashavatar = md5(strtolower(trim($args[2]))); 
			$avatar = "https://robohash.org/$hashavatar";
			$token_email = common::generate_Token_secure(20);
			$id = common::generate_Token_secure(6);

			if (!empty($this -> dao -> select_user($this->db, $args[0], $args[2]))) {
				return 'error';
            } else {
				$this -> dao -> insert_user($this->db, $id, $args[0], $hashed_pass, $args[2], $avatar, $token_email);
				$message = [ 'type' => 'validate', 
								'token' => $token_email, 
								'toEmail' =>  $args[0]];
				$email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					return;  
				}   
			}
		}

		public function get_login_BLL($args) {
			if (!empty($this -> dao -> select_user($this->db, $args[0], $args[0]))) {
				$user = $this -> dao -> select_user($this->db, $args[0], $args[0]);
				if (password_verify($args[1], $user[0]['password']) && $user[0]['activate'] == 1) {
					$jwt = jwt_process::encode($user[0]['username']);
					$_SESSION['username'] = $user[0]['username'];
					$_SESSION['tiempo'] = time();
                    session_regenerate_id();
					return json_encode($jwt);
				} else if (password_verify($args[1], $user[0]['password']) && $user[0]['activate'] == 0) {
					return 'activate error';
				} else {
					return 'error';
				}
            } else {
				return 'user error';
			}
		}
	}