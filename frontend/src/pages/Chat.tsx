import { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Drawer,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Send as SendIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

const Chat = () => {
  const { user, logout } = useAuth();
  const {
    chats,
    currentChat,
    loading,
    error,
    createChat,
    getChat,
    sendMessage,
    deleteChat,
  } = useChat();
  const [message, setMessage] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await sendMessage(message);
      setMessage("");
    } catch (error) {
      // Error is handled by the chat context
    }
  };

  const handleCreateChat = async () => {
    try {
      await createChat();
      setDrawerOpen(false);
    } catch (error) {
      // Error is handled by the chat context
    }
  };

  const handleSelectChat = async (chatId: string) => {
    try {
      await getChat(chatId);
      setDrawerOpen(false);
    } catch (error) {
      // Error is handled by the chat context
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      await deleteChat(chatId);
    } catch (error) {
      // Error is handled by the chat context
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {user?.name}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateChat}
            fullWidth
            sx={{ mb: 2 }}
          >
            New Chat
          </Button>
          <Button
            variant="outlined"
            onClick={() => logout()}
            fullWidth
            color="error"
          >
            Logout
          </Button>
        </Box>
        <Divider />
        <List>
          {chats.map((chat) => (
            <ListItem
              key={chat._id}
              button
              selected={currentChat?._id === chat._id}
              onClick={() => handleSelectChat(chat._id)}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteChat(chat._id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText
                primary={chat.title}
                secondary={new Date(chat.updatedAt).toLocaleDateString()}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Chat Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography color="error">{error}</Typography>
          </Box>
        ) : !currentChat ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Select a chat or create a new one
            </Typography>
          </Box>
        ) : (
          <>
            {/* Chat Messages */}
            <Box
              sx={{
                flexGrow: 1,
                overflow: "auto",
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {currentChat.messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.role === "user" ? "flex-end" : "flex-start",
                    mb: 2,
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      maxWidth: "70%",
                      backgroundColor:
                        msg.role === "user"
                          ? "primary.main"
                          : "background.paper",
                      color:
                        msg.role === "user"
                          ? "primary.contrastText"
                          : "text.primary",
                    }}
                  >
                    <Typography variant="body1">{msg.content}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Paper>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Box
              component="form"
              onSubmit={handleSendMessage}
              sx={{
                p: 2,
                backgroundColor: "background.paper",
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <IconButton
                  type="submit"
                  color="primary"
                  disabled={!message.trim()}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Chat;
