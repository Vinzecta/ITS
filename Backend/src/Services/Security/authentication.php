<?php 
require_once __DIR__ . '/../Data Access Object/user_DAO.php';
require_once __DIR__ . '/../../utils/security.php';
require_once __DIR__ . '/jwt_service.php';
require_once __DIR__ . '/../../../Config/jwt_key.php';

class authentication {
    private $user_DAO;
    function __construct() {
        $this->student_DAO = new user_DAO();
    }

    public function user_login($email, $password) {
        $hashed_password = security::hash_password($password);
        $email = security::sanitize_input($email);
        $user = $this->user_DAO->retrieve_user_account_by_email($email);
        if(!$user || $user['password'] != $hashed_password) {
            return null;
        }

        // return jwt token
        $jwt_service = new jwt_service(JWT_KEY);
        return $jwt_service->generate_token($user['user_id'], $user['role'], 'its.com', 'its.com');
    }
}

?>