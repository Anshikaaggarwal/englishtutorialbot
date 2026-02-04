'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { assessmentQuestions as fallbackQuestions, calculateUserLevel, AssessmentQuestion } from '@/app/data/assessmentQuestions';
import { Button } from '@/components/ui/button';

interface AssessmentFlowProps {
  onComplete: () => void;
}

const API_BASE_URL = 'http://localhost:5000';

// Function to get 5 random questions without repetition
const getRandomQuestions = (allQuestions: AssessmentQuestion[], count: number = 5): AssessmentQuestion[] => {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const AssessmentFlow: React.FC<AssessmentFlowProps> = ({ onComplete }) => {
  const { setUserLevel, completeAssessment } = useAuth();
  const [questions, setQuestions] = useState<AssessmentQuestion[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/assessment/questions`);

        if (!response.ok) {
          throw new Error('Failed to fetch AI questions');
        }

        const data = await response.json();

        if (!data?.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
          throw new Error('Invalid questions format from AI');
        }

        // Get 5 random questions from AI response
        const randomQuestions = getRandomQuestions(data.questions, 5);
        setQuestions(randomQuestions);
      } catch (err) {
        console.error('Assessment question fetch failed, using fallback:', err);
        setError('Using default questions because AI generation failed.');
        // Get 5 random questions from fallback
        const randomQuestions = getRandomQuestions(fallbackQuestions, 5);
        setQuestions(randomQuestions);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#ffd700] via-[#fff8dc] to-[#fffacd] p-4">
        <div className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-2xl text-center">
          <p className="text-lg font-semibold text-secondary">Preparing your AI-powered assessment...</p>
          <p className="text-sm text-muted-foreground">This will help Gemini understand your English level.</p>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#ffd700] via-[#fff8dc] to-[#fffacd] p-4">
        <div className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-2xl text-center">
          <p className="text-lg font-semibold text-secondary">Unable to load assessment questions.</p>
          <p className="text-sm text-muted-foreground">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSelectAnswer = (answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerId,
    });
  };

  const handleNext = () => {
    const selectedAnswer = selectedAnswers[currentQuestion.id];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + currentQuestion.points);
    }

    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const computeFinalScore = () => {
    let totalScore = score;
    const selectedAnswer = selectedAnswers[currentQuestion.id];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      totalScore += currentQuestion.points;
    }
    return totalScore;
  };

  const handleFinish = () => {
    const finalScore = computeFinalScore();

    const userLevel = calculateUserLevel(finalScore);
    setUserLevel(userLevel);
    completeAssessment();
    onComplete();
  };

  if (showResults) {
    const finalScore = computeFinalScore();

    const userLevel = calculateUserLevel(finalScore);
    const levelLabels: Record<string, string> = {
      beginner: 'Beginner - Just knows Hindi',
      intermediate: 'Intermediate - Understands English but lacks fluency',
      advanced: 'Advanced - Fluent in English',
    };

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#ffd700] via-[#fff8dc] to-[#fffacd] p-4">
        <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-2xl">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-secondary">Assessment Complete!</h1>
            <p className="text-2xl font-semibold text-primary">Your Score: {finalScore}/100</p>
            <div className="rounded-2xl bg-secondary/10 p-6">
              <p className="text-lg font-medium text-foreground">Your Level:</p>
              <p className="text-2xl font-bold text-secondary">{levelLabels[userLevel]}</p>
            </div>
            {error && (
              <p className="text-xs text-muted-foreground">
                {error}
              </p>
            )}
          </div>

          <Button
            onClick={handleFinish}
            className="w-full rounded-xl bg-secondary py-3 text-lg font-semibold text-white hover:bg-secondary/90"
          >
            Start Learning
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#ffd700] via-[#fff8dc] to-[#fffacd] p-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">
              Question {currentQuestionIndex + 1}/{questions.length}
            </h2>
            <div className="h-2 w-32 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-secondary transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-foreground">{currentQuestion.englishQuestion}</h1>
          <p className="text-lg text-muted-foreground">{currentQuestion.hindiQuestion}</p>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(option.id)}
                className={`flex flex-col rounded-2xl border-2 p-4 text-left transition-all ${
                  selectedAnswers[currentQuestion.id] === option.id
                    ? 'border-secondary bg-secondary/10'
                    : 'border-muted bg-background hover:border-secondary/50'
                }`}
              >
                <p className="font-semibold text-foreground">{option.englishText}</p>
                <p className="text-sm text-muted-foreground">{option.hindiText}</p>
              </button>
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion.id]}
            className="w-full rounded-xl bg-secondary py-3 text-lg font-semibold text-white hover:bg-secondary/90 disabled:opacity-50"
          >
            {isLastQuestion ? 'Finish Assessment' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
};
