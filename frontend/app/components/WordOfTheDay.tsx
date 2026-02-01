'use client';

import React, { useState } from 'react';
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
}

const words: Word[] = [
  {
    word: 'Serendipity',
    pronunciation: 'ser-uh n-dip-i-tee',
    meaning: 'The occurrence of events by chance in a happy or beneficial way',
    hindiMeaning: 'संयोग से मिलने वाली खुशी या लाभ',
    partOfSpeech: 'Noun',
    example: 'Finding my old friend at the café was pure serendipity.',
    hindiExample: 'कैफे में अपने पुराने दोस्त को मिलना शुद्ध संयोग था।',
    synonyms: ['Chance', 'Luck', 'Fortune', 'Coincidence'],
  },
  {
    word: 'Eloquent',
    pronunciation: 'el-uh-kwuhnt',
    meaning: 'Fluent or persuasive in speaking or writing',
    hindiMeaning: 'बोलने या लिखने में प्रवाहमान और प्रभावशाली',
    partOfSpeech: 'Adjective',
    example: 'The eloquent speaker captured the audience with her words.',
    hindiExample: 'वह वक्ता अपने शब्दों से दर्शकों को मुग्ध कर गई।',
    synonyms: ['Articulate', 'Expressive', 'Persuasive', 'Fluent'],
  },
  {
    word: 'Ubiquitous',
    pronunciation: 'yoo-bik-wi-tus',
    meaning: 'Present, appearing, or found everywhere',
    hindiMeaning: 'हर जगह मौजूद या दिखाई देना',
    partOfSpeech: 'Adjective',
    example: 'Smartphones have become ubiquitous in modern society.',
    hindiExample: 'आधुनिक समाज में स्मार्टफोन सर्वव्यापी हो गए हैं।',
    synonyms: ['Omnipresent', 'Universal', 'Widespread', 'Common'],
  },
];

export const WordOfTheDay: React.FC<{ word?: Word }> = ({ word = words[0] }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] p-8 text-white shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Lightbulb size={28} />
          <h2 className="text-2xl font-bold">Word of the Day</h2>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`rounded-full p-2 transition-colors ${
            isFavorite ? 'bg-red-500/20' : 'bg-white/20 hover:bg-white/30'
          }`}
        >
          <span className="text-xl">{isFavorite ? '❤️' : '🤍'}</span>
        </button>
      </div>

      {/* Main Word */}
      <div className="space-y-2 border-b border-white/20 pb-6">
        <p className="text-sm opacity-75">Pronunciation</p>
        <div className="flex items-center gap-4">
          <h1 className="text-5xl font-bold">{word.word}</h1>
          <button className="rounded-full bg-white/20 p-3 hover:bg-white/30 transition-colors">
            <Volume2 size={24} />
          </button>
        </div>
        <p className="text-lg opacity-90">/{word.pronunciation}/</p>
      </div>

      {/* Meanings */}
      <div className="space-y-4">
        <div>
          <p className="text-sm opacity-75 mb-2">{word.partOfSpeech}</p>
          <p className="text-lg leading-relaxed">{word.meaning}</p>
          <p className="text-sm opacity-75 mt-2">({word.hindiMeaning})</p>
        </div>

        {/* Synonyms */}
        <div>
          <p className="text-sm opacity-75 mb-2">Similar words</p>
          <div className="flex flex-wrap gap-2">
            {word.synonyms.map((synonym, idx) => (
              <span
                key={idx}
                className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium"
              >
                {synonym}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Example */}
      <div className="space-y-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
        <button
          onClick={() => setShowExample(!showExample)}
          className="w-full text-left text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity"
        >
          {showExample ? '▼' : '▶'} Example in Context
        </button>
        {showExample && (
          <div className="space-y-2 pt-2 border-t border-white/20">
            <p className="italic">{word.example}</p>
            <p className="text-sm opacity-75">{word.hindiExample}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button className="flex-1 rounded-xl bg-white text-secondary hover:bg-white/90 font-semibold">
          Learn More
        </Button>
        <button className="rounded-xl bg-white/20 p-3 hover:bg-white/30 transition-colors">
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};
