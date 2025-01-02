'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrambleTextProps {
    text: string;
    className?: string;
    delay?: number;
    scrambleSpeed?: number;
    updateProbability?: number;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  delay = 0,
  scrambleSpeed = 100,
  updateProbability = 0.28
}) => {
  const [displayText, setDisplayText] = useState('');
  const queueRef = useRef<Array<{
    from: string;
    to: string;
    start: number;
    end: number;
    char?: string;
  }>>([]);
  const frameRef = useRef(0);
  const frameRequestRef = useRef<number | null>(null);
  
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];
  
  const setText = async (newText: string) => {
    const oldText = displayText;
    const length = Math.max(oldText.length, newText.length);
    queueRef.current = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * scrambleSpeed);
      const end = start + Math.floor(Math.random() * scrambleSpeed);
      queueRef.current.push({ from, to, start, end });
    }
    
    frameRef.current = 0;
    return update();
  };
  
  const update = () => {
    let output = '';
    let complete = 0;
    
    for (let i = 0; i < queueRef.current.length; i++) {
      let { from, to, start, end, char } = queueRef.current[i];
      
      if (frameRef.current >= end) {
        complete++;
        output += to;
      } else if (frameRef.current >= start) {
        if (!char || Math.random() < updateProbability) {
          char = randomChar();
          queueRef.current[i].char = char;
        }
        output += `<span class="text-gray-500">${char}</span>`;
      } else {
        output += from;
      }
    }
    
    setDisplayText(output);
    
    if (complete === queueRef.current.length) {
      return Promise.resolve();
    } else {
      frameRef.current++;
      return new Promise((resolve) => {
        frameRequestRef.current = requestAnimationFrame(() => {
          update().then(resolve);
        });
      });
    }
  };
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setText(text);
    }, delay);

    return () => {
      if (frameRequestRef.current) {
        cancelAnimationFrame(frameRequestRef.current);
      }
      clearTimeout(timeoutId);
    };
  }, [text, delay]);

  return (
    <div 
      className={`${className}`}
      dangerouslySetInnerHTML={{ __html: displayText }}
    />
  );
};

export default ScrambleText;