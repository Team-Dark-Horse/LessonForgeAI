import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Users,
  CheckCircle2,
  HardDrive,
  Sparkles,
  Calendar,
  ArrowUpRight,
  Download,
  RefreshCw,
  FileText,
  HelpCircle,
  FolderCheck,
  Zap,
} from 'lucide-react';
import type { ThemeMode } from '../types';
import { MetricCards } from './MetricCards';

interface StatsDashboardViewProps {
  theme: ThemeMode;
  onNavigateToCreate?: () => void;
}

export const StatsDashboardView: React.FC<StatsDashboardViewProps> = ({
  theme,
  onNavigateToCreate,
}) => {
  const isDark = theme === 'dark';
  const [timeRange, setTimeRange] = useState<'term' | 'month' | 'all'>('term');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const weeklyActivity = [
    { day: 'Mon', lessons: 5, worksheets: 5, quizzes: 4 },
    { day: 'Tue', lessons: 8, worksheets: 8, quizzes: 7 },
    { day: 'Wed', lessons: 12, worksheets: 11, quizzes: 10 },
    { day: 'Thu', lessons: 7, worksheets: 7, quizzes: 6 },
    { day: 'Fri', lessons: 9, worksheets: 9, quizzes: 8 },
  ];

  const subjectBreakdown = [
    { subject: 'Physical Science', count: 54, percentage: 38, color: 'bg-slate-300 shadow-[0_0_6px_rgba(203,213,225,0.4)]' },
    { subject: 'Life Science & Biology', count: 42, percentage: 29, color: 'bg-slate-400' },
    { subject: 'Earth & Space Systems', count: 28, percentage: 20, color: 'bg-emerald-400' },
    { subject: 'Engineering & Inquiry', count: 19, percentage: 13, color: 'bg-slate-600' },
  ];

  const cohorts = [
    { name: 'Period 1: Honors Biology', students: 34, mastery: '94%', completion: '98%', status: 'Ahead of Pace' },
    { name: 'Period 3: Physical Science', students: 32, mastery: '89%', completion: '96%', status: 'On Target' },
    { name: 'Period 4: Physical Science', students: 35, mastery: '91%', completion: '95%', status: 'On Target' },
    { name: 'Period 6: Earth & Space', students: 30, mastery: '87%', completion: '93%', status: 'Review Needed' },
  ];

  const recentSyncEvents = [
    {
      action: 'Study Material & Handout Exported',
      detail: 'Photosynthesis & Respiration Guide synced to Google Drive',
      time: '12 minutes ago',
      icon: FileText,
    },
    {
      action: 'Formative Assessment Published',
      detail: 'Newton’s Laws of Motion Quiz deployed to Classroom Period 3',
      time: '1 hour ago',
      icon: HelpCircle,
    },
    {
      action: 'Lesson Plan Adapted (ELL / IEP)',
      detail: 'Tiered scaffolding generated for Period 6 Earth Science',
      time: '3 hours ago',
      icon: Sparkles,
    },
    {
      action: 'Curriculum Standards Audited',
      detail: '100% NCERT Class 9 Science (Ch 9: Force & Laws of Motion) alignment verified',
      time: 'Yesterday',
      icon: FolderCheck,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                isDark ? 'gold-badge' : 'bg-slate-100 text-slate-800 border-slate-300'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-white" />
              <span>Dedicated Stat & Telemetry Dashboard</span>
            </span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                isDark ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              Live Telemetry
            </span>
          </div>

          <h1
            className={`text-2xl md:text-3xl font-black tracking-tight ${
              isDark ? 'gold-gradient-text' : 'text-slate-900'
            }`}
          >
            Curriculum & Performance Analytics
          </h1>
          <p className={`text-sm mt-1 max-w-2xl ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
            Track instructional velocity, educator hours saved, student mastery benchmarks, and Google Workspace integration health.
          </p>
        </div>

        {/* Range Controls & Export */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div
            className={`flex items-center p-1 rounded-xl border text-xs font-bold ${
              isDark ? 'bg-[#0a0a0d] border-white/10' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              onClick={() => setTimeRange('term')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === 'term'
                  ? isDark
                    ? 'gold-metallic-btn text-black !py-1 !px-3'
                    : 'bg-white text-slate-900 shadow-xs'
                  : isDark
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Spring 2025
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === 'month'
                  ? isDark
                    ? 'gold-metallic-btn text-black !py-1 !px-3'
                    : 'bg-white text-slate-900 shadow-xs'
                  : isDark
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === 'all'
                  ? isDark
                    ? 'gold-metallic-btn text-black !py-1 !px-3'
                    : 'bg-white text-slate-900 shadow-xs'
                  : isDark
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Time
            </button>
          </div>

          <button
            onClick={handleRefresh}
            title="Refresh statistics"
            className={`p-2.5 rounded-xl border transition-all ${
              isDark
                ? 'gold-outline-btn'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-white' : ''}`} />
          </button>

          {onNavigateToCreate && (
            <button
              onClick={onNavigateToCreate}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isDark
                  ? 'gold-metallic-btn text-black'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Create New Topic</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary KPI Grid (The 4 Top Metrics) */}
      <MetricCards theme={theme} />

      {/* Main Analytics Content: 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Weekly Generation Output & Class Cohorts */}
        <div className="lg:col-span-7 space-y-6">
          {/* Weekly Creation Frequency Card */}
          <div
            className={`p-6 rounded-2xl border shadow-sm transition-all ${
              isDark ? 'gold-bevel-card text-zinc-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-sm font-extrabold uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-slate-800'
                }`}>
                  Instructional Generation Velocity
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  Curriculum assets generated by day of week
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-slate-300 shadow-[0_0_6px_rgba(203,213,225,0.4)]' : 'bg-blue-600'}`} />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Plans</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-slate-400' : 'bg-emerald-500'}`} />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Study Guides</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-slate-500' : 'bg-purple-500'}`} />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Quizzes</span>
                </span>
              </div>
            </div>

            {/* Bar Chart Representation */}
            <div className="space-y-4 pt-2">
              {weeklyActivity.map((item) => (
                <div key={item.day} className="flex items-center gap-3 text-xs">
                  <span className={`w-8 font-bold ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
                    {item.day}
                  </span>
                  <div className="flex-1 flex items-center gap-1.5 h-6">
                    <div
                      style={{ width: `${(item.lessons / 15) * 100}%` }}
                      className={`h-full rounded-md flex items-center justify-end pr-1.5 text-[10px] font-bold ${
                        isDark ? 'bg-slate-200 text-slate-900 shadow-[0_0_6px_rgba(203,213,225,0.3)]' : 'bg-blue-600 text-white'
                      }`}
                      title={`${item.lessons} Lesson Plans`}
                    >
                      {item.lessons}
                    </div>
                    <div
                      style={{ width: `${(item.worksheets / 15) * 100}%` }}
                      className={`h-full rounded-md flex items-center justify-end pr-1.5 text-[10px] font-bold ${
                        isDark ? 'bg-zinc-400 text-black' : 'bg-emerald-500 text-white'
                      }`}
                      title={`${item.worksheets} Study Guides`}
                    >
                      {item.worksheets}
                    </div>
                    <div
                      style={{ width: `${(item.quizzes / 15) * 100}%` }}
                      className={`h-full rounded-md flex items-center justify-end pr-1.5 text-[10px] font-bold ${
                        isDark ? 'bg-zinc-600 text-white' : 'bg-purple-500 text-white'
                      }`}
                      title={`${item.quizzes} Quizzes`}
                    >
                      {item.quizzes}
                    </div>
                  </div>
                  <span className={`w-10 text-right text-[11px] font-semibold ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>
                    {item.lessons + item.worksheets + item.quizzes} total
                  </span>
                </div>
              ))}
            </div>

            <div className={`mt-5 pt-4 border-t flex flex-wrap items-center justify-between text-xs ${
              isDark ? 'border-white/10 text-zinc-400' : 'border-slate-100 text-slate-500'
            }`}>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Peak productivity on Wednesdays (12 lesson triads generated)</span>
              </span>
              <span className="font-semibold">Average prep time: &lt; 2.8 mins</span>
            </div>
          </div>

          {/* Class Cohorts & Mastery Table */}
          <div
            className={`p-6 rounded-2xl border shadow-sm transition-all ${
              isDark ? 'gold-bevel-card text-zinc-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-sm font-extrabold uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-slate-800'
                }`}>
                  Class Cohort Mastery Benchmarks
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  Formative check results synchronized from Google Forms & Classroom
                </p>
              </div>
              <Users className={`w-4 h-4 ${isDark ? 'text-white' : 'text-blue-600'}`} />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b text-[11px] uppercase tracking-wider ${
                    isDark ? 'border-white/10 text-zinc-400' : 'border-slate-200 text-slate-500'
                  }`}>
                    <th className="pb-2.5 font-bold">Class Section</th>
                    <th className="pb-2.5 font-bold">Students</th>
                    <th className="pb-2.5 font-bold">Form Mastery</th>
                    <th className="pb-2.5 font-bold">Completion</th>
                    <th className="pb-2.5 font-bold text-right">Pace Status</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
                  {cohorts.map((cohort, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 font-semibold text-zinc-100 dark:text-zinc-200">{cohort.name}</td>
                      <td className="py-3 text-zinc-400">{cohort.students} Learners</td>
                      <td className="py-3">
                        <span className={`font-black ${isDark ? 'text-slate-200' : 'text-blue-600'}`}>
                          {cohort.mastery}
                        </span>
                      </td>
                      <td className="py-3 text-emerald-400 font-semibold">{cohort.completion}</td>
                      <td className="py-3 text-right">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            cohort.status === 'Ahead of Pace'
                              ? isDark
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                                : 'bg-emerald-100 text-emerald-800'
                              : cohort.status === 'On Target'
                              ? isDark
                                ? 'bg-white/10 text-white border border-white/20'
                                : 'bg-blue-100 text-blue-800'
                              : isDark
                              ? 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {cohort.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Subject Distribution & Sync Log */}
        <div className="lg:col-span-5 space-y-6">
          {/* Subject Distribution */}
          <div
            className={`p-6 rounded-2xl border shadow-sm transition-all ${
              isDark ? 'gold-bevel-card text-zinc-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <h3 className={`text-sm font-extrabold uppercase tracking-wider mb-1 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              Curriculum Domain Breakdown
            </h3>
            <p className={`text-xs mb-4 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              Total 147 lesson triads categorized by scientific domain
            </p>

            <div className="space-y-3.5">
              {subjectBreakdown.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold">{item.subject}</span>
                    <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-slate-700'}`}>
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                    <div
                      style={{ width: `${item.percentage}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-5 p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
              isDark ? 'bg-[#0a0a0d] border-white/10 text-zinc-300' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Standard alignment coverage currently spans 100% of required NCERT Science and Biology competencies for 9th Grade.
              </span>
            </div>
          </div>

          {/* Google Workspace Telemetry & Health */}
          <div
            className={`p-6 rounded-2xl border shadow-sm transition-all ${
              isDark ? 'gold-bevel-card text-zinc-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-extrabold uppercase tracking-wider ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>
                Google Workspace Health
              </h3>
              <HardDrive className={`w-4 h-4 ${isDark ? 'text-white' : 'text-blue-600'}`} />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#0a0a0d] border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[11px] block font-semibold ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  Drive Export Speed
                </span>
                <span className="text-lg font-black text-emerald-400">1.4s</span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">Average API roundtrip</span>
              </div>

              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#0a0a0d] border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[11px] block font-semibold ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  Sync Success Rate
                </span>
                <span className="text-lg font-black text-emerald-400">100%</span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">0 API sync drops</span>
              </div>
            </div>

            {/* Sync Activity Feed */}
            <div className="space-y-3">
              <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                isDark ? 'text-zinc-400' : 'text-slate-400'
              }`}>
                Recent Workspace Actions
              </span>
              {recentSyncEvents.map((ev, idx) => {
                const IconComponent = ev.icon;
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                      isDark ? 'bg-[#0a0a0d] border-white/10' : 'bg-slate-50/70 border-slate-200'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isDark ? 'gold-metallic-btn !w-7 !h-7 !p-0 text-black' : 'bg-blue-100 text-blue-700'
                    }`}>
                      <IconComponent className="w-3.5 h-3.5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{ev.action}</p>
                      <p className={`text-[11px] truncate mt-0.5 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                        {ev.detail}
                      </p>
                      <span className="text-[10px] text-zinc-500 mt-1 block">{ev.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
