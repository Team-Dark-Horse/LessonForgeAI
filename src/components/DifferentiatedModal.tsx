import React, { useState } from 'react';
import { Sparkles, X, Loader2, UserCheck, Zap } from 'lucide-react';
import type { WorksheetPayload, ThemeMode } from '../types';

interface DifferentiatedModalProps {
  isOpen: boolean;
  currentWorksheet: WorksheetPayload;
  onApply: (differentiatedWorksheet: WorksheetPayload) => void;
  onClose: () => void;
  theme?: ThemeMode;
}

export const DifferentiatedModal: React.FC<DifferentiatedModalProps> = ({
  isOpen,
  currentWorksheet,
  onApply,
  onClose,
  theme = 'light',
}) => {
  const [selectedTier, setSelectedTier] = useState<'support' | 'advanced'>('support');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;
  const isDark = theme === 'dark';

  const handleDifferentiate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/differentiate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worksheet: currentWorksheet,
          tier: selectedTier,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to adapt worksheet. Please try again.');
      }

      const data = await res.json();
      if (data.worksheet) {
        onApply(data.worksheet);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Error occurred during differentiation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className={`rounded-2xl border shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
        isDark
          ? 'gold-bevel-card text-zinc-100 shadow-2xl'
          : 'bg-white border-slate-200 text-slate-900 shadow-xl'
      }`}>
        <div className={`px-6 py-5 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-purple-600'}`} />
            <h3 className={`font-bold text-base ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
              1-Click Worksheet Differentiation
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Instantly re-level vocabulary, reading complexity, and scaffold question prompts for diverse classroom learners:
          </p>

          <div className="space-y-3">
            {/* Tier 1: IEP / ELL Scaffolding */}
            <div
              onClick={() => setSelectedTier('support')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedTier === 'support'
                  ? isDark
                    ? 'border-slate-400 bg-slate-800/40 ring-1 ring-slate-400/40 shadow-[0_0_8px_rgba(203,213,225,0.2)]'
                    : 'border-purple-500 bg-purple-50/60 ring-1 ring-purple-500/20'
                  : isDark
                  ? 'border-slate-800 hover:border-slate-600 bg-[#0d0f14]'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold flex items-center gap-1.5 ${
                  isDark ? 'text-slate-200' : 'text-purple-950'
                }`}>
                  <UserCheck className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-purple-600'}`} />
                  <span>IEP / ELL Scaffolding Tier</span>
                </span>
                <input
                  type="radio"
                  name="tier"
                  checked={selectedTier === 'support'}
                  onChange={() => setSelectedTier('support')}
                  className={isDark ? 'accent-slate-300' : 'accent-purple-600'}
                />
              </div>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Simplifies reading level, injects sentence starter cues, and breaks down complex definitions into friendly terms.
              </p>
            </div>

            {/* Tier 2: Advanced / Gifted */}
            <div
              onClick={() => setSelectedTier('advanced')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedTier === 'advanced'
                  ? isDark
                    ? 'border-slate-400 bg-slate-800/40 ring-1 ring-slate-400/40 shadow-[0_0_8px_rgba(203,213,225,0.2)]'
                    : 'border-purple-500 bg-purple-50/60 ring-1 ring-purple-500/20'
                  : isDark
                  ? 'border-slate-800 hover:border-slate-600 bg-[#0d0f14]'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold flex items-center gap-1.5 ${
                  isDark ? 'text-slate-200' : 'text-purple-950'
                }`}>
                  <Zap className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-purple-600'}`} />
                  <span>Advanced / Gifted & Talented Tier</span>
                </span>
                <input
                  type="radio"
                  name="tier"
                  checked={selectedTier === 'advanced'}
                  onChange={() => setSelectedTier('advanced')}
                  className={isDark ? 'accent-slate-300' : 'accent-purple-600'}
                />
              </div>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Elevates depth of knowledge (DOK 3/4), adds synthesis questions, and introduces cross-disciplinary challenge vocabulary.
              </p>
            </div>
          </div>

          {error && (
            <p className={`text-xs p-2.5 rounded-lg border ${
              isDark ? 'bg-rose-950/40 border-rose-700 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-600'
            }`}>
              {error}
            </p>
          )}
        </div>

        <div className={`px-6 py-4 border-t flex items-center justify-end gap-3 ${
          isDark ? 'bg-[#09090c] border-white/15' : 'bg-slate-50 border-slate-100'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              isDark ? 'gold-outline-btn !py-2 !px-4 text-xs' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleDifferentiate}
            className={`px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 disabled:opacity-60 transition-all ${
              isDark
                ? 'gold-metallic-btn !py-2 !px-5 text-xs'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Adapting with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apply Differentiated Tier</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
