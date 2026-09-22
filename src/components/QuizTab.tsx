import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertCircle, Sparkles, Play, RotateCcw } from 'lucide-react';
import type { QuizPayload } from '../types';

interface QuizTabProps {
  quiz: QuizPayload;
  onChange: (updatedQuiz: QuizPayload) => void;
}

export const QuizTab: React.FC<QuizTabProps> = ({ quiz, onChange }) => {
  const [testMode, setTestMode] = useState(false);
  const [studentAnswers, setStudentAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  const handlePromptChange = (qIndex: number, val: string) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex] = { ...updatedQuestions[qIndex], prompt: val };
    onChange({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex: number, optIndex: number, val: string) => {
    const updatedQuestions = [...quiz.questions];
    const newOptions = [...updatedQuestions[qIndex].options];
    newOptions[optIndex] = val;
    updatedQuestions[qIndex] = { ...updatedQuestions[qIndex], options: newOptions };
    onChange({ ...quiz, questions: updatedQuestions });
  };

  const handleCorrectIndexChange = (qIndex: number, newCorrectIndex: number) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex] = { ...updatedQuestions[qIndex], correctIndex: newCorrectIndex };
    onChange({ ...quiz, questions: updatedQuestions });
  };

  const handleExplanationChange = (qIndex: number, val: string) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex] = { ...updatedQuestions[qIndex], explanation: val };
    onChange({ ...quiz, questions: updatedQuestions });
  };

  // Interactive student simulation handlers
  const handleStudentSelect = (qIndex: number, optIndex: number) => {
    if (testSubmitted) return;
    setStudentAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const calculateStudentScore = () => {
    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (studentAnswers[i] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const resetSimulation = () => {
    setStudentAnswers({});
    setTestSubmitted(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Verification Notice & Simulation Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div>
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Formative Quiz Editor (5 Questions • 1 Pt Each)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any radio button below to verify or change the correct answer before Google Forms generation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setTestMode(!testMode);
              resetSimulation();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              testMode
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {testMode ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-blue-600" />}
            <span>{testMode ? 'Exit Student Simulator' : 'Test Student Experience'}</span>
          </button>
        </div>
      </div>

      {/* Student Simulator Mode View */}
      {testMode && (
        <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-blue-200 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                Live Google Forms Preview
              </span>
              <h4 className="font-bold text-base text-slate-900 mt-1">{quiz.title}</h4>
            </div>
            {testSubmitted && (
              <div className="bg-white border border-blue-200 px-3 py-1.5 rounded-xl shadow-xs text-right">
                <span className="text-[10px] text-slate-500 font-medium block">Simulated Score</span>
                <span className="text-base font-extrabold text-blue-600">
                  {calculateStudentScore()} / {quiz.questions.length} pts
                </span>
              </div>
            )}
          </div>

          <div className="space-y-5">
            {quiz.questions.map((q, qIndex) => {
              const selectedOpt = studentAnswers[qIndex];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={qIndex} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm text-slate-900">
                      {qIndex + 1}. {q.prompt}
                    </p>
                    <span className="text-[11px] font-bold text-slate-400 shrink-0">1 pt</span>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedOpt === optIndex;
                      let optionStyle = 'border-slate-200 hover:bg-slate-50 text-slate-800';

                      if (testSubmitted) {
                        if (optIndex === q.correctIndex) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-blue-500 bg-blue-50 text-blue-900 font-medium';
                      }

                      return (
                        <button
                          key={optIndex}
                          type="button"
                          disabled={testSubmitted}
                          onClick={() => handleStudentSelect(qIndex, optIndex)}
                          className={`w-full text-left p-3 rounded-lg border text-xs flex items-center gap-3 transition-all ${optionStyle}`}
                        >
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300'
                          }`}>
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {testSubmitted && optIndex === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {testSubmitted && (
                    <div className={`p-3 rounded-lg text-xs ${isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'}`}>
                      <p className="font-bold mb-0.5">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                      <p className="text-slate-700">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            {!testSubmitted ? (
              <button
                type="button"
                onClick={() => setTestSubmitted(true)}
                disabled={Object.keys(studentAnswers).length < quiz.questions.length}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs shadow-sm transition-all"
              >
                Submit Form Simulation ({Object.keys(studentAnswers).length}/{quiz.questions.length} answered)
              </button>
            ) : (
              <button
                type="button"
                onClick={resetSimulation}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition-all"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      )}

      {/* Primary Teacher Editor View */}
      {!testMode && (
        <div className="space-y-6">
          {quiz.questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 hover:border-slate-300 transition-all"
            >
              {/* Question Header & Prompt Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    Question {qIndex + 1} • Self-Grading Multiple Choice
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                    <span>1 Point</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Question Prompt / Stem
                  </label>
                  <textarea
                    rows={2}
                    value={q.prompt}
                    onChange={(e) => handlePromptChange(qIndex, e.target.value)}
                    className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* 4 Choices with Radio Selection for the Correct Answer */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Answer Options (Click the radio button to designate the correct answer key)
                  </label>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Selected Key: Option {String.fromCharCode(65 + q.correctIndex)}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {q.options.map((opt, optIndex) => {
                    const isKey = q.correctIndex === optIndex;
                    return (
                      <div
                        key={optIndex}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                          isKey
                            ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-500/20'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Radio Button for Correct Index */}
                        <label className="flex items-center gap-2 cursor-pointer shrink-0 pl-1">
                          <input
                            type="radio"
                            name={`quiz-correct-${qIndex}`}
                            checked={isKey}
                            onChange={() => handleCorrectIndexChange(qIndex, optIndex)}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer accent-emerald-600"
                          />
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                              isKey ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                        </label>

                        {/* Option Text Input */}
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                          placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                          className={`w-full text-xs sm:text-sm bg-transparent border-b px-2 py-1 focus:outline-none ${
                            isKey
                              ? 'border-emerald-300 font-semibold text-emerald-950 focus:border-emerald-600'
                              : 'border-transparent hover:border-slate-200 focus:border-blue-500 text-slate-800'
                          }`}
                        />

                        {isKey && (
                          <span className="text-[11px] font-bold text-emerald-700 shrink-0 bg-emerald-100/70 px-2 py-0.5 rounded">
                            Correct Answer
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Formative Explanation / Grading Feedback */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Automated Student Feedback (Appears in Google Forms on Submission)</span>
                </div>
                <textarea
                  rows={2}
                  value={q.explanation}
                  onChange={(e) => handleExplanationChange(qIndex, e.target.value)}
                  placeholder="Explain why the answer is correct and clarify common misconceptions..."
                  className="w-full text-xs text-slate-700 bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
