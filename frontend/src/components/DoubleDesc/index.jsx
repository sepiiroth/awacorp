import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import colors from "../../utils/style/colors";

import NoviceIcon from "../../assets/ranks/novice_icon.png";
import GardienIcon from "../../assets/ranks/gardien_icon.png";
import ChevalierIcon from "../../assets/ranks/chevalier_icon.png";
import MaitreIcon from "../../assets/ranks/maitre_icon.png";
import EmpereurIcon from "../../assets/ranks/empereur_icon.png";
import TitanIcon from "../../assets/ranks/titan_icon.png";
import DemiDieuIcon from "../../assets/ranks/demidieu_icon.png";
import DivinIcon from "../../assets/ranks/divin_icon.png";

const DescDiv = styled.div``;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  color: ${colors.text};
  height: 100%;
  text-align: center;
  margin-top: 0 !important;
  padding-top: 15px;
  margin-bottom: 0 !important;
  display: flex;
  align-items: center;
  justify-content: space-around;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 15px;
    opacity: 0;
    animation: ${fadeIn} 1.2s forwards;
    animation-delay: 0.2s;
  }
  p {
    font-size: 1rem;
    color: ${colors.tertiary};
    opacity: 0;
    animation: ${fadeIn} 1.2s forwards;
    animation-delay: 0.3s;
  }

  div {
    width: 80%;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding-top: 40px;
    overflow: hidden;

    div {
      margin-bottom: 30px;
    }
  }
`;

const RankList = styled.div`
  list-style: none;
  display: grid;
  width: 100% !important;
  grid-template-columns: auto auto;
  justify-content: center; // Centrer les éléments horizontalement
  grid-gap: 10px;
  color: ${colors.tertiary};
  opacity: 0;
  animation: ${fadeIn} 1.2s forwards;
  animation-delay: 0.3s;
  .rank-icon,
  .rank-name {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0px 10px 0px 10px;
    font-weight: bold;
  }

  img {
    width: 35px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto auto auto; // Afficher 2 éléments (icône + nom) sur une seule ligne

    .rank-icon,
    .rank-name {
      margin: 5px; // Réduire la marge pour les petits écrans
    }
  }
`;

function DoubleDesc({ title, description, part, btn }) {
  return (
    <DescDiv>
      <Container className="container my-5">
        <div>
          <h1>Principe</h1>
          <p>
            Le matchmaking est un système qui évalue et associe les joueurs de
            manière équilibrée dans les jeux en ligne, en fonction de leurs
            compétences et de leur expérience, afin de garantir des parties
            compétitives et équilibrées.{" "}
          </p>
        </div>
        <div>
          <h1>Liste des rangs</h1>
          <RankList>
            <div className="rank-icon">
              <img src={NoviceIcon} alt="Novice Icon" />
            </div>
            <div className="rank-name">Novice</div>
            <div className="rank-icon">
              <img src={GardienIcon} alt="Novice Icon" />
            </div>
            <div className="rank-name">Gardien</div>
            <div className="rank-icon">
              <img src={ChevalierIcon} alt="Novice Icon" />
            </div>
            <div className="rank-name">Chevalier</div>
            <div className="rank-icon">
              <img src={MaitreIcon} alt="Novice Icon" />
            </div>
            <div className="rank-name">Maitre</div>
            <div className="rank-icon">
              <img src={EmpereurIcon} alt="Novice Icon" />
            </div>
            <div className="rank-name">Empereur</div>
            <div className="rank-icon">
              <img src={TitanIcon} alt="Novice Icon" />
            </div>
            <div className="rank-name">Titan</div>
            <div className="rank-icon">
              <img src={DemiDieuIcon} alt="Novice Icon" />
            </div>
            <div className="rank-name">Demi-Dieu</div>
            <div className="rank-icon">
              <img src={DivinIcon} alt="Novice Icon" />
            </div>
            <div className="rank-name">Divinité</div>
          </RankList>
        </div>
      </Container>
    </DescDiv>
  );
}

DoubleDesc.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  part: PropTypes.string.isRequired,
};

export default DoubleDesc;
