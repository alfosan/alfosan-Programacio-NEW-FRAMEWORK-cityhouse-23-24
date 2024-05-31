<?php
	class shop_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = shop_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_list_viviendas_BLL($args) {
			return $this->dao->select_list_viviendas($this->db, $args[0], $args[1]);
		}

		public function get_details_vivienda_BLL($args) {
			return $this->dao->select_details_vivienda($this->db, $args[0]);
		}	

		public function get_load_filter_shop_BLL($filter_shop, $orderBy, $start_index, $end_index) {
			return $this->dao->select_redirect_shop($this->db, $filter_shop, $orderBy, $start_index, $end_index);
		}

		public function get_load_filter_home_BLL($filter_shop, $orderBy, $start_index, $end_index) {
			return $this->dao->select_redirect_home($this->db, $filter_shop, $orderBy, $start_index, $end_index);
		}
		
		public function get_count_shop_BLL($args) {
			return $this->dao->select_count_shop($this->db, $args[0], $args[1]);
		}	

		public function get_count_home_BLL($args) {
			return $this->dao->select_count_home($this->db, $args[0]);
		}
		

		public function get_count_all_BLL() {
			return $this->dao->select_count_all($this->db);
		}

		public function get_count_more_viviendas_related_BLL($args) {
			return $this->dao->select_count_more_viviendas_related($this->db, $args[0]);
		}	

		public function get_vivienda_related_BLL($args) {
			return $this->dao->select_viviendas_related($this->db,$args[0],$args[1],$args[2]);
		}
		public function get_vivienda_liked_BLL($args) {
			$access_token = $args[0];
			$id_vivienda = $args[1];
			$isLiked = $args[2];
		
			$decoded_token = decode_token($access_token);
			if (!$decoded_token || !isset($decoded_token['username'])) {
				return ['error' => 'Invalid token or username not found in token'];
			}
			$username = $decoded_token['username'];
		
			try {
				if ($isLiked) {
					$this->dao->insert_vivienda_like($this->db, $username, $id_vivienda);
					return "Liked vivienda with id $id_vivienda by user with id $username";
				} else {
					$this->dao->delete_vivienda_like($this->db, $username, $id_vivienda);
					return "Disliked vivienda with id $id_vivienda by user with id $username";
				}
			} catch (Exception $e) {
				return ['error' => $e->getMessage()];
			}
		}
		
	
		public function get_know_likes_user_BLL($args) {
			$access_token = $args[0];
	
			$decoded_token = decode_token($access_token);
			if (!$decoded_token || !isset($decoded_token['username'])) {
				return ['error' => 'Invalid token or username not found in token'];
			}
			$username = $decoded_token['username'];
	
			return $this->dao->select_vivienda_like($this->db, $username);
		}
	
		public function get_count_likes_BLL($args) {
			$id_vivienda = $args[0];
	
			$result = $this->dao->select_vivienda_counter_like($this->db, $id_vivienda);
			if (isset($result['error'])) {
				return ['error' => 'Database error while fetching likes count'];
			}
	
			return $result;
		}
	
		
	
		// public function get_all_vivienda_BLL($args) {
		// 	return $this -> dao -> select_all_viviendas($this->db, $args[0], $args[1]);
		// }

		// public function get_redirect_shop_BLL($args) {
		// 	return $this -> dao -> select_redirect_shop($this->db, $args[0], $args[1], $args[2], $args[3]);
		// }

		

        
	}
?>