'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UserLevel } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  userLevel?: UserLevel;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, userLevel = 'intermediate' }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am your English learning assistant. How can I help you today? I can help with conversation practice, grammar corrections, and vocabulary learning.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Conversation practice responses
    if (lowerMessage.includes('how are you') || lowerMessage.includes('kaise ho')) {
      return 'I am doing great, thank you for asking! How are you today? Tell me about your day.';
    }

    // Grammar correction
    if (lowerMessage.includes('correct') || lowerMessage.includes('grammar')) {
      return 'Sure! I can help you with grammar. Please share a sentence you would like me to correct.';
    }

    // Vocabulary learning
    if (lowerMessage.includes('word') || lowerMessage.includes('vocabulary')) {
      const words = [
        { word: 'Eloquent', meaning: 'Fluent and expressive in speaking or writing' },
        { word: 'Ubiquitous', meaning: 'Present everywhere at the same time' },
        { word: 'Procrastinate', meaning: 'To delay or postpone an action' },
      ];
      const randomWord = words[Math.floor(Math.random() * words.length)];
      return `Great! Here's a new word for you:\n\n**${randomWord.word}**: ${randomWord.meaning}\n\nCan you use this word in a sentence?`;
    }

    // Level-based responses
    if (userLevel === 'beginner') {
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return 'नमस्ते! Hello! How are you? आप कैसे हैं?';
      }
      return 'Very good! Keep practicing. यह बहुत अच्छा है!';
    }

    if (userLevel === 'intermediate') {
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return 'Hello! Nice to meet you. Tell me, what would you like to learn today?';
      }
      return 'Great attempt! You are making good progress. Would you like to learn more vocabulary or practice grammar?';
    }

    if (userLevel === 'advanced') {
      return `Excellent! "${userMessage}" - Your fluency is impressive. Let's dive into more advanced topics. What would you like to discuss?`;
    }

    return 'That is interesting! Could you elaborate more? I am here to help you improve your English.';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newBotMessage]);
      setIsLoading(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:items-center sm:justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative flex w-full max-w-md flex-col rounded-3xl bg-white shadow-2xl sm:h-[600px] h-[70vh]">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-3xl bg-gradient-to-r from-secondary to-accent px-6 py-4 text-white">
          <div>
            <h2 className="text-xl font-bold">English Learning Assistant</h2>
            <p className="text-sm opacity-90">Always here to help</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 p-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-secondary text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-muted px-4 py-3">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-muted p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border-2 border-muted bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-secondary focus:outline-none"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="rounded-xl bg-secondary p-2 text-white hover:bg-secondary/90 disabled:opacity-50"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
