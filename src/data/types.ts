// Core TypeScript interfaces for Atlas app

export enum Category {
  PhysicalHealth = 'Physical Health',
  MentalHealth = 'Mental Health',
  FitnessTraining = 'Fitness & Training',
  Nutrition = 'Nutrition',
  SleepRecovery = 'Sleep & Recovery',
  FocusProductivity = 'Focus & Productivity',
  StressAnxiety = 'Stress & Anxiety',
}

export enum UserTier {
  Free = 'free',
  Premium = 'premium',
}

export interface Guide {
  id: string;
  title: string;
  summary: string;
  whatScienceSays: string[]; // 3-6 bullet points
  whatToDo: string[]; // Clear actionable steps
  whoThisIsFor: string;
  whatNotToDo: string[]; // Common myths or mistakes
  sources: string[]; // Scientific references
  category: Category;
  tags: string[];
  createdAt: string;
}

export interface SearchResult {
  guide: Guide;
  score: number; // Relevance score
}

export interface UserPreferences {
  tier: UserTier;
  searchCount: number;
  lastSearchReset: string;
  savedGuideIds: string[];
}
