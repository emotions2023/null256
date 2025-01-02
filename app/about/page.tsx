// about

import ProfileSection from '@/components/sections/ProfileSection';
import SkillSection from '@/components/sections/SkillSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import Footer from '@/components/comon/Footer';
import MainLayout from '@/components/MainLayout';

export default function About() {
  return (
    <MainLayout>
      <AboutMeSection />
      <ProfileSection />
      <SkillSection />
      <Footer />
    </MainLayout>
  );
}
