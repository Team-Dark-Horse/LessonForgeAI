import React from 'react';
import { Users, Clock, Calendar, BookOpen, ExternalLink, HardDrive } from 'lucide-react';
import type { ThemeMode } from '../types';

interface ClassesViewProps {
  theme: ThemeMode;
}

export const ClassesView: React.FC<ClassesViewProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const cohorts = [
    {
      period: 'Period 1',
      name: '8th Grade Integrated Science (Honors)',
      room: 'Room 204 • Science Wing',
      students: 28,
      time: '8:15 AM - 9:00 AM',
      nextTopic: "Newton's Third Law & Momentum",
      classroomLinked: true,
    },
    {
      period: 'Period 2',
      name: '8th Grade Physical Science',
      room: 'Room 204 • Science Wing',
      students: 31,
      time: '9:05 AM - 9:50 AM',
      nextTopic: 'Newtonian Force Vector Diagrams',
      classroomLinked: true,
    },
    {
      period: 'Period 4',
      name: '7th Grade Life Science',
      room: 'Room 204 • Science Wing',
      students: 29,
      time: '11:15 AM - 12:00 PM',
      nextTopic: 'Cellular Respiration ATP Lab',
      classroomLinked: true,
    },
    {
      period: 'Period 6',
      name: '8th Grade Science Inquiry Lab Block',
      room: 'Lab B • Chemistry Wing',
      students: 26,
      time: '1:30 PM - 2:45 PM',
      nextTopic: 'Balloon Rocket Thrust Experiments',
      classroomLinked: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
          Classes & Classroom Cohorts
        </h2>
        <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
          Westbrook Middle School teacher schedule and connected Google Classroom cohorts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cohorts.map((c) => (
          <div
            key={c.period}
            className={`p-5 rounded-2xl border transition-all ${
              isDark ? 'gold-bevel-card' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className={`flex items-center justify-between pb-3 border-b mb-3 ${
              isDark ? 'border-white/15' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-black px-2 py-0.5 rounded ${
                  isDark ? 'gold-badge' : 'bg-blue-100 text-blue-800'
                }`}>
                  {c.period}
                </span>
                <span className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  {c.time}
                </span>
              </div>
              <span className={`text-[11px] font-bold flex items-center gap-1 ${
                isDark ? 'text-slate-300' : 'text-emerald-600'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-slate-300 shadow-[0_0_6px_rgba(203,213,225,0.4)]' : 'bg-emerald-500'}`} />
                Classroom Linked
              </span>
            </div>

            <h3 className={`text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              {c.name}
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{c.room}</p>

            <div className={`mt-4 p-3 rounded-xl border text-xs ${
              isDark ? 'bg-[#0d0f14] border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Next Scheduled Unit:</span>
              <p className={`font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{c.nextTopic}</p>
            </div>

            <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}>
              <div className="flex items-center gap-1.5">
                <Users className={`w-3.5 h-3.5 ${isDark ? 'text-slate-300' : 'text-blue-500'}`} />
                <span>{c.students} Enrolled Students</span>
              </div>
              <a
                href="https://classroom.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-bold hover:underline flex items-center gap-1 ${
                  isDark ? 'text-slate-300 hover:text-white' : 'text-blue-600'
                }`}
              >
                <span>Classroom Roster</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
