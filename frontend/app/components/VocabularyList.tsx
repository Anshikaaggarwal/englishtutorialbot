'use client';

import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VocabularyItem {
  id: string;
  word: string;
  meaning: string;
  hindiMeaning: string;
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isFavorite: boolean;
}

const vocabularyItems: VocabularyItem[] = [
  {
    id: '1',
    word: 'Eloquent',
    meaning: 'Fluent and expressive in speaking or writing',
    hindiMeaning: 'बोलने या लिखने में प्रवाहमान और अभिव्यक्त',
    example: 'She gave an eloquent speech at the conference.',
    difficulty: 'medium',
    isFavorite: true,
  },
  {
    id: '2',
    word: 'Ubiquitous',
    meaning: 'Present everywhere at the same time',
    hindiMeaning: 'हर जगह मौजूद रहना',
    example: 'Social media has become ubiquitous in our lives.',
    difficulty: 'hard',
    isFavorite: false,
  },
  {
    id: '3',
    word: 'Procrastinate',
    meaning: 'To delay or postpone an action',
    hindiMeaning: 'देरी करना या स्थगित करना',
    example: "Don't procrastinate on your homework.",
    difficulty: 'medium',
    isFavorite: false,
  },
  {
    id: '4',
    word: 'Meticulous',
    meaning: 'Showing great attention to detail',
    hindiMeaning: 'विस्तार पर ध्यान देना',
    example: 'She is meticulous about her work quality.',
    difficulty: 'hard',
    isFavorite: true,
  },
  {
    id: '5',
    word: 'Benevolent',
    meaning: 'Kind and generous',
    hindiMeaning: 'दयालु और उदार',
    example: 'The benevolent donation helped many people.',
    difficulty: 'hard',
    isFavorite: false,
  },
];

export const VocabularyList: React.FC = () => {
  const [items, setItems] = useState<VocabularyItem[]>(vocabularyItems);
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard' | 'favorite'>('all');

  const filteredItems = items.filter((item) => {
    if (filter === 'favorite') return item.isFavorite;
    if (filter === 'all') return true;
    return item.difficulty === filter;
  });

  const toggleFavorite = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#20C997] to-[#13B981] p-8 shadow-lg">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="text-white" size={28} />
          <h2 className="text-2xl font-bold text-white">Vocabulary List</h2>
        </div>
        <Button className="gap-2 rounded-full bg-white text-secondary hover:bg-white/90 font-semibold">
          <Plus size={20} />
          <span className="hidden sm:inline">Add Word</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {['all', 'easy', 'medium', 'hard', 'favorite'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as typeof filter)}
            className={`rounded-full px-4 py-2 font-medium transition-all ${
              filter === f
                ? 'bg-white text-green-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Vocabulary Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white/20 backdrop-blur p-4 text-white hover:bg-white/30 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{item.word}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                  </span>
                </div>
                <p className="mb-1">{item.meaning}</p>
                <p className="text-sm opacity-75 mb-2">({item.hindiMeaning})</p>
                <p className="italic text-sm opacity-90">"{item.example}"</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors"
                >
                  <span className="text-lg">{item.isFavorite ? '❤️' : '🤍'}</span>
                </button>
                <button className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors">
                  <Volume2 size={18} />
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="rounded-full bg-red-500/20 p-2 hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="rounded-2xl bg-white/20 p-8 text-center text-white">
          <p className="text-lg opacity-75">No words found in this category</p>
        </div>
      )}
    </div>
  );
};
