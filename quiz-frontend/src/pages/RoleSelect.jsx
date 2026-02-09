import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoleSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (selected) {
      navigate(`/login?role=${selected}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to QuizApp</h1>
          <p className="text-gray-500">Choose how you want to continue</p>
        </div>

        <div className="space-y-4 mb-8">
          {/* Admin Card */}
          <button
            onClick={() => setSelected('ADMIN')}
            className={`w-full p-5 rounded-xl border-2 text-left transition-all ${
              selected === 'ADMIN'
                ? 'border-indigo-600 bg-indigo-50 shadow-md'
                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                selected === 'ADMIN' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
              }`}>
                🛡️
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Admin</h3>
                <p className="text-sm text-gray-500">Create & manage quizzes</p>
              </div>
            </div>
          </button>

          {/* Student Card */}
          <button
            onClick={() => setSelected('STUDENT')}
            className={`w-full p-5 rounded-xl border-2 text-left transition-all ${
              selected === 'STUDENT'
                ? 'border-indigo-600 bg-indigo-50 shadow-md'
                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                selected === 'STUDENT' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
              }`}>
                🎓
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Student</h3>
                <p className="text-sm text-gray-500">Take quizzes & view scores</p>
              </div>
            </div>
          </button>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
            selected
              ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
