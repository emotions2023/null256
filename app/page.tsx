// HOME

import './styles/fonts.css';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SpecialtySection from '@/components/sections/SpecialtySection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import TrainingSection from '@/components/sections/TrainingSection';
import Footer from '@/components/comon/Footer';
import MainLayout from '@/components/MainLayout';
import type {} from 'ldrs'

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <SpecialtySection />
      <PortfolioSection />
      <TrainingSection />
      <Footer />
    </MainLayout>
  );
}