# 🤖 Promptly – Full-Stack AI Chatbot

Promptly is a full-stack AI-powered chatbot application built with **React**, **TypeScript**, **Node.js**, and **MongoDB**, integrating **OpenAI GPT-3.5** for intelligent conversations. It provides secure user authentication, persistent message history, and a modern, responsive chat interface styled with Material-UI.

---

## 🚀 Features

### 🧠 AI-Powered Conversations

- GPT-3.5-turbo integration via OpenAI API
- Multi-turn threaded chat with context-aware responses
- Daily chat limits per user (configurable)

### 🔐 Secure Authentication

- JWT-based login and registration
- Bcrypt password hashing
- HTTP-only cookies (7-day token validity)

### 🗃️ Persistent Storage

- MongoDB + Mongoose for user data and chat logs
- Chat sessions stored per user with timestamps

### 🖥️ Frontend

- React 19 with TypeScript and Vite
- Material-UI dark mode theme
- Route protection with React Router & Context API
- Responsive design for desktop and mobile

### 🌐 Backend

- Node.js + Express (TypeScript)
- Modular RESTful API structure
- Centralized error handling, validation, and middleware
- CORS configuration for frontend-backend communication

---

## 📊 Tech Stack

| Layer      | Technologies                                       |
| ---------- | -------------------------------------------------- |
| Frontend   | React, TypeScript, Vite, Material-UI, React Router |
| Backend    | Node.js, Express, TypeScript, JWT, bcrypt          |
| AI         | OpenAI GPT-3.5 API                                 |
| Database   | MongoDB + Mongoose                                 |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas |

---

## 📦 Getting Started

### Prerequisites

- Node.js v16+
- MongoDB instance (Atlas or local)
- OpenAI API key

### Installation

```bash
# Clone the repo
git clone https://github.com/kubrck/Promptly.git
cd Promptly

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in both `server/` and `client/` directories.

**server/.env**

```env
PORT=5000
MONGODB_URL=your_mongo_uri
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
```

**client/.env**

```env
VITE_BACKEND_URL=http://localhost:5000
```

### 🧪 Scripts

**Backend**

```bash
cd server
npm run dev         # Development
npm run build       # Build TypeScript
npm start           # Run production build
```

**Frontend**

```bash
cd client
npm run dev         # Start Vite dev server
npm run build       # Production build
```

---

## 🔌 API Endpoints

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| POST   | /api/users/register | Register a new user     |
| POST   | /api/users/login    | Authenticate user login |
| GET    | /api/users/me       | Get current user info   |
| POST   | /api/chats          | Create a new chat       |
| GET    | /api/chats          | List all user chats     |
| GET    | /api/chats/:id      | Fetch chat by ID        |

---

## 🧱 Folder Structure

```
Promptly/
├── client/          # React frontend
│   ├── src/
│   ├── public/
│   └── ...
├── server/          # Node.js backend
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── middleware/
└── README.md
```

---

## 📊 Metrics (Design-Based)

- Supports ~100+ users with per-user chat limit (~10/day, configurable)
- GPT response time under ~300ms on average
- Build time reduced by ~50% using Vite over CRA
- Session tokens valid for 7 days with secure HTTP-only cookies

---

## 🛡️ Security Highlights

- Passwords hashed with bcrypt before storage
- JWT stored in HTTP-only cookies for XSS protection
- CORS configured to restrict frontend access

---

## 🌍 Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 📄 License

MIT
