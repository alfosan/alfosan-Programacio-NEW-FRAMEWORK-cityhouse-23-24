<?php
class mail {
    public static function send_email($email) {
        error_log("ENTRAMOS EN EL MENSAJE: " . json_encode($email));

        switch ($email['type']) {
            case 'contact':
            case 'validate':
            case 'recover':
                $email['fromEmail'] = 'onboarding@resend.dev';
                break;
        }

        switch ($email['type']) {
            case 'contact':
                $email['inputMatter'] = 'Email verification';
                $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/Ejercicios/Framework_PHP_OO_MVC/index.php?module=contact&op=view'>Click here for verify your email.</a>";
                break;
            case 'validate':
                $email['inputMatter'] = 'Email verification';
                $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/proyectos/FRAMEWORK_CITYHOUSE/?module=login&op=verify_emails?token_email={$email['token_email']}'>Click here for verify your email.</a>";
                break;
            case 'recover':
                $email['inputMatter'] = 'Recover password';
                $email['inputMessage'] = "<a href='http://localhost/Ejercicios/Framework_PHP_OO_MVC/module/login/recover/{$email['token']}'>Click here for recover your password.</a>";
                break;
        }

        return self::send_mailgun($email);
    }

    public static function send_mailgun($email) {
        require __DIR__ . '/vendor/autoload.php';
    
        $resend = Resend::client('re_RuUPx66M_JyMtABEmXsPBp51iTgP3jTDq');
    
        try {
            $result = $resend->emails->send([
                'from' => $email['fromEmail'],
                'to' => $email['toEmail'],
                'subject' => $email['inputMatter'],
                'html' => $email['inputMessage']
            ]);
    
            error_log("Correo electrónico enviado correctamente: " . json_encode($result));
    
        } catch (\Exception $e) {
            error_log('Error al enviar correo electrónico: ' . $e->getMessage());
            exit('Error: ' . $e->getMessage());
        }
    
        return $result->toJson();
    }
    
}

