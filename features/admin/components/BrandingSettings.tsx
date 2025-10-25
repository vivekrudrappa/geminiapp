
import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';

const BrandingSettings: React.FC = () => {
  const { companySettings, setCompanySettings } = useAppContext();
  const [name, setName] = useState(companySettings.companyName);
  const [logoUrl, setLogoUrl] = useState(companySettings.logoUrl);
  const [color, setColor] = useState(companySettings.brandingColor);

  return (
    <div>
      <h3 className="text-2xl font-bold text-nexus-text mb-1">Branding</h3>
      <p className="text-nexus-text-secondary mb-6">Customize the look and feel of the platform for your organization.</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-nexus-text-secondary mb-1">Company Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-nexus-surface border border-nexus-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-nexus-accent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-nexus-text-secondary mb-1">Logo</label>
          <div className="flex items-center gap-4">
             <img src={logoUrl} alt="Company Logo" className="w-16 h-16 rounded-lg bg-nexus-secondary object-cover"/>
             <input type="file" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-nexus-accent file:text-white hover:file:bg-opacity-90"/>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-nexus-text-secondary mb-1">Primary Color</label>
           <div className="flex items-center gap-2">
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 p-1 bg-nexus-surface border border-nexus-secondary rounded-md cursor-pointer"
            />
            <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="bg-nexus-surface border border-nexus-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-nexus-accent"
            />
           </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSettings;
