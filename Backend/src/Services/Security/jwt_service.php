<?php
require_once __DIR__ . '/../../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
class jwt_service {
    private $jwt_key;
    private $expiration_secs = 3600; // 1 hour
    public function __construct($jwt_key, $expiration_secs = 3600) {
        $this->jwt_key = $jwt_key;
        $this->expiration_secs = $expiration_secs;
    }

    public function generate_token($user_id, $role, $issuer, $audience) {
        $issue_at = time();
        $payload = [
            'iss' => $issuer,
            'aud' => $audience,
            'iat' => $issue_at,
            'exp' => $issue_at + $this->expiration_secs,
            'user_id' => $user_id,
            'role' => $role
        ];

        return JWT::encode($payload, $this->jwt_key, 'HS512');
    }

    public function decode_token($token) {
        return JWT::decode($token, new Key($this->jwt_key, 'HS512'));
    }
}
?>