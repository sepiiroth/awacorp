import styled, { keyframes } from "styled-components";
import colors from "../../utils/style/colors";
import Title from "../../components/Title";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  opacity: 0;
  animation: ${fadeIn} 1.2s forwards;

  div.player-list {
    padding: 50px;
    width: 30%;
    margin-right: 20px;
  }

  .panel-button {
    margin-top: 10px;
  }

  .choose {
    cursor: pointer;
  }

  .team-a,
  .team-b {
    border-radius: 10px;
    padding: 25px;
    margin: 10px;
  }

  .team-a {
    border: solid 1px ${colors.light_purple};

    .slot:first-child {
      background: ${colors.tertiary};
    }
  }

  .team-b {
    border: solid 1px ${colors.light_green};
  }

  .dominion {
    color: ${colors.light_purple};
  }

  .veritas {
    color: ${colors.light_green};
  }

  .slot {
    background: ${colors.primary};
    border-radius: 10px;
    margin: 10px;
  }

  .time {
    margin-top: 8px;

    .time-factor {
      border-radius: 10px;
      margin: 10px;
    }
  }

  .elo-score {
    h1 {
      font-size: 1.2rem;
    }

    h4 {
      font-size: 1.1rem;
      text-decoration: underline;
    }

    p {
      font-size: 0.9rem;
    }

    .victory {
      color: green;
    }

    .defeat {
      color: red;
    }
  }

  table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
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

  div.party-part {
    width: 65%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    div.player-list {
      width: 100%;
      padding: 20px;
      margin-right: 0;
    }

    div.party-part {
      width: 100%;
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

function Simulation() {
  useEffect(() => {
    document.title = "Simulation - For the Universe";
  }, []);
  const [players, setPlayers] = useState([]); // Liste des 50 joueurs
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Joueur locké
  const [eloScore, setEloScore] = useState(0); //Elo_score du joueur locké
  const [timeFactor, setTimeFactor] = useState(1); // Démarre avec une valeur par défaut de 1

  const [teamA, setTeamA] = useState([]); // Team A & B
  const [teamB, setTeamB] = useState([]);

  //Partie simulation des 10 dernières parties
  const [simulatedGames, setSimulatedGames] = useState([]);

  //* PARTIE RECHERCHE DE JOUEUR *//

  //Fait une requête pour récupérer 50 joueurs (au lancement de la page /simulation)
  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/players`
        );
        setPlayers(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des joueurs:", error);
      }
    }

    fetchPlayers();
  }, []);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setEloScore(player.elo_score);
    setTeamA([player]);
  };

  //Fonction qui envoie une requête pour avoir 49 nouveaux joueurs en conservant le joueur sélectionné.
  function refreshPlayersList() {
    let apiUrl = `${process.env.REACT_APP_API_URL}/api/players`;

    if (selectedPlayer) {
      apiUrl += `?exclude=${selectedPlayer.id}`;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        if (selectedPlayer) {
          setPlayers([selectedPlayer, ...response.data]);
        } else {
          setPlayers(response.data);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'actualisation des joueurs:", error);
      });
  }

  //Fonction qui recherche le match avec une équité proche de 50%
  const findMatch = () => {
    const allPlayers = [...players];
    const sortedPlayers = allPlayers.sort((a, b) => a.elo_score - b.elo_score);

    const selectedIndex = sortedPlayers.findIndex(
      (p) => p.id === selectedPlayer.id
    );

    let newTeamA = [sortedPlayers[selectedIndex]];
    let newTeamB = [];

    const firstPlayerForTeamB = findPlayerByEloDifference(
      sortedPlayers,
      newTeamA[0].elo_score,
      newTeamA,
      newTeamB
    );
    newTeamB.push(firstPlayerForTeamB);

    while (newTeamA.length < 4 || newTeamB.length < 4) {
      // Assumant que chaque équipe a 4 joueurs
      const averageElo = getAverageElo(newTeamA.concat(newTeamB));
      const closestToAveragePlayer = findPlayerClosestToElo(
        sortedPlayers,
        averageElo,
        newTeamA,
        newTeamB
      );

      if (newTeamA.length <= newTeamB.length) {
        newTeamA.push(closestToAveragePlayer);
      } else {
        newTeamB.push(closestToAveragePlayer);
      }
    }

    setTeamA(newTeamA);
    setTeamB(newTeamB);
  };

  const getAverageElo = (team) => {
    return (
      team.reduce((sum, player) => sum + player.elo_score, 0) / team.length
    );
  };

  const findPlayerByEloDifference = (sortedPlayers, elo, teamA, teamB) => {
    let diff = Infinity;
    let closestPlayer = null;

    for (const player of sortedPlayers) {
      const currentDiff = Math.abs(player.elo_score - elo);
      if (
        currentDiff < diff &&
        !teamA.includes(player) &&
        !teamB.includes(player)
      ) {
        diff = currentDiff;
        closestPlayer = player;
      }
    }

    return closestPlayer;
  };

  const findPlayerClosestToElo = (sortedPlayers, elo, teamA, teamB) => {
    return findPlayerByEloDifference(sortedPlayers, elo, teamA, teamB);
  };

  //calcul de l'elo total de chaque équipe
  const teamAElo =
    teamA.reduce((total, player) => total + player.elo_score, 0) / teamA.length;
  const teamBElo =
    teamB.reduce((total, player) => total + player.elo_score, 0) / teamB.length;

  //calcul du pourcentage de chance de gagner par équipe
  const EA = 1 / (1 + Math.pow(10, (teamBElo - teamAElo) / 400));
  const EB = 1 - EA;

  //* PARTIE SIMULATION *//

  // simule les stats de kill, assist et death par partie avec un random très bas
  const simulateStats = () => {
    const avgKills = selectedPlayer.averageKills || 0;
    const avgDeaths = selectedPlayer.averageDeaths || 0;
    const avgAssists = selectedPlayer.averageAssists || 0;

    const simulatedKills = Math.max(
      0,
      avgKills + Math.floor(Math.random() * 6) - 2
    );
    const simulatedDeaths = Math.max(
      0,
      avgDeaths + Math.floor(Math.random() * 6) - 2
    );
    const simulatedAssists = Math.max(
      0,
      avgAssists + Math.floor(Math.random() * 6) - 2
    );

    return { simulatedKills, simulatedDeaths, simulatedAssists };
  };

  // simule le résultat d'une partie
  const simulateResult = (
    simulatedKills,
    simulatedDeaths,
    simulatedAssists,
    type
  ) => {
    // Si c'est une victoire, augmentez les statistiques, sinon diminuez-les.
    if (type === "win") {
      simulatedKills = Math.max(0, simulatedKills + Math.random() * 6);
      simulatedDeaths = Math.max(0, simulatedDeaths - Math.random() * 7);
    } else {
      simulatedDeaths = Math.max(0, simulatedDeaths + Math.random() * 5);
      simulatedKills = Math.max(0, simulatedKills - Math.random() * 5);
    }

    const game = {
      kills: simulatedKills,
      deaths: simulatedDeaths,
      assists: simulatedAssists,
      result: type,
    };
    setSimulatedGames((prevGames) => [...prevGames, game]);
  };

  //Check quand le simulateur a simulé 10 parties
  useEffect(() => {
    if (simulatedGames.length === 10) {
      let totalScore = 0;

      simulatedGames.forEach((game) => {
        const { kills, assists, deaths, result } = game;
        var R = 1;
        if (result === "win") {
          R = 1.1;
        } else {
          R = 0.9;
        }
        //*EQUATION ICI*//
        const gameScore =
          R *
          ((kills * selectedPlayer.BK + assists * selectedPlayer.BA) /
            ((deaths || 1) * selectedPlayer.BD * timeFactor));

        totalScore += gameScore;
      });

      const newElo = totalScore / 10;
      setEloScore(newElo);
      setSimulatedGames([]); // Réinitialiser pour les prochaines simulations
    }
  }, [simulatedGames]);

  const handleVictoryClick = () => {
    const stats = simulateStats();
    simulateResult(
      stats.simulatedKills,
      stats.simulatedDeaths,
      stats.simulatedAssists,
      "win"
    );
  };

  const handleDefeatClick = () => {
    const stats = simulateStats();
    simulateResult(
      stats.simulatedKills,
      stats.simulatedDeaths,
      stats.simulatedAssists,
      "loose"
    );
  };

  return (
    <div>
      <Title title="Simulateur" />
      <Container>
        <div className="player-list">
          <h3>Liste des joueurs</h3>
          <table>
            <FixedThead>
              <TableRow>
                <th>Joueur</th>
                <th>Personnage</th>
                <th>Score actuel</th>
              </TableRow>
            </FixedThead>

            <ScrollableTBody>
              {players.map((player, index) => (
                <TableRow key={index}>
                  <td
                    className="choose"
                    onClick={() => handlePlayerClick(player)}
                  >
                    {player.username}
                  </td>
                  <td>{player.characterName}</td>
                  <td>{player.elo_score}</td>
                </TableRow>
              ))}
            </ScrollableTBody>
          </table>
          <div className="panel-button">
            <button
              className="button"
              onClick={findMatch}
              disabled={!selectedPlayer}
            >
              Trouver une partie
            </button>
            <button className="button" onClick={refreshPlayersList}>
              Rafraîchir
            </button>
          </div>
        </div>

        <div className="party-part">
          <h3>Création d'une partie</h3>
          <div className="party">
            <div className="team-a">
              <h3 className="dominion">Team A</h3>
              <div className="team-part">
                {teamA.map((player, index) => (
                  <div className="slot" key={index}>
                    {player.username} - {player.characterName} -{" "}
                    {player.elo_score}
                  </div>
                ))}
              </div>

              <h4>
                Victoire possible:{" "}
                {isNaN(EA) ? "..." : parseFloat(EA.toFixed(2)) * 100}%
              </h4>
              <h4>
                Elo de l'equipe:{" "}
                {isNaN(teamAElo) ? "..." : Math.round(teamAElo)}
              </h4>
            </div>

            <div className="team-b">
              <h3 className="veritas">Team B</h3>
              {teamB.map((player, index) => (
                <div className="slot" key={index}>
                  {player.username} - {player.characterName} -{" "}
                  {player.elo_score}
                </div>
              ))}
              <h4>
                Victoire possible:{" "}
                {isNaN(EB) ? "..." : parseFloat(EB.toFixed(2)) * 100}%
              </h4>
              <h4>
                Elo de l'equipe:{" "}
                {isNaN(teamBElo) ? "..." : Math.round(teamBElo)}
              </h4>
            </div>
          </div>
          <div className="panel">
            {/* Boutons d'action */}
            <button
              className="button"
              onClick={handleVictoryClick}
              disabled={!selectedPlayer}
            >
              Victoire
            </button>

            <button
              className="button"
              onClick={handleDefeatClick}
              disabled={!selectedPlayer}
            >
              Défaite
            </button>
            <div className="time">
              <label>Facteur Temps </label>
              <input
                className="time-factor"
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={timeFactor}
                onChange={(e) => setTimeFactor(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Section Score ELO */}

        <div className="elo-score">
          <h1>Score: {parseFloat(eloScore * 10).toFixed(3)}</h1>
          {simulatedGames.map((game, index) => (
            <div key={index}>
              <h4>Partie {index + 1}</h4>
              <p>
                Kills: {parseInt(game.kills)}, Assists: {parseInt(game.assists)}
                , Morts: {parseInt(game.deaths)}, Résultats:{" "}
                {game.result === "win" ? (
                  <span className="victory">Victoire</span>
                ) : (
                  <span className="defeat">Défaite</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Simulation;
