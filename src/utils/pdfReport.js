import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const PRIMARY_RGB = [30, 58, 138]; // #1e3a8a
const SECONDARY_RGB = [16, 185, 129]; // #10b981
const TEXT_DARK_RGB = [30, 41, 59]; // #1e293b
const TEXT_MUTED_RGB = [100, 116, 139]; // #64748b
const BG_LIGHT_RGB = [248, 250, 252]; // #f8fafc
const BORDER_RGB = [226, 232, 240]; // #e2e8f0

function formatDateTime(isoString) {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return String(isoString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatDateShort(isoString) {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return String(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function drawDocumentHeader(doc, title, subtitle) {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Deep blue header banner
  doc.setFillColor(...PRIMARY_RGB);
  doc.rect(0, 0, pageWidth, 30, 'F');

  // Emerald accent strip
  doc.setFillColor(...SECONDARY_RGB);
  doc.rect(0, 30, pageWidth, 1.8, 'F');

  // Brand tag
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(167, 243, 208);
  doc.text('PATHFINDER AI  |  OFFICIAL REPORT', 14, 10);

  // Main title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(title, 14, 19);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(226, 232, 240);
  doc.text(subtitle, 14, 26);

  return 39;
}

function applyPageFooters(doc, footerText) {
  const totalPages = doc.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  for (let i = 1; i <= totalPages; i += 1) {
    doc.setPage(i);
    doc.setDrawColor(...BORDER_RGB);
    doc.setLineWidth(0.3);
    doc.line(14, pageHeight - 14, pageWidth - 14, pageHeight - 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_MUTED_RGB);
    doc.text(footerText, 14, pageHeight - 8.5);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 14, pageHeight - 8.5, { align: 'right' });
  }
}

function addSectionHeading(doc, text, y) {
  const pageHeight = doc.internal.pageSize.getHeight();
  let nextY = y;
  if (nextY > pageHeight - 36) {
    doc.addPage();
    nextY = 18;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(...PRIMARY_RGB);
  doc.text(text, 14, nextY);

  doc.setDrawColor(...BORDER_RGB);
  doc.setLineWidth(0.4);
  doc.line(14, nextY + 2, doc.internal.pageSize.getWidth() - 14, nextY + 2);

  return nextY + 6;
}

function getLastTableY(doc, fallbackY) {
  return doc.lastAutoTable && typeof doc.lastAutoTable.finalY === 'number'
    ? doc.lastAutoTable.finalY + 9
    : fallbackY + 12;
}

/**
 * Generates and downloads a formatted PDF report for a submitted scholarship application.
 */
export function downloadScholarshipApplicationPDF(application, scholarship, user) {
  if (!application || !scholarship) {
    throw new Error('Application data is unavailable for PDF generation.');
  }

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const applicant = application.applicant || {};
  const essayText = (application.essay || '').trim();
  const wordCount = essayText ? essayText.split(/\s+/).length : 0;

  let y = drawDocumentHeader(
    doc,
    'Scholarship Application Report',
    `Confirmation ID: ${application.applicationId || 'N/A'}  •  Generated ${formatDateTime(new Date().toISOString())}`
  );

  // Status Summary Card
  doc.setFillColor(...BG_LIGHT_RGB);
  doc.setDrawColor(...BORDER_RGB);
  doc.roundedRect(14, y, pageWidth - 28, 22, 2, 2, 'FD');

  doc.setFillColor(...SECONDARY_RGB);
  doc.rect(14, y, 2.5, 22, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...TEXT_DARK_RGB);
  doc.text(scholarship.name || application.scholarshipName || 'Scholarship Application', 20, y + 7.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_MUTED_RGB);
  doc.text(`Status: ${application.status || 'Submitted - Under Review'}`, 20, y + 13.5);
  doc.text(`Submitted On: ${formatDateTime(application.submittedAt)}`, 20, y + 18.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(5, 150, 105);
  doc.text(scholarship.amount || application.amount || 'Award', pageWidth - 18, y + 11, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_MUTED_RGB);
  doc.text(scholarship.awardType || 'Scholarship Grant', pageWidth - 18, y + 16.5, { align: 'right' });

  y += 30;

  // Section 1: Scholarship Details
  y = addSectionHeading(doc, '1. Scholarship Program Details', y);
  autoTable(doc, {
    startY: y,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_RGB,
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      textColor: TEXT_DARK_RGB,
      fontSize: 9,
      cellPadding: 3
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 48, fillColor: BG_LIGHT_RGB },
      1: { cellWidth: 'auto' }
    },
    head: [['Field', 'Scholarship Details']],
    body: [
      ['Scholarship Name', scholarship.name || application.scholarshipName || 'N/A'],
      ['Sponsor Organization', scholarship.sponsor || 'N/A'],
      ['Category', scholarship.category || 'N/A'],
      ['Award Amount', `${scholarship.amount || application.amount || 'N/A'} (${scholarship.awardType || 'Grant'})`],
      ['Application Deadline', scholarship.deadline || 'N/A'],
      ['Eligibility Criteria', scholarship.eligibility || 'N/A']
    ]
  });

  y = getLastTableY(doc, y);

  // Section 2: Applicant Information
  y = addSectionHeading(doc, '2. Applicant Academic Profile', y);
  autoTable(doc, {
    startY: y,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_RGB,
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      textColor: TEXT_DARK_RGB,
      fontSize: 9,
      cellPadding: 3
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 48, fillColor: BG_LIGHT_RGB },
      1: { cellWidth: 'auto' }
    },
    head: [['Applicant Field', 'Submitted Information']],
    body: [
      ['Confirmation ID', application.applicationId || 'N/A'],
      ['Application Status', application.status || 'Submitted - Under Review'],
      ['Submission Timestamp', formatDateTime(application.submittedAt)],
      ['Full Legal Name', applicant.fullName || user?.name || 'N/A'],
      ['Email Address', applicant.email || user?.email || 'N/A'],
      ['Current Grade Level', applicant.grade || user?.grade || 'N/A'],
      ['School / Institution', applicant.school || 'N/A'],
      ['Cumulative GPA', applicant.gpa || 'N/A'],
      ['Intended Major / Focus', applicant.intendedMajor || 'N/A'],
      ['Applicant Certification', 'Certified that all records and statements are true and original work']
    ]
  });

  y = getLastTableY(doc, y);

  // Section 3: Achievements & Leadership
  y = addSectionHeading(doc, '3. Honors, Projects & Leadership', y);
  autoTable(doc, {
    startY: y,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_RGB,
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      textColor: TEXT_DARK_RGB,
      fontSize: 9.5,
      cellPadding: 4
    },
    head: [['Extracurriculars, Awards & Leadership Experience']],
    body: [
      [application.achievements?.trim() || 'No additional honors or extracurriculars listed.']
    ]
  });

  y = getLastTableY(doc, y);

  // Section 4: Personal Statement / Essay
  y = addSectionHeading(doc, '4. Personal Statement & Essay Response', y);
  autoTable(doc, {
    startY: y,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_RGB,
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      textColor: TEXT_DARK_RGB,
      fontSize: 9.5,
      cellPadding: 4
    },
    head: [[`Prompt (${wordCount} / ${scholarship.essayWordLimit || 500} words)`]],
    body: [
      [{ content: `Essay Prompt: "${scholarship.essayPrompt || 'Personal Statement'}"`, styles: { fontStyle: 'italic', fillColor: BG_LIGHT_RGB, textColor: TEXT_MUTED_RGB } }],
      [essayText || 'No essay response provided.']
    ]
  });

  applyPageFooters(
    doc,
    `PathFinder AI • Application ${application.applicationId || ''} • Confidential Student Record`
  );

  const safeId = (application.applicationId || 'report').replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`PathFinder_Application_${safeId}.pdf`);
}

