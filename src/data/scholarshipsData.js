export const SCHOLARSHIPS_DATA = [
  {
    id: 1,
    name: 'Women in Tech Excellence Scholarship',
    category: 'STEM & Computer Science',
    amount: '$10,000',
    awardType: 'Annual Cash Grant',
    deadline: 'October 15, 2026',
    sponsor: 'Global Technology Foundation',
    status: 'Open for 2026-2027',
    eligibility: 'Female or non-binary high school seniors or undergraduate students pursuing Computer Science, Data Science, or Software Engineering with a minimum 3.5 GPA.',
    overview: 'Designed to bridge the gender gap in computing by providing tuition relief and pairing recipients with executive mentors at top-tier Silicon Valley firms.',
    benefits: [
      '$10,000 direct tuition grant paid to recipient\'s academic institution',
      'One-on-one executive mentorship from senior female engineering leaders',
      'Guaranteed interview for competitive summer software engineering internships'
    ],
    essayPrompt: 'Describe a technical obstacle or systemic challenge you encountered while building a software or STEM project, and explain how overcoming it reinforced your commitment to computing.',
    essayWordLimit: 500
  },
  {
    id: 2,
    name: 'National STEM Excellence Grant',
    category: 'Science, Math & Engineering',
    amount: 'Full Tuition',
    awardType: 'Full Tuition Coverage (Renewable 4 Years)',
    deadline: 'November 1, 2026',
    sponsor: 'National Science and Innovation Council',
    status: 'Open for 2026-2027',
    eligibility: 'Graduating high school seniors demonstrating high aptitude in quantitative reasoning, mathematics, or experimental sciences with a minimum 3.8 GPA.',
    overview: 'A prestigious nationwide honor awarded to students who demonstrate exceptional promise in scientific inquiry, computational research, or aerospace engineering.',
    benefits: [
      '100% full tuition and mandatory campus fees covered across 4 undergraduate years',
      '$5,000 annual summer undergraduate research stipend',
      'Sponsored attendance to national scientific symposia'
    ],
    essayPrompt: 'Explain an unsolved scientific, computational, or environmental problem that fascinates you, and articulate how you plan to investigate solutions during your undergraduate research career.',
    essayWordLimit: 650
  },
  {
    id: 3,
    name: 'Future Leaders & Innovators Grant',
    category: 'Leadership & Entrepreneurship',
    amount: '$5,000',
    awardType: 'One-Time Merit Award',
    deadline: 'December 31, 2026',
    sponsor: 'Vanguard Youth Enterprise Institute',
    status: 'Open for 2026-2027',
    eligibility: 'High school juniors, seniors, or freshmen college students with proven track records of community leadership, venture founding, or non-profit initiatives.',
    overview: 'Empowering the next generation of social entrepreneurs, student government leaders, and startup builders who have made verifiable impacts in their communities.',
    benefits: [
      '$5,000 unrestricted educational award',
      'Access to the Vanguard Venture Accelerator network and angel investor workshops',
      'Lifetime alumni community membership'
    ],
    essayPrompt: 'Share a story of a community, school, or venture initiative you launched from scratch. What measurable impact did it achieve, and what did it teach you about empathetic leadership?',
    essayWordLimit: 500
  }
];

export const getScholarshipById = (id) => {
  const numericId = Number(id);
  const scholarship = SCHOLARSHIPS_DATA.find(s => s.id === numericId);
  if (scholarship) return scholarship;
  return SCHOLARSHIPS_DATA[0];
};
