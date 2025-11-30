<?php
// api/login.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Adjust for production
header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../Controller/auth_controller.php';
require_once '../../Services/Security/security_service.php';
require_once '../../utils/security_utils.php';

$security_service = new security_service();
$auth_controller = new auth_controller($security_service);

$request_data = json_decode(file_get_contents('php://input'), true);
$result = $auth_controller->user_login($request_data);

http_response_code($result['status']);
echo json_encode($result['body']);
?>