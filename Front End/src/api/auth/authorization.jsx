export default function authorization(userRole, allowedRoles) {
    return allowedRoles.includes(userRole);
}