/**
 * Generates and downloads a comprehensive Career & Assessment PDF Report from the Dashboard.
 */
export function downloadCareerDashboardPDF({
  user,
  assessments,
  aptitudeData,
  interestData,
  savedCareers = [],
  savedColleges = [],
  scholarshipApplications = []
}) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const studentName = user?.name || 'Student';
  const completedCount = [
    assessments?.aptitude,
    assessments?.interests,
    assessments?.personality
  ].filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 3) * 100);

  let y = drawDocumentHeader(
    doc,
    'Student Career & Assessment Report',
    `Prepared for ${studentName} (${user?.grade || 'Grade 10'})  •  Generated ${formatDateTime(new Date().toISOString())}`
  );

  // Section 1: Student Profile & Assessment Progress
  y = addSectionHeading(doc, '1. Student Profile & Assessment Summary', y);
  autoTable(doc, {
    startY: y,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    headStyles: { fillColor: PRIMARY_RGB, textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { textColor: TEXT_DARK_RGB, fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 52, fillColor: BG_LIGHT_RGB },
      1: { cellWidth: 'auto' }
    },
    head: [['Profile Metric', 'Details']],
    body: [
      ['Student Name', studentName],
      ['Email Address', user?.email || 'N/A'],
      ['Grade Level', user?.grade || 'Grade 10'],
      ['Report Date', formatDateTime(new Date().toISOString())],
      ['Overall Assessment Progress', `${completedCount} of 3 Completed (${progressPercent}%)`],
      ['Aptitude Test Status', assessments?.aptitude ? 'Completed' : 'Pending'],
      ['Interest Profiler Status', assessments?.interests ? 'Completed' : 'Pending'],
      ['Personality Assessment Status', assessments?.personality ? 'Completed' : 'Pending']
    ]
  });

  y = getLastTableY(doc, y);

  // Section 2: Aptitude Domain Scores
  y = addSectionHeading(doc, '2. Cognitive Aptitude Profile', y);
  autoTable(doc, {
    startY: y,
    margin: { left: 14, right: 14 },
    theme: 'striped',
    headStyles: { fillColor: PRIMARY_RGB, textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { textColor: TEXT_DARK_RGB, fontSize: 9, cellPadding: 3 },
    head: [['Cognitive Domain', 'Score', 'Out Of', 'Performance Tier']],
    body: (aptitudeData || []).map((item) => {
      const tier = item.A >= 85 ? 'Exceptional' : item.A >= 65 ? 'Proficient' : 'Developing';
      return [item.subject, `${item.A}`, `${item.fullMark || 100}`, tier];
    })
  });

  y = getLastTableY(doc, y);

  // Section 3: Interest Profile (RIASEC)
  y = addSectionHeading(doc, '3. Interest Profile (RIASEC) — Holland Code: IRA', y);
  autoTable(doc, {
    startY: y,
    margin: { left: 14, right: 14 },
    theme: 'striped',
    headStyles: { fillColor: PRIMARY_RGB, textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { textColor: TEXT_DARK_RGB, fontSize: 9, cellPadding: 3 },
    head: [['Interest Dimension', 'Score', 'Alignment Level']],
    body: (interestData || []).map((item) => {
      const level = item.score >= 85 ? 'Primary Strength' : item.score >= 70 ? 'Moderate Interest' : 'Supporting';
      return [item.name, `${item.score} / 100`, level];
    })
  });

  y = getLastTableY(doc, y);

  // Section 4: Saved Careers
  y = addSectionHeading(doc, `4. Saved Career Paths (${savedCareers.length})`, y);
  autoTable(doc, {
    startY: y,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    headStyles: { fillColor: PRIMARY_RGB, textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { textColor: TEXT_DARK_RGB, fontSize: 9, cellPadding: 3 },
    head: [['Career Title', 'Category', 'Aptitude Match', 'Projected Growth', 'Compensation']],
    body: savedCareers.length > 0
      ? savedCareers.map((c) => [
          c.title || 'N/A',
          c.category || 'N/A',
          c.match ? `${c.match}%` : '90%',
          c.growth || 'N/A',
          c.salary || 'N/A'
        ])
      : [['No careers bookmarked yet. Explore Recommendations or Careers to save paths.', '-', '-', '-', '-']]
  });

  y = getLastTableY(doc, y);

  // Section 5: Shortlisted Colleges (if any)
  if (savedColleges.length > 0) {
    y = addSectionHeading(doc, `5. Shortlisted Colleges (${savedColleges.length})`, y);
    autoTable(doc, {
      startY: y,
      margin: { left: 14, right: 14 },
      theme: 'grid',
      headStyles: { fillColor: PRIMARY_RGB, textColor: 255, fontStyle: 'bold', fontSize: 9 },
      bodyStyles: { textColor: TEXT_DARK_RGB, fontSize: 9, cellPadding: 3 },
      head: [['Institution', 'Location', 'Type', 'Match']],
      body: savedColleges.map((col) => [
        col.name || 'N/A',
        col.location || 'N/A',
        col.type || 'N/A',
        col.match ? `${col.match}%` : 'N/A'
      ])
    });
    y = getLastTableY(doc, y);
  }

  // Section 6: Submitted Scholarship Applications (if any)
  if (scholarshipApplications.length > 0) {
    const sectionNum = savedColleges.length > 0 ? 6 : 5;
    y = addSectionHeading(doc, `${sectionNum}. Scholarship Applications (${scholarshipApplications.length})`, y);
    autoTable(doc, {
      startY: y,
      margin: { left: 14, right: 14 },
      theme: 'grid',
      headStyles: { fillColor: PRIMARY_RGB, textColor: 255, fontStyle: 'bold', fontSize: 9 },
      bodyStyles: { textColor: TEXT_DARK_RGB, fontSize: 9, cellPadding: 3 },
      head: [['Application ID', 'Scholarship', 'Award', 'Status', 'Submitted Date']],
      body: scholarshipApplications.map((app) => [
        app.applicationId || 'N/A',
        app.scholarshipName || 'N/A',
        app.amount || 'N/A',
        app.status || 'Submitted - Under Review',
        formatDateShort(app.submittedAt)
      ])
    });
  }

  applyPageFooters(doc, `PathFinder AI • Career & Assessment Report • ${studentName}`);

  const safeName = studentName.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`PathFinder_Career_Report_${safeName}.pdf`);
}

