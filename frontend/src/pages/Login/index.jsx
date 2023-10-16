import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import colors from "../../utils/style/colors";

import axios from "axios";

import { useAuth } from "../../utils/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoginPage = styled.div`
  width: 100%;
  padding: 8% 0 0;
  margin: auto;
  height: 100vh;
  display: flex;
  align-items: center;
  background: ${colors.black};

  .console {
    background: ${colors.black};
    color: ${colors.primary};
    margin-top: 20px;
    width: 100%;
    height: 30px;
    padding: 3px;
    border-radius: 10px;
  }
`;

const FormContainer = styled.div`
  position: relative;
  z-index: 1;
  background: ${colors.dark};
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  color: ${colors.text};
  opacity: 0;
  animation: ${fadeIn} 1.2s forwards;

  h1 {
    margin-bottom: 25px;
  }
`;

const Input = styled.input`
  background: ${colors.secondary};
  color: ${colors.text};
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`;

const Button = styled.button`
  text-transform: uppercase;
  background: ${colors.dark_green};
  width: 100%;
  border: 0;
  padding: 15px;
  color: ${colors.text};
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover,
  &:active,
  &:focus {
    background: ${colors.light_green};
  }
`;

const Message = styled.p`
  margin: 15px 0 0;
  color: ${colors.tertiary};
  font-size: 12px;

  a {
    color: ${colors.light_green};
    text-decoration: none;
    cursor: pointer;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${colors.light_green};
  text-decoration: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  padding: 0;
  margin: 0;

  &:hover,
  &:focus {
    color: #43a047;
    text-decoration: underline;
  }
`;

function Login() {
  useEffect(() => {
    document.title = "Connexion - For the Universe";
  }, []);

  const [showLoginForm, setShowLoginForm] = useState(true);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("...");
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          emailOrUsername,
          password,
        }
      );
      setMessage(response.data.message);
      if (response.data.success) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("elo_score", response.data.elo_score);
        login();
        navigate("/account");
      }
    } catch (error) {
      setMessage("Erreur de connexion au serveur");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setMessage("Entrez une adresse mail valide");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/register`,
        {
          email,
          username,
          password,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Erreur de connexion au serveur");
    }
  };

  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  if (isAuthenticated) {
    navigate("/404");
    return null;
  }

  return (
    <LoginPage>
      <FormContainer>
        <h1>Connexion</h1>
        {showLoginForm ? (
          <>
            <Input
              type="text"
              placeholder="pseudo"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={handleSubmit}
              disabled={!emailOrUsername || !password}
            >
              Se connecter
            </Button>
            <Message>
              Pas enregistré?{" "}
              <ActionButton onClick={() => setShowLoginForm(false)}>
                Créer un compte
              </ActionButton>
            </Message>
            <Message>
              <ActionButton href="#">Mot de passe oublié?</ActionButton>
            </Message>
          </>
        ) : (
          <>
            <Input
              type="text"
              placeholder="pseudo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="text"
              placeholder="adresse mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={handleRegister}
              disabled={!username || !password || !email}
            >
              Créer
            </Button>
            <Message>
              Déjà parmi nous?{" "}
              <ActionButton onClick={() => setShowLoginForm(true)}>
                Se connecter
              </ActionButton>
            </Message>
          </>
        )}

        <div className="console">{message && <p>{message}</p>}</div>
      </FormContainer>
    </LoginPage>
  );
}

export default Login;
