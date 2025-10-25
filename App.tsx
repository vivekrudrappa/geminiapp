
import React from 'react';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import ChatView from './features/chat/ChatView';

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainLayout>
        <ChatView />
      </MainLayout>
    </AppProvider>
  );
};

export default App;
