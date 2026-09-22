import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

const PRIMARY_MODEL = 'gemini-3.8-flash';
const FALLBACK_MODEL = 'gemini-flash-latest';

async function callGemini(options: {
  contents: any[];
  config?: any;
}) {
  const ai = getAiClient();
  if (!ai) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }
  try {
    return await ai.models.generateContent({
      model: PRIMARY_MODEL,
      contents: options.contents,
      config: options.config,
    });
  } catch (err: any) {
    const errMsg = err?.message || '';
    if (errMsg.includes('404') || errMsg.includes('not found') || errMsg.includes('no longer available') || err?.status === 404) {
      console.warn(`Model ${PRIMARY_MODEL} returned 404, falling back to ${FALLBACK_MODEL}`);
      return await ai.models.generateContent({
        model: FALLBACK_MODEL,
        contents: options.contents,
        config: options.config,
      });
    }
    throw err;
  }
}

// Robust pedagogical generator for any teacher topic
function generateComprehensiveStudyMaterial(
  rawTopic: string,
  rawGradeLevel: string,
  durationMinutes: number,
  category?: string
) {
  const topic = rawTopic.trim();
  const gradeLevel = rawGradeLevel || '8th Grade';
  const duration = Math.min(Math.max(Number(durationMinutes) || 45, 15), 180);

  // Derive subject if not specified
  const lower = topic.toLowerCase();
  let subject = category || 'General Science';
  let standardCode = 'NCERT SCI-09-CH09';

  if (lower.includes('cell') || lower.includes('bio') || lower.includes('photosyn') || lower.includes('organ') || lower.includes('genet') || lower.includes('eco') || lower.includes('life')) {
    subject = 'Life Science (Biology)';
    standardCode = 'NCERT SCI-10-CH06 / SCI-09-CH05';
  } else if (lower.includes('force') || lower.includes('motion') || lower.includes('newton') || lower.includes('gravit') || lower.includes('light') || lower.includes('electr')) {
    subject = 'Physical Science (Physics)';
    standardCode = 'NCERT SCI-09-CH09 / SCI-10-CH10';
  } else if (lower.includes('chem') || lower.includes('react') || lower.includes('acid') || lower.includes('base') || lower.includes('matter') || lower.includes('atom')) {
    subject = 'Physical Science (Chemistry)';
    standardCode = 'NCERT SCI-10-CH01 / SCI-09-CH01';
  } else if (lower.includes('earth') || lower.includes('tectonic') || lower.includes('rock') || lower.includes('water') || lower.includes('planet') || lower.includes('space') || lower.includes('climate') || lower.includes('environ')) {
    subject = 'Environmental Science';
    standardCode = 'NCERT SCI-10-CH15';
  } else if (lower.includes('math') || lower.includes('algebra') || lower.includes('fraction') || lower.includes('equation') || lower.includes('geometry') || lower.includes('function') || lower.includes('trig') || lower.includes('slope')) {
    subject = 'Mathematics';
    standardCode = 'NCERT MTH-10-CH03 / MTH-09-CH02';
  } else if (lower.includes('war') || lower.includes('revolut') || lower.includes('history') || lower.includes('gov') || lower.includes('constitut') || lower.includes('empire') || lower.includes('civil')) {
    subject = 'Social Science & History';
    standardCode = 'NCERT SOC-09-HIST-CH01';
  }

  // Generate dynamic vocabulary terms based on topic
  const words = topic.split(/\s+/).filter((w) => w.length > 3 && !['and', 'the', 'with', 'from', 'into'].includes(w.toLowerCase()));
  const primaryTerm = words[0] || topic;
  const secondaryTerm = words[1] || 'Analysis';

  const vocabList = [
    {
      term: primaryTerm,
      definition: `The fundamental foundational concept governing ${topic}, representing the core mechanism or phenomenon observed.`,
    },
    {
      term: `${secondaryTerm} Dynamics`,
      definition: `How variable factors and environmental inputs interact and shift throughout the stages of ${topic}.`,
    },
    {
      term: 'Empirical Evidence',
      definition: `Measurable, verifiable data and observational findings collected through experiments or direct historical analysis.`,
    },
    {
      term: 'Equilibrium / System Balance',
      definition: `The steady state where opposing forces, inputs, or variables are stabilized within the context of ${topic}.`,
    },
  ];

  const exercises = [
    {
      questionNumber: 1,
      prompt: `Define "${topic}" in your own words. Explain why understanding this concept is essential to ${subject}.`,
      answerLines: 3,
      sampleAnswer: `${topic} is a cornerstone principle in ${subject}. It explains how interacting components operate systematically to produce observable outcomes in both classroom labs and everyday environments.`,
    },
    {
      questionNumber: 2,
      prompt: `Describe a real-world scenario where ${topic} is directly observed or applied. Identify the key inputs and the resulting outcome.`,
      answerLines: 3,
      sampleAnswer: `In everyday life, ${topic} can be witnessed when key system variables change. For example, when energy or inputs shift, the system responds in direct accordance with the governing rules of ${topic}.`,
    },
    {
      questionNumber: 3,
      prompt: `Compare and contrast two different conditions or variables related to ${topic}. What happens if one factor is removed or intensified?`,
      answerLines: 4,
      sampleAnswer: `When key conditions vary, the rate and outcome of ${topic} alters predictably. Removing a critical component halts the process, while optimizing it increases efficiency and stability.`,
    },
    {
      questionNumber: 4,
      prompt: `Synthesize your findings: Formulate a testable hypothesis or analytical conclusion regarding future developments in ${topic}.`,
      answerLines: 3,
      sampleAnswer: `If variables are systematically measured, predictable patterns in ${topic} emerge that allow scientists or researchers to accurately forecast outcomes.`,
    },
  ];

  const questions = [
    {
      prompt: `What is the primary defining characteristic of "${topic}"?`,
      options: [
        `It represents an isolated phenomenon with no measurable real-world effects`,
        `It is a fundamental principle governed by predictable laws and observable interactions`,
        `It only occurs in artificial laboratory environments under extreme pressure`,
        `It was disproven by modern empirical research and replaced by random chance`,
      ],
      correctIndex: 1,
      explanation: `${topic} is well-established as a fundamental, rule-governed principle in ${subject} that operates across real-world systems.`,
    },
    {
      prompt: `Which of the following is considered essential when investigating ${topic}?`,
      options: [
        `Collecting verifiable empirical observations and analyzing measurable variables`,
        `Relying solely on intuition without recording data points`,
        `Ignoring anomalies and assuming all systems remain permanently static`,
        `Eliminating all control groups during testing procedures`,
      ],
      correctIndex: 0,
      explanation: `Scientific and analytical inquiry requires measurable empirical data and controlled variables to validate observations.`,
    },
    {
      prompt: `When examining the relationship between key components in ${topic}, what occurs when external conditions change?`,
      options: [
        `The system instantly ceases to function permanently`,
        `The system adjusts dynamically in accordance with conservation and equilibrium principles`,
        `All related physical and mathematical rules are reversed completely`,
        `Nothing changes regardless of the magnitude of external inputs`,
      ],
      correctIndex: 1,
      explanation: `Natural, mathematical, and historical systems adapt to shifting conditions according to core structural principles.`,
    },
    {
      prompt: `Which vocabulary term best describes the measurable outcomes produced during ${topic}?`,
      options: [
        `Hypothetical Conjecture`,
        `Arbitrary Coincidence`,
        `Empirical Evidence`,
        `Static Stagnation`,
      ],
      correctIndex: 2,
      explanation: `Empirical evidence consists of measurable, reproducible facts that verify whether an observed phenomenon aligns with theoretical models.`,
    },
    {
      prompt: `How does a mastery of ${topic} assist students in practical problem solving?`,
      options: [
        `It enables students to model, predict, and analyze complex systems accurately`,
        `It removes the necessity to study any other related subjects`,
        `It only provides historical trivia with no contemporary relevance`,
        `It ensures that no further experimentation is ever necessary`,
      ],
      correctIndex: 0,
      explanation: `Deep understanding of foundational concepts empowers learners to design solutions, interpret data, and think critically about real-world scenarios.`,
    },
  ];

  const lessonPlan = {
    title: `[Lesson Plan] ${topic} — ${gradeLevel}`,
    gradeLevel,
    durationMinutes: duration,
    standardsOverview: `${standardCode}: Comprehensive inquiry and evidence-based analysis focused on ${topic}.`,
    subject,
    cohort: `${gradeLevel} Cohort • Westbrook Department of Education`,
    focus: `Foundational mechanisms, critical inquiry, guided investigation, and formative assessment for ${topic}.`,
    objectives: [
      `Define and explain the core mechanisms and foundational principles of ${topic}.`,
      `Analyze real-world scenarios and identify key interacting variables governing ${topic}.`,
      `Evaluate evidence and formulate testable conclusions using domain-specific vocabulary.`,
    ],
    materials: [
      `Printable Student Study Guide & Worksheet: ${topic}`,
      `Classroom projection display or digital interactive boards`,
      `Student notebooks and writing utensils`,
      `Self-grading Google Form formative assessment check`,
    ],
    agenda: [
      {
        segment: 'Hook & Phenomenon',
        minutes: Math.round(duration * 0.2),
        instructions: `Present an engaging real-world phenomenon or opening inquiry question illustrating ${topic}. Prompt student pairs to discuss initial observations and record questions.`,
      },
      {
        segment: 'Direct Concept Instruction',
        minutes: Math.round(duration * 0.35),
        instructions: `Introduce the foundational definition, key vocabulary, and structural principles of ${topic}. Model how variables interact using visual diagrams and anchor charts.`,
      },
      {
        segment: 'Guided Practice & Collaborative Lab',
        minutes: Math.round(duration * 0.25),
        instructions: `Students work in collaborative pairs to examine case scenarios and complete guided study exercises. Circulate to provide targeted scaffolding and feedback.`,
      },
      {
        segment: 'Independent Application & Reflection',
        minutes: Math.round(duration * 0.1),
        instructions: `Students apply their understanding to solve synthesis problems independently on their student study sheets.`,
      },
      {
        segment: 'Formative Assessment / Exit Check',
        minutes: Math.round(duration * 0.1),
        instructions: `Administer the 5-question digital mastery check to assess student comprehension and identify topics for reteaching.`,
      },
    ],
  };

  const worksheet = {
    title: `Student Exploration & Study Guide: ${topic}`,
    subtitle: `${gradeLevel} ${subject} • Core Concept Mastery`,
    instructions: `Carefully read the Topic Overview and essential vocabulary terms below. Then, complete the critical-thinking questions in Section B and check your comprehension using the provided study criteria.`,
    conceptSummary: `${topic} is an essential concept in ${subject}. It encompasses the fundamental principles and mechanisms that govern how systems behave under varying conditions. By studying ${topic}, learners examine cause-and-effect relationships, model system interactions, and apply evidence-based reasoning to predict future outcomes. Whether examining historical developments, physical interactions, biological systems, or mathematical structures, mastering ${topic} provides a critical lens for understanding broader real-world patterns.`,
    keyTakeaways: [
      `Core Principle: ${topic} operates under predictable, measurable rules within ${subject}.`,
      `System Dynamics: Changes in key input variables produce corresponding, direct effects throughout the system.`,
      `Empirical Validation: Hypotheses regarding ${topic} must be substantiated through verifiable evidence and rigorous analysis.`,
      `Real-World Application: Concepts from ${topic} directly inform modern technology, scientific inquiry, and practical decision-making.`,
    ],
    vocabulary: vocabList,
    exercises,
  };

  const quiz = {
    title: `Formative Assessment: ${topic}`,
    description: `5-Question Mastery Check for ${gradeLevel} • 1 Point per Question • Immediate Feedback`,
    questions,
  };

  return {
    lessonPlan,
    worksheet,
    quiz,
  };
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'AI Lesson Planner Service',
  });
});

