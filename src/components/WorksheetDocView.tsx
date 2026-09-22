import React, { useState } from 'react';
import {
  Printer,
  Sparkles,
  Eye,
  EyeOff,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import type { WorksheetPayload, ThemeMode } from '../types';

interface WorksheetDocViewProps {
  theme: ThemeMode;
  worksheet: WorksheetPayload;
  onChange: (updated: WorksheetPayload) => void;
  onDifferentiate: () => void;
  isDifferentiating?: boolean;
}

export const WorksheetDocView: React.FC<WorksheetDocViewProps> = ({
  theme,
  worksheet,
  onChange,
  onDifferentiate,
  isDifferentiating,
}) => {
  const isDark = theme === 'dark';
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExerciseChange = (index: number, field: 'prompt' | 'sampleAnswer', val: string) => {
    const updated = [...worksheet.exercises];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ ...worksheet, exercises: updated });
  };

  const handleVocabChange = (index: number, field: 'term' | 'definition', val: string) => {
    const updated = [...worksheet.vocabulary];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ ...worksheet, vocabulary: updated });
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className={`max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border shadow-xs ${
        isDark ? 'gold-bevel-card text-zinc-200' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold ${isDark ? 'text-zinc-200' : 'text-slate-700'}`}>
            Study Material Mode:
          </span>
          <button
            onClick={() => setShowAnswerKey(!showAnswerKey)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              showAnswerKey
                ? isDark
                  ? 'gold-metallic-btn text-xs !py-1.5 !px-3 text-black'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
                : isDark
                ? 'gold-outline-btn !py-1.5 !px-3 text-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            {showAnswerKey ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showAnswerKey ? 'Teacher Answer Key Active' : 'Student Study & Handout View'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onDifferentiate}
            disabled={isDifferentiating}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isDark
                ? 'gold-outline-btn !py-1.5 !px-3 text-xs'
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>{isDifferentiating ? 'Adapting...' : 'Differentiate (IEP/ELL/Gifted)'}</span>
          </button>

          <button
            onClick={handlePrint}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isDark
                ? 'gold-metallic-btn text-xs !py-1.5 !px-3.5 text-black'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Printer className="w-3.5 h-3.5 text-black" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Student Handout Sheet */}
      <div
        id="printable-worksheet"
        className={`rounded-2xl border shadow-xl transition-all mx-auto max-w-4xl p-8 sm:p-12 relative ${
          isDark
            ? 'gold-bevel-card text-zinc-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
        }`}
      >
        {/* Student Name/Period/Date Box */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b text-xs ${
          isDark ? 'border-white/10 text-zinc-400' : 'border-slate-200 text-slate-500'
        }`}>
          <div className={`border-b border-dotted pb-1 ${isDark ? 'border-white/20' : 'border-slate-400'}`}>
            <span className={`font-bold ${isDark ? 'text-white' : ''}`}>Student Name:</span>
          </div>
          <div className={`border-b border-dotted pb-1 ${isDark ? 'border-white/20' : 'border-slate-400'}`}>
            <span className={`font-bold ${isDark ? 'text-white' : ''}`}>Date:</span>
          </div>
          <div className={`border-b border-dotted pb-1 ${isDark ? 'border-white/20' : 'border-slate-400'}`}>
            <span className={`font-bold ${isDark ? 'text-white' : ''}`}>Period:</span>
          </div>
          <div className={`border-b border-dotted pb-1 ${isDark ? 'border-white/20' : 'border-slate-400'}`}>
            <span className={`font-bold ${isDark ? 'text-white' : ''}`}>Score:</span> / 20 pts
          </div>
        </div>

        {/* Title & Instructions */}
        <div className={`py-6 border-b ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
          <input
            type="text"
            value={worksheet.title}
            onChange={(e) => onChange({ ...worksheet, title: e.target.value })}
            className={`text-2xl font-black tracking-tight w-full bg-transparent focus:outline-none rounded ${
              isDark ? 'gold-gradient-text focus:ring-1 focus:ring-white' : 'focus:ring-1 focus:ring-blue-500'
            }`}
          />
          <p className={`text-xs font-bold mt-1 uppercase tracking-wider ${
            isDark ? 'text-slate-300' : 'text-blue-600'
          }`}>
            {worksheet.subtitle || 'Comprehensive Student Study Material & Worksheet'}
          </p>
          <div className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
            isDark
              ? 'bg-[#0a0c10] border-slate-800 text-slate-300'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>Directions: </span>
            {worksheet.instructions}
          </div>
        </div>

        {/* Study Guide: Core Concept Overview & Key Takeaways */}
        <div className={`py-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className={`w-4 h-4 ${isDark ? 'text-slate-200' : 'text-blue-600'}`} />
            <h3 className={`text-xs font-extrabold uppercase tracking-wider ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}>
              Study Guide: Topic Overview & Core Principles
            </h3>
          </div>

          <div className={`p-4 rounded-xl border mb-4 text-xs leading-relaxed ${
            isDark
              ? 'bg-[#0a0c10] border-slate-800 text-slate-200'
              : 'bg-blue-50/60 border-blue-200 text-slate-700'
          }`}>
            <textarea
              rows={3}
              value={worksheet.conceptSummary || ''}
              onChange={(e) => onChange({ ...worksheet, conceptSummary: e.target.value })}
              placeholder="Topic study summary and core explanation for students to review..."
              className="w-full bg-transparent focus:outline-none resize-none leading-relaxed font-medium"
            />
          </div>

          {worksheet.keyTakeaways && worksheet.keyTakeaways.length > 0 && (
            <div className="space-y-2 mt-3">
              <h4 className={`text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                High-Yield Study Takeaways:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {worksheet.keyTakeaways.map((takeaway, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                      isDark
                        ? 'bg-[#0a0c10] border-slate-800 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                      isDark ? 'text-slate-300' : 'text-blue-600'
                    }`} />
                    <span className="leading-snug">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section A: Vocabulary Focus */}
        <div className={`py-6 border-b ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
          <h3 className={`text-xs font-extrabold uppercase tracking-wider mb-3 ${
            isDark ? 'text-zinc-400' : 'text-slate-400'
          }`}>
            Section A: Essential Vocabulary Bank
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {worksheet.vocabulary.map((v, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border ${
                  isDark ? 'border-white/15 bg-[#0a0a0d]' : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <input
                  type="text"
                  value={v.term}
                  onChange={(e) => handleVocabChange(i, 'term', e.target.value)}
                  className={`font-bold text-xs bg-transparent w-full focus:outline-none ${
                    isDark ? 'text-white' : 'text-blue-600'
                  }`}
                />
                <textarea
                  rows={2}
                  value={v.definition}
                  onChange={(e) => handleVocabChange(i, 'definition', e.target.value)}
                  className={`text-xs mt-1 w-full bg-transparent focus:outline-none resize-none leading-relaxed ${
                    isDark ? 'text-zinc-300' : 'text-slate-600'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section B: Inquiry Problems */}
        <div className="py-6 space-y-6">
          <h3 className={`text-xs font-extrabold uppercase tracking-wider ${
            isDark ? 'text-zinc-400' : 'text-slate-400'
          }`}>
            Section B: Real-World Scenarios & Evidence Analysis
          </h3>

          {worksheet.exercises.map((ex, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${
                isDark ? 'border-white/15 bg-[#0a0a0d]' : 'border-slate-200 bg-slate-50/30'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 ${
                  isDark
                    ? 'gold-metallic-btn !w-5 !h-5 !p-0 text-black'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {ex.questionNumber || idx + 1}
                </span>
                <textarea
                  rows={2}
                  value={ex.prompt}
                  onChange={(e) => handleExerciseChange(idx, 'prompt', e.target.value)}
                  className={`w-full text-xs font-semibold leading-relaxed bg-transparent focus:outline-none resize-none ${
                    isDark ? 'text-zinc-200' : ''
                  }`}
                />
              </div>

              {/* Lined writing area for student responses */}
              <div className="mt-3 space-y-3.5 pl-7 pr-2">
                {Array.from({ length: ex.answerLines || 3 }).map((_, lineIdx) => (
                  <div
                    key={lineIdx}
                    className={`border-b border-dashed h-2.5 ${
                      isDark ? 'border-zinc-800' : 'border-slate-300'
                    }`}
                  />
                ))}
              </div>

              {/* Teacher Answer Key Box */}
              {showAnswerKey && ex.sampleAnswer && (
                <div className={`mt-3 ml-7 p-3 rounded-xl border text-xs ${
                  isDark
                    ? 'gold-bevel-card text-white'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}>
                  <span className={`font-bold ${isDark ? 'text-white' : ''}`}>Sample Exemplar / Teacher Key: </span>
                  <p className="mt-0.5 leading-relaxed">{ex.sampleAnswer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`pt-6 border-t flex justify-between text-[11px] ${
          isDark ? 'border-white/10 text-zinc-500' : 'border-slate-200 text-slate-400'
        }`}>
          <span>Westbrook Middle School Science Department</span>
          <span>Printed Classroom Material • Page 1 of 2</span>
        </div>
      </div>
    </div>
  );
};
