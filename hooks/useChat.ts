
import { useState, useCallback } from 'react';
import { Message, MessageAuthor } from '../types';
import { streamChatResponse } from '../services/geminiService';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(async (prompt: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      author: MessageAuthor.USER,
      content: prompt,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsStreaming(true);

    const botMessageId = (Date.now() + 1).toString();
    const botMessage: Message = {
      id: botMessageId,
      author: MessageAuthor.BOT,
      content: '',
    };
    setMessages(prev => [...prev, botMessage]);

    try {
      const stream = await streamChatResponse(prompt, messages);
      for await (const chunk of stream) {
        setMessages(prev => prev.map(msg =>
          msg.id === botMessageId
            ? { ...msg, content: msg.content + chunk }
            : msg
        ));
      }
    } catch (error) {
      console.error("Error streaming response:", error);
      const errorMessage: Message = {
        id: botMessageId,
        author: MessageAuthor.BOT,
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages(prev => prev.map(msg => msg.id === botMessageId ? errorMessage : msg));
    } finally {
      setIsStreaming(false);
    }
  }, [messages]);

  return { messages, sendMessage, isStreaming };
};
