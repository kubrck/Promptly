import { Request, Response } from "express";
import { Chat } from "../models/Chat";
import OpenAI from "openai";

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);
console.log("All env variables:", process.env);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createChat = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.jwtData.id;
    const { title } = req.body;

    const chat = new Chat({
      userId,
      title: title || "New Chat",
      messages: [],
    });

    await chat.save();

    return res.status(201).json({ chat });
  } catch (error) {
    console.error("Create chat error:", error);
    return res.status(500).json({ message: "Error creating chat" });
  }
};

export const getChats = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.jwtData.id;
    const chats = await Chat.find({ userId })
      .select("title createdAt updatedAt")
      .sort({ updatedAt: -1 });

    return res.status(200).json({ chats });
  } catch (error) {
    console.error("Get chats error:", error);
    return res.status(500).json({ message: "Error fetching chats" });
  }
};

export const getChat = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    const userId = res.locals.jwtData.id;

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    return res.status(200).json({ chat });
  } catch (error) {
    console.error("Get chat error:", error);
    return res.status(500).json({ message: "Error fetching chat" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const userId = res.locals.jwtData.id;

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Add user message
    chat.messages.push({
      role: "user",
      content,
      timestamp: new Date(),
    });

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant.",
        },
        ...chat.messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    // Add AI response
    chat.messages.push({
      role: "assistant",
      content: aiResponse || "No response from AI",
      timestamp: new Date(),
    });

    await chat.save();

    return res.status(200).json({
      message: "Message sent successfully",
      response: aiResponse,
    });
  } catch (error) {
    console.error("Send message error:", error);
    return res.status(500).json({ message: "Error sending message" });
  }
};

export const deleteChat = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    const userId = res.locals.jwtData.id;

    const chat = await Chat.findOneAndDelete({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    return res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Delete chat error:", error);
    return res.status(500).json({ message: "Error deleting chat" });
  }
};
