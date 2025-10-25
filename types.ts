
export enum MessageAuthor {
  USER = 'user',
  BOT = 'bot',
}

export interface Message {
  id: string;
  author: MessageAuthor;
  content: string;
}

export interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatarUrl?: string;
}

export interface ApiKeyEntry {
  id: string;
  provider: string;
  key: string;
}

export interface GuardrailSettings {
  enabled: boolean;
  blockHateSpeech: boolean;
  blockHarassment: boolean;
  blockSexuallyExplicit: boolean;
  blockDangerousContent: boolean;
}

export interface CompanySettings {
  companyName: string;
  logoUrl: string;
  brandingColor: string;
  apiKeys: ApiKeyEntry[];
  ragUrls: string[];
  guardrails: GuardrailSettings;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatarUrl: string;
}
