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

    
    function get_load_factura_BLL($username) {
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

    function get_all_vivienda_liked_BLL($username) {
        return $this->dao->select_all_vivienda_liked_DAO($this->db, $username);
    }

    
    function get_print_vivienda_liked_BLL($ids_viviendas) {
        return $this->dao->select_print_vivienda_liked_DAO($this->db, $ids_viviendas);
    }

    public function get_generate_qr_BLL($id_factura) {
        $data = $this->dao->select_generate_pdf_factura_DAO($this->db, $id_factura);
    
        if ($data) {
            require_once 'utils/pdf_generate.inc.php';
    
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
            return $data[0]; // Assuming data is returned as an array of results
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
    
        // Actualizar el nombre de usuario en la base de datos
        $this->dao->update_know_user_profile_DAO($this->db, $username, $new_username);
    
        // Obtener el nuevo perfil del usuario
        $new_profile = $this->dao->select_know_user1_profile_DAO($this->db, $new_username);
    
        if ($new_profile) {
            		// Codificar el access token y el refresh token
					$access_token = create_access_token($new_profile[0]['username']);
					$refresh_token = create_refresh_token($new_profile[0]['username']);
					
					$_SESSION['username'] = $new_profile[0]['username'];
					$_SESSION['tiempo'] = time();
		
					// Crear la respuesta JSON con los tokens
					$response = json_encode(['access_token' => $access_token, 'refresh_token' => $refresh_token]);
            return $response;
        } else {
            return ['status' => 'error'];
        }
    }

    

    
}
?>
