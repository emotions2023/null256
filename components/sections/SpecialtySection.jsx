// components/sections/SpecialtySection.jsx
const SpecialtySection = () => {
    const specialties = [
      { title: "フロントエンド開発", subtitle: "Front-end development" },
      { title: "AIツール活用", subtitle: "Utilization of AI tools" },
      { title: "バックエンド設計", subtitle: "Backend design" },
      { title: "AIコンサルティング", subtitle: "AI consulting" },
      { title: "RAG開発", subtitle: "RAG development" }
    ];
  
    return (
      <section id="skill" className="min-h-[70vh] flex flex-col items-center justify-center px-4 mt-8">
        <h2 className="text-xl mb-16">SPECIALTY FIELD</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl">
          {specialties.map(({ title, subtitle }, index) => (
            <div key={index} className="text-center">
              <div className="h-px bg-white mb-2"></div>
              <p className="text-sm">{title}</p>
              <p className="text-xs">{subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  export default SpecialtySection;
// import SpecialtyPhysics from '../features/specialty-physics';

// const SpecialtySection = () => {
//   return (
//     <section id="skill" className="min-h-[70vh] flex flex-col items-center justify-center px-4 mt-8">
//       <SpecialtyPhysics />
//     </section>
//   );
// };

// export default SpecialtySection;