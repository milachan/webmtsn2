// ===== Data Service Layer for MTs Negeri 2 Kebumen =====

export interface Berita {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
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

// ===== Data =====

export const schoolData = {
  name: 'MTs Negeri 2 Kebumen',
  shortName: 'MTsN 2 Kebumen',
  tagline: 'Madrasah Unggul, Berkarakter, Berprestasi',
  description: 'Madrasah Tsanawiyah Negeri 2 Kebumen adalah lembaga pendidikan Islam negeri yang berkomitmen mencetak generasi unggul, berkarakter Islami, dan berprestasi di tingkat nasional maupun internasional.',
  address: 'Jl. Raya Kebumen - Karanganyar Km. 5, Kebumen, Jawa Tengah 54317',
  phone: '(0287) 381234',
  email: 'info@mtsn2kebumen.sch.id',
  website: 'www.mtsn2kebumen.sch.id',
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
  { year: '1995', title: 'Pendirian Madrasah', description: 'MTs Negeri 2 Kebumen didirikan sebagai Madrasah Tsanawiyah Negeri yang berlokasi di Kecamatan Karanganyar, Kabupaten Kebumen.' },
  { year: '2000', title: 'Akreditasi A', description: 'Meraih akreditasi A (Unggul) dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) untuk pertama kalinya.' },
  { year: '2005', title: 'Laboratorium Komputer', description: 'Pembangunan laboratorium komputer modern untuk mendukung pembelajaran TIK dan multimedia.' },
  { year: '2010', title: 'Madrasah Adiwiyata', description: 'Ditetapkan sebagai Madrasah Adiwiyata (sekolah peduli lingkungan) tingkat provinsi Jawa Tengah.' },
  { year: '2015', title: 'Program Unggulan', description: 'Meluncurkan program unggulan Tahfidz Qur\'an dan Kelas Sains Terpadu.' },
  { year: '2018', title: 'Prestasi Nasional', description: 'Siswa-siswi meraih medali emas Olimpiade Sains Nasional (OSN) dan kompetisi keagamaan tingkat nasional.' },
  { year: '2020', title: 'Digital Learning', description: 'Implementasi pembelajaran digital berbasis blended learning dan pengembangan e-learning madrasah.' },
  { year: '2024', title: 'Madrasah Mandiri Berprestasi', description: 'Ditetapkan sebagai Madrasah Mandiri Berprestasi dan pusat pengembangan kurikulum merdeka di wilayah Kedu Selatan.' },
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

export const statistikMadrasah: Statistik[] = [
  { label: 'Siswa Aktif', value: 840, icon: 'users' },
  { label: 'Guru & Tendik', value: 62, icon: 'graduation-cap' },
  { label: 'Ruang Kelas', value: 27, icon: 'building' },
  { label: 'Prestasi (2024)', value: 45, icon: 'trophy' },
  { label: 'Ekstrakurikuler', value: 18, icon: 'star' },
];

export const fasilitas: Fasilitas[] = [
  { id: 1, name: 'Ruang Kelas Ber-AC', description: '27 ruang kelas nyaman dengan pendingin udara, LCD proyektor, dan akses internet', icon: 'building-2', image: '/images/fasilitas-kelas.jpg' },
  { id: 2, name: 'Laboratorium IPA', description: 'Laboratorium Fisika, Kimia, dan Biologi lengkap dengan alat peraga modern', icon: 'flask-conical', image: '/images/fasilitas-lab.jpg' },
  { id: 3, name: 'Laboratorium Komputer', description: '40 unit komputer dengan akses internet broadband untuk pembelajaran TIK', icon: 'monitor', image: '/images/fasilitas-komputer.jpg' },
  { id: 4, name: 'Perpustakaan Digital', description: 'Perpustakaan dengan koleksi 5.000+ buku dan akses e-book serta jurnal online', icon: 'library', image: '/images/fasilitas-perpus.jpg' },
  { id: 5, name: 'Musholla', description: 'Musholla luas dengan kapasitas 500 jamaah untuk ibadah dan kegiatan keagamaan', icon: 'mosque', image: '/images/fasilitas-musholla.jpg' },
  { id: 6, name: 'Lapangan Olahraga', description: 'Lapangan futsal, basket, voli, dan atletik untuk pengembangan bakat olahraga', icon: 'football', image: '/images/fasilitas-lapangan.jpg' },
];

export const beritaTerbaru: Berita[] = [
  { id: 1, title: 'MTsN 2 Kebumen Juara Umum Olimpiade Sains Madrasah Tingkat Kabupaten', excerpt: 'Tim Olimpiade Sains Madrasah Tsanawiyah Negeri 2 Kebumen berhasil meraih juara umum dengan membawa pulang 5 medali emas dan 3 perak.', date: '15 Juli 2026', category: 'Prestasi', image: '/images/berita-1.jpg', slug: 'juara-olimpiade-sains' },
  { id: 2, title: 'Kegiatan Pesantren Kilat Ramadhan 1447 H', excerpt: 'Pesantren kilat diikuti oleh seluruh siswa kelas 7, 8, dan 9 dengan kegiatan tadarus, kajian kitab kuning, dan praktik ibadah.', date: '10 Juli 2026', category: 'Kegiatan', image: '/images/berita-2.jpg', slug: 'pesantren-kilat' },
  { id: 3, title: 'PMB Tahun Ajaran 2026/2027 Resmi Dibuka', excerpt: 'Pendaftaran peserta didik baru MTs Negeri 2 Kebumen dibuka mulai 1 Agustus 2026. Kuota terbatas 280 siswa.', date: '5 Juli 2026', category: 'Pengumuman', image: '/images/berita-3.jpg', slug: 'pmb-dibuka' },
  { id: 4, title: 'Workshop Implementasi Kurikulum Merdeka bagi Guru', excerpt: 'Seluruh guru MTsN 2 Kebumen mengikuti workshop implementasi Kurikulum Merdeka yang diselenggarakan oleh Kemenag Kab. Kebumen.', date: '28 Juni 2026', category: 'Kegiatan', image: '/images/berita-4.jpg', slug: 'workshop-kurikulum-merdeka' },
  { id: 5, title: 'Tim Futsal MTsN 2 Kebumen Wakili Kabupaten ke Tingkat Provinsi', excerpt: 'Setelah menjuarai kompetisi futsal tingkat kabupaten, tim futsal MTsN 2 Kebumen bersiap ke tingkat provinsi Jawa Tengah.', date: '20 Juni 2026', category: 'Prestasi', image: '/images/berita-5.jpg', slug: 'futsal-provinsi' },
  { id: 6, title: 'Kegiatan Bakti Sosial dan Penghijauan Lingkungan', excerpt: 'OSIS MTsN 2 Kebumen mengadakan bakti sosial dan penanaman 100 pohon di area madrasah dan desa sekitar.', date: '15 Juni 2026', category: 'Kegiatan', image: '/images/berita-6.jpg', slug: 'bakti-sosial' },
];

export const galeriFoto: GaleriItem[] = [
  { id: 1, title: 'Upacara Bendera', category: 'Kegiatan', image: '/images/galeri-1.jpg', description: 'Upacara bendera setiap Senin pagi' },
  { id: 2, title: 'Laboratorium Komputer', category: 'Fasilitas', image: '/images/galeri-2.jpg', description: 'Laboratorium komputer modern' },
  { id: 3, title: 'Kegiatan Tahfidz', category: 'Akademik', image: '/images/galeri-3.jpg', description: 'Siswa menghafal Al-Qur\'an' },
  { id: 4, title: 'Peringatan Isra Mi\'raj', category: 'Kegiatan', image: '/images/galeri-4.jpg', description: 'Peringatan Isra Mi\'raj Nabi Muhammad SAW' },
  { id: 5, title: 'Perpustakaan Digital', category: 'Fasilitas', image: '/images/galeri-5.jpg', description: 'Perpustakaan dengan akses digital' },
  { id: 6, title: 'Lomba Pidato Bahasa Arab', category: 'Akademik', image: '/images/galeri-6.jpg', description: 'Lomba pidato bahasa Arab' },
  { id: 7, title: 'Kegiatan Olahraga', category: 'Kegiatan', image: '/images/galeri-7.jpg', description: 'Olahraga bersama di lapangan' },
  { id: 8, title: 'Musholla Madrasah', category: 'Fasilitas', image: '/images/galeri-8.jpg', description: 'Musholla kapasitas 500 jamaah' },
  { id: 9, title: 'Kelas Sains Terpadu', category: 'Akademik', image: '/images/galeri-9.jpg', description: 'Praktikum di laboratorium sains' },
];

export const testimoni: Testimoni[] = [
  { id: 1, name: 'Bapak Supriyono', role: 'Orang Tua Siswa', content: 'Saya sangat bersyukur anak saya bersekolah di MTsN 2 Kebumen. Pendidikan agamanya kuat, prestasi akademiknya bagus, dan lingkungannya sangat mendukung perkembangan anak.', avatar: '' },
  { id: 2, name: 'Ibu Fatimah', role: 'Orang Tua Siswa', content: 'Anak saya mengalami perkembangan yang signifikan sejak masuk MTsN 2 Kebumen. Dari segi hafalan Al-Qur\'an, kedisiplinan, dan prestasi belajarnya sangat memuaskan.', avatar: '' },
  { id: 3, name: 'Ahmad Rizqi', role: 'Alumni 2024', content: 'Pengalaman 3 tahun di MTsN 2 Kebumen sangat berkesan. Saya dibentuk karakter, dibimbing akademik, dan lulus dengan prestasi yang membanggakan. Terima kasih guru-guruku.', avatar: '' },
  { id: 4, name: 'Bapak Dwi Santoso', role: 'Orang Tua Siswa', content: 'Fasilitas di MTsN 2 Kebumen sangat lengkap. Ruang kelas ber-AC, laboratorium modern, dan musholla yang nyaman. Saya merekomendasikan madrasah ini untuk putra-putri Anda.', avatar: '' },
];

export const ekstrakurikuler: Ekstrakurikuler[] = [
  { id: 1, name: 'Pramuka', description: 'Gerakan Pramuka MTsN 2 Kebumen aktif dengan berbagai kegiatan kepramukaan', icon: 'compass', category: 'Wajib' },
  { id: 2, name: 'Tahfidz Qur\'an', description: 'Program intensif hafalan Al-Qur\'an dengan target 3 juz dalam 3 tahun', icon: 'book-open', category: 'Keagamaan' },
  { id: 3, name: 'Paskibra', description: 'Pasukan pengibar bendera yang berlatih kedisiplinan dan baris-berbaris', icon: 'flag', category: 'Kedisiplinan' },
  { id: 4, name: 'Futsal', description: 'Tim futsal madrasah yang berprestasi di tingkat kabupaten dan provinsi', icon: 'football', category: 'Olahraga' },
  { id: 5, name: 'Robotik', description: 'Ekstrakurikuler robotik dan coding untuk mengembangkan keterampilan teknologi', icon: 'bot', category: 'Sains' },
  { id: 6, name: 'Seni Baca Al-Qur\'an', description: 'Pembelajaran seni baca Al-Qur\'an dengan tartil dan berbagai maqamat', icon: 'music', category: 'Keagamaan' },
  { id: 7, name: 'Basket', description: 'Tim basket putra dan putri dengan pelatih profesional', icon: 'target', category: 'Olahraga' },
  { id: 8, name: 'Jurnalistik', description: 'Melatih siswa menulis berita, artikel, dan mengelola majalah dinding madrasah', icon: 'pen-tool', category: 'Seni' },
  { id: 9, name: 'PMR', description: 'Palang Merah Remaja dengan pelatihan pertolongan pertama dan kesehatan', icon: 'heart', category: 'Kesehatan' },
  { id: 10, name: 'Hadroh', description: 'Seni musik Islami hadroh dan marawis', icon: 'music-2', category: 'Keagamaan' },
  { id: 11, name: 'English Club', description: 'Club bahasa Inggris untuk meningkatkan kemampuan komunikasi internasional', icon: 'message-square', category: 'Akademik' },
  { id: 12, name: 'Panahan', description: 'Olahraga panahan yang melatih fokus, konsentrasi, dan kesabaran', icon: 'crosshair', category: 'Olahraga' },
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

export const programUnggulan = [
  { title: 'Kelas Tahfidz', description: 'Program intensif hafalan Al-Qur\'an dengan target 3 juz (kelas 7-9). Dibimbing oleh guru hafidz/hafidzah bersanad. Terintegrasi dengan kurikulum reguler.', icon: 'book-open' },
  { title: 'Kelas Sains Terpadu', description: 'Program penguatan sains dengan metode STEM (Science, Technology, Engineering, Mathematics). Siswa mengikuti olimpiade sains dan penelitian.', icon: 'atom' },
  { title: 'Kelas Bilingual', description: 'Program bilingual (Arab dan Inggris) untuk mata pelajaran tertentu. Mempersiapkan siswa melanjutkan studi di sekolah unggulan dalam/luar negeri.', icon: 'languages' },
  { title: 'Kelas Digital', description: 'Program penguasaan literasi digital, coding, desain grafis, dan multimedia. Dilengkapi laboratorium komputer dan studio multimedia.', icon: 'monitor' },
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
