import { Router } from "express";
import {
  createChat,
  getChats,
  getChat,
  sendMessage,
  deleteChat,
} from "../controllers/chatController";
import { validateChatMessage } from "../middleware/validators";
import { authenticateUser } from "../middleware/auth";

const router = Router();

// All chat routes require authentication
router.use(authenticateUser);

// Chat routes
router.post("/", createChat);
router.get("/", getChats);
router.get("/:chatId", getChat);
router.post("/:chatId/messages", validateChatMessage, sendMessage);
router.delete("/:chatId", deleteChat);

export default router;
