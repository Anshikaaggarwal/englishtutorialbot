'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { assessmentQuestions, calculateUserLevel } from '@/app/data/assessmentQuestions';
import { Button } from '@/components/ui/button';

interface AssessmentFlowProps {
  onComplete: () => void;
}

export const AssessmentFlow: React.FC<AssessmentFlowProps> = ({ onComplete }) => {
  const { user, setUserLevel, completeAssessment } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const language = user?.name ? 'hindi' : 'english';
  const isLastQuestion = currentQuestionIndex === assessmentQuestions.length - 1;

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

  const handleFinish = () => {
    const finalScore = (() => {
      let totalScore = score;
      const selectedAnswer = selectedAnswers[currentQuestion.id];
      if (selectedAnswer === currentQuestion.correctAnswer) {
        totalScore += currentQuestion.points;
      }
      return totalScore;
    })();

    const userLevel = calculateUserLevel(finalScore);
    setUserLevel(userLevel);
    completeAssessment();
    onComplete();
  };

  if (showResults) {
    const finalScore = (() => {
      let totalScore = score;
      const selectedAnswer = selectedAnswers[currentQuestion.id];
      if (selectedAnswer === currentQuestion.correctAnswer) {
        totalScore += currentQuestion.points;
      }
      return totalScore;
    })();

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
              Question {currentQuestionIndex + 1}/{assessmentQuestions.length}
            </h2>
            <div className="h-2 w-32 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-secondary transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / assessmentQuestions.length) * 100}%`,
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
