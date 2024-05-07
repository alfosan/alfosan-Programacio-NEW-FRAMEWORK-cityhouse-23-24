<?php
// Incluir archivos de configuración y clases
// include('model/Conf.class.singleton.php');
include('model/db.class.singleton.php');
    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

		public function select_data_city($db) {

            $sql= "SELECT * FROM `city` ORDER BY id_city ASC LIMIT 30;";
			
			$stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_category($db) {

            $sql= "SELECT * FROM `category` ORDER BY id_category ASC LIMIT 30;";

			$stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_type($db) {

            $sql= "SELECT * FROM `tipo` ORDER BY id_type ASC LIMIT 30;";

			$stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }


        
        public function select_data_operation($db) {

            $sql= "SELECT * FROM `operation` ORDER BY id_operation ASC LIMIT 30;";

			$stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);

        }

        
        public function select_data_custom($db) {

            $sql= "SELECT * FROM `customed_rooms` ORDER BY id_custom_room ASC LIMIT 30;";

			$stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);

        }

		public function select_data_recomendations($db) {

			$sql= "SELECT * FROM vivienda ORDER BY id_vivienda DESC LIMIT 4";

			$stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);

        }

		public function select_data_most_visited($db) {

			$sql= "SELECT * FROM `vivienda` ORDER BY vistas DESC LIMIT 8;";

			$stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);

        }
		
		public function select_data_ultimas_busquedas($db, $idsArray) {
			// Prepara la lista de IDs para usar en la consulta SQL
			$ids = implode(',', array_map('intval', $idsArray));
		
			// Construye la consulta SQL con la cláusula IN
			$sql = "SELECT 
				v.id_vivienda, v.img_vivienda, t.tipos, op.operation_type, v_o.price, c.name_city, v.ubicacion, v.m2, v.n_habitaciones, v.n_banos,
				cm.id_custom_room, v.vistas,
				GROUP_CONCAT(DISTINCT cm.name_room SEPARATOR ':') AS name_room,
				GROUP_CONCAT(DISTINCT cm.icon_custom SEPARATOR ':') AS icon_custom, 
				GROUP_CONCAT(DISTINCT ex.icon_extra SEPARATOR ':') AS icon_extra, 
				GROUP_CONCAT(DISTINCT ex.name_extra SEPARATOR ':') AS name_extra
				FROM vivienda v
				INNER JOIN tipo t ON v.id_type = t.id_type
				INNER JOIN city c ON v.id_city = c.id_city
				INNER JOIN vivienda_category v_c ON v.id_vivienda = v_c.id_vivienda
				INNER JOIN vivienda_operation v_o ON v.id_vivienda = v_o.id_vivienda
				INNER JOIN vivienda_extra v_e ON v.id_vivienda = v_e.id_vivienda
				INNER JOIN category cat ON cat.id_category = v_c.id_category
				INNER JOIN operation op ON op.id_operation = v_o.id_operation
				INNER JOIN extras ex ON ex.id_extra = v_e.id_extra
				INNER JOIN imagenes img ON v.id_vivienda = img.id_vivienda
				INNER JOIN vivienda_custom v_cm ON v_cm.id_vivienda = v.id_vivienda
				INNER JOIN customed_rooms cm ON cm.id_custom_room = v_cm.id_custom_room
				WHERE v.id_vivienda IN ($ids)
				GROUP BY v.id_vivienda
				LIMIT 3";
		
			// Ejecuta la consulta SQL y retorna los resultados
			$stmt = $db->ejecutar($sql);
			return $db->listar($stmt);
		}
		
		

		


    }
?>