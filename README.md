# Real-Time Chat Application

A real-time chat application inspired by WhatsApp, built using Next.js, Socket.io, and Node.js. The application enables users to authenticate, create or join chat rooms, and exchange messages instantly using WebSocket-based communication.

# Features

- User authentication (Signup, Login, Logout)

- JWT-based authorization

- Real-time messaging using Socket.io

- WhatsApp-like UI layout (sidebar + chat window)

- Protected routes for authenticated users

- Profile page with user details

- Responsive and modern UI using shadcn/ui

# Tech Stack
## Frontend

- Next.js (App Router)

- shadcn/ui

- Tailwind CSS

- Axios

- Socket.io Client

- Zustand (state management)

## Backend

- Node.js

- Express.js

- Socket.io

- MongoDB

- JWT (JSON Web Tokens)

- Other Tools

- Git & GitHub

- Postman (API testing)

# API Routes
## Authentication

- POST /api/auth/signup – User signup

- POST /api/auth/login – User login

- POST /api/auth/logout – User logout

- PUT /api/auth/update-user – Update user

- GET /api/auth/user/:id – Get user (Protected)

## Chat

- POST /api/chat/create – Create chat room

- GET /api/chat/rooms/:id – Get user chat rooms

- PATCH /api/chat/rooms/:id/members – Add members

## Messages

- POST /api/messages/create – Send message

- GET /api/messages/:id – Get messages

## Real-Time Communication

- Socket.io is used for real-time message delivery

- Each user establishes a socket connection

Messages are broadcasted to chat rooms instantly

Supports multiple users and browser sessions
