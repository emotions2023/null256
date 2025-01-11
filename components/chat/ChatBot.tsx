/**
 * ChatBot Component
 * 
 * チャットボット全体を統括する親コンポーネント
 * 
 * 主な機能：
 * - チャットの状態管理（開閉・最小化）
 * - メッセージ履歴の管理
 * - APIとの通信処理
 * - エラーハンドリング
 * - ChatButtonとChatWindowの連携
 * - ローディング状態の管理
 */
"use client";

import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { toast } from "sonner";
import { ChatButton } from "./ChatButton";
import { ChatWindow } from "./ChatWindow";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "こんにちは！私（NULL256）についてご質問がございましたら、こちらに話かけてください！",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    import('ldrs').then(({ tailspin }) => {
      tailspin.register();
    });
  }, []);

  const handleErrorResponse = (status: number, errorMessage: string) => {
    if (status === 429) {
      toast.error(errorMessage);
      setMessages(prev => [
        ...prev,
        {
          content: errorMessage,
          isUser: false,
        },
      ]);
    } else {
      throw new Error(errorMessage || `HTTP error! status: ${status}`);
    }
  };

  const handleSend = async (message: string) => {
    if (!message.trim() || isLoading) return;
  
    const userMessage = { content: message.trim(), isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
  
    try {
      const response = await fetch("/api/anthropic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        handleErrorResponse(response.status, errorData.error);
        return;
      }
  
      const data = await response.json();
      if (data.response) {
        setMessages(prev => [...prev, { content: data.response, isUser: false }]);
      } else {
        throw new Error("不正なレスポンス形式です");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = error instanceof Error ? error.message : "エラーが発生しました";
      toast.error(errorMessage);
      setMessages(prev => [
        ...prev,
        {
          content: "申し訳ありません。エラーが発生しました。もう一度お試しください。",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return <ChatButton onOpen={() => setIsOpen(true)} />;
  }

  return (
    <ChatWindow
      isMinimized={isMinimized}
      messages={messages}
      isLoading={isLoading}
      onMinimize={() => setIsMinimized(!isMinimized)}
      onClose={() => setIsOpen(false)}
      onSend={handleSend}
    />
  );
}