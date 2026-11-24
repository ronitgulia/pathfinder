export const CAREER_ROADMAPS = {
  1: {
    id: 1,
    title: 'Data Scientist',
    category: 'Technology & AI',
    match: 98,
    salary: '$125,000 / yr',
    growth: '+31%',
    duration: '4-6 Years to Senior Level',
    summary: 'Data Scientists combine programming, statistical modeling, and domain expertise to extract actionable insights from big data and train predictive machine learning models.',
    phases: [
      {
        phase: 1,
        title: 'High School & Foundation',
        timeframe: 'Grades 9 - 12',
        objective: 'Build computational thinking and strong quantitative grounding.',
        milestones: [
          { id: 'ds-1-1', text: 'Master AP Calculus BC & Advanced Statistics', completed: true },
          { id: 'ds-1-2', text: 'Learn fundamental Python syntax and basic data structures', completed: true },
          { id: 'ds-1-3', text: 'Participate in math competitions (AMC/AIME) or robotics clubs', completed: false }
        ],
        courses: ['AP Computer Science A', 'AP Statistics', 'Linear Algebra Basics']
      },
      {
        phase: 2,
        title: 'Undergraduate Degree',
        timeframe: 'Years 1 - 4 (College)',
        objective: 'Earn a degree in Computer Science, Data Science, Statistics, or Applied Mathematics.',
        milestones: [
          { id: 'ds-2-1', text: 'Complete core coursework in Data Structures, Algorithms & Probability', completed: false },
          { id: 'ds-2-2', text: 'Master SQL databases, Pandas, NumPy, and Scikit-Learn', completed: false },
          { id: 'ds-2-3', text: 'Publish 2+ end-to-end data analysis projects on GitHub', completed: false },
          { id: 'ds-2-4', text: 'Secure a summer Data Analyst or ML Engineering internship', completed: false }
        ],
        courses: ['Multivariable Calculus', 'Database Systems', 'Machine Learning Foundations']
      },
      {
        phase: 3,
        title: 'Specialization & Certifications',
        timeframe: 'Senior Year / Early Career',
        objective: 'Specialize in deep learning, NLP, or scalable cloud data pipelines.',
        milestones: [
          { id: 'ds-3-1', text: 'Earn AWS Certified Machine Learning or GCP Professional Data Engineer', completed: false },
          { id: 'ds-3-2', text: 'Compete in Kaggle competitions (reach Expert tier)', completed: false },
          { id: 'ds-3-3', text: 'Build and deploy a full-stack LLM or vision application using FastAPI & Docker', completed: false }
        ],
        courses: ['Deep Learning Specialization (DeepLearning.AI)', 'GCP Data Engineering']
      },
      {
        phase: 4,
        title: 'Professional Practice & Impact',
        timeframe: 'Years 1 - 3 (Industry)',
        objective: 'Work as a Junior to Mid-level Data Scientist delivering measurable ROI.',
        milestones: [
          { id: 'ds-4-1', text: 'Deploy production A/B testing frameworks and ML pipelines', completed: false },
          { id: 'ds-4-2', text: 'Lead cross-functional data initiatives with product and leadership teams', completed: false },
          { id: 'ds-4-3', text: 'Mentor junior analysts and contribute to open-source tools', completed: false }
        ],
        courses: ['MLOps Fundamentals', 'Distributed Computing with PySpark']
      }
    ]
  },
  2: {
    id: 2,
    title: 'Financial Analyst',
    category: 'Finance',
    match: 92,
    salary: '$95,000 / yr',
    growth: '+9%',
    duration: '4-5 Years',
    summary: 'Financial Analysts assess financial data, build predictive cash flow models, evaluate investment risks, and provide strategic recommendations to corporate leadership.',
    phases: [
      {
        phase: 1,
        title: 'Foundation & Quantitative Skills',
        timeframe: 'Grades 9 - 12',
        objective: 'Develop advanced mathematical agility, macroeconomic literacy, and business acumen.',
        milestones: [
          { id: 'fa-1-1', text: 'Excel in AP Microeconomics & AP Macroeconomics', completed: true },
          { id: 'fa-1-2', text: 'Learn advanced Excel shortcuts, formulas, and VLOOKUP/XLOOKUP', completed: false },
          { id: 'fa-1-3', text: 'Participate in investment simulation or stock pitch challenges', completed: false }
        ],
        courses: ['AP Economics', 'AP Calculus AB', 'Business Communications']
      },
      {
        phase: 2,
        title: 'Bachelors in Finance or Economics',
        timeframe: 'Years 1 - 4 (College)',
        objective: 'Complete degree with honors while mastering corporate valuation and accounting.',
        milestones: [
          { id: 'fa-2-1', text: 'Maintain a 3.7+ GPA in Finance, Economics, or Accounting', completed: false },
          { id: 'fa-2-2', text: 'Master 3-statement financial modeling and Discounted Cash Flow (DCF)', completed: false },
          { id: 'fa-2-3', text: 'Secure an Investment Banking or Corporate FP&A summer analyst position', completed: false }
        ],
        courses: ['Corporate Finance', 'Financial Statement Analysis', 'Portfolio Management']
      },
      {
        phase: 3,
        title: 'Certifications & Licensing',
        timeframe: 'Final Year & First 2 Years in Industry',
        objective: 'Attain elite industry credentials.',
        milestones: [
          { id: 'fa-3-1', text: 'Pass CFA Level I exam prior to or immediately following graduation', completed: false },
          { id: 'fa-3-2', text: 'Master Bloomberg Terminal and Capital IQ platforms', completed: false },
          { id: 'fa-3-3', text: 'Complete Wall Street Prep or CFI Financial Modeling Certification', completed: false }
        ],
        courses: ['CFA Program', 'Financial Modeling & Valuation Analyst (FMVA)']
      },
      {
        phase: 4,
        title: 'Senior Financial Analyst / Portfolio Lead',
        timeframe: 'Years 3 - 5+',
        objective: 'Direct strategic M&A deals, fund allocations, or corporate treasury operations.',
        milestones: [
          { id: 'fa-4-1', text: 'Complete CFA Charterholder requirements (Levels I, II, III + work experience)', completed: false },
          { id: 'fa-4-2', text: 'Present quarterly investment briefings to C-suite and board stakeholders', completed: false }
        ],
        courses: ['Advanced Mergers & Acquisitions', 'Strategic Corporate Restructuring']
      }
    ]
  },
  3: {
    id: 3,
    title: 'Software Architect',
    category: 'Technology',
    match: 87,
    salary: '$155,000 / yr',
    growth: '+25%',
    duration: '6-8 Years to Principal Level',
    summary: 'Software Architects make high-level design decisions, establish technical standards, and design resilient distributed architectures for enterprise-scale platforms.',
    phases: [
      {
        phase: 1,
        title: 'Programming Foundations',
        timeframe: 'High School',
        objective: 'Master foundational computer science and systems programming concepts.',
        milestones: [
          { id: 'sa-1-1', text: 'Build strong proficiency in Java, C++, or Python', completed: true },
          { id: 'sa-1-2', text: 'Learn Linux command line and Git version control workflows', completed: true }
        ],
        courses: ['AP Computer Science', 'Data Structures & OOP']
      },
      {
        phase: 2,
        title: 'Computer Science Degree & Internships',
        timeframe: 'Undergraduate',
        objective: 'Deepen understanding of operating systems, networking, and distributed computing.',
        milestones: [
          { id: 'sa-2-1', text: 'Complete Operating Systems, Computer Architecture, and Networks', completed: false },
          { id: 'sa-2-2', text: 'Build full-stack microservices with Docker, Kubernetes, and REST/gRPC', completed: false },
          { id: 'sa-2-3', text: 'Work as a Software Engineering intern at a high-scale technology firm', completed: false }
        ],
        courses: ['Distributed Systems', 'Cloud Computing', 'Database Internals']
      },
      {
        phase: 3,
        title: 'Senior Engineer to Systems Architect',
        timeframe: 'Years 3 - 6',
        objective: 'Transition from feature implementation to enterprise system design.',
        milestones: [
          { id: 'sa-3-1', text: 'Earn AWS Certified Solutions Architect - Professional', completed: false },
          { id: 'sa-3-2', text: 'Architect resilient event-driven architectures (Kafka, RabbitMQ, Redis)', completed: false },
          { id: 'sa-3-3', text: 'Establish engineering RFC processes and architectural review boards', completed: false }
        ],
        courses: ['Enterprise Architecture Patterns', 'System Design at Scale']
      }
    ]
  },
  4: {
    id: 4,
    title: 'Market Research Analyst',
    category: 'Business',
    match: 85,
    salary: '$75,000 / yr',
    growth: '+19%',
    duration: '4-5 Years',
    summary: 'Market Research Analysts study consumer behavior, conduct competitive intelligence studies, and analyze demographic data to help organizations position and sell products.',
    phases: [
      {
        phase: 1,
        title: 'Analytical & Communication Foundations',
        timeframe: 'High School',
        objective: 'Strengthen written expression, survey methodologies, and basic statistics.',
        milestones: [
          { id: 'mra-1-1', text: 'Excel in AP Statistics and AP Psychology', completed: true },
          { id: 'mra-1-2', text: 'Conduct an independent consumer sentiment survey or market project', completed: false }
        ],
        courses: ['Statistics', 'Psychology', 'Business Principles']
      },
      {
        phase: 2,
        title: 'Undergraduate Education',
        timeframe: 'Undergraduate',
        objective: 'Earn degree in Marketing, Business Analytics, or Sociology.',
        milestones: [
          { id: 'mra-2-1', text: 'Master SPSS, Qualtrics, Tableau, and Google Analytics', completed: false },
          { id: 'mra-2-2', text: 'Complete a market research internship with a consumer brand or agency', completed: false }
        ],
        courses: ['Consumer Behavior', 'Quantitative Research Methods', 'Data Visualization']
      },
      {
        phase: 3,
        title: 'Lead Analyst & Strategic Consultant',
        timeframe: 'Years 2 - 5',
        objective: 'Deliver high-impact market forecasts and consumer segmentation models.',
        milestones: [
          { id: 'mra-3-1', text: 'Earn PRC (Professional Researcher Certification)', completed: false },
          { id: 'mra-3-2', text: 'Publish industry benchmark reports and lead client advisory engagements', completed: false }
        ],
        courses: ['Predictive Consumer Analytics', 'Brand Equity Modeling']
      }
    ]
  }
};

export const getRoadmapByCareerId = (id) => {
  const numericId = Number(id);
  if (CAREER_ROADMAPS[numericId]) {
    return CAREER_ROADMAPS[numericId];
  }
  // Fallback default roadmap
  return {
    id: numericId || 1,
    title: 'Career Exploration Roadmap',
    category: 'Professional Development',
    match: 90,
    salary: '$100,000 / yr',
    growth: '+20%',
    duration: '4-5 Years',
    summary: 'Comprehensive career acceleration roadmap covering foundational studies, collegiate degrees, industry certifications, and leadership milestones.',
    phases: CAREER_ROADMAPS[1].phases
  };
};
