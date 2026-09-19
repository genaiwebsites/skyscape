export type GalleryCategory = 'all' | 'coastal' | 'nature' | 'estuary' | 'urban' | 'ridges';
export type PhotoOrientation = 'landscape' | 'portrait';

export interface CategoryInfo {
  id: GalleryCategory;
  label: string;
  count: number;
}

export interface GalleryFrame {
  id: string;
  t: string;        // Shortened, punchy title
  l: string;        // location
  img: string;      // local image path in categorized folder
  alt: number;      // altitude in metres
  gps: string;      // GPS coordinates string
  cls: string;      // CSS layout class
  category: GalleryCategory; // category tag
  categoryLabel: string;     // category readable label
  year: string;     // capture year
  sensor?: string;  // aircraft and camera sensor
  orientation: PhotoOrientation; // Strictly 'landscape' or 'portrait'
}

export const F: GalleryFrame[] = [
  // ── COASTAL (8 unique landscapes) ──
  {
    id: 'f-c1',
    t: 'Azure Sea Arch',
    l: 'Nusa Penida, Bali',
    img: '/images/gallery/coastal/nusa-penida-coastal-arch-skyscape.jpg',
    alt: 184,
    gps: '8.74° S · 115.46° E',
    cls: 's-a',
    category: 'coastal',
    categoryLabel: 'Coastal',
    year: '2024',
    sensor: 'DJI AIR 2S · 1" CMOS · 20MP',
    orientation: 'landscape',
  },
  {
    id: 'f-c2',
    t: "Angel's Billabong",
    l: 'Nusa Penida, Bali',
    img: '/images/gallery/coastal/angels-billabong-nusa-penida-skyscape.png',
    alt: 88,
    gps: '8.73° S · 115.45° E',
    cls: 's-b up',
    category: 'coastal',
    categoryLabel: 'Coastal',
    year: '2024',
    sensor: 'DJI AIR 2S · 1" CMOS · 20MP',
    orientation: 'landscape',
  },
  {
    id: 'f-c3',
    t: 'Trasi Coastline',
    l: 'Kundapura, Karnataka',
    img: '/images/gallery/coastal/trasi-maravanthe-coastal-horizon.jpg',
    alt: 278,
    gps: '13.70° N · 74.63° E',
    cls: 's-c',
    category: 'coastal',
    categoryLabel: 'Coastal',
    year: '2021',
    sensor: 'DJI MAVIC 2 PRO · 1" CMOS · 20MP',
    orientation: 'portrait',
  },
  {
    id: 'f-c4',
    t: 'Malpe Sea Walk',
    l: 'Malpe Beach, Karnataka',
    img: '/images/gallery/coastal/malpe-sea-walk-breakwater-udupi.jpg',
    alt: 75,
    gps: '13.33° N · 74.68° E',
    cls: 's-d up',
    category: 'coastal',
    categoryLabel: 'Coastal',
    year: '2018',
    sensor: 'DJI MAVIC 2 PRO · 1" CMOS · 20MP',
    orientation: 'portrait',
  },
  {
    id: 'f-c5',
    t: 'Malpe Ocean Swell',
    l: 'Malpe Coast, Karnataka',
    img: '/images/gallery/coastal/malpe-cerulean-ocean-swell.jpg',
    alt: 96,
    gps: '13.33° N · 74.68° E',
    cls: 's-a',
    category: 'coastal',
    categoryLabel: 'Coastal',
    year: '2018',
    sensor: 'DJI MAVIC 2 PRO · 1" CMOS · 20MP',
    orientation: 'portrait',
  },
  {
    id: 'f-c6',
    t: 'Kapu Promontory',
    l: 'Kapu Beach, Karnataka',
    img: '/images/gallery/coastal/kapu-beach-rocky-headland-promontory.jpg',
    alt: 120,
    gps: '13.22° N · 74.74° E',
    cls: 's-b up',
    category: 'coastal',
    categoryLabel: 'Coastal',
    year: '2018',
    sensor: 'DJI MAVIC 2 PRO · 1" CMOS · 20MP',
    orientation: 'portrait',
  },
  {
    id: 'f-c7',
    t: 'Penida Azure Surge',
    l: 'Nusa Penida, Bali',
    img: '/images/gallery/coastal/nusa-penida-azure-coastal-surge.jpg',
    alt: 180,
    gps: '8.75° S · 115.44° E',
    cls: 's-c down',
    category: 'coastal',
    categoryLabel: 'Coastal',
    year: '2020',
    sensor: 'DJI MAVIC 2 PRO · 1" CMOS · 20MP',
    orientation: 'portrait',
  },
  {
    id: 'f-c8',
    t: 'Crystal Lagoon Harbor',
    l: 'Nusa Islands, Bali',
    img: '/images/gallery/coastal/crystal-lagoon-reef-skyscape.jpg',
    alt: 194,
    gps: '8.68° S · 115.45° E',
    cls: 's-d',
    category: 'coastal',
    categoryLabel: 'Coastal',
    year: '2023',
    sensor: 'DJI AIR 2S · 1" CMOS · 20MP',
    orientation: 'portrait',
  },

  // ── NATURE (3 unique landscapes) ──
  {
    id: 'f-n1',
    t: 'Emerald Paddy',
    l: 'Purba Bardhaman, West Bengal',
    img: '/images/gallery/nature/burdwan-damodar-paddy-mosaics.jpg',
    alt: 59,
    gps: '23.03° N · 87.77° E',
    cls: 's-a',
    category: 'nature',
    categoryLabel: 'Nature',
    year: '2022',
    sensor: 'DJI MAVIC 2 PRO · 1" CMOS · 20MP',
    orientation: 'landscape',
  },
  {
    id: 'f-n2',
    t: 'Ghats Forest Canopy',
    l: 'Western Ghats Highlands, Karnataka',
    img: '/images/gallery/nature/western-ghats-highland-forest-canopy.jpg',
    alt: 210,
    gps: '13.15° N · 75.35° E',
    cls: 's-b up',
    category: 'nature',
    categoryLabel: 'Nature',
    year: '2019',
    sensor: 'DJI MAVIC 2 PRO · 1" CMOS · 20MP',
    orientation: 'portrait',
  },
  {
    id: 'f-n3',
    t: 'Canal Green Canopy',
    l: 'South Kolkata, West Bengal',
    img: '/images/gallery/nature/kolkata-canal-waterway-canopy.jpg',
    alt: 20,
    gps: '22.47° N · 88.39° E',
    cls: 's-c',
    category: 'nature',
    categoryLabel: 'Nature',
    year: '2022',
    sensor: 'DJI AIR 2S · 1" CMOS · 20MP',
    orientation: 'landscape',
  },

  // ── ESTUARY (4 unique landscapes) ──
  {
    id: 'f-e1',
    t: 'Padukone Estuary',
    l: 'Padukone, Karnataka',
    img: '/images/gallery/estuary/padukone-estuary-confluence-karnataka.jpg',
    alt: 125,
    gps: '13.70° N · 74.63° E',
    cls: 's-a',
    category: 'estuary',
    categoryLabel: 'Estuary',
    year: '2021',
    sensor: 'DJI MAVIC 2 PRO · 1" CMOS · 20MP',
    orientation: 'portrait',
  },
  {
    id: 'f-e2',
    t: 'Eco Lake Basin',
    l: 'New Town Rajarhat, West Bengal',
    img: '/images/gallery/estuary/eco-lake-waterway-geometry-rajarhat.jpg',
    alt: 155,
    gps: '22.61° N · 88.46° E',
    cls: 's-b up',
    category: 'estuary',
    categoryLabel: 'Estuary',
    year: '2018',
    sensor: 'DJI MAVIC PRO · 1/2.3" CMOS · 12MP',
    orientation: 'portrait',
  },
  {
    id: 'f-e3',
    t: 'Hooghly Reach',
    l: 'Dakshineswar, West Bengal',
    img: '/images/gallery/estuary/hooghly-river-dakshineswar-reach.jpg',
    alt: 76,
    gps: '22.65° N · 88.36° E',
    cls: 's-c',
    category: 'estuary',
    categoryLabel: 'Estuary',
    year: '2022',
    sensor: 'DJI AIR 2S · 1" CMOS · 20MP',
    orientation: 'portrait',
  },
  {
    id: 'f-e4',
    t: 'Pitrodi Sandbars',
    l: 'Pitrodi Estuary, Karnataka',
    img: '/images/gallery/estuary/pitrodi-udyavara-river-delta-sandbars.jpg',
    alt: 24,
    gps: '13.30° N · 74.72° E',
    cls: 's-d',
    category: 'estuary',
    categoryLabel: 'Estuary',
    year: '2019',
    sensor: 'DJI MAVIC 2 PRO · 1" CMOS · 20MP',
    orientation: 'portrait',
  },

  // ── RIDGES (1 unique landscape) ──
  {
    id: 'f-r1',
    t: 'Kelingking Coastal Ridge',
    l: 'Nusa Penida, Bali',
    img: '/images/gallery/ridges/aerial-ridge-topography-skyscape.jpg',
    alt: 210,
    gps: '8.75° S · 115.44° E',
    cls: 's-a',
    category: 'ridges',
    categoryLabel: 'Ridges',
    year: '2024',
    sensor: 'DJI AIR 2S · 1" CMOS · 20MP',
    orientation: 'portrait',
  },

  // ── URBAN (4 unique landscapes) ──
  {
    id: 'f-u1',
    t: 'UB City Twilight',
    l: 'UB City, Bengaluru, Karnataka',
    img: '/images/gallery/urban/ub-city-bengaluru-skyline-dusk.jpg',
    alt: 109,
    gps: '12.97° N · 77.58° E',
    cls: 's-a',
    category: 'urban',
    categoryLabel: 'Urban',
    year: '2019',
    sensor: 'DJI MAVIC 2 PRO · 1" CMOS · 20MP',
    orientation: 'portrait',
  },
  {
    id: 'f-u2',
    t: 'UB City Night',
    l: 'UB City, Bengaluru, Karnataka',
    img: '/images/gallery/urban/ub-city-night-aerial-bengaluru.jpg',
    alt: 115,
    gps: '12.97° N · 77.58° E',
    cls: 's-b up',
    category: 'urban',
    categoryLabel: 'Urban',
    year: '2019',
    sensor: 'DJI MAVIC 2 PRO · 1" CMOS · 20MP',
    orientation: 'landscape',
  },
  {
    id: 'f-u3',
    t: 'Kolkata Wetlands',
    l: 'East Kolkata Wetlands, West Bengal',
    img: '/images/gallery/urban/east-kolkata-ramsar-wetlands-dawn.jpg',
    alt: 131,
    gps: '22.53° N · 88.40° E',
    cls: 's-c',
    category: 'urban',
    categoryLabel: 'Urban',
    year: '2022',
    sensor: 'DJI MAVIC 2 PRO · 1" CMOS · 20MP',
    orientation: 'portrait',
  },
  {
    id: 'f-u4',
    t: 'Bengaluru Sphere',
    l: 'Bengaluru, Karnataka',
    img: '/images/gallery/urban/bengaluru-urban-sphere-aerial.jpg',
    alt: 175,
    gps: '12.97° N · 77.59° E',
    cls: 's-d',
    category: 'urban',
    categoryLabel: 'Urban',
    year: '2020',
    sensor: 'DJI DRONE · 360° SPHERE OPTICS',
    orientation: 'portrait',
  },
];

