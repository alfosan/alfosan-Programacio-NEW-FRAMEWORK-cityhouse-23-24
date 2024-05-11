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

        function select_details_vivienda($db, $id_vivienda){
            $sql = "SELECT 
            v.id_vivienda, t.tipos, op.operation_type,v_o.price,c.name_city,v.ubicacion,v.m2,v.n_habitaciones,v.n_banos,
            cm.id_custom_room,
            GROUP_CONCAT(DISTINCT cm.name_room SEPARATOR ':') AS name_room,
            GROUP_CONCAT(DISTINCT cm.icon_custom SEPARATOR ':') AS icon_custom, 
            GROUP_CONCAT(DISTINCT ex.icon_extra SEPARATOR ':') AS icon_extra, 
            GROUP_CONCAT(DISTINCT ex.name_extra SEPARATOR ':') AS name_extra,
            GROUP_CONCAT(DISTINCT img.img_ruta SEPARATOR ':') AS img_ruta
            
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
            WHERE v.id_vivienda = '$id_vivienda'
            GROUP BY v.id_vivienda;";
        
            $stmt = $db->ejecutar($sql);
            $results = $db->listar($stmt);
        
            $retrArray = array();
            foreach ($results as $row) {
                $retrArray[] = array(
                    "id_vivienda" => $row['id_vivienda'],
                    "tipos" => $row['tipos'],
                    "operation_type" => $row['operation_type'],
                    "price" => $row['price'],
                    "name_city" => $row['name_city'],
                    "ubicacion" => $row['ubicacion'],
                    "m2" => $row['m2'],
                    "n_habitaciones" => $row['n_habitaciones'],
                    "n_banos" => $row['n_banos'],
                    "id_custom_room" => $row['id_custom_room'],
                    "name_room" => explode(":", $row['name_room']),
                    "icon_custom" => explode(":", $row['icon_custom']),
                    "icon_extra" => explode(":", $row['icon_extra']),
                    "name_extra" => explode(":", $row['name_extra']),
                    "img_ruta" => explode(":", $row['img_ruta'])
                );
            }
        
            return $retrArray;
        }    
        
        function select_redirect_shop($db, $filter_shop, $orderBy, $start_index, $end_index) {
            $sql = "SELECT COUNT(DISTINCT v.id_vivienda) AS contador, v.id_vivienda, t.tipos, op.operation_type, v_o.price, c.name_city, v.img_vivienda, cat.categorys, cat.id_category,
                    v.ubicacion, v.m2, v.n_habitaciones, v.n_banos,
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
                WHERE 1 = 1";
            
            // Definir un array para las condiciones
            $conditions = array();
            
            // Agregar condiciones para los filtros de extras
            foreach ($filter_shop as $filter) {
                if ($filter[0] === 'operation_type') {
                    // OPERATION
                    $conditions[] = "op.operation_type='" . $filter[1] . "'";
                } elseif ($filter[0] === 'name_city') {
                    // CITY
                    $conditions[] = "c.name_city='" . $filter[1] . "'";
                } elseif ($filter[0] === 'price') {
                    // PRICE
                    $priceMax = floatval($filter[1]);
                    $conditions[] = "v_o.price <= " . $priceMax;
                } elseif ($filter[0] === 'tipos') {
                    // TYPE
                    $conditions[] = "t.tipos='" . $filter[1] . "'";
                } elseif ($filter[0] === 'name_extra') {
                    // EXTRAS
                    // Agregar una subsql EXISTS
                    $conditions[] = "EXISTS (
                        SELECT 1
                        FROM vivienda_extra v_e2
                        INNER JOIN extras ex2 ON ex2.id_extra = v_e2.id_extra
                        WHERE v_e2.id_vivienda = v.id_vivienda
                        AND ex2.name_extra = '" . $filter[1] . "'
                    )";
                } else {
                    $conditions[] = "cat." . $filter[0] . "='" . $filter[1] . "'";
                }
            }
            
            if (!empty($conditions)) {
                $sql .= " AND " . implode(" AND ", $conditions);
            }
            
            $sql .= " GROUP BY v.id_vivienda";
            
            // Aplicar el límite de resultados
            $sql .= " LIMIT " . $start_index . "," . $end_index;
            
            // DESPUES DEL GROUP BY SIEMPRE
            if (!empty($orderBy)) {
                $orderByString = implode(", ", $orderBy);
                $sql .= " ORDER BY " . $orderByString . " DESC";
            }
            
            // echo $sql;
            $stmt = $db->ejecutar($sql);
            $results = $db->listar($stmt);
            
            $retrArray = array();
            if (!empty($results)) {
                foreach ($results as $row) {
                    $retrArray[] = $row;
                }
            }
            return $retrArray;
        }

        function select_redirect_home($db, $filter_shop, $orderBy, $start_index, $end_index) {
            $sql = "SELECT COUNT(DISTINCT v.id_vivienda) AS contador, v.id_vivienda, t.id_type, op.id_operation, v_o.price, c.id_city, v.img_vivienda, cat.id_category,
                        v.ubicacion, v.m2, v.n_habitaciones, v.n_banos,
                        GROUP_CONCAT(DISTINCT ex.id_extra SEPARATOR ':') AS id_extra
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
                    WHERE 1 = 1";
            
            // Definir un array para las condiciones
            $conditions = array();
            
            // Agregar condiciones para los filtros de extras
            foreach ($filter_shop as $filter) {
                if ($filter[0] === 'id_operation') {
                    // OPERATION
                    $conditions[] = "op.id_operation=" . $filter[1];
                } elseif ($filter[0] === 'id_city') {
                    // CITY
                    $conditions[] = "c.id_city=" . $filter[1];
                } elseif ($filter[0] === 'price') {
                    // PRICE
                    $priceMax = floatval($filter[1]);
                    $conditions[] = "v_o.price <= " . $priceMax;
                } elseif ($filter[0] === 'id_type') {
                    // TYPE
                    $conditions[] = "t.id_type=" . $filter[1];
                } elseif ($filter[0] === 'id_extra') {
                    // EXTRAS
                    // Agregar una subsql EXISTS
                    $conditions[] = "EXISTS (
                        SELECT 1
                        FROM vivienda_extra v_e2
                        WHERE v_e2.id_vivienda = v.id_vivienda
                        AND v_e2.id_extra = " . $filter[1] . "
                    )";
                } else {
                    $conditions[] = "cat." . $filter[0] . "=" . $filter[1];
                }
            }
            
            if (!empty($conditions)) {
                $sql .= " AND " . implode(" AND ", $conditions);
            }
            
            $sql .= " GROUP BY v.id_vivienda";
            
            // Aplicar el límite de resultados
            $sql .= " LIMIT " . $start_index . "," . $end_index;
            
            // DESPUES DEL GROUP BY SIEMPRE
            if (!empty($orderBy)) {
                $orderByString = implode(", ", $orderBy);
                $sql .= " ORDER BY " . $orderByString . " DESC";
            }
            
            // echo $sql;
            $stmt = $db->ejecutar($sql);
            $results = $db->listar($stmt);
            
            $retrArray = array();
            if (!empty($results)) {
                foreach ($results as $row) {
                    $retrArray[] = $row;
                }
            }
            return $retrArray;
        }
        

        function select_count_all($db){
            $sql = "SELECT COUNT(*) contador
            FROM vivienda";

            $stmt = $db->ejecutar($sql);
            $results = $db->listar($stmt);

            $retrArray = array();
            if (!empty($results)) {
                foreach ($results as $row) {
                    $retrArray[] = $row;
                }
            }
            return $retrArray;
        }
        
        function select_count_shop($db, $filter_shop, $orderBy) {
            $sql = "SELECT COUNT(DISTINCT v.id_vivienda) contador
            FROM vivienda v
            INNER JOIN tipo t ON v.id_type = t.id_type
            INNER JOIN city c ON v.id_city = c.id_city
            INNER JOIN vivienda_category v_c ON v.id_vivienda = v_c.id_vivienda
            INNER JOIN vivienda_operation v_o ON v.id_vivienda = v_o.id_vivienda
            INNER JOIN vivienda_extra v_e ON v.id_vivienda = v_e.id_vivienda
            INNER JOIN category cat ON cat.id_category = v_c.id_category
            INNER JOIN operation op ON op.id_operation = v_o.id_operation
            INNER JOIN extras ex ON ex.id_extra = v_e.id_extra
            INNER JOIN imagenes img ON v.id_vivienda = img.id_vivienda";
        
            // Definir un array para las condiciones
            $conditions = array();
            
            // Agregar condiciones para los filtros de extras
            foreach ($filter_shop as $filter) {
                if ($filter[0] === 'operation_type') {
                    // OPERATION
                    $conditions[] = "op.operation_type='" . $filter[1] . "'";
                } elseif ($filter[0] === 'name_city') {
                    // CITY
                    $conditions[] = "c.name_city='" . $filter[1] . "'";
                } elseif ($filter[0] === 'price') {
                    // PRICE
                    $priceMax = floatval($filter[1]); // Convertir a número flotante
                    $conditions[] = "v_o.price <= " . $priceMax;
                } elseif ($filter[0] === 'tipos') {
                    // TYPE
                    $conditions[] = "t.tipos='" . $filter[1] . "'";
                } elseif ($filter[0] === 'name_extra') {
                    // EXTRAS
                    // Agregar una subsql EXISTS para cada filtro de extra seleccionado
                    $conditions[] = "EXISTS (
                        SELECT 1
                        FROM vivienda_extra v_e2
                        INNER JOIN extras ex2 ON ex2.id_extra = v_e2.id_extra
                        WHERE v_e2.id_vivienda = v.id_vivienda
                        AND ex2.name_extra = '" . $filter[1] . "'
                    )";
                } else {
                    $conditions[] = "cat." . $filter[0] . "='" . $filter[1] . "'";
                }
            }
        
            if (!empty($conditions)) {
                $sql .= " AND " . implode(" AND ", $conditions);
            }
        
            // DESPUES DEL GROUP BY SIEMPRE
            if (!empty($orderBy)) {
                $orderByString = implode(", ", $orderBy);
                $sql .= " ORDER BY " . $orderByString . " DESC";
            }
            // echo $conditions;
            // echo $filter_shop;
            $stmt = $db->ejecutar($sql);
            $results = $db->listar($stmt);
            
            $retrArray = array();
            if (!empty($results)) {
                foreach ($results as $row) {
                    $retrArray[] = $row;
                }
            }
            return $retrArray;
        }

        // function select_count_home($db, $filter_shop, $orderBy) {
        //     $sql = "SELECT COUNT(DISTINCT v.id_vivienda) contador
        //             FROM vivienda v
        //             INNER JOIN tipo t ON v.id_type = t.id_type
        //             INNER JOIN city c ON v.id_city = c.id_city
        //             INNER JOIN vivienda_category v_c ON v.id_vivienda = v_c.id_vivienda
        //             INNER JOIN vivienda_operation v_o ON v.id_vivienda = v_o.id_vivienda
        //             INNER JOIN vivienda_extra v_e ON v.id_vivienda = v_e.id_vivienda
        //             INNER JOIN category cat ON cat.id_category = v_c.id_category
        //             INNER JOIN operation op ON op.id_operation = v_o.id_operation
        //             INNER JOIN extras ex ON ex.id_extra = v_e.id_extra
        //             INNER JOIN imagenes img ON v.id_vivienda = img.id_vivienda";
            
        //     // Definir un array para las condiciones
        //     $conditions = array();
            
        //     // Agregar condiciones para los filtros de extras
        //     foreach ($filter_shop as $filter) {
        //         if ($filter[0] === 'id_operation') {
        //             // OPERATION
        //             $conditions[] = "op.id_operation=" . $filter[1];
        //         } elseif ($filter[0] === 'id_city') {
        //             // CITY
        //             $conditions[] = "c.id_city=" . $filter[1];
        //         } elseif ($filter[0] === 'price') {
        //             // PRICE
        //             $priceMax = floatval($filter[1]); // Convertir a número flotante
        //             $conditions[] = "v_o.price <= " . $priceMax;
        //         } elseif ($filter[0] === 'id_type') {
        //             // TYPE
        //             $conditions[] = "t.id_type=" . $filter[1];
        //         } elseif ($filter[0] === 'id_extra') {
        //             // EXTRAS
        //             // Agregar una subsql EXISTS para cada filtro de extra seleccionado
        //             $conditions[] = "EXISTS (
        //                 SELECT 1
        //                 FROM vivienda_extra v_e2
        //                 WHERE v_e2.id_vivienda = v.id_vivienda
        //                 AND v_e2.id_extra = " . $filter[1] . "
        //             )";
        //         } else {
        //             $conditions[] = "cat." . $filter[0] . "=" . $filter[1];
        //         }
        //     }
            
        //     if (!empty($conditions)) {
        //         $sql .= " AND " . implode(" AND ", $conditions);
        //     }
            
        //     // DESPUES DEL GROUP BY SIEMPRE
        //     if (!empty($orderBy)) {
        //         $orderByString = implode(", ", $orderBy);
        //         $sql .= " ORDER BY " . $orderByString . " DESC";
        //     }
        //     // echo $conditions;
        //     // echo $filter_shop;
        //     $stmt = $db->ejecutar($sql);
        //     $results = $db->listar($stmt);
            
        //     $retrArray = array();
        //     if (!empty($results)) {
        //         foreach ($results as $row) {
        //             $retrArray[] = $row;
        //         }
        //     }
        //     return $retrArray;
        // }
        

        function select_count_home($db, $filter_shop) {
            $sql = "SELECT COUNT(DISTINCT v.id_vivienda) as contador
                    FROM vivienda v
                    INNER JOIN tipo t ON v.id_type = t.id_type
                    INNER JOIN city c ON v.id_city = c.id_city
                    INNER JOIN vivienda_category v_c ON v.id_vivienda = v_c.id_vivienda
                    INNER JOIN vivienda_operation v_o ON v.id_vivienda = v_o.id_vivienda
                    INNER JOIN vivienda_extra v_e ON v.id_vivienda = v_e.id_vivienda
                    INNER JOIN category cat ON cat.id_category = v_c.id_category
                    INNER JOIN operation op ON op.id_operation = v_o.id_operation
                    INNER JOIN extras ex ON ex.id_extra = v_e.id_extra
                    INNER JOIN imagenes img ON v.id_vivienda = img.id_vivienda";
        
            // Variable para rastrear si se ha agregado una condición WHERE
            $whereAdded = false;
        
            foreach ($filter_shop as $filter) {
                $field = $filter[0];
                $value = $filter[1];
        
                // Agregar WHERE si no se ha agregado antes ninguna condición
                if (!$whereAdded) {
                    $sql .= " WHERE ";
                    $whereAdded = true; // Marcar que se ha agregado una condición WHERE
                } else {
                    $sql .= " AND ";
                }
        
                switch ($field) {
                    case 'id_operation':
                        $sql .= "op.id_operation = '$value'";
                        break;
                    case 'id_city':
                        $sql .= "c.id_city = '$value'";
                        break;
                    case 'price':
                        $priceMax = floatval($value);
                        $sql .= "v_o.price <= $priceMax";
                        break;
                    case 'id_type':
                        $sql .= "t.id_type = '$value'";
                        break;
                    case 'id_extra':
                        $sql .= "EXISTS (
                                    SELECT 1
                                    FROM vivienda_extra v_e2
                                    WHERE v_e2.id_vivienda = v.id_vivienda
                                    AND v_e2.id_extra = $value
                                )";
                        break;
                    default:
                        // Handle other cases if needed
                        break;
                }
            }
        
            // echo $sql;
            $stmt = $db->ejecutar($sql);
                $results = $db->listar($stmt);
                
                $retrArray = array();
                if (!empty($results)) {
                    foreach ($results as $row) {
                        $retrArray[] = $row;
                    }
                }
                return $retrArray;
            }
        
        
        
        
        

        function select_count_more_viviendas_related($db, $name_city){
            $sql = "SELECT COUNT(v.id_vivienda) AS num_total
            FROM vivienda v INNER JOIN city c ON c.id_city = v.id_city
            WHERE c.name_city ='$name_city'";
    
            $stmt = $db->ejecutar($sql);
            $results = $db->listar($stmt);
            
            $retrArray = array();
            if (!empty($results)) {
                foreach ($results as $row) {
                    $retrArray[] = $row;
                }
            }
            return $retrArray;
        }
        
        function select_viviendas_related($db, $city, $loaded, $items){
            $sql = "SELECT * 
                        FROM vivienda v, city c, vivienda_operation v_o ,operation o, tipo t
                        WHERE c.id_city = v.id_city AND v.id_vivienda = v_o.id_vivienda AND o.id_operation = v_o.id_operation AND t.id_type = v.id_type
                        AND c.name_city = '$city'
                        LIMIT $loaded, $items";
    
                $stmt = $db->ejecutar($sql);
                $results = $db->listar($stmt);
                
                $retrArray = array();
                if (!empty($results)) {
                    foreach ($results as $row) {
                        $retrArray[] = $row;
                    }
                }
                return $retrArray;
            }

}


?>

