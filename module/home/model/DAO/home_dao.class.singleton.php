<?php
// Incluir archivos de configuración y clases
include('model/Conf.class.singleton.php');
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

        // public function select_data_category($db) {

        //     $sql= "SELECT * FROM `category` ORDER BY id_category ASC LIMIT 30;";

		// 	$conexion = connect::con();
		// 	$res = mysqli_query($conexion, $sql);
		// 	connect::close($conexion);

		// 	$retrArray = array();
		// 	if (mysqli_num_rows($res) > 0) {
		// 		while ($row = mysqli_fetch_assoc($res)) {
		// 			$retrArray[] = $row;
		// 		}
		// 	}
        //     return $retrArray;

        // }
        // public function select_data_type($db) {

        //     $sql= "SELECT * FROM `tipo` ORDER BY id_type ASC LIMIT 30;";

		// 	$conexion = connect::con();
		// 	$res = mysqli_query($conexion, $sql);
		// 	connect::close($conexion);

		// 	$retrArray = array();
		// 	if (mysqli_num_rows($res) > 0) {
		// 		while ($row = mysqli_fetch_assoc($res)) {
		// 			$retrArray[] = $row;
		// 		}
		// 	}
        //     return $retrArray;

        // }


        
        // public function select_data_operation($db) {

        //     $sql= "SELECT * FROM `operation` ORDER BY id_operation ASC LIMIT 30;";

		// 	$conexion = connect::con();
		// 	$res = mysqli_query($conexion, $sql);
		// 	connect::close($conexion);

		// 	$retrArray = array();
		// 	if (mysqli_num_rows($res) > 0) {
		// 		while ($row = mysqli_fetch_assoc($res)) {
		// 			$retrArray[] = $row;
		// 		}
		// 	}
        //     return $retrArray;

        // }

        
        // public function select_data_custom($db) {

        //     $sql= "SELECT * FROM `customed_rooms` ORDER BY id_custom_room ASC LIMIT 30;";

		// 	$conexion = connect::con();
		// 	$res = mysqli_query($conexion, $sql);
		// 	connect::close($conexion);

		// 	$retrArray = array();
		// 	if (mysqli_num_rows($res) > 0) {
		// 		while ($row = mysqli_fetch_assoc($res)) {
		// 			$retrArray[] = $row;
		// 		}
		// 	}
        //     return $retrArray;

        // }

		// public function select_data_recomendations($db) {

		// 	$sql= "SELECT * FROM vivienda ORDER BY id_vivienda DESC LIMIT 4";

		// 	$conexion = connect::con();
		// 	$res = mysqli_query($conexion, $sql);
		// 	connect::close($conexion);

		// 	$retrArray = array();
		// 	if (mysqli_num_rows($res) > 0) {
		// 		while ($row = mysqli_fetch_assoc($res)) {
		// 			$retrArray[] = $row;
		// 		}
		// 	}
        //     return $retrArray;

        // }

		// public function select_data_most_visited($db) {

		// 	$sql= "SELECT * FROM `vivienda` ORDER BY vistas DESC LIMIT 8;";

		// 	$conexion = connect::con();
		// 	$res = mysqli_query($conexion, $sql);
		// 	connect::close($conexion);

		// 	$retrArray = array();
		// 	if (mysqli_num_rows($res) > 0) {
		// 		while ($row = mysqli_fetch_assoc($res)) {
		// 			$retrArray[] = $row;
		// 		}
		// 	}
        //     return $retrArray;

        // }

		


    }
?>