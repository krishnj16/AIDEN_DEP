export interface Session {
  id: string;
  user_id: string;
  persona_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  session_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

export interface CreateSessionDTO {
  persona_id: string;
}

export interface CreateMessageDTO {
  session_id: string;
  content: string;
}