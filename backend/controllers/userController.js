const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const { generateToken } = require('../lib/utils')

// User Signup
const signup = async (req, res) => {
    try {
        const { name, username, email, password, bio, online, lastseen } = req.body

        const findUserName = await User.findOne({ username })

        if (findUserName) {
            return res.status(400).json({ msg: 'User Exists' })
        }

        if (password < 6) {
            return res.status(400).json({ msg: 'Password length small' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ name, username, email, password: hashedPassword, bio, online, lastseen })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({ _id: newUser._id, name: newUser.name, email: newUser.email, bio: newUser.bio })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// User Login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      msg: "User logged in successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// User Logout
const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).json({ msg: 'Logout Successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update user 
const updateUser = async (req, res) => {
    try {
        const userId = req.user._id
        const data = req.body

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            data,
            { new: true, runValidators: true }
        ).select("-password")

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get User 
const getUser = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')

    if (!user) {
        return res.status(404).json({ msg: 'User not exists' })
    }

    res.status(200).send(user)
}

module.exports = { signup, login, logout, updateUser, getUser }