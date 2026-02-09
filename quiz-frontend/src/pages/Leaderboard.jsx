import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

export default function Leaderboard() {
  const { id } = useParams();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/quizzes/${id}/leaderboard`)
      .then((res) => setAttempts(res.data))
      .catch(() => alert('Failed to load leaderboard'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading…</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">🏆 Leaderboard</h1>

      {attempts.length === 0 ? (
        <p className="text-gray-500">No attempts yet for this quiz.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Player</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a, i) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{i + 1}</td>
                <td className="px-4 py-2">{a.playerName}</td>
                <td className="px-4 py-2">
                  {a.score} / {a.totalQuestions}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {new Date(a.submittedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/" className="inline-block mt-6 text-indigo-600 underline">← Back to Home</Link>
    </div>
  );
}
