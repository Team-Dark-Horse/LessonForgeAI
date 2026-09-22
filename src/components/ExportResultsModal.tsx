import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
  FileText,
  HelpCircle,
  X,
  Printer,
  Users,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { ExportResults, LessonPlannerParameters, ThemeMode } from '../types';

interface ExportResultsModalProps {
  results: ExportResults;
  parameters: LessonPlannerParameters;
  onClose: () => void;
  onCreateAnother?: () => void;
  theme?: ThemeMode;
}

export const ExportResultsModal: React.FC<ExportResultsModalProps> = ({
  results,
  parameters,
  onClose,
  onCreateAnother,
  theme = 'light',
}) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handleCopy = (url: string, key: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(key);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div
        className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 ${
          isDark
            ? 'gold-bevel-card text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className={`p-6 flex items-center justify-between ${
          isDark
            ? 'bg-gradient-to-r from-[#191b24] to-[#111319] border-b border-slate-700/60 text-slate-100'
            : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner ${
              isDark ? 'bg-slate-800/80 border border-slate-700 text-slate-200' : 'bg-white/20 text-white'
            }`}>
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className={`font-black text-lg leading-tight ${isDark ? 'text-white' : 'text-white'}`}>
                Lesson Pack Successfully Created in Google Drive!
              </h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400 font-medium' : 'text-emerald-100'}`}>
                Saved to: My Drive &gt; PlanCraft AI &gt; Science 8 &gt; {parameters.topic.slice(0, 24)}...
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Asset Cards */}
        <div className="p-6 space-y-3.5">
          {/* 1. Lesson Plan Doc */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
              isDark
                ? 'bg-[#101217] border-slate-700/50 hover:border-slate-500/60 text-slate-200'
                : 'bg-slate-50/80 border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isDark ? 'gold-badge font-bold' : 'bg-blue-500/10 text-blue-600'
              }`}>
                <FileText className={`w-5 h-5 ${isDark ? 'text-slate-200' : ''}`} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-bold truncate ${isDark ? 'text-white' : ''}`}>
                    [Lesson Plan] {parameters.topic} - {parameters.gradeLevel}
                  </span>
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                    isDark ? 'gold-badge font-bold' : 'bg-blue-100 text-blue-700'
                  }`}>
                    DOC
                  </span>
                </div>
                <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>Google Docs formatted agenda & objectives</p>
              </div>
            </div>
            <a
              href={results.lessonPlanDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors shadow-xs ${
                isDark
                  ? 'gold-metallic-btn !py-1.5 !px-3 text-xs'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <span>Open in Docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 2. Printable Worksheet */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
              isDark
                ? 'bg-[#101217] border-slate-700/50 hover:border-slate-500/60 text-slate-200'
                : 'bg-slate-50/80 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isDark ? 'gold-badge font-bold' : 'bg-emerald-500/10 text-emerald-600'
              }`}>
                <Printer className={`w-5 h-5 ${isDark ? 'text-slate-200' : ''}`} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-bold truncate ${isDark ? 'text-white' : ''}`}>
                    [Printable Worksheet] Student Activity Handout
                  </span>
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                    isDark ? 'gold-badge font-bold' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    READY TO PRINT
                  </span>
                </div>
                <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>Includes student problems & teacher answer key</p>
              </div>
            </div>
            <a
              href={results.worksheetDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors shadow-xs ${
                isDark
                  ? 'gold-metallic-btn !py-1.5 !px-3 text-xs'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <span>Open & Print</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 3. Quiz Form */}
          <div
            className={`p-3.5 rounded-xl border space-y-2.5 transition-all ${
              isDark
                ? 'bg-[#101217] border-slate-700/50 hover:border-slate-500/60 text-slate-200'
                : 'bg-slate-50/80 border-slate-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark ? 'gold-badge font-bold' : 'bg-purple-500/10 text-purple-600'
                }`}>
                  <HelpCircle className={`w-5 h-5 ${isDark ? 'text-slate-200' : ''}`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold truncate ${isDark ? 'text-white' : ''}`}>
                      [Quiz] Formative Exit Assessment
                    </span>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                      isDark ? 'gold-badge font-bold' : 'bg-purple-100 text-purple-800'
                    }`}>
                      AUTO-GRADING
                    </span>
                  </div>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>5 Multiple-choice items with points & feedback</p>
                </div>
              </div>
              <a
                href={results.quizFormEditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors shadow-xs ${
                  isDark
                    ? 'gold-metallic-btn !py-1.5 !px-3 text-xs'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                <span>Edit Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Student link copy */}
            <div
              className={`p-2 rounded-lg border flex items-center justify-between gap-2 text-xs ${
                isDark ? 'bg-[#0a0b0e] border-slate-700/60' : 'bg-white border-slate-200'
              }`}
            >
              <div className="truncate flex-1">
                <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-purple-600'}`}>Student Link: </span>
                <span className={`text-[11px] font-mono truncate ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                  {results.quizFormPublicUrl}
                </span>
              </div>
              <button
                onClick={() => handleCopy(results.quizFormPublicUrl, 'studentForm')}
                className={`px-2 py-1 rounded font-semibold text-[11px] flex items-center gap-1 transition-colors ${
                  isDark
                    ? 'gold-badge font-bold cursor-pointer'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                {copiedLink === 'studentForm' ? <Check className={`w-3 h-3 ${isDark ? 'text-white' : 'text-emerald-500'}`} /> : <Copy className="w-3 h-3" />}
                <span>{copiedLink === 'studentForm' ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Classroom Sync Complete Banner */}
          <div
            className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-xs ${
              isDark
                ? 'bg-[#101217] border-slate-700/60 text-slate-200'
                : 'bg-blue-50/80 border-blue-200 text-blue-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-blue-500'}`} />
              <span className="font-semibold">
                Classroom sync complete for Period 2 (8th Grade Science)
              </span>
            </div>
            <a
              href="https://classroom.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold hover:underline flex items-center gap-1 ${
                isDark ? 'text-slate-200 hover:text-white' : 'text-blue-600'
              }`}
            >
              <span>View in Classroom</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 px-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
          isDark ? 'border-slate-700/60 text-slate-400' : 'border-slate-200 text-slate-400'
        }`}>
          <span>All assets synced to Westbrook Middle School Workspace</span>
          <div className="flex items-center gap-2">
            {onCreateAnother && (
              <button
                onClick={onCreateAnother}
                className={`px-4 py-2 rounded-xl font-bold border transition-colors ${
                  isDark
                    ? 'gold-outline-btn text-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Create Another Lesson
              </button>
            )}
            <button
              onClick={onClose}
              className={`px-5 py-2 rounded-xl font-bold transition-colors ${
                isDark
                  ? 'gold-metallic-btn text-xs'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
