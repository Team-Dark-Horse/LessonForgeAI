import React from 'react';
import { Clock, Plus, Trash2, BookOpen, Layers, CheckSquare, Wrench } from 'lucide-react';
import type { LessonPlanPayload } from '../types';

interface LessonPlanTabProps {
  plan: LessonPlanPayload;
  onChange: (updatedPlan: LessonPlanPayload) => void;
}

export const LessonPlanTab: React.FC<LessonPlanTabProps> = ({ plan, onChange }) => {
  const totalAgendaMinutes = plan.agenda.reduce((sum, item) => sum + (Number(item.minutes) || 0), 0);
  const durationDifference = totalAgendaMinutes - plan.durationMinutes;

  const handleTitleChange = (val: string) => {
    onChange({ ...plan, title: val });
  };

  const handleStandardsChange = (val: string) => {
    onChange({ ...plan, standardsOverview: val });
  };

  // Objectives handlers
  const handleObjectiveChange = (index: number, val: string) => {
    const updated = [...plan.objectives];
    updated[index] = val;
    onChange({ ...plan, objectives: updated });
  };

  const handleAddObjective = () => {
    onChange({ ...plan, objectives: [...plan.objectives, 'Demonstrate conceptual understanding through guided inquiry'] });
  };

  const handleRemoveObjective = (index: number) => {
    const updated = plan.objectives.filter((_, i) => i !== index);
    onChange({ ...plan, objectives: updated });
  };

  // Materials handlers
  const handleMaterialChange = (index: number, val: string) => {
    const updated = [...plan.materials];
    updated[index] = val;
    onChange({ ...plan, materials: updated });
  };

  const handleAddMaterial = () => {
    onChange({ ...plan, materials: [...plan.materials, 'Student device or printed activity guide'] });
  };

  const handleRemoveMaterial = (index: number) => {
    const updated = plan.materials.filter((_, i) => i !== index);
    onChange({ ...plan, materials: updated });
  };

  // Agenda handlers
  const handleAgendaChange = (index: number, field: 'segment' | 'minutes' | 'instructions', val: any) => {
    const updated = [...plan.agenda];
    updated[index] = {
      ...updated[index],
      [field]: field === 'minutes' ? Math.max(1, Number(val) || 1) : val,
    };
    onChange({ ...plan, agenda: updated });
  };

  const handleAddAgendaItem = () => {
    onChange({
      ...plan,
      agenda: [
        ...plan.agenda,
        {
          segment: 'Collaborative Practice',
          minutes: 10,
          instructions: 'Students pair up to analyze problem sets and discuss misconceptions.',
        },
      ],
    });
  };

  const handleRemoveAgendaItem = (index: number) => {
    const updated = plan.agenda.filter((_, i) => i !== index);
    onChange({ ...plan, agenda: updated });
  };

  return (
    <div className="space-y-6">
      {/* Title & Metadata Header */}
      <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Lesson Plan Title
            </label>
            <input
              type="text"
              value={plan.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full text-base sm:text-lg font-bold text-slate-900 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="bg-white px-3 py-2 rounded-lg border border-slate-200">
              <span className="text-slate-400 font-medium block">Grade Level</span>
              <span className="font-semibold text-slate-800">{plan.gradeLevel}</span>
            </div>
            <div className="bg-white px-3 py-2 rounded-lg border border-slate-200">
              <span className="text-slate-400 font-medium block">Target Period</span>
              <span className="font-semibold text-slate-800">{plan.durationMinutes} Minutes</span>
            </div>
            <div className={`px-3 py-2 rounded-lg border ${
              durationDifference === 0
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}>
              <span className="font-medium block text-[11px] opacity-80">Agenda Total</span>
              <div className="flex items-center justify-between">
                <span className="font-bold">{totalAgendaMinutes} Minutes</span>
                {durationDifference !== 0 && (
                  <span className="text-[10px] font-semibold">
                    {durationDifference > 0 ? `+${durationDifference}m over` : `${Math.abs(durationDifference)}m under`}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Curriculum & Syllabus Alignment (NCERT / CBSE / State Boards)
            </label>
            <input
              type="text"
              value={plan.standardsOverview}
              onChange={(e) => handleStandardsChange(e.target.value)}
              placeholder="e.g. NCERT SCI-09-CH09: Force and Laws of Motion (Newton's Laws)"
              className="w-full text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Learning Objectives & Materials in 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Objectives */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-900">Measurable Objectives</h3>
            </div>
            <button
              type="button"
              onClick={handleAddObjective}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {plan.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2 group">
                <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-1">
                  {i + 1}
                </span>
                <textarea
                  rows={2}
                  value={obj}
                  onChange={(e) => handleObjectiveChange(i, e.target.value)}
                  className="w-full text-xs leading-relaxed text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all resize-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveObjective(i)}
                  title="Delete objective"
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Materials Required */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-slate-900">Required Classroom Materials</h3>
            </div>
            <button
              type="button"
              onClick={handleAddMaterial}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {plan.materials.map((mat, i) => (
              <div key={i} className="flex items-center gap-2 group">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 ml-1.5 mr-0.5" />
                <input
                  type="text"
                  value={mat}
                  onChange={(e) => handleMaterialChange(i, e.target.value)}
                  className="w-full text-xs text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMaterial(i)}
                  title="Delete material"
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timed Pedagogical Agenda Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Timed Pedagogical Agenda (Hook → Exit Check)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Sequence of teacher actions, student activities, and transition timing.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddAgendaItem}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Phase</span>
          </button>
        </div>

        <div className="space-y-3">
          {plan.agenda.map((item, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white transition-all space-y-2 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-6 h-6 rounded-lg bg-blue-600/10 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={item.segment}
                    onChange={(e) => handleAgendaChange(i, 'segment', e.target.value)}
                    placeholder="Phase name (e.g. Direct Instruction)"
                    className="font-semibold text-xs sm:text-sm text-slate-900 bg-white border border-slate-200 rounded-lg px-2.5 py-1 flex-1 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="number"
                      min={1}
                      max={120}
                      value={item.minutes}
                      onChange={(e) => handleAgendaChange(i, 'minutes', e.target.value)}
                      className="w-12 text-center text-xs font-bold text-blue-700 focus:outline-none"
                    />
                    <span className="text-[11px] text-slate-500 font-medium">min</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveAgendaItem(i)}
                    title="Delete phase"
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  value={item.instructions}
                  onChange={(e) => handleAgendaChange(i, 'instructions', e.target.value)}
                  placeholder="Teacher instructions and student tasks for this period..."
                  className="w-full text-xs leading-relaxed text-slate-700 bg-white border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
