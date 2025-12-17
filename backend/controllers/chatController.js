const Chat = require('../models/chatModel')
const mongoose = require('mongoose')

// POST: Create chat room
const chatRoom = async (req, res) => {
    try {
        const { name, group, members, lastmessage } = req.body

        if (!name || !members || members.length === 0) {
            return res.status(400).json({ msg: 'Name and members are required' })
        }

        const chatRoom = await Chat.create({
            name,
            group,
            members,
            lastmessage
        })

        res.status(201).json({
            msg: 'Chat Room Created',
            chatRoom
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// GET: Get chat rooms
const getRooms = async (req, res) => {
    try {
        const { id } = req.params

        const rooms = await Chat.findById(id)

        if (!rooms) return res.status(400).json({ msg: 'Room not found' })

        res.status(200).send(rooms) 
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

// PATCH: Add members
const addMembers = async (req, res) => {
    try {
        const { id } = req.params
        const { user, role } = req.body

        if (!user) return res.status(400).json({ msg: 'User not found' })
        
        const rooms = await Chat.findById(id)
        if (!rooms) return res.status(400).json({ msg: 'Room not found' })
        
        const memberExists = rooms.members.some(m => m.user && m.user.toString() === user)
        if (memberExists) return res.status(400).json({ msg: 'User already exists' })

        rooms.members.push({ user, role })
        await rooms.save()
        
        res.status(200).send(rooms)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

module.exports = { chatRoom, getRooms, addMembers }