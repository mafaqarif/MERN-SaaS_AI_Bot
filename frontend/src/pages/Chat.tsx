import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";

const Chat = () => {
  const auth = useAuth();
  const chatMessages = [
    {
      role: "user",
      content: "Hello! Can you help me with my project?",
    },
    {
      role: "assistant",
      content: "Of course! Let me know what you're working on.",
    },
    {
      role: "user",
      content: "I need to build a chatbot using JavaScript.",
    },
    {
      role: "assistant",
      content:
        "That sounds interesting! Do you want to use a library or build it from scratch?",
    },
    {
      role: "user",
      content: "I’d prefer to use a library. What do you recommend?",
    },
    {
      role: "assistant",
      content:
        "You can use `dialogflow` or `botpress` for building chatbots efficiently with JavaScript.",
    },
  ];
  return (
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
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
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
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, sx: 1, sm: 1 },
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
          {chatMessages.map((chat) => (
            <div>{chat.content}</div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
