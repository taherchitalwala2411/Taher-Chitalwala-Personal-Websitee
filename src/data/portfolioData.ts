import {
  EducationItem,
  SkillCategory,
  AchievementItem,
  ExperienceRole,
  SchoolCollegeExperience,
  ProjectItem,
  GalleryPhoto,
} from '../types/portfolio';

export const personalInfo = {
  fullName: 'Taher Chitalwala',
  shortName: 'Taher Chitalwala',
  tagline: 'Be the best, beat the best.',
  introduction:
    'Always trying to figure things out, explore what I am capable of, and become the best version of myself every single day.',
  location: 'South Mumbai, India',
  dateOfBirth: '24 November 2007',
  currentPursuit: 'Second Year BBA in Digital Business · Hinduja College × IIDE',
  contact: {
    phone: '9326057824',
    phoneFormatted: '+91 93260 57824',
    email: 'taher.roamingmind@gmail.com',
    instagram: 'https://www.instagram.com/tc._.2411?stkn=YnFiZDY3bXpwcXVt',
    instagramHandle: '@tc._.2411',
    linkedin:
      'https://www.linkedin.com/in/taher-chitalwala-513107305?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    linkedinLabel: 'linkedin.com/in/taher-chitalwala-513107305',
  },
  heroPhoto: 'IIMUN event 2.jpeg',
  trophiesPhoto: 'Trophies.jpeg',
};

export const defaultTopPhotos = [
  'Head boy image 2.jpeg',
  'IIMUN event 2.jpeg',
  'Trophies.jpeg',
  'NIE TOI 2.jpeg',
  'with Nadir Godrej.jpeg',
  'SBFL winning.jpeg',
  'WhatsApp Image 2026-10-07 at 8.49.04 AM.jpeg',
];

export const aboutMeNarrative = [
  {
    paragraph:
      'I am Taher Chitalwala, living in South Mumbai. I am currently in the second year of my degree, pursuing a BBA in Digital Business from Hinduja College in collaboration with IIDE.',
  },
  {
    paragraph:
      'I completed my schooling from Saifi High School, where I had the privilege of serving as the Head Boy and graduated as the SSC topper of the school with 92.4%. Later, I completed my 11th and 12th from K.C. College, securing 89.67% in my 12th board examinations.',
  },
  {
    paragraph:
      'Growing up, I was an obedient, disciplined and studious child. Alongside academics, sports have always been a central part of who I am. Football is my favourite sport and biggest passion—I have been playing since 1st grade and always carried the dream of playing professionally. Beyond football, I thoroughly enjoy Carrom, Badminton, and Table Tennis.',
  },
  {
    paragraph:
      'When I am not studying or on the sports field, you will usually find me watching series. Game of Thrones is my absolute favourite, and I am an unapologetic Potterhead and certified Stranger Things fan.',
  },
  {
    paragraph:
      'Today, my focus is centered on Business Administration, specifically Digital Business and Digital Marketing. My father started his sanitary ware business around six years ago, and Alhamdolillah, it is doing well. One of my core ambitions is to help scale his business while also creating and nurturing ventures of my own. I have also always had a keen interest in properties and real estate, and I hope to build a business connected to that space in the future.',
  },
  {
    paragraph:
      'At this point in my life, I am still figuring things out. I don’t claim to have every answer or step mapped out, but I know one thing with certainty: I want to keep learning, keep exploring, and keep pushing myself to achieve my fullest potential every single day.',
  },
];

export const educationList: EducationItem[] = [
  {
    id: 'hinduja',
    institution: 'Hinduja College × IIDE',
    degree: 'BBA in Digital Business',
    period: 'November 2025 – Present',
    grade: 'Currently in Second Year',
    highlights: [
      'Specialized curriculum combining business administration with practical digital business and digital marketing frameworks.',
      'Active participant in academic presentations, industry case studies, and field research projects.',
    ],
    note: 'Commenced degree college in November 2025 following completion of 12th boards in March 2025.',
  },
  {
    id: 'kc-college',
    institution: 'K.C. College, Churchgate',
    degree: 'Junior College (Grade 11 – Grade 12)',
    period: '2023 – March 2025',
    score: '89.67%',
    grade: 'HSC Board Examination',
    highlights: [
      'Secured 89.67% in Maharashtra Higher Secondary Certificate (HSC) board examinations.',
      'Contributed to college annual fest technical department in videography and photography.',
    ],
  },
  {
    id: 'saifi',
    institution: 'Saifi High School',
    degree: 'Secondary Education (Grade 1 – Grade 10)',
    period: '2012 – 2023',
    score: '92.4%',
    grade: 'SSC Board Examination',
    highlights: [
      'Head Boy of the School (2022–2023).',
      'SSC Topper of the School (1st Rank) with 92.4%.',
      'Awarded NIE Times of India Student Award.',
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Communication & Leadership',
    skills: [
      { name: 'Effective Communication', note: 'Public speaking, guest outreach, team moderation' },
      { name: 'Leadership', note: 'Head Boy responsibilities & student council coordination' },
      { name: 'Teamwork', note: 'Cross-functional event operations & sports teams' },
      { name: 'Problem Solving', note: 'On-ground conference logistics & case study analysis' },
      { name: 'Decision Making', note: 'Partner onboarding, prioritization & team alignment' },
    ],
  },
  {
    title: 'Digital & Software Tools',
    skills: [
      { name: 'Microsoft PowerPoint', note: 'Business decks, pitch presentations & case studies' },
      { name: 'Microsoft Excel', note: 'Data organization, partner tracking & basic modeling' },
      { name: 'Microsoft Word', note: 'Reports, formal proposals & documentation' },
      { name: 'Basic Computer Skills', note: 'System navigation, web operations & workspace tools' },
    ],
  },
  {
    title: 'Modern & Creative Disciplines',
    skills: [
      { name: 'AI Skills & AI Tools', note: 'Leveraging AI tools for research, productivity & digital workflows' },
      { name: 'Photography & Videography', note: 'Event coverage, visual framing, content creation for college fest' },
    ],
  },
];

export const achievementsList: AchievementItem[] = [
  {
    id: 'head-boy',
    title: 'Head Boy',
    subtitle: 'Saifi High School (2022–2023)',
    category: 'leadership',
    year: '2022–2023',
    description:
      'Elected to represent the student body as Head Boy. Led school assemblies, coordinated student discipline, bridged communication between faculty and students, and spearheaded flagship school events.',
    photoName: 'Head boy image 2.jpeg',
    photoAlt: 'Taher holding the Saifi High School flag during the investiture ceremony',
    badge: 'School Leadership',
  },
  {
    id: 'ssc-topper',
    title: 'SSC Topper of the School (1st Rank)',
    subtitle: '92.4% · Saifi High School',
    category: 'academic',
    year: '2023',
    description:
      'Secured 1st Rank across Saifi High School in the Secondary School Certificate (SSC) board examinations with a score of 92.4%, demonstrating consistent academic excellence and disciplined study habits.',
    badge: 'Academic Distinction',
  },
  {
    id: 'hsc-boards',
    title: 'HSC 12th Board Examination',
    subtitle: '89.67% · K.C. College',
    category: 'academic',
    year: '2025',
    description:
      'Achieved 89.67% in the Maharashtra State Board HSC examinations from K.C. College, balancing rigorous academics with extracurricular involvement and college fest responsibilities.',
    badge: 'Higher Secondary',
  },
  {
    id: 'nie-toi',
    title: 'NIE Times of India Student Award',
    subtitle: 'The Times of India in association with Vidyalankar',
    category: 'academic',
    year: '2022–2023',
    description:
      'Conferred the prestigious NIE Times of India Student of the Year Award and featured in The Times of India student publication in recognition of outstanding academic and leadership achievements.',
    photoName: 'NIE TOI 2.jpeg',
    photoAlt: 'Taher on stage receiving NIE Times of India Student of the Year Award',
    badge: 'State & Media Honor',
  },
  {
    id: 'sbfl-football',
    title: 'Saifee Burhani Football League (SBFL)',
    subtitle: 'Runners-up · Season 4',
    category: 'sports',
    year: 'Competitive Season',
    description:
      'Finished as Runners-up in the Saifee Burhani Football League (SBFL), competing against premier community squads in high-intensity knockout matches.',
    photoName: 'SBFL winning.jpeg',
    photoAlt: 'Taher and team holding the SBFL Runners-Up board and medals',
    badge: 'Football Tournament',
  },
  {
    id: 'shining-star',
    title: 'Shining Star Award',
    subtitle: 'Saifi High School',
    category: 'academic',
    year: 'Grade 4 (2015–2016)',
    description:
      'Received the Shining Star award in Grade 4, honoring all-round discipline, academic consistency, and helpfulness among peers early in school life.',
    badge: 'Early Recognition',
  },
  {
    id: 'olympiads',
    title: 'Olympiad Medals & Distinctions',
    subtitle: 'National & International Competitions',
    category: 'academic',
    year: 'Multiple Years',
    description:
      'Awarded medals of distinction in various science, mathematics, and general Olympiad examinations during school years.',
    badge: 'STEM Competition',
  },
  {
    id: 'sports-medals',
    title: 'Sports Medals & Athletic Trophies',
    subtitle: 'Kho-Kho, Carrom, Football & Athletics',
    category: 'sports',
    year: 'School & Junior College',
    description:
      'Recognized with multiple trophies and medals including Best Player in Kho-Kho, Bandra Carrom Championship Season 3 Runners-Up Doubles, and marathon distance runs.',
    badge: 'Multi-Sport Athletics',
  },
  {
    id: 'iimun-intra-mun',
    title: 'IIMUN Intra MUN – Special Mention',
    subtitle: 'Harry Potter Committee',
    category: 'extracurricular',
    year: '2025',
    description:
      'Earned Special Mention in the Harry Potter Committee at the IIMUN Intra Model United Nations, combining persuasive argumentation, creative diplomacy, and quick critical thinking.',
    badge: 'Model UN Diplomacy',
  },
];

export const experienceData: ExperienceRole = {
  organization: "I.I.M.U.N. (India's International Movement to Unite Nations)",
  role: 'Senior Volunteer',
  department: 'Resource Management Department',
  period: 'December 2025 – Present',
  badge: "World's Largest Youth-Run Organisation",
  description:
    "I joined IIMUN in December 2025 and currently serve as a Senior Volunteer in the Resource Management Department. IIMUN is the world's largest youth-run organisation, bringing students, young leaders, and global thought-provokers together through nationwide youth conferences.",
  responsibilities: [
    'Onboarding strategic corporate and institutional partners for city conferences across India',
    'Outreach, written communication, and structured relationship management with key sponsors',
    'Identifying, pitching, and coordinating with eminent chief guests and plenary speakers',
    'Liaising with city administrations, host institutions, and multi-department conference crews',
    'Fostering long-term professional relationships across diverse industries and leadership tiers',
  ],
  keyAccomplishments: {
    partnersCount: '40+',
    cities: ['Surat', 'Amritsar', 'Sri Vijaya Puram (Port Blair)', 'Mysore', 'and several others'],
    invitedGuests: [
      'President of the Opposition Party of Gujarat',
      'Sitting Chairperson of the Municipal Council of Sri Vijaya Puram',
      'Prominent business founders, civil servants, and community leaders',
    ],
  },
  interactions: [
    {
      name: 'Shri Mohan Bhagwat',
      context: 'National leadership discourse and youth perspectives',
    },
    {
      name: 'Shri Nitin Gadkari',
      context: 'Infrastructure vision, public policy, and national progress',
    },
    {
      name: 'Dr. Shashi Tharoor',
      context: 'Diplomacy, literature, and the art of articulation',
    },
    {
      name: 'Nadir Godrej',
      context: 'Sustainable industry, corporate longevity, and thoughtful philanthropy',
    },
    {
      name: 'Niranjan Hiranandani',
      context: 'Urban development, real estate scalability, and entrepreneurship',
    },
    {
      name: 'Dr. Mukesh Batra',
      context: 'Healthcare entrepreneurship, arts, and photography',
    },
    {
      name: 'Boman Irani',
      context: 'Storytelling, resilience, and creative performance',
    },
    {
      name: 'Radhika Merchant Ambani',
      context: 'Youth empowerment and community development sessions',
    },
    {
      name: 'Jackie Shroff',
      context: 'Grounded authenticity and engaging with diverse people',
    },
    {
      name: 'Nakul Mehta',
      context: 'Media, communication, and modern cultural expressions',
    },
    {
      name: 'Founder of Benne',
      context: 'New-age culinary branding and consumer entrepreneurship',
    },
  ],
};

export const schoolCollegeExperience: SchoolCollegeExperience[] = [
  {
    title: 'School Leadership – Head Boy',
    category: 'Leadership & Responsibility',
    period: 'Saifi High School',
    description:
      'Serving as the Head Boy of my school was a defining formative milestone. It instilled in me a deep sense of accountability, disciplined routine, empathetic communication, and the humility required to lead peers effectively.',
    takeaways: ['Accountability under pressure', 'Public address & mediation', 'Peer empathy and trust-building'],
  },
  {
    title: 'College Annual Fest – Technical Team',
    category: 'Creative Production & Visuals',
    period: 'Junior College (K.C. College)',
    description:
      'Collaborated within the college annual fest technical department. Focused hands-on on event photography, dynamic video recording, framing candid moments, and appearing in engaging social reels to amplify fest visibility.',
    takeaways: ['Real-time event capture', 'Video composition & editing sense', 'Collaborative backstage hustle'],
  },
];

export const projectsList: ProjectItem[] = [
  {
    id: 'field-project-tech-shopping',
    title: 'Role of Technology in Personalised Shopping Experiences',
    subtitle: 'College Field Research Project',
    category: 'Academic Field Research',
    description:
      'An in-depth college field project investigating how emerging retail technologies, data collection, and algorithmic suggestions are transforming physical and digital customer shopping experiences into highly tailored journeys.',
    role: 'Primary Student Researcher & Presenter',
    keyFindings: [
      'Customers respond significantly higher to contextual personalization than generic algorithmic discounts.',
      'Integrating physical touchpoints with digital profiles creates the highest customer retention.',
      'Small and medium enterprises can leverage accessible digital tools without enterprise-grade budgets.',
    ],
    keyLearnings: [
      'Conducted field interviews with shoppers and retail floor managers in South Mumbai.',
      'Analyzed friction points in traditional versus automated shopping workflows.',
      'Synthesized actionable customer journey maps and digital recommendation frameworks.',
    ],
    recommendations: [
      'Implement unified inventory visibility across physical storefronts and digital catalogs.',
      'Prioritize privacy-conscious personalization that respects customer boundaries.',
    ],
    tags: ['Digital Business', 'Retail Technology', 'Customer Experience', 'Field Research'],
    hasAttachmentPlaceholder: true,
  },
  {
    id: 'college-presentations',
    title: 'College Presentations & Business Seminars',
    subtitle: 'BBA Digital Business Academic Decks',
    category: 'Business & Digital Strategy',
    description:
      'A collection of academic and business presentations delivered across various subjects in the BBA Digital Business program, focusing on modern commerce models, digital marketing fundamentals, and organizational behavior.',
    role: 'Presenter & Content Curator',
    keyFindings: [
      'Clarity of narrative and minimalist slide design communicate business concepts far more effectively than text-dense slides.',
      'Grounding theoretical concepts in live Indian market examples sharpens audience engagement.',
    ],
    keyLearnings: [
      'Drafting structured business arguments and executive summaries.',
      'Refining on-stage presence, delivery cadence, and Q&A handling.',
    ],
    tags: ['Presentations', 'Digital Strategy', 'Business Administration', 'Public Speaking'],
    hasAttachmentPlaceholder: true,
  },
  {
    id: 'business-case-studies',
    title: 'Real-World Business Case Studies',
    subtitle: 'Strategic Analysis & Practical Problem Solving',
    category: 'Business Analysis',
    description:
      'Rigorous college case studies exploring corporate challenges, brand pivots, supply chain bottlenecks, and growth strategies of contemporary real-world enterprises.',
    role: 'Case Analyst',
    keyFindings: [
      'Business resilience often hinges on operational adaptability rather than just marketing spend.',
      'Understanding unit economics is fundamental before pursuing scaling initiatives.',
    ],
    keyLearnings: [
      'Applying SWOT, PESTLE, and Value Chain frameworks to real company challenges.',
      'Developing data-backed hypotheses and evaluating trade-offs under resource constraints.',
    ],
    tags: ['Case Study', 'Strategic Analysis', 'Problem Solving', 'Enterprise Growth'],
    hasAttachmentPlaceholder: true,
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'photo-headboy-flag',
    fileName: 'Head boy image 2.jpeg',
    title: 'Investiture & School Flag Ceremony',
    category: 'Speaking & Leadership',
    description:
      'Holding the school flag proudly alongside fellow house captains, teachers, and police guests during the official investiture ceremony.',
    featured: true,
  },
  {
    id: 'photo-headboy-sports',
    fileName: 'Headboy image.jpeg',
    title: 'Leading the School from the Front',
    category: 'Speaking & Leadership',
    description:
      'Addressing the school during athletic events with microphone in hand, representing Saifi High School as Head Boy (#280).',
    featured: true,
  },
  {
    id: 'photo-nie-toi-stage',
    fileName: 'NIE TOI 2.jpeg',
    title: 'On Stage Receiving NIE Times of India Award',
    category: 'Awards & Recognition',
    description:
      'Being conferred the Times of India Student of the Year Award on stage during the official Vidyalankar presentation.',
    featured: true,
  },
  {
    id: 'photo-trophies',
    fileName: 'Trophies.jpeg',
    title: 'The "I Can & I Will" Shelf of Milestones',
    category: 'Awards & Recognition',
    description:
      'Trophy rack showcasing years of discipline: Head Boy memento, SSC Topper 1st Rank, Shining Star, Bandra Carrom Doubles, Kho-Kho Best Player, and multiple Olympiad medals.',
    featured: true,
  },
  {
    id: 'photo-sbfl',
    fileName: 'SBFL winning.jpeg',
    title: 'Saifee Burhani Football League Runners-Up',
    category: 'Sports & Passion',
    description:
      'Standing with teammates holding the SBFL Runners-Up trophy board after a gritty football league campaign.',
    featured: true,
  },
  {
    id: 'photo-iimun-bathinda',
    fileName: 'WhatsApp Image 2026-10-07 at 8.49.04 AM.jpeg',
    title: 'On the Road: IIMUN Bathinda 2026',
    category: 'IIMUN Events',
    description:
      'Traveling across India for IIMUN conferences: holding the official IIMUN Bathinda banner at the railway platform.',
  },
  {
    id: 'photo-nadir-godrej',
    fileName: 'with Nadir Godrej.jpeg',
    title: 'Conversation with Industrialist Nadir Godrej',
    category: 'Dignitaries & Interactions',
    description:
      'Engaging in an insightful, warm personal conversation with Mr. Nadir Godrej at an arts and cultural forum.',
    featured: true,
  },
  {
    id: 'photo-zayed-khan',
    fileName: 'With Zayed Khan.jpeg',
    title: 'With Actor Zayed Khan',
    category: 'Dignitaries & Interactions',
    description:
      'Group interaction with actor Zayed Khan during a gallery reception in Mumbai.',
  },
  {
    id: 'photo-iimun-team-arch',
    fileName: 'IIMUN EVENT 1.jpeg',
    title: 'IIMUN Team & Committee Family',
    category: 'IIMUN Events',
    description:
      'Celebrating successful conference outcomes with fellow youth volunteers, organizers, and committee delegates.',
  },
  {
    id: 'photo-iimun-memento',
    fileName: 'IIMUN event 2.jpeg',
    title: 'Felicitating an international luminary at 15 Years of IIMUN',
    category: 'IIMUN Events',
    description:
      'Felicitating a distinguished international luminary on stage during the grand 15 Years of IIMUN celebration.',
    featured: true,
  },
  {
    id: 'photo-iimun-blazers',
    fileName: 'IIMUN event 3.jpeg',
    title: 'Conference Delegation Contingent',
    category: 'IIMUN Events',
    description:
      'Standing with fellow delegates and resource team members in formal conference attire.',
  },
  {
    id: 'photo-radhika-merchant',
    fileName: 'IIMUN event 4.jpeg',
    title: 'Youth Gathering with Radhika Merchant Ambani',
    category: 'Dignitaries & Interactions',
    description:
      'Auditorium plenary interaction highlighting youth initiatives, with Radhika Merchant Ambani seated among young delegates.',
  },
  {
    id: 'photo-indian-army',
    fileName: 'IIMun event 5.jpeg',
    title: '31 Infantry Brigade Interaction with IIMUN',
    category: 'IIMUN Events',
    description:
      'Historic interaction with Indian Army personnel of the 31 Infantry Brigade, experiencing national discipline and valor firsthand.',
  },
  {
    id: 'photo-iaf-helicopter',
    fileName: 'IIMUN event 6.jpeg',
    title: 'A Visit to Indian Air Force',
    category: 'IIMUN Events',
    description:
      'Delegation visit with IIMUN to the Indian Air Force Base of Jamnagar.',
  },
];
