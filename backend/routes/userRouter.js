const express = require('express')
const router = express.Router()

const { signup, login, logout, updateUser, getUser } = require('../controllers/userController')
const { protectedRoute } = require('../middleware/userMiddleware')

// User signup route
router.post('/signup', signup)

// User login route
router.post('/login', login)

// User Log out
router.post('/logout', logout)

// Update user
router.put('/update-user', protectedRoute, updateUser)

// Get user
router.get('/user/:id', protectedRoute, getUser)

module.exports = router