const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = 10;

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://51.178.139.62",
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.listen(8081, () => {
  console.log("listening");
});

app.get("/", (re, res) => {
  return res.json("From Backend Side");
});

app.post("/api/register", (req, res) => {
  const { email, username, password } = req.body;
  const sql = "SELECT * FROM players WHERE username = ? OR email = ?";
  db.query(sql, [username, email], (err, data) => {
    if (err)
      return res.json({
        message: "Erreur lors de la vérification de l'utilisateur",
      });
    if (data.length > 0) {
      return res.json({ message: "L'utilisateur existe déjà" });
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err)
          return res.json({ message: "Erreur de hachage du mot de passe" });

        const sqlInsert =
          "INSERT INTO players (username, email, password) VALUES (?, ?, ?)";
        db.query(sqlInsert, [username, email, hash], (err, result) => {
          if (err)
            return res.json({ message: "Erreur lors de l'enregistrement" });
          return res.json({ message: "Utilisateur enregistré avec succès" });
        });
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const { emailOrUsername, password } = req.body;
  const sql = "SELECT * FROM players WHERE username = ? OR email = ?";
  db.query(sql, [emailOrUsername, emailOrUsername], (err, data) => {
    if (err) return res.json({ success: false, message: "Error" });
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (err, result) => {
        if (err)
          return res.json({
            success: false,
            message: "Erreur lors de la comparaison du mot de passe",
          });
        if (result) {
          return res.json({
            success: true,
            userId: data[0].id,
            username: data[0].username,
            elo_score: data[0].elo_score,
            message: "Connecté!",
          });
        } else {
          return res.json({ success: false, message: "Mauvais mot de passe" });
        }
      });
    } else {
      return res.json({ success: false, message: "Aucun enregistrement" });
    }
  });
});

app.get("/api/gamedata/:idUser", (req, res) => {
  const userId = req.params.idUser;
  const sql = `
  SELECT 
      history.kills,
      history.death,
      history.assists,
      history.date,
      history.idCharacter,
      history.vd,
      players.username,
      chara.name
  FROM 
      history
  JOIN players ON history.idUser = players.id
  JOIN chara ON history.idCharacter = chara.id
  WHERE history.idUser = ?
`;

  db.query(sql, [userId], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Error fetching data");
    }
    if (!data || data.length === 0)
      return res.status(404).json("No data found for this user");
    return res.json(data);
  });
});

app.get("/api/characters", (req, res) => {
  const sql = "SELECT id, name FROM chara";

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Error fetching characters" });
    }

    return res.json(data);
  });
});

app.get("/api/players", (req, res) => {
  const excludedId = req.query.exclude; // Récupère l'ID à exclure de la requête

  let sql = `
    SELECT
      p.id,
      p.username,
      p.elo_score,
      c.id AS characterId,
      c.name AS characterName,
      r.killBonus AS BK,
      r.assistsBonus AS BA,
      r.deathBonus AS BD,
      IFNULL(h.averageKills, 0) AS averageKills,
      IFNULL(h.averageAssists, 0) AS averageAssists,
      IFNULL(h.averageDeaths, 0) AS averageDeaths
    FROM 
      players p
    JOIN chara c ON p.last_character = c.id
    JOIN role r ON c.idRole = r.id
    LEFT JOIN (
        SELECT 
            idCharacter,
            AVG(kills) AS averageKills,
            AVG(assists) AS averageAssists,
            AVG(death) AS averageDeaths
        FROM history
        GROUP BY idCharacter 
    ) h ON c.id = h.idCharacter`;

  if (excludedId) {
    sql += ` WHERE p.id != ${db.escape(excludedId)}`;
  }

  sql += ` ORDER BY RAND() LIMIT 49`;

  db.query(sql, (err, data) => {
    if (err) return res.status(500).json("Error fetching players");
    return res.json(data);
  });
});
