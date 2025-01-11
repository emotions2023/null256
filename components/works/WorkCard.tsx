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
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 
         transition-all duration-500
        before:absolute before:inset-0 before:-z-10 before:rounded-xl before:transition-opacity before:duration-500
        group-hover:bg-gradient-to-r group-hover:from-blue-500/10 group-hover:to-purple-500/10
        group-hover:before:bg-gradient-to-r group-hover:before:from-blue-500/20 group-hover:before:to-purple-500/20 group-hover:before:blur-xl group-hover:before:opacity-50"
      >
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-xl border border-gradient-to-r from-blue-500/30 to-purple-500/30" />

        {/* Content */}
        <div className="relative z-10">
          {/* Image Container */}
          <div className="mb-4 rounded-lg overflow-hidden">
            <Image
              src={work.thumbnail.src}
              alt={work.thumbnail.alt}
              width={work.thumbnail.width}
              height={work.thumbnail.height}
              className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Title */}
          <h3 className="text-lg font-medium tracking-wide mb-3
            group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 
            transition-colors duration-500">
            {work.title}
          </h3>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5">
            {work.primaryTechStack.map((tech) => (
              <div 
                key={tech.name} 
                className="flex items-center text-xs tracking-wide px-2 py-0.5 rounded-full
                  border border-gradient-to-r from-blue-500/20 to-purple-500/20 
                  group-hover:bg-blue-500/5
                  transition-all duration-500"
              >
                {tech.icon && (
                  <span className="mr-1.5 text-white/70 group-hover:text-blue-400 transition-colors duration-500">
                    {tech.icon}
                  </span>
                )}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 line-clamp-2 tracking-wide mt-3 group-hover:text-gray-300 transition-colors duration-500">
            {work.description}
          </p>
        </div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent 
          group-hover:via-blue-500/50 
          transition-all duration-500" />
      </div>
    </Link>
  );
}