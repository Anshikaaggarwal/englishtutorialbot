'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Volume2, CheckCircle, XCircle } from 'lucide-react';

interface PracticeQuestion {
  id: string;
  type: 'fill-blank' | 'speak' | 'listening';
  question: string;
  hindiQuestion: string;
  correctAnswer: string;
  options?: string[];
  imageUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const practiceQuestions: PracticeQuestion[] = [
  {
    id: '1',
    type: 'fill-blank',
    question: 'She is very _____ about her appearance.',
    hindiQuestion: 'वह अपनी उपस्थिति के बारे में बहुत _____ है।',
    correctAnswer: 'particular',
    options: ['particular', 'particular', 'general', 'common'],
    difficulty: 'medium',
  },
  {
    id: '2',
    type: 'fill-blank',
    question: 'The weather was _____ for the outdoor event.',
    hindiQuestion: 'आउटडोर इवेंट के लिए मौसम _____ था।',
    correctAnswer: 'favorable',
    options: ['favorable', 'unfavorable', 'rainy', 'cold'],
    difficulty: 'easy',
  },
  {
    id: '3',
    type: 'fill-blank',
    question: 'His _____ remark offended many people.',
    hindiQuestion: 'उसकी _____ टिप्पणी ने कई लोगों को नाराज किया।',
    correctAnswer: 'sarcastic',
    options: ['sarcastic', 'kind', 'friendly', 'polite'],
    difficulty: 'hard',
  },
];

export const PracticeSession: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentQuestion = practiceQuestions[currentIndex];

  const handleSubmit = () => {
    const correct = selectedAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 10);
    }
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < practiceQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer('');
      setSubmitted(false);
      setIsCorrect(null);
    } else {
      setSessionComplete(true);
    }
  };

  if (sessionComplete) {
    const percentage = (score / (practiceQuestions.length * 10)) * 100;
    return (
      <div className="rounded-3xl bg-gradient-to-br from-[#FFD700] to-[#FFC700] p-8 text-foreground shadow-lg">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold">Practice Session Complete!</h2>
          <div className="space-y-2">
            <p className="text-5xl font-bold text-secondary">{percentage.toFixed(0)}%</p>
            <p className="text-lg">Your Score: {score}/{practiceQuestions.length * 10}</p>
          </div>

          <div className="rounded-2xl bg-foreground/10 p-6 space-y-2">
            {percentage >= 80 && <p className="text-lg font-semibold">Excellent work! Keep it up! 🎉</p>}
            {percentage >= 60 && percentage < 80 && <p className="text-lg font-semibold">Great effort! You are improving! 👏</p>}
            {percentage < 60 && <p className="text-lg font-semibold">Keep practicing! You will get better! 💪</p>}
          </div>

          <Button
            onClick={() => {
              setCurrentIndex(0);
              setScore(0);
              setSelectedAnswer('');
              setSubmitted(false);
              setIsCorrect(null);
              setSessionComplete(false);
            }}
            className="rounded-xl bg-secondary px-8 py-3 text-lg font-semibold text-white hover:bg-secondary/90"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#FFD700] to-[#FFC700] p-8 text-foreground shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Practice Session</h2>
          <p className="text-sm opacity-75">Question {currentIndex + 1}/{practiceQuestions.length}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-foreground/10 px-4 py-2">
          <Clock size={20} />
          <span className="font-semibold">{5 - currentIndex * 2} mins</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-3 w-full rounded-full bg-foreground/10">
        <div
          className="h-3 rounded-full bg-secondary transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / practiceQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="space-y-6">
        <div className="rounded-2xl bg-foreground/5 p-6 space-y-3">
          <p className="text-lg font-semibold">{currentQuestion.question}</p>
          <p className="text-sm opacity-75">{currentQuestion.hindiQuestion}</p>
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
            currentQuestion.difficulty === 'easy'
              ? 'bg-green-100 text-green-800'
              : currentQuestion.difficulty === 'medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
          </span>
        </div>

        {/* Answer Options */}
        {currentQuestion.options ? (
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !submitted && setSelectedAnswer(option)}
                disabled={submitted}
                className={`w-full rounded-xl border-2 p-4 text-left font-medium transition-all ${
                  selectedAnswer === option
                    ? 'border-secondary bg-secondary/20 text-foreground'
                    : 'border-foreground/20 bg-white hover:border-secondary'
                } ${submitted ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'} ${
                  submitted && option === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-100'
                    : ''
                } ${
                  submitted && selectedAnswer === option && !isCorrect
                    ? 'border-red-500 bg-red-100'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {submitted && option === currentQuestion.correctAnswer && (
                    <CheckCircle size={20} className="text-green-600" />
                  )}
                  {submitted && selectedAnswer === option && !isCorrect && (
                    <XCircle size={20} className="text-red-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={selectedAnswer}
            onChange={(e) => !submitted && setSelectedAnswer(e.target.value)}
            disabled={submitted}
            placeholder="Type your answer here..."
            className="w-full rounded-xl border-2 border-foreground/20 bg-white px-4 py-3 font-medium focus:border-secondary focus:outline-none"
          />
        )}

        {/* Feedback */}
        {submitted && (
          <div className={`rounded-xl p-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-sm opacity-75">
              Correct answer: <span className="font-semibold">{currentQuestion.correctAnswer}</span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          {!submitted ? (
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer.trim()}
              className="flex-1 rounded-xl bg-secondary px-6 py-3 text-lg font-semibold text-white hover:bg-secondary/90 disabled:opacity-50"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex-1 rounded-xl bg-secondary px-6 py-3 text-lg font-semibold text-white hover:bg-secondary/90"
            >
              {currentIndex === practiceQuestions.length - 1 ? 'Finish' : 'Next Question'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
