import React, { useState } from 'react';
import { Sparkles, Clock, GraduationCap, Search, Loader2 } from 'lucide-react';
import type { LessonPlannerParameters } from '../types';
import { TeacherPersonaPresets } from './TeacherPersonaPresets';

interface ParameterFormProps {
  initialValues?: LessonPlannerParameters;
  isGenerating: boolean;
  onSubmit: (params: LessonPlannerParameters) => void;
}

const GRADE_LEVELS = [
  'Kindergarten',
  '1st Grade',
  '2nd Grade',
  '3rd Grade',
  '4th Grade',
  '5th Grade',
  '6th Grade',
  '7th Grade',
  '8th Grade',
  '9th Grade (Freshman)',
  '10th Grade (Sophomore)',
  '11th Grade (Junior)',
  '12th Grade (Senior)',
  'Undergraduate / Introductory',
];

const DURATION_PRESETS = [30, 45, 50, 60, 90];

export const ParameterForm: React.FC<ParameterFormProps> = ({
  initialValues,
  isGenerating,
  onSubmit,
}) => {
  const [topic, setTopic] = useState(initialValues?.topic || "Newton's Third Law: Action and Reaction Forces");
  const [gradeLevel, setGradeLevel] = useState(initialValues?.gradeLevel || '8th Grade');
  const [durationMinutes, setDurationMinutes] = useState(initialValues?.durationMinutes || 45);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubmit({
      topic: topic.trim(),
      gradeLevel,
      durationMinutes: Number(durationMinutes),
    });
  };

  const handleSelectPreset = (params: LessonPlannerParameters) => {
    setTopic(params.topic);
    setGradeLevel(params.gradeLevel);
    setDurationMinutes(params.durationMinutes);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Curriculum Generator</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              Zero-Prompt Entry
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Supply your topic, grade, and duration. Gemini will synthesize a synchronized Lesson Plan, Student Worksheet, and Self-Grading Quiz.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Topic Input */}
          <div className="md:col-span-6 space-y-1.5">
            <label htmlFor="topic-input" className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-blue-600" />
              <span>Instructional Topic or Unit Concept</span>
            </label>
            <input
              id="topic-input"
              type="text"
              required
              disabled={isGenerating}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Photosynthesis & Cellular Respiration, Pythagorean Theorem, Tone & Mood..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400"
            />
          </div>

          {/* Grade Level Selector */}
          <div className="md:col-span-3 space-y-1.5">
            <label htmlFor="grade-select" className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>Target Grade Level</span>
            </label>
            <select
              id="grade-select"
              disabled={isGenerating}
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
            >
              {GRADE_LEVELS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Selector */}
          <div className="md:col-span-3 space-y-1.5">
            <label htmlFor="duration-input" className="block text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Class Duration</span>
              </span>
              <span className="text-blue-700 font-bold text-xs">{durationMinutes} min</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                id="duration-input"
                type="range"
                min={15}
                max={180}
                step={5}
                disabled={isGenerating}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <input
                type="number"
                min={15}
                max={180}
                disabled={isGenerating}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Math.max(15, Math.min(180, Number(e.target.value) || 15)))}
                className="w-16 px-2 py-1.5 text-center text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        {/* Duration Quick Chips & Generate Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-medium text-slate-400 mr-1">Duration Presets:</span>
            {DURATION_PRESETS.map((d) => (
              <button
                key={d}
                type="button"
                disabled={isGenerating}
                onClick={() => setDurationMinutes(d)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                  durationMinutes === d
                    ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {d}m
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isGenerating || !topic.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-semibold text-sm shadow-sm transition-all cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating Curriculum Triad...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Curriculum Triad</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Teacher Persona Pre-fills from PRD */}
      <TeacherPersonaPresets onSelect={handleSelectPreset} disabled={isGenerating} />
    </div>
  );
};
