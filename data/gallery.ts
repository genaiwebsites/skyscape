export type GalleryCategory = 'all' | 'coastal' | 'volcanic' | 'estuary' | 'ridges';

export interface CategoryInfo {
  id: GalleryCategory;
  label: string;
  count: number;
}

export interface GalleryFrame {
  id: string;
  t: string;        // title
  l: string;        // location
  img: string;      // local image path
  alt: number;      // altitude in metres
  gps: string;      // GPS coordinates string
  cls: string;      // CSS layout class
  category: GalleryCategory; // category tag
  categoryLabel: string;     // category readable label
  year: string;     // capture year
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', label: 'ALL FRAMES', count: 12 },
  { id: 'coastal', label: 'COASTAL & SEAS', count: 5 },
  { id: 'volcanic', label: 'VOLCANIC & GEOLOGY', count: 2 },
  { id: 'estuary', label: 'RIVERS & ESTUARIES', count: 2 },
  { id: 'ridges', label: 'MOUNTAIN RIDGES', count: 3 },
];

export const F: GalleryFrame[] = [
  {
    id: 'f1',
    t: 'Azure Sea Arch',
    l: 'Nusa Penida, Bali',
    img: '/images/nusa-penida-coastal-arch-skyscape.jpg',
    alt: 184,
    gps: '8.74° S · 115.46° E',
    cls: 's-a',
    category: 'coastal',
    categoryLabel: 'Coastal & Seas',
    year: '2024',
  },
  {
    id: 'f2',
    t: 'Coastal Highway Ribbons',
    l: 'Western Coast, India',
    img: '/images/coastal-highway-drone-photography-skyscape.png',
    alt: 142,
    gps: '14.80° N · 74.12° E',
    cls: 's-b up',
    category: 'coastal',
    categoryLabel: 'Coastal & Seas',
    year: '2023',
  },
  {
    id: 'f3',
    t: 'Misty Valley Topography',
    l: 'Western Ghats, India',
    img: '/images/misty-valley-drone-photography-skyscape.jpg',
    alt: 226,
    gps: '13.20° N · 75.25° E',
    cls: 's-c down',
    category: 'ridges',
    categoryLabel: 'Mountain Ridges',
    year: '2025',
  },
  {
    id: 'f4',
    t: 'Volcanic Crater Cliff',
    l: 'Deccan Traps, Maharashtra',
    img: '/images/volcanic-crater-cliff-skyscape.jpg',
    alt: 194,
    gps: '19.62° N · 73.55° E',
    cls: 's-d',
    category: 'volcanic',
    categoryLabel: 'Volcanic & Geology',
    year: '2023',
  },
  {
    id: 'f5',
    t: 'Gokarna Om Beach Lagoon',
    l: 'Gokarna, Karnataka',
    img: '/images/gokarna-om-beach-drone-skyscape.jpg',
    alt: 128,
    gps: '14.51° N · 74.31° E',
    cls: 's-b up',
    category: 'coastal',
    categoryLabel: 'Coastal & Seas',
    year: '2024',
  },
  {
    id: 'f6',
    t: 'Volcanic Basalt Peak',
    l: 'Deccan Traps, Maharashtra',
    img: '/images/volcanic-peak-aerial-skyscape.jpg',
    alt: 275,
    gps: '19.70° N · 73.80° E',
    cls: 's-a',
    category: 'volcanic',
    categoryLabel: 'Volcanic & Geology',
    year: '2023',
  },
  {
    id: 'f7',
    t: 'High Altitude Ridge',
    l: 'Himalayan Escarpment',
    img: '/images/aerial-ridge-topography-skyscape.jpg',
    alt: 295,
    gps: '32.12° N · 77.40° E',
    cls: 's-c down',
    category: 'ridges',
    categoryLabel: 'Mountain Ridges',
    year: '2025',
  },
  {
    id: 'f8',
    t: 'Braided Estuary Channels',
    l: 'Swarna Estuary, Karnataka',
    img: '/images/river-delta-estuary-aerial-skyscape.jpg',
    alt: 164,
    gps: '13.36° N · 74.78° E',
    cls: 's-b',
    category: 'estuary',
    categoryLabel: 'Rivers & Estuaries',
    year: '2024',
  },
  {
    id: 'f9',
    t: 'Kelingking Coastal Precipice',
    l: 'Nusa Penida, Bali',
    img: '/images/kelingking-beach-nusa-penida-drone-skyscape.jpg',
    alt: 210,
    gps: '8.75° S · 115.44° E',
    cls: 's-d up',
    category: 'coastal',
    categoryLabel: 'Coastal & Seas',
    year: '2024',
  },
  {
    id: 'f10',
    t: 'Emerald Paddy Mosaics',
    l: 'Burdwan, West Bengal',
    img: '/images/burdwan-rice-field-widescreen.jpg',
    alt: 145,
    gps: '23.23° N · 87.86° E',
    cls: 's-a',
    category: 'estuary',
    categoryLabel: 'Rivers & Estuaries',
    year: '2023',
  },
  {
    id: 'f11',
    t: 'Angel\'s Billabong Tidal Pool',
    l: 'Nusa Penida, Bali',
    img: '/images/angels-billabong-nusa-penida-skyscape.png',
    alt: 88,
    gps: '8.73° S · 115.45° E',
    cls: 's-c down',
    category: 'coastal',
    categoryLabel: 'Coastal & Seas',
    year: '2024',
  },
  {
    id: 'f12',
    t: 'Oceanic Surge & Precipice',
    l: 'Nusa Coastal Ridge, Bali',
    img: '/images/ocean-surge-rocky-headland-skyscape.jpg',
    alt: 198,
    gps: '8.76° S · 115.48° E',
    cls: 's-b up',
    category: 'ridges',
    categoryLabel: 'Mountain Ridges',
    year: '2024',
  },
];
