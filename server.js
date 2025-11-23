// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados em memória
let players = [
  { id: 1, name: "Laís", points: 10, courses: 1, pills: 1, challenges: 1 },
];

// Rota raiz
app.get('/', (req, res) => {
  res.send('API Cosmic Race está rodando!');
});

// GET /players
app.get('/players', (req, res) => {
  res.json(players);
});

// PUT /players/:id
app.put('/players/:id', (req, res) => {
  const playerId = parseInt(req.params.id);
  const { points, courses, pills, challenges } = req.body;

  const playerIndex = players.findIndex((p) => p.id === playerId);
  if (playerIndex === -1) {
    return res.status(404).json({ error: 'Jogador não encontrado' });
  }

  if (points !== undefined) players[playerIndex].points = points;
  if (courses !== undefined) players[playerIndex].courses = courses;
  if (pills !== undefined) players[playerIndex].pills = pills;
  if (challenges !== undefined) players[playerIndex].challenges = challenges;

  res.json(players[playerIndex]);
});

// POST /reset
app.post('/reset', (req, res) => {
  players = [
    { id: 1, name: "Laís", points: 10, courses: 1, pills: 1, challenges: 1 }
  ];

  res.json({
    message: 'Jogo resetado com sucesso',
    players
  });
});

const port = process.env.PORT || 3000; // Vercel usa porta automática

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
