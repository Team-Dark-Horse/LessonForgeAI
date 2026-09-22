import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  HardDrive,
  ExternalLink,
  Sparkles,
  X,
} from 'lucide-react';
import type { ThemeMode } from '../types';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  userEmail: string | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onSearchChange?: (term: string) => void;
  onTopicSearchSubmit?: (topic: string) => void;
  searchTerm?: string;
  onQuickOpenDrive?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  userEmail,
  onSignIn,
  onSignOut,
  onSearchChange,
  onTopicSearchSubmit,
  searchTerm = '',
  onQuickOpenDrive,
}) => {
  const isDark = theme === 'dark';
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const notifications = [
    {
      id: 1,
      title: 'Drive Sync Complete',
      desc: 'Period 2 Newton’s Laws pack uploaded to Westbrook 8th Grade folder.',
      time: '12m ago',
    },
    {
      id: 2,
      title: 'Quiz Responses Updated',
      desc: '24 students completed Photosynthesis Formative Exit Ticket.',
      time: '1h ago',
    },
  ];

  return (
    <header
      className={`h-16 px-4 sm:px-6 border-b flex items-center justify-between gap-4 transition-colors duration-200 select-none z-20 ${
        isDark
          ? 'bg-[#050508]/95 border-b border-white/15 text-zinc-200 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.9)]'
          : 'bg-white border-slate-200 text-slate-700 shadow-sm'
      }`}
    >
      {/* Left: Search Bar */}
      <div className="flex-1 max-w-xl flex items-center gap-3">
        <div className="relative flex-1 flex items-center">
          <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchTerm.trim() && onTopicSearchSubmit) {
                onTopicSearchSubmit(searchTerm.trim());
              }
            }}
            placeholder="Search or enter any topic to generate study material..."
            className={`w-full pl-10 pr-16 py-2 rounded-xl text-sm transition-all focus:outline-none ${
              isDark
                ? 'gold-input'
                : 'bg-slate-100/90 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/50'
            }`}
          />
          <span className={`absolute right-3 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border hidden sm:inline-block ${
            isDark ? 'gold-badge font-mono' : 'border-slate-300 text-slate-400'
          }`}>
            ⌘K
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Workspace Connection Pill - Only shown when connected */}
        {userEmail && (
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
              isDark
                ? 'gold-badge !text-emerald-300 !border-emerald-500/40'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
            <span>Google Workspace Connected</span>
          </div>
        )}

        {/* My Google Drive Link Button */}
        <a
          href="https://drive.google.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (onQuickOpenDrive) {
              onQuickOpenDrive();
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            isDark
              ? 'gold-outline-btn !py-1.5'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 shadow-xs'
          }`}
        >
          <HardDrive className={`w-3.5 h-3.5 ${isDark ? 'text-slate-300' : 'text-blue-500'}`} />
          <span>My Google Drive</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          className={`p-2 rounded-xl transition-all ${
            isDark
              ? 'gold-outline-btn !p-2 text-slate-200'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
          }`}
        >
          {isDark ? <Sun className="w-4 h-4 text-slate-200" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) setUnreadCount(0);
            }}
            className={`p-2 rounded-xl relative transition-all ${
              isDark
                ? 'gold-outline-btn !p-2'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ring-2 ${
                isDark
                  ? 'bg-slate-300 ring-slate-900 shadow-[0_0_6px_rgba(203,213,225,0.4)]'
                  : 'bg-rose-500 ring-white'
              }`} />
            )}
          </button>

          {showNotifications && (
            <div
              className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl p-3.5 z-50 animate-in fade-in slide-in-from-top-2 ${
                isDark
                  ? 'gold-bevel-card text-zinc-200'
                  : 'bg-white border border-slate-200 text-slate-800'
              }`}
            >
              <div className={`flex items-center justify-between pb-2 border-b mb-2 ${
                isDark ? 'border-white/15' : 'border-slate-200'
              }`}>
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'gold-gradient-text' : 'text-slate-400'
                }`}>
                  Workspace Notifications
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className={isDark ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-slate-600'}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl text-xs border ${
                      isDark
                        ? 'bg-[#0d0d12] border-white/15 text-zinc-300'
                        : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className={`flex items-center justify-between font-semibold mb-1 ${
                      isDark ? 'text-white' : 'text-blue-600'
                    }`}>
                      <span>{n.title}</span>
                      <span className={`text-[10px] ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>{n.time}</span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                      {n.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill / Button */}
        {userEmail ? (
          <div className={`flex items-center gap-2 pl-2 border-l ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
              isDark
                ? 'gold-metallic-btn text-black ring-1 ring-slate-400/30 shadow-[0_0_8px_rgba(203,213,225,0.3)]'
                : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
            }`}>
              {userEmail[0].toUpperCase()}
            </div>
          </div>
        ) : (
          <button
            onClick={onSignIn}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-all ${
              isDark
                ? 'gold-metallic-btn'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect Workspace</span>
          </button>
        )}
      </div>
    </header>
  );
};
