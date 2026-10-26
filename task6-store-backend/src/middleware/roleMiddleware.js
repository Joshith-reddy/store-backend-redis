// This middleware function checks if the user has one of the allowed roles to access a specific route.
const allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
    // Check if the user is authenticated and has a role
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }
    // Check if the user's role is included in the allowed roles
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: ' Access Forbidden' });
        }

        next();
    };
};
module.exports = allowRoles;