'use client';
//page.tsx
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import { LoginPage } from '@/app/components/LoginPage';
import { AssessmentFlow } from '@/app/components/AssessmentFlow';
import { Dashboard } from '@/app/components/Dashboard';

function AppContent() {
  const { user } = useAuth();
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  if (!user) {
    return <LoginPage />;
  }

  if (!user.assessmentComplete && !assessmentComplete) {
    return <AssessmentFlow onComplete={() => setAssessmentComplete(true)} />;
  }

  return <Dashboard />;
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
