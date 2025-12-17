const express = require('express')
const router = express.Router()

const { chatRoom, getRooms, addMembers } = require('../controllers/chatController')

// POST: Create chat room route
router.post('/create', chatRoom)
// GET: Get chat rooms route
router.get('/rooms/:id', getRooms)
// PATCH: Add members to either admin or member
router.patch('/rooms/:id/members', addMembers)

module.exports = router