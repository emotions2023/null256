// components/works/WorkCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Work } from '@/lib/works';

interface WorkCardProps {
  work: Work;
}

export default function WorkCard({ work }: WorkCardProps) {
  return (
    <Link href={`/works/${work.slug}`} className="block relative group">
      <div className="relative bg-white/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 
        hover:border-blue-500/50 transition-all duration-500
        before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-blue-500/20 before:to-purple-500/20 before:rounded-xl before:blur-xl before:opacity-20 before:transition-opacity before:duration-500
        group-hover:before:opacity-100"
      >
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-xl border border-gradient-to-r from-blue-500/30 to-purple-500/30" />

        {/* Content */}
        <div className="relative z-10">
          {/* Image Container with Link */}
          <Link href={`/works/${work.slug}`} className="block">
            <div className="aspect-video mb-4 rounded-lg overflow-hidden border border-white/10 group-hover:border-blue-500/30 transition-colors duration-500">
              <Image
                src={work.thumbnail.src}
                alt={work.thumbnail.alt}
                width={work.thumbnail.width}
                height={work.thumbnail.height}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>

          {/* Title with Link */}
          <Link href={`/works/${work.slug}`}>
            <h3 className="text-lg font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90 group-hover:from-blue-400 group-hover:to-purple-400 transition-colors duration-500">
              {work.title}
            </h3>
          </Link>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {work.primaryTechStack.map((tech) => (
              <span 
                key={tech.name} 
                className="text-xs px-2 py-1 rounded-full 
                  bg-white/5 border border-white/10 
                  group-hover:border-blue-500/30 group-hover:bg-blue-500/5 
                  transition-all duration-500"
              >
                {tech.name}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-500">
            {work.description}
          </p>
        </div>

        {/* Bottom Gradient Line - Always visible */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Link>
  );
}