import styled, { keyframes } from "styled-components";
import colors from "../../utils/style/colors";

import Ratio from "../../assets/ratio.png";
import BonusRole from "../../assets/role.png";
import Date from "../../assets/date.png";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  height: 100%;
  color: ${colors.text};
  text-align: center;
  margin-top: 25px;
  opacity: 0;
  animation: ${fadeIn} 1.2s forwards;
  animation-delay: 0.4s;

  img {
    width: 150px;
    filter: invert(70%);
    transform: translatey(0px);

    &.ratio {
      width: 180px;
      animation: float 3s ease-in-out infinite;
    }

    &.role {
      animation: float 4s ease-in-out infinite;
      margin-top: 30px;
    }

    &.party {
      animation: float 3s ease-in-out infinite;
      margin-top: 30px;
    }
  }

  h4 {
    margin-top: 25px;
    font-size: 1rem;
    color: ${colors.tertiary};
  }

  .row {
    margin-top: 50px;
  }

  p {
    font-weight: bold;
    text-transform: uppercase;
  }

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-10px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  @media screen and (max-width: 768px) {
    img {
      width: 100px;

      &.ratio {
        width: 120px;
      }
    }

    h1 {
      font-size: 1.5rem;
    }

    h4 {
      font-size: 1rem;
      margin-top: 15px;
    }

    .row {
      margin-top: 25px;
    }
  }
`;

function TripleDesc() {
  return (
    <Container>
      <div className="container">
        <h1>Facteur de calcul</h1>
        <h4>
          Le calcul du matchmaking prend en compte les trois facteurs suivants:
        </h4>
        <div className="row">
          <div className="col-lg-4 d-flex justify-content-center align-items-center">
            <div>
              <p className="text-center">
                Ratio éliminations/assistances/morts
              </p>
              <img src={Ratio} alt="Icone" className="img-fluid mb-3 ratio" />
            </div>
          </div>
          <div className="col-lg-4 d-flex justify-content-center align-items-center">
            <div>
              <p className="text-center title">Bonus de rôle</p>
              <img
                src={BonusRole}
                alt="Icone"
                className="img-fluid mb-3 role"
              />
            </div>
          </div>
          <div className="col-lg-4 d-flex justify-content-center align-items-center">
            <div>
              <p className="text-center title">Date de la partie</p>
              <img src={Date} alt="Icone" className="img-fluid mb-3 party" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default TripleDesc;
