<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = search_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_search_type_BLL() {
			return $this -> dao -> select_search_type($this->db);
		}
		
		public function get_search_category_null_BLL() {
			return $this -> dao -> select_search_category_null($this->db);
		}

		public function get_search_category_BLL($args) {
			return $this->dao->select_search_category($this->db, $args[0]);
		}
		
		
		
		

		public function get_autocomplete_search_BLL() {
			return $this -> dao -> select_autocomplete_search($this->db);
		}

		
		

		

		
		
	}
?>