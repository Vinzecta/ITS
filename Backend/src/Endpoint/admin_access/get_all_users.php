<?php
session_start();
require_once __DIR__ . '/../../Controller/admin_controller.php';
require_once __DIR__ . '/../../Services/Security/security_service.php';
require_once '../../utils/security_utils.php';

$allowedOrigin = 'http://localhost:5173'; // frontend của bạn
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Nếu là preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if user is logged in and is admin
// if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'Admin') {
//     http_response_code(403);
//     echo json_encode(['error' => 'Unauthorized access']);
//     exit();
// }

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $security_service = new security_service();
        $admin_controller = new admin_controller($security_service);
        
        $result = $admin_controller->get_all_users();
        
        http_response_code($result['status']);
        echo json_encode($result['body']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>