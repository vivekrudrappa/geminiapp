
import { GoogleGenAI, Chat } from "@google/genai";
import { Message } from '../types';

// IMPORTANT: This is a placeholder for a secure key management system.
// In a real application, the API key should never be exposed on the client side.
// It should be fetched from a secure backend that proxies requests to the Gemini API.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.warn("API_KEY environment variable not set. Using a placeholder. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "NO_API_KEY_FOUND" });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: 'You are Nexus AI, a helpful and futuristic AI assistant integrated into a multi-tenant enterprise platform.',
  },
});

export async function* streamChatResponse(prompt: string, history: Message[]): AsyncGenerator<string, void, unknown> {
  // In a real app, you would pass the full, correctly formatted history.
  // For this demo, we'll just send the latest prompt.
  try {
    const result = await chat.sendMessageStream({ message: prompt });
    for await (const chunk of result) {
      yield chunk.text;
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    yield "An error occurred while communicating with the AI. Please check the console for details.";
  }
}
