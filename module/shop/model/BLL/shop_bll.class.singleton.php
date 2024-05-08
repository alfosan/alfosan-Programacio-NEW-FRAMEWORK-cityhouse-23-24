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

		// public function get_all_vivienda_BLL($args) {
		// 	return $this -> dao -> select_all_viviendas($this->db, $args[0], $args[1]);
		// }

		// public function get_redirect_shop_BLL($args) {
		// 	return $this -> dao -> select_redirect_shop($this->db, $args[0], $args[1], $args[2], $args[3]);
		// }

		

        
	}
?>