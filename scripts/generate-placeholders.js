const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

function svg(w, h, bg1, bg2, icon, label) {
  const iconSvg = icon
    ? `<g transform="translate(${w/2-24},${h/2-40})">
        <rect x="0" y="0" width="48" height="48" rx="12" fill="rgba(255,255,255,0.2)"/>
        <text x="24" y="32" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial">${icon}</text>
       </g>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${bg2};stop-opacity:1" />
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.08)"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#dots)"/>
  ${iconSvg}
  <text x="${w/2}" y="${h/2+30}" font-size="14" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="Arial, sans-serif" font-weight="300">${label}</text>
</svg>`;
}

const gradients = {
  emerald: ['#059669', '#047857'],
  green: ['#16a34a', '#15803d'],
  teal: ['#0d9488', '#0f766e'],
  blue: ['#2563eb', '#1d4ed8'],
  sky: ['#0284c7', '#0369a1'],
  indigo: ['#4f46e5', '#4338ca'],
  purple: ['#9333ea', '#7e22ce'],
  rose: ['#e11d48', '#be123c'],
  orange: ['#ea580c', '#c2410c'],
  amber: ['#d97706', '#b45309'],
  cyan: ['#0891b2', '#0e7490'],
  slate: ['#475569', '#334155'],
};

const icons = {
  'fasilitas-kelas': ['#059669', '#047857', '&#x1F3E0;', 'Ruang Kelas'],
  'fasilitas-lab': ['#0d9488', '#0f766e', '&#x1F52C;', 'Lab IPA'],
  'fasilitas-komputer': ['#2563eb', '#1d4ed8', '&#x1F4BB;', 'Lab Komputer'],
  'fasilitas-perpus': ['#4f46e5', '#4338ca', '&#x1F4DA;', 'Perpustakaan'],
  'fasilitas-musholla': ['#059669', '#047857', '&#x1F54B;', 'Musholla'],
  'fasilitas-lapangan': ['#16a34a', '#15803d', '&#x26BD;', 'Lapangan'],
};

// Generate fasilitas SVGs
for (const [name, [bg1, bg2, icon, label]] of Object.entries(icons)) {
  fs.writeFileSync(
    path.join(IMAGES_DIR, `${name}.svg`),
    svg(640, 400, bg1, bg2, icon, label)
  );
  console.log(`Created ${name}.svg`);
}

// Generate berita SVGs
const newsColors = ['#0284c7', '#2563eb', '#4f46e5', '#0d9488', '#9333ea', '#d97706'];
const newsIcons = ['&#x1F3C6;', '&#x1F4F0;', '&#x1F514;', '&#x2699;', '&#x26BD;', '&#x1F331;'];
const newsLabels = ['Berita 1', 'Berita 2', 'Berita 3', 'Berita 4', 'Berita 5', 'Berita 6'];

for (let i = 1; i <= 6; i++) {
  const [bg1, bg2] = [newsColors[i-1], newsColors[(i) % newsColors.length]];
  fs.writeFileSync(
    path.join(IMAGES_DIR, `berita-${i}.svg`),
    svg(800, 500, bg1, bg2, newsIcons[i-1], newsLabels[i-1])
  );
  console.log(`Created berita-${i}.svg`);
}

// Generate galeri SVGs
const galColors = ['#059669', '#0d9488', '#4f46e5', '#9333ea', '#e11d48', '#ea580c', '#2563eb', '#0891b2', '#16a34a'];
const galIcons = ['&#x1F3F3;', '&#x1F4BB;', '&#x1F4D6;', '&#x1F54A;', '&#x1F4DA;', '&#x1F3AD;', '&#x26BD;', '&#x1F54B;', '&#x1F52C;'];
const galLabels = ['Upacara', 'Lab Komputer', 'Tahfidz', 'Isra Miraj', 'Perpustakaan', 'Pidato', 'Olahraga', 'Musholla', 'Sains'];

for (let i = 1; i <= 9; i++) {
  const [bg1, bg2] = [galColors[i-1], galColors[(i) % galColors.length]];
  fs.writeFileSync(
    path.join(IMAGES_DIR, `galeri-${i}.svg`),
    svg(640, 480, bg1, bg2, galIcons[i-1], galLabels[i-1])
  );
  console.log(`Created galeri-${i}.svg`);
}

console.log('All placeholder images created!');
