
// components/sections/AboutSection.jsx
const AboutSection = () => {
    const content = [
      "はじめまして、NULL256です。",
      "フロントエンド開発とAI技術の融合を追求するエンジニアです。",
      "最新のAIツールと従来のWeb技術を組み合わせることで、革新的なユーザー体験の創造に取り組んでいます。",
      "100年後の教科書に掲載される、そんな生成AI元年にエンジニアとして携われることに深い感謝を。"
    ];
  
    return (
      <section id="about" className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-xl mb-16">ABOUT ME</h2>
        <div className="max-w-2xl text-sm space-y-8">
          {content.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </section>
    );
  };
  
  export default AboutSection;