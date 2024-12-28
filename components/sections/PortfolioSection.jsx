// components/sections/PortfolioSection.jsx
import { works } from '@/lib/works';
import WorkCard from '@/components/works/WorkCard';

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="max-w-4xl mx-auto mt-32 px-4">
      <h2 className="text-xl text-center mb-16">PORTFOLIO</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </section>
  );
}