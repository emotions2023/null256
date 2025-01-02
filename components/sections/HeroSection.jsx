import NeuralNetwork3D from '../features/NeuralNetwork3D';
import ScrambleText from '../features/ScrambleText';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
    <div className="absolute inset-0">
      <NeuralNetwork3D />
    </div>

      {/* <div className="absolute inset-0 bg-white opacity-10" /> */}
      
      <div className="relative z-10 text-center">
        <h1 className="text-2xl md:text-4xl tracking-[0.50em] mb-12">
          <ScrambleText text="AI ENGINEER" delay={0} />
        </h1>
        <div className="text-[0.8rem] md:text-2xl tracking-[1.1em] mb-2">
          <ScrambleText 
            text="AIと人間の共創で、無限の可能性を切り開く"
            delay={100}
          />
        </div>
        <p className="text-[0.5rem] md:text-base tracking-[0.4em]">
          <ScrambleText 
            text="Co-creation between AI and humans opens up unlimited possibilities"
            delay={200}
          />
        </p>
      </div>
    </section>
  );
};

export default HeroSection;