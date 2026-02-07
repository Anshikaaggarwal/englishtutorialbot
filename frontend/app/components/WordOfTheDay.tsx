'use client';

import React, { useEffect, useState } from 'react';
import { Lightbulb, Volume2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Word {
  word: string;
  pronunciation: string;
  meaning: string;
  hindiMeaning: string;
  partOfSpeech: string;
  example: string;
  hindiExample: string;
  synonyms: string[];
  date: string;
}

export const WordOfTheDay: React.FC = () => {
  const [word, setWord] = useState<Word | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWord() {
      try {
        const res = await fetch(
          'http://localhost:5000/api/word-of-the-day',
          { credentials: 'include' }
        );
        const data = await res.json();
        setWord(data);
      } catch (error) {
        console.error('Failed to fetch word of the day', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWord();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl bg-purple-600 p-8 text-white">
        Loading Word of the Day...
      </div>
    );
  }

  if (!word) {
    return (
      <div className="rounded-3xl bg-red-500 p-8 text-white">
        Failed to load Word of the Day
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] p-8 text-white shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Lightbulb size={28} />
          <div>
            <h2 className="text-2xl font-bold">Word of the Day</h2>
            <p className="text-xs opacity-80">{word.date}</p>
          </div>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="rounded-full p-2 bg-white/20 hover:bg-white/30 transition"
        >
          <span className="text-xl">{isFavorite ? '❤️' : '🤍'}</span>
        </button>
      </div>

      {/* Word */}
      <div className="space-y-2 border-b border-white/20 pb-6">
        <p className="text-sm opacity-75">
          {word.partOfSpeech}
        </p>
        <div className="flex items-center gap-4">
          <h1 className="text-5xl font-bold">{word.word}</h1>
  
        </div>
        {word.pronunciation && (
          <p className="text-lg opacity-90">
            /{word.pronunciation}/
          </p>
        )}
      </div>

      {/* Meaning */}
      <div className="space-y-2">
        <p className="text-lg leading-relaxed">
          {word.meaning}
        </p>
        <p className="text-sm opacity-80">
          ({word.hindiMeaning})
        </p>
      </div>

      {/* Example */}
      <div className="space-y-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
        <button
          onClick={() => setShowExample(!showExample)}
          className="w-full text-left text-sm font-semibold opacity-90 hover:opacity-100 transition"
        >
          {showExample ? '▼' : '▶'} Example in Context
        </button>

        {showExample && (
          <div className="space-y-2 pt-2 border-t border-white/20">
            <p className="italic">{word.example}</p>
            <p className="text-sm opacity-75">
              {word.hindiExample}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      {/* <div className="flex gap-3 pt-4">
        <Button className="flex-1 rounded-xl bg-white text-secondary hover:bg-white/90 font-semibold">
          Learn More
        </Button>
        <button className="rounded-xl bg-white/20 p-3 hover:bg-white/30 transition">
          <Share2 size={20} />
        </button>
      </div> */}
    </div>
  );
};
