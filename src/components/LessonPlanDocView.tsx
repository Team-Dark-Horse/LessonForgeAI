import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Boxes,
  FileText,
  Download,
} from 'lucide-react';
import type { LessonPlanPayload, ThemeMode } from '../types';

interface LessonPlanDocViewProps {
  theme: ThemeMode;
  lessonPlan: LessonPlanPayload;
  onChange: (updated: LessonPlanPayload) => void;
  onGoToWorksheet: () => void;
  onDownloadPDF?: () => void;
}

export const LessonPlanDocView: React.FC<LessonPlanDocViewProps> = ({
  theme,
  lessonPlan,
  onChange,
  onGoToWorksheet,
  onDownloadPDF,
}) => {
  const isDark = theme === 'dark';

  // Fallback materials list if not fully specified
  const materialsList = lessonPlan.materialsList || [
    { name: 'Latex balloons & plastic guide straws', quantity: '12 sets', category: 'lab' },
    { name: 'Spools of monofilament line', quantity: '6 spools', category: 'lab' },
    { name: 'Dual-range Newton spring scales', quantity: '12 units', category: 'lab' },
    { name: 'Student dry-erase force vector boards', quantity: '24 boards', category: 'general' },
  ];

  const handleObjectiveChange = (index: number, val: string) => {
    const updated = [...lessonPlan.objectives];
    updated[index] = val;
    onChange({ ...lessonPlan, objectives: updated });
  };

  const handleAgendaChange = (
    index: number,
    field: 'segment' | 'instructions' | 'studentActivity' | 'minutes',
    val: any
  ) => {
    const updated = [...lessonPlan.agenda];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ ...lessonPlan, agenda: updated });
  };

  const getTimePillClass = (index: number) => {
    if (isDark) {
      return 'bg-slate-800 text-slate-200 border-slate-700 shadow-sm';
    }
    switch (index % 4) {
      case 0:
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 1:
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 2:
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Paper Google Doc Container */}
      <div
        className={`rounded-2xl border shadow-xl transition-all mx-auto max-w-4xl p-8 sm:p-12 relative ${
          isDark
            ? 'gold-bevel-card text-zinc-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
        }`}
      >
        {/* Header Confidential & Standard Tags */}
        <div className={`flex flex-wrap items-center justify-between gap-3 pb-6 border-b ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wide ${
              isDark
                ? 'gold-badge font-bold'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {lessonPlan.standardsOverview ? lessonPlan.standardsOverview.split(':')[0] : 'NCERT SCI-09-CH09'}
            </span>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded ${
              isDark ? 'bg-[#0a0a0d] text-zinc-300 border border-white/20' : 'bg-slate-100 text-slate-700'
            }`}>
              {lessonPlan.subject || 'Physical Science'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-bold tracking-widest uppercase ${
              isDark ? 'text-zinc-400' : 'text-slate-400'
            }`}>
              CONFIDENTIAL • WESTBROOK MIDDLE
            </span>
            {onDownloadPDF && (
              <button
                type="button"
                onClick={onDownloadPDF}
                title="Download this lesson plan as a PDF file"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all hover:scale-105 active:scale-95 ${
                  isDark
                    ? 'gold-outline-btn !py-1 !px-2.5 text-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 shadow-xs'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            )}
          </div>
        </div>

        {/* Document Title & Focus */}
        <div className="pt-6 pb-4">
          <input
            type="text"
            value={lessonPlan.title}
            onChange={(e) => onChange({ ...lessonPlan, title: e.target.value })}
            className={`text-2xl sm:text-3xl font-black tracking-tight w-full bg-transparent border-b border-transparent focus:outline-none transition-colors ${
              isDark ? 'gold-gradient-text focus:border-white' : 'text-slate-900 hover:border-slate-300 focus:border-blue-500'
            }`}
          />
          <p className={`text-sm font-medium mt-2 italic ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
            Focus:{' '}
            {lessonPlan.focus ||
              'Action & Reaction pairs, vector orientation, and Newton’s Third Law empirical investigations.'}
          </p>
        </div>

        {/* Section 1: Targeted Learning Objectives */}
        <div className={`py-6 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-700'
            }`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                isDark ? 'gold-metallic-btn !w-6 !h-6 !p-0 text-xs text-black' : 'bg-blue-100 text-blue-700'
              }`}>
                1
              </span>
              <span>Targeted Learning Objectives (Bloom's Taxonomy)</span>
            </h3>
            <span className={`text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>3 Core Objectives</span>
          </div>

          <div className="space-y-2.5">
            {lessonPlan.objectives.map((obj, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                  isDark
                    ? 'bg-[#0a0a0d] border-white/15 text-zinc-200 shadow-sm'
                    : 'bg-slate-50/70 border-slate-200/80 hover:bg-white'
                }`}
              >
                <div className={`p-1 rounded-full mt-0.5 flex-shrink-0 ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={obj}
                  onChange={(e) => handleObjectiveChange(i, e.target.value)}
                  className={`w-full text-xs font-medium leading-relaxed bg-transparent focus:outline-none rounded px-1 ${
                    isDark ? 'focus:ring-1 focus:ring-white/50 text-zinc-200' : 'focus:ring-1 focus:ring-blue-500'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Materials & Lab Preparation */}
        <div className={`py-6 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-700'
            }`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                isDark ? 'gold-metallic-btn !w-6 !h-6 !p-0 text-xs text-black' : 'bg-indigo-100 text-indigo-700'
              }`}>
                2
              </span>
              <span>Materials & Lab Preparation</span>
            </h3>
            <span className={`text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>Class Set (30 Students)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {materialsList.map((mat, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                  isDark
                    ? 'bg-[#0a0a0d] border-white/15 text-zinc-200 shadow-sm'
                    : 'bg-slate-50/80 border-slate-200/80'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isDark ? 'bg-slate-800 border border-slate-700 text-slate-200' : 'bg-blue-500/10 text-blue-600'
                }`}>
                  <Boxes className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className={`text-xs font-bold truncate ${isDark ? 'text-zinc-200' : ''}`}>{mat.name}</p>
                  <p className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>{mat.quantity || 'Class Set'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Pedagogical Agenda */}
        <div className={`py-6 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-700'
            }`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                isDark ? 'gold-metallic-btn !w-6 !h-6 !p-0 text-xs text-black' : 'bg-purple-100 text-purple-700'
              }`}>
                3
              </span>
              <span>Pedagogical Agenda ({lessonPlan.durationMinutes} Minutes)</span>
            </h3>
            <span className={`text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>Timed Progression</span>
          </div>

          {/* Agenda Table */}
          <div className={`overflow-x-auto rounded-xl border ${isDark ? 'border-white/15' : 'border-slate-200'}`}>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className={isDark ? 'bg-[#0b0b10] text-white border-b border-white/15' : 'bg-slate-100 text-slate-700'}>
                  <th className="p-3 font-bold uppercase tracking-wider w-24">Time</th>
                  <th className="p-3 font-bold uppercase tracking-wider w-40">Instructional Step</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Teacher Script / Guidance</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Student Activity</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-white/10' : 'divide-slate-200'}`}>
                {lessonPlan.agenda.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-3 align-top">
                      <span
                        className={`inline-block px-2 py-1 rounded-md text-[11px] font-bold border ${getTimePillClass(
                          idx
                        )}`}
                      >
                        {item.timeRange || `${item.minutes} min`}
                      </span>
                    </td>
                    <td className={`p-3 align-top font-bold ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>
                      <input
                        type="text"
                        value={item.segment}
                        onChange={(e) => handleAgendaChange(idx, 'segment', e.target.value)}
                        className={`w-full bg-transparent focus:outline-none rounded px-1 font-bold ${
                          isDark ? 'focus:ring-1 focus:ring-white text-white' : 'focus:ring-1 focus:ring-blue-500'
                        }`}
                      />
                    </td>
                    <td className={`p-3 align-top leading-relaxed ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
                      <textarea
                        rows={3}
                        value={item.instructions}
                        onChange={(e) => handleAgendaChange(idx, 'instructions', e.target.value)}
                        className={`w-full bg-transparent focus:outline-none rounded px-1 resize-none leading-relaxed ${
                          isDark ? 'focus:ring-1 focus:ring-white/40 text-zinc-300' : 'focus:ring-1 focus:ring-blue-500'
                        }`}
                      />
                    </td>
                    <td className={`p-3 align-top leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                      <textarea
                        rows={3}
                        value={
                          item.studentActivity ||
                          'Engage in inquiry, record observations, and prepare for exit formative check.'
                        }
                        onChange={(e) => handleAgendaChange(idx, 'studentActivity', e.target.value)}
                        className={`w-full bg-transparent focus:outline-none rounded px-1 resize-none leading-relaxed ${
                          isDark ? 'focus:ring-1 focus:ring-white/40 text-zinc-400' : 'focus:ring-1 focus:ring-blue-500'
                        }`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Page Footer */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2 ${
          isDark ? 'border-white/10 text-zinc-400' : 'border-slate-200 text-slate-400'
        }`}>
          <span>Generated via PlanCraft AI for Google Workspace</span>
          <span>Page 1 of 1 • {lessonPlan.cohort || '8th Grade Science Cohort'}</span>
        </div>
      </div>

      {/* Floating Bottom Banner: "Paired Student Worksheet Ready" */}
      <div
        className={`rounded-2xl border p-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-md ${
          isDark
            ? 'gold-bevel-card text-zinc-200'
            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-950'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
            isDark ? 'gold-metallic-btn !w-10 !h-10 !p-0 text-black' : 'bg-blue-600 text-white'
          }`}>
            <FileText className="w-5 h-5 text-black" />
          </div>
          <div>
            <h4 className={`text-sm font-bold ${isDark ? 'text-white' : ''}`}>Paired Student Worksheet Ready</h4>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Includes 5 real-world inquiry problem sets + complete teacher answer key and scoring guide.
            </p>
          </div>
        </div>

        <button
          onClick={onGoToWorksheet}
          className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 flex-shrink-0 transition-all hover:scale-105 ${
            isDark
              ? 'gold-metallic-btn text-xs !py-2.5 !px-4 text-black'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <span>Inspect Worksheet</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
