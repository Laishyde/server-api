const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let players = [
  { id: 1, name: "Laís", points: 10, courses: 1, pills: 1, challenges: 1 },
  { id: 2, name: "Fernanda", points: 10, courses: 1, pills: 1, challenges: 1 },
  { id: 3, name: "Felipe", points: 10, courses: 1, pills: 1, challenges: 1 },
  { id: 4, name: "Bruna", points: 10, courses: 1, pills: 1, challenges: 1 },
  { id: 5, name: "Samuel", points: 10, courses: 1, pills: 1, challenges: 1 },
  { id: 6, name: "Giovanna", points: 10, courses: 1, pills: 1, challenges: 1 },
  { id: 7, name: "Evelyn", points: 10, courses: 1, pills: 1, challenges: 1 }
];

// Rotas
app.get('/', (req, res) => res.send('API Cosmic Race está rodando!'));
app.get('/players', (req, res) => res.json(players));
app.put('/players/:id', (req, res) => {
  const playerId = parseInt(req.params.id);
  const { points, courses, pills, challenges } = req.body;
  const playerIndex = players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) return res.status(404).json({ error: 'Jogador não encontrado' });

  if (points !== undefined) players[playerIndex].points = points;
  if (courses !== undefined) players[playerIndex].courses = courses;
  if (pills !== undefined) players[playerIndex].pills = pills;
  if (challenges !== undefined) players[playerIndex].challenges = challenges;

  res.json(players[playerIndex]);
});
app.post('/reset', (_req, res) => {
  players = players.map(p => ({ ...p, points: 10, courses: 1, pills: 1, challenges: 1 }));
  res.json({ message: 'Jogo resetado com sucesso' });
});


module.exports = app;
