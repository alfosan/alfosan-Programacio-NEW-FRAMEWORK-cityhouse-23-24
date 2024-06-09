<?php
class carrito_bll {
    private $dao;
    private $db;
    static $_instance;

    function __construct() {
        $this->dao = carrito_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function get_add_to_carrito_BLL($id_vivienda, $username, $img_vivienda, $name_city, $price, $tipos) {
        try {
            return $this->dao->add_to_carrito_DAO($this->db, $id_vivienda, $username, $img_vivienda, $name_city, $price, $tipos);
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }
    
    function get_contador_carrito_BLL($access_token) {
        $decoded_token = decode_token($access_token);
			error_log('Decoded Token: ' . print_r($decoded_token, true)); 
		
			if (!$decoded_token || !isset($decoded_token['username'])) {
				return ['error' => 'Invalid token or username not found in token'];
			}
		
		$username = $decoded_token['username'];
        try {
            return $this->dao->contador_carrito_DAO($this->db, $username);
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    function get_load_carrito_BLL($access_token) {
        $decoded_token = decode_token($access_token);
			error_log('Decoded Token: ' . print_r($decoded_token, true)); 
		
			if (!$decoded_token || !isset($decoded_token['username'])) {
				return ['error' => 'Invalid token or username not found in token'];
			}
		
		$username = $decoded_token['username'];
        try {
            return $this->dao->load_carrito_DAO($this->db, $username);
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    function get_carrito_info_vivienda_BLL($id_vivienda) {
        try {
            return $this->dao->select_carrito_vivienda_DAO($this->db, $id_vivienda);
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    function get_delete_to_carrito_BLL($id_vivienda,$username) {
        try {
            return $this->dao->delete_carrito_vivienda_DAO($this->db, $id_vivienda, $username);
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    function get_delete_to_carrito_all_BLL($id_vivienda,$username) {
        try {
            return $this->dao->delete_all_carrito_vivienda_DAO($this->db, $id_vivienda, $username);
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    function get_vaciar_carrito_BLL($access_token) {
        try {
            $decoded_token = decode_token($access_token);
			error_log('Decoded Token: ' . print_r($decoded_token, true)); 
		
			if (!$decoded_token || !isset($decoded_token['username'])) {
				return ['error' => 'Invalid token or username not found in token'];
			}
		
			$username = $decoded_token['username'];
		
            return $this->dao->delete_vaciar_carrito_DAO($this->db, $username);
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }


    function get_insert_factura_BLL($all_data_carrito) {
        $count = 0;
        foreach ($all_data_carrito as $item) {
            $result = $this->dao->insert_factura_DAO($this->db, $item['id_vivienda'], $item['tipos'], $item['name_city'], $item['price'], $item['username'], $item['encargos']);
            if ($result) {
                $count++;
            }
        }
        return ['status' => 'success', 'data' => ['count' => $count]];
    }


    
    public function get_restar_stock_BLL($all_data_carrito) {
        $count = 0;
        foreach ($all_data_carrito as $item) {
            $result = $this->dao->resta_stock_DAO($this->db, $item['id_vivienda'], $item['encargos']);
            if ($result) {
                $count++;
            }
        }
        return ['status' => 'success', 'data' => ['count' => $count]];
    }
}
?>
