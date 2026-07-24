'use client';

import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('@/components/home/HeroSection'), { loading: () => <div className="h-[90vh] min-h-[600px] bg-emerald-900 animate-pulse" /> });
const PopupPengumuman = dynamic(() => import('@/components/home/PopupPengumuman'), { ssr: false });
const WelcomePopup = dynamic(() => import('@/components/home/WelcomePopup'), { ssr: false });
const QuickInfoBar = dynamic(() => import('@/components/home/QuickInfoBar'), { loading: () => <div className="h-16 bg-emerald-50 dark:bg-dark-card animate-pulse" /> });
const CarouselFasilitas = dynamic(() => import('@/components/home/CarouselFasilitas'), { loading: () => <div className="h-[400px] bg-gray-100 dark:bg-dark-bg animate-pulse" /> });
const SambutanSection = dynamic(() => import('@/components/home/SambutanSection'), { loading: () => <div className="h-[500px] bg-white dark:bg-dark-bg animate-pulse" /> });
const NilaiUnggulan = dynamic(() => import('@/components/home/NilaiUnggulan'), { loading: () => <div className="h-[400px] bg-emerald-50/50 dark:bg-dark-bg animate-pulse" /> });
const StatsSection = dynamic(() => import('@/components/home/StatsSection'), { loading: () => <div className="h-[300px] bg-emerald-900 animate-pulse" /> });
const TimelineSejarah = dynamic(() => import('@/components/home/TimelineSejarah'), { loading: () => <div className="h-[500px] bg-white dark:bg-dark-bg animate-pulse" /> });
const BeritaTerbaru = dynamic(() => import('@/components/home/BeritaTerbaru'), { loading: () => <div className="h-[600px] bg-white dark:bg-dark-bg animate-pulse" /> });
const GaleriSection = dynamic(() => import('@/components/home/GaleriSection'), { loading: () => <div className="h-[400px] bg-emerald-50/50 dark:bg-dark-bg animate-pulse" /> });
const PetaLokasi = dynamic(() => import('@/components/home/PetaLokasi'), { loading: () => <div className="h-[400px] bg-white dark:bg-dark-bg animate-pulse" /> });
const TestimoniSlider = dynamic(() => import('@/components/home/TestimoniSlider'), { loading: () => <div className="h-[350px] bg-emerald-50/50 dark:bg-dark-bg animate-pulse" /> });
const CTASection = dynamic(() => import('@/components/home/CTASection'), { loading: () => <div className="h-[300px] bg-emerald-900 animate-pulse" /> });

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WelcomePopup />
      <PopupPengumuman />
      <QuickInfoBar />
      <CarouselFasilitas />
      <SambutanSection />
      <NilaiUnggulan />
      <StatsSection />
      <TimelineSejarah />
      <BeritaTerbaru />
      <GaleriSection />
      <PetaLokasi />
      <TestimoniSlider />
      <CTASection />
    </>
  );
}
