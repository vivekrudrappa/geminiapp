
import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';

const Switch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`${checked ? 'bg-nexus-accent' : 'bg-nexus-secondary'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
  >
    <span className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
  </button>
);

const GuardrailsSettings: React.FC = () => {
  const { companySettings, setCompanySettings } = useAppContext();
  const [guardrails, setGuardrails] = useState(companySettings.guardrails);

  const handleToggle = (key: keyof typeof guardrails) => {
    setGuardrails(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-nexus-text mb-1">Guardrails</h3>
      <p className="text-nexus-text-secondary mb-6">Configure content safety policies to align with your organization's standards.</p>
      
      <div className="space-y-4 bg-nexus-surface p-6 rounded-lg border border-nexus-secondary">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">Enable Guardrails</h4>
            <p className="text-sm text-nexus-text-secondary">Globally enable or disable all content safety filters.</p>
          </div>
          <Switch checked={guardrails.enabled} onChange={() => handleToggle('enabled')} />
        </div>
        
        <div className={`space-y-4 pl-6 border-l-2 ${guardrails.enabled ? 'border-nexus-accent' : 'border-nexus-secondary'} transition-all`}>
            <div className={`flex items-center justify-between ${!guardrails.enabled ? 'opacity-50' : ''}`}>
                <div>
                    <h4 className="font-semibold">Block Hate Speech</h4>
                    <p className="text-sm text-nexus-text-secondary">Filter content that promotes discrimination or disparages on the basis of race, ethnic origin, religion, etc.</p>
                </div>
                <Switch checked={guardrails.blockHateSpeech} onChange={() => handleToggle('blockHateSpeech')} />
            </div>
             <div className={`flex items-center justify-between ${!guardrails.enabled ? 'opacity-50' : ''}`}>
                <div>
                    <h4 className="font-semibold">Block Harassment</h4>
                    <p className="text-sm text-nexus-text-secondary">Filter abusive, threatening, or bullying content.</p>
                </div>
                <Switch checked={guardrails.blockHarassment} onChange={() => handleToggle('blockHarassment')} />
            </div>
             <div className={`flex items-center justify-between ${!guardrails.enabled ? 'opacity-50' : ''}`}>
                <div>
                    <h4 className="font-semibold">Block Sexually Explicit Content</h4>
                    <p className="text-sm text-nexus-text-secondary">Filter content containing nudity, sexual acts, or other sexually explicit material.</p>
                </div>
                <Switch checked={guardrails.blockSexuallyExplicit} onChange={() => handleToggle('blockSexuallyExplicit')} />
            </div>
             <div className={`flex items-center justify-between ${!guardrails.enabled ? 'opacity-50' : ''}`}>
                <div>
                    <h4 className="font-semibold">Block Dangerous Content</h4>
                    <p className="text-sm text-nexus-text-secondary">Filter content that promotes harmful acts, such as self-harm or violence.</p>
                </div>
                <Switch checked={guardrails.blockDangerousContent} onChange={() => handleToggle('blockDangerousContent')} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default GuardrailsSettings;
