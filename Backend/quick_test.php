<?php
// quick_test.php - save in Backend folder and run with: php quick_test.php

function post($url, $data) {
    $opts = [
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/json\r\n",
            'content' => json_encode($data),
            'ignore_errors' => true
        ]
    ];
    $context  = stream_context_create($opts);
    $result = @file_get_contents($url, false, $context);
    $status = $http_response_header[0] ?? 'HTTP/1.1 0';
    echo "POST $url\n$status\n$result\n\n";
}

$base = 'http://localhost:8000/its';
post($base . '/student_register', ['email'=>'student2@example.com','password'=>'Password1!']);
post($base . '/user_login', ['email'=>'student2@example.com','password'=>'Password1!']);
