import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const emptyQuestion = () => ({
  questionText: '',
  options: ['', '', '', ''],
  correctOptionIndex: 0,
});

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(5);
  const [questions, setQuestions] = useState([emptyQuestion()]);
  const [error, setError] = useState('');

  const updateQuestion = (qi, field, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qi] = { ...copy[qi], [field]: value };
      return copy;
    });
  };

  const updateOption = (qi, oi, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      const opts = [...copy[qi].options];
      opts[oi] = value;
      copy[qi] = { ...copy[qi], options: opts };
      return copy;
    });
  };

  const addQuestion = () => setQuestions((prev) => [...prev, emptyQuestion()]);

  const removeQuestion = (qi) => {
    if (questions.length === 1) return;
    setQuestions((prev) => prev.filter((_, i) => i !== qi));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate questions
    for (const [index, question] of questions.entries()) {
      if (!question.questionText.trim()) {
        setError(`Question ${index + 1}: Please enter question text`);
        return;
      }
      
      // Check if all options are filled
      const emptyOptions = question.options.filter(opt => !opt.trim()).length;
      if (emptyOptions > 0) {
        setError(`Question ${index + 1}: Please fill in all 4 options`);
        return;
      }
    }
    
    try {
      console.log('Submitting quiz:', { title, description, timeLimitMinutes, questions });
      await API.post('/quizzes', { title, description, timeLimitMinutes, questions });
      navigate('/');
    } catch (err) {
      console.error('Submit error:', err);
      const errData = err.response?.data;
      if (errData?.errors && typeof errData.errors === 'object') {
        setError(Object.values(errData.errors).join(', '));
      } else {
        setError(errData?.message || err.message || 'Failed to create quiz');
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create a New Quiz</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Time Limit */}
        <div>
          <label className="block font-medium mb-1">Time Limit (minutes)</label>
          <input
            type="number"
            min={1}
            className="w-32 border rounded px-3 py-2"
            value={timeLimitMinutes}
            onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
            required
          />
        </div>

        {/* Questions */}
        <h2 className="text-xl font-semibold">Questions</h2>

        {questions.map((q, qi) => (
          <div key={qi} className="border rounded-lg p-4 bg-white shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Question {qi + 1}</span>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qi)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter question text"
              value={q.questionText}
              onChange={(e) => updateQuestion(qi, 'questionText', e.target.value)}
              required
            />

            {q.options.map((opt, oi) => (
              <div key={oi} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`correct-${qi}`}
                  checked={q.correctOptionIndex === oi}
                  onChange={() => updateQuestion(qi, 'correctOptionIndex', oi)}
                />
                <input
                  className={`flex-1 border rounded px-3 py-1 ${!opt.trim() ? 'border-red-300 bg-red-50' : ''}`}
                  placeholder={`Option ${oi + 1} (required)`}
                  value={opt}
                  onChange={(e) => updateOption(qi, oi, e.target.value)}
                />
              </div>
            ))}
            <p className="text-xs text-gray-600 font-medium">⚠️ Fill all 4 options and select the correct answer with the radio button.</p>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="border border-dashed border-gray-400 text-gray-600 w-full py-2 rounded hover:bg-gray-100"
        >
          + Add Question
        </button>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 font-medium"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
}
