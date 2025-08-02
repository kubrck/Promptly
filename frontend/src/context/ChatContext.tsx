import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Chat {
  _id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  loading: boolean;
  error: string | null;
  createChat: (title?: string) => Promise<void>;
  getChats: () => Promise<void>;
  getChat: (chatId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createChat = async (title?: string) => {
    try {
      setError(null);
      const response = await axios.post(
        "http://localhost:5000/api/chats",
        { title },
        { withCredentials: true }
      );
      setChats([response.data.chat, ...chats]);
      setCurrentChat(response.data.chat);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error creating chat");
      throw error;
    }
  };

  const getChats = async () => {
    try {
      setError(null);
      const response = await axios.get("http://localhost:5000/api/chats", {
        withCredentials: true,
      });
      setChats(response.data.chats);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error fetching chats");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getChat = async (chatId: string) => {
    try {
      setError(null);
      const response = await axios.get(
        `http://localhost:5000/api/chats/${chatId}`,
        {
          withCredentials: true,
        }
      );
      setCurrentChat(response.data.chat);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error fetching chat");
      throw error;
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentChat) {
      throw new Error("No chat selected");
    }

    try {
      setError(null);
      const response = await axios.post(
        `http://localhost:5000/api/chats/${currentChat._id}/messages`,
        { content },
        { withCredentials: true }
      );

      // Update current chat with new messages
      setCurrentChat((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [
            ...prev.messages,
            { role: "user", content, timestamp: new Date() },
            {
              role: "assistant",
              content: response.data.response,
              timestamp: new Date(),
            },
          ],
        };
      });

      // Update chats list with updated chat
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === currentChat._id
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: "user", content, timestamp: new Date() },
                  {
                    role: "assistant",
                    content: response.data.response,
                    timestamp: new Date(),
                  },
                ],
              }
            : chat
        )
      );
    } catch (error: any) {
      setError(error.response?.data?.message || "Error sending message");
      throw error;
    }
  };

  const deleteChat = async (chatId: string) => {
    try {
      setError(null);
      await axios.delete(`http://localhost:5000/api/chats/${chatId}`, {
        withCredentials: true,
      });
      setChats((prev) => prev.filter((chat) => chat._id !== chatId));
      if (currentChat?._id === chatId) {
        setCurrentChat(null);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Error deleting chat");
      throw error;
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        loading,
        error,
        createChat,
        getChats,
        getChat,
        sendMessage,
        deleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
