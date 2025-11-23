let players = [
  { id: 1, name: "Laís", points: 10, courses: 1, pills: 1, challenges: 1 },
  { id: 2, name: "Fernanda", points: 10, courses: 1, pills: 1, challenges: 1 },
  { id: 3, name: "Felipe", points: 10, courses: 1, pills: 1, challenges: 1 },
  { id: 4, name: "Bruna", points: 10, courses: 1, pills: 1, challenges: 1 },
  { id: 5, name: "Samuel", points: 10, courses: 1, pills: 1, challenges: 1 },
  { id: 6, name: "Giovanna", points: 10, courses: 1, pills: 1, challenges: 1 },
  { id: 7, name: "Evelyn", points: 10, courses: 1, pills: 1, challenges: 1 }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(players);
  } else if (req.method === 'PUT') {
    const playerId = parseInt(req.query.id);
    const { points, courses, pills, challenges } = req.body;
    const playerIndex = players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) return res.status(404).json({ error: 'Jogador não encontrado' });

    if (points !== undefined) players[playerIndex].points = points;
    if (courses !== undefined) players[playerIndex].courses = courses;
    if (pills !== undefined) players[playerIndex].pills = pills;
    if (challenges !== undefined) players[playerIndex].challenges = challenges;

    res.status(200).json(players[playerIndex]);
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
