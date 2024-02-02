"use client";

// Chat.tsximport React, { useState, useEffect } from 'react';
import { socket } from "@/config/socket";
import { motion, useUnmountEffect } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft, FiSend } from "react-icons/fi";
import styled from "styled-components";

interface Message {
  username: string | null;
  text: string;
  timestamp: string;
}

const ChatPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useUnmountEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (!savedUsername) {
      router.push("/");
    }

    if (process.browser) {
      socket.on("receiveMessage", (data: any) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socket.disconnect();
      };
    }
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", {
        username: localStorage.getItem("username"),
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      });
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enviar a mensagem ao pressionar Enter
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/");
  };

  return (
    <Container>
      <Header>
        <LogoutButton onClick={handleLogout}>
          <FiArrowLeft size={24} color="#fff" />
        </LogoutButton>
        <HeaderTitle>Bate Papo da NEC</HeaderTitle>
      </Header>
      <MessagesContainer>
        {messages.map((message: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                flex: 1,
              }}
            >
              <Message
                isCurrentUser={
                  message.username === localStorage.getItem("username")
                }
              >
                <MessageHeader>
                  <SenderName>{message.username}</SenderName>
                  <Timestamp>{message.timestamp}</Timestamp>
                </MessageHeader>
                <MessageText>{message.text}</MessageText>
              </Message>
            </div>
          </motion.div>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SendButton onClick={handleSendMessage}>
          <FiSend size={24} color="#fff" />
        </SendButton>
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #8e44ad;
  color: #fff;
  padding: 10px;
  text-align: center;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 18px; /* Reduzi o tamanho do texto do título */
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f2f2f2;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

const Message = styled.div<{ isCurrentUser: boolean }>`
  background: ${({ isCurrentUser }) => (isCurrentUser ? "#8e44ad" : "#d1b2ff")};
  color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 70%;
  align-self: ${({ isCurrentUser }) =>
    isCurrentUser ? "flex-end" : "flex-start"};
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const SenderName = styled.span`
  font-weight: bold;
`;

const Timestamp = styled.span`
  font-size: 12px;
`;

const MessageText = styled.p`
  margin: 0;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  padding: 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 15px;
  margin-right: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

const SendButton = styled.button`
  background: #8e44ad;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

export default ChatPage;
