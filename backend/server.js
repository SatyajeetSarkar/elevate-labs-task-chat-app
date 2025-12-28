require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const { app, server } = require('./lib/socket')

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use(express.json());

app.use(express.json())
app.use(cookieParser())

mongoose.connect(MONGODB_URI, {}).then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err))

app.use('/api/auth', require('./routes/userRouter'))
app.use('/api/chat', require('./routes/chatRouter'))
app.use('/api/messages', require('./routes/messageRouter'))

server.listen(PORT, () => {
    console.log(`Listening at port : ${PORT}`)
})