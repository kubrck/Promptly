📦 Promptly – AI-Powered Chatbot Platform
A secure, full-stack AI chatbot built with Node.js, Express, TypeScript, and MongoDB, featuring JWT authentication and OpenAI GPT-3.5 integration. Promptly enables users to have natural language conversations while preserving message history and enforcing usage limits per session.

✨ Key Features
🔐 User Authentication – Secure registration/login with JWT & HTTP-only cookies (7-day session validity)

💬 Chat Creation & Management – RESTful endpoints to create, fetch, and manage AI-powered chats

🧠 AI Integration (GPT-3.5) – Seamless OpenAI-powered conversational responses (coming in frontend or integrated separately)

🛡️ Daily Chat Limits – Configurable per-user message limits to control OpenAI API usage

🧰 Type-Safe Architecture – End-to-end TypeScript codebase with clean module separation

🌐 CORS & Cookie Support – Cross-origin communication for React frontend (Vite-ready)

🚀 Getting Started
✅ Prerequisites
Node.js (v16+)

MongoDB Atlas or local MongoDB

OpenAI API key (for integration if frontend is added)

📦 Installation
bash
Copy
Edit
git clone https://github.com/kubrck/Promptly.git
cd promptly
npm install
🔐 Environment Variables (.env)
env
Copy
Edit
PORT=5000
MONGODB_URL=your_mongodb_uri
CLIENT_URL=http://localhost:5173
▶️ Run the Server
bash
Copy
Edit
npm run dev # Start in development mode
npm run build # Build TypeScript
npm start # Run compiled app
🔌 API Endpoints
Method Endpoint Description
POST /api/users/register Register a new user
POST /api/users/login Authenticate user login
GET /api/users/me Get authenticated user
POST /api/chats Create a new chat
GET /api/chats List all chats
GET /api/chats/:id Get a specific chat by ID

🧠 Project Structure
csharp
Copy
Edit
src/
├── app.ts # Entry point
├── routes/ # API route handlers
├── controllers/ # Business logic
├── models/ # Mongoose schemas
├── middleware/ # Auth, error handling, rate limiters
📊 Metrics (Design & Performance)
⚙️ Designed to handle 100+ users and 1,000+ chats per day

⏱️ Session token valid for 7 days using secure HTTP-only cookies

💡 Chat limit logic easily configurable (e.g., 10 chats/day)

🛡️ Security Notes
JWT + bcrypt for secure authentication

HTTP-only, SameSite cookies for session persistence

CORS configured for frontend–backend isolation

🪪 License
MIT
