const express = require('express');
const app = express();

// CORS manual para Vercel
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
