<?php
class profile_bll {
    private $dao;
    private $db;
    static $_instance;

    function __construct() {
        $this->dao = profile_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    
    function get_load_factura_BLL($access_token) {
        $decoded_token = decode_token($access_token);
			error_log('Decoded Token: ' . print_r($decoded_token, true)); 
		
			if (!$decoded_token || !isset($decoded_token['username'])) {
				return ['error' => 'Invalid token or username not found in token'];
			}
		
		$username = $decoded_token['username'];
        return $this->dao->select_factura_user_DAO($this->db, $username);
    }

    public function get_generate_pdf_factura_BLL($id_factura) {
        $data = $this->dao->select_generate_pdf_factura_DAO($this->db, $id_factura);
    
        if ($data) {
            require_once 'utils/pdf_generate.inc.php';
    
            $pdfPath = pdf_generator::generate_factura_pdf($id_factura, $data);
            
            return ['status' => 'success', 'url' => $pdfPath];
        } else {
            return ['status' => 'error'];
        }
    }

    function get_all_vivienda_liked_BLL($access_token) {
        $decoded_token = decode_token($access_token);
			error_log('Decoded Token: ' . print_r($decoded_token, true)); 
		
			if (!$decoded_token || !isset($decoded_token['username'])) {
				return ['error' => 'Invalid token or username not found in token'];
			}
		
		$username = $decoded_token['username'];
        return $this->dao->select_all_vivienda_liked_DAO($this->db, $username);
    }

    
    function get_print_vivienda_liked_BLL($ids_viviendas) {
        return $this->dao->select_print_vivienda_liked_DAO($this->db, $ids_viviendas);
    }

    public function get_generate_qr_BLL($id_factura) {
        $data = $this->dao->select_generate_pdf_factura_DAO($this->db, $id_factura);
    
        if ($data) {
            require_once 'utils/qr_generate.inc.php';
    
            $qrPath = qr_generate::show_qr($id_factura);
            
            return ['status' => 'success', 'url' => $qrPath];
        } else {
            return ['status' => 'error'];
        }
    }

    public function get_know_user_profile_BLL($access_token) {
        $decoded_token = decode_token($access_token);
        error_log('Decoded Token: ' . print_r($decoded_token, true)); 
    
        if (!$decoded_token || !isset($decoded_token['username'])) {
            return ['error' => 'Invalid token or username not found in token'];
        }
    
        $username = $decoded_token['username'];
    
        $data = $this->dao->select_know_user_profile_DAO($this->db, $username);
    
        if ($data) {
            return $data[0]; 
        } else {
            return ['status' => 'error'];
        }
    }

    public function get_change_user_profile_BLL($access_token, $new_username) {
        $decoded_token = decode_token($access_token);
        error_log('Decoded Token: ' . print_r($decoded_token, true)); 
    
        if (!$decoded_token || !isset($decoded_token['username'])) {
            return ['error' => 'Invalid token or username not found in token'];
        }
    
        $username = $decoded_token['username'];
    
        $this->dao->update_know_user_profile_DAO($this->db, $username, $new_username);
    
        $new_profile = $this->dao->select_know_user_new_profile_DAO($this->db, $new_username);
    
        if ($new_profile) {
					$access_token = create_access_token($new_profile[0]['username']);
					$refresh_token = create_refresh_token($new_profile[0]['username']);
					
					$_SESSION['username'] = $new_profile[0]['username'];
					$_SESSION['tiempo'] = time();
		
					$response = json_encode(['access_token' => $access_token, 'refresh_token' => $refresh_token]);
            return $response;
        } else {
            return ['status' => 'error'];
        }
    }

    
    public function get_change_email_profile_BLL($access_token, $new_email) {
        $token_email = common::generate_Token_secure(20);
        $decoded_token = decode_token($access_token);
        error_log('Decoded Token: ' . print_r($decoded_token, true));
    
        if (!$decoded_token || !isset($decoded_token['username'])) {
            return ['error' => 'Invalid token or username not found in token'];
        }
    
        $username = $decoded_token['username'];
    
        $existing_email = $this->dao->select_know_email_profile_DAO($this->db, $new_email);
    
        if ($existing_email) {
            return ['status' => 'error', 'message' => 'Email already in use'];
        } else {
            $this->dao->update_know_email_profile_DAO($this->db, $username, $new_email, $token_email);
            
            $message = [
                'type' => 'validate',
                'token_email' => $token_email,
                'toEmail' => $new_email
            ];
    
            error_log("Antes de enviar el correo: " . json_encode($message));
            $email = json_decode(mail::send_email($message), true);
            error_log("Resultado del envío de correo: " . json_encode($email));
            
            if (!empty($email)) {
                return ['status' => 'success'];
            } else {
                return ['status' => 'error', 'message' => 'error_sending_email'];
            }
            // return ['status' => 'success'];
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

    public function get_save_avatar_BLL($avatarFile, $access_token) {
        $decoded_token = decode_token($access_token);
        error_log('Decoded Token: ' . print_r($decoded_token, true));
    
        if (!$decoded_token || !isset($decoded_token['username'])) {
            return ['error' => 'Invalid token or username not found in token'];
        }
    
        $username = $decoded_token['username'];
    
        $targetDirectory = 'C:/xampp/htdocs/proyectos/FRAMEWORK_CITYHOUSE/view/images/profile/profile_img_users/';
    
        $fileExtension = pathinfo($avatarFile["name"], PATHINFO_EXTENSION);
    
        $fileName = 'img_' . $username . '.' . $fileExtension;
    
        $targetFilePath = $targetDirectory . $fileName;
    
        if (move_uploaded_file($avatarFile["tmp_name"], $targetFilePath)) {
            return "Archivo guardado correctamente en " . $targetFilePath;
        } else {
            return "Ha ocurrido un error al subir el archivo.";
        }
    }
    

    public function get_profile_images_BLL($access_token) {
        $decoded_token = decode_token($access_token);
        error_log('Decoded Token: ' . print_r($decoded_token, true));
    
        if (!$decoded_token || !isset($decoded_token['username'])) {
            return ['error' => 'Invalid token or username not found in token'];
        }
    
        $username = $decoded_token['username'];
        $directory = 'C:/xampp/htdocs/proyectos/FRAMEWORK_CITYHOUSE/view/images/profile/profile_img_users/';
    
        $images = array_diff(scandir($directory), array('.', '..'));
    
        $userImage = null;
        foreach ($images as $image) {
            if (preg_match("/^img_$username\.(png|jpg|jpeg)$/", $image)) {
                $userImage = $image;
                break;
            }
        }
    
        if ($userImage) {
            $relativePath = str_replace('C:/xampp/htdocs', '', $directory . $userImage);
            return ['image' => $relativePath];
        } else {
            return ['error' => 'No image found for username'];
        }
    }

    public function get_save_avatar_db_BLL($access_token, $image) {
        $decoded_token = decode_token($access_token);
        error_log('Decoded Token: ' . print_r($decoded_token, true));
    
        if (!$decoded_token || !isset($decoded_token['username'])) {
            return ['error' => 'Invalid token or username not found in token'];
        }
    
        $username = $decoded_token['username'];
    
        $this->dao->update_avatar_DAO($this->db, $username, $image);
    }

    
    
}
?>
