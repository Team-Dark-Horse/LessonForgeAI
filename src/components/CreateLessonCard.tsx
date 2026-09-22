import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  Check,
  Bookmark,
  Info,
} from 'lucide-react';
import type { LessonGenerationParams, ThemeMode } from '../types';

interface CreateLessonCardProps {
  parameters: LessonGenerationParams;
  onParametersChange: (params: LessonGenerationParams) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  theme: ThemeMode;
  onOpenStandardModal?: () => void;
}

export const CreateLessonCard: React.FC<CreateLessonCardProps> = ({
  parameters,
  onParametersChange,
  onGenerate,
  isGenerating,
  theme,
  onOpenStandardModal,
}) => {
  const isDark = theme === 'dark';
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const categories = [
    'Life Science',
    'Physical Science',
    'Earth & Space Science',
    'English Language Arts',
    'Mathematics',
    'Social Studies',
  ];

  const currentCategory = parameters.category || 'Life Science';

  const suggestions = [
    '+ Cellular Respiration',
    '+ Mitosis vs. Meiosis',
    '+ Plate Tectonics & Faults',
    '+ Newton’s 3rd Law of Motion',
  ];

  const gradeBands = [
    { label: '6th Grade', lexile: '850L - 950L' },
    { label: '7th Grade', lexile: '950L - 1000L' },
    { label: '8th Grade', lexile: '1000L - 1050L' },
    { label: '9th Grade', lexile: '1050L - 1150L' },
  ];

  const durationPresets = [
    { label: '45 mins (Std)', value: 45 },
    { label: '60 mins', value: 60 },
    { label: '90 min Block', value: 90 },
  ];

  // AI Enhance Topic handler
  const handleEnhance = async () => {
    if (!parameters.topic.trim()) return;
    setIsEnhancing(true);
    try {
      const res = await fetch('/api/enhance-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: parameters.topic,
          gradeLevel: parameters.gradeLevel,
          category: currentCategory,
        }),
      });
      const data = await res.json();
      if (data.success && data.enhancedTopic) {
        onParametersChange({
          ...parameters,
          topic: data.enhancedTopic,
          standard: data.standardCode ? `${data.standardCode}: ${data.standardDescription || ''}` : parameters.standard,
        });
      }
    } catch (err) {
      console.warn('Enhance error:', err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSavePreset = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div
      className={`rounded-2xl border transition-all ${
        isDark
          ? 'gold-bevel-card text-zinc-200'
          : 'bg-white border-slate-200 shadow-sm text-slate-800'
      } p-6`}
    >
      {/* Header */}
      <div className={`flex items-start justify-between gap-4 pb-5 border-b ${
        isDark ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className={`text-lg font-black tracking-tight ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
              Create New Lesson Pack
            </h2>
            <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
              isDark
                ? 'gold-badge font-bold'
                : 'bg-blue-100 text-blue-700'
            }`}>
              Gemini EDU AI
            </span>
          </div>
          <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
            Powered by Gemini Education AI • Generates Teacher Doc, Printable Worksheet & Self-grading Form in seconds.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {/* 1. Core Topic or Lesson Objective */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}>
              <span>1. Core Topic or Lesson Objective</span>
              <span className={isDark ? 'text-slate-300' : 'text-amber-500'}>*</span>
            </label>

            {/* Category Dropdown */}
            <select
              value={currentCategory}
              onChange={(e) => onParametersChange({ ...parameters, category: e.target.value })}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none transition-colors ${
                isDark
                  ? 'bg-[#0c0d12] border-slate-700/60 text-slate-200 focus:border-slate-400 focus:shadow-[0_0_12px_rgba(203,213,225,0.2)]'
                  : 'bg-slate-50 border-slate-200 text-slate-700 focus:ring-1 focus:ring-blue-500'
              }`}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              value={parameters.topic}
              onChange={(e) => onParametersChange({ ...parameters, topic: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && parameters.topic.trim() && !isGenerating) {
                  e.preventDefault();
                  onGenerate();
                }
              }}
              placeholder="e.g. Photosynthesis, French Revolution, Quadratic Functions..."
              className={`w-full pl-3.5 pr-24 py-2.5 rounded-xl text-sm font-medium border transition-all focus:outline-none ${
                isDark
                  ? 'gold-input'
                  : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-xs focus:ring-2 focus:ring-blue-500/40'
              }`}
            />
            <button
              onClick={handleEnhance}
              disabled={isEnhancing || !parameters.topic.trim()}
              title="Enhance with Gemini AI"
              className={`absolute right-2 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50 ${
                isDark
                  ? 'gold-metallic-btn !py-1 !px-2.5 text-xs text-slate-900'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xs'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isEnhancing ? 'animate-spin' : ''}`} />
              <span>{isEnhancing ? 'Enhancing...' : 'Enhance'}</span>
            </button>
          </div>

          <p className={`text-[11px] mt-1.5 flex items-center justify-between ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
            <span>Type any topic above and click generate (or press <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono border bg-black/20 border-white/10">Enter ↵</kbd>) to produce the full study package.</span>
          </p>

          {/* Popular suggestions */}
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            <span className={`text-[11px] font-semibold mr-1 ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>
              Popular Suggestions:
            </span>
            {suggestions.map((sug) => {
              const cleanText = sug.replace(/^\+\s*/, '');
              return (
                <button
                  key={sug}
                  onClick={() =>
                    onParametersChange({
                      ...parameters,
                      topic: `${cleanText}`,
                    })
                  }
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                    isDark
                      ? 'bg-[#0c0d12] border-slate-700/60 text-slate-300 hover:border-slate-400 hover:text-slate-100 hover:shadow-[0_0_10px_rgba(203,213,225,0.15)]'
                      : 'bg-slate-100/80 border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700'
                  }`}
                >
                  {sug}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Target Grade Band */}
        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}>
            2. Target Grade Band
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {gradeBands.map((gb) => {
              const isSelected = parameters.gradeLevel === gb.label;
              return (
                <button
                  key={gb.label}
                  onClick={() => onParametersChange({ ...parameters, gradeLevel: gb.label })}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? isDark
                        ? 'bg-gradient-to-b from-[#242732] to-[#12141a] border-slate-400 text-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(226,232,240,0.25)]'
                        : 'bg-blue-50 border-blue-300 text-blue-900 ring-1 ring-blue-500 shadow-xs'
                      : isDark
                      ? 'bg-[#0c0d12] border-slate-800 text-slate-300 hover:bg-[#151720] hover:border-slate-600'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>{gb.label}</span>
                    {isSelected && (
                      <Check className={`w-3.5 h-3.5 ${isDark ? 'text-slate-200' : 'text-blue-600'}`} />
                    )}
                  </div>
                  <div className={`text-[10px] mt-1 ${isDark ? 'text-slate-400' : 'text-zinc-500'}`}>Lexile {gb.lexile}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Class Duration */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}>
              3. Class Duration
            </label>
            <span className={`text-xs font-black ${
              isDark ? 'text-slate-300' : 'text-blue-600'
            }`}>
              {parameters.durationMinutes} Minutes
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 mb-3">
            {durationPresets.map((dp) => {
              const isSelected = parameters.durationMinutes === dp.value;
              return (
                <button
                  key={dp.value}
                  onClick={() => onParametersChange({ ...parameters, durationMinutes: dp.value })}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    isSelected
                      ? isDark
                        ? 'bg-gradient-to-b from-[#181a22] to-[#0d0f14] border-slate-400 text-slate-100 shadow-[0_0_10px_rgba(203,213,225,0.2),inset_0_1px_0_rgba(226,232,240,0.2)]'
                        : 'bg-blue-50 border-blue-300 text-blue-800 shadow-xs'
                      : isDark
                      ? 'bg-[#0a0c10] border-slate-800 text-slate-300 hover:bg-[#12141c] hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  {dp.label}
                </button>
              );
            })}
          </div>

          {/* Slider */}
          <input
            type="range"
            min={15}
            max={120}
            step={5}
            value={parameters.durationMinutes}
            onChange={(e) =>
              onParametersChange({ ...parameters, durationMinutes: Number(e.target.value) })
            }
            className={`w-full cursor-pointer h-1.5 rounded-lg ${
              isDark ? 'accent-white bg-zinc-800' : 'accent-blue-600 bg-slate-200'
            }`}
          />
          <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
            <span>15 min Sprint</span>
            <span>45 min Standard</span>
            <span>90 min Block</span>
            <span>120 min Lab</span>
          </div>
        </div>

        {/* Standard Alignment Card (Image 7) */}
        <div
          className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
            isDark
              ? 'gold-bevel-card text-zinc-200'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <div className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${
              isDark ? 'gold-badge font-bold' : 'bg-blue-100 text-blue-700'
            }`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold">Standard Alignment</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isDark
                    ? 'gold-badge'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  NCERT Aligned
                </span>
              </div>
              <p className={`text-xs mt-0.5 font-medium ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
                {parameters.standard || 'NCERT SCI-09-CH09: Force and Laws of Motion (Newton’s Laws)'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenStandardModal}
            className={`text-xs font-bold flex-shrink-0 underline ${
              isDark ? 'text-slate-200 hover:text-white' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            Change Standard
          </button>
        </div>

        {/* Included Pack Modules & Adaptations Checkbox */}
        <div className="space-y-2.5 pt-1">
          <div className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-400'
          }`}>
            Curriculum Triad Modules Included:
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div
              className={`p-2 rounded-lg border flex items-center gap-2 ${
                isDark ? 'bg-[#0c0d12] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${isDark ? 'text-slate-300' : 'text-blue-600'}`} />
              <span className="font-semibold">Google Doc Plan</span>
            </div>
            <div
              className={`p-2 rounded-lg border flex items-center gap-2 ${
                isDark ? 'bg-[#0c0d12] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${isDark ? 'text-slate-300' : 'text-blue-600'}`} />
              <span className="font-semibold">Student Worksheet</span>
            </div>
            <div
              className={`p-2 rounded-lg border flex items-center gap-2 ${
                isDark ? 'bg-[#0c0d12] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${isDark ? 'text-slate-300' : 'text-purple-600'}`} />
              <span className="font-semibold">5-Question Form</span>
            </div>
          </div>

          {/* ELL / IEP adaptations check */}
          <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={parameters.includeEllAdaptations ?? true}
              onChange={(e) =>
                onParametersChange({ ...parameters, includeEllAdaptations: e.target.checked })
              }
              className={`w-4 h-4 rounded cursor-pointer ${
                isDark ? 'accent-slate-300' : 'text-blue-600 border-slate-300'
              }`}
            />
            <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Include ELL / IEP Tiered Scaffolding & Sentence Starters
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onGenerate}
            disabled={isGenerating || !parameters.topic.trim()}
            className={`w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark
                ? 'gold-metallic-btn text-sm !py-3'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20'
            }`}
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-slate-900" />
                <span>Generating Study Material & Curriculum...</span>
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" />
                <span>
                  {parameters.topic.trim()
                    ? `Generate Study Material for "${parameters.topic.trim().length > 25 ? parameters.topic.trim().slice(0, 25) + '...' : parameters.topic.trim()}"`
                    : 'Generate Study Material & Lesson Pack'}
                </span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>

          <button
            onClick={handleSavePreset}
            className={`w-full sm:w-auto py-3 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 ${
              isDark
                ? 'gold-outline-btn !py-3'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-slate-400" />
            <span>{saveToast ? 'Preset Saved!' : 'Save Draft Preset'}</span>
          </button>
        </div>

        {/* Educational Did You Know Tip Banner */}
        <div
          className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
            isDark
              ? 'gold-bevel-card text-slate-200'
              : 'bg-blue-50/70 border-blue-100 text-blue-900'
          }`}
        >
          <Info className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? 'text-slate-300' : 'text-blue-500'}`} />
          <p className="leading-relaxed">
            <span className="font-bold">Did you know?</span> Generated assessments can be sent directly to Westbrook Middle School Google Classroom as scheduled assignments.{' '}
            <span className={`underline cursor-pointer font-semibold ${isDark ? 'text-slate-200' : ''}`}>Learn More &gt;</span>
          </p>
        </div>
      </div>
    </div>
  );
};
