import styled, { keyframes } from "styled-components";
import colors from "../../utils/style/colors";
import Background from "../../assets/background.png";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Ban = styled.div`
  &.banner-bg {
    background-image: url(${Background});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 90vh;
    position: relative;
    text-align: center;
  }

  &.banner-bg::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(17, 17, 17, 0.5);
  }

  h4,
  h1 {
    animation: ${fadeIn} 0.8s ease-in-out forwards;
    opacity: 0; // Par défaut, les textes sont invisibles
  }

  h4 {
    font-size: 20px;
    line-height: 100%;
    text-transform: uppercase;
    margin-bottom: 18px;
    letter-spacing: 3px;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-image: -webkit-linear-gradient(
      130deg,
      ${colors.light_green},
      ${colors.dark_green}
    );
    font-weight: 700;
    animation-delay: 0.1s;
  }

  h1 {
    font-size: 70px;
    line-height: 90px;
    font-weight: 700;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 37px;
    animation-delay: 0.1s;
  }

  /* Media Queries for Responsiveness */
  @media (max-width: 992px) {
    /* Tablet */
    h1 {
      font-size: 50px;
      line-height: 70px;
    }

    h4 {
      font-size: 18px;
    }
  }

  @media (max-width: 768px) {
    /* Mobile */
    &.banner-bg {
      height: 70vh;
    }

    h1 {
      font-size: 40px;
      line-height: 50px;
    }

    h4 {
      font-size: 16px;
    }
  }
`;

function Banner() {
  return (
    <Ban className="banner-bg d-flex align-items-center justify-content-center">
      <div className="container text-center">
        <h4>BATTEZ-VOUS POUR L'UNIVERS</h4>
        <h1>FOR THE UNIVERSE</h1>
      </div>
    </Ban>
  );
}

export default Banner;
