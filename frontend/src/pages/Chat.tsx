import {
  Avatar,
  Box,
  Button,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { sendChatMessage } from "../helpers/api-communicator";

// const chatMessages = [
//   {
//     role: "user",
//     content: "Hello! Can you help me with my project?",
//   },
//   {
//     role: "assistant",
//     content: "Of course! Let me know what you're working on.",
//   },
//   {
//     role: "user",
//     content: "I need to build a chatbot using JavaScript.",
//   },
//   {
//     role: "assistant",
//     content:
//       "That sounds interesting! Do you want to use a library or build it from scratch?",
//   },
//   {
//     role: "user",
//     content: "I’d prefer to use a library. What do you recommend?",
//   },
//   {
//     role: "assistant",
//     content:
//       "You can use `dialogflow` or `botpress` for building chatbots efficiently with JavaScript.",
//   },
// ];
type Messages = {
  role: string;
  content: string;
};

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Messages[]>([]);
  const auth = useAuth();
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Messages = { role: "user", content };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    const chatData = await sendChatMessage(content);
    setChatMessages([...chatData.chats]);
  };
  return (
    // main box
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      {/* left box */}
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        {/* left inner box */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
            padding: "5px",
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: "700",
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1]
              ? auth?.user?.name.split(" ")[1][0]
              : ""}
          </Avatar>

          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a chat bot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You can ask questions about knowledge, business, advice, or
            Education , etc. But avoid sharing personla information.
          </Typography>

          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: 700,
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      {/* right box */}
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          padding: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: 600,
          }}
        >
          Model - GPT3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem
              content={chat.content}
              role={chat.role as "user" | "assistant"}
              key={index}
            />
          ))}
        </Box>

        {/* input for text input */}
        <div
          style={{
            width: "99%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            marginRight: "auto",
            boxSizing: "border-box",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />{" "}
          {/* input end*/}
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white" }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
