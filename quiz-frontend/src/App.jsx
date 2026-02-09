import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-wide">QuizApp</Link>
          <div className="flex gap-4 text-sm font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/create" className="hover:underline">Create Quiz</Link>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateQuiz />} />
          <Route path="/quiz/:id" element={<TakeQuiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/leaderboard/:id" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
