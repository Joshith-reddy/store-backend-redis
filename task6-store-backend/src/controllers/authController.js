const bcrypt = require("bcrypt");

const User = require("../models/User");

const jwt = require("jsonwebtoken");

// Register a new user

const register = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        age,
    });
    await user.save();
    res.status(201).json({
        message: 'User registered successfully',
        user : {
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            role: user.role
        }
    });
  }
    catch (error) { 
        console.error("User registration error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

//Login user

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign({
            userId: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    register,
    login
};
