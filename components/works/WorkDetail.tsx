// components/works/WorkDetail.tsx
'use client';

import { Work } from '@/lib/works';
import { motion } from 'framer-motion';

interface WorkDetailProps {
  work: Work;
}

export default function WorkDetail({ work }: WorkDetailProps) {
  return (
    <div className="min-h-screen">
    {/* ヒーローセクション */}
    <div className="h-[50vh] relative bg-white flex items-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="max-w-4xl mx-auto px-4 w-full relative">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 leading-relaxed tracking-normal"
        >
          {work.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-xl text-gray-400 max-w-2xl leading-relaxed"
        >
          {work.fullDescription}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 sm:mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-4"
        >
          <span className="text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1 bg-white/5 rounded-full">
            {work.period.start} {work.period.end && `- ${work.period.end}`}
          </span>
        </motion.div>
      </div>
    </div>

    {work.demo && (
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl mb-12 relative">
          Demo
          <div className="absolute bottom-0 left-0 w-12 h-1 bg-blue-500" />
        </h2>
        
        <div className="relative aspect-video rounded-xl overflow-hidden bg-white/50 border border-white/10">
          <video
            src={work.demo.videoUrl}
            poster={work.demo.poster}
            title={work.demo.title}
            controls
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src={work.demo.videoUrl} type="video/mp4" />
            お使いのブラウザは動画の再生に対応していません。
          </video>
        </div>
      </section>
    )}

    {/* QRコードセクション */}
    {work.qrCode && (
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl mb-12 relative">
          QR Code
          <div className="absolute bottom-0 left-0 w-12 h-1 bg-blue-500" />
        </h2>
        <div className="flex items-center">
          <img
            src={work.qrCode.image.src}
            alt={work.qrCode.image.alt}
            width={work.qrCode.image.width}
            height={work.qrCode.image.height}
            className="rounded-lg"
          />
          <div className="ml-4">
            <h3 className="text-lg">{work.qrCode.title}</h3>
            <p className="text-sm text-gray-400">{work.qrCode.description}</p>
            <a href={work.qrCode.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
              デモお試しリンク
            </a>
          </div>
        </div>
      </section>
    )}    

      {/* Features セクション */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl  mb-8 md:mb-12 relative">
          Features
          <div className="absolute bottom-0 left-0 w-12 h-1 bg-blue-500" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {work.features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/10 hover:border-blue-500/50 transition-colors"
            >
              {feature.icon && (
                <div className="mb-3 md:mb-4">
                  <span className="text-blue-500">{feature.icon}</span>
                </div>
              )}
              <h3 className="text-lg md:text-xl  mb-2 md:mb-3">{feature.title}</h3>
              <p className="text-sm md:text-base text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack セクション */}
      <section className="max-w-4xl mx-auto px-4 py-20 bg-white/50">
        <h2 className="text-3xl  mb-12 relative">
          Tech Stack
          <div className="absolute bottom-0 left-0 w-12 h-1 bg-blue-500" />
        </h2>
        
        {work.techStack.map((stack, stackIndex) => (
          <div key={stack.category} className="mb-12">
            <h3 className="text-xl  mb-6 text-gray-300">{stack.category}</h3>
            <div className="flex flex-wrap gap-3">
              {stack.items.map((item, itemIndex) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (stackIndex * stack.items.length + itemIndex) * 0.05 }}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors"
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  <span>{item.name}</span>
                  {item.version && (
                    <span className="ml-2 text-xs text-gray-400">v{item.version}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Highlights セクション */}
      {work.highlights && (
        <section className="max-w-4xl mx-auto px-4 py-20">
          <h2 className="text-3xl  mb-12 relative">
            Highlights
            <div className="absolute bottom-0 left-0 w-12 h-1 bg-blue-500" />
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {work.highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm p-6 rounded-xl border border-white/10"
              >
                <h3 className="text-xl  mb-3">{highlight.title}</h3>
                <p className="text-gray-400">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}