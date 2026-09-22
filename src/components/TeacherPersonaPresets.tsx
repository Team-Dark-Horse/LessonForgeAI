import React from 'react';
import { Sparkles, Atom, Calculator, BookOpen, Compass } from 'lucide-react';
import type { LessonPlannerParameters, ThemeMode } from '../types';

interface TeacherPersonaPresetsProps {
  onSelect: (params: LessonPlannerParameters) => void;
  disabled?: boolean;
  theme?: ThemeMode;
}

export const TeacherPersonaPresets: React.FC<TeacherPersonaPresetsProps> = ({ onSelect, disabled, theme = 'light' }) => {
  const isDark = theme === 'dark';

  const presets = [
    {
      id: 'sarah-jenkins',
      badge: 'PRD Persona • Sarah Jenkins',
      title: "Newton's Third Law: Action & Reaction Forces",
      subject: 'Middle School Science',
      grade: '8th Grade',
      duration: 50,
      icon: Atom,
      lightAccent: 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-300 text-blue-900',
      lightIconColor: 'text-blue-600 bg-blue-100',
    },
    {
      id: 'marcus-vance',
      badge: 'PRD Persona • Marcus Vance',
      title: 'Fractions & Equivalent Values in Everyday Life',
      subject: '4th Grade Generalist',
      grade: '4th Grade',
      duration: 45,
      icon: Calculator,
      lightAccent: 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-300 text-emerald-900',
      lightIconColor: 'text-emerald-600 bg-emerald-100',
    },
    {
      id: 'ela-highschool',
      badge: 'High School ELA',
      title: "Analyzing Author's Tone, Mood, and Rhetorical Devices",
      subject: 'English Language Arts',
      grade: '9th Grade',
      duration: 60,
      icon: BookOpen,
      lightAccent: 'border-purple-200 bg-purple-50/50 hover:bg-purple-50 hover:border-purple-300 text-purple-900',
      lightIconColor: 'text-purple-600 bg-purple-100',
    },
    {
      id: 'social-studies',
      badge: 'Elementary Social Studies',
      title: 'The American Revolution: Road to Independence & 1776',
      subject: 'Social Studies',
      grade: '5th Grade',
      duration: 40,
      icon: Compass,
      lightAccent: 'border-amber-200 bg-amber-50/50 hover:bg-amber-50 hover:border-amber-300 text-amber-900',
      lightIconColor: 'text-amber-600 bg-amber-100',
    },
  ];

  return (
    <div className={`mt-4 pt-4 border-t ${isDark ? 'border-zinc-800/80' : 'border-slate-100'}`}>
      <div className={`flex items-center gap-1.5 text-xs font-semibold mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-slate-300' : 'text-blue-600'}`} />
        <span>Quick-Fill from Teacher Personas (1-Click Sample Testing)</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {presets.map((p) => {
          const IconComponent = p.icon;
          return (
            <button
              key={p.id}
              type="button"
              disabled={disabled}
              onClick={() =>
                onSelect({
                  topic: p.title,
                  gradeLevel: p.grade,
                  durationMinutes: p.duration,
                })
              }
              className={`text-left p-3 rounded-xl border transition-all disabled:opacity-50 disabled:pointer-events-none group ${
                isDark
                  ? 'bg-[#101218] border-slate-800 hover:border-slate-500 hover:bg-[#14161f] text-slate-100 shadow-md'
                  : p.lightAccent
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-semibold tracking-tight uppercase px-1.5 py-0.5 rounded ${
                  isDark
                    ? 'bg-slate-900 border border-slate-700/80 text-slate-200'
                    : 'bg-white/80 border border-slate-200/60 text-slate-600'
                }`}>
                  {p.badge}
                </span>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                  isDark
                    ? 'text-slate-200 bg-slate-800 border border-slate-700'
                    : p.lightIconColor
                }`}>
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className={`font-semibold text-xs leading-snug line-clamp-2 transition-colors ${
                isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-900 group-hover:text-blue-700'
              }`}>
                {p.title}
              </p>
              <div className={`mt-2 flex items-center gap-2 text-[11px] font-medium ${
                isDark ? 'text-zinc-400' : 'text-slate-500'
              }`}>
                <span>{p.grade}</span>
                <span>•</span>
                <span>{p.duration} mins</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
