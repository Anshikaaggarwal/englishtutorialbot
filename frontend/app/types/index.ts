/**
 * User level classification based on English proficiency
 */
export type UserLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * Assessment question structure
 */
export interface AssessmentQuestion {
  id: number;
  englishQuestion: string;
  hindiQuestion: string;
  options: QuestionOption[];
  correctAnswer: string;
  points: number;
}

export interface QuestionOption {
  id: string;
  englishText: string;
  hindiText: string;
}

/**
 * User profile and authentication
 */
export interface User {
  id: string;
  name: string;
  email: string;
  level?: UserLevel;
  assessmentComplete: boolean;
  createdAt?: Date;
  lastLoginAt?: Date;
}

/**
 * Chat message structure
 */
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

/**
 * Vocabulary item
 */
export interface VocabularyItem {
  id: string;
  word: string;
  meaning: string;
  hindiMeaning: string;
  example: string;
  hindiExample: string;
  pronunciation?: string;
  partOfSpeech?: string;
  synonyms?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  isFavorite?: boolean;
  createdAt?: Date;
}

/**
 * Word of the day
 */
export interface WordOfDay {
  word: string;
  pronunciation: string;
  meaning: string;
  hindiMeaning: string;
  partOfSpeech: string;
  example: string;
  hindiExample: string;
  synonyms: string[];
  date: Date;
}

/**
 * Practice question structure
 */
export interface PracticeQuestion {
  id: string;
  type: 'fill-blank' | 'multiple-choice' | 'speaking' | 'listening';
  question: string;
  hindiQuestion: string;
  correctAnswer: string;
  options?: string[];
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  userLevel: UserLevel;
}

/**
 * Practice session result
 */
export interface PracticeResult {
  sessionId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  duration: number; // in seconds
  completedAt: Date;
}

/**
 * Learning progress
 */
export interface LearningProgress {
  userId: string;
  totalLessonsCompleted: number;
  totalWordsLearned: number;
  currentStreak: number;
  longestStreak: number;
  totalPracticeSessions: number;
  averageScore: number;
  lastActivityDate: Date;
}
