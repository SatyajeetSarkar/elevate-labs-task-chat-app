const express = require('express')
const router = express.Router()

const { createText, getMessages } = require('../controllers/messageController')

//POST: Create mesages
router.post('/create', createText)
//GEt: Get user messages
router.get('/:id', getMessages)

module.exports = router