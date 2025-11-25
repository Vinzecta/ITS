<?php
// // Admin manager: used by frontend User Management layer
// require_once __DIR__ . '/../../utils/security_utils.php';
// require_once __DIR__ . '/../Data Access Object/admin_DAO.php';

// class admin_manager {
//     private $admin_DAO;

//     public function __construct() {
//         $this->admin_DAO = new admin_DAO();
//     }

//     /**
//      * Create a new user (Student, Teacher, or Admin)
//      * $user_data is an associative array with keys:
//      *   - email (required)
//      *   - password (required)
//      *   - name (optional)
//      *   - role (required) one of 'Student','Teacher','Admin'
//      *
//      * Returns array: ["success" => bool, "message" => string]
//      */
//     public function create_user(array $user_data): array {
//         $email = $user_data['email'] ?? '';
//         $password = $user_data['password'] ?? '';
//         $name = $user_data['name'] ?? null;
//         $role = $user_data['role'] ?? '';

//         if (!security_utils::validate_email($email) || !security_utils::validate_password($password)) {
//             return [
//                 'success' => false,
//                 'message' => 'Invalid email or password format'
//             ];
//         }

//         $email = security_utils::sanitize_input($email);
//         $name = $name !== null ? security_utils::sanitize_input($name) : null;
//         $hashed = security_utils::hash_password($password);

//         try {
//             $created = $this->admin_DAO->create_user_account($email, $hashed, $name, $role);
//             return [
//                 'success' => $created,
//                 'message' => $created ? 'User created successfully' : 'Failed to create user'
//             ];
//         } catch (Exception $e) {
//             error_log('Admin create_user error: ' . $e->getMessage());
//             return [
//                 'success' => false,
//                 'message' => 'Server error while creating user'
//             ];
//         }
//     }

//     /**
//      * Edit an existing user.
//      * $user_id required. $user_data may contain email, password, name, role.
//      * If password is provided it will be hashed; if omitted it will not be changed.
//      *
//      * Returns array: ["success" => bool, "message" => string]
//      */
//     public function edit_user(int $user_id, array $user_data): array {
//         $email = $user_data['email'] ?? null;
//         $password = $user_data['password'] ?? null;
//         $name = $user_data['name'] ?? null;
//         $role = $user_data['role'] ?? null;

//         if ($email !== null && !security_utils::validate_email($email)) {
//             return ['success' => false, 'message' => 'Invalid email format'];
//         }
//         if ($password !== null && !security_utils::validate_password($password)) {
//             return ['success' => false, 'message' => 'Invalid password format'];
//         }

//         $email = $email !== null ? security_utils::sanitize_input($email) : null;
//         $name = $name !== null ? security_utils::sanitize_input($name) : null;
//         $hashed = $password !== null ? security_utils::hash_password($password) : null;

//         try {
//             $updated = $this->admin_DAO->update_user_account($user_id, $email, $hashed, $name, $role);
//             return [
//                 'success' => $updated,
//                 'message' => $updated ? 'User updated successfully' : 'Failed to update user'
//             ];
//         } catch (Exception $e) {
//             error_log('Admin edit_user error: ' . $e->getMessage());
//             return [
//                 'success' => false,
//                 'message' => 'Server error while updating user'
//             ];
//         }
//     }

//     /**
//      * Delete a user by id.
//      * Returns array: ["success" => bool, "message" => string]
//      */
//     public function delete_user(int $user_id): array {
//         try {
//             $deleted = $this->admin_DAO->delete_user_account($user_id);
//             return [
//                 'success' => $deleted,
//                 'message' => $deleted ? 'User deleted successfully' : 'Failed to delete user'
//             ];
//         } catch (Exception $e) {
//             error_log('Admin delete_user error: ' . $e->getMessage());
//             return [
//                 'success' => false,
//                 'message' => 'Server error while deleting user'
//             ];
//         }
//     }
// }
?>
