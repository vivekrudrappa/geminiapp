
import React, { useState } from 'react';
import { KeyIcon, PaletteIcon, TeamIcon, GuardrailsIcon, CloseIcon } from '../../components/icons';
import APIKeysSettings from './components/APIKeysSettings';
import BrandingSettings from './components/BrandingSettings';
import TeamManagement from './components/TeamManagement';
import GuardrailsSettings from './components/GuardrailsSettings';

interface AdminViewProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'apiKeys' | 'branding' | 'team' | 'guardrails';

const AdminView: React.FC<AdminViewProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('apiKeys');

  if (!isOpen) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'apiKeys': return <APIKeysSettings />;
      case 'branding': return <BrandingSettings />;
      case 'team': return <TeamManagement />;
      case 'guardrails': return <GuardrailsSettings />;
      default: return null;
    }
  };

  const TabButton: React.FC<{ tabName: Tab; icon: React.ReactNode; label: string }> = ({ tabName, icon, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center w-full text-left p-3 rounded-lg transition-colors ${activeTab === tabName ? 'bg-nexus-primary/20 text-nexus-accent' : 'hover:bg-nexus-secondary'}`}
    >
      {icon}
      <span className="ml-3 font-medium">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-nexus-surface rounded-2xl w-full max-w-4xl h-[80vh] flex overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="w-1/3 md:w-1/4 bg-nexus-secondary/30 p-4 border-r border-nexus-secondary">
          <h2 className="text-xl font-bold mb-6 px-2">Admin Settings</h2>
          <nav className="space-y-2">
            <TabButton tabName="apiKeys" icon={<KeyIcon className="w-5 h-5" />} label="API & RAG" />
            <TabButton tabName="branding" icon={<PaletteIcon className="w-5 h-5" />} label="Branding" />
            <TabButton tabName="team" icon={<TeamIcon className="w-5 h-5" />} label="Team" />
            <TabButton tabName="guardrails" icon={<GuardrailsIcon className="w-5 h-5" />} label="Guardrails" />
          </nav>
        </div>
        <div className="flex-1 flex flex-col">
           <div className="flex justify-end p-2">
             <button onClick={onClose} className="p-2 rounded-full hover:bg-nexus-secondary transition-colors">
                <CloseIcon className="w-6 h-6" />
             </button>
           </div>
           <div className="flex-1 overflow-y-auto p-6">
            {renderTabContent()}
           </div>
           <div className="p-4 border-t border-nexus-secondary flex justify-end bg-nexus-surface">
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-nexus-secondary hover:bg-opacity-80 transition-colors">Close</button>
            <button className="ml-3 px-4 py-2 rounded-lg bg-nexus-accent text-white hover:bg-opacity-90 transition-colors">Save Changes</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
