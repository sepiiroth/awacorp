import styled, { keyframes } from "styled-components";
import colors from "../../utils/style/colors";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../../components/Title";
import ActioProfile from "../../assets/profile/actio_profile.png";
import BigEdProfile from "../../assets/profile/biged_profile.png";
import BretoProfile from "../../assets/profile/breto_profile.png";
import ConsProfile from "../../assets/profile/cons_profile.png";
import LigeeProfile from "../../assets/profile/ligee_profile.png";
import SunProfile from "../../assets/profile/sun_profile.png";
import TamiProfile from "../../assets/profile/tami_profile.png";

import NoviceIcon from "../../assets/ranks/novice_icon.png";
import GardienIcon from "../../assets/ranks/gardien_icon.png";
import ChevalierIcon from "../../assets/ranks/chevalier_icon.png";
import MaitreIcon from "../../assets/ranks/maitre_icon.png";
import EmpereurIcon from "../../assets/ranks/empereur_icon.png";
import TitanIcon from "../../assets/ranks/titan_icon.png";
import DemiDieuIcon from "../../assets/ranks/demidieu_icon.png";
import DivinIcon from "../../assets/ranks/divin_icon.png";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  color: white;
  text-align: center;
  min-height: 1080px;
  background: linear-gradient(
    to right,
    ${colors.black},
    ${colors.dark},
    ${colors.dark},
    ${colors.dark},
    ${colors.dark},
    ${colors.dark},
    ${colors.black}
  );

  opacity: 0;
  animation: ${fadeIn} 1s forwards;
  animation-delay: 0.3s;

  table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    opacity: 0;
    animation: ${fadeIn} 1s forwards;
    animation-delay: 0.7s;
  }
  table tr {
    border: 1px solid #ddd;
    padding: 5px;
  }
  table th,
  table td {
    padding: 10px;
    text-align: center;
  }
  table th {
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .victory {
    color: green;
  }

  .defeat {
    color: red;
  }

  .indication {
    color: ${colors.tertiary};
  }

  @media screen and (max-width: 600px) {
    table {
      border: 0;
    }
    table thead {
      display: none;
    }
    table tr {
      border-bottom: 2px solid #ddd;
      display: block;
      margin-bottom: 10px;
    }
    table td {
      border-bottom: 1px dotted #ccc;
      display: block;
      font-size: 13px;
      text-align: right;
    }
    table td:last-child {
      border-bottom: 0;
    }
    table td:before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;

const CharacterContainer = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: ${fadeIn} 1s forwards;
  animation-delay: 0.6s;

  div {
    display: grid;
    text-align: center;
  }

  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
    margin-bottom: 180px;
  }
`;

const CharacterImage = styled.img`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  margin: 0px 1rem 5px 1rem;
  border: solid 2px;
  border-color: ${(props) => (props.isSelected ? "gold" : "grey")};
  opacity: ${(props) => (props.isPlayable ? "1" : "0.2")};
  pointer-events: ${(props) => (props.isPlayable ? "auto" : "none")};
  cursor: ${(props) => (props.isPlayable ? "pointer" : "none")};
`;

function GetCharacterImage(chara) {
  switch (chara) {
    case "Actio":
      return ActioProfile;
    case "BigEd":
      return BigEdProfile;
    case "Breto":
      return BretoProfile;
    case "Cons":
      return ConsProfile;
    case "Ligée":
      return LigeeProfile;
    case "Sun":
      return SunProfile;
    case "Tami":
      return TamiProfile;
    default:
      return ActioProfile;
  }
}

function GetRankImage(rank) {
  switch (rank) {
    case rank > 0 && rank < 100:
      return NoviceIcon;
    case rank >= 100 && rank < 200:
      return GardienIcon;
    case rank >= 200 && rank < 300:
      return ChevalierIcon;
    case rank >= 300 && rank < 400:
      return MaitreIcon;
    case rank >= 400 && rank < 500:
      return EmpereurIcon;
    case rank >= 500 && rank < 600:
      return TitanIcon;
    case rank >= 600 && rank < 700:
      return DemiDieuIcon;
    case rank >= 700 && rank <= 800:
      return DivinIcon;
    default:
      return NoviceIcon;
  }
}

const StatsContainer = styled.div`
  height: 45vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  opacity: 0;
  animation: ${fadeIn} 1s forwards;
  animation-delay: 0.4s;

  div.best-champ {
    display: grid;

    div {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 10px;
    }

    img {
      width: 62px;
      height: 62px;
      border-radius: 50%;
      border: solid 1px white;
    }
  }

  div.info-stat {
    display: grid;
    justify-content: center;
    align-items: center;

    img {
      width: 62px;
      height: 62px;
    }
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    height: auto;
    padding-top: 30px;

    div.info-stat,
    div.best-champ {
      margin-bottom: 20px;
    }
  }
`;

const ScrollableTBody = styled.tbody`
  display: block;
  max-height: 500px;
  overflow-y: auto;
`;

const FixedThead = styled.thead`
  display: table;
  width: 100%; // Assurez-vous que thead prend toute la largeur
`;

const TableRow = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
`;

function Account() {
  useEffect(() => {
    document.title = "Profil - For the Universe";
  }, []);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const elo = localStorage.getItem("elo_score");
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const totalWins = data.reduce(
    (acc, curr) => (curr.vd === 1 ? acc + 1 : acc),
    0
  );
  const totalDefeats = data.length - totalWins;

  function handleCharacterClick(characterId) {
    if (selectedCharacter === characterId) {
      setSelectedCharacter(null); // Désélectionnez le personnage
    } else {
      setSelectedCharacter(characterId); // Sélectionnez le nouveau personnage
    }
  }

  function hasPlayedCharacter(characterId) {
    return data.some((game) => game.idCharacter === characterId);
  }

  const getTop3Characters = (games) => {
    const characterCounts = {};
    games.slice(-25).forEach((game) => {
      if (!characterCounts[game.idCharacter]) {
        characterCounts[game.idCharacter] = 0;
      }
      characterCounts[game.idCharacter]++;
    });

    const sortedCharacters = Object.entries(characterCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    return sortedCharacters.map(([id, count]) => {
      const character = characters.find((char) => char.id === parseInt(id));
      return {
        character: character ? character.name : "Unknown",
        count: count,
        percentage: (count / 25) * 100,
      };
    });
  };

  const getCharacterAverageKDA = (games, characterId) => {
    const relevantGames = games.filter(
      (game) => game.idCharacter === characterId
    );
    const totalKills = relevantGames.reduce((acc, game) => acc + game.kills, 0);
    const totalDeaths = relevantGames.reduce(
      (acc, game) => acc + game.death,
      0
    );
    const totalAssists = relevantGames.reduce(
      (acc, game) => acc + game.assists,
      0
    );

    const averageKills = (totalKills / relevantGames.length).toFixed();
    const averageDeaths = (totalDeaths / relevantGames.length).toFixed();
    const averageAssists = (totalAssists / relevantGames.length).toFixed();

    return [averageKills, averageDeaths, averageAssists].join(" / ");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/gamedata/${userId}`
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/characters`
        );
        setCharacters(response.data);
      } catch (err) {
        console.error("Error fetching characters:", err);
      }
    }

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Title title="Profil" />

      <Container>
        <StatsContainer>
          <div className="info-stat">
            <h4>Rang actuel</h4>
            <div>
              <img src={GetRankImage(elo)} alt="im-elo" />
            </div>
            <div>
              <span className="victory">{totalWins} V</span> |{" "}
              <span className="defeat">{totalDefeats} D</span>
            </div>
          </div>
          <div className="best-champ">
            <h4>Champions récemment joués</h4>
            {getTop3Characters(data).map((charStat, index) => (
              <div key={index}>
                <img
                  src={GetCharacterImage(charStat.character)}
                  alt="im-character"
                />
                <span>{charStat.character}</span>
                <span>{charStat.percentage.toFixed(0)}%</span>
              </div>
            ))}
            <div className="indication">% de parties jouées</div>
          </div>
        </StatsContainer>
        <h2>Historique des parties</h2>
        <CharacterContainer>
          {characters.map((character) => (
            <div>
              <CharacterImage
                key={character.id}
                style={{
                  borderColor:
                    selectedCharacter === character.id ? "gold" : "grey",
                }}
                onClick={() => handleCharacterClick(character.id)}
                src={GetCharacterImage(character.name)}
                alt="im-character"
                isPlayable={hasPlayedCharacter(character.id)}
              />
              {character.name}
            </div>
          ))}
        </CharacterContainer>

        {getCharacterAverageKDA(data, selectedCharacter) !==
          "NaN / NaN / NaN" && (
          <div>
            KDA moyen : {getCharacterAverageKDA(data, selectedCharacter)}
          </div>
        )}

        <div className="container py-2">
          <table>
            <FixedThead>
              <TableRow>
                <th>Character</th>
                <th>Victoire/Defaite</th>
                <th>Stats (K/D/A)</th>
                <th>Date</th>
              </TableRow>
            </FixedThead>
            <ScrollableTBody>
              {data
                .filter(
                  (row) =>
                    !selectedCharacter || row.idCharacter === selectedCharacter
                )
                .slice(-25)
                .map((row, index) => (
                  <TableRow key={index}>
                    <td>{row.name}</td>
                    <td>
                      {row.vd === 1 ? (
                        <span className="victory">Victoire</span>
                      ) : (
                        <span className="defeat">Défaite</span>
                      )}
                    </td>
                    <td>
                      {row.kills} / {row.death} / {row.assists}
                    </td>
                    <td>
                      {new Date(row.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </td>
                  </TableRow>
                ))}
            </ScrollableTBody>
          </table>
        </div>
      </Container>
    </div>
  );
}

export default Account;
