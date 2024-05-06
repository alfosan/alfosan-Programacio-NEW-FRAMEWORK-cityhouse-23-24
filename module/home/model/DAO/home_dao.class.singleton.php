<?php
include('model/connect.php');
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

        // public function select_data_carrusel($db) {

        //     $sql = "SELECT * FROM brand LIMIT 6";

        //     $stmt = $db -> ejecutar($sql);
        //     return $db -> listar($stmt);
        // }

        public function select_data_category($db) {

            $sql= "SELECT * FROM `category` ORDER BY id_category ASC LIMIT 30;";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
            return $retrArray;

        }

        // public function select_data_type($db) {

        //     $sql = "SELECT * FROM type LIMIT 4";

        //     $stmt = $db -> ejecutar($sql);
        //     return $db -> listar($stmt);
        // }

    }
?>