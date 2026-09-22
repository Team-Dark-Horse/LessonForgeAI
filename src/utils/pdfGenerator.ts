import { jsPDF } from 'jspdf';
import type { LessonPlanPayload, GeneratedLessonTriad } from '../types';

/**
 * Generates and downloads a clean, beautifully formatted PDF document for a lesson plan.
 */
export function downloadLessonPlanPDF(lessonPlan: LessonPlanPayload): void {
  // Use Letter size (8.5 x 11 inches) in points (612 x 792 pt)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter',
  });

  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 45;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 30) {
      doc.addPage();
      y = margin;
      drawRunningHeader();
    }
  };

  const drawRunningHeader = () => {
    // Subtle top rule
    doc.setDrawColor(218, 165, 32); // Gold accent
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 14;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(160, 120, 20); // Amber/Gold dark
    doc.text('PLANCRAFT AI  •  CURRICULUM ARCHITECTURE', margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text('CONFIDENTIAL  •  WESTBROOK MIDDLE SCHOOL', pageWidth - margin, y, { align: 'right' });
    y += 18;
  };

  // 1. Initial Running Header
  drawRunningHeader();

  // 2. Standard & Subject Badges
  const standardText = (lessonPlan.standardsOverview || 'NCERT SCI-09-CH09').split(':')[0].trim();
  const subjectText = (lessonPlan.subject || 'Physical Science').toUpperCase();
  const durationText = `${lessonPlan.durationMinutes || 50} MIN UNIT`;
  const gradeText = (lessonPlan.gradeLevel || '8th Grade').toUpperCase();

  doc.setFillColor(245, 240, 225); // Subtle warm parchment/gold tint
  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.75);
  doc.roundedRect(margin, y, 125, 20, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(140, 95, 10);
  doc.text(standardText, margin + 8, y + 13);

  // Meta pills on right
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  doc.text(`${gradeText}  •  ${subjectText}  •  ${durationText}`, pageWidth - margin, y + 14, { align: 'right' });

  y += 32;

  // 3. Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 20);
  const titleLines = doc.splitTextToSize(lessonPlan.title, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 22 + 4;

  // 4. Focus / Big Idea
  if (lessonPlan.focus) {
    checkPageBreak(50);
    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(220, 220, 225);
    doc.setLineWidth(0.5);

    const focusLines = doc.splitTextToSize(`Core Focus: ${lessonPlan.focus}`, contentWidth - 24);
    const boxHeight = focusLines.length * 13 + 18;
    doc.roundedRect(margin, y, contentWidth, boxHeight, 4, 4, 'FD');

    // Accent line on left of focus box
    doc.setFillColor(218, 165, 32);
    doc.rect(margin, y, 4, boxHeight, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(50, 50, 50);
    doc.text(focusLines, margin + 14, y + 14);
    y += boxHeight + 16;
  }

  // 5. Standards Overview Description
  if (lessonPlan.standardsOverview) {
    checkPageBreak(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    doc.text('ALIGNED PERFORMANCE EXPECTATION', margin, y);
    y += 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const standardDescLines = doc.splitTextToSize(lessonPlan.standardsOverview, contentWidth);
    doc.text(standardDescLines, margin, y);
    y += standardDescLines.length * 12 + 16;
  }

  // 6. Measurable Learning Objectives
  if (lessonPlan.objectives && lessonPlan.objectives.length > 0) {
    checkPageBreak(50 + lessonPlan.objectives.length * 18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);
    doc.text('MEASURABLE LEARNING OBJECTIVES (SWBAT)', margin, y);
    y += 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(50, 50, 50);

    lessonPlan.objectives.forEach((obj, idx) => {
      checkPageBreak(25);
      const bullet = `${idx + 1}.`;
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(180, 130, 20);
      doc.text(bullet, margin + 4, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 40, 40);
      const objLines = doc.splitTextToSize(obj, contentWidth - 26);
      doc.text(objLines, margin + 22, y);
      y += objLines.length * 13 + 6;
    });

    y += 10;
  }

  // 7. Materials & Setup
  const materials = lessonPlan.materialsList && lessonPlan.materialsList.length > 0
    ? lessonPlan.materialsList.map((m) => `${m.name}${m.quantity ? ` (${m.quantity})` : ''}`)
    : lessonPlan.materials && lessonPlan.materials.length > 0
    ? lessonPlan.materials
    : [];

  if (materials.length > 0) {
    checkPageBreak(40 + Math.ceil(materials.length / 2) * 16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);
    doc.text('REQUIRED LAB & CLASSROOM MATERIALS', margin, y);
    y += 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);

    // Two-column layout for materials
    const colWidth = (contentWidth - 16) / 2;
    materials.forEach((mat, idx) => {
      const isCol2 = idx % 2 === 1;
      const colX = isCol2 ? margin + colWidth + 16 : margin;
      if (!isCol2 && idx > 0) {
        y += 16;
        checkPageBreak(20);
      }

      // Checkmark bullet
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(180, 130, 20);
      doc.text('•', colX + 4, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
      const matLines = doc.splitTextToSize(mat, colWidth - 14);
      doc.text(matLines, colX + 14, y);
    });

    y += 24;
  }

  // 8. Timed Pedagogical Agenda & Activity Sequence
  if (lessonPlan.agenda && lessonPlan.agenda.length > 0) {
    checkPageBreak(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);
    doc.text('TIMED PEDAGOGICAL AGENDA & INSTRUCTIONAL SCRIPT', margin, y);
    y += 16;

    lessonPlan.agenda.forEach((step, idx) => {
      checkPageBreak(65);

      // Section Header with Time Pill
      const timeStr = `${step.minutes} MIN`;
      doc.setFillColor(245, 245, 248);
      doc.setDrawColor(220, 220, 230);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(20, 20, 20);
      doc.text(`${idx + 1}. ${step.segment}`, margin + 10, y + 14);

      // Time tag
      doc.setFillColor(235, 240, 255);
      doc.setTextColor(180, 120, 10);
      doc.setFontSize(8.5);
      doc.text(timeStr, pageWidth - margin - 10, y + 14, { align: 'right' });

      y += 30;

      // Teacher Script / Guidance
      if (step.instructions) {
        checkPageBreak(30);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        doc.text('TEACHER SCRIPT / GUIDANCE:', margin + 8, y);
        y += 12;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(45, 45, 45);
        const scriptLines = doc.splitTextToSize(step.instructions, contentWidth - 16);
        doc.text(scriptLines, margin + 8, y);
        y += scriptLines.length * 12 + 8;
      }

      // Student Activity
      if (step.studentActivity) {
        checkPageBreak(30);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        doc.text('STUDENT ACTIONS & COLLABORATION:', margin + 8, y);
        y += 12;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        const actLines = doc.splitTextToSize(step.studentActivity, contentWidth - 16);
        doc.text(actLines, margin + 8, y);
        y += actLines.length * 12 + 10;
      }

      y += 8;
    });
  }

  // 9. Add Page Footers to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    doc.setDrawColor(230, 230, 235);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 35, pageWidth - margin, pageHeight - 35);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text(
      'LessonForge AI  •  Westbrook Middle School EDU Curriculum Archive',
      margin,
      pageHeight - 22
    );

    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 22,
      { align: 'right' }
    );
  }

  // Clean filename
  const cleanTitle = (lessonPlan.title || 'Lesson_Plan')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 45);
  doc.save(`${cleanTitle}_Lesson_Plan.pdf`);
}
