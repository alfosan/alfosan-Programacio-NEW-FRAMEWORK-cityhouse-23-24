<?php
class profile_dao {
    static $_instance;

    private function __construct() {
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_factura_user_DAO($db, $username){
        $sql = "SELECT * FROM `facturas` WHERE username='$username'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_generate_pdf_factura_DAO($db, $id_factura){
        $sql = "SELECT * FROM `facturas` WHERE id_factura = $id_factura";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_all_vivienda_liked_DAO($db, $username){
        $sql = "SELECT id_vivienda FROM vivienda_likes WHERE username = '$username'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    
    public function select_print_vivienda_liked_DAO($db, $ids_viviendas){
        $sql = "SELECT v.id_vivienda,v.stock, t.tipos, op.operation_type,v_o.price,c.name_city,v.img_vivienda,cat.categorys,cat.id_category,
                    v.ubicacion,v.m2,v.n_habitaciones,v.n_banos,v.id_mapbox,map.lat,map.longi, GROUP_CONCAT(img.img_ruta SEPARATOR ':') AS img_ruta
                    FROM vivienda v INNER JOIN tipo t ON v.id_type = t.id_type
                                    INNER JOIN city c ON v.id_city = c.id_city
                                    INNER JOIN vivienda_category v_c ON v.id_vivienda = v_c.id_vivienda
                                    INNER JOIN vivienda_operation v_o ON v.id_vivienda = v_o.id_vivienda
                                    INNER JOIN vivienda_extra v_e ON v.id_vivienda = v_e.id_vivienda
                                    INNER JOIN category cat ON cat.id_category = v_c.id_category
                                    INNER JOIN operation op ON op.id_operation = v_o.id_operation
                                    INNER JOIN extras ex ON ex.id_extra = v_e.id_extra
                                    INNER JOIN imagenes img ON v.id_vivienda = img.id_vivienda
                                    INNER JOIN mapbox map ON v.id_mapbox = map.id_mapbox
                                    WHERE v.id_vivienda IN ($ids_viviendas)
                                    GROUP BY v.id_vivienda";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }


    public function select_know_user_profile_DAO($db, $username){
        $sql = "SELECT * FROM users WHERE username = '$username'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }


    function update_know_user_profile_DAO ($db, $username, $new_username){
        $sql = "UPDATE `users` SET `username`= '$new_username' WHERE username = '$username'";
        return $db->ejecutar($sql);
    }

    public function select_know_user_new_profile_DAO($db, $new_username){
        $sql = "SELECT * FROM users WHERE username = '$new_username'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    
    public function select_know_email_profile_DAO($db, $new_email){
        $sql = "SELECT * FROM users WHERE email = '$new_email'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    
    function update_know_email_profile_DAO ($db, $username, $new_email, $token_email){
        $sql = "UPDATE `users` SET `email`= '$new_email', `token_email`= '$token_email' WHERE username = '$username'";
        return $db->ejecutar($sql);
    }

    public function select_recover_password($db, $email) {
        $sql = "SELECT `email` FROM `users` WHERE email = '3eiasl@gmail.com' AND password NOT LIKE ('') AND activate = 1";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_recover_password($db, $email, $token_email) {
        $sql = "UPDATE `users` SET `token_email`= '$token_email', `activate`= '0' WHERE `email` = '$email'";
        $stmt = $db->ejecutar($sql);
        return "ok";
    }
    
    public function update_avatar_DAO($db, $username, $image) {
        $sql = "UPDATE `users` SET `avatar`= '$image' WHERE `username` = '$username'"; // Usar solo la ruta de la imagen
        return $db->ejecutar($sql);
    }


}
?>
