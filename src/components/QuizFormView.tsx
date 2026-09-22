import React, { useState } from 'react';
import {
  CheckSquare,
  Eye,
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
  Copy,
  ChevronDown,
  ChevronUp,
  HardDrive,
  GripVertical,
  ExternalLink,
} from 'lucide-react';
import type { QuizPayload, QuizQuestion, ThemeMode } from '../types';

interface QuizFormViewProps {
  theme: ThemeMode;
  quiz: QuizPayload;
  onChange: (updated: QuizPayload) => void;
  onExportDrive?: () => void;
}

export const QuizFormView: React.FC<QuizFormViewProps> = ({
  theme,
  quiz,
  onChange,
  onExportDrive,
}) => {
  const isDark = theme === 'dark';
  const [expandedId, setExpandedId] = useState<number>(0);
  const [studentPreview, setStudentPreview] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleQuestionPromptChange = (index: number, val: string) => {
    const updated = [...quiz.questions];
    updated[index] = { ...updated[index], prompt: val };
    onChange({ ...quiz, questions: updated });
  };

  const handleOptionChange = (qIndex: number, optIndex: number, val: string) => {
    const updated = [...quiz.questions];
    const newOptions = [...updated[qIndex].options];
    newOptions[optIndex] = val;
    updated[qIndex] = { ...updated[qIndex], options: newOptions };
    onChange({ ...quiz, questions: updated });
  };

  const handleSetCorrectIndex = (qIndex: number, optIndex: number) => {
    const updated = [...quiz.questions];
    updated[qIndex] = { ...updated[qIndex], correctIndex: optIndex };
    onChange({ ...quiz, questions: updated });
  };

  const handleExplanationChange = (qIndex: number, val: string) => {
    const updated = [...quiz.questions];
    updated[qIndex] = { ...updated[qIndex], explanation: val };
    onChange({ ...quiz, questions: updated });
  };

  const handleAddQuestion = () => {
    const newQ: QuizQuestion = {
      prompt: 'New Question: Predict what happens when force is applied to an object at rest...',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctIndex: 0,
      explanation: 'Explanation based on physical laws and observed empirical data.',
      standard: 'NCERT SCI-09-CH09',
      dokLevel: 'DOK Level 2',
      questionType: 'Multiple Choice',
    };
    onChange({ ...quiz, questions: [...quiz.questions, newQ] });
    setExpandedId(quiz.questions.length);
  };

  const handleDeleteQuestion = (qIndex: number) => {
    if (quiz.questions.length <= 1) return;
    const updated = quiz.questions.filter((_, idx) => idx !== qIndex);
    onChange({ ...quiz, questions: updated });
  };

  const handleDuplicateQuestion = (qIndex: number) => {
    const target = quiz.questions[qIndex];
    const dup: QuizQuestion = {
      ...target,
      prompt: `${target.prompt} (Copy)`,
    };
    const updated = [...quiz.questions];
    updated.splice(qIndex + 1, 0, dup);
    onChange({ ...quiz, questions: updated });
    setExpandedId(qIndex + 1);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Form Header */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isDark ? 'gold-bevel-card text-zinc-100' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className={`p-1.5 rounded-lg ${
                isDark ? 'gold-badge font-bold' : 'bg-purple-100 text-purple-700'
              }`}>
                <CheckSquare className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={quiz.title}
                onChange={(e) => onChange({ ...quiz, title: e.target.value })}
                className={`text-lg font-bold w-full bg-transparent focus:outline-none rounded ${
                  isDark ? 'gold-gradient-text focus:ring-1 focus:ring-white' : 'focus:ring-1 focus:ring-purple-500'
                }`}
              />
            </div>
            <p className={`text-xs mt-1 pl-8 ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>
              {quiz.description || 'Last saved to Google Drive 2 minutes ago • Westbrook Science Hub'}
            </p>
          </div>

          {/* Top Form Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStudentPreview(!studentPreview)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                studentPreview
                  ? isDark
                    ? 'gold-metallic-btn text-xs !py-1.5 !px-3 text-black'
                    : 'bg-purple-50 border-purple-300 text-purple-700'
                  : isDark
                  ? 'gold-outline-btn !py-1.5 !px-3 text-xs'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{studentPreview ? 'Teacher Form View' : 'Preview as Student'}</span>
            </button>

            <button
              onClick={onExportDrive}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isDark
                  ? 'gold-metallic-btn text-xs !py-1.5 !px-3.5 text-black'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5 text-black" />
              <span>Save & Sync to Drive</span>
            </button>
          </div>
        </div>

        {/* Sub-bar: Points, Auto-Grading Toggle, Shuffle */}
        <div className={`pt-3 flex flex-wrap items-center justify-between gap-4 text-xs font-medium ${
          isDark ? 'text-zinc-400' : 'text-slate-600'
        }`}>
          <div className="flex items-center gap-4">
            <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Total Points: {quiz.questions.length} Points
            </span>
            <span className={isDark ? 'text-zinc-600' : 'text-slate-300'}>•</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={quiz.autoGrading ?? true}
                onChange={(e) => onChange({ ...quiz, autoGrading: e.target.checked })}
                className={`w-3.5 h-3.5 rounded ${isDark ? 'accent-white' : 'accent-purple-600'}`}
              />
              <span className={isDark ? 'text-zinc-300 font-medium' : ''}>Self-Grading (Auto-Release Feedback)</span>
            </label>
          </div>

          <button
            onClick={() => onChange({ ...quiz, shuffleOptions: !quiz.shuffleOptions })}
            className={`text-xs hover:underline font-bold ${
              isDark ? 'text-slate-200' : 'text-purple-600'
            }`}
          >
            {quiz.shuffleOptions ? '✓ Shuffle Options Enabled' : 'Shuffle Options for Students'}
          </button>
        </div>
      </div>

      {/* Student Interactive Preview Mode */}
      {studentPreview ? (
        <div
          className={`p-8 rounded-2xl border ${
            isDark ? 'gold-bevel-card text-zinc-100' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className={`pb-4 border-b mb-6 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            <h3 className={`text-lg font-bold ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>{quiz.title}</h3>
            <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>Student Formative Exit Ticket • 1 point each</p>
          </div>

          <div className="space-y-6">
            {quiz.questions.map((q, qIdx) => (
              <div
                key={qIdx}
                className={`p-4 rounded-xl border space-y-3 ${
                  isDark ? 'border-white/15 bg-[#0a0a0d]' : 'border-slate-200 bg-white'
                }`}
              >
                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {qIdx + 1}. {q.prompt}
                </p>
                <div className="space-y-2 pl-2">
                  {q.options.map((opt, optIdx) => {
                    const isChecked = selectedAnswers[qIdx] === optIdx;
                    return (
                      <label
                        key={optIdx}
                        className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                          isChecked
                            ? isDark
                              ? 'bg-slate-800 border-slate-400 text-slate-100 ring-1 ring-slate-400/40 shadow-[0_0_8px_rgba(203,213,225,0.2)]'
                              : 'bg-purple-50 border-purple-400 text-purple-900'
                            : isDark
                            ? 'border-slate-800 hover:bg-slate-800/40 text-slate-300'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`preview-q-${qIdx}`}
                          checked={isChecked}
                          onChange={() =>
                            setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx })
                          }
                          className={`w-3.5 h-3.5 ${isDark ? 'accent-white' : 'text-purple-600'}`}
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>

                {submitted && (
                  <div
                    className={`mt-2 p-3 rounded-lg text-xs ${
                      selectedAnswers[qIdx] === q.correctIndex
                        ? isDark
                          ? 'gold-bevel-card text-white'
                          : 'bg-emerald-50 text-emerald-900'
                        : isDark
                        ? 'bg-rose-950/30 border border-rose-800 text-rose-300'
                        : 'bg-rose-50 text-rose-900'
                    }`}
                  >
                    <p className="font-bold">
                      {selectedAnswers[qIdx] === q.correctIndex ? '✓ Correct!' : '✗ Needs Review:'}
                    </p>
                    <p className="mt-0.5">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setSubmitted(true)}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all ${
                isDark
                  ? 'gold-metallic-btn text-xs !py-2.5 !px-6 text-black'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              Submit Quiz Answers
            </button>
          </div>
        </div>
      ) : (
        /* Teacher Form Builder */
        <div className="space-y-4">
          {quiz.questions.map((q, qIdx) => {
            const isExpanded = expandedId === qIdx;
            return (
              <div
                key={qIdx}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? isDark
                      ? 'gold-bevel-card border-slate-600 ring-1 ring-slate-400/30 shadow-[0_0_10px_rgba(203,213,225,0.15)]'
                      : 'bg-white border-purple-300 ring-2 ring-purple-500/20 shadow-md'
                    : isDark
                    ? 'bg-[#0a0c10] border border-slate-800 hover:border-slate-700 text-slate-300'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Question Header Card */}
                <div
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? -1 : qIdx)}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <GripVertical className="w-4 h-4 text-zinc-500 flex-shrink-0 cursor-grab" />
                    <span className={`text-xs font-bold flex-shrink-0 ${
                      isDark ? 'text-white' : 'text-purple-600'
                    }`}>
                      Q{qIdx + 1} Question {qIdx + 1} (1 pt)
                    </span>
                    {!isExpanded && (
                      <span className={`text-xs font-medium truncate ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
                        {q.prompt}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isDark ? 'bg-zinc-900 border border-zinc-800 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {q.standard || 'NCERT SCI-09-CH09'}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {q.dokLevel || 'DOK Level 2'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500" />
                    )}
                  </div>
                </div>

                {/* Expanded Question Form Editor */}
                {isExpanded && (
                  <div className={`p-6 pt-0 space-y-5 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                    {/* Prompt Textarea */}
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                        isDark ? 'text-zinc-400' : 'text-slate-400'
                      }`}>
                        Question Stem
                      </label>
                      <textarea
                        rows={2}
                        value={q.prompt}
                        onChange={(e) => handleQuestionPromptChange(qIdx, e.target.value)}
                        className={`w-full p-3 rounded-xl text-sm font-semibold border focus:outline-none resize-none ${
                          isDark
                            ? 'bg-[#101015] border-white/20 text-white focus:ring-1 focus:ring-white'
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-2 focus:ring-purple-500/50'
                        }`}
                      />
                    </div>

                    {/* Answer Choices & Scoring */}
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        isDark ? 'text-zinc-400' : 'text-slate-400'
                      }`}>
                        Answer Choices & Scoring Key (Select radio button for correct answer)
                      </label>
                      <div className="space-y-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isCorrect = q.correctIndex === optIdx;
                          const letter = String.fromCharCode(65 + optIdx);
                          return (
                            <div
                              key={optIdx}
                              className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                                isCorrect
                                  ? isDark
                                    ? 'bg-[#14161f] border-slate-500 text-slate-100 shadow-[0_0_8px_rgba(203,213,225,0.15)]'
                                    : 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                                  : isDark
                                  ? 'bg-[#0a0c10] border-slate-800 text-slate-300'
                                  : 'bg-white border-slate-200'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`correct-opt-${qIdx}`}
                                checked={isCorrect}
                                onChange={() => handleSetCorrectIndex(qIdx, optIdx)}
                                className={`w-4 h-4 cursor-pointer ${isDark ? 'accent-white text-white' : 'text-emerald-600'}`}
                              />
                              <span className={`text-xs font-bold w-4 ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>{letter}.</span>
                              <input
                                type="text"
                                value={opt}
                                onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                                className="w-full text-xs font-medium bg-transparent focus:outline-none"
                              />
                              {isCorrect && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0 flex items-center gap-1 ${
                                  isDark
                                    ? 'gold-badge font-bold'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  <CheckCircle2 className={`w-3 h-3 ${isDark ? 'text-white' : 'text-emerald-600'}`} />
                                  <span>Correct Answer (1 pt)</span>
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Answer Key & Pedagogical Feedback Panel */}
                    <div
                      className={`p-4 rounded-xl border space-y-3 ${
                        isDark
                          ? 'bg-[#0a0a0d] border-white/15'
                          : 'bg-purple-50/50 border-purple-100'
                      }`}
                    >
                      <div className={`flex items-center gap-2 text-xs font-bold ${
                        isDark ? 'text-white' : 'text-purple-700'
                      }`}>
                        <Sparkles className="w-4 h-4 text-white" />
                        <span>Answer Key & Pedagogical Feedback</span>
                      </div>

                      <div>
                        <label className={`block text-[11px] font-semibold mb-1 ${
                          isDark ? 'text-zinc-400' : 'text-slate-500'
                        }`}>
                          Explanation for Students (Shown Upon Grading):
                        </label>
                        <textarea
                          rows={2}
                          value={q.explanation}
                          onChange={(e) => handleExplanationChange(qIdx, e.target.value)}
                          className={`w-full text-xs p-2 rounded-lg border focus:outline-none resize-none ${
                            isDark
                              ? 'bg-[#121218] border-white/20 text-zinc-200 focus:border-white'
                              : 'border-slate-200 bg-white text-slate-800 focus:ring-1 focus:ring-purple-500'
                          }`}
                        />
                      </div>

                      {q.distractorRationale && (
                        <div className={`pt-2 border-t text-xs ${isDark ? 'border-white/10 text-zinc-300' : 'border-purple-100 text-slate-600'}`}>
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-purple-800'}`}>
                            Distractor Rationale (AI Insight):{' '}
                          </span>
                          <span>
                            {q.distractorRationale}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Question Actions footer */}
                    <div className={`flex items-center justify-between pt-2 border-t ${
                      isDark ? 'border-white/10' : 'border-slate-100'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>Standard:</span>
                        <input
                          type="text"
                          value={q.standard || 'NCERT SCI-09-CH09'}
                          onChange={(e) => {
                            const updated = [...quiz.questions];
                            updated[qIdx] = { ...updated[qIdx], standard: e.target.value };
                            onChange({ ...quiz, questions: updated });
                          }}
                          className={`text-xs font-bold bg-transparent focus:outline-none border-b border-transparent ${
                            isDark ? 'text-white focus:border-white' : 'text-blue-600 focus:border-blue-500'
                          }`}
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDuplicateQuestion(qIdx)}
                          title="Duplicate Question"
                          className={`p-1.5 rounded-lg transition-colors ${
                            isDark ? 'text-zinc-400 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(qIdx)}
                          title="Delete Question"
                          className={`p-1.5 rounded-lg transition-colors ${
                            isDark ? 'text-zinc-500 hover:text-rose-400 hover:bg-rose-950/20' : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add Question Button */}
          <div className="flex items-center justify-center pt-2">
            <button
              onClick={handleAddQuestion}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dashed text-xs font-bold transition-all ${
                isDark
                  ? 'border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800/40 shadow-xs'
                  : 'border-slate-300 text-slate-600 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50/50'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Question</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {/* Standard Coverage Donut */}
        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'gold-bevel-card text-zinc-200' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Standard Coverage
            </span>
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-emerald-500'}`}>100% Target Met</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-black text-xs ${
              isDark ? 'border-slate-300 border-t-slate-600 text-slate-200 shadow-[0_0_8px_rgba(203,213,225,0.3)]' : 'border-emerald-500 border-t-emerald-300 text-emerald-600'
            }`}>
              5/5
            </div>
            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>NCERT Aligned</p>
              <p className="text-[11px]">All 5 items directly evaluate NCERT Class 9 Chapter 9 motion and force benchmarks.</p>
            </div>
          </div>
        </div>

        {/* Cognitive Complexity */}
        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'gold-bevel-card text-zinc-200' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <span className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
            Cognitive Complexity (Webb's DOK)
          </span>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between font-semibold">
              <span>DOK 1: Recall (20%)</span>
              <span>1 Q</span>
            </div>
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <div className={`h-full w-[20%] ${isDark ? 'bg-slate-400' : 'bg-blue-500'}`} />
            </div>

            <div className="flex justify-between font-semibold">
              <span>DOK 2: Application (60%)</span>
              <span>3 Qs</span>
            </div>
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <div className={`h-full w-[60%] ${isDark ? 'bg-slate-200 shadow-[0_0_6px_rgba(203,213,225,0.4)]' : 'bg-purple-500'}`} />
            </div>

            <div className="flex justify-between font-semibold">
              <span>DOK 3: Strategic (20%)</span>
              <span>1 Q</span>
            </div>
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <div className={`h-full w-[20%] ${isDark ? 'bg-slate-400' : 'bg-amber-500'}`} />
            </div>
          </div>
        </div>

        {/* Live Drive Status */}
        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'gold-bevel-card text-zinc-200' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Live Drive Status
            </span>
            <span className={`flex items-center gap-1 text-[11px] font-bold ${
              isDark ? 'text-slate-300' : 'text-emerald-500'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${
                isDark ? 'bg-slate-300 shadow-[0_0_6px_rgba(203,213,225,0.4)]' : 'bg-emerald-500'
              }`} />
              Connected
            </span>
          </div>
          <p className={`text-xs font-medium ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
            Destination: /Westbrook/Science8/Unit3
          </p>
          <p className={`text-[11px] mt-1 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Drive Form ID: #F-882194-EDU</p>
          <a
            href="https://forms.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 text-xs font-semibold mt-2 ${
              isDark ? 'text-white hover:text-zinc-200' : 'text-purple-600 hover:text-purple-700'
            }`}
          >
            <span>Open in Forms</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
