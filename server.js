const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Dados iniciais (copiados do seu initialPlayers)
let players = [
  { id: 1, name: "Laís", points: 10, courses: 1, pills: 1, challenges: 1 },

];

// Rota raiz para status
app.get('/', (req, res) => {
  res.send('API Cosmic Race está rodando!');
});

// GET /players - retorna lista de jogadores
app.get('/players', (req, res) => {
  res.json(players);
});

// PUT /players/:id - atualiza pontos do jogador
app.put('/players/:id', (req, res) => {
  const playerId = parseInt(req.params.id);
  const { points, courses, pills, challenges } = req.body;

  const playerIndex = players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) {
    return res.status(404).json({ error: 'Jogador não encontrado' });
  }

  // Atualiza apenas os campos enviados
  if (points !== undefined) players[playerIndex].points = points;
  if (courses !== undefined) players[playerIndex].courses = courses;
  if (pills !== undefined) players[playerIndex].pills = pills;
  if (challenges !== undefined) players[playerIndex].challenges = challenges;

  res.json(players[playerIndex]);
});

// POST /reset - reseta os pontos para valores iniciais
app.post('/reset', (req, res) => {
  players = [
    { id: 1, name: "Laís", points: 10, courses: 1, pills: 1, challenges: 1 },

  ];
  res.json({ message: 'Jogo resetado com sucesso' });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
