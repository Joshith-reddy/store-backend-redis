const jwt = require("jsonwebtoken");

// Middleware to authenticate requests using JWT
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;   

// Check if the authorization header is present and starts with "Bearer "
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization token is required"
            });
        }
// Check if the authorization header starts with "Bearer "
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid authorization format"
            });
        }
// Extract the token from the authorization header
        const token = authHeader.split(" ")[1];

// Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;