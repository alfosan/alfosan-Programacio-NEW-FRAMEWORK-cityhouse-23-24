<?php
    class shop_dao {
        static $_instance;
        
        private function __construct() {
        }
        
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        function select_list_viviendas($db, $start_index, $end_index) {
            $sql = "SELECT v.id_vivienda, t.tipos, op.operation_type,v_o.price,c.name_city,v.img_vivienda,cat.categorys,cat.id_category,
                    v.ubicacion,v.m2,v.n_habitaciones,v.n_banos, GROUP_CONCAT(img.img_ruta SEPARATOR ':') AS img_ruta
                    FROM vivienda v INNER JOIN tipo t ON v.id_type = t.id_type
                                    INNER JOIN city c ON v.id_city = c.id_city
                                    INNER JOIN vivienda_category v_c ON v.id_vivienda = v_c.id_vivienda
                                    INNER JOIN vivienda_operation v_o ON v.id_vivienda = v_o.id_vivienda
                                    INNER JOIN vivienda_extra v_e ON v.id_vivienda = v_e.id_vivienda
                                    INNER JOIN category cat ON cat.id_category = v_c.id_category
                                    INNER JOIN operation op ON op.id_operation = v_o.id_operation
                                    INNER JOIN extras ex ON ex.id_extra = v_e.id_extra
                                    INNER JOIN imagenes img ON v.id_vivienda = img.id_vivienda
                                    GROUP BY v.id_vivienda
                                    LIMIT $start_index, $end_index;";
                
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
    
        
        
        // public function select_all_viviendas($db, $start_index, $end_index) {
        //     $sql = "SELECT *
        //             FROM vivienda v 
        //             INNER JOIN tipo t ON v.id_type = t.id_type
        //             INNER JOIN city c ON v.id_city = c.id_city
        //             INNER JOIN vivienda_category v_c ON v.id_vivienda = v_c.id_vivienda
        //             INNER JOIN vivienda_operation v_o ON v.id_vivienda = v_o.id_vivienda
        //             INNER JOIN vivienda_extra v_e ON v.id_vivienda = v_e.id_vivienda
        //             INNER JOIN category cat ON cat.id_category = v_c.id_category
        //             INNER JOIN operation op ON op.id_operation = v_o.id_operation
        //             INNER JOIN extras ex ON ex.id_extra = v_e.id_extra
        //             GROUP BY v.id_vivienda
        //             LIMIT $start_index, $end_index;";
        //     $stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

        // function select_redirect_shop($filter_shop, $orderBy, $start_index, $end_index) {
        //     $consulta = "SELECT COUNT(DISTINCT v.id_vivienda) AS contador, v.id_vivienda, t.tipos, op.operation_type, v_o.price, c.name_city, v.img_vivienda, cat.categorys, cat.id_category,
        //         v.ubicacion, v.m2, v.n_habitaciones, v.n_banos,
        //         GROUP_CONCAT(DISTINCT ex.name_extra SEPARATOR ':') AS name_extra
        //     FROM vivienda v
        //     INNER JOIN tipo t ON v.id_type = t.id_type
        //     INNER JOIN city c ON v.id_city = c.id_city
        //     INNER JOIN vivienda_category v_c ON v.id_vivienda = v_c.id_vivienda
        //     INNER JOIN vivienda_operation v_o ON v.id_vivienda = v_o.id_vivienda
        //     INNER JOIN vivienda_extra v_e ON v.id_vivienda = v_e.id_vivienda
        //     INNER JOIN category cat ON cat.id_category = v_c.id_category
        //     INNER JOIN operation op ON op.id_operation = v_o.id_operation
        //     INNER JOIN extras ex ON ex.id_extra = v_e.id_extra
        //     INNER JOIN imagenes img ON v.id_vivienda = img.id_vivienda
        //     WHERE 1 = 1";
        
        //     // Definir un array para las condiciones
        //     $conditions = array();
        
        //     // Agregar condiciones para los filtros de extras
        //     foreach ($filter_shop as $filter) {
        //         if ($filter[0] === 'operation_type') {
        //             // OPERATION
        //             $conditions[] = "op.operation_type='" . $filter[1] . "'";
        //         } elseif ($filter[0] === 'name_city') {
        //             // CITY
        //             $conditions[] = "c.name_city='" . $filter[1] . "'";
        //         } elseif ($filter[0] === 'price') {
        //             // PRICE
        //             $priceMax = floatval($filter[1]);
        //             $conditions[] = "v_o.price <= " . $priceMax;
        //         } elseif ($filter[0] === 'tipos') {
        //             // TYPE
        //             $conditions[] = "t.tipos='" . $filter[1] . "'";
        //         } elseif ($filter[0] === 'name_extra') {
        //             // EXTRAS
        //             // Agregar una subconsulta EXISTS
        //             $conditions[] = "EXISTS (
        //                 SELECT 1
        //                 FROM vivienda_extra v_e2
        //                 INNER JOIN extras ex2 ON ex2.id_extra = v_e2.id_extra
        //                 WHERE v_e2.id_vivienda = v.id_vivienda
        //                 AND ex2.name_extra = '" . $filter[1] . "'
        //             )";
        //         } else {
        //             $conditions[] = "cat." . $filter[0] . "='" . $filter[1] . "'";
        //         }
        //     }
        
        //     if (!empty($conditions)) {
        //         $consulta .= " AND " . implode(" AND ", $conditions);
        //     }
        
        //     $consulta .= " GROUP BY v.id_vivienda";
        
        //     // Aplicar el límite de resultados
        //     $consulta .= " LIMIT " . $start_index . "," . $end_index;
        
        //     // DESPUES DEL GROUP BY SIEMPRE
        //     if (!empty($orderBy)) {
        //         $orderByString = implode(", ", $orderBy);
        //         $consulta .= " ORDER BY " . $orderByString . " DESC";
        //     }
        
        //     $stmt = $db->ejecutar($consulta);
        //     return $db->listar($stmt);
        
        //     $retrArray = array();
        //     if ($res->num_rows > 0) {
        //         while ($row = mysqli_fetch_assoc($res)) {
        //             $retrArray[] = $row;
        //         }
        //     }
        //     return $retrArray;
        // }
        
        
    }


?>

