<?php
class otp {
    public static function send_otp($wassap) {
        error_log("ENTRAMOS EN EL MENSAJE: " . json_encode($wassap));

        switch ($wassap['type']) {
            case 'fail_login':
                $wassap['body'] = 'Fail Login 3 attempts  -----> CODE :   ';
                $wassap['body'] .= "{$wassap['token_otp']}";
                break;
        }

        return self::send_otp_msg($wassap);
    }

    public static function send_otp_msg($wassap) {
        require_once('vendor/autoload.php');

        $ini_file = 'D:\\xampp\\htdocs\\proyectos\\FRAMEWORK_CITYHOUSE\\model\\credentials.ini';

        if (!file_exists($ini_file) || !is_readable($ini_file)) {
            error_log('El archivo credentials.ini no existe o no tiene permisos de lectura.');
            return json_encode(['error' => 'Credentials file missing or unreadable']);
        }

        $credentials = parse_ini_file($ini_file, true);

        if (!$credentials || !isset($credentials['ultramsg'])) {
            error_log('Error al cargar las credenciales o sección ultramsg no encontrada');
            return json_encode(['error' => 'Failed to load credentials']);
        }

        $ultramsg_credentials = $credentials['ultramsg'];
        $ultramsg_token = $ultramsg_credentials['ULTRA_MESSAGE_TOKEN'];
        $instance_id = $ultramsg_credentials['INSTANCE_ID_ULTRAMSG'];
        $to = $ultramsg_credentials['TLF_NUMBER'];

        if (empty($ultramsg_token) || empty($instance_id) || empty($to)) {
            error_log('Faltan credenciales necesarias en el archivo credentials.ini');
            return json_encode(['error' => 'Missing credentials']);
        }

        $client = new UltraMsg\WhatsAppApi($ultramsg_token, $instance_id);
        $body = $wassap['body'];
        $apiResponse = $client->sendChatMessage($to, $body);

        return json_encode($apiResponse);
    }
}