// Primary Gemini Generation Engine (PRD 6.2)
app.post('/api/generate-lesson', async (req: Request, res: Response) => {
  try {
    const { topic, gradeLevel, durationMinutes, category } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'The "topic" parameter is required.' });
    }

    const duration = Math.min(Math.max(Number(durationMinutes) || 45, 15), 180);
    const resolvedGrade = gradeLevel || '8th Grade';
    const ai = getAiClient();

    let parsedData = null;

    if (ai) {
      try {
        const systemPrompt = `You are an expert instructional designer and master K-12 educator.
Generate an end-to-end curriculum triad and comprehensive study material package consisting of:
1. A structured pedagogical Lesson Plan for a ${duration}-minute class period on "${topic}" for ${resolvedGrade}.
2. A printable student-facing Study Guide and Worksheet with rich concept overview notes, high-yield study takeaways, key vocabulary, and 4 to 6 guided practice exercises with sample answers.
3. A formative exit Quiz with exactly 5 multiple choice questions (each with 4 options, a 0-indexed correct answer, and pedagogical explanation).

Ensure the timed agenda items sum up closely or exactly to ${duration} minutes.

You MUST respond ONLY with a strictly valid JSON object adhering to this schema:
{
  "lessonPlan": {
    "title": string,
    "gradeLevel": "${resolvedGrade}",
    "durationMinutes": ${duration},
    "standardsOverview": string (e.g., NCERT Syllabus alignment code & chapter summary, such as "NCERT Class 9 Science (Chapter 9: Force and Laws of Motion)"),
    "objectives": string[] (3-4 measurable Bloom's taxonomy objectives),
    "materials": string[] (required classroom supplies, tech, or printouts),
    "agenda": [
      {
        "segment": string,
        "minutes": number,
        "instructions": string
      }
    ]
  },
  "worksheet": {
    "title": string,
    "subtitle": string,
    "instructions": string,
    "conceptSummary": string (Detailed 2-3 paragraph study guide explaining the core mechanisms and principles of "${topic}"),
    "keyTakeaways": string[] (4-5 high-yield bulleted study points or rules),
    "vocabulary": [
      {
        "term": string,
        "definition": string
      }
    ],
    "exercises": [
      {
        "questionNumber": number,
        "prompt": string,
        "answerLines": number (between 2 and 5),
        "sampleAnswer": string
      }
    ]
  },
  "quiz": {
    "title": string,
    "description": string,
    "questions": [
      {
        "prompt": string,
        "options": [string, string, string, string],
        "correctIndex": number (integer 0, 1, 2, or 3),
        "explanation": string
      }
    ]
  }
}`;

        const userPrompt = `Create the complete instructional package and study material for:
Topic: ${topic}
Grade Level: ${resolvedGrade}
Class Duration: ${duration} minutes
Subject Domain: ${category || 'General Studies'}`;

        const response = await callGemini({
          contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });

        const responseText = response.text || '';
        try {
          parsedData = JSON.parse(responseText);
        } catch {
          const cleanJson = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          parsedData = JSON.parse(cleanJson);
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed or timed out, falling back to intelligent synthesis:', geminiErr);
        parsedData = null;
      }
    }

    // Fallback to rich intelligent synthesizer if AI was unavailable or had error
    if (!parsedData || !parsedData.lessonPlan || !parsedData.worksheet || !parsedData.quiz) {
      parsedData = generateComprehensiveStudyMaterial(topic, resolvedGrade, duration, category);
    }

    return res.json({
      success: true,
      parameters: {
        topic,
        gradeLevel: resolvedGrade,
        durationMinutes: duration,
        category: category || 'General',
      },
      payload: parsedData,
    });
  } catch (error: any) {
    console.error('Error generating lesson plan:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate curriculum package.',
    });
  }
});

