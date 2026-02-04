'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UserLevel } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { X, Send, Mic, MicOff, MessageCircle, Volume2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

type ChatMode = 'text' | 'voice';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  userLevel?: UserLevel;
}

const API_BASE_URL = 'http://localhost:5000';

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, userLevel = 'intermediate' }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi, I am your AI English tutor powered by Gemini. You can type or tap “Talk to Tutor” to speak. What would you like to practice today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>('text');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendToLLM = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/llm/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: userLevel || 'default',
        }),
      });

      if (!response.ok) {
        throw new Error('LLM request failed');
      }

      const data = await response.json();
      return data.reply || 'Sorry, I could not understand that. Please try again.';
    } catch (error) {
      console.error('LLM chat failed:', error);
      return 'Sorry, I had a problem connecting to your tutor. Please try again in a moment.';
    }
  };

  const speakIfVoiceMode = (text: string) => {
    if (typeof window === 'undefined') return;
    if (chatMode !== 'voice') return;

    try {
      const cleaned = text.replace(/\*\*/g, '');
      const utterance = new SpeechSynthesisUtterance(cleaned);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Speech synthesis error:', error);
    }
  };

  const handleSendMessage = async (overrideText?: string) => {
    const content = (overrideText ?? inputValue).trim();
    if (!content) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    if (!overrideText) {
      setInputValue('');
    }
    setIsLoading(true);

    const botText = await sendToLLM(content);

    const newBotMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botText,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newBotMessage]);
    setIsLoading(false);
    speakIfVoiceMode(botText);
  };

  const initRecognition = () => {
    if (typeof window === 'undefined') return null;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser.');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSendMessage(transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    return recognition;
  };

  const toggleRecording = () => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    let recognition = recognitionRef.current;
    if (!recognition) {
      recognition = initRecognition();
    }

    if (!recognition) return;

    setIsRecording(true);
    recognition.start();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:items-center sm:justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative flex w-full max-w-md flex-col rounded-3xl bg-white shadow-2xl sm:h-[600px] h:[70vh]">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-3xl bg-gradient-to-r from-secondary to-accent px-6 py-4 text-white">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageCircle size={20} />
              English Tutor
            </h2>
            <p className="text-sm opacity-90">
              {chatMode === 'voice' ? 'Talk to Tutor (voice)' : 'Chat with Tutor (text)'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={chatMode === 'text' ? 'default' : 'outline'}
              className="rounded-full px-3 py-1 text-xs"
              onClick={() => setChatMode('text')}
            >
              Text
            </Button>
            <Button
              size="sm"
              variant={chatMode === 'voice' ? 'default' : 'outline'}
              className="rounded-full px-3 py-1 text-xs"
              onClick={() => setChatMode('voice')}
            >
              Talk to Tutor
            </Button>
            <button
              onClick={onClose}
              className="ml-1 rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
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
                <div className="flex space-x-2 items-center">
                  <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  <span className="ml-2 text-xs text-muted-foreground">Tutor is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-muted p-4">
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={toggleRecording}
              className={`flex items-center justify-center rounded-full p-2 border ${
                chatMode === 'voice'
                  ? isRecording
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-secondary bg-secondary/10 text-secondary'
                  : 'border-muted text-muted-foreground'
              }`}
              title={
                chatMode === 'voice'
                  ? isRecording
                    ? 'Stop talking to tutor'
                    : 'Talk to Tutor (start listening)'
                  : 'Switch to voice mode to talk to tutor'
              }
              disabled={chatMode !== 'voice'}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                chatMode === 'voice'
                  ? 'You can also type while talking to your tutor...'
                  : 'Type your message to your tutor...'
              }
              className="flex-1 rounded-xl border-2 border-muted bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-secondary focus:outline-none"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="rounded-xl bg-secondary p-2 text-white hover:bg-secondary/90 disabled:opacity-50"
            >
              <Send size={20} />
            </Button>
            {chatMode === 'voice' && (
              <button
                type="button"
                onClick={() => {
                  if (typeof window === 'undefined') return;
                  const lastBotMessage = [...messages].reverse().find((m) => m.sender === 'bot');
                  if (lastBotMessage) {
                    speakIfVoiceMode(lastBotMessage.text);
                  }
                }}
                className="ml-1 flex items-center justify-center rounded-full border border-muted p-2 text-muted-foreground hover:bg-muted/50"
                title="Replay tutor's last answer"
              >
                <Volume2 size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
