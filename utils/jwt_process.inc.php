<?php
class jwt_process {
    public static function encode($user) {
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        
        $header_access = $jwt['JWT_ACCESS_TOKEN'];
        $secret_access = $jwt['ACCESS_TOKEN_secret'];
        $access_payload = json_encode(['iat' => time(), 'exp' => time() + (60 * 60), 'username' => $user]);
        $JWT_access = new JWT();
        $access_token = $JWT_access->encode($header_access, $access_payload, $secret_access);
        
        $header_refresh = $jwt['JWT_REFRESH_TOKEN'];
        $secret_refresh = $jwt['REFRESH_TOKEN_secret'];
        $refresh_payload = json_encode(['iat' => time(), 'exp' => time() + (60 * 60 * 24 * 30), 'username' => $user]);
        $JWT_refresh = new JWT();
        $refresh_token = $JWT_refresh->encode($header_refresh, $refresh_payload, $secret_refresh);
        
        return ['access_token' => $access_token, 'refresh_token' => $refresh_token];
    }
    
    

    public static function decode_token($access_token) {
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $JWT = new JWT();
        $decoded = $JWT->decode($access_token, $jwt['ACCESS_TOKEN_secret']);
        error_log('Decoded JWT: ' . print_r($decoded, true));  // Log the decoded JWT
        return $decoded;
    }
    
}