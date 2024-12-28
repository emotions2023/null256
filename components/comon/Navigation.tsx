// components/Navigation.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import '@/app/styles/hamburger.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const renderLink = (href: string, label: string, isExternal: boolean = false) => (
    <Link href={href} target={isExternal ? "_blank" : undefined} className="hover:text-gray-400" onClick={() => setIsOpen(false)}>
      <span className={`hover:text-gray-400 ${isOpen ? 'text-black' : 'text-black'}`}>{label}</span>
    </Link>
  );

  return (
    <div className="absolute w-full top-4">
      <div className="relative flex justify-between items-start px-8">
        <Link href="/">
          <Image
            src="/img/logo.svg"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`hamburger-button md:hidden ${isOpen ? 'is-open' : ''}`}
        >
          <div className="hamburger-bar"></div>
          <div className="hamburger-bar"></div>
          <div className="hamburger-bar"></div>
        </button>

        {/* PCメニュー */}
        <nav className={`hidden md:flex flex-col gap-6 text-sm ${isOpen ? 'text-black' : 'text-black'}`}>
          {renderLink("/", "HOME")}
          {renderLink("/about", "ABOUT ME")}
          {renderLink("/about#skill-set", "SKILL SET")}
          {renderLink("/#portfolio", "PORTFOLIO")}
          {renderLink("https://x.com/QuantumQuill__", "X", true)}
          {renderLink("https://note.com/null256/", "Note", true)}
        </nav>

        {/* モバイルメニュー - 常に存在するが、transformで制御 */}
        <div 
          className={`mobile-menu-wrapper fixed inset-0 transition-all duration-300 ${
            isOpen ? 'visible bg-white bg-opacity-20' : 'invisible bg-opacity-0'
          }`} 
          onClick={() => setIsOpen(false)}
        >
          <nav 
            className={`fixed top-0 right-0 w-64 h-full bg-white transform transition-transform duration-300 ease-in-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-6 text-sm p-4 text-black">
              {renderLink("/", "HOME")}
              {renderLink("/about", "ABOUT ME")}
              {renderLink("/about#skill-set", "SKILL SET")}
              {renderLink("/#portfolio", "PORTFOLIO")}
              {renderLink("https://x.com/QuantumQuill__", "X", true)}
              {renderLink("https://note.com/null256/", "Note", true)}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}