'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, Volume2, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VocabularyApiResponse {
  category: string;
  featuredWord: string;
  meaning: string;
  example: string;
  allWords: string[];
}

interface WordDetail {
  meaning: string;
  example: string;
}

export const VocabularyList: React.FC = () => {
  const [data, setData] = useState<VocabularyApiResponse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wordDetails, setWordDetails] = useState<Record<string, WordDetail>>({});

  useEffect(() => {
    async function fetchVocabulary() {
      const res = await fetch('http://localhost:5000/api/vocabulary/random');
      const json = await res.json();
      setData(json);
    }
    fetchVocabulary();
  }, []);

  const fetchMeaning = async (word: string) => {
    if (wordDetails[word]) {
      setSelectedWord(word);
      return;
    }

    const res = await fetch(
      `http://localhost:5000/api/vocabulary/meaning/${encodeURIComponent(word)}`
    );
    const json = await res.json();

    setWordDetails((prev) => ({
      ...prev,
      [word]: json,
    }));

    setSelectedWord(word);
  };

  if (!data) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-[#20C997] to-[#13B981] p-8 text-white">
        Loading vocabulary...
      </div>
    );
  }

  return (
    <>
      <div className="rounded-3xl bg-gradient-to-br from-[#20C997] to-[#13B981] p-8 shadow-lg text-white">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={28} />
            <h2 className="text-2xl font-bold capitalize">
              Vocabulary · {data.category}
            </h2>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="rounded-full bg-white text-secondary"
          >
            View All
          </Button>
        </div>

        <h3 className="text-3xl font-bold">{data.featuredWord}</h3>
        <p className="mt-2">{data.meaning}</p>
        {data.example && (
          <p className="mt-2 italic opacity-90">“{data.example}”</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-2xl bg-green-500 p-6">
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedWord(null);
                  setShowModal(false);
                }}
                className="flex items-center gap-2"
              >
                <ArrowLeft />
                Back
              </button>
              <h3 className="text-xl font-bold capitalize">
                {data.category}
              </h3>
            </div>

            {!selectedWord && (
              <div className="grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto">
                {data.allWords.map((word) => (
                  <button
                    key={word}
                    onClick={() => fetchMeaning(word)}
                    className="rounded-lg bg-yellow-500 px-3 py-2 text-left hover:bg-muted/70"
                  >
                    {word}
                  </button>
                ))}
              </div>
            )}

            {selectedWord && (
              <div className="space-y-4">
                <button
                  onClick={() => setSelectedWord(null)}
                  className="flex items-center gap-2 text-sm"
                >
                  <ArrowLeft />
                  Back to list
                </button>

                <h4 className="text-2xl font-bold">{selectedWord}</h4>
                <p>{wordDetails[selectedWord]?.meaning}</p>
                {wordDetails[selectedWord]?.example && (
                  <p className="italic opacity-80">
                    “{wordDetails[selectedWord]?.example}”
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
