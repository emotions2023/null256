/**
 * ChatButton Component
 * 
 * チャットボットを起動するためのフローティングボタンコンポーネント
 * 
 * 主な機能：
 * - チャットボットを開くためのクリッカブルなアイコン表示
 * - 10秒後に自動で表示される吹き出しメッセージ
 * - ホバー時の吹き出しメッセージ表示
 * - アイコンホバー時のアニメーション効果
 */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ChatButtonProps {
  onOpen: () => void;
}

export function ChatButton({ onOpen }: ChatButtonProps) {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 group">
      <div className={`${showBubble ? 'block' : 'hidden'} group-hover:block relative bg-white/80 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-2xl transition-all duration-200 shadow-lg`}>
        <span>ここで会話できるよ～</span>
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 
          border-t-8 border-t-transparent 
          border-l-[12px] border-l-white/80 
          border-b-8 border-b-transparent">
        </div>
      </div>

      <Button
        onClick={() => {
          onOpen();
          setShowBubble(false);
        }}
        variant="default"
        size="icon"
        className="p-0 h-16 w-16 rounded-full hover:scale-110 transition-transform duration-200 shadow-lg"
        onMouseEnter={() => setShowBubble(false)}
      >
        <img 
          src="/img/profile.png" 
          alt="Chat Icon" 
          className="h-full w-full rounded-full object-cover"
        />
      </Button>
    </div>
  );
}