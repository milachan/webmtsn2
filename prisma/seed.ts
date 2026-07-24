import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const url = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/mtsn2_kebumen';
const connectionUrl = url.replace(/^mysql:\/\//, 'mariadb://');
const dbName = url.split('/').pop()?.split('?')[0] || 'mtsn2_kebumen';
const adapter = new PrismaMariaDb(connectionUrl, { database: dbName });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Berita
  await prisma.berita.createMany({ data: [
    { id: 1, title: 'MTsN 2 Kebumen Juara Umum Olimpiade Sains Madrasah Tingkat Kabupaten', excerpt: 'Tim Olimpiade Sains Madrasah Tsanawiyah Negeri 2 Kebumen berhasil meraih juara umum dengan membawa pulang 5 medali emas dan 3 perak.', date: '15 Juli 2026', category: 'Prestasi', image: '/images/berita-1.jpg', slug: 'juara-olimpiade-sains' },
    { id: 2, title: 'Kegiatan Pesantren Kilat Ramadhan 1447 H', excerpt: 'Pesantren kilat diikuti oleh seluruh siswa kelas 7, 8, dan 9 dengan kegiatan tadarus, kajian kitab kuning, dan praktik ibadah.', date: '10 Juli 2026', category: 'Kegiatan', image: '/images/berita-2.jpg', slug: 'pesantren-kilat' },
    { id: 3, title: 'PMB Tahun Ajaran 2026/2027 Resmi Dibuka', excerpt: 'Pendaftaran peserta didik baru MTs Negeri 2 Kebumen dibuka mulai 1 Agustus 2026. Kuota terbatas 280 siswa.', date: '5 Juli 2026', category: 'Pengumuman', image: '/images/berita-3.jpg', slug: 'pmb-dibuka' },
  ], skipDuplicates: true });

  // Pengumuman
  await prisma.pengumuman.createMany({ data: [
    { id: 1, title: 'PMB Tahun Ajaran 2026/2027 Dibuka', date: '1 Agustus 2026', content: 'Pendaftaran peserta didik baru MTs Negeri 2 Kebumen dibuka mulai 1 Agustus 2026. Kuota terbatas 280 siswa.', priority: 'high' },
    { id: 2, title: 'Pembagian Raport Semester Genap', date: '20 Juni 2026', content: 'Pembagian raport semester genap TA 2025/2026 akan dilaksanakan pada hari Sabtu, 20 Juni 2026.', priority: 'high' },
  ], skipDuplicates: true });

  // Agenda
  await prisma.agenda.createMany({ data: [
    { id: 1, title: 'Upacara Hari Pendidikan Nasional', date: '2 Mei 2026', time: '07.00 - 09.00 WIB', location: 'Lapangan Madrasah', description: 'Upacara peringatan Hardiknas dengan busana adat' },
    { id: 2, title: 'Ujian Akhir Semester Genap', date: '5-12 Juni 2026', time: '07.30 - 12.00 WIB', location: 'Ruang Kelas', description: 'Penilaian akhir tahun pelajaran 2025/2026' },
  ], skipDuplicates: true });

  // Fasilitas
  await prisma.fasilitas.createMany({ data: [
    { id: 1, name: 'Ruang Kelas Ber-AC', description: '27 ruang kelas nyaman dengan pendingin udara, LCD proyektor, dan akses internet', icon: 'building-2', image: '/images/fasilitas-kelas.jpg' },
    { id: 2, name: 'Laboratorium IPA', description: 'Laboratorium Fisika, Kimia, dan Biologi lengkap dengan alat peraga modern', icon: 'flask-conical', image: '/images/fasilitas-lab.jpg' },
  ], skipDuplicates: true });

  // Guru
  await prisma.guru.createMany({ data: [
    { id: 1, name: 'Dr. H. Ahmad Fauzi, S.Ag., M.Pd.', position: 'Kepala Madrasah', subject: '-', image: '' },
    { id: 2, name: 'Drs. H. Slamet Riyadi', position: 'Waka Kurikulum', subject: 'Matematika', image: '' },
  ], skipDuplicates: true });

  // Ekstrakurikuler
  await prisma.ekstrakurikuler.createMany({ data: [
    { id: 1, name: 'Pramuka', description: 'Gerakan Pramuka MTsN 2 Kebumen aktif dengan berbagai kegiatan kepramukaan', icon: 'compass', category: 'Wajib' },
    { id: 2, name: 'Tahfidz Qur\'an', description: 'Program intensif hafalan Al-Qur\'an dengan target 3 juz dalam 3 tahun', icon: 'book-open', category: 'Keagamaan' },
  ], skipDuplicates: true });

  // Galeri
  await prisma.galeri.createMany({ data: [
    { id: 1, title: 'Upacara Bendera', category: 'Kegiatan', image: '/images/galeri-1.jpg', description: 'Upacara bendera setiap Senin pagi' },
    { id: 2, title: 'Laboratorium Komputer', category: 'Fasilitas', image: '/images/galeri-2.jpg', description: 'Laboratorium komputer modern' },
  ], skipDuplicates: true });

  // Testimoni
  await prisma.testimoni.createMany({ data: [
    { id: 1, name: 'Bapak Supriyono', role: 'Orang Tua Siswa', content: 'Saya sangat bersyukur anak saya bersekolah di MTsN 2 Kebumen.', avatar: '' },
    { id: 2, name: 'Ibu Fatimah', role: 'Orang Tua Siswa', content: 'Anak saya mengalami perkembangan yang signifikan sejak masuk MTsN 2 Kebumen.', avatar: '' },
  ], skipDuplicates: true });

  // Nilai Unggulan
  await prisma.nilaiUnggulan.createMany({ data: [
    { id: 1, title: 'Tahfidz Qur\'an', description: 'Program unggulan hafalan Al-Qur\'an dengan target minimal 3 juz selama 3 tahun.', icon: 'book-open', highlight: true },
    { id: 2, title: 'Sains & Teknologi', description: 'Laboratorium sains dan komputer modern dengan pembelajaran STEM dan robotik.', icon: 'atom', highlight: false },
  ], skipDuplicates: true });

  // Sejarah
  await prisma.sejarah.createMany({ data: [
    { id: 1, year: '1995', title: 'Pendirian Madrasah', description: 'MTs Negeri 2 Kebumen didirikan sebagai Madrasah Tsanawiyah Negeri di Kecamatan Karanganyar.' },
    { id: 2, year: '2000', title: 'Akreditasi A', description: 'Meraih akreditasi A (Unggul) dari BAN-S/M untuk pertama kalinya.' },
  ], skipDuplicates: true });

  // Program Unggulan
  await prisma.programUnggulan.createMany({ data: [
    { id: 1, title: 'Kelas Tahfidz', description: 'Program intensif hafalan Al-Qur\'an dengan target 3 juz. Dibimbing oleh guru hafidz/hafidzah bersanad.', icon: 'book-open' },
    { id: 2, title: 'Kelas Sains Terpadu', description: 'Program penguatan sains dengan metode STEM. Siswa mengikuti olimpiade sains dan penelitian.', icon: 'atom' },
  ], skipDuplicates: true });

  // School Settings
  const settings = [
    { key: 'schoolData', value: JSON.stringify({
      name: 'MTs Negeri 2 Kebumen',
      shortName: 'MTsN 2 Kebumen',
      tagline: 'Madrasah Unggul, Berkarakter, Berprestasi',
      description: 'Madrasah Tsanawiyah Negeri 2 Kebumen adalah lembaga pendidikan Islam negeri yang berkomitmen mencetak generasi unggul.',
      address: 'Jl. Raya Kebumen - Karanganyar Km. 5, Kebumen, Jawa Tengah 54317',
      phone: '(0287) 381234',
      email: 'info@mtsn2kebumen.sch.id',
      website: 'www.mtsn2kebumen.sch.id',
    }) },
    { key: 'kepalaMadrasah', value: JSON.stringify({
      name: 'Dr. H. Ahmad Fauzi, S.Ag., M.Pd.',
      nip: '197008152005011002',
      paragraph1: 'Alhamdulillah, segala puji bagi Allah SWT...',
      paragraph2: 'MTs Negeri 2 Kebumen berkomitmen untuk menjadi lembaga pendidikan yang unggul...',
      paragraph3: 'Melalui website ini, kami berharap masyarakat dapat memperoleh informasi yang lengkap...',
    }) },
    { key: 'visiMisi', value: JSON.stringify({
      visi: 'Terwujudnya generasi Islami yang unggul dalam prestasi, berkarakter mulia...',
      misi: ['Menyelenggarakan pembelajaran yang efektif...', 'Menanamkan nilai-nilai keislaman...'],
      tujuan: ['Menghasilkan lulusan yang beriman...', 'Meraih prestasi akademik...'],
    }) },
  ];

  for (const s of settings) {
    await prisma.schoolSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }

  console.log('Seed selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