/**
 * Pre-curated balanced sequence for initial SSR render:
 * Contains ALL 20 photos interleaved across categories so Page 1, 2, and 3
 * each have a vibrant mix of categories instead of coastal-first.
 */
export const DEFAULT_ALL_FRAMES: GalleryFrame[] = [
  // ── Page 1 (9 frames): Vibrant cross-category mix ──
  F.find((f) => f.id === 'f-n1')!, // Nature (Landscape)
  F.find((f) => f.id === 'f-c1')!, // Coastal (Landscape)
  F.find((f) => f.id === 'f-u1')!, // Urban (Portrait)
  F.find((f) => f.id === 'f-e1')!, // Estuary (Portrait)
  F.find((f) => f.id === 'f-r1')!, // Ridges (Portrait)
  F.find((f) => f.id === 'f-c2')!, // Coastal (Landscape)
  F.find((f) => f.id === 'f-n2')!, // Nature (Portrait)
  F.find((f) => f.id === 'f-u2')!, // Urban (Landscape)
  F.find((f) => f.id === 'f-e2')!, // Estuary (Portrait)

  // ── Page 2 (9 frames): Vibrant cross-category mix ──
  F.find((f) => f.id === 'f-c3')!, // Coastal (Portrait)
  F.find((f) => f.id === 'f-n3')!, // Nature (Landscape)
  F.find((f) => f.id === 'f-u3')!, // Urban (Portrait)
  F.find((f) => f.id === 'f-e3')!, // Estuary (Portrait)
  F.find((f) => f.id === 'f-c4')!, // Coastal (Portrait)
  F.find((f) => f.id === 'f-c5')!, // Coastal (Portrait)
  F.find((f) => f.id === 'f-u4')!, // Urban (Portrait)
  F.find((f) => f.id === 'f-e4')!, // Estuary (Portrait)
  F.find((f) => f.id === 'f-c6')!, // Coastal (Portrait)

  // ── Page 3 (2 frames): Remaining coastal frames ──
  F.find((f) => f.id === 'f-c7')!, // Coastal (Portrait)
  F.find((f) => f.id === 'f-c8')!, // Coastal (Portrait) - Crystal Lagoon Harbor
];

