import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef(null);

  // Fetch quiz
  useEffect(() => {
    API.get(`/quizzes/${id}`)
      .then((res) => {
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(-1));
        setSecondsLeft(res.data.timeLimitMinutes * 60);
      })
      .catch(() => alert('Quiz not found'));
  }, [id]);

  // Submit handler (memoised so timer can call it)
  const handleSubmit = useCallback(async () => {
    clearInterval(timerRef.current);
    try {
      const res = await API.post(`/quizzes/${id}/submit`, { playerName, answers });
      navigate('/result', { state: res.data });
    } catch {
      alert('Submission failed');
    }
  }, [id, playerName, answers, navigate]);

  // Timer
  useEffect(() => {
    if (!started) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          handleSubmit(); // auto-submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [started, handleSubmit]);

  if (!quiz) return <p className="text-center mt-10">Loading…</p>;

  // Pre-start screen — ask for name
  if (!started) {
    return (
      <div className="max-w-md mx-auto mt-10 space-y-4">
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        <p className="text-gray-500">{quiz.description}</p>
        <p className="text-sm">⏱ Time limit: {quiz.timeLimitMinutes} min &nbsp;|&nbsp; 📝 {quiz.questions.length} questions</p>
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button
          disabled={!playerName.trim()}
          onClick={() => setStarted(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-40 font-medium w-full"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  // Quiz in progress
  const question = quiz.questions[currentQ];
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header bar */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold text-lg">
          Question {currentQ + 1} / {quiz.questions.length}
        </span>
        <span className={`font-mono text-lg ${secondsLeft < 30 ? 'text-red-600 animate-pulse' : ''}`}>
          ⏱ {mins}:{secs}
        </span>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-medium">{question.questionText}</h2>

        <div className="space-y-2">
          {question.options.map((opt, oi) => (
            <label
              key={oi}
              className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition
                ${answers[currentQ] === oi ? 'border-indigo-600 bg-indigo-50' : 'hover:bg-gray-50'}`}
            >
              <input
                type="radio"
                name="option"
                checked={answers[currentQ] === oi}
                onChange={() =>
                  setAnswers((prev) => {
                    const copy = [...prev];
                    copy[currentQ] = oi;
                    return copy;
                  })
                }
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          disabled={currentQ === 0}
          onClick={() => setCurrentQ((p) => p - 1)}
          className="border px-4 py-2 rounded hover:bg-gray-100 disabled:opacity-30"
        >
          ← Previous
        </button>

        {currentQ < quiz.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQ((p) => p + 1)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-medium"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}
