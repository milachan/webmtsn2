// ===== Data Service Layer for MTs Negeri 2 Kebumen =====

export interface Berita {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  // Field opsional yang tersedia dari portal web berita (via /api/berita-publik)
  content?: string;
  author?: string;
  views?: number;
}

export interface GaleriItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Testimoni {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Fasilitas {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
}

export interface NilaiUnggulan {
  id: number;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

export interface Statistik {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
}

export interface Ekstrakurikuler {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  image: string;
}

export interface Guru {
  id: number;
  name: string;
  position: string;
  subject: string;
  image: string;
}

export interface Pengumuman {
  id: number;
  title: string;
  date: string;
  content: string;
  priority: 'high' | 'normal';
}

export interface Agenda {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface Prestasi {
  id: number;
  tahun: string;
  bidang: string;
  prestasi: string;
  tingkat: string;
}

export interface StrukturPosisi {
  id: number;
  level: string;
  name: string;
  icon: string;
  color: string;
  type: 'kepala' | 'waka' | 'guru';
  image: string;
}

export interface StrukturGuruBidang {
  id: number;
  bidang: string;
  count: string;
}

export interface KurikulumKategori {
  id: number;
  title: string;
  items: string[];
}

export interface ProgramUnggulan {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  active: boolean;
}

export interface SocialLink {
  id: number;
  platform: 'whatsapp' | 'youtube' | 'instagram' | 'tiktok' | 'facebook' | 'telepon';
  label: string;
  url: string;
  icon: string;
  active: boolean;
}

// ===== Data =====

export const defaultStrukturOrganisasi = {
  positions: [
    { id: 1, level: 'Kepala Madrasah', name: 'Dr. H. Ahmad Fauzi, S.Ag., M.Pd.', icon: 'graduation-cap', color: 'from-emerald-600 to-emerald-900', type: 'kepala', image: '' },
    { id: 2, level: 'Waka Kurikulum', name: 'Drs. H. Slamet Riyadi', icon: 'book-open', color: 'from-emerald-500 to-emerald-700', type: 'waka', image: '' },
    { id: 3, level: 'Waka Kesiswaan', name: 'Hj. Siti Nurjanah, S.Pd., M.Pd.', icon: 'users', color: 'from-emerald-500 to-emerald-700', type: 'waka', image: '' },
    { id: 4, level: 'Waka Sarpras', name: 'H. Ali Maksum, S.Pd.I., M.S.I.', icon: 'building-2', color: 'from-emerald-500 to-emerald-700', type: 'waka', image: '' },
    { id: 5, level: 'Waka Humas', name: 'Dra. Hj. Masruroh', icon: 'message-square', color: 'from-emerald-500 to-emerald-700', type: 'waka', image: '' },
  ],
  guruList: [
    { id: 1, bidang: 'Guru Mata Pelajaran', count: '35 Guru' },
    { id: 2, bidang: 'Wali Kelas', count: '27 Guru' },
    { id: 3, bidang: 'Pembina Ekstrakurikuler', count: '18 Pembina' },
    { id: 4, bidang: 'Tenaga Administrasi', count: '8 Tendik' },
    { id: 5, bidang: 'Pustakawan', count: '2 Pustakawan' },
    { id: 6, bidang: 'Laboran', count: '3 Laboran' },
  ],
};

export const defaultKurikulumData: KurikulumKategori[] = [
  { id: 1, title: 'Kurikulum Merdeka', items: ['Pembelajaran berbasis projek (P5RA)', 'Fleksibilitas guru dalam merancang pembelajaran', 'Pengembangan profil pelajar Pancasila dan Rahmatan lil Alamin', 'Asesmen formatif dan sumatif berbasis kompetensi'] },
  { id: 2, title: 'Kekhasan Madrasah', items: ['Al-Qur\'an Hadits', 'Akidah Akhlak', 'Fiqih', 'Sejarah Kebudayaan Islam (SKI)', 'Bahasa Arab'] },
  { id: 3, title: 'Muatan Nasional', items: ['Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'IPA Terpadu', 'IPS Terpadu'] },
  { id: 4, title: 'Muatan Tambahan', items: ['Tahfidz Qur\'an', 'Bahasa Inggris Intensif', 'Kitab Kuning Dasar', 'Praktik Ibadah', 'Keterampilan Digital'] },
];

export const prestasiData: Prestasi[] = [
  { id: 1, tahun: '2024', bidang: 'Olimpiade Sains', prestasi: 'Juara 1 OSN Tingkat Kabupaten', tingkat: 'Kabupaten' },
  { id: 2, tahun: '2024', bidang: 'Olimpiade Sains', prestasi: 'Medali Emas OSN Matematika', tingkat: 'Provinsi' },
  { id: 3, tahun: '2024', bidang: 'Olahraga', prestasi: 'Juara 1 Futsal Tingkat Kabupaten', tingkat: 'Kabupaten' },
  { id: 4, tahun: '2024', bidang: 'Keagamaan', prestasi: 'Juara 1 MHQ Tingkat Provinsi', tingkat: 'Provinsi' },
  { id: 5, tahun: '2024', bidang: 'Seni', prestasi: 'Juara 2 Pidato Bahasa Arab', tingkat: 'Kabupaten' },
  { id: 6, tahun: '2023', bidang: 'Akademik', prestasi: 'Nilai UN Tertinggi se-Kabupaten', tingkat: 'Kabupaten' },
  { id: 7, tahun: '2023', bidang: 'Olahraga', prestasi: 'Juara 3 Basket Putri', tingkat: 'Kabupaten' },
  { id: 8, tahun: '2023', bidang: 'Keagamaan', prestasi: 'Juara Harapan 1 Musabaqah Tilawatil Qur\'an', tingkat: 'Provinsi' },
  { id: 9, tahun: '2023', bidang: 'Sains', prestasi: 'Finalis Olimpiade Sains Nasional', tingkat: 'Nasional' },
  { id: 10, tahun: '2024', bidang: 'Ekstrakurikuler', prestasi: 'Juara 1 Pramuka Tingkat Kabupaten', tingkat: 'Kabupaten' },
  { id: 11, tahun: '2024', bidang: 'Akademik', prestasi: '10 Besar Nilai ASPD Terbaik', tingkat: 'Kabupaten' },
  { id: 12, tahun: '2024', bidang: 'Seni', prestasi: 'Juara 2 Kaligrafi Islam', tingkat: 'Provinsi' },
];

export const defaultHeroSlides: HeroSlide[] = [
  { id: 1, image: '', title: 'Mendidik Generasi Islami Unggul', subtitle: 'Madrasah unggulan di Kebumen yang mencetak generasi beriman, berilmu, berkarakter mulia, dan siap menghadapi tantangan global dengan prestasi gemilang.', active: true },
  { id: 2, image: '', title: 'Berkarakter & Berprestasi', subtitle: 'Membentuk siswa berakhlak mulia, berprestasi akademik dan non-akademik di tingkat kabupaten, provinsi, dan nasional.', active: true },
  { id: 3, image: '', title: 'Madrasah Mandiri Berprestasi', subtitle: 'Menjadi pusat pengembangan kurikulum merdeka dan madrasah percontohan di wilayah Kedu Selatan.', active: true },
];

export const defaultSocialLinks: SocialLink[] = [
  { id: 1, platform: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/6281234567890?text=Assalamualaikum%2C%20saya%20ingin%20bertanya%20tentang%20MTs%20Negeri%202%20Kebumen.', icon: 'message-circle', active: true },
  { id: 2, platform: 'youtube', label: 'YouTube', url: 'https://youtube.com/@mtsn2kebumen', icon: 'film', active: true },
  { id: 3, platform: 'instagram', label: 'Instagram', url: 'https://instagram.com/mtsn2kebumen', icon: 'camera', active: true },
  { id: 4, platform: 'tiktok', label: 'TikTok', url: 'https://tiktok.com/@mtsn2kebumen', icon: 'music-2', active: true },
  { id: 5, platform: 'facebook', label: 'Facebook', url: 'https://facebook.com/mtsn2kebumen', icon: 'bookmark', active: true },
  { id: 6, platform: 'telepon', label: 'Telepon', url: 'tel:+62287381234', icon: 'phone-call', active: true },
];

export const schoolData = {
  name: 'MTs Negeri 2 Kebumen',
  shortName: 'MTsN 2 Kebumen',
  tagline: 'Madrasah Unggul, Berkarakter, Berprestasi',
  description: 'Madrasah Tsanawiyah Negeri 2 Kebumen adalah lembaga pendidikan Islam negeri yang berkomitmen mencetak generasi unggul, berkarakter Islami, dan berprestasi di tingkat nasional maupun internasional.',
  address: 'Jl. Raya Kebumen - Karanganyar Km. 5, Kebumen, Jawa Tengah 54317',
  phone: '(0287) 381234',
  email: 'info@mtsn2kebumen.sch.id',
  website: 'www.mtsn2kebumen.sch.id',
  logo: '', // path ke file logo (kosong = pakai inisial "M" default)
  social: {
    facebook: 'mtsn2kebumen',
    instagram: '@mtsn2kebumen',
    youtube: 'MTsN 2 Kebumen',
    twitter: '@mtsn2kebumen',
  },
  coordinates: {
    lat: -7.682,
    lng: 109.678,
  },
};

export const kepalaMadrasah = {
  image: '',
  name: 'Dr. H. Ahmad Fauzi, S.Ag., M.Pd.',
  nip: '197008152005011002',
  sambutan: `Assalamu'alaikum Warahmatullahi Wabarakatuh,

Alhamdulillah, segala puji bagi Allah SWT yang telah melimpahkan rahmat dan hidayah-Nya kepada kita semua. Shalawat serta salam semoga tercurah kepada Nabi Muhammad SAW, keluarga, dan para sahabatnya.

Selamat datang di website resmi MTs Negeri 2 Kebumen. Website ini hadir sebagai wadah informasi dan komunikasi antara madrasah dengan masyarakat, khususnya orang tua siswa dan stakeholder pendidikan.

MTs Negeri 2 Kebumen berkomitmen untuk menjadi lembaga pendidikan yang unggul dalam prestasi, berkarakter Islami, dan mampu bersaing di era global. Kami terus berupaya meningkatkan kualitas pembelajaran dan pelayanan kepada siswa.

Melalui website ini, kami berharap masyarakat dapat memperoleh informasi yang lengkap dan terkini tentang berbagai kegiatan, program, dan prestasi yang telah diraih oleh siswa-siswi kami.

Kami juga membuka diri terhadap kritik dan saran yang membangun untuk kemajuan madrasah. Mari kita bersama-sama mendidik generasi penerus bangsa yang beriman, bertakwa, dan berprestasi.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.`,
  paragraph1: `Alhamdulillah, segala puji bagi Allah SWT yang telah melimpahkan rahmat dan hidayah-Nya kepada kita semua. Selamat datang di website resmi MTs Negeri 2 Kebumen. Website ini hadir sebagai wadah informasi dan komunikasi antara madrasah dengan masyarakat, khususnya orang tua siswa dan stakeholder pendidikan.`,
  paragraph2: `MTs Negeri 2 Kebumen berkomitmen untuk menjadi lembaga pendidikan yang unggul dalam prestasi, berkarakter Islami, dan mampu bersaing di era global. Kami terus berupaya meningkatkan kualitas pembelajaran dan pelayanan kepada siswa.`,
  paragraph3: `Melalui website ini, kami berharap masyarakat dapat memperoleh informasi yang lengkap dan terkini tentang berbagai kegiatan, program, dan prestasi yang telah diraih oleh siswa-siswi kami. Kami juga membuka diri terhadap kritik dan saran yang membangun untuk kemajuan madrasah.`,
};

export const sejarahMadrasah: TimelineEvent[] = [
  { id: 1, year: '1995', title: 'Pendirian Madrasah', description: 'MTs Negeri 2 Kebumen didirikan sebagai Madrasah Tsanawiyah Negeri yang berlokasi di Kecamatan Karanganyar, Kabupaten Kebumen.' },
  { id: 2, year: '2000', title: 'Akreditasi A', description: 'Meraih akreditasi A (Unggul) dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) untuk pertama kalinya.' },
  { id: 3, year: '2005', title: 'Laboratorium Komputer', description: 'Pembangunan laboratorium komputer modern untuk mendukung pembelajaran TIK dan multimedia.' },
  { id: 4, year: '2010', title: 'Madrasah Adiwiyata', description: 'Ditetapkan sebagai Madrasah Adiwiyata (sekolah peduli lingkungan) tingkat provinsi Jawa Tengah.' },
  { id: 5, year: '2015', title: 'Program Unggulan', description: 'Meluncurkan program unggulan Tahfidz Qur\'an dan Kelas Sains Terpadu.' },
  { id: 6, year: '2018', title: 'Prestasi Nasional', description: 'Siswa-siswi meraih medali emas Olimpiade Sains Nasional (OSN) dan kompetisi keagamaan tingkat nasional.' },
  { id: 7, year: '2020', title: 'Digital Learning', description: 'Implementasi pembelajaran digital berbasis blended learning dan pengembangan e-learning madrasah.' },
  { id: 8, year: '2024', title: 'Madrasah Mandiri Berprestasi', description: 'Ditetapkan sebagai Madrasah Mandiri Berprestasi dan pusat pengembangan kurikulum merdeka di wilayah Kedu Selatan.' },
];

export const visiMisi = {
  visi: 'Terwujudnya generasi Islami yang unggul dalam prestasi, berkarakter mulia, berwawasan lingkungan, dan siap menghadapi tantangan global.',
  misi: [
    'Menyelenggarakan pembelajaran yang efektif, inovatif, dan berbasis teknologi untuk mencapai prestasi akademik dan non-akademik',
    'Menanamkan nilai-nilai keislaman yang moderat dan akhlakul karimah dalam setiap aspek kehidupan madrasah',
    'Mengembangkan potensi siswa secara holistik melalui program ekstrakurikuler dan pengembangan bakat minat',
    'Membangun budaya literasi, numerasi, dan karakter melalui pembiasaan positif dan keteladanan',
    'Mewujudkan madrasah yang peduli dan berbudaya lingkungan (Adiwiyata)',
    'Menjalin kemitraan yang harmonis dengan orang tua, masyarakat, dan stakeholder pendidikan',
  ],
  tujuan: [
    'Menghasilkan lulusan yang beriman, bertakwa, dan berakhlak mulia',
    'Meraih prestasi akademik dan non-akademik di tingkat kabupaten, provinsi, dan nasional',
    'Membentuk siswa yang memiliki jiwa kepemimpinan, kreativitas, dan kemandirian',
    'Menciptakan lingkungan madrasah yang bersih, hijau, dan nyaman untuk pembelajaran',
  ],
};

export const nilaiUnggulan: NilaiUnggulan[] = [
  {
    id: 1,
    title: 'Tahfidz Qur\'an',
    description: 'Program unggulan hafalan Al-Qur\'an dengan target minimal 3 juz selama 3 tahun, dibimbing oleh guru bersanad.',
    icon: 'book-open',
    highlight: true,
  },
  {
    id: 2,
    title: 'Sains & Teknologi',
    description: 'Laboratorium sains dan komputer modern dengan pembelajaran STEM dan robotik.',
    icon: 'atom',
  },
  {
    id: 3,
    title: 'Bahasa Asing',
    description: 'Program bilingual (Arab-Inggris) untuk membekali siswa dengan kemampuan komunikasi global.',
    icon: 'languages',
  },
  {
    id: 4,
    title: 'Adiwiyata',
    description: 'Madrasah peduli lingkungan dengan program penghijauan, bank sampah, dan energi terbarukan.',
    icon: 'leaf',
  },
];

// ===== PMB Settings =====
export interface PmbSettings {
  mode: 'internal' | 'redirect';
  redirectUrl: string;
  title: string;
  description: string;
  badgeText: string;
  infoCards: { icon: string; label: string; value: string }[];
  steps: { number: number; title: string; description: string }[];
  requirements: string[];
  contactTitle: string;
  contactDescription: string;
  contacts: { icon: string; label: string; value: string }[];
  ctaText: string;
}

export const defaultPmbSettings: PmbSettings = {
  mode: 'internal',
  redirectUrl: 'https://pmb.mtsnegeri2kebumen.sch.id',
  title: 'PMB MTs Negeri 2 Kebumen',
  description: 'Pendaftaran Peserta Didik Baru. Daftarkan putra-putri Anda menjadi bagian dari keluarga besar MTsN 2 Kebumen.',
  badgeText: 'Tahun Ajaran 2026/2027',
  infoCards: [
    { icon: 'calendar', label: 'Pendaftaran', value: '1-31 Agustus 2026' },
    { icon: 'users', label: 'Kuota', value: '280 Siswa' },
    { icon: 'graduation-cap', label: 'Biaya Pendaftaran', value: 'Gratis (Rp 0)' },
  ],
  steps: [
    { number: 1, title: 'Registrasi Online', description: 'Daftar melalui website resmi atau datang langsung ke madrasah' },
    { number: 2, title: 'Verifikasi Berkas', description: 'Serahkan berkas persyaratan untuk diverifikasi oleh panitia' },
    { number: 3, title: 'Tes Seleksi', description: 'Ikuti tes akademik dan wawancara yang telah dijadwalkan' },
    { number: 4, title: 'Pengumuman', description: 'Hasil seleksi diumumkan melalui website dan papan pengumuman' },
    { number: 5, title: 'Daftar Ulang', description: 'Lakukan daftar ulang dan pembayaran administrasi' },
  ],
  requirements: [
    'Fotokopi Akta Kelahiran (2 lembar)',
    'Fotokopi Kartu Keluarga (2 lembar)',
    'Pas foto 3x4 (4 lembar, background merah)',
    'Fotokopi Raport SD/MI semester 1-5',
    'Surat Keterangan Dokter',
    'Mengisi formulir pendaftaran',
  ],
  contactTitle: 'Hubungi Panitia PMB',
  contactDescription: 'Jika ada pertanyaan seputar pendaftaran, silakan hubungi panitia PMB melalui kontak di bawah ini:',
  contacts: [
    { icon: 'phone', label: 'Telepon', value: '(0287) 381234' },
    { icon: 'mail', label: 'Email', value: 'pmb@mtsn2kebumen.sch.id' },
    { icon: 'map-pin', label: 'Alamat', value: 'Kantor MTsN 2 Kebumen (Ruang Panitia PMB)' },
  ],
  ctaText: 'Daftar Sekarang',
};

export const statistikMadrasah: Statistik[] = [
  { label: 'Siswa Aktif', value: 840, suffix: '+', icon: 'users' },
  { label: 'Guru & Tendik', value: 62, icon: 'graduation-cap' },
  { label: 'Ekstrakurikuler', value: 18, icon: 'compass' },
  { label: 'Prestasi (2024)', value: 45, suffix: '+', icon: 'trophy' },
  { label: 'Ruang Kelas', value: 27, icon: 'building' },
];

export const fasilitas: Fasilitas[] = [
  { id: 1, name: 'Ruang Kelas Ber-AC', description: '27 ruang kelas nyaman dengan pendingin udara, LCD proyektor, dan akses internet', icon: 'building-2', image: '/images/fasilitas-kelas.svg' },
  { id: 2, name: 'Laboratorium IPA', description: 'Laboratorium Fisika, Kimia, dan Biologi lengkap dengan alat peraga modern', icon: 'flask-conical', image: '/images/fasilitas-lab.svg' },
  { id: 3, name: 'Laboratorium Komputer', description: '40 unit komputer dengan akses internet broadband untuk pembelajaran TIK', icon: 'monitor', image: '/images/fasilitas-komputer.svg' },
  { id: 4, name: 'Perpustakaan Digital', description: 'Perpustakaan dengan koleksi 5.000+ buku dan akses e-book serta jurnal online', icon: 'library', image: '/images/fasilitas-perpus.svg' },
  { id: 5, name: 'Musholla', description: 'Musholla luas dengan kapasitas 500 jamaah untuk ibadah dan kegiatan keagamaan', icon: 'mosque', image: '/images/fasilitas-musholla.svg' },
  { id: 6, name: 'Lapangan Olahraga', description: 'Lapangan futsal, basket, voli, dan atletik untuk pengembangan bakat olahraga', icon: 'football', image: '/images/fasilitas-lapangan.svg' },
];

export const beritaTerbaru: Berita[] = [
  { id: 1, title: 'MTsN 2 Kebumen Juara Umum Olimpiade Sains Madrasah Tingkat Kabupaten', excerpt: 'Tim Olimpiade Sains Madrasah Tsanawiyah Negeri 2 Kebumen berhasil meraih juara umum dengan membawa pulang 5 medali emas dan 3 perak.', date: '15 Juli 2026', category: 'Prestasi', image: '/images/berita-1.svg', slug: 'juara-olimpiade-sains' },
  { id: 2, title: 'Kegiatan Pesantren Kilat Ramadhan 1447 H', excerpt: 'Pesantren kilat diikuti oleh seluruh siswa kelas 7, 8, dan 9 dengan kegiatan tadarus, kajian kitab kuning, dan praktik ibadah.', date: '10 Juli 2026', category: 'Kegiatan', image: '/images/berita-2.svg', slug: 'pesantren-kilat' },
  { id: 3, title: 'PMB Tahun Ajaran 2026/2027 Resmi Dibuka', excerpt: 'Pendaftaran peserta didik baru MTs Negeri 2 Kebumen dibuka mulai 1 Agustus 2026. Kuota terbatas 280 siswa.', date: '5 Juli 2026', category: 'Pengumuman', image: '/images/berita-3.svg', slug: 'pmb-dibuka' },
  { id: 4, title: 'Workshop Implementasi Kurikulum Merdeka bagi Guru', excerpt: 'Seluruh guru MTsN 2 Kebumen mengikuti workshop implementasi Kurikulum Merdeka yang diselenggarakan oleh Kemenag Kab. Kebumen.', date: '28 Juni 2026', category: 'Kegiatan', image: '/images/berita-4.svg', slug: 'workshop-kurikulum-merdeka' },
  { id: 5, title: 'Tim Futsal MTsN 2 Kebumen Wakili Kabupaten ke Tingkat Provinsi', excerpt: 'Setelah menjuarai kompetisi futsal tingkat kabupaten, tim futsal MTsN 2 Kebumen bersiap ke tingkat provinsi Jawa Tengah.', date: '20 Juni 2026', category: 'Prestasi', image: '/images/berita-5.svg', slug: 'futsal-provinsi' },
  { id: 6, title: 'Kegiatan Bakti Sosial dan Penghijauan Lingkungan', excerpt: 'OSIS MTsN 2 Kebumen mengadakan bakti sosial dan penanaman 100 pohon di area madrasah dan desa sekitar.', date: '15 Juni 2026', category: 'Kegiatan', image: '/images/berita-6.svg', slug: 'bakti-sosial' },
];

export const galeriFoto: GaleriItem[] = [
  { id: 1, title: 'Upacara Bendera', category: 'Kegiatan', image: '/images/galeri-1.svg', description: 'Upacara bendera setiap Senin pagi' },
  { id: 2, title: 'Laboratorium Komputer', category: 'Fasilitas', image: '/images/galeri-2.svg', description: 'Laboratorium komputer modern' },
  { id: 3, title: 'Kegiatan Tahfidz', category: 'Akademik', image: '/images/galeri-3.svg', description: 'Siswa menghafal Al-Qur\'an' },
  { id: 4, title: 'Peringatan Isra Mi\'raj', category: 'Kegiatan', image: '/images/galeri-4.svg', description: 'Peringatan Isra Mi\'raj Nabi Muhammad SAW' },
  { id: 5, title: 'Perpustakaan Digital', category: 'Fasilitas', image: '/images/galeri-5.svg', description: 'Perpustakaan dengan akses digital' },
  { id: 6, title: 'Lomba Pidato Bahasa Arab', category: 'Akademik', image: '/images/galeri-6.svg', description: 'Lomba pidato bahasa Arab' },
  { id: 7, title: 'Kegiatan Olahraga', category: 'Kegiatan', image: '/images/galeri-7.svg', description: 'Olahraga bersama di lapangan' },
  { id: 8, title: 'Musholla Madrasah', category: 'Fasilitas', image: '/images/galeri-8.svg', description: 'Musholla kapasitas 500 jamaah' },
  { id: 9, title: 'Kelas Sains Terpadu', category: 'Akademik', image: '/images/galeri-9.svg', description: 'Praktikum di laboratorium sains' },
];

export const testimoni: Testimoni[] = [
  { id: 1, name: 'Bapak Supriyono', role: 'Orang Tua Siswa', content: 'Saya sangat bersyukur anak saya bersekolah di MTsN 2 Kebumen. Pendidikan agamanya kuat, prestasi akademiknya bagus, dan lingkungannya sangat mendukung perkembangan anak.', avatar: '' },
  { id: 2, name: 'Ibu Fatimah', role: 'Orang Tua Siswa', content: 'Anak saya mengalami perkembangan yang signifikan sejak masuk MTsN 2 Kebumen. Dari segi hafalan Al-Qur\'an, kedisiplinan, dan prestasi belajarnya sangat memuaskan.', avatar: '' },
  { id: 3, name: 'Ahmad Rizqi', role: 'Alumni 2024', content: 'Pengalaman 3 tahun di MTsN 2 Kebumen sangat berkesan. Saya dibentuk karakter, dibimbing akademik, dan lulus dengan prestasi yang membanggakan. Terima kasih guru-guruku.', avatar: '' },
  { id: 4, name: 'Bapak Dwi Santoso', role: 'Orang Tua Siswa', content: 'Fasilitas di MTsN 2 Kebumen sangat lengkap. Ruang kelas ber-AC, laboratorium modern, dan musholla yang nyaman. Saya merekomendasikan madrasah ini untuk putra-putri Anda.', avatar: '' },
];

export const ekstrakurikuler: Ekstrakurikuler[] = [
  { id: 1, name: 'Pramuka', description: 'Gerakan Pramuka MTsN 2 Kebumen aktif dengan berbagai kegiatan kepramukaan', icon: 'compass', category: 'Wajib', image: '' },
  { id: 2, name: 'Tahfidz Qur\'an', description: 'Program intensif hafalan Al-Qur\'an dengan target 3 juz dalam 3 tahun', icon: 'book-open', category: 'Keagamaan', image: '' },
  { id: 3, name: 'Paskibra', description: 'Pasukan pengibar bendera yang berlatih kedisiplinan dan baris-berbaris', icon: 'flag', category: 'Kedisiplinan', image: '' },
  { id: 4, name: 'Futsal', description: 'Tim futsal madrasah yang berprestasi di tingkat kabupaten dan provinsi', icon: 'football', category: 'Olahraga', image: '' },
  { id: 5, name: 'Robotik', description: 'Ekstrakurikuler robotik dan coding untuk mengembangkan keterampilan teknologi', icon: 'bot', category: 'Sains', image: '' },
  { id: 6, name: 'Seni Baca Al-Qur\'an', description: 'Pembelajaran seni baca Al-Qur\'an dengan tartil dan berbagai maqamat', icon: 'music', category: 'Keagamaan', image: '' },
  { id: 7, name: 'Basket', description: 'Tim basket putra dan putri dengan pelatih profesional', icon: 'target', category: 'Olahraga', image: '' },
  { id: 8, name: 'Jurnalistik', description: 'Melatih siswa menulis berita, artikel, dan mengelola majalah dinding madrasah', icon: 'pen-tool', category: 'Seni', image: '' },
  { id: 9, name: 'PMR', description: 'Palang Merah Remaja dengan pelatihan pertolongan pertama dan kesehatan', icon: 'heart', category: 'Kesehatan', image: '' },
  { id: 10, name: 'Hadroh', description: 'Seni musik Islami hadroh dan marawis', icon: 'music-2', category: 'Keagamaan', image: '' },
  { id: 11, name: 'English Club', description: 'Club bahasa Inggris untuk meningkatkan kemampuan komunikasi internasional', icon: 'message-square', category: 'Akademik', image: '' },
  { id: 12, name: 'Panahan', description: 'Olahraga panahan yang melatih fokus, konsentrasi, dan kesabaran', icon: 'crosshair', category: 'Olahraga', image: '' },
];

export const guruTendik: Guru[] = [
  { id: 1, name: 'Dr. H. Ahmad Fauzi, S.Ag., M.Pd.', position: 'Kepala Madrasah', subject: '-', image: '' },
  { id: 2, name: 'Drs. H. Slamet Riyadi', position: 'Waka Kurikulum', subject: 'Matematika', image: '' },
  { id: 3, name: 'Hj. Siti Nurjanah, S.Pd., M.Pd.', position: 'Waka Kesiswaan', subject: 'Bahasa Indonesia', image: '' },
  { id: 4, name: 'H. Ali Maksum, S.Pd.I., M.S.I.', position: 'Waka Sarpras', subject: 'Al-Qur\'an Hadits', image: '' },
  { id: 5, name: 'Dra. Hj. Masruroh', position: 'Waka Humas', subject: 'Akidah Akhlak', image: '' },
  { id: 6, name: 'Muhammad Syaifuddin, S.Pd.', position: 'Guru Mapel', subject: 'IPA Terpadu', image: '' },
  { id: 7, name: 'Rina Wulandari, S.Si.', position: 'Guru Mapel', subject: 'Matematika', image: '' },
  { id: 8, name: 'Ahmad Fadloli, S.Pd.I.', position: 'Guru Mapel', subject: 'Fiqih', image: '' },
  { id: 9, name: 'Lilis Suryani, S.Pd.', position: 'Guru Mapel', subject: 'Bahasa Inggris', image: '' },
  { id: 10, name: 'Nur Hidayat, S.Kom.', position: 'Guru Mapel', subject: 'TIK', image: '' },
  { id: 11, name: 'Dwi Rahayu, S.Pd.', position: 'Guru Mapel', subject: 'Bahasa Jawa', image: '' },
  { id: 12, name: 'M. Khairul Anam, S.Pd.', position: 'Guru Mapel', subject: 'Penjasorkes', image: '' },
];

export const pengumuman: Pengumuman[] = [
  { id: 1, title: 'PMB Tahun Ajaran 2026/2027 Dibuka', date: '1 Agustus 2026', content: 'Pendaftaran peserta didik baru MTs Negeri 2 Kebumen dibuka mulai 1 Agustus 2026. Kuota terbatas 280 siswa. Segera daftarkan putra-putri Anda.', priority: 'high' },
  { id: 2, title: 'Pembagian Raport Semester Genap', date: '20 Juni 2026', content: 'Pembagian raport semester genap TA 2025/2026 akan dilaksanakan pada hari Sabtu, 20 Juni 2026, pukul 08.00 WIB di aula madrasah.', priority: 'high' },
  { id: 3, title: 'Libur Akhir Tahun Pelajaran', date: '24 Juni 2026', content: 'Libur akhir tahun pelajaran dimulai tanggal 24 Juni - 14 Juli 2026. Kegiatan pembelajaran baru dimulai kembali pada 15 Juli 2026.', priority: 'normal' },
  { id: 4, title: 'Pesantren Kilat Ramadhan', date: '10 Maret 2026', content: 'Kegiatan pesantren kilat Ramadhan 1447 H akan dilaksanakan pada minggu pertama Ramadhan. Diwajibkan bagi seluruh siswa.', priority: 'high' },
  { id: 5, title: 'Rapat Komite Madrasah', date: '5 Februari 2026', content: 'Rapat Komite Madrasah akan dilaksanakan pada hari Sabtu, 5 Februari 2026, pukul 09.00 WIB. Diundang seluruh anggota komite.', priority: 'normal' },
];

export const agenda: Agenda[] = [
  { id: 1, title: 'Upacara Hari Pendidikan Nasional', date: '2 Mei 2026', time: '07.00 - 09.00 WIB', location: 'Lapangan Madrasah', description: 'Upacara peringatan Hardiknas dengan busana adat' },
  { id: 2, title: 'Ujian Akhir Semester Genap', date: '5-12 Juni 2026', time: '07.30 - 12.00 WIB', location: 'Ruang Kelas', description: 'Penilaian akhir tahun pelajaran 2025/2026' },
  { id: 3, title: 'Peringatan Isra Mi\'raj', date: '15 Februari 2026', time: '07.30 - 11.00 WIB', location: 'Aula Madrasah', description: 'Peringatan Isra Mi\'raj dengan pengajian akbar' },
  { id: 4, title: 'Class Meeting', date: '17-20 Juni 2026', time: '08.00 - 13.00 WIB', location: 'Lapangan & Aula', description: 'Lomba antar kelas setelah ujian akhir' },
  { id: 5, title: 'Masa Ta\'aruf Siswa Baru (MATSAMA)', date: '15-17 Juli 2026', time: '07.00 - 14.00 WIB', location: 'Madrasah', description: 'Pengenalan lingkungan madrasah bagi siswa baru kelas 7' },
];

export const tataTertib = {
  pendahuluan: 'Tata tertib ini dibuat sebagai pedoman bagi seluruh siswa MTs Negeri 2 Kebumen dalam bersikap, berperilaku, dan melaksanakan aktivitas di lingkungan madrasah.',
  aturan: [
    { kategori: 'Kehadiran', items: ['Siswa hadir di madrasah paling lambat pukul 07.00 WIB', 'Keterlambatan lebih dari 15 menit dicatat dan mendapat pembinaan', 'Ketidakhadiran wajib disertai surat izin/keterangan', 'Siswa wajib mengikuti seluruh jam pelajaran sesuai jadwal'] },
    { kategori: 'Kerapian & Pakaian', items: ['Mengenakan seragam madrasah sesuai ketentuan setiap hari', 'Seragam olahraga hanya dipakai saat jam olahraga', 'Rambut rapih dan tidak dicat (untuk putra tidak melebihi kerah)', 'Sepatu hitam dan kaos kaki putih polos', 'Tidak memakai perhiasan berlebihan'] },
    { kategori: 'Sikap & Perilaku', items: ['Menghormati guru, karyawan, dan sesama siswa', 'Berkata sopan dan tidak menggunakan kata-kata kasar', 'Dilarang membawa rokok, narkoba, minuman keras', 'Dilarang membawa senjata tajam/tajam', 'Dilarang berkelahi dan melakukan tindakan bullying', 'Dilarang membawa handphone saat jam pelajaran (kecuali izin guru)'] },
    { kategori: 'Kebersihan & Ketertiban', items: ['Membuang sampah pada tempat yang disediakan', 'Melaksanakan piket kelas sesuai jadwal', 'Merawat dan menjaga fasilitas madrasah', 'Tidak mencorat-coret tembok, meja, dan fasilitas lainnya'] },
  ],
  sanksi: 'Pelanggaran terhadap tata tertib akan dikenakan sanksi bertahap mulai dari teguran lisan, teguran tertulis, panggilan orang tua, hingga skorsing atau dikembalikan kepada orang tua sesuai tingkat pelanggaran.',
};

export const programUnggulan: ProgramUnggulan[] = [
  { id: 1, title: 'Kelas Tahfidz', description: 'Program intensif hafalan Al-Qur\'an dengan target 3 juz (kelas 7-9). Dibimbing oleh guru hafidz/hafidzah bersanad. Terintegrasi dengan kurikulum reguler.', icon: 'book-open' },
  { id: 2, title: 'Kelas Sains Terpadu', description: 'Program penguatan sains dengan metode STEM (Science, Technology, Engineering, Mathematics). Siswa mengikuti olimpiade sains dan penelitian.', icon: 'atom' },
  { id: 3, title: 'Kelas Bilingual', description: 'Program bilingual (Arab dan Inggris) untuk mata pelajaran tertentu. Mempersiapkan siswa melanjutkan studi di sekolah unggulan dalam/luar negeri.', icon: 'languages' },
  { id: 4, title: 'Kelas Digital', description: 'Program penguasaan literasi digital, coding, desain grafis, dan multimedia. Dilengkapi laboratorium komputer dan studio multimedia.', icon: 'monitor' },
];

export interface Pembiasaan {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  schedule: string;
}

export interface DokumenDownload {
  id: number;
  title: string;
  description: string;
  icon: string;
  fileUrl: string;
  fileSize: string;
  category: string;
}

export const pembiasaan: Pembiasaan[] = [
  { id: 1, name: 'Sholat Dhuha', description: 'Pembiasaan sholat sunnah Dhuha berjamaah setiap pagi sebelum memulai pembelajaran.', icon: 'sun', category: 'Ibadah', schedule: 'Setiap hari, 06.30 - 07.00 WIB' },
  { id: 2, name: 'Tadarus Al-Qur\'an', description: 'Membaca Al-Qur\'an bersama-sama selama 15 menit sebelum bel masuk kelas.', icon: 'book-open', category: 'Keagamaan', schedule: 'Setiap hari, 07.00 - 07.15 WIB' },
  { id: 3, name: 'Upacara Bendera', description: 'Upacara bendera setiap hari Senin untuk menumbuhkan jiwa nasionalisme dan kedisiplinan.', icon: 'flag', category: 'Kedisiplinan', schedule: 'Setiap Senin, 07.00 - 07.45 WIB' },
  { id: 4, name: 'Literasi Pagi', description: 'Membaca buku non-fiksi dan fiksi selama 15 menit untuk membangun budaya literasi.', icon: 'book-open', category: 'Akademik', schedule: 'Setiap hari, 07.15 - 07.30 WIB' },
  { id: 5, name: 'Jumat Bersih', description: 'Gotong royong membersihkan lingkungan madrasah setiap hari Jumat.', icon: 'leaf', category: 'Lingkungan', schedule: 'Setiap Jumat, 07.00 - 07.30 WIB' },
  { id: 6, name: 'Jumat Sehat', description: 'Senam pagi bersama dan jalan sehat untuk menjaga kebugaran jasmani.', icon: 'heart', category: 'Kesehatan', schedule: 'Jumat minggu ke-2 & ke-4, 07.00 - 08.00 WIB' },
  { id: 7, name: 'Infaq Jumat', description: 'Pembiasaan berinfaq setiap hari Jumat untuk melatih kepedulian sosial.', icon: 'heart', category: 'Keagamaan', schedule: 'Setiap Jumat, saat literasi pagi' },
  { id: 8, name: 'Kultum Siswa', description: 'Kuliah tujuh menit yang disampaikan oleh siswa secara bergiliran.', icon: 'message-square', category: 'Keagamaan', schedule: 'Setelah sholat Dhuha' },
  { id: 9, name: 'Piket Kelas', description: 'Pembiasaan tanggung jawab melalui jadwal piket kebersihan kelas.', icon: 'building-2', category: 'Kedisiplinan', schedule: 'Setiap hari sesuai jadwal' },
  { id: 10, name: 'Asmaul Husna', description: 'Membaca dan menghafal Asmaul Husna bersama-sama sebelum pembelajaran.', icon: 'star', category: 'Keagamaan', schedule: 'Setiap hari, 07.00 - 07.10 WIB' },
];

export const dokumenDownload: DokumenDownload[] = [
  { id: 1, title: 'Buku Pedoman Akademik', description: 'Panduan lengkap sistem akademik dan kurikulum madrasah', icon: 'book-open', fileUrl: '/downloads/pedoman-akademik.pdf', fileSize: '2.4 MB', category: 'Akademik' },
  { id: 2, title: 'Kalender Akademik 2025/2026', description: 'Kalender pendidikan tahun ajaran 2025/2026', icon: 'calendar', fileUrl: '/downloads/kalender-akademik-2025-2026.pdf', fileSize: '1.1 MB', category: 'Akademik' },
  { id: 3, title: 'Buku Tata Tertib Siswa', description: 'Peraturan dan tata tertib yang berlaku bagi seluruh siswa', icon: 'book-open', fileUrl: '/downloads/tata-tertib-siswa.pdf', fileSize: '1.8 MB', category: 'Kesiswaan' },
  { id: 4, title: 'Formulir Pendaftaran PMB', description: 'Formulir pendaftaran peserta didik baru', icon: 'pen-tool', fileUrl: '/downloads/formulir-pmb.pdf', fileSize: '520 KB', category: 'Pendaftaran' },
  { id: 5, title: 'Brosur Penerimaan Siswa Baru', description: 'Informasi lengkap penerimaan siswa baru MTsN 2 Kebumen', icon: 'image', fileUrl: '/downloads/brosur-pmb.pdf', fileSize: '3.2 MB', category: 'Pendaftaran' },
  { id: 6, title: 'Juknis Ekstrakurikuler', description: 'Petunjuk teknis pelaksanaan kegiatan ekstrakurikuler', icon: 'star', fileUrl: '/downloads/juknis-ekstrakurikuler.pdf', fileSize: '1.5 MB', category: 'Kesiswaan' },
  { id: 7, title: 'Prosedur Izin Siswa', description: 'Tata cara pengajuan izin tidak masuk madrasah', icon: 'info', fileUrl: '/downloads/prosedur-izin.pdf', fileSize: '340 KB', category: 'Kesiswaan' },
  { id: 8, title: 'Surat Keterangan Aktif', description: 'Format surat keterangan aktif sebagai siswa', icon: 'file-text', fileUrl: '/downloads/surat-aktif.pdf', fileSize: '280 KB', category: 'Administrasi' },
];

// Helper function to get placeholder gradient color based on id
export function getGradientColor(id: number): string {
  const gradients = [
    'from-emerald-500 to-emerald-700',
    'from-green-500 to-green-700',
    'from-teal-500 to-teal-700',
    'from-emerald-400 to-green-600',
    'from-green-600 to-emerald-800',
    'from-teal-400 to-emerald-600',
    'from-emerald-500 to-teal-700',
    'from-green-400 to-green-700',
  ];
  return gradients[id % gradients.length];
}
