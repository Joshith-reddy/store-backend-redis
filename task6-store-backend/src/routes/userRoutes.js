const express = require("express");

const { 
    createUser, 
    getUsers, 
    getUserById,
    updateUser,
    updateUserRole,
    deleteUser
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

//Post route for creating a new user
router.post("/", createUser);
//Get route for retrieving all users
router.get("/", authMiddleware, getUsers);
//Get route for retrieving a user by ID
router.get("/:id", getUserById);
//Put route for updating user information
router.put("/:id", updateUser);
//Only admins can change user roles
router.patch("/:id/role", authMiddleware, allowRoles("admin"), updateUserRole);
//Delete route for deleting a user
router.delete("/:id", deleteUser);

module.exports = router;
