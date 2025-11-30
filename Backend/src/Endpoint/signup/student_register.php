<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../../Services/Security/security_service.php";
require_once "../../Controller/register_controller.php";
require_once '../../utils/security_utils.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$input = json_decode(file_get_contents("php://input"), true);
$security_service = new security_service();
$controller = new register_controller($security_service);

$response = $controller->student_register($input);

http_response_code($response["status"]);
echo json_encode($response["body"]);
