import styled from "styled-components";
import colors from "../../utils/style/colors";

const Tit = styled.div`
  &.banner-bg {
    background: linear-gradient(
      to bottom,
      ${colors.black},
      ${colors.black},
      ${colors.black},
      ${colors.black},
      ${colors.dark}
    );

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 20vh;
    position: relative;
    text-align: center;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 4px;
    background-color: rgba(17, 17, 17, 0.3);
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    z-index: 1;
    background: linear-gradient(
      to right,
      ${colors.light_green} 20%,
      ${colors.light_green} 40%,
      ${colors.dark_green} 50%,
      ${colors.dark_green} 55%,
      ${colors.light_green} 70%,
      ${colors.light_green} 100%
    );
    background-size: 200% auto;
    animation: shine 3s linear infinite;
  }

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }

  h1 {
    font-size: 3rem;
    line-height: 90px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${colors.text};
  }

  // Media queries for responsiveness
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
      line-height: 70px;
    }
  }
`;

function Title({ title }) {
  return (
    <div className="wrapper">
      <Tit className="banner-bg d-flex align-items-center justify-content-center">
        <div className="container text-center">
          <h1>{title}</h1>
        </div>
      </Tit>
    </div>
  );
}

export default Title;
