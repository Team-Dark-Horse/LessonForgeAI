import React, { useState, useEffect } from 'react';
import { type User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
} from './services/firebase';
import { exportLessonTriadToWorkspace } from './services/workspace';
import type {
  GeneratedLessonTriad,
  LessonPlannerParameters,
  ExportResults,
  AppNavView,
  ThemeMode,
  RecentDraft,
} from './types';
import {
  INITIAL_PARAMETERS,
  INITIAL_TRIAD,
  RECENT_DRAFTS,
} from './data/initialLesson';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardBanner } from './components/DashboardBanner';
import { StatsDashboardView } from './components/StatsDashboardView';
import { CreateLessonCard } from './components/CreateLessonCard';
import { ConnectedWorkspaceCard } from './components/ConnectedWorkspaceCard';
import { RecentDraftsCard } from './components/RecentDraftsCard';
import { LessonPlanDocView } from './components/LessonPlanDocView';
import { WorksheetDocView } from './components/WorksheetDocView';
import { QuizFormView } from './components/QuizFormView';
import { EditorSidebar } from './components/EditorSidebar';
import { ExportProgressModal } from './components/ExportProgressModal';
import { ExportResultsModal } from './components/ExportResultsModal';
import { DifferentiatedModal } from './components/DifferentiatedModal';
import { LibraryView } from './components/LibraryView';
import { ClassesView } from './components/ClassesView';
import { StandardsView } from './components/StandardsView';
import { downloadLessonPlanPDF } from './utils/pdfGenerator';

import {
  FileText,
  HelpCircle,
  HardDrive,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Bookmark,
  ArrowRight,
  AlertCircle,
  ExternalLink,
  BookOpen,
  ChevronRight,
  X,
  Settings,
  Download,
  Check,
  PanelRightOpen,
  PanelRightClose,
} from 'lucide-react';

