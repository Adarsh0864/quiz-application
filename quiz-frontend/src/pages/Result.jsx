import { useLocation, Link } from 'react-router-dom';

export default function Result() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="text-center mt-10">
        <p>No result data found.</p>
        <Link to="/" className="text-indigo-600 underline">Go Home</Link>
      </div>
    );
  }

  const percentage = Math.round((state.score / state.totalQuestions) * 100);

  return (
    <div className="max-w-md mx-auto mt-10 text-center space-y-4">
      <h1 className="text-3xl font-bold">Quiz Completed! 🎉</h1>
      <p className="text-gray-600">Quiz: <strong>{state.quizTitle}</strong></p>
      <p className="text-gray-600">Player: <strong>{state.playerName}</strong></p>

      <div className="text-6xl font-bold text-indigo-600">{percentage}%</div>
      <p className="text-lg">
        You got <strong>{state.score}</strong> out of <strong>{state.totalQuestions}</strong> correct.
      </p>

      <div className="flex justify-center gap-3 mt-6">
        <Link to="/" className="border px-4 py-2 rounded hover:bg-gray-100">Home</Link>
      </div>
    </div>
  );
}
