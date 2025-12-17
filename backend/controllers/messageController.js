const Message = require('../models/messageModel')

// User Text
const createText = async (req, res) => {
    try {
        const { sender, chat, text, receiver } = req.body

        if (!text) {
            return res.status(400).json({ msg: 'No message' })
        }

        const chatRoom = await Message.create({ sender, chat, text, receiver })

        res.status(201).json({ msg: 'Message Send', chatRoom })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

// GET: Get messages
const getMessages = async (req, res) => {
    try {
        const { id } = req.params;

        const messages = await Message.find(
            { chat: id },
            { text: 1, _id: 0 }   // projection
        ).sort({ createdAt: 1 });

        const texts = messages.map(m => m.text);

        res.status(200).json(texts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createText, getMessages }