export default function App() {
  // Navigation & Theme
  const [currentView, setCurrentView] = useState<AppNavView>('create');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('app_theme') as ThemeMode | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });
  const isDark = theme === 'dark';
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isEditorSidebarCollapsed, setIsEditorSidebarCollapsed] = useState(false);

  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Lesson planner data state
  const [parameters, setParameters] = useState<LessonPlannerParameters>(INITIAL_PARAMETERS);
  const [triad, setTriad] = useState<GeneratedLessonTriad>(INITIAL_TRIAD);
  const [recentDrafts, setRecentDrafts] = useState<RecentDraft[]>(RECENT_DRAFTS);
  const [editorTab, setEditorTab] = useState<'lessonPlan' | 'worksheet' | 'quiz'>('lessonPlan');

  // Generation telemetry & state
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Export pipeline state
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStep, setExportStep] = useState(1);
  const [exportResults, setExportResults] = useState<ExportResults | null>(null);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

  // PDF download state
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfDownloadToast, setPdfDownloadToast] = useState(false);

  // Differentiation modal state
  const [isDifferentiateModalOpen, setIsDifferentiateModalOpen] = useState(false);
  const [isDifferentiating, setIsDifferentiating] = useState(false);

  // Standards selection modal
  const [isStandardsModalOpen, setIsStandardsModalOpen] = useState(false);

  // Search filter
  const [globalSearch, setGlobalSearch] = useState('');

  // Sync theme with document element class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Listen to system color scheme changes if user hasn't explicitly set a preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDeviceThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('app_theme');
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleDeviceThemeChange);
    return () => mediaQuery.removeEventListener('change', handleDeviceThemeChange);
  }, []);

  // Initialize auth listener on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (authUser, token) => {
        setUser(authUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('app_theme', next);
      } catch (e) {
        // ignore storage errors
      }
      return next;
    });
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setErrorMessage(err.message || 'Failed to authenticate with Google Account.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
  };

  // Generation Handler
  const handleGenerate = async (topicOverride?: string) => {
    const topicToUse = (typeof topicOverride === 'string' && topicOverride.trim()) ? topicOverride.trim() : parameters.topic.trim();
    if (!topicToUse) {
      setErrorMessage('Please enter a lesson topic before generating.');
      return;
    }

    const currentParams = { ...parameters, topic: topicToUse };
    setParameters(currentParams);
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentParams),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate curriculum triad.');
      }

      const data = await res.json();
      if (data.payload) {
        setTriad(data.payload);
        // Add to recent drafts
        const newDraft: RecentDraft = {
          id: `draft-${Date.now()}`,
          title: data.payload.lessonPlan.title || topicToUse,
          grade: currentParams.gradeLevel,
          subject: currentParams.category || 'Science',
          timeAgo: 'Just now',
          status: 'READY',
          parameters: { ...currentParams },
          triad: data.payload,
        };
        setRecentDrafts((prev) => [newDraft, ...prev.slice(0, 5)]);

        // Navigate directly to Interactive Editor on the Study Material & Worksheet tab
        setCurrentView('editor');
        setEditorTab('worksheet');
      }
    } catch (err: any) {
      console.error('Generation failed:', err);
      setErrorMessage(err.message || 'Generation error encountered. Please check inputs and retry.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Perform Google Workspace Export Pipeline with Animated Progress (Image 2)
  const handleExecuteExport = async () => {
    let token = accessToken || (await getAccessToken());

    // Prompt login if not authenticated
    if (!user || !token) {
      setIsLoggingIn(true);
      try {
        const result = await googleSignIn();
        if (result) {
          setUser(result.user);
          setAccessToken(result.accessToken);
          token = result.accessToken;
        } else {
          return;
        }
      } catch (err: any) {
        setErrorMessage('Google Authentication required to create files in your Google Drive.');
        setIsLoggingIn(false);
        return;
      } finally {
        setIsLoggingIn(false);
      }
    }

    if (!token) return;

    setIsExporting(true);
    setExportProgress(15);
    setExportStep(1);
    setErrorMessage(null);

    try {
      // Step 1: Lesson plan doc
      setExportProgress(35);
      setExportStep(2);

      // Step 2: Worksheet doc
      setExportProgress(65);
      setExportStep(3);

      const results = await exportLessonTriadToWorkspace(
        triad.lessonPlan,
        triad.worksheet,
        triad.quiz,
        parameters.topic,
        parameters.gradeLevel,
        token,
        (msg) => {
          if (msg.includes('Worksheet')) {
            setExportProgress(55);
            setExportStep(2);
          } else if (msg.includes('Quiz') || msg.includes('Form')) {
            setExportProgress(80);
            setExportStep(3);
          }
        }
      );

      setExportProgress(100);
      setExportResults(results);

      // Update draft status to EXPORTED
      setRecentDrafts((prev) =>
        prev.map((d) =>
          d.title.includes(parameters.topic) || parameters.topic.includes(d.title)
            ? { ...d, status: 'EXPORTED' }
            : d
        )
      );

      // Short delay so user sees 100% completion in progress modal
      setTimeout(() => {
        setIsExporting(false);
        setIsResultsModalOpen(true);
      }, 500);
    } catch (err: any) {
      console.error('Workspace Export Error:', err);
      setErrorMessage(`Google Workspace export failed: ${err.message || 'Unknown error'}`);
      setIsExporting(false);
    }
  };

  const handleSelectDraft = (draft: RecentDraft) => {
    setParameters(draft.parameters);
    setTriad(draft.triad);
    setCurrentView('editor');
    setEditorTab('lessonPlan');
  };

  const handleApplyDifferentiated = (adaptedWorksheet: any) => {
    setTriad((prev) => ({
      ...prev,
      worksheet: adaptedWorksheet,
    }));
    setIsDifferentiateModalOpen(false);
  };

  const handleDownloadPDF = async () => {
    try {
      setIsDownloadingPdf(true);
      // Small pause to allow UI spinner state to reflect
      await new Promise((resolve) => setTimeout(resolve, 300));
      downloadLessonPlanPDF(triad.lessonPlan);
      setPdfDownloadToast(true);
      setTimeout(() => setPdfDownloadToast(false), 3000);
    } catch (err: any) {
      console.error('Failed to generate PDF:', err);
      setErrorMessage(`PDF export failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex ${
        isDark
          ? 'bg-[#08090c] text-slate-100 selection:bg-slate-300 selection:text-slate-900'
          : 'bg-[#f8fafc] text-slate-900'
      } font-sans transition-colors duration-200`}
    >
      {/* 1. Left Sidebar (Images 1 & 11) */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        theme={theme}
        userEmail={user?.email || null}
        onSignIn={handleLogin}
        onSignOut={handleLogout}
        isEditorActive={Boolean(triad)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header (Images 7 & 11) */}
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          userEmail={user?.email || null}
          onSignIn={handleLogin}
          onSignOut={handleLogout}
          searchTerm={globalSearch}
          onSearchChange={(t) => setGlobalSearch(t)}
          onTopicSearchSubmit={(topic) => handleGenerate(topic)}
          onQuickOpenDrive={() => {
            if (exportResults?.folderUrl) {
              window.open(exportResults.folderUrl, '_blank');
            } else {
              window.open('https://drive.google.com', '_blank');
            }
          }}
        />

        {/* Notice / Error Banner */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-4 rounded-xl border flex items-start justify-between gap-3 text-xs animate-in fade-in transition-all bg-rose-50 border-rose-200 text-rose-800 dark:bg-[#120808] dark:border-rose-900/60 dark:text-rose-200">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Notice</p>
                <p className="mt-0.5 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="font-bold text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-200 p-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* View Router */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* VIEW A: Create & Plan Dashboard (Image 7) */}
          {currentView === 'create' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Welcome Banner */}
              <DashboardBanner
                theme={theme}
                userEmail={user?.email || null}
                onNewTemplate={() => {
                  setParameters({
                    topic: 'Cell Structure and Functions (Fundamental Unit of Life)',
                    gradeLevel: 'Class 9',
                    durationMinutes: 45,
                    category: 'Life Science',
                    standard: 'NCERT SCI-09-CH05',
                    includeEllAdaptations: true,
                  });
                }}
                onVersionHistory={() => setCurrentView('library')}
                onViewStats={() => setCurrentView('stats')}
              />

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Create New Lesson Pack Card (7 Cols) */}
                <div className="lg:col-span-7">
                  <CreateLessonCard
                    theme={theme}
                    parameters={parameters}
                    onParametersChange={(p) => setParameters(p)}
                    onGenerate={() => handleGenerate()}
                    isGenerating={isGenerating}
                    onOpenStandardModal={() => setIsStandardsModalOpen(true)}
                  />
                </div>

                {/* Right Column: Connected Workspace + Recent Drafts (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <ConnectedWorkspaceCard
                    theme={theme}
                    userEmail={user?.email || null}
                    onManage={handleLogin}
                  />

                  <RecentDraftsCard
                    theme={theme}
                    drafts={recentDrafts}
                    onSelectDraft={handleSelectDraft}
                    onViewAll={() => setCurrentView('library')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* VIEW B: Interactive Editor (Images 11 & 13) */}
          {currentView === 'editor' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Breadcrumb & Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
                    <span
                      className="cursor-pointer hover:text-blue-500 transition-colors"
                      onClick={() => setCurrentView('library')}
                    >
                      My Library
                    </span>
                    <span>/</span>
                    <span
                      className="cursor-pointer hover:text-blue-500 transition-colors"
                      onClick={() => setCurrentView('classes')}
                    >
                      Science 8
                    </span>
                    <span>/</span>
                    <span className="text-slate-700 dark:text-slate-200 font-bold truncate max-w-xs">
                      {parameters.topic}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <h1
                      className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {triad.lessonPlan.title || parameters.topic} — {parameters.gradeLevel}
                    </h1>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Draft ready for export
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                      Gemini 1.5 Pro EDU
                    </span>
                  </div>
                </div>

                {/* Top Action Buttons (Image 11) */}
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <button
                    onClick={() => handleGenerate()}
                    disabled={isGenerating}
                    title="Regenerate with Gemini AI"
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isDark
                        ? 'gold-outline-btn'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>Regenerate</span>
                  </button>

                  <button
                    onClick={() => {
                      alert('Draft saved to Westbrook local memory and auto-sync queue!');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isDark
                        ? 'gold-outline-btn'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isDark ? 'text-slate-300' : ''}`} />
                    <span>Save Draft</span>
                  </button>

                  {/* Download PDF Directly from Editor View */}
                  <button
                    id="download-lesson-plan-pdf-btn"
                    onClick={handleDownloadPDF}
                    disabled={isDownloadingPdf}
                    title="Download complete lesson plan as a PDF file directly"
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 ${
                      isDark
                        ? 'gold-outline-btn text-slate-200 hover:text-white'
                        : 'bg-white border border-slate-200 text-slate-800 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 shadow-xs'
                    }`}
                  >
                    {isDownloadingPdf ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-300" />
                    ) : pdfDownloadToast ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Download className={`w-3.5 h-3.5 ${isDark ? 'text-slate-300' : ''}`} />
                    )}
                    <span>
                      {pdfDownloadToast
                        ? 'PDF Downloaded!'
                        : isDownloadingPdf
                        ? 'Creating PDF...'
                        : 'Download PDF'}
                    </span>
                  </button>

                  {/* Primary Export to Drive CTA */}
                  <button
                    onClick={handleExecuteExport}
                    disabled={isExporting}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 ${
                      isDark
                        ? 'gold-metallic-btn'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                    }`}
                  >
                    <HardDrive className="w-4 h-4" />
                    <span>Export to Google Drive</span>
                  </button>
                </div>
              </div>

              {/* Secondary Tab Strip (Image 11) */}
              <div
                className={`flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-xl border ${
                  isDark ? 'bg-[#0b0c10] border-slate-700/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_4px_12px_rgba(0,0,0,0.5)]' : 'bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditorTab('lessonPlan')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      editorTab === 'lessonPlan'
                        ? isDark
                          ? 'bg-gradient-to-b from-[#252831] to-[#14161c] text-slate-100 border border-slate-400/40 shadow-[0_2px_10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(226,232,240,0.2)]'
                          : 'bg-white text-blue-700 shadow-xs'
                        : isDark
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-slate-300 shadow-[0_0_6px_rgba(203,213,225,0.5)]' : 'bg-blue-500'}`} />
                    <FileText className="w-3.5 h-3.5" />
                    <span>Lesson Plan (Doc)</span>
                  </button>

                  <button
                    onClick={() => setEditorTab('worksheet')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      editorTab === 'worksheet'
                        ? isDark
                          ? 'bg-gradient-to-b from-[#252831] to-[#14161c] text-slate-100 border border-slate-400/40 shadow-[0_2px_10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(226,232,240,0.2)]'
                          : 'bg-white text-emerald-800 shadow-xs'
                        : isDark
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Study Material & Worksheet</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      isDark
                        ? 'gold-badge'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      PRINTABLE
                    </span>
                  </button>

                  <button
                    onClick={() => setEditorTab('quiz')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      editorTab === 'quiz'
                        ? isDark
                          ? 'bg-gradient-to-b from-[#252831] to-[#14161c] text-slate-100 border border-slate-400/40 shadow-[0_2px_10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(226,232,240,0.2)]'
                          : 'bg-white text-purple-800 shadow-xs'
                        : isDark
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>5-Question Quiz (Form)</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      isDark
                        ? 'gold-badge'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      5 Qs
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-3 px-3 text-[11px] text-zinc-400 font-medium">
                  <span className={`flex items-center gap-1 font-semibold ${
                    isDark ? 'text-slate-300' : 'text-emerald-600'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      isDark ? 'bg-slate-300 shadow-[0_0_6px_rgba(203,213,225,0.4)]' : 'bg-emerald-500'
                    }`} />
                    Drive auto-sync active
                  </span>
                  <span>•</span>
                  <span>{parameters.durationMinutes} min curriculum unit</span>
                  <span>•</span>
                  <button
                    id="toggle-editor-sidepanel-button"
                    onClick={() => setIsEditorSidebarCollapsed((prev) => !prev)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                      isEditorSidebarCollapsed
                        ? isDark
                          ? 'gold-metallic-btn text-slate-900 shadow-sm'
                          : 'bg-blue-50 text-blue-700 border-blue-200 shadow-xs'
                        : isDark
                        ? 'border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                    title={isEditorSidebarCollapsed ? "Expand Curriculum Side Panel" : "Collapse Curriculum Side Panel"}
                    aria-label={isEditorSidebarCollapsed ? "Expand Curriculum Side Panel" : "Collapse Curriculum Side Panel"}
                  >
                    {isEditorSidebarCollapsed ? (
                      <>
                        <PanelRightOpen className="w-3.5 h-3.5" />
                        <span>Expand Panel</span>
                      </>
                    ) : (
                      <>
                        <PanelRightClose className="w-3.5 h-3.5" />
                        <span>Side Panel</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Editor Workspace: Main Document View + Right Sidebar (Image 11) */}
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Left: Active Tab Sheet */}
                <div className="flex-1 min-w-0 w-full">
                  {editorTab === 'lessonPlan' && (
                    <LessonPlanDocView
                      theme={theme}
                      lessonPlan={triad.lessonPlan}
                      onChange={(updated) => setTriad({ ...triad, lessonPlan: updated })}
                      onGoToWorksheet={() => setEditorTab('worksheet')}
                      onDownloadPDF={handleDownloadPDF}
                    />
                  )}

                  {editorTab === 'worksheet' && (
                    <WorksheetDocView
                      theme={theme}
                      worksheet={triad.worksheet}
                      onChange={(updated) => setTriad({ ...triad, worksheet: updated })}
                      onDifferentiate={() => setIsDifferentiateModalOpen(true)}
                      isDifferentiating={isDifferentiating}
                    />
                  )}

                  {editorTab === 'quiz' && (
                    <QuizFormView
                      theme={theme}
                      quiz={triad.quiz}
                      onChange={(updated) => setTriad({ ...triad, quiz: updated })}
                      onExportDrive={handleExecuteExport}
                    />
                  )}
                </div>

                {/* Right: Module Summary & Workspace Settings Sidebar (Image 11) */}
                <EditorSidebar
                  theme={theme}
                  triad={triad}
                  userEmail={user?.email || null}
                  isCollapsed={isEditorSidebarCollapsed}
                  onToggleCollapse={() => setIsEditorSidebarCollapsed((prev) => !prev)}
                  onDifferentiate={() => setIsDifferentiateModalOpen(true)}
                  onAddKinesthetic={() => {
                    alert('Added kinesthetic lab simulation prompts to Guided Practice!');
                  }}
                  onExport={handleExecuteExport}
                  onDownloadPDF={handleDownloadPDF}
                />
              </div>
            </div>
          )}

          {/* VIEW C: Dedicated Stat Dashboard & Performance Telemetry */}
          {currentView === 'stats' && (
            <StatsDashboardView
              theme={theme}
              onNavigateToCreate={() => setCurrentView('create')}
            />
          )}

          {/* VIEW D: My Library View */}
          {currentView === 'library' && (
            <LibraryView
              theme={theme}
              drafts={recentDrafts}
              onSelectDraft={handleSelectDraft}
              onCreateNew={() => setCurrentView('create')}
            />
          )}

          {/* VIEW D: Classes & Sections View */}
          {currentView === 'classes' && <ClassesView theme={theme} />}

          {/* VIEW E: Curriculum Standards View */}
          {currentView === 'standards' && (
            <StandardsView
              theme={theme}
              onSelectStandard={(code, desc) => {
                setParameters({
                  ...parameters,
                  standard: `${code}: ${desc}`,
                });
                setCurrentView('create');
              }}
            />
          )}

          {/* VIEW F: Settings View */}
          {currentView === 'settings' && (
            <div
              className={`max-w-2xl mx-auto p-6 rounded-2xl border ${
                isDark ? 'gold-bevel-card text-zinc-100' : 'bg-white border-slate-200'
              } space-y-6`}
            >
              <h2 className={`text-xl font-bold ${isDark ? 'gold-gradient-text' : ''}`}>Teacher Workspace Settings</h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className={`font-bold block mb-1 ${isDark ? 'text-white' : ''}`}>Teacher Account:</label>
                  <p className={isDark ? 'text-zinc-400' : 'text-slate-500'}>
                    {user?.email || 'sjenkins@westbrook.edu (Westbrook Middle School EDU)'}
                  </p>
                </div>

                <div>
                  <label className={`font-bold block mb-1 ${isDark ? 'text-white' : ''}`}>Target Google Drive Folder:</label>
                  <input
                    type="text"
                    defaultValue="/My Drive/PlanCraft AI/Science 8"
                    className={`w-full p-2.5 rounded-xl border focus:outline-none ${
                      isDark ? 'gold-input' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`font-bold block mb-1 ${isDark ? 'text-white' : ''}`}>Preferred State / Framework:</label>
                  <select
                    className={`w-full p-2.5 rounded-xl border focus:outline-none ${
                      isDark ? 'gold-input' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option>NCERT National Curriculum Framework (CBSE / State Boards)</option>
                    <option>ICSE / CISCE Curriculum Framework</option>
                    <option>State Board Syllabus (SCERT)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => alert('Settings saved successfully!')}
                    className={`px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm ${
                      isDark
                        ? 'gold-metallic-btn'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: Export In Progress Modal (Image 2) */}
      {isExporting && (
        <ExportProgressModal
          theme={theme}
          progress={exportProgress}
          currentStep={exportStep}
          onCancel={() => setIsExporting(false)}
        />
      )}

      {/* MODAL 2: Export Results Success Modal (Image 9) */}
      {isResultsModalOpen && exportResults && (
        <ExportResultsModal
          theme={theme}
          results={exportResults}
          parameters={parameters}
          onClose={() => setIsResultsModalOpen(false)}
          onCreateAnother={() => {
            setIsResultsModalOpen(false);
            setCurrentView('create');
          }}
        />
      )}

      {/* MODAL 3: Differentiation Scaffolding Modal */}
      <DifferentiatedModal
        isOpen={isDifferentiateModalOpen}
        currentWorksheet={triad.worksheet}
        onApply={handleApplyDifferentiated}
        onClose={() => setIsDifferentiateModalOpen(false)}
        theme={theme}
      />

      {/* MODAL 4: Standards Picker Modal */}
      {isStandardsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div
            className={`w-full max-w-2xl p-6 rounded-2xl border shadow-2xl max-h-[85vh] overflow-y-auto ${
              isDark ? 'gold-bevel-card text-white' : 'bg-white border-slate-200'
            }`}
          >
            <div className={`flex items-center justify-between pb-4 border-b mb-4 ${
              isDark ? 'border-white/15' : 'border-slate-200'
            }`}>
              <h3 className={`text-base font-bold ${isDark ? 'gold-gradient-text' : ''}`}>Select Aligned Curriculum Standard</h3>
              <button onClick={() => setIsStandardsModalOpen(false)}>
                <X className={`w-5 h-5 ${isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-400'}`} />
              </button>
            </div>
            <StandardsView
              theme={theme}
              onSelectStandard={(code, desc) => {
                setParameters({
                  ...parameters,
                  standard: `${code}: ${desc}`,
                });
                setIsStandardsModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
