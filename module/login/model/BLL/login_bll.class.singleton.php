<?php
include('utils/mail.inc.php');
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
			
			if (!empty($this->dao->select_user($this->db, $args[0], $args[2]))) {
				return ['status' => 'error', 'message' => 'error_email'];
			} else {
				$this->dao->insert_user($this->db, $id, $args[0], $hashed_pass, $args[2], $avatar, $token_email);
				
				$message = [
					'type' => 'validate',
					'token_email' => $token_email,
					'toEmail' => $args[2]
				];
		
				error_log("Antes de enviar el correo: " . json_encode($message));
				$email = json_decode(mail::send_email($message), true);
				error_log("Resultado del envío de correo: " . json_encode($email));
				
				if (!empty($email)) {
					return ['status' => 'success'];
				} else {
					return ['status' => 'error', 'message' => 'error_sending_email'];
				}
			}
		}
		
		

		public function get_login_BLL($args) {
			$user = $this->dao->select_user_login($this->db, $args[0]);
			if (!empty($user)) {
				if (password_verify($args[1], $user[0]['password']) && $user[0]['activate'] == 1) {
					// Codificar el access token y el refresh token
					$access_token = create_access_token($user[0]['username']);
					$refresh_token = create_refresh_token($user[0]['username']);
					
					$_SESSION['username'] = $user[0]['username'];
					$_SESSION['tiempo'] = time();
		
					// Crear la respuesta JSON con los tokens
					$response = json_encode(['access_token' => $access_token, 'refresh_token' => $refresh_token]);
				} else if (password_verify($args[1], $user[0]['password']) && $user[0]['activate'] == 0) {
					$response = json_encode('activate error');
				} else {
					$response = json_encode('error');
				}
			} else {
				$response = json_encode('user error');
			}
		
			if (json_last_error() !== JSON_ERROR_NONE) {
				// Manejar error de JSON
				$response = json_encode(['error' => 'JSON encoding error']);
			}
		
			return $response;
		}

		// public function get_login_BLL($args) {
		// 	$user = $this->dao->select_user_login($this->db, $args[0]);
		// 	if (!empty($user)) {
		// 		if (password_verify($args[1], $user[0]['password']) && $user[0]['activate'] == 1) {
		// 			$jwt = jwt_process::encode($user[0]['username']);
		// 			$_SESSION['username'] = $user[0]['username'];
		// 			$_SESSION['tiempo'] = time();
		// 			// session_regenerate_id();
		// 			// Elimina esta línea que imprime el script HTML
		// 			// echo "<script>console.log('Valor de jwt:', " . json_encode($jwt) . ");</script>";
		// 			// echo "<pre>";
		// 			// var_dump($jwt);
		// 			// echo "</pre>";
		// 			$response = json_encode(['access_token' => $jwt['access_token'], 'refresh_token' => $jwt['refresh_token']]);
		// 		} else if (password_verify($args[1], $user[0]['password']) && $user[0]['activate'] == 0) {
		// 			$response = json_encode('activate error');
		// 		} else {
		// 			$response = json_encode('error');
		// 		}
		// 	} else {
		// 		$response = json_encode('user error');
		// 	}
		
		// 	if (json_last_error() !== JSON_ERROR_NONE) {
		// 		// Manejar error de JSON
		// 		$response = json_encode(['error' => 'JSON encoding error']);
		// 	}
		
		// 	return $response;
		// }
		
		
			

		
		public function get_verify_email_BLL($args) {
			if($this -> dao -> select_verify_email($this->db, $args)){
				$this -> dao -> update_verify_email($this->db, $args);
				return 'verify';
			} else {
				return 'fail';
			}
		}

		public function get_recover_email_BLL($args) {
			$user = $this->dao->select_recover_password($this->db, $args);
			$token_email = common::generate_Token_secure(20);
		
			if (!empty($user)) {
				$this->dao->update_recover_password($this->db, $args, $token_email);
				$message = [
					'type' => 'recover',
					'token_email' => $token_email,
					'toEmail' => $args
				];
				$email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					return "ok";
				}
			} else {
				return 'error';
			}
		}

		public function get_new_password_BLL($args) {
			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);
			if($this -> dao -> update_new_passwoord($this->db, $args[0], $hashed_pass)){
				return 'done';
			}
			return 'fail';
		}

		public function get_data_user_BLL($args) {
			$access_token = $args;
		
			$decoded_token = decode_token($access_token); // middleware_auth
			error_log('Decoded Token: ' . print_r($decoded_token, true)); 
			if (!$decoded_token || !isset($decoded_token['username'])) {
				return ['error' => 'Invalid token or username not found in token'];
			}
			
			$username = $decoded_token['username'];
			
			return $this->dao->select_data_user($this->db, $username);
		}

	}