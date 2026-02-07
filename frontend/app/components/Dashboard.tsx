'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Chatbot } from '@/app/components/Chatbot';
import { Button } from '@/components/ui/button';
import { MessageCircle, Search, History, Heart, BookOpen, Lightbulb, LogOut } from 'lucide-react';
import { WordOfTheDay } from './WordOfTheDay';
import { VocabularyList } from './VocabularyList';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getLevelContent = () => {
    switch (user?.level) {
      case 'beginner':
        return {
          title: 'Hindi-English Basics',
          description: 'Learn everyday phrases and vocabulary',
          color: 'from-[#FFD700] to-[#FFC700]',
          content: ['Daily Phrases', 'Basic Grammar', 'Common Words'],
        };
      case 'intermediate':
        return {
          title: 'English News & Practice',
          description: 'Improve through news reading',
          color: 'from-[#A855F7] to-[#9333EA]',
          content: ['Latest News', 'Vocabulary Builder', 'Speaking Practice'],
        };
      case 'advanced':
        return {
          title: 'Conversation & Professional English',
          description: 'Master fluent conversations',
          color: 'from-[#20C997] to-[#13B981]',
          content: ['Debate Topics', 'Business English', 'Cultural Discussions'],
        };
      default:
        return {
          title: 'Start Learning',
          description: 'Choose your learning path',
          color: 'from-[#A855F7] to-[#9333EA]',
          content: ['Basic', 'Intermediate', 'Advanced'],
        };
    }
  };

  const content = getLevelContent();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#faf8f3] to-[#f0e9e0]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-muted bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-secondary to-accent p-2">
              <BookOpen className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-foreground">English Learning</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-muted px-4 py-2">
              <Search size={18} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent text-sm placeholder-muted-foreground focus:outline-none"
              />
            </div>
            <Button
              onClick={() => setIsChatOpen(true)}
              className="gap-2 rounded-full bg-secondary px-6 py-2 text-white hover:bg-secondary/90"
            >
              <MessageCircle size={20} />
              <span className="hidden sm:inline">Chat</span>
            </Button>
            <button
              onClick={() => logout()}
              className="rounded-full p-2 hover:bg-muted transition-colors"
              title="Logout"
            >
              <LogOut size={20} className="text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-lg text-muted-foreground">
            Your personal English teacher is ready to help you learn and improve
          </p>
        </div>

        {/* Level-Based Content Card */}
        <div className={`mb-8 rounded-3xl bg-linear-to-r ${content.color} p-8 text-white shadow-lg`}>
          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-90">Your Learning Path</p>
              <h3 className="text-3xl font-bold">{content.title}</h3>
            </div>
            <p className="text-lg opacity-95">{content.description}</p>
            <div className="flex gap-3 flex-wrap">
              {content.content.map((item, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WordOfTheDay />


          {/* Vocabulary List */}
          <div className="rounded-3xl bg-gradient-to-br from-[#20C997] to-[#13B981] p-8 text-white shadow-lg hover:shadow-xl transition-shadow">
            {/* <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Vocabulary List</h3>
                <BookOpen size={24} />
              </div>
              <p className="opacity-90">List of essential English words</p>
              <div className="space-y-2">
                <p className="text-sm">• Eloquent - fluent and expressive</p>
                <p className="text-sm">• Ubiquitous - present everywhere</p>
                <p className="text-sm">• Procrastinate - to delay action</p>
              </div>
              <button className="w-full rounded-xl bg-white/20 py-2 text-sm font-semibold hover:bg-white/30 transition-colors">
                Explore All Words
              </button>
            </div> */}
            <VocabularyList />
          </div>

          {/* Practice Session */}
          <div className="rounded-3xl bg-gradient-to-br from-[#FFD700] to-[#FFC700] p-8 text-foreground shadow-lg hover:shadow-xl transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Daily Practice</h3>
                <Heart size={24} />
              </div>
              <p className="opacity-90">Engage in conversation practice</p>
              <div className="space-y-2 text-sm">
                <p>✓ 15 min reading exercise</p>
                <p>✓ Grammar quiz</p>
                <p>✓ Speaking practice</p>
              </div>
              <button className="w-full rounded-xl bg-foreground/10 py-2 text-sm font-semibold hover:bg-foreground/20 transition-colors">
                Start Practice
              </button>
            </div>
          </div>

          {/* History */}
          <div className="rounded-3xl bg-white p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-muted">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground">Learning History</h3>
                <History size={24} className="text-primary" />
              </div>
              <p className="opacity-75 text-foreground">
                Track your learning progress and revisit past lessons
              </p>
              <button className="w-full rounded-xl bg-muted py-2 text-sm font-semibold text-foreground hover:bg-muted/80 transition-colors">
                View History
              </button>
            </div>
          </div>

          {/* Favorites */}
          <div className="rounded-3xl bg-white p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-muted">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground">Favorite Words</h3>
                <Heart size={24} className="text-red-500" />
              </div>
              <p className="opacity-75 text-foreground">
                Your collection of words you want to master
              </p>
              <button className="w-full rounded-xl bg-muted py-2 text-sm font-semibold text-foreground hover:bg-muted/80 transition-colors">
                View Favorites
              </button>
            </div>
          </div>

          {/* Idioms & Expressions */}
          <div className="rounded-3xl bg-white p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-muted">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground">Idioms & Expressions</h3>
                <Lightbulb size={24} className="text-primary" />
              </div>
              <p className="opacity-75 text-foreground">
                Learn common English idioms and phrases
              </p>
              <button className="w-full rounded-xl bg-muted py-2 text-sm font-semibold text-foreground hover:bg-muted/80 transition-colors">
                Explore Idioms
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} userLevel={user?.level} />

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 rounded-full bg-gradient-to-r from-secondary to-accent p-4 text-white shadow-2xl hover:shadow-none transition-shadow hover:scale-110"
          title="Open Chat"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};
