import React from 'react';
import { HardDrive, CheckCircle2, X, Shield } from 'lucide-react';
import type { LessonPlannerParameters, ThemeMode } from '../types';

interface ExportConfirmModalProps {
  isOpen: boolean;
  isExporting: boolean;
  exportStepMessage: string;
  parameters: LessonPlannerParameters;
  userEmail?: string | null;
  onConfirm: () => void;
  onClose: () => void;
  theme?: ThemeMode;
}

export const ExportConfirmModal: React.FC<ExportConfirmModalProps> = ({
  isOpen,
  isExporting,
  exportStepMessage,
  parameters,
  userEmail,
  onConfirm,
  onClose,
  theme = 'light',
}) => {
  if (!isOpen) return null;
  const isDark = theme === 'dark';

  const planTitle = `[Lesson Plan] ${parameters.topic} - ${parameters.gradeLevel}`;
  const wsTitle = `[Worksheet] ${parameters.topic} - ${parameters.gradeLevel}`;
  const quizTitle = `[Quiz] ${parameters.topic} - ${parameters.gradeLevel}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className={`rounded-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
        isDark
          ? 'gold-moulding-frame text-zinc-100 shadow-2xl'
          : 'bg-white border border-slate-200 text-slate-900 shadow-xl'
      }`}>
        {/* Modal Header */}
        <div className={`px-6 py-5 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-[#0d0f14]' : 'border-slate-100'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-slate-800 text-slate-200 border border-slate-700 shadow-sm' : 'bg-blue-50 text-blue-600'
            }`}>
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-bold text-base ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
                Confirm Google Workspace Export
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Deploy formatted curriculum package to Google Drive
              </p>
            </div>
          </div>
          {!isExporting && (
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ${
                isDark ? 'text-zinc-400 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div className={`border rounded-xl p-4 text-xs space-y-2 ${
            isDark ? 'bg-black/40 border-slate-800 text-slate-300 shadow-inner' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <div className={`flex items-center justify-between font-semibold pb-1 border-b ${
              isDark ? 'border-slate-800' : 'border-slate-200 text-slate-800'
            }`}>
              <span className="flex items-center gap-1.5">
                <Shield className={`w-3.5 h-3.5 ${isDark ? 'text-slate-300' : 'text-blue-600'}`} />
                <span>Target Google Account:</span>
              </span>
              <span className={`font-mono text-[11px] ${isDark ? 'text-slate-200 font-bold' : 'text-blue-700'}`}>
                {userEmail || 'Connected Teacher Account'}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span>Drive Location:</span>
              <span className={`font-semibold px-2 py-0.5 rounded border ${
                isDark ? 'bg-slate-800/60 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-900'
              }`}>
                📁 AI Lesson Planner /
              </span>
            </div>
          </div>

          <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            The following 3 synchronized items will be generated and placed into your designated Google Drive folder:
          </p>

          <div className="space-y-2 text-xs">
            <div className={`p-2.5 rounded-lg border flex items-center gap-2.5 ${
              isDark ? 'bg-black/30 border-white/15' : 'bg-blue-50/40 border-blue-200'
            }`}>
              <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] shrink-0 ${
                isDark ? 'gold-badge text-white' : 'bg-blue-600 text-white'
              }`}>
                DOC
              </div>
              <div className="truncate flex-1">
                <p className={`font-semibold truncate ${isDark ? 'text-zinc-200' : 'text-slate-900'}`}>{planTitle}</p>
                <p className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>Structured pedagogy agenda, materials, and learning standards</p>
              </div>
            </div>

            <div className={`p-2.5 rounded-lg border flex items-center gap-2.5 ${
              isDark ? 'bg-black/30 border-white/15' : 'bg-blue-50/40 border-blue-200'
            }`}>
              <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] shrink-0 ${
                isDark ? 'gold-badge text-white' : 'bg-blue-600 text-white'
              }`}>
                DOC
              </div>
              <div className="truncate flex-1">
                <p className={`font-semibold truncate ${isDark ? 'text-zinc-200' : 'text-slate-900'}`}>{wsTitle}</p>
                <p className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>Student printable header, vocabulary bank, practice exercises & answer key</p>
              </div>
            </div>

            <div className={`p-2.5 rounded-lg border flex items-center gap-2.5 ${
              isDark ? 'bg-black/30 border-white/15' : 'bg-purple-50/40 border-purple-200'
            }`}>
              <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] shrink-0 ${
                isDark ? 'gold-badge text-white' : 'bg-purple-600 text-white'
              }`}>
                FORM
              </div>
              <div className="truncate flex-1">
                <p className={`font-semibold truncate ${isDark ? 'text-zinc-200' : 'text-slate-900'}`}>{quizTitle}</p>
                <p className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>Self-grading Google Form Quiz (5 questions, 1 pt each, answer key + feedback)</p>
              </div>
            </div>
          </div>

          {isExporting && (
            <div className={`p-3.5 rounded-xl flex items-center gap-3 animate-pulse border ${
              isDark ? 'bg-slate-800/80 border-slate-700 shadow-[0_0_8px_rgba(203,213,225,0.2)]' : 'bg-blue-50 border-blue-200'
            }`}>
              <div className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin shrink-0 ${
                isDark ? 'border-slate-200' : 'border-blue-600'
              }`} />
              <p className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-blue-900'}`}>{exportStepMessage}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-4 border-t flex items-center justify-end gap-3 ${
          isDark ? 'bg-black/50 border-slate-800' : 'bg-slate-50 border-slate-100'
        }`}>
          <button
            type="button"
            disabled={isExporting}
            onClick={onClose}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all disabled:opacity-50 ${
              isDark ? 'gold-outline-btn' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isExporting}
            onClick={onConfirm}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-60 cursor-pointer ${
              isDark
                ? 'gold-metallic-btn'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
            }`}
          >
            {isExporting ? (
              <span>Deploying to Drive...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Export to Drive</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
