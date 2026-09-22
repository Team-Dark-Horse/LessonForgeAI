import React from 'react';
import { type User } from 'firebase/auth';
import { BookOpen, CheckCircle2, LogIn, LogOut, HardDrive, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  hasToken: boolean;
  isLoggingIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  hasToken,
  isLoggingIn,
  onLogin,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">AI Lesson Planner</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                Workspace Edition
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Automating end-to-end curriculum directly to Google Drive</p>
          </div>
        </div>

        {/* Auth / Workspace Status */}
        <div className="flex items-center gap-3">
          {user && hasToken ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
                <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
                <span>Google Drive Connected</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>

              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Teacher'}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full ring-2 ring-blue-500/20"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                    {user.email?.[0].toUpperCase() || 'T'}
                  </div>
                )}
                <div className="hidden lg:block text-left text-xs">
                  <p className="font-medium text-slate-800 leading-tight">{user.displayName || 'Teacher'}</p>
                  <p className="text-slate-500 text-[11px] truncate max-w-[140px]">{user.email}</p>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign out of Google"
                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Requires Google sign-in to export</span>
              </div>
              <button
                onClick={onLogin}
                disabled={isLoggingIn}
                className="flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 rounded-lg shadow-sm transition-all"
              >
                <LogIn className="w-4 h-4" />
                {isLoggingIn ? 'Connecting...' : 'Sign in with Google'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
