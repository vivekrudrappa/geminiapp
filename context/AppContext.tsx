
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CompanySettings, User, TeamMember } from '../types';

interface AppContextType {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  companySettings: CompanySettings;
  setCompanySettings: React.Dispatch<React.SetStateAction<CompanySettings>>;
  teamMembers: TeamMember[];
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isSettingsModalOpen: boolean;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialCompanySettings: CompanySettings = {
  companyName: 'Stellar Corp',
  logoUrl: 'https://picsum.photos/seed/stellarl/40/40',
  brandingColor: '#6c5ce7',
  apiKeys: [
    { id: '1', provider: 'Gemini', key: 'mock-gemini-key-xxxx' },
    { id: '2', provider: 'OpenAI', key: 'mock-openai-key-xxxx' },
  ],
  ragUrls: ['https://internal-docs.stellarcorp.dev'],
  guardrails: {
    enabled: true,
    blockHateSpeech: true,
    blockHarassment: true,
    blockSexuallyExplicit: false,
    blockDangerousContent: true,
  },
};

const initialUser: User = {
  name: 'Alex Johnson',
  email: 'alex.j@stellarcorp.co',
  role: 'admin',
  avatarUrl: 'https://picsum.photos/seed/alexj/40/40',
};

const initialTeam: TeamMember[] = [
    { id: '1', name: 'Alex Johnson', email: 'alex.j@stellarcorp.co', role: 'admin', avatarUrl: 'https://picsum.photos/seed/alexj/40/40' },
    { id: '2', name: 'Bobbie Draper', email: 'bobbie.d@stellarcorp.co', role: 'user', avatarUrl: 'https://picsum.photos/seed/bobbie/40/40' },
    { id: '3', name: 'Chrisjen Avasarala', email: 'chrisjen.a@stellarcorp.co', role: 'user', avatarUrl: 'https://picsum.photos/seed/chrisjen/40/40' },
];


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [companySettings, setCompanySettings] = useState<CompanySettings>(initialCompanySettings);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeam);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);


  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      companySettings,
      setCompanySettings,
      teamMembers,
      setTeamMembers,
      isSidebarOpen,
      toggleSidebar,
      isSettingsModalOpen,
      openSettingsModal,
      closeSettingsModal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
