import NeuralNetwork3D from '../features/NeuralNetwork3D'

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <NeuralNetwork3D />
      </div>

      <div className="absolute inset-0 bg-white opacity-10" />
      
      <div className="relative z-10 text-center">
        <h1 className="text-[1rem] md:text-base tracking-[0.50em] mb-12">AI ENGINEER</h1>
        <p className="text-[0.8rem] md:text-2xl tracking-[1.2em] mb-2">AIと人間の共創で、無限の可能性を切り開く</p>
        <p className="text-[0.5rem] md:text-base tracking-[0.6em]">Co-creation between AI and humans opens up unlimited possibilities</p>
      </div>
    </section>
  );
};

export default HeroSection;