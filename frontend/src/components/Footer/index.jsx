import styled from "styled-components";
import colors from "../../utils/style/colors";
import AWALogo from "../../assets/awalogo.png";

const FooterContainer = styled.nav`
  padding: 30px 0px 30px 0px;
  background-color: ${colors.primary};
  color: ${colors.tertiary};
  width: 100%;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px 0px; // Adjust padding for smaller screens
  }
`;

const LogoSM = styled.img`
  height: 45px;
  width: 93px;
  margin-top: 20px;

  @media (max-width: 768px) {
    height: 35px; // Adjust logo size for smaller screens
    width: 73px;
    margin-top: 10px;
  }
`;

const CopyrightContainer = styled.nav`
  border-top: 1px ${colors.secondary} solid;
  text-align: center;
`;

const CopyrightPart = styled.nav`
  width: 100%;
  text-align: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 0.8rem; // Adjust font size for smaller screens
    margin-top: 10px;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <CopyrightContainer>
        <LogoSM src={AWALogo} alt="logo_awa" />
        <CopyrightPart>
          Copyright © 2023. Tous droits réservés AWA CORP.
        </CopyrightPart>
      </CopyrightContainer>
    </FooterContainer>
  );
}

export default Footer;
