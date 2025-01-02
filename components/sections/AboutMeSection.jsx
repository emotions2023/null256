// src/components/sections/AboutMeSection.jsx
import Image from 'next/image';

const AboutMeSection = () => {
  const content = [
    "はじめまして、NULL256です。",
    "フロントエンド開発とAI技術の融合を追求するエンジニアです。",
    "最新のAIツールと従来のWeb技術を組み合わせることで、革新的なユーザー体験の創造に取り組んでいます。",
    "100年後の教科書に掲載される、そんな生成AI元年にエンジニアとして携われることに深い感謝を。"
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div>
        <h1 className="text-xl mb-4 text-center">ABOUT ME</h1>
        <div className="max-w-4xl mx-auto mt-20 flex flex-col md:flex-row">
          <div className="flex-shrink-0 mx-auto">
            <Image
              src="/img/profile.png"
              alt="Avatar"
              width={300}
              height={300}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col justify-center mt-8 ml-8 text-left">
            <div className="text-sm space-y-4">
              {content.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;