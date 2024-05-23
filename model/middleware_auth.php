<?php
include($_SERVER['DOCUMENT_ROOT'] . "/proyectos/FRAMEWORK_CITYHOUSE/model/JWT.php");
function decode_token($access_token){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/proyectos/FRAMEWORK_CITYHOUSE/model/jwt.ini');
    $ACCESS_TOKEN_secret = $jwt['ACCESS_TOKEN_secret'];

    $JWT = new JWT;
    $token_dec = $JWT->decode($access_token, $ACCESS_TOKEN_secret);
    $rt_token = json_decode($token_dec, TRUE);
    return $rt_token;
}

// function create_token($username){
//     $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/proyectos/FRAMEWORK_CITYHOUSE/model/jwt.ini');
//     $header = $jwt['header'];
//     $secret = $jwt['secret'];
//     $payload = '{"iat":"' . time() . '","exp":"' . time() + (600) . '","username":"' . $username . '"}';

//     $JWT = new JWT;
//     $token = $JWT->encode($header, $payload, $secret);
//     return $token;
// }

function create_refresh_token($username){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/proyectos/FRAMEWORK_CITYHOUSE/model/jwt.ini');
    $JWT_REFRESH_TOKEN = $jwt['JWT_REFRESH_TOKEN'];
    $REFRESH_TOKEN_secret = $jwt['REFRESH_TOKEN_secret'];
    $payload = '{"iat":"' . time() . '","exp":"' . time() + (600) . '","username":"' . $username . '"}';

    $JWT = new JWT;
    $refresh_token = $JWT->encode($JWT_REFRESH_TOKEN, $payload, $REFRESH_TOKEN_secret);
    return $refresh_token;
}

function create_access_token($username){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/proyectos/FRAMEWORK_CITYHOUSE/model/jwt.ini');
    $JWT_ACCESS_TOKEN = $jwt['JWT_ACCESS_TOKEN'];
    $ACCESS_TOKEN_secret = $jwt['ACCESS_TOKEN_secret'];
    $payload = '{"iat":"' . time() . '","exp":"' . time() + (600) . '","username":"' . $username . '"}';

    $JWT = new JWT;
    $access_token = $JWT->encode($JWT_ACCESS_TOKEN, $payload, $ACCESS_TOKEN_secret);
    return $access_token;
}