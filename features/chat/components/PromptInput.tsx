
import React, { useState } from 'react';
import { SendIcon } from '../../../components/icons';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  disabled: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, disabled }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !disabled) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask Nexus AI anything..."
        rows={1}
        className="w-full bg-nexus-surface border border-nexus-secondary rounded-xl py-3 pr-14 pl-5 resize-none text-nexus-text placeholder-nexus-text-secondary focus:outline-none focus:ring-2 focus:ring-nexus-accent transition-all duration-200"
        disabled={disabled}
        style={{ minHeight: '52px', maxHeight: '200px' }}
      />
      <button
        type="submit"
        disabled={disabled || !prompt.trim()}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-nexus-accent text-white disabled:bg-nexus-secondary disabled:cursor-not-allowed hover:bg-opacity-90 transition-all"
      >
        <SendIcon className="w-5 h-5" />
      </button>
    </form>
  );
};

export default PromptInput;
