import colors from "../../utils/style/colors";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Container = styled.div`
  text-align: center;
  color: ${colors.text};
  display: grid;
  align-items: center;
  justify-content: center;
  height: 80vh;
  opacity: 0;
  animation: ${fadeIn} 1.2s forwards;
  animation-delay: 0.5s;

  h4 {
    margin-top: 25px;
    font-size: 1rem;
    color: ${colors.tertiary};
  }

  .equation {
    font-size: 2rem;
  }

  .coeff-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    text-align: left;
  }

  .R {
    color: magenta;
    font-weight: bold;
  }

  .K {
    color: red;
    font-weight: bold;
  }

  .BK {
    color: green;
    font-weight: bold;
  }

  .A {
    color: blue;
    font-weight: bold;
  }

  .BA {
    color: yellow;
    font-weight: bold;
  }

  .M {
    color: purple;
    font-weight: bold;
  }

  .BM {
    color: brown;
    font-weight: bold;
  }

  .T {
    color: orange;
    font-weight: bold;
  }

  .ast {
    color: ${colors.gray};
  }

  @media screen and (max-width: 1024px) {
    .equation {
      font-size: 2rem;
    }

    .coeff-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 768px) {
    .equation {
      font-size: 1.1rem;
    }

    .coeff-list {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }
`;

function CalculMatchmaking() {
  return (
    <Container>
      <div className="title">
        <h1>Calcul du score</h1>
        <h4>
          Voici l'équation utilisée pour déterminer votre score de matchmaking :
        </h4>
      </div>
      <div className="equation">
        Score = <span className="R">R</span> * ( ( <span className="K">K</span>{" "}
        * <span className="BK">BK</span> + <span className="A">A</span> *{" "}
        <span className="BA">BA</span> ) / <span className="M">M</span> *{" "}
        <span className="BM">BM</span> * <span className="T">T</span> )
      </div>
      <div className="coeff-list">
        <p>
          <span className="R">R</span> = Facteur de victoire/défaite{" "}
          <span className="ast">(*)</span>
        </p>
        <p>
          <span className="K">K</span> = Nombre d’éliminations
        </p>
        <p>
          <span className="A">A</span> = Nombre d’assistances
        </p>
        <p>
          <span className="M">M</span> = Nombre de morts
        </p>
        <p>
          <span className="BK">BK</span> = Bonus d'éliminations du rôle{" "}
          <span className="ast">(*)</span>
        </p>
        <p>
          <span className="BA">BA</span> = Bonus d'éliminations du rôle{" "}
          <span className="ast">(*)</span>
        </p>
        <p>
          <span className="BM">BM</span> = Bonus d'éliminations du rôle{" "}
          <span className="ast">(*)</span>
        </p>
        <p>
          <span className="T">T</span> = Facteur de temps{" "}
          <span className="ast">(*)</span>
        </p>
      </div>
      <p className="ast">(*) Valeur comprise entre 0 et 1</p>
    </Container>
  );
}

export default CalculMatchmaking;
