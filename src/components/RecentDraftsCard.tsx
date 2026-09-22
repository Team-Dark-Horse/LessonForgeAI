import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import type { RecentDraft, ThemeMode } from '../types';

interface RecentDraftsCardProps {
  theme: ThemeMode;
  drafts: RecentDraft[];
  onSelectDraft: (draft: RecentDraft) => void;
  onViewAll?: () => void;
}

export const RecentDraftsCard: React.FC<RecentDraftsCardProps> = ({
  theme,
  drafts,
  onSelectDraft,
  onViewAll,
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isDark ? 'gold-bevel-card text-zinc-200' : 'bg-white border-slate-200 shadow-xs'
      }`}
    >
      <div className={`flex items-center justify-between pb-3 border-b ${
        isDark ? 'border-white/15' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <h3 className={`text-sm font-black ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
            Recent Drafts
          </h3>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            isDark ? 'gold-badge font-bold' : 'bg-slate-100 text-slate-600'
          }`}>
            {drafts.length} Active
          </span>
        </div>
        <button
          onClick={onViewAll}
          className={`text-xs font-bold ${
            isDark ? 'text-slate-300 hover:text-white' : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          View All (34)
        </button>
      </div>

      <div className={`divide-y my-2 ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
        {drafts.map((draft) => (
          <div
            key={draft.id}
            onClick={() => onSelectDraft(draft)}
            className={`py-3 px-2 rounded-xl cursor-pointer transition-all flex items-center justify-between group ${
              isDark
                ? 'hover:bg-slate-800/40 text-slate-200'
                : 'hover:bg-slate-50 text-slate-800'
            }`}
          >
            <div className="flex items-start gap-2.5 overflow-hidden">
              <div className={`p-2 rounded-lg mt-0.5 flex-shrink-0 transition-transform group-hover:scale-105 ${
                isDark ? 'bg-[#101218] border border-slate-700/60 text-slate-200' : 'bg-blue-50 text-blue-600'
              }`}>
                <FileText className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <h4 className={`text-xs font-bold truncate transition-colors ${
                  isDark ? 'group-hover:text-white text-slate-200' : 'group-hover:text-blue-600'
                }`}>
                  {draft.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                  <span>{draft.grade}</span>
                  <span>•</span>
                  <span>{draft.subject}</span>
                  <span>•</span>
                  <span>{draft.timeAgo}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <span
                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                  draft.status === 'EXPORTED'
                    ? isDark
                      ? 'gold-badge'
                      : 'bg-emerald-100 text-emerald-800'
                    : draft.status === 'READY'
                    ? isDark
                      ? 'gold-badge font-bold'
                      : 'bg-blue-100 text-blue-800'
                    : isDark
                    ? 'bg-slate-800 border border-slate-700 text-slate-300'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {draft.status}
              </span>
              <ArrowRight className={`w-3.5 h-3.5 text-slate-500 transition-all group-hover:translate-x-0.5 ${
                isDark ? 'group-hover:text-white' : 'group-hover:text-blue-500'
              }`} />
            </div>
          </div>
        ))}
      </div>

      {/* Unit 3 Progress: Cellular Systems (4 of 6 Lessons) */}
      <div
        className={`p-3 rounded-xl border mt-3 ${
          isDark
            ? 'gold-bevel-card text-slate-300'
            : 'bg-slate-50 border-slate-200/80 text-slate-700'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
          <span className="truncate">Unit 3: Cellular Systems & Motion</span>
          <span className={`text-[11px] font-extrabold ${isDark ? 'text-slate-300' : 'text-blue-600'}`}>
            4 of 6 Lessons (66%)
          </span>
        </div>
        <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-200'}`}>
          <div className={`h-full rounded-full w-2/3 ${
            isDark ? 'bg-gradient-to-r from-slate-400 via-slate-200 to-slate-300 shadow-[0_0_8px_rgba(203,213,225,0.4)]' : 'bg-gradient-to-r from-blue-500 to-indigo-600'
          }`} />
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5">
          <span>Next: Assessment Synthesis</span>
          <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-emerald-600'}`}>
            On Schedule
          </span>
        </div>
      </div>
    </div>
  );
};
