import React from 'react';
import {
  HardDrive,
  FileText,
  CheckSquare,
  Users,
  CheckCircle2,
} from 'lucide-react';
import type { ThemeMode } from '../types';

interface ConnectedWorkspaceCardProps {
  theme: ThemeMode;
  userEmail: string | null;
  onManage?: () => void;
}

export const ConnectedWorkspaceCard: React.FC<ConnectedWorkspaceCardProps> = ({
  theme,
  userEmail,
  onManage,
}) => {
  const isDark = theme === 'dark';

  const services = [
    {
      name: 'Google Drive',
      desc: '/2024-25/Grade8/Science/Unit3...',
      icon: HardDrive,
    },
    {
      name: 'Google Docs',
      desc: 'Formatted teacher lesson plans',
      icon: FileText,
    },
    {
      name: 'Google Forms',
      desc: 'Auto-graded 5-pt exit tickets',
      icon: CheckSquare,
    },
    {
      name: 'Google Classroom',
      desc: 'Period 2, 4, 7 Linked',
      icon: Users,
    },
  ];

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
            Connected Workspace
          </h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isDark
              ? 'gold-badge font-bold'
              : 'bg-emerald-100 text-emerald-800'
          }`}>
            4 Synced
          </span>
        </div>
        <button
          onClick={onManage}
          className={`text-xs font-bold ${
            isDark ? 'text-slate-300 hover:text-white' : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          Manage
        </button>
      </div>

      <div className={`divide-y my-2 ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.name} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isDark ? 'bg-[#101218] border border-slate-700/60 text-slate-200' : 'bg-slate-100 text-blue-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {s.name}
                  </p>
                  <p className={`text-[11px] truncate max-w-[180px] ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                    {s.desc}
                  </p>
                </div>
              </div>
              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-slate-300' : 'text-emerald-500'}`} />
            </div>
          );
        })}
      </div>

      <div className={`pt-2 border-t flex items-center justify-between text-[11px] ${
        isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-400'
      }`}>
        <span>Account: {userEmail || 'sjenkins@westbrook.edu'}</span>
        <span className={`font-semibold flex items-center gap-1 ${
          isDark ? 'text-slate-300' : 'text-emerald-600'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            isDark ? 'bg-slate-300 shadow-[0_0_6px_rgba(203,213,225,0.4)]' : 'bg-emerald-500'
          }`} />
          Active
        </span>
      </div>
    </div>
  );
};
