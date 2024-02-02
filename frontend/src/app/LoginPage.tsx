"use client";

import { motion, useUnmountEffect } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import styled from "styled-components";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<any>(false);

  const handleLogin = () => {
    if (!username.trim()) {
      setShowError(true);
      return;
    }

    localStorage.setItem("username", username);
    router.push("/chat");
  };

  useUnmountEffect(() => {
    const savedUsername: any = localStorage?.getItem("username");
    if (savedUsername) {
      router.push("/chat");
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowError(false);
    setUsername(e.target.value);
  };

  return (
    <Container
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!isLoading && (
        <Form>
          <Title>JellyBeans Chat</Title>
          <Input
            type="text"
            placeholder="Digite seu nome de usuário"
            value={username}
            onChange={handleInputChange}
          />
          <Button onClick={handleLogin}>Entrar</Button>
          {showError && (
            <ErrorMessage>
              <RiErrorWarningFill size={20} /> Nome de Usuário é obrigatório!
            </ErrorMessage>
          )}
        </Form>
      )}
    </Container>
  );
};

const Container = styled(motion.div)`
  background: linear-gradient(to bottom right, #5b2c6f, #8e44ad, #341f4e);
  height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Form = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  color: #8e44ad; /* Alterando para a cor roxa */
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  background: #8e44ad;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: #6c3483;
  }
`;

const ErrorMessage = styled.div`
  background: #d9534f;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LoginPage;
