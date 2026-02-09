import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';
import RoleSelect from './pages/RoleSelect';
import Login from './pages/Login';
import Signup from './pages/Signup';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <Navigate to="/role" replace />;
  return children;
}

function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <Navigate to="/role" replace />;
  if (!isAdmin()) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const { user, logout, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // If not logged in, show auth pages
  if (!user) {
    return (
      <Routes>
        <Route path="/role" element={<RoleSelect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/role" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-wide">QuizApp</Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            {user.role === 'ADMIN' && (
              <Link to="/create" className="hover:underline">Create Quiz</Link>
            )}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-indigo-400">
              <span className="text-indigo-200 text-xs">
                {user.role === 'ADMIN' ? '🛡️' : '🎓'} {user.name}
              </span>
              <button
                onClick={logout}
                className="bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded text-xs"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/create" element={<AdminRoute><CreateQuiz /></AdminRoute>} />
          <Route path="/quiz/:id" element={<ProtectedRoute><TakeQuiz /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
          <Route path="/leaderboard/:id" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
