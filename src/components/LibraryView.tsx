import React, { useState } from 'react';
import {
  Folder,
  Search,
  FileText,
  CheckSquare,
  ArrowRight,
  ExternalLink,
  Plus,
  BookOpen,
} from 'lucide-react';
import type { RecentDraft, ThemeMode } from '../types';

interface LibraryViewProps {
  theme: ThemeMode;
  drafts: RecentDraft[];
  onSelectDraft: (draft: RecentDraft) => void;
  onCreateNew: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  theme,
  drafts,
  onSelectDraft,
  onCreateNew,
}) => {
  const isDark = theme === 'dark';
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = drafts.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.subject.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'all') return matchesSearch;
    if (filter === 'exported') return matchesSearch && d.status === 'EXPORTED';
    if (filter === 'drafts') return matchesSearch && d.status !== 'EXPORTED';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-black tracking-tight ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
            My Curriculum Library
          </h2>
          <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
            Browse, inspect, and open all generated lesson plans, worksheets, and formative quizzes across Westbrook cohorts.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm self-start ${
            isDark
              ? 'gold-metallic-btn text-xs !py-2.5 !px-4'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Create New Lesson Pack</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['all', 'exported', 'drafts'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                filter === f
                  ? isDark
                    ? 'gold-metallic-btn !py-1.5 !px-3.5 text-xs'
                    : 'bg-blue-600 text-white'
                  : isDark
                  ? 'bg-[#101015] border border-white/15 text-zinc-400 hover:border-white/40 hover:text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'All Units' : f === 'exported' ? 'Drive Synced' : 'Drafts'}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64 relative">
          <Search className={`w-3.5 h-3.5 absolute left-3 top-2.5 ${isDark ? 'text-zinc-400' : 'text-slate-400'}`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter library..."
            className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border focus:outline-none transition-all ${
              isDark
                ? 'gold-input'
                : 'bg-white border-slate-200 text-slate-900 focus:ring-1 focus:ring-blue-500'
            }`}
          />
        </div>
      </div>

      {/* Drafts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((d) => (
          <div
            key={d.id}
            onClick={() => onSelectDraft(d)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] flex flex-col justify-between group ${
              isDark
                ? 'gold-bevel-card hover:border-white/50 text-white'
                : 'bg-white border-slate-200 hover:border-blue-300 text-slate-900 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  isDark ? 'gold-badge font-bold' : 'bg-blue-100 text-blue-800'
                }`}>
                  {d.grade}
                </span>
                <span
                  className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${
                    d.status === 'EXPORTED'
                      ? isDark
                        ? 'gold-badge font-bold'
                        : 'bg-emerald-100 text-emerald-800'
                      : d.status === 'READY'
                      ? isDark
                        ? 'bg-slate-800 text-slate-200 border border-slate-700 shadow-sm'
                        : 'bg-blue-100 text-blue-800'
                      : isDark
                      ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {d.status}
                </span>
              </div>

              <h3 className={`text-base font-bold transition-colors ${
                isDark ? 'group-hover:text-white text-slate-100' : 'group-hover:text-blue-600 text-slate-900'
              }`}>
                {d.title}
              </h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                {d.subject} • Created {d.timeAgo}
              </p>
            </div>

            <div className={`pt-4 mt-4 border-t flex items-center justify-between text-xs font-bold ${
              isDark ? 'border-slate-800 text-slate-300 group-hover:text-white' : 'border-slate-100 text-blue-600'
            }`}>
              <span>Open in Interactive Editor</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
