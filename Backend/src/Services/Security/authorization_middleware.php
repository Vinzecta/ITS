<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
class authorization_middleware {
    private $jwt_service;
    private $actions_list_per_role;
    public function __construct($jwt_service) {
        $this->jwt_service = $jwt_service;
        $this->actions_list_per_role = [
            'student' => ['student_render'],
            'teacher' => ['teacher_profile', 'tutor_render'],
            'admin' => ['admin_create', 'display_users', 'admin_delete', 'admin_render']
        ];
    }

    public function authorize_request(string $action) {
        $headers = getallheaders();
        if(!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(value: ['error' => 'Authorization header missing']);
            exit;
        }

        $jwt_token = $headers['Authorization'];
        try {
            $decoded_payload = $this->jwt_service->decode_token($jwt_token);
            $allow_list = $this->actions_list_per_role[$decoded_payload->role];
            if(!in_array($action, $allow_list)) {
                http_response_code(403);
                echo json_encode(['error' => 'Forbidden: insufficient role']);
                exit;
            }
        }catch(Exception $e) {
            http_response_code(401);
            echo json_encode(value: ['JWT token: ' => $jwt_token]);
            echo json_encode(value: ['error' => $e->getMessage()]);
            exit;
        }

    }
}
?>