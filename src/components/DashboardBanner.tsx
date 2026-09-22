import React from 'react';
import { History, Plus, Clock, BarChart3 } from 'lucide-react';
import type { ThemeMode } from '../types';

interface DashboardBannerProps {
  theme: ThemeMode;
  userEmail: string | null;
  onNewTemplate?: () => void;
  onVersionHistory?: () => void;
  onViewStats?: () => void;
}

export const DashboardBanner: React.FC<DashboardBannerProps> = ({
  theme,
  userEmail,
  onNewTemplate,
  onVersionHistory,
  onViewStats,
}) => {
  const isDark = theme === 'dark';
  const teacherName = userEmail ? userEmail.split('@')[0] : 'Sarah J.';

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
      <div>
        {/* Status Pill Badge */}
        <div
          onClick={onViewStats}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-2 border cursor-pointer hover:opacity-90 transition-opacity ${
            isDark
              ? 'gold-badge'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}
          title="Click to view live Stat Dashboard"
        >
          <span className={`w-2 h-2 rounded-full ${
            isDark ? 'bg-slate-300 shadow-[0_0_6px_rgba(203,213,225,0.4)]' : 'bg-emerald-500'
          }`} />
          <span>Spring Term 2025 Active</span>
          <span className={isDark ? 'text-slate-500' : 'text-slate-300'}>•</span>
          <span className={`flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            <Clock className={`w-3 h-3 ${isDark ? 'text-slate-300' : 'text-amber-500'}`} />
            Period 3 Starts in 42 mins
          </span>
        </div>

        <h1
          className={`text-2xl md:text-3xl font-black tracking-tight ${
            isDark ? 'gold-gradient-text' : 'text-slate-900'
          }`}
        >
          Welcome back, {teacherName}
        </h1>
        <p className={`text-sm mt-1 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Ready to prepare today’s science curriculum? Gemini Education AI is synchronized with your Westbrook Google Drive folders.
        </p>
      </div>

      {/* Top Action Buttons */}
      <div className="flex items-center gap-2.5 flex-shrink-0 flex-wrap">
        {onViewStats && (
          <button
            onClick={onViewStats}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isDark
                ? 'gold-outline-btn'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <BarChart3 className={`w-3.5 h-3.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
            <span>Stat Dashboard</span>
          </button>
        )}

        <button
          onClick={onVersionHistory}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            isDark
              ? 'gold-outline-btn'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
          }`}
        >
          <History className={`w-3.5 h-3.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
          <span>Version History</span>
        </button>

        <button
          onClick={onNewTemplate}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98] ${
            isDark
              ? 'gold-metallic-btn'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>+ New Custom Template</span>
        </button>
      </div>
    </div>
  );
};
