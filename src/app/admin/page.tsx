'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminBerita from '@/components/admin/AdminBerita';
import AdminPengumuman from '@/components/admin/AdminPengumuman';
import AdminAgenda from '@/components/admin/AdminAgenda';
import AdminFasilitas from '@/components/admin/AdminFasilitas';
import AdminGuru from '@/components/admin/AdminGuru';
import AdminEkstrakurikuler from '@/components/admin/AdminEkstrakurikuler';
import AdminGaleri from '@/components/admin/AdminGaleri';
import AdminTestimoni from '@/components/admin/AdminTestimoni';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminSejarah from '@/components/admin/AdminSejarah';
import AdminProgram from '@/components/admin/AdminProgram';
import AdminNilaiUnggulan from '@/components/admin/AdminNilaiUnggulan';
import AdminHeroSlides from '@/components/admin/AdminHeroSlides';
import AdminPrestasi from '@/components/admin/AdminPrestasi';
import AdminVisiMisi from '@/components/admin/AdminVisiMisi';
import AdminStrukturOrganisasi from '@/components/admin/AdminStrukturOrganisasi';
import AdminKurikulum from '@/components/admin/AdminKurikulum';
import AdminPembiasaan from '@/components/admin/AdminPembiasaan';
import AdminTataTertib from '@/components/admin/AdminTataTertib';
import AdminPesanMasuk from '@/components/admin/AdminPesanMasuk';
import AdminPmb from '@/components/admin/AdminPmb';
import AdminLokasi from '@/components/admin/AdminLokasi';

function AdminContent() {
  const searchParams = useSearchParams();

  const section = searchParams.get('section') || 'dashboard';

  const renderSection = () => {
    switch (section) {
      case 'berita': return <AdminBerita />;
      case 'pengumuman': return <AdminPengumuman />;
      case 'agenda': return <AdminAgenda />;
      case 'fasilitas': return <AdminFasilitas />;
      case 'guru': return <AdminGuru />;
      case 'ekstrakurikuler': return <AdminEkstrakurikuler />;
      case 'galeri': return <AdminGaleri />;
      case 'testimoni': return <AdminTestimoni />;
      case 'settings': return <AdminSettings />;
      case 'sejarah': return <AdminSejarah />;
      case 'nilainunggulan': return <AdminNilaiUnggulan />;
      case 'hero': return <AdminHeroSlides />;
      case 'program': return <AdminProgram />;
      case 'prestasi': return <AdminPrestasi />;
      case 'visimisi': return <AdminVisiMisi />;
      case 'strukturorganisasi': return <AdminStrukturOrganisasi />;
      case 'kurikulum': return <AdminKurikulum />;
      case 'pembiasaan': return <AdminPembiasaan />;
      case 'tatatertib': return <AdminTataTertib />;
      case 'pesanmasuk': return <AdminPesanMasuk />;
      case 'pmb': return <AdminPmb />;
      case 'lokasi': return <AdminLokasi />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout activeSection={section}>
      {renderSection()}
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 animate-pulse mx-auto mb-4" />
          <p className="text-sm text-gray-400">Memuat Panel Admin...</p>
        </div>
      </div>
    }>
      <AdminContent />
    </Suspense>
  );
}
