
import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { ApiKeyEntry } from '../../../types';
import { PlusIcon, TrashIcon } from '../../../components/icons';

const APIKeysSettings: React.FC = () => {
  const { companySettings, setCompanySettings } = useAppContext();
  const [apiKeys, setApiKeys] = useState<ApiKeyEntry[]>(companySettings.apiKeys);
  const [ragUrls, setRagUrls] = useState<string[]>(companySettings.ragUrls);

  const handleApiKeyChange = (id: string, field: 'provider' | 'key', value: string) => {
    setApiKeys(keys => keys.map(k => k.id === id ? { ...k, [field]: value } : k));
  };
  
  const addApiKey = () => {
    setApiKeys([...apiKeys, {id: Date.now().toString(), provider: '', key: ''}]);
  };

  const removeApiKey = (id: string) => {
    setApiKeys(keys => keys.filter(k => k.id !== id));
  };
  
  // Similar handlers for RAG URLs would be here

  return (
    <div>
      <h3 className="text-2xl font-bold text-nexus-text mb-1">API Keys & RAG</h3>
      <p className="text-nexus-text-secondary mb-6">Manage connections to various Large Language Models and Retrieval-Augmented Generation sources.</p>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-2">LLM API Keys</h4>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="flex items-center gap-4 bg-nexus-secondary/50 p-3 rounded-lg">
                <input
                  type="text"
                  placeholder="Provider (e.g., Gemini)"
                  value={apiKey.provider}
                  onChange={(e) => handleApiKeyChange(apiKey.id, 'provider', e.target.value)}
                  className="flex-1 bg-nexus-surface border border-nexus-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-nexus-accent"
                />
                <input
                  type="password"
                  placeholder="API Key"
                  value={apiKey.key}
                  onChange={(e) => handleApiKeyChange(apiKey.id, 'key', e.target.value)}
                  className="flex-1 bg-nexus-surface border border-nexus-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-nexus-accent"
                />
                 <button onClick={() => removeApiKey(apiKey.id)} className="p-2 text-red-400 hover:bg-red-400/20 rounded-full transition-colors">
                    <TrashIcon className="w-5 h-5"/>
                 </button>
              </div>
            ))}
          </div>
           <button onClick={addApiKey} className="mt-4 flex items-center text-sm font-medium text-nexus-accent hover:text-opacity-80 transition-colors">
              <PlusIcon className="w-5 h-5 mr-1"/> Add API Key
           </button>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">RAG URLs</h4>
           <div className="space-y-2">
            {ragUrls.map((url, index) => (
               <input key={index} type="text" value={url} className="w-full bg-nexus-surface border border-nexus-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-nexus-accent"/>
            ))}
           </div>
            <button className="mt-2 flex items-center text-sm font-medium text-nexus-accent hover:text-opacity-80 transition-colors">
              <PlusIcon className="w-5 h-5 mr-1"/> Add RAG URL
           </button>
        </div>
      </div>
    </div>
  );
};

export default APIKeysSettings;
