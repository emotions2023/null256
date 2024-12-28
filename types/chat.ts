// types/chat.ts
export interface Message {
  content: string;
  isUser: boolean;
}

export interface APIMessage {
  role: "user" | "assistant";
  content: {
    type: "text";
    text: string;
  }[];
}