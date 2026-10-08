export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  grade?: string;
  score?: string;
  highlights?: string[];
  note?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; icon?: string; note?: string }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'leadership' | 'academic' | 'sports' | 'extracurricular';
  year?: string;
  description: string;
  photoName?: string;
  photoAlt?: string;
  badge?: string;
}

export interface DignitaryInteraction {
  name: string;
  title?: string;
  context: string;
}

export interface ExperienceRole {
  organization: string;
  role: string;
  department: string;
  period: string;
  badge: string;
  description: string;
  responsibilities: string[];
  keyAccomplishments: {
    partnersCount: string;
    cities: string[];
    invitedGuests: string[];
  };
  interactions: DignitaryInteraction[];
}

export interface SchoolCollegeExperience {
  title: string;
  category: string;
  period?: string;
  description: string;
  takeaways: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  role?: string;
  keyLearnings?: string[];
  keyFindings?: string[];
  recommendations?: string[];
  tags: string[];
  hasAttachmentPlaceholder?: boolean;
}

export interface GalleryPhoto {
  id: string;
  fileName: string;
  title: string;
  category: 'Speaking & Leadership' | 'IIMUN Events' | 'Awards & Recognition' | 'Dignitaries & Interactions' | 'Sports & Passion' | 'Personal & Moments';
  description: string;
  date?: string;
  featured?: boolean;
}