/**
 * Generates an interleaved, randomized list of ALL 20 photos across all categories
 * so every page receives an authentic multi-category mix.
 */
export function getInterleavedAllFrames(): GalleryFrame[] {
  const coastal = F.filter((f) => f.category === 'coastal');
  const nature = F.filter((f) => f.category === 'nature');
  const urban = F.filter((f) => f.category === 'urban');
  const estuary = F.filter((f) => f.category === 'estuary');
  const ridges = F.filter((f) => f.category === 'ridges');

  const shuffle = <T>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const queues = [
    shuffle(coastal),
    shuffle(nature),
    shuffle(urban),
    shuffle(estuary),
    shuffle(ridges),
  ];

  const result: GalleryFrame[] = [];
  let hasMore = true;

  while (hasMore) {
    hasMore = false;
    for (const q of queues) {
      if (q.length > 0) {
        result.push(q.shift()!);
        hasMore = true;
      }
    }
  }

  return result;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', label: 'ALL', count: F.length },
  { id: 'coastal', label: 'COASTAL', count: F.filter((f) => f.category === 'coastal').length },
  { id: 'nature', label: 'NATURE', count: F.filter((f) => f.category === 'nature').length },
  { id: 'estuary', label: 'ESTUARY', count: F.filter((f) => f.category === 'estuary').length },
  { id: 'urban', label: 'URBAN', count: F.filter((f) => f.category === 'urban').length },
  { id: 'ridges', label: 'RIDGES', count: F.filter((f) => f.category === 'ridges').length },
];
