import { redirect } from 'next/navigation';
import { beritaLink } from '@/lib/berita';

// Detail berita ditampilkan di Portal Web Berita (berita.mtsnegeri2kebumen.sch.id/berita/{slug}).
// Halaman internal ini dialihkan ke halaman yang sama di portal.
export const dynamic = 'force-dynamic';

export default function BeritaDetailPage({ params }: { params: { slug: string } }) {
  redirect(beritaLink(params.slug));
}
