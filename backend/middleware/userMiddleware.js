const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ msg: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ msg: "Unauthorized" })
        }
        
        const user = await User.findById(decoded.userID).select('-password')

        if (!user) {
            return res.status(401).json({ msg: "User not found" })
        }

        req.user = user

        next()

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { protectedRoute }