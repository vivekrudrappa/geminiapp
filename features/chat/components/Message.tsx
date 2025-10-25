
import React from 'react';
import { Message as MessageType, MessageAuthor } from '../../../types';
import { BotIcon, UserIcon } from '../../../components/icons';
import { useAppContext } from '../../../context/AppContext';

interface MessageProps {
  message: MessageType;
  isStreaming?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isStreaming = false }) => {
  const { currentUser, companySettings } = useAppContext();
  const isUser = message.author === MessageAuthor.USER;

  // Basic markdown-to-html conversion for bold, italic, and code blocks
  const renderContent = (content: string) => {
    // Escape HTML to prevent XSS
    const escapedContent = content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const formattedContent = escapedContent
      .replace(/```([\s\S]*?)```/g, (_: any, code: string) => `<pre class="bg-nexus-dark p-3 rounded-md my-2 text-sm overflow-x-auto"><code>${code.trim()}</code></pre>`)
      .replace(/`([^`]+)`/g, `<code class="bg-nexus-dark px-1.5 py-0.5 rounded-sm text-nexus-accent">${'$1'}</code>`)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
    
    return { __html: formattedContent };
  };

  return (
    <div className={`flex items-start gap-4 my-6 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 flex-shrink-0 bg-nexus-secondary rounded-full flex items-center justify-center">
            <BotIcon className="w-5 h-5 text-nexus-accent" />
        </div>
      )}
      <div className={`max-w-2xl px-5 py-3 rounded-2xl ${isUser ? 'bg-nexus-primary text-white rounded-br-lg' : 'bg-nexus-surface text-nexus-text rounded-bl-lg'}`}>
        <div dangerouslySetInnerHTML={renderContent(message.content)} />
        {isStreaming && (
            <div className="flex items-center justify-start mt-2">
                <div className="animate-pulse bg-nexus-accent h-2 w-2 rounded-full mr-1"></div>
                <div className="animate-pulse bg-nexus-accent h-2 w-2 rounded-full mr-1" style={{animationDelay: '0.2s'}}></div>
                <div className="animate-pulse bg-nexus-accent h-2 w-2 rounded-full" style={{animationDelay: '0.4s'}}></div>
            </div>
        )}
      </div>
       {isUser && (
        <img src={currentUser.avatarUrl} alt="User Avatar" className="w-8 h-8 flex-shrink-0 rounded-full"/>
      )}
    </div>
  );
};

export default Message;
