<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

// Preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Chỉ cho phép POST
// if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
//     http_response_code(405);
//     echo json_encode(["message" => "Method not allowed"]);
//     exit();
// }

// Read JSON body
$input = json_decode(file_get_contents("php://input"), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid JSON"]);
    exit();
}

// Load service + controller
require_once __DIR__ . '/../../Services/Security/security_service.php';
require_once __DIR__ . '/../../Controller/admin_controller.php';

// Tạo controller
$security_service = new security_service();
$controller = new admin_controller($security_service);

// Gọi method delete
$response = $controller->delete($input);

// Trả về JSON
http_response_code($response["status"]);
echo json_encode($response["body"]);
exit();
?>
