/**
 * ChatWindow Component
 * 
 * チャットボットのメインインターフェースを提供するコンポーネント
 * 
 * 主な機能：
 * - メッセージの表示とスクロール管理
 * - ユーザー入力インターフェース
 * - タイピングアニメーション表示
 * - 最小化/最大化の切り替え
 * - メッセージ送信機能
 * - 自動スクロールとフォーカス管理
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, MinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { TypingMessage } from '@/components/features/TypingMessage';

interface ChatWindowProps {
  isMinimized: boolean;
  messages: Message[];
  isLoading: boolean;
  onMinimize: () => void;
  onClose: () => void;
  onSend: (message: string) => void;
}

export function ChatWindow({
  isMinimized,
  messages,
  isLoading,
  onMinimize,
  onClose,
  onSend
}: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isLoading]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSend(message);
        setMessage("");
      }
    }
  };

  return (
    <div className={cn(
      "fixed bottom-4 right-4 w-[380px] rounded-lg shadow-xl transition-all duration-200",
      "backdrop-blur-md bg-white/30 z-[300]",
      isMinimized ? "h-[60px]" : "h-[600px]"
    )}>
      <div className="flex items-center justify-between border-b border-border/30 p-4 backdrop-blur-md bg-white/30">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h2 className="font-semibold">NULL256 AI</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-white/10"
            onClick={onMinimize}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <ScrollArea 
            ref={scrollAreaRef} 
            className="flex-1 p-4 bg-white/30" 
            style={{ height: "calc(100% - 130px)" }}
          >
            <div className="flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex max-w-[80%] flex-col gap-1 rounded-lg p-3",
                    msg.isUser
                      ? "ml-auto bg-primary/10 text-primary-foreground"
                      : "bg-muted/10"
                  )}
                >
                  {msg.isUser ? (
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <TypingMessage 
                      content={msg.content} 
                      onComplete={scrollToBottom}
                      typingSpeed={30}
                    />
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex max-w-[80%] flex-col gap-1 rounded-lg p-3 bg-muted/10">
                  <p className="text-sm">入力中...</p>
                </div>
              )}
              <div ref={messageContainerRef} />
            </div>
          </ScrollArea>

          <div className="border-t border-border/10 p-4 bg-white/30">
            <div className="flex gap-2">
              <Input
                ref={inputRef} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="例）平日の稼働時間は？"
                className="flex-1 bg-white/10 placeholder-gray-400"
                disabled={isLoading}
              />
              <Button 
                onClick={() => {
                  if (message.trim()) {
                    onSend(message);
                    setMessage("");
                  }
                }}
                size="icon" 
                disabled={isLoading || !message.trim()}
                className="bg-primary/10 hover:bg-primary/10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}