export const COLLEGES_DATA = [
  {
    id: 1,
    name: 'Stanford University',
    location: 'Stanford, California, USA',
    match: 95,
    type: 'Private',
    ranking: '#3 National University',
    acceptanceRate: '3.9%',
    avgGpa: '3.96',
    satRange: '1500 - 1570',
    actRange: '34 - 36',
    testPolicy: 'Test-Optional for 2026-2027',
    applicationDeadlines: {
      earlyAction: 'Nov 1, 2026 (Restrictive Early Action)',
      regularDecision: 'Jan 5, 2027',
      financialAidPriority: 'Feb 15, 2027'
    },
    tuitionAndFees: {
      annualTuition: '$65,127',
      roomAndBoard: '$21,315',
      estimatedTotal: '$92,892 / yr',
      financialAidHighlight: 'Tuition is 100% free for families with income below $150,000.'
    },
    programs: ['Computer Science', 'Business / Economics', 'Symbolic Systems', 'Bioengineering'],
    requiredHighSchoolCourses: [
      { subject: 'English', years: '4 Years', detail: 'Rigorous writing, literature, and analytical composition' },
      { subject: 'Mathematics', years: '4 Years', detail: 'Through Calculus (AB/BC recommended for STEM majors)' },
      { subject: 'Laboratory Science', years: '3-4 Years', detail: 'Biology, Chemistry, and Physics' },
      { subject: 'Social Studies / History', years: '3+ Years', detail: 'World History, US History, Civics or Economics' },
      { subject: 'Foreign Language', years: '3+ Years', detail: 'Three or more years of the same foreign language' }
    ],
    applicationChecklist: [
      { id: 'app', title: 'Common Application or Coalition with Scoir', required: true, description: 'Includes personal essay and activities list.' },
      { id: 'fee', title: '$90 Nonrefundable Application Fee or Fee Waiver', required: true, description: 'Automatic waivers for qualified families.' },
      { id: 'recs', title: 'Two Teacher Recommendations & Counselor Report', required: true, description: 'From teachers in core academic subjects.' },
      { id: 'transcript', title: 'Official High School Transcript & Mid-Year Report', required: true, description: 'Submitted directly by school counselor.' },
      { id: 'essays', title: 'Stanford Short Questions & Short Essays', required: true, description: 'Three 100-250 word short essays.' }
    ]
  },
  {
    id: 2,
    name: 'Massachusetts Institute of Technology (MIT)',
    location: 'Cambridge, Massachusetts, USA',
    match: 98,
    type: 'Private',
    ranking: '#2 National University',
    acceptanceRate: '4.5%',
    avgGpa: '4.00 (Unweighted)',
    satRange: '1520 - 1580',
    actRange: '35 - 36',
    testPolicy: 'Standardized Testing Required (SAT / ACT)',
    applicationDeadlines: {
      earlyAction: 'Nov 1, 2026',
      regularDecision: 'Jan 4, 2027',
      financialAidPriority: 'Feb 15, 2027'
    },
    tuitionAndFees: {
      annualTuition: '$64,310',
      roomAndBoard: '$20,770',
      estimatedTotal: '$89,990 / yr',
      financialAidHighlight: 'Tuition-free for families earning under $200,000 with typical assets.'
    },
    programs: ['Electrical Engineering & Computer Science (EECS)', 'Data Science & Computation', 'Mechanical Engineering', 'Mathematics'],
    requiredHighSchoolCourses: [
      { subject: 'Mathematics', years: '4 Years', detail: 'Calculus is required for all applicants' },
      { subject: 'Physics', years: '1+ Year', detail: 'Calculus-based or AP/IB Physics strongly recommended' },
      { subject: 'Chemistry', years: '1+ Year', detail: 'General or AP Chemistry' },
      { subject: 'Biology', years: '1+ Year', detail: 'General or AP Biology' },
      { subject: 'English & Humanities', years: '4 Years', detail: 'Expository writing and communication' }
    ],
    applicationChecklist: [
      { id: 'mit-app', title: 'MIT Application Portal', required: true, description: 'MIT uses its own dedicated application system.' },
      { id: 'evals', title: 'Two Letters of Recommendation', required: true, description: 'One from a Math/Science teacher, one from a Humanities teacher.' },
      { id: 'testing', title: 'Official SAT or ACT Score Report', required: true, description: 'Self-reported scores accepted for initial review.' },
      { id: 'interview', title: 'Educational Council (EC) Interview', required: false, description: 'Offered based on regional alumni availability.' },
      { id: 'portfolio', title: 'Creative or Maker Portfolio (Optional)', required: false, description: 'Showcase original research, code, or engineering prototypes.' }
    ]
  },
  {
    id: 3,
    name: 'University of California, Berkeley',
    location: 'Berkeley, California, USA',
    match: 90,
    type: 'Public',
    ranking: '#1 Public University in USA',
    acceptanceRate: '11.4%',
    avgGpa: '3.89 - 4.00',
    satRange: 'Test-Blind (Not considered)',
    actRange: 'Test-Blind (Not considered)',
    testPolicy: 'Test-Free (UC Systemwide Policy)',
    applicationDeadlines: {
      earlyAction: 'Not offered (Single Deadline)',
      regularDecision: 'Nov 30, 2026 (UC Application window Oct 1 - Nov 30)',
      financialAidPriority: 'March 2, 2027'
    },
    tuitionAndFees: {
      annualTuition: '$15,444 (In-state) / $49,644 (Out-of-state)',
      roomAndBoard: '$22,500',
      estimatedTotal: '$42,500 (In-state) / $76,700 (Out-of-state)',
      financialAidHighlight: 'Blue and Gold Opportunity Plan covers systemwide tuition for CA families under $80,000.'
    },
    programs: ['Computer Science (CDSS)', 'College of Engineering (EECS)', 'Architecture & Urban Planning', 'Haas Business Administration'],
    requiredHighSchoolCourses: [
      { subject: 'History / Social Science (A)', years: '2 Years', detail: 'World History and US History' },
      { subject: 'English (B)', years: '4 Years', detail: 'College-preparatory English' },
      { subject: 'Mathematics (C)', years: '3-4 Years', detail: 'Algebra I, Geometry, Algebra II (Precalc/Calc recommended)' },
      { subject: 'Science (D)', years: '2-3 Years', detail: 'At least two lab sciences (Biology, Chemistry, Physics)' },
      { subject: 'Language other than English (E)', years: '2-3 Years', detail: 'Consecutive study of same language' }
    ],
    applicationChecklist: [
      { id: 'uc-app', title: 'University of California (UC) Online Application', required: true, description: 'Systemwide application submitted directly.' },
      { id: 'piqs', title: 'Four Personal Insight Questions (PIQs)', required: true, description: 'Choose 4 of 8 prompts (350 words max each).' },
      { id: 'self-report', title: 'Self-Reported High School Academic Coursework', required: true, description: 'Official transcripts only needed upon enrollment.' }
    ]
  },
  {
    id: 4,
    name: 'University of Oxford',
    location: 'Oxford, Oxfordshire, United Kingdom',
    match: 85,
    type: 'Public Collegiate',
    ranking: '#1 Global University (Times Higher Ed)',
    acceptanceRate: '14.5%',
    avgGpa: '3.90+ (or 3-4 AP scores of 5)',
    satRange: '1480+ (Plus AP Exams)',
    actRange: '33+ (Plus AP Exams)',
    testPolicy: 'Subject Specific Admissions Tests (MAT, TSA, PAT)',
    applicationDeadlines: {
      earlyAction: 'Oct 15, 2026 (Strict UCAS Deadline)',
      regularDecision: 'Oct 15, 2026',
      financialAidPriority: 'Jan 20, 2027'
    },
    tuitionAndFees: {
      annualTuition: '£9,250 (Home) / £35,000 - £48,000 (Overseas)',
      roomAndBoard: '£11,000 - £16,000',
      estimatedTotal: '~£55,000 / yr for international students',
      financialAidHighlight: 'Crankstart and Reach Oxford Scholarships available for eligible applicants.'
    },
    programs: ['Philosophy, Politics & Economics (PPE)', 'Law (Jurisprudence)', 'Computer Science', 'Economics & Management'],
    requiredHighSchoolCourses: [
      { subject: 'Advanced Placement (AP)', years: '3-4 Exams', detail: 'Minimum scores of 5 in relevant subject areas' },
      { subject: 'Subject Testing', years: 'Required', detail: 'Admissions tests depending on course (e.g. MAT, TSA, LNAT)' },
      { subject: 'Academic Rigor', years: 'Full High School', detail: 'Deep, demonstrative reading and passion in the chosen subject' }
    ],
    applicationChecklist: [
      { id: 'ucas', title: 'UCAS Application (College Choice or Open)', required: true, description: 'Submit via UCAS portal by October 15.' },
      { id: 'ox-test', title: 'Register for Course Admissions Test', required: true, description: 'Take MAT, TSA, or course-specific test in October/November.' },
      { id: 'work', title: 'Submit Written Work Samples (if required)', required: false, description: 'Essays or problem sets marked by your school.' },
      { id: 'ox-interview', title: 'Oxford Academic Admissions Interview', required: true, description: 'Invitations issued in late November for December interviews.' }
    ]
  }
];

export const getCollegeById = (id) => {
  const numericId = Number(id);
  const college = COLLEGES_DATA.find(c => c.id === numericId);
  if (college) return college;
  return COLLEGES_DATA[0];
};
