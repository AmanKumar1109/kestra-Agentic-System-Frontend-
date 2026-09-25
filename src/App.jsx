import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import DataIntegritySection from './components/features/DataIntegritySection';
import WhatOurAiDoesSection from './components/features/WhatOurAiDoesSection';
import TeamSection from './components/team/TeamSection';
import ChatWorkspace from './components/chat/ChatWorkspace';
import AuthPage from './components/auth/AuthPage';
import Footer from './components/layout/Footer';
import { ChatProvider, useChat } from './context/ChatContext';

function MainApp() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'chat' | 'auth'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const { openChatWithCategory } = useChat();

  const handleOpenChat = (category = 'database') => {
    openChatWithCategory(category);
    setCurrentView('chat');
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setCurrentView('auth');
  };

  if (currentView === 'auth') {
    return (
      <AuthPage
        initialMode={authMode}
        onBackToHome={() => setCurrentView('home')}
        onLoginSuccess={() => setCurrentView('chat')}
      />
    );
  }

  if (currentView === 'chat') {
    return <ChatWorkspace onBackToHome={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#271B14] relative selection:bg-[#E67246] selection:text-white">
      {/* Subtle Warm Ambient Glow */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[500px] bg-radial from-[#E67246]/10 via-[#83A47D]/5 to-transparent blur-3xl pointer-events-none z-0" />
      
      {/* Main App Structure */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Navigation Bar */}
        <Navbar
          onOpenChat={() => setCurrentView('chat')}
          onOpenAuth={handleOpenAuth}
        />

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center">
          <HeroSection
            onStartChat={() => setCurrentView('chat')}
            onSelectCallout={(id) => handleOpenChat(id)}
          />

          {/* Sequential Stacked Cards Pull Deck */}
          <div className="w-full flex flex-col relative mt-2 sm:mt-6">
            {/* Card 1: Data Integrity & Enterprise Integration (Mocha) */}
            <DataIntegritySection
              onSelectIntegration={() => handleOpenChat('database')}
            />

            {/* Card 2: What Our AI Does (Sage Green - Pulls & Stacks over Card 1) */}
            <WhatOurAiDoesSection
              onSelectCapability={(id) => handleOpenChat(id)}
            />

            {/* Card 3: Meet Our Team (Hackathon Squad - Pulls & Stacks over Card 2) */}
            <TeamSection />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ChatProvider>
      <MainApp />
    </ChatProvider>
  );
}
