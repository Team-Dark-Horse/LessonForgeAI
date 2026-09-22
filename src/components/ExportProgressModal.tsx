import React from 'react';
import { HardDrive, CheckCircle2, Loader2, X } from 'lucide-react';
import type { ThemeMode } from '../types';

interface ExportProgressModalProps {
  theme: ThemeMode;
  progress: number; // 0 to 100
  currentStep: number; // 1, 2, 3
  onCancel?: () => void;
}

export const ExportProgressModal: React.FC<ExportProgressModalProps> = ({
  theme,
  progress,
  currentStep,
  onCancel,
}) => {
  const isDark = theme === 'dark';

  const steps = [
    {
      num: 1,
      title: 'Create Lesson Plan Google Doc',
      desc: 'Heading 1, pedagogical tables, Bloom’s objectives',
    },
    {
      num: 2,
      title: 'Create Student Worksheet Google Doc',
      desc: 'Vocabulary bank, 5 real-world exercises, answer lines',
    },
    {
      num: 3,
      title: 'Generate & Configure Google Form Quiz',
      desc: '5 choice items, point values, auto-grading key, answers',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div
        className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl transition-all ${
          isDark
            ? 'gold-bevel-card text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between pb-4 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md ${
              isDark
                ? 'gold-badge font-bold'
                : 'bg-blue-600 text-white shadow-blue-500/20'
            }`}>
              <HardDrive className={`w-5 h-5 ${isDark ? 'text-slate-200' : 'text-white'}`} />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isDark ? 'gold-gradient-text' : ''}`}>Google Drive Export</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                Exporting 3 Assets... {Math.round(progress)}%
              </p>
            </div>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className={`p-1 rounded-lg transition-colors ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-5 space-y-2">
          <div className={`w-full h-2.5 rounded-full overflow-hidden ${
            isDark ? 'bg-slate-800' : 'bg-slate-100'
          }`}>
            <div
              className={`h-full rounded-full transition-all duration-300 ease-out ${
                isDark
                  ? 'bg-gradient-to-r from-slate-400 via-slate-200 to-slate-300 shadow-[0_0_8px_rgba(203,213,225,0.4)]'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600'
              }`}
              style={{ width: `${Math.max(5, progress)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px]">
            <span className={isDark ? 'text-slate-400' : 'text-slate-400'}>Synchronizing Workspace OAuth tokens...</span>
            <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-blue-500'}`}>
              {Math.round(progress)}% Completed
            </span>
          </div>
        </div>

        {/* Steps Checklist */}
        <div className="mt-6 space-y-3.5">
          {steps.map((s) => {
            const isDone = currentStep > s.num || progress >= 100;
            const isCurrent = currentStep === s.num && progress < 100;

            return (
              <div
                key={s.num}
                className={`p-3 rounded-xl border flex items-start justify-between gap-3 transition-all ${
                  isDone
                    ? isDark
                      ? 'bg-[#101218] border-slate-700/60 text-slate-200'
                      : 'bg-emerald-50/60 border-emerald-200/80'
                    : isCurrent
                    ? isDark
                      ? 'bg-[#14161f] border-slate-500 ring-1 ring-slate-400/30'
                      : 'bg-blue-50/70 border-blue-200'
                    : isDark
                    ? 'bg-[#0a0c10] border-slate-800/80 opacity-50 text-slate-500'
                    : 'bg-slate-50 border-slate-100 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-emerald-500'}`} />
                    ) : isCurrent ? (
                      <Loader2 className={`w-4 h-4 animate-spin ${isDark ? 'text-slate-200' : 'text-blue-500'}`} />
                    ) : (
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                        isDark ? 'border-slate-600 text-slate-400' : 'border-slate-400 text-slate-400'
                      }`}>
                        {s.num}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? 'text-slate-200' : ''}`}>{s.title}</h4>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{s.desc}</p>
                  </div>
                </div>

                <div className="text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
                  {isDone ? (
                    <span className={isDark ? 'text-slate-300 font-bold' : 'text-emerald-600'}>Success</span>
                  ) : isCurrent ? (
                    <span className={isDark ? 'text-slate-200' : 'text-blue-600'}>In Progress</span>
                  ) : (
                    <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>Pending</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Estimated time */}
        <div className={`mt-5 p-3 rounded-xl border flex items-center justify-between text-xs ${
          isDark ? 'bg-[#0d0f14] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          <span>Estimated time remaining:</span>
          <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            {progress >= 100 ? 'Finishing up...' : `${Math.max(2, Math.round((100 - progress) / 15))} seconds`}
          </span>
        </div>

        {/* Drive folder note & Cancel */}
        <div className={`mt-5 pt-3 border-t flex items-center justify-between text-[11px] ${
          isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-400'
        }`}>
          <p className="italic">*Files will be saved in a new 'AI Lesson Planner' Drive folder.*</p>
          {onCancel && (
            <button
              onClick={onCancel}
              className={`font-semibold transition-colors ${
                isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
