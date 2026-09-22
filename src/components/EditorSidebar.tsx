import React, { useState } from 'react';
import {
  HardDrive,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  PanelRightClose,
  PanelRightOpen,
  Download,
} from 'lucide-react';
import type { CurriculumTriad, ThemeMode } from '../types';

interface EditorSidebarProps {
  theme: ThemeMode;
  triad: CurriculumTriad;
  userEmail: string | null;
  onDifferentiate: () => void;
  onAddKinesthetic: () => void;
  onExport?: () => void;
  onDownloadPDF?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  theme,
  triad,
  userEmail,
  onDifferentiate,
  onAddKinesthetic,
  onExport,
  onDownloadPDF,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const isDark = theme === 'dark';
  const [generateDocCopy, setGenerateDocCopy] = useState(true);
  const [createClassroomAssignment, setCreateClassroomAssignment] = useState(true);
  const [publishForm, setPublishForm] = useState(true);

  if (isCollapsed) {
    return (
      <aside
        id="editor-side-panel-collapsed"
        className={`w-14 flex-shrink-0 flex flex-col items-center py-4 px-1 rounded-2xl border transition-all duration-300 ${
          isDark
            ? 'gold-bevel-card text-zinc-300'
            : 'bg-white border-slate-200 text-slate-700 shadow-xs'
        }`}
      >
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            title="Expand Curriculum Panel"
            className={`p-2 rounded-xl transition-colors ${
              isDark
                ? 'gold-outline-btn !p-2'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            <PanelRightOpen className={`w-5 h-5 ${isDark ? 'text-slate-200' : 'text-blue-600'}`} />
          </button>
        )}

        <div className={`w-8 h-px my-2 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />

        {/* Quick status icons in collapsed bar */}
        <div className="flex flex-col items-center gap-3">
          <div
            title="Lesson Plan: 1,120 words"
            className={`p-2 rounded-lg ${
              isDark ? 'gold-badge font-bold' : 'bg-emerald-50 text-emerald-600'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-emerald-500'}`} />
          </div>
          <div
            title="Drive Connected"
            className={`p-2 rounded-lg ${
              isDark ? 'gold-badge font-bold' : 'bg-blue-50 text-blue-600'
            }`}
          >
            <HardDrive className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-blue-500'}`} />
          </div>
          <button
            onClick={onDifferentiate}
            title="Gemini Differentiate (IEP/ELL)"
            className={`p-2 rounded-lg transition-transform hover:scale-105 ${
              isDark ? 'gold-metallic-btn !p-2 text-slate-900' : 'bg-purple-50 text-purple-600'
            }`}
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside
      id="editor-side-panel"
      className={`w-80 flex-shrink-0 space-y-4 select-none transition-all duration-300 ${
        isDark ? 'text-zinc-200' : 'text-slate-700'
      }`}
    >
      {/* 1. Module Summary */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'gold-bevel-card' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className={`flex items-center justify-between pb-3 border-b mb-3 ${
          isDark ? 'border-white/15' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
              Module Summary
            </h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isDark
                ? 'gold-badge font-bold'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              3 Ready
            </span>
          </div>

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title="Collapse Curriculum Panel"
              className={`p-1 rounded-lg transition-colors ${
                isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/10'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
            >
              <PanelRightClose className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="space-y-3">
          {/* Module 1: Lesson Plan */}
          <div className="flex items-start justify-between gap-2 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? 'text-slate-300' : 'text-emerald-500'}`} />
              <div>
                <p className="font-bold">Lesson Plan Framework</p>
                <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>1,120 words • NCERT Matched</p>
              </div>
            </div>
            {onDownloadPDF && (
              <button
                type="button"
                onClick={onDownloadPDF}
                title="Download Lesson Plan as PDF file"
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border transition-all hover:scale-105 shrink-0 ${
                  isDark
                    ? 'gold-outline-btn !py-0.5 !px-2 text-[10px]'
                    : 'border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 bg-white shadow-2xs'
                }`}
              >
                <Download className="w-2.5 h-2.5" />
                <span>PDF</span>
              </button>
            )}
          </div>

          {/* Module 2: Worksheet */}
          <div className="flex items-start gap-2.5 text-xs">
            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? 'text-slate-300' : 'text-emerald-500'}`} />
            <div>
              <p className="font-bold">Printable Lab Worksheet</p>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                {triad.worksheet.exercises.length} inquiry exercises • 2-page handout
              </p>
            </div>
          </div>

          {/* Module 3: Form Quiz */}
          <div className="flex items-start gap-2.5 text-xs">
            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? 'text-slate-300' : 'text-purple-500'}`} />
            <div>
              <p className="font-bold">Google Form Quiz ({triad.quiz.questions.length} Qs)</p>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>Auto-grading answer key included</p>
            </div>
          </div>
        </div>

        {/* Reading Complexity Gauge */}
        <div className={`mt-4 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span>Reading Complexity</span>
            <span className={`text-[11px] ${isDark ? 'text-slate-200 font-bold' : 'text-blue-600'}`}>
              Grade 8.4 (Lexile 980L)
            </span>
          </div>

          {/* Gauge Bar */}
          <div className={`w-full h-2 rounded-full overflow-hidden flex ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
            <div className={`${isDark ? 'bg-slate-600' : 'bg-amber-600'} w-[25%]`} title="Grade 6-7" />
            <div className={`${isDark ? 'bg-slate-300 shadow-[0_0_8px_rgba(203,213,225,0.4)]' : 'bg-amber-400'} w-[50%]`} title="Target Grade 8" />
            <div className={`${isDark ? 'bg-slate-500' : 'bg-yellow-300'} w-[25%]`} title="Grade 9-10" />
          </div>
          <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-semibold">
            <span>Gr 6-7</span>
            <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-blue-600'}`}>▲ Target Gr 8</span>
            <span>Gr 9-10</span>
          </div>
        </div>
      </div>

      {/* 2. Google Workspace Configuration */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'gold-bevel-card' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className={`flex items-center justify-between pb-3 border-b mb-3 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <HardDrive className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-blue-500'}`} />
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
              Google Workspace
            </h3>
          </div>
          <span className={`w-2 h-2 rounded-full ${
            isDark ? 'bg-slate-300 shadow-[0_0_6px_rgba(203,213,225,0.4)]' : 'bg-emerald-500'
          }`} />
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>
              Target Destination Folder:
            </label>
            <div
              className={`p-2 rounded-xl border text-xs font-medium truncate ${
                isDark ? 'bg-[#0b0b0f] border-white/15 text-zinc-200' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              Westbrook 8th Grade Science / Unit 3
            </div>
            <p className={`text-[10px] mt-1 truncate ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>
              {userEmail || 's.jenkins@westbrook.edu'}
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={generateDocCopy}
                onChange={(e) => setGenerateDocCopy(e.target.checked)}
                className={`w-3.5 h-3.5 rounded ${isDark ? 'accent-white' : 'text-blue-600'}`}
              />
              <span className={isDark ? 'text-zinc-200' : ''}>Generate editable Google Doc copy</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={createClassroomAssignment}
                onChange={(e) => setCreateClassroomAssignment(e.target.checked)}
                className={`w-3.5 h-3.5 rounded ${isDark ? 'accent-white' : 'text-blue-600'}`}
              />
              <span className={isDark ? 'text-zinc-200' : ''}>Create Google Classroom Assignment</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={publishForm}
                onChange={(e) => setPublishForm(e.target.checked)}
                className={`w-3.5 h-3.5 rounded ${isDark ? 'accent-white' : 'text-purple-600'}`}
              />
              <span className={isDark ? 'text-zinc-200' : ''}>Publish 5-question Google Form</span>
            </label>
          </div>
        </div>
      </div>

      {/* 3. Gemini Suggested Enhancements */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark
            ? 'gold-bevel-card'
            : 'bg-gradient-to-b from-blue-50/60 to-indigo-50/40 border-blue-200 shadow-xs'
        }`}
      >
        <div className={`flex items-center gap-2 pb-2 mb-2 font-bold text-xs uppercase tracking-wider ${
          isDark ? 'text-slate-200' : 'text-blue-600'
        }`}>
          <Sparkles className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-amber-400'}`} />
          <span>Gemini Suggested Enhancements</span>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={onDifferentiate}
            className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all group ${
              isDark
                ? 'bg-[#0d0f14] border-slate-700/60 hover:border-slate-500 hover:bg-[#14161f] text-slate-200'
                : 'bg-white border-blue-100 hover:border-blue-300 text-slate-800 shadow-xs'
            }`}
          >
            <div className={`flex items-center justify-between font-bold mb-0.5 ${
              isDark ? 'text-slate-200' : 'text-blue-600'
            }`}>
              <span>Add IEP / ELL Scaffolding</span>
              <ChevronRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform ${isDark ? 'text-slate-300' : 'text-blue-600'}`} />
            </div>
            <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Generate bilingual vocabulary card prompts & sentence starters.
            </p>
          </button>

          <button
            onClick={onAddKinesthetic}
            className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all group ${
              isDark
                ? 'bg-[#0d0f14] border-slate-700/60 hover:border-slate-500 hover:bg-[#14161f] text-slate-200'
                : 'bg-white border-blue-100 hover:border-blue-300 text-slate-800 shadow-xs'
            }`}
          >
            <div className={`flex items-center justify-between font-bold mb-0.5 ${
              isDark ? 'text-slate-200' : 'text-indigo-600'
            }`}>
              <span>Kinesthetic Differentiation</span>
              <ChevronRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform ${isDark ? 'text-slate-300' : 'text-indigo-600'}`} />
            </div>
            <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Include skate board pushing pair simulation & force sensor setups.
            </p>
          </button>
        </div>
      </div>
    </aside>
  );
};
