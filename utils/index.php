<?php

// Include Composer autoload file to load Resend SDK classes...
//require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/vendor/autoload.php';

// Assign a new Resend Client instance to $resend variable, which is automatically autoloaded...
$resend = Resend::client('re_RuUPx66M_JyMtABEmXsPBp51iTgP3jTDq');

try {
    $result = $resend->emails->send([
        'from' => 'onboarding@resend.dev',
        'to' => '3eiasl@gmail.com',
        'subject' => 'Hello World',
        'html' => '<p>Congrats on sending your <strong>first email</strong>!</p>'
      ]);
} catch (\Exception $e) {
    exit('Error: ' . $e->getMessage());
}

// Show the response of the sent email to be saved in a log...
echo $result->toJson();
