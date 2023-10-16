import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import AWALogo from "../../assets/awalogo.png";
import FTULogo from "../../assets/logo.png";

import { useAuth } from "../../utils/context/AuthContext";

const NavHead = styled.div`
  background-color: ${colors.primary};
  color: ${colors.text} !important;

  a {
    color: ${colors.tertiary} !important;
    border: solid 1px ${colors.primary};
    text-decoration: none !important;

    &:hover {
      text-decoration: none !important;

      @media screen and (min-width: 480px) {
        color: ${colors.secondary} !important;
        border-bottom: solid 1px ${colors.light_green};
        a {
          border-bottom: solid 1px ${colors.primary};
        }
      }
    }
  }

  img {
    height: 45px;
    width: 93px;
  }

  .brand {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    margin-left: 15px;

    &:hover {
      border-bottom: solid 1px ${colors.primary} !important;
    }
  }

  .ftu-logo {
    height: 45px;
    width: 45px;
    transition: all 0.2s ease-in-out;
    &:hover {
      height: 48px;
      width: 48px;
    }
  }

  .button {
    margin: 0px 3px 0px 3px;
    background: ${colors.secondary};
    border: ${colors.secondary} 1px solid;
    border-radius: 10px;
    color: ${colors.text} !important;
    text-transform: uppercase;
    height: 35px !important;

    &:hover {
      color: ${colors.text} !important;
    }
  }

  .play {
    background: ${colors.light_green};
    border: ${colors.light_green} 1px solid;
  }

  .ftlogo {
    &:hover {
      text-decoration: none !important;
    }
  }

  .log {
    color: ${colors.tertiary};
    .pseudo {
      font-weight: bold;
    }
  }

  .logout {
    margin: 0px 3px 0px 3px;
    background: ${colors.primary};
    border: ${colors.primary} 1px solid;
    border-radius: 10px;
    color: ${colors.text} !important;
    text-transform: uppercase;
    height: 35px !important;
    width: 35px;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: ${colors.text} !important;
    }
  }
`;

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const username = localStorage.getItem("username");

  return (
    <header>
      <NavHead>
        <div className="container">
          <Navbar className="navbar" expand="lg">
            <img src={AWALogo} alt="awa_logo" />
            <Navbar.Brand className="brand ftlogo" href="#">
              <Link to="/" className="ftlogo">
                <img className="ftu-logo" src={FTULogo} alt="awa_logo" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" active>
                  <Link to="/">Accueil</Link>
                </Nav.Link>
                <Nav.Link href="#">
                  <Link to="matchmaking">Matchmaking</Link>
                </Nav.Link>
                <Nav.Link href="#">
                  <Link to="champions">Personnages</Link>
                </Nav.Link>
              </Nav>
              <Navbar.Text
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {isAuthenticated ? (
                  <div>
                    <span className="log">
                      Connecté en tant que:{" "}
                      <span className="pseudo">{username}</span>
                    </span>

                    <Link
                      to="/account"
                      className="button"
                      variant="outline-secondary"
                      size="sm"
                    >
                      👤
                    </Link>
                  </div>
                ) : (
                  <Link to="/login" className="button white" size="sm">
                    CONNEXION
                  </Link>
                )}
                <Button
                  className="button play"
                  variant="outline-secondary"
                  size="sm"
                >
                  JOUER
                </Button>
                {isAuthenticated ? (
                  <Link to="/login" className="button logout" size="sm">
                    <button className="button" onClick={logout}>
                      ⇨
                    </button>
                  </Link>
                ) : null}
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </NavHead>
    </header>
  );
}

export default Header;
