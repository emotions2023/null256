// app/works/[slug]/page.tsx
import { works } from '@/lib/works';
import WorkDetail from '@/components/works/WorkDetail';
import { notFound } from 'next/navigation';
import MainLayout from '@/components/MainLayout';
import Footer from '@/components/comon/Footer';

interface WorkPageProps {
  params: {
    slug: string;
  };
}

export default function WorkPage({ params }: WorkPageProps) {
  const work = works.find((w) => w.slug === params.slug);

  if (!work) {
    notFound();
  }

  return (
    <MainLayout>
      <WorkDetail work={work} />
      <Footer />
    </MainLayout>
  );
}