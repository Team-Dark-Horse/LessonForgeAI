import React from 'react';
import { Timer, CheckCircle, TrendingUp, Sparkles } from 'lucide-react';

interface StatsBannerProps {
  lastGenTimeMs?: number | null;
  lastExportTimeMs?: number | null;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ lastGenTimeMs, lastExportTimeMs }) => {
  const genSeconds = lastGenTimeMs ? (lastGenTimeMs / 1000).toFixed(1) : null;
  const exportSeconds = lastExportTimeMs ? (lastExportTimeMs / 1000).toFixed(1) : null;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs mb-6 flex flex-wrap items-center justify-between gap-4 text-xs">
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-800">Pedagogical Triad Engine:</span>
          <span className="text-slate-500">Lesson Plan • Worksheet • Form Quiz</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-600">
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-medium">Time-to-Classroom Savings:</span>
          <span className="font-bold text-emerald-700">~93% (45m prep → &lt;3m)</span>
        </div>

        {(genSeconds || exportSeconds) && (
          <div className="flex items-center gap-1.5 text-slate-600">
            <Timer className="w-3.5 h-3.5 text-purple-600" />
            <span className="font-medium">Latency Benchmark:</span>
            <span className="font-mono font-semibold text-slate-800">
              {genSeconds ? `AI ${genSeconds}s` : ''}
              {genSeconds && exportSeconds ? ' + ' : ''}
              {exportSeconds ? `Drive ${exportSeconds}s` : ''}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">(Target &lt;18s E2E)</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-500">
        <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">Gemini 2.5 Flash</span>
        <span className="px-2 py-0.5 rounded bg-blue-50 font-medium text-blue-700 border border-blue-100">Google Workspace v1</span>
      </div>
    </div>
  );
};
