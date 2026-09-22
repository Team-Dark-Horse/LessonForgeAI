import React, { useState } from 'react';
import { FileText, Plus, Trash2, KeyRound, Eye, Printer } from 'lucide-react';
import type { WorksheetPayload } from '../types';

interface WorksheetTabProps {
  worksheet: WorksheetPayload;
  onChange: (updatedWs: WorksheetPayload) => void;
  onOpenDifferentiate?: () => void;
}

export const WorksheetTab: React.FC<WorksheetTabProps> = ({ worksheet, onChange, onOpenDifferentiate }) => {
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [isPrintPreview, setIsPrintPreview] = useState(false);

  // Vocabulary handlers
  const handleVocabChange = (index: number, field: 'term' | 'definition', val: string) => {
    const updated = [...worksheet.vocabulary];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ ...worksheet, vocabulary: updated });
  };

  const handleAddVocab = () => {
    onChange({
      ...worksheet,
      vocabulary: [...worksheet.vocabulary, { term: 'Key Term', definition: 'Definition of the term' }],
    });
  };

  const handleRemoveVocab = (index: number) => {
    const updated = worksheet.vocabulary.filter((_, i) => i !== index);
    onChange({ ...worksheet, vocabulary: updated });
  };

  // Exercise handlers
  const handleExerciseChange = (index: number, field: 'prompt' | 'answerLines' | 'sampleAnswer', val: any) => {
    const updated = [...worksheet.exercises];
    updated[index] = {
      ...updated[index],
      [field]: field === 'answerLines' ? Math.max(2, Math.min(5, Number(val) || 3)) : val,
    };
    onChange({ ...worksheet, exercises: updated });
  };

  const handleAddExercise = () => {
    const nextNum = worksheet.exercises.length + 1;
    onChange({
      ...worksheet,
      exercises: [
        ...worksheet.exercises,
        {
          questionNumber: nextNum,
          prompt: 'Apply the principle learned in class to explain this real-world scenario.',
          answerLines: 3,
          sampleAnswer: 'Students should cite evidence and connect cause to effect.',
        },
      ],
    });
  };

  const handleRemoveExercise = (index: number) => {
    const updated = worksheet.exercises
      .filter((_, i) => i !== index)
      .map((ex, idx) => ({ ...ex, questionNumber: idx + 1 }));
    onChange({ ...worksheet, exercises: updated });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Toolbar: View Toggles & Differentiate */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPrintPreview(!isPrintPreview)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isPrintPreview
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isPrintPreview ? 'Exit Print View' : 'Printable Paper Preview'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAnswerKey(!showAnswerKey)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              showAnswerKey
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-600" />
            <span>{showAnswerKey ? 'Hide Teacher Answers' : 'Show Teacher Answers'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {onOpenDifferentiate && (
            <button
              type="button"
              onClick={onOpenDifferentiate}
              className="text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              ⚡ Adapt Tier (IEP / ELL / Advanced)
            </button>
          )}

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Container */}
      <div
        className={`bg-white border border-slate-200 rounded-2xl shadow-xs transition-all ${
          isPrintPreview ? 'max-w-3xl mx-auto p-8 sm:p-12 font-serif text-slate-900 border-2' : 'p-6 space-y-6'
        }`}
      >
        {/* Student Header (PRD 6.2) */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <input
              type="text"
              value={worksheet.title}
              onChange={(e) => onChange({ ...worksheet, title: e.target.value })}
              className={`text-lg sm:text-xl font-extrabold text-slate-900 w-full bg-transparent border-b border-transparent hover:border-slate-200 focus:border-blue-500 focus:outline-none ${
                isPrintPreview ? 'border-none p-0' : 'p-1'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold pt-1">
            <div className="border-b border-slate-400 pb-1">
              <span className="text-slate-500 font-normal mr-1">Name:</span>
            </div>
            <div className="border-b border-slate-400 pb-1">
              <span className="text-slate-500 font-normal mr-1">Date:</span>
            </div>
            <div className="border-b border-slate-400 pb-1">
              <span className="text-slate-500 font-normal mr-1">Period:</span>
            </div>
            <div className="border-b border-slate-400 pb-1">
              <span className="text-slate-500 font-normal mr-1">Score:</span>
              <span className="text-slate-400 font-normal">____ / 10</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6 space-y-1">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Student Instructions
          </label>
          <textarea
            rows={2}
            value={worksheet.instructions}
            onChange={(e) => onChange({ ...worksheet, instructions: e.target.value })}
            className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all resize-none"
          />
        </div>

        {/* Key Vocabulary Bank */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 sm:p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Key Concept Vocabulary Bank</span>
            </h4>
            <button
              type="button"
              onClick={handleAddVocab}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:bg-blue-50 px-2 py-0.5 rounded transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>Add Term</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {worksheet.vocabulary.map((vocab, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg p-3 space-y-1.5 relative group">
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={vocab.term}
                    onChange={(e) => handleVocabChange(i, 'term', e.target.value)}
                    placeholder="Term"
                    className="font-bold text-xs text-blue-900 w-full focus:outline-none border-b border-transparent focus:border-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveVocab(i)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-0.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={vocab.definition}
                  onChange={(e) => handleVocabChange(i, 'definition', e.target.value)}
                  placeholder="Definition..."
                  className="w-full text-xs text-slate-600 bg-transparent focus:bg-slate-50 rounded p-1 border border-transparent focus:border-slate-200 focus:outline-none resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Practice Exercises */}
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="font-bold text-sm text-slate-900">
              Practice Questions ({worksheet.exercises.length})
            </h4>
            <button
              type="button"
              onClick={handleAddExercise}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Exercise</span>
            </button>
          </div>

          <div className="space-y-6">
            {worksheet.exercises.map((ex, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-3 group">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 flex-1">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {ex.questionNumber}
                    </span>
                    <textarea
                      rows={2}
                      value={ex.prompt}
                      onChange={(e) => handleExerciseChange(i, 'prompt', e.target.value)}
                      className="w-full font-semibold text-xs sm:text-sm text-slate-900 bg-transparent hover:bg-slate-50 focus:bg-white border border-transparent hover:border-slate-200 focus:border-blue-500 rounded-lg p-2 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                      <span>Lines:</span>
                      <select
                        value={ex.answerLines}
                        onChange={(e) => handleExerciseChange(i, 'answerLines', Number(e.target.value))}
                        className="bg-transparent font-semibold text-slate-700 focus:outline-none"
                      >
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(i)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Printable blank answer lines display */}
                <div className="space-y-3 pt-1">
                  {Array.from({ length: ex.answerLines || 3 }).map((_, lineIdx) => (
                    <div key={lineIdx} className="w-full border-b border-slate-300 h-4" />
                  ))}
                </div>

                {/* Teacher Answer Key reveal / edit */}
                {showAnswerKey && (
                  <div className="mt-3 p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                      <span>Teacher Reference / Scoring Guide:</span>
                    </div>
                    <textarea
                      rows={2}
                      value={ex.sampleAnswer || ''}
                      onChange={(e) => handleExerciseChange(i, 'sampleAnswer', e.target.value)}
                      placeholder="Expected student answer and grading criteria..."
                      className="w-full bg-white border border-amber-300 rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
