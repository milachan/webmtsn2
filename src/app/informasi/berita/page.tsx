import { redirect } from 'next/navigation';
import { beritaLink } from '@/lib/berita';

// Berita kini dikelola & ditampilkan di Portal Web Berita (berita.mtsnegeri2kebumen.sch.id).
// Halaman internal ini dialihkan ke portal agar tidak ada duplikasi konten.
export const dynamic = 'force-dynamic';

export default function BeritaPage() {
  redirect(beritaLink());
}
