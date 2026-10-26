const User = require("../models/User");


//CREATE a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
    
        // Validate required fields
         if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }
       

        const user = new User({
            name,
            email,
            password,
            age
        });

        await user.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Create user error:", error.message);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
//GET all users

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json(users);
    } catch (error) {
        console.error("Get users error:", error.message);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

//GET user by ID

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Get user by ID error:", error.message);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// UPDATE user by ID

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const { name, email, age } = req.body;
        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;
        if (age !== undefined) user.age = age;

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Update user error:", error.message);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// UPDATE a user's role
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!["user", "manager", "admin"].includes(role)) {
            return res.status(400).json({
                message: "Role must be user, manager, or admin"
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.role = role;
        await user.save();

        res.status(200).json({
            message: "User role updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Update user role error:", error.message);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

//DELETE user by ID

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Delete user error:", error.message);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    updateUserRole,
    deleteUser
};
