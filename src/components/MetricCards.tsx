import React from 'react';
import { Sparkles, Users, Zap, HardDrive, ArrowUpRight } from 'lucide-react';
import type { ThemeMode } from '../types';

interface MetricCardsProps {
  theme: ThemeMode;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1: Lessons Created */}
      <div
        className={`p-4 rounded-2xl border transition-all ${
          isDark
            ? 'gold-bevel-card group hover:border-slate-500/50'
            : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          <span className={isDark ? 'text-slate-200 font-bold' : ''}>Lessons Created</span>
          <div className={`flex items-center text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-emerald-500'}`}>
            <span>+12 this mo</span>
            <ArrowUpRight className="w-3 h-3 ml-0.5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-2xl font-black tracking-tight ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
            147
          </span>
          {/* Mini Sparkline Chart */}
          <svg className={`w-20 h-6 overflow-visible ${isDark ? 'text-slate-200' : 'text-blue-500'}`} viewBox="0 0 80 24">
            <path
              d="M0 18 L15 14 L30 16 L45 8 L60 11 L75 2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="75" cy="2" r="3" fill="currentColor" />
          </svg>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-slate-300 shadow-[0_0_6px_rgba(203,213,225,0.4)]' : 'bg-blue-500'}`} />
          96% NCERT Syllabus Aligned
        </p>
      </div>

      {/* Metric 2: Students Engaged */}
      <div
        className={`p-4 rounded-2xl border transition-all ${
          isDark
            ? 'gold-bevel-card group hover:border-slate-500/50'
            : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          <span className={isDark ? 'text-slate-200 font-bold' : ''}>Students Engaged</span>
          <span className={`text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-blue-500'}`}>98% completion</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-2xl font-black tracking-tight ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
            8,920
          </span>
          {/* Circular Ring Gauge */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg className="w-8 h-8 -rotate-90">
              <circle
                cx="16"
                cy="16"
                r="13"
                className={`${isDark ? 'text-slate-800' : 'text-slate-200'} stroke-current`}
                strokeWidth="3"
                fill="transparent"
              />
              <circle
                cx="16"
                cy="16"
                r="13"
                className={`${isDark ? 'text-slate-200' : 'text-indigo-500'} stroke-current`}
                strokeWidth="3"
                strokeDasharray="81.68"
                strokeDashoffset="8.16"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className={`absolute text-[9px] font-bold ${isDark ? 'text-slate-200' : 'text-slate-500'}`}>98</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
          <Users className={`w-3 h-3 ${isDark ? 'text-slate-300' : 'text-indigo-500'}`} />
          Across 4 Westbrook class cohorts
        </p>
      </div>

      {/* Metric 3: Hours Saved */}
      <div
        className={`p-4 rounded-2xl border transition-all ${
          isDark
            ? 'gold-bevel-card group hover:border-slate-500/50'
            : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          <span className={isDark ? 'text-slate-200 font-bold' : ''}>Hours Saved</span>
          <span className={`text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-amber-500'}`}>~8.5 hrs/wk</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-2xl font-black tracking-tight ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
            1,245
          </span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
            isDark ? 'gold-metallic-btn text-slate-900 !p-0 shadow-[0_0_10px_rgba(203,213,225,0.2)]' : 'bg-amber-500/10 text-amber-500'
          }`}>
            <Zap className="w-4 h-4 text-slate-900" />
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-slate-300 shadow-[0_0_6px_rgba(203,213,225,0.4)]' : 'bg-amber-400'}`} />
          Lesson prep & grading automation
        </p>
      </div>

      {/* Metric 4: Drive Storage */}
      <div
        className={`p-4 rounded-2xl border transition-all ${
          isDark
            ? 'gold-bevel-card group hover:border-slate-500/50'
            : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          <span className={isDark ? 'text-slate-200 font-bold' : ''}>Drive Storage</span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            isDark ? 'gold-badge font-bold' : 'bg-blue-100 text-blue-700'
          }`}>
            Unlimited EDU
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-2xl font-black tracking-tight ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
            14.2 GB
          </span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
            isDark ? 'gold-metallic-btn text-slate-900 !p-0 shadow-[0_0_10px_rgba(203,213,225,0.2)]' : 'bg-blue-500/10 text-blue-500'
          }`}>
            <HardDrive className="w-4 h-4 text-slate-900" />
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-slate-300 shadow-[0_0_6px_rgba(203,213,225,0.4)]' : 'bg-emerald-500'}`} />
          Westbrook EDU Auto-Sync Active
        </p>
      </div>
    </div>
  );
};
