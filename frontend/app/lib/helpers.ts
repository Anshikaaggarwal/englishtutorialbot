import type { UserLevel } from '@/app/types';

/**
 * Calculate user's English level based on assessment score
 * @param score - Score out of 100
 * @returns User's English proficiency level
 */
export function calculateUserLevel(score: number): UserLevel {
  if (score <= 40) {
    return 'beginner';
  } else if (score <= 70) {
    return 'intermediate';
  } else {
    return 'advanced';
  }
}

/**
 * Get level-based learning recommendations
 * @param level - User's English level
 * @returns Array of recommended learning paths
 */
export function getLevelRecommendations(level: UserLevel): string[] {
  const recommendations: Record<UserLevel, string[]> = {
    beginner: [
      'Start with daily phrases and basic vocabulary',
      'Practice Hindi-English translations',
      'Focus on fundamental grammar rules',
      'Build confidence with simple conversations',
    ],
    intermediate: [
      'Read and comprehend English news articles',
      'Practice intermediate vocabulary building',
      'Work on grammar nuances and expressions',
      'Engage in conversational practice',
    ],
    advanced: [
      'Master professional and business English',
      'Participate in complex discussions and debates',
      'Learn idioms and cultural expressions',
      'Perfect your fluency and accent',
    ],
  };

  return recommendations[level] || [];
}

/**
 * Format date to readable format
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Calculate streak days
 * @param dates - Array of activity dates
 * @returns Current streak count
 */
export function calculateStreak(dates: Date[]): number {
  if (dates.length === 0) return 0;

  const sortedDates = dates.sort((a, b) => b.getTime() - a.getTime());
  let streak = 1;

  for (let i = 0; i < sortedDates.length - 1; i++) {
    const diff = Math.floor((sortedDates[i].getTime() - sortedDates[i + 1].getTime()) / (1000 * 60 * 60 * 24));

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Get difficulty badge color
 * @param difficulty - Difficulty level
 * @returns CSS color class
 */
export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return colors[difficulty] || 'bg-gray-100 text-gray-800';
}

/**
 * Generate a random word from array
 * @param words - Array of words
 * @returns Random word
 */
export function getRandomWord<T>(words: T[]): T {
  return words[Math.floor(Math.random() * words.length)];
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get greeting based on time of day
 * @returns Appropriate greeting
 */
export function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Good morning';
  } else if (hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

/**
 * Format score percentage
 * @param score - Score out of 100
 * @returns Formatted percentage string
 */
export function formatPercentage(score: number): string {
  return `${Math.round(score)}%`;
}

/**
 * Get motivational message based on performance
 * @param score - Score out of 100
 * @returns Motivational message
 */
export function getMotivationalMessage(score: number): string {
  if (score >= 90) return 'Excellent work! You are a star! 🌟';
  if (score >= 80) return 'Great job! Keep it up! 👏';
  if (score >= 70) return 'Good effort! You are on the right track! 💪';
  if (score >= 60) return 'Nice try! Practice makes perfect! 📚';
  return 'Keep learning! You will improve! 🚀';
}

/**
 * Shuffle array in place (Fisher-Yates)
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
