import React, { useState } from 'react';
import { BookOpen, Check, Search, Sparkles } from 'lucide-react';
import type { ThemeMode } from '../types';

interface StandardsViewProps {
  theme: ThemeMode;
  onSelectStandard?: (code: string, desc: string) => void;
}

export const StandardsView: React.FC<StandardsViewProps> = ({
  theme,
  onSelectStandard,
}) => {
  const isDark = theme === 'dark';
  const [activeDomain, setActiveDomain] = useState('Physics');
  const [search, setSearch] = useState('');

  const standards = [
    // Physics (NCERT Classes 8, 9, 10)
    {
      code: 'NCERT SCI-09-CH09',
      domain: 'Physics',
      classLevel: 'Class 9',
      title: "Force and Laws of Motion (Newton's Laws)",
      desc: 'Inquire into balanced and unbalanced forces, first, second, and third laws of motion, inertia, mass, and conservation of momentum (p = mv).',
    },
    {
      code: 'NCERT SCI-09-CH08',
      domain: 'Physics',
      classLevel: 'Class 9',
      title: 'Motion & Graphical Representation',
      desc: 'Formulate distance, displacement, uniform and non-uniform velocity, acceleration, and kinematic equations of motion graphically.',
    },
    {
      code: 'NCERT SCI-10-CH10',
      domain: 'Physics',
      classLevel: 'Class 10',
      title: 'Light – Reflection and Refraction',
      desc: 'Construct ray diagrams for spherical mirrors and lenses, apply mirror and lens formulae, calculate magnification, and evaluate refractive index.',
    },
    {
      code: 'NCERT SCI-10-CH12',
      domain: 'Physics',
      classLevel: 'Class 10',
      title: 'Electricity & Ohm’s Law',
      desc: 'Investigate electric potential difference, Ohm’s law (V = IR), series and parallel combinations of resistors, and Joule’s heating effect.',
    },
    {
      code: 'NCERT SCI-08-CH08',
      domain: 'Physics',
      classLevel: 'Class 8',
      title: 'Force and Pressure',
      desc: 'Explore contact (muscular, friction) and non-contact (magnetic, electrostatic, gravitational) forces, and calculate pressure in liquids and gases.',
    },
    {
      code: 'NCERT SCI-09-CH10',
      domain: 'Physics',
      classLevel: 'Class 9',
      title: 'Gravitation & Archimedes’ Principle',
      desc: 'Understand universal law of gravitation, free fall, acceleration due to gravity (g), mass vs weight, thrust, pressure, and Archimedes’ buoyancy principle.',
    },

    // Chemistry (NCERT Classes 8, 9, 10)
    {
      code: 'NCERT SCI-10-CH01',
      domain: 'Chemistry',
      classLevel: 'Class 10',
      title: 'Chemical Reactions and Equations',
      desc: 'Write and balance chemical equations; classify combination, decomposition, displacement, double displacement, redox, and precipitation reactions.',
    },
    {
      code: 'NCERT SCI-10-CH02',
      domain: 'Chemistry',
      classLevel: 'Class 10',
      title: 'Acids, Bases and Salts',
      desc: 'Analyze pH scale indicators, neutralization reactions, chemical properties of acids/bases, and preparation of bleaching powder, baking soda, and plaster of Paris.',
    },
    {
      code: 'NCERT SCI-09-CH01',
      domain: 'Chemistry',
      classLevel: 'Class 9',
      title: 'Matter in Our Surroundings',
      desc: 'Investigate physical nature of matter, characteristics of particles, state changes (solid, liquid, gas), latent heat, and evaporation cooling.',
    },
    {
      code: 'NCERT SCI-09-CH03',
      domain: 'Chemistry',
      classLevel: 'Class 9',
      title: 'Atoms and Molecules',
      desc: 'Master laws of chemical combination, Dalton’s atomic theory, atomic/molecular masses, chemical formula writing, and mole concept basics.',
    },
    {
      code: 'NCERT SCI-08-CH04',
      domain: 'Chemistry',
      classLevel: 'Class 8',
      title: 'Combustion and Flame',
      desc: 'Evaluate conditions required for combustion, calorific value of fuels, structure of a candle flame, and pollution impacts.',
    },

    // Biology (NCERT Classes 8, 9, 10)
    {
      code: 'NCERT SCI-10-CH06',
      domain: 'Biology',
      classLevel: 'Class 10',
      title: 'Life Processes (Nutrition, Respiration, Transport)',
      desc: 'Analyze autotrophic photosynthesis, aerobic/anaerobic respiration, double circulation in humans, xylem/phloem transport, and nephron excretion.',
    },
    {
      code: 'NCERT SCI-09-CH05',
      domain: 'Biology',
      classLevel: 'Class 9',
      title: 'The Fundamental Unit of Life (Cell)',
      desc: 'Investigate prokaryotic vs eukaryotic structures, plasma membrane diffusion/osmosis, nucleus chromosomes, and cytoplasmic organelles (mitochondria, plastids).',
    },
    {
      code: 'NCERT SCI-09-CH06',
      domain: 'Biology',
      classLevel: 'Class 9',
      title: 'Tissues (Plant & Animal)',
      desc: 'Differentiate meristematic and permanent plant tissues (parenchyma, collenchyma, sclerenchyma, xylem, phloem) and epithelial/connective animal tissues.',
    },
    {
      code: 'NCERT SCI-10-CH15',
      domain: 'Biology',
      classLevel: 'Class 10',
      title: 'Our Environment & Ecosystems',
      desc: 'Construct food chains and food webs, apply 10% trophic level energy transfer law, investigate biomagnification, and ozone layer protection.',
    },
    {
      code: 'NCERT SCI-08-CH02',
      domain: 'Biology',
      classLevel: 'Class 8',
      title: 'Microorganisms: Friend and Foe',
      desc: 'Classify bacteria, fungi, protozoa, and algae; explore antibiotic production, nitrogen cycle, food preservation, and pathogen defense.',
    },

    // Mathematics (NCERT Classes 8, 9, 10)
    {
      code: 'NCERT MTH-10-CH03',
      domain: 'Mathematics',
      classLevel: 'Class 10',
      title: 'Linear Equations in Two Variables',
      desc: 'Solve simultaneous equations using graphical, substitution, and elimination methods; determine system consistency (unique, infinite, no solution).',
    },
    {
      code: 'NCERT MTH-09-CH02',
      domain: 'Mathematics',
      classLevel: 'Class 9',
      title: 'Polynomials (Factor & Remainder Theorems)',
      desc: 'Apply remainder and factor theorems, evaluate zeroes of polynomials, and factorize quadratic and cubic algebraic identities.',
    },
    {
      code: 'NCERT MTH-10-CH08',
      domain: 'Mathematics',
      classLevel: 'Class 10',
      title: 'Introduction to Trigonometry',
      desc: 'Compute trigonometric ratios of acute angles (sin, cos, tan, cosec, sec, cot), specific values (0°, 30°, 45°, 60°, 90°), and trigonometric identities.',
    },
  ];

  const filtered = standards.filter((s) => {
    const matchesDomain = activeDomain === 'All' || s.domain === activeDomain;
    const matchesSearch =
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase()) ||
      (s.classLevel && s.classLevel.toLowerCase().includes(search.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
          NCERT Curriculum & Syllabus Alignment
        </h2>
        <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
          National Council of Educational Research and Training (NCERT / CBSE / State Boards) curriculum targets for Classes 8, 9, and 10.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {['Physics', 'Chemistry', 'Biology', 'Mathematics', 'All'].map((dom) => (
            <button
              key={dom}
              onClick={() => setActiveDomain(dom)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeDomain === dom
                  ? isDark
                    ? 'gold-metallic-btn !py-1.5 !px-3 text-xs'
                    : 'bg-blue-600 text-white'
                  : isDark
                  ? 'gold-outline-btn !py-1.5 !px-3 text-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dom === 'All' ? 'All Subjects' : dom}
            </button>
          ))}
        </div>

        <div className="relative w-72">
          <Search className={`w-3.5 h-3.5 absolute left-3 top-2.5 ${isDark ? 'text-zinc-400' : 'text-slate-400'}`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search NCERT chapters, topics, codes..."
            className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border focus:outline-none transition-all ${
              isDark
                ? 'gold-input placeholder:text-zinc-600'
                : 'bg-white border-slate-200 text-slate-900 focus:ring-1 focus:ring-blue-500'
            }`}
          />
        </div>
      </div>

      {/* Standards List */}
      <div className="space-y-3">
        {filtered.map((s) => (
          <div
            key={s.code}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isDark ? 'gold-bevel-card' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-black px-2 py-0.5 rounded ${
                  isDark ? 'gold-badge' : 'bg-blue-100 text-blue-800'
                }`}>
                  {s.code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  isDark ? 'bg-slate-800 text-slate-200 border border-slate-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {s.classLevel}
                </span>
                <span className={`text-sm font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {s.title}
                </span>
              </div>
              <p className={`text-xs max-w-2xl leading-relaxed ${isDark ? 'text-zinc-300' : 'text-slate-500'}`}>
                {s.desc}
              </p>
            </div>

            {onSelectStandard && (
              <button
                onClick={() => onSelectStandard(s.code, `${s.title}: ${s.desc}`)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 self-start sm:self-center border ${
                  isDark
                    ? 'gold-metallic-btn !py-1.5 !px-3.5 text-xs'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                }`}
              >
                Use in Lesson
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
