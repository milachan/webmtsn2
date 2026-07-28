'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';
import QuickInfoBar from '@/components/home/QuickInfoBar';
import CarouselFasilitas from '@/components/home/CarouselFasilitas';
import SambutanSection from '@/components/home/SambutanSection';
import NilaiUnggulan from '@/components/home/NilaiUnggulan';
import StatsSection from '@/components/home/StatsSection';
import TimelineSejarah from '@/components/home/TimelineSejarah';
import BeritaTerbaru from '@/components/home/BeritaTerbaru';
import GaleriSection from '@/components/home/GaleriSection';
import PetaLokasi from '@/components/home/PetaLokasi';
import TestimoniSlider from '@/components/home/TestimoniSlider';
import CTASection from '@/components/home/CTASection';

// UnifiedPopup is intentionally client-only (ssr:false) to avoid popup flashing on load
const UnifiedPopup = dynamic(() => import('@/components/home/UnifiedPopup'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <UnifiedPopup />
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
