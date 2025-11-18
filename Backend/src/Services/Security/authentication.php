<?php 
require_once __DIR__ . '/../../utils/security_utils.php';

class authentication {
    private $user_DAO;
    private $jwt_service;
    public function __construct($user_DAO, $jwt_service) {
        $this->user_DAO = $user_DAO;
        $this->jwt_service = $jwt_service;
    }

    public function user_login($email, $password) {
        $hashed_password = security_utils::hash_password($password);
        $email = security_utils::sanitize_input($email);
        $user = $this->user_DAO->retrieve_user_account_by_email($email);
        if(!$user || $user['password'] != $hashed_password) {
            return null;
        }

        // return jwt token
        return $this->jwt_service->generate_token($user['user_id'], $user['role'], 'its.com', 'its.com');
    }
}

?>