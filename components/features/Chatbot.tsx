"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, MinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { toast } from "sonner";
import { TypingMessage } from './TypingMessage';
import { tailspin } from 'ldrs';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "こんにちは！私（NULL256）についてご質問がございましたら、こちらに話かけてください！",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  // スクロールを制御する関数
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    import('ldrs').then(({ tailspin }) => {
      tailspin.register();
    });
  }, []);

  // メッセージやローディング状態が変更されたときにスクロール
  useEffect(() => {
    scrollToBottom();
      // isLoadingが終わった後にフォーカスを設定
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isLoading]);

  // チャットを開いたときのフォーカス処理はそのまま維持
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
  
    const userMessage = { content: message.trim(), isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
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
      // メッセージ送信後に入力欄にフォーカスを戻す
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleErrorResponse = (status: number, errorMessage: string) => {
    if (status === 429) {
      toast.error(errorMessage);  // サーバーからのエラーメッセージを使用
      setMessages(prev => [
        ...prev,
        {
          content: errorMessage,  // サーバーからのエラーメッセージを使用
          isUser: false,
        },
      ]);
    } else {
      throw new Error(errorMessage || `HTTP error! status: ${status}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // AIチャットボタン
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <l-tailspin
              size="48"
              stroke="3"
              speed="3"
              color="#96A6FF"
            />
          </div>
          <Button
            onClick={() => {
              setIsOpen(true);
              console.log("isOpen:", true);
            }}
            variant="default"
            size="icon"
            className="absolute inset-0 h-12 w-12 rounded-full shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
            
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 w-[380px] rounded-lg shadow-xl transition-all duration-200",
        "backdrop-blur-md bg-white/30 z-[300]", // 背景を半透明に、z-indexを調整
        isMinimized ? "h-[60px]" : "h-[600px]"
      )}
    >
      <div className="flex items-center justify-between border-b border-border/30 p-4 backdrop-blur-md bg-white/30">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h2 className="font-semibold">NULL256 AI</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-white/10"  // ホバー時の背景も半透明に
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-white/10"  // ホバー時の背景も半透明に
            onClick={() => setIsOpen(false)}
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
                      : "bg-muted/10"  // AIメッセージの背景も半透明に
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
              {/* 最下部にスクロールするための要素を追加 */}
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
                onClick={handleSend} 
                size="icon" 
                disabled={isLoading || !message.trim()}
                className="bg-primary/10 hover:bg-primary/10"  // 送信ボタンも半透明に
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
