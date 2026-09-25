import React, { createContext, useContext, useState } from 'react';
import { MOCK_RESPONSES } from '../utils/constants';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('database');
  const [customQuery, setCustomQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'assistant',
      text: 'Hello! I am your Intelligent All-Purpose Data AI Chatbot. You can ask me to query SQL/NoSQL databases, scrape dynamic web pages, or clean and normalize messy datasets.',
      timestamp: 'Just now',
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const openChatWithCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setIsChatOpen(true);
    const mock = MOCK_RESPONSES[categoryId];
    if (mock) {
      handleSendMessage(mock.query, categoryId);
    }
  };

  const handleSendMessage = (textToSend, categoryId = activeCategory) => {
    const query = textToSend || customQuery;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setCustomQuery('');
    setIsProcessing(true);

    // Simulate AI response stream
    setTimeout(() => {
      const responseData = MOCK_RESPONSES[categoryId] || {
        result: `✓ Query analyzed successfully.\n✓ Synthesized insights from all multi-modal connected data pipelines.\n✓ Generated 100% structured output for: "${query}"`,
      };

      const aiMsg = {
        sender: 'assistant',
        text: responseData.result,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatHistory((prev) => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 900);
  };

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        activeCategory,
        setActiveCategory,
        customQuery,
        setCustomQuery,
        chatHistory,
        isProcessing,
        openChatWithCategory,
        handleSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
