import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/quizzes')
      .then((res) => setQuizzes(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading quizzes…</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>

      {quizzes.length === 0 ? (
        <p className="text-gray-500">
          No quizzes yet.{' '}
          <Link to="/create" className="text-indigo-600 underline">Create one!</Link>
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {quizzes.map((q) => (
            <div key={q.id} className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold">{q.title}</h2>
              <p className="text-gray-500 text-sm mt-1">{q.description}</p>
              <p className="text-sm mt-2">
                📝 {q.questions.length} questions &nbsp;|&nbsp; ⏱ {q.timeLimitMinutes} min
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  to={`/quiz/${q.id}`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
                >
                  Take Quiz
                </Link>
                <Link
                  to={`/leaderboard/${q.id}`}
                  className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded text-sm hover:bg-indigo-50"
                >
                  Leaderboard
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
