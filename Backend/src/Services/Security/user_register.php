<?php 
require_once __DIR__ . '/../../utils/security_utils.php';

class user_register {
    private $student_DAO;
    private $user_DAO;
    public function __construct($student_DAO, $user_DAO) {
        $this->student_DAO = $student_DAO;
        $this->user_DAO = $user_DAO;
    }

    public function student_register($email, $password) {
        // 1: Sanitize input and hash password
        $email = security_utils::sanitize_input($email);
        $password = security_utils::hash_password($password);

        // 2: Check duplicate account  
        $duplicate_account = $this->user_DAO->retrieve_user_account_by_email($email);
        if($duplicate_account) {
            return false;
        }
        // 3: Create new account and save
        $is_student_created = $this->student_DAO->create_student_account($email, $password);
        return $is_student_created;
    }
}
?>