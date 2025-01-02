// components/TypingMessage.tsx
import { useState, useEffect } from 'react';

interface TypingMessageProps {
  content: string;
  onComplete?: () => void;
  typingSpeed?: number; // タイピング速度をカスタマイズ可能に
}

export function TypingMessage({ 
  content, 
  onComplete, 
  typingSpeed = 30  // デフォルトは30ミリ秒
}: TypingMessageProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [content, currentIndex, onComplete, typingSpeed]);

  return <p className="text-sm whitespace-pre-wrap">{displayedContent}</p>;
}