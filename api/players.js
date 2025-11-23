let players = [
  { id: 1, name: "Laís", points: 10, courses: 1, pills: 1, challenges: 1 },
];

// Handler serverless — funciona no Vercel
export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(players);
  }

  if (req.method === "PUT") {
    const playerId = parseInt(req.query.id);
    const { points, courses, pills, challenges } = req.body;

    const playerIndex = players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) {
      return res.status(404).json({ error: "Jogador não encontrado" });
    }

    // Atualiza apenas campos enviados
    if (points !== undefined) players[playerIndex].points = points;
    if (courses !== undefined) players[playerIndex].courses = courses;
    if (pills !== undefined) players[playerIndex].pills = pills;
    if (challenges !== undefined) players[playerIndex].challenges = challenges;

    return res.status(200).json(players[playerIndex]);
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
