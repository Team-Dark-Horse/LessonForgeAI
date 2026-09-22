export interface LessonPlanAgendaItem {
  segment: string; // e.g. "Hook & Phenomenon", "Direct Instruction", "Guided Practice / Collaborative Lab", "Independent Practice", "Formative Assessment"
  minutes: number;
  timeRange?: string; // e.g. "0-10 min", "10-25 min"
  instructions: string; // Teacher Script / Guidance
  studentActivity?: string; // Student Activity
}

export interface MaterialItem {
  name: string;
  quantity?: string;
  category?: 'lab' | 'tech' | 'print' | 'general';
}

export interface LessonPlanPayload {
  title: string;
  gradeLevel: string;
  durationMinutes: number;
  standardsOverview: string;
  subject?: string;
  cohort?: string;
  focus?: string;
  objectives: string[];
  materials: string[];
  materialsList?: MaterialItem[];
  agenda: LessonPlanAgendaItem[];
}

export interface VocabularyItem {
  term: string;
  definition: string;
}

export interface WorksheetExercise {
  questionNumber: number;
  prompt: string;
  answerLines: number;
  sampleAnswer?: string;
}

export interface WorksheetPayload {
  title: string;
  subtitle: string;
  instructions: string;
  conceptSummary?: string;
  keyTakeaways?: string[];
  studyNotes?: string;
  vocabulary: VocabularyItem[];
  exercises: WorksheetExercise[];
}

export interface QuizQuestion {
  id?: string;
  prompt: string;
  options: string[]; // Exactly 4 options
  correctIndex: number; // 0 to 3
  explanation: string;
  distractorRationale?: string; // AI insight explaining why students pick common distractors
  standard?: string; // e.g. "NCERT SCI-09-CH09"
  dokLevel?: string; // e.g. "DOK Level 2"
  questionType?: string; // e.g. "Multiple Choice"
}

export interface QuizPayload {
  title: string;
  description: string;
  questions: QuizQuestion[];
  totalPoints?: number;
  autoGrading?: boolean;
  shuffleOptions?: boolean;
}

export interface GeneratedLessonTriad {
  lessonPlan: LessonPlanPayload;
  worksheet: WorksheetPayload;
  quiz: QuizPayload;
}

export type CurriculumTriad = GeneratedLessonTriad;

export interface LessonPlannerParameters {
  topic: string;
  gradeLevel: string;
  durationMinutes: number;
  category?: string;
  standard?: string;
  includeEllAdaptations?: boolean;
}

export type LessonGenerationParams = LessonPlannerParameters;

export interface ExportResults {
  folderId?: string;
  folderUrl?: string;
  lessonPlanDocId: string;
  lessonPlanDocUrl: string;
  worksheetDocId: string;
  worksheetDocUrl: string;
  quizFormId: string;
  quizFormEditUrl: string;
  quizFormPublicUrl: string;
  exportedAt: string;
}

export interface LessonPlannerSession {
  sessionId: string;
  userId?: string;
  parameters: LessonPlannerParameters;
  payload: GeneratedLessonTriad;
  exportResults?: ExportResults;
}

export interface RecentDraft {
  id: string;
  title: string;
  grade: string;
  subject: string;
  timeAgo: string;
  status: 'EXPORTED' | 'DRAFT' | 'READY';
  parameters: LessonPlannerParameters;
  triad: GeneratedLessonTriad;
}

export type AppNavView =
  | 'create' // Create New Lesson Pack (Image 7 & Image 3)
  | 'editor' // Interactive Lesson Editor (Image 11 & Image 1)
  | 'stats' // Dedicated Stat Dashboard & Performance Telemetry
  | 'library' // My Library
  | 'classes' // Classes & Sections
  | 'standards' // Curriculum Standards
  | 'settings'; // Settings

export type ThemeMode = 'light' | 'dark';
