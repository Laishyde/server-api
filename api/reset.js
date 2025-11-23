import playersData from './players.js'; // opcional, se quiser compartilhar o array

export default function handler(req, res) {
  if (req.method === 'POST') {
    players = players.map(p => ({ ...p, points: 10, courses: 1, pills: 1, challenges: 1 }));
    res.status(200).json({ message: 'Jogo resetado com sucesso', players });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
