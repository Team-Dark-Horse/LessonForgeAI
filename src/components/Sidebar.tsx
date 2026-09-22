import React from 'react';
import {
  Sparkles,
  Folder,
  Users,
  BookOpen,
  Settings,
  Cloud,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  LogIn,
  BarChart3,
} from 'lucide-react';
import type { AppNavView, ThemeMode } from '../types';

interface SidebarProps {
  currentView: AppNavView;
  onNavigate: (view: AppNavView) => void;
  theme: ThemeMode;
  userEmail: string | null;
  onSignIn: () => void;
  onSignOut: () => void;
  isEditorActive?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  theme,
  userEmail,
  onSignIn,
  onSignOut,
  isEditorActive = true,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const isDark = theme === 'dark';

  const navItems = [
    {
      id: 'create' as AppNavView,
      label: 'Create & Plan',
      icon: Sparkles,
      badge: 'Gemini EDU',
    },
    {
      id: 'editor' as AppNavView,
      label: 'Interactive Editor',
      icon: FileText,
      badge: isEditorActive ? 'Active' : undefined,
    },
    {
      id: 'stats' as AppNavView,
      label: 'Stat Dashboard',
      icon: BarChart3,
      badge: 'Live',
    },
    {
      id: 'library' as AppNavView,
      label: 'My Library',
      icon: Folder,
      badge: '34',
    },
    {
      id: 'classes' as AppNavView,
      label: 'Classes & Sections',
      icon: Users,
      badge: '4 Periods',
    },
    {
      id: 'standards' as AppNavView,
      label: 'Curriculum Standards',
      icon: BookOpen,
      badge: 'NCERT',
    },
    {
      id: 'settings' as AppNavView,
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <aside
      id="app-navigation-sidebar"
      className={`${
        isCollapsed ? 'w-[72px]' : 'w-64'
      } flex-shrink-0 flex flex-col justify-between border-r transition-all duration-300 ease-in-out select-none relative z-30 ${
        isDark
          ? 'bg-[#050508] border-r border-white/15 text-zinc-200 shadow-[2px_0_30px_rgba(0,0,0,0.95)]'
          : 'bg-white border-slate-200 text-slate-700 shadow-sm'
      }`}
    >
      {/* Top Brand Logo & Collapse Button */}
      <div>
        <div
          className={`h-16 px-3 flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between'
          } border-b ${isDark ? 'border-white/10' : 'border-slate-100'}`}
        >
          {!isCollapsed ? (
            <>
              <div
                className="flex items-center gap-3 cursor-pointer group min-w-0"
                onClick={() => onNavigate('create')}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 ${
                    isDark
                      ? 'gold-metallic-btn text-slate-900 shadow-[0_0_12px_rgba(203,213,225,0.3)]'
                      : 'bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-slate-900" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-black tracking-tight text-base truncate ${
                        isDark ? 'gold-gradient-text' : 'text-slate-900'
                      }`}
                    >
                      LessonForge AI
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded shrink-0 ${
                        isDark
                          ? 'gold-badge font-extrabold'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      EDU
                    </span>
                  </div>
                  <p className={`text-[11px] font-medium truncate ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Westbrook Middle Hub</p>
                </div>
              </div>

              {/* Collapse Trigger Button */}
              {onToggleCollapse && (
                <button
                  id="collapse-sidebar-button"
                  onClick={onToggleCollapse}
                  title="Collapse side panel"
                  aria-label="Collapse side panel"
                  className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                    isDark
                      ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-transparent hover:border-slate-700'
                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-1 py-1">
              <button
                id="expand-sidebar-button"
                onClick={onToggleCollapse}
                title="Expand side panel"
                aria-label="Expand side panel"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-105 ${
                  isDark
                    ? 'gold-metallic-btn text-slate-900 shadow-[0_0_12px_rgba(203,213,225,0.3)]'
                    : 'bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20'
                }`}
              >
                <PanelLeftOpen className="w-5 h-5 text-slate-900" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation items */}
        <div className="p-2 sm:p-3">
          {!isCollapsed && (
            <div className={`px-3 pb-2 pt-1 text-[11px] font-bold tracking-wider uppercase ${
              isDark ? 'text-zinc-400' : 'text-slate-400'
            }`}>
              Workspace Navigation
            </div>
          )}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  title={isCollapsed ? `${item.label} ${item.badge ? `(${item.badge})` : ''}` : undefined}
                  className={`w-full flex items-center ${
                    isCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3 py-2.5'
                  } rounded-xl text-sm font-medium transition-all group text-left relative ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-r from-slate-400/20 via-slate-500/10 to-transparent text-slate-100 font-bold border-l-2 border-slate-300 shadow-[inset_0_1px_0_rgba(203,213,225,0.2)]'
                        : 'bg-blue-50 text-blue-700 font-semibold border border-blue-100 shadow-2xs'
                      : isDark
                      ? 'hover:bg-[#121217] text-zinc-400 hover:text-white'
                      : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <Icon
                      className={`w-5 h-5 transition-colors shrink-0 ${
                        isActive
                          ? isDark
                            ? 'text-slate-200'
                            : 'text-blue-600'
                          : isDark
                          ? 'text-slate-400 group-hover:text-slate-200'
                          : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!isCollapsed && item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold shrink-0 ${
                        isActive
                          ? isDark
                            ? 'gold-badge font-bold'
                            : 'bg-blue-100 text-blue-700'
                          : isDark
                          ? 'bg-[#101015] text-slate-400 border border-slate-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Dot indicator for active item when collapsed */}
                  {isCollapsed && isActive && (
                    <span className={`absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-4 rounded-full ${
                      isDark ? 'bg-slate-300 shadow-[0_0_8px_rgba(203,213,225,0.4)]' : 'bg-blue-600'
                    }`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom status & User profile */}
      <div className="p-2 sm:p-3 space-y-2">
        {/* Drive Auto-sync notification box (collapsible) */}
        {!isCollapsed ? (
          <div
            className={`p-3 rounded-xl border text-xs ${
              isDark
                ? 'gold-bevel-card text-slate-300'
                : 'bg-emerald-50/60 border-emerald-200/60 text-emerald-900'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-semibold">
              <span className={`w-2 h-2 rounded-full ${
                isDark ? 'bg-slate-300 shadow-[0_0_6px_rgba(203,213,225,0.4)]' : 'bg-emerald-500'
              }`} />
              <Cloud className={`w-3.5 h-3.5 ${
                isDark ? 'text-slate-200' : 'text-emerald-600'
              }`} />
              <span className={isDark ? 'text-slate-200 font-bold' : ''}>Drive Auto-Sync On</span>
            </div>
            <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Drafts and exported Docs sync directly to Westbrook Google Classroom drive folders.
            </p>
          </div>
        ) : (
          <div
            title="Drive Auto-Sync On"
            className={`flex items-center justify-center p-2 rounded-xl border ${
              isDark
                ? 'gold-bevel-card text-slate-200'
                : 'bg-emerald-50/60 border-emerald-200/60 text-emerald-600'
            }`}
          >
            <Cloud className="w-4 h-4" />
          </div>
        )}

        {/* User Card */}
        <div
          className={`p-2 rounded-xl border flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between'
          } ${
            isDark ? 'gold-bevel-card' : 'bg-slate-50 border-slate-200/80'
          }`}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div
              title={userEmail || 'Sarah Jenkins'}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                isDark
                  ? 'gold-metallic-btn text-slate-900 ring-1 ring-slate-400 shadow-[0_0_8px_rgba(203,213,225,0.2)]'
                  : 'bg-gradient-to-tr from-indigo-500 to-purple-600 text-white'
              }`}
            >
              {userEmail ? userEmail[0].toUpperCase() : 'SJ'}
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {userEmail ? userEmail.split('@')[0] : 'Sarah Jenkins'}
                </p>
                <p className={`text-[10px] truncate ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>
                  {userEmail || 'sjenkins@westbrook.edu'}
                </p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div>
              {userEmail ? (
                <button
                  onClick={onSignOut}
                  title="Sign Out"
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDark
                      ? 'text-zinc-400 hover:text-rose-400 hover:bg-zinc-900'
                      : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onSignIn}
                  title="Connect Google Workspace"
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDark
                      ? 'text-white hover:bg-white/15'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
