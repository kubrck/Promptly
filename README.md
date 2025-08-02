# AI ChatBot Backend

A Node.js + Express backend for an AI-powered chat application, using TypeScript and MongoDB.

---

## Features

- User authentication (register, login)
- Chat management (create, fetch chats)
- RESTful API endpoints
- MongoDB integration via Mongoose
- CORS and cookie support (HTTP cookies valid for 7 days)
- Centralized error handling
- **Daily chat limit enforced per user** (see below)

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB instance

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ai-chatbot-backend.git
   cd ai-chatbot-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create a `.env` file:**

   ```
   PORT=5000
   MONGODB_URL=your_mongodb_uri
   CLIENT_URL=http://localhost:5173
   ```

4. **Start the server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

---

## API Endpoints

- `POST /api/users/register` — Register user
- `POST /api/users/login` — Login user
- `GET /api/users/me` — Get current user
- `POST /api/chats` — Create chat
- `GET /api/chats` — List chats
- `GET /api/chats/:id` — Get chat by ID

---

## Project Structure

```
src/
  app.ts
  routes/
  models/
  controllers/
  middleware/
```

---

## Additional Notes

- **Authentication cookies**: Secure HTTP cookies are set on login and remain valid for 7 days.
- **Chat limit**: Each user is limited to a fixed number of chats per day (configurable in the backend logic).

---

## Scripts

- `npm run dev` — Start in development mode
- `npm run build` — Build TypeScript
- `npm start` — Run built app

---

## License

MIT