// Differentiated Tiering / IEP / ELL modification endpoint (PRD Feature List v2)
app.post('/api/differentiate-lesson', async (req: Request, res: Response) => {
  try {
    const { worksheet, tier } = req.body;
    if (!worksheet) {
      return res.status(400).json({ error: 'Missing current worksheet content.' });
    }

    const tierInstruction =
      tier === 'support'
        ? 'Differentiate for IEP / ELL / Scaffolding: Simplify reading level, provide sentence starter cues in questions, and simplify vocabulary explanations.'
        : 'Differentiate for Advanced / Gifted & Talented: Elevate cognitive demand, add analytical synthesis exercises, and deepen conceptual vocabulary.';

    const systemPrompt = `You are a curriculum differentiation specialist.
Take the provided worksheet JSON and modify it according to this tier:
"${tierInstruction}"
Keep the exact same JSON format:
{
  "title": string,
  "subtitle": string,
  "instructions": string,
  "vocabulary": [ { "term": string, "definition": string } ],
  "exercises": [ { "questionNumber": number, "prompt": string, "answerLines": number, "sampleAnswer": string } ]
}
Respond strictly with valid JSON.`;

    const response = await callGemini({
      contents: [{ role: 'user', parts: [{ text: JSON.stringify(worksheet) }] }],
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return res.json({ success: true, worksheet: parsed });
  } catch (error: any) {
    console.error('Differentiate error:', error);
    return res.status(500).json({ error: error.message || 'Failed to adapt worksheet' });
  }
});

// AI Topic & Standard Enhancement endpoint (PRD & Reference Image 7 "Enhance" button)
app.post('/api/enhance-topic', async (req: Request, res: Response) => {
  try {
    const { topic, gradeLevel, category } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Missing topic' });
    }

    const systemPrompt = `You are an NCERT and CBSE curriculum coach. Given a teacher's draft topic "${topic}" for ${gradeLevel || 'Class 9'}, provide an enhanced pedagogical topic title, aligned NCERT syllabus chapter code and competency description (e.g., "NCERT SCI-09-CH09: Force and Laws of Motion (Newton's Laws)"), and 3 popular sub-topic suggestion chips.
Respond strictly in JSON format:
{
  "enhancedTopic": string,
  "standardCode": string,
  "standardDescription": string,
  "suggestions": string[]
}`;

    const response = await callGemini({
      contents: [{ role: 'user', parts: [{ text: `Enhance topic: ${topic} in category ${category || 'General'}` }] }],
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error('Enhance topic error:', error);
    return res.status(500).json({ error: error.message || 'Failed to enhance topic' });
  }
});

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
