import "bootstrap/dist/css/bootstrap.min.css";

import { createGlobalStyle } from "styled-components";
import color from "./utils/style/colors";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./utils/context/AuthContext";

import "./index.css";
import Home from "./pages/Home";
import Matchmaking from "./pages/Matchmaking";
import Champions from "./pages/Champions";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";

import reportWebVitals from "./reportWebVitals";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Account from "./pages/Account";
import Simulation from "./pages/Simulation";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0; 
    color: ${color.font_color};
    background: linear-gradient(
      to right,
      ${color.black},
      ${color.dark},
      ${color.dark},
      ${color.dark},
      ${color.dark},
      ${color.dark},
      ${color.black}
    );
  }    
  
  div {
        font-family: "Questrial", sans-serif;
        color: ${color.secondary_text};
       
  }

  h1 {
    font-family: 'PT Serif', sans-serif;
  }

  .button {
    margin: 0px 3px 0px 3px;
    padding: 6px;
    background: ${color.secondary};
    border: ${color.secondary} 1px solid;
    border-radius: 10px;
    color: ${color.text};
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="matchmaking" element={<Matchmaking />} />
          <Route path="champions" element={<Champions />} />
          <Route path="login" element={<Login />} />
          <Route path="account" element={<Account />} />
          <Route path="simulation" element={<Simulation />} />
          <Route path="404" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
