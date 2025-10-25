
import React from 'react';
import Message from './components/Message';
import PromptInput from './components/PromptInput';
import { useChat } from '../../hooks/useChat';
import { BotIcon } from '../../components/icons';

const ChatView: React.FC = () => {
  const { messages, sendMessage, isStreaming } = useChat();

  return (
    <div className="flex-1 flex flex-col h-full bg-nexus-dark relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-nexus-text-secondary">
                    <BotIcon className="w-24 h-24 mb-4 text-nexus-secondary"/>
                    <h1 className="text-3xl font-bold text-nexus-text">Nexus AI</h1>
                    <p className="mt-2 max-w-md">Your secure, multi-LLM chat platform. Start a conversation to begin.</p>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto w-full">
                    {messages.map((msg, index) => (
                        <Message key={msg.id} message={msg} />
                    ))}
                    {isStreaming && messages[messages.length - 1]?.author !== 'bot' && (
                         <Message key="streaming-placeholder" message={{id: 'streaming', author: 'bot', content: ''}} isStreaming={true} />
                    )}
                </div>
            )}
        </div>
        <div className="px-4 md:px-6 pb-4 bg-nexus-dark">
            <div className="max-w-4xl mx-auto">
                <PromptInput onSubmit={sendMessage} disabled={isStreaming} />
                <p className="text-center text-xs text-nexus-text-secondary mt-2">
                    Nexus AI can make mistakes. Consider checking important information.
                </p>
            </div>
        </div>
    </div>
  );
};

export default ChatView;
