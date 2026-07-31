export interface GalleryFrame {
  t: string;   // title
  l: string;   // location
  img: string; // local image path
  alt: number; // altitude in metres
  gps: string; // GPS coordinates string
  cls: string; // CSS class (s-a / s-b / s-c / s-d + up / down)
}

export const F: GalleryFrame[] = [
  { t: 'Azure Sea Arch', l: 'Nusa Penida, Bali', img: '/images/nusa-penida-coastal-arch-skyscape.jpg', alt: 184, gps: '8.74° S · 115.46° E', cls: 's-a' },
  { t: 'Coastal Highway Ribbons', l: 'Western Coast, India', img: '/images/coastal-highway-drone-photography-skyscape.jpg', alt: 142, gps: '14.80° N · 74.12° E', cls: 's-b up' },
  { t: 'Misty Valley Topography', l: 'Western Ghats, India', img: '/images/misty-valley-drone-photography-skyscape.jpg', alt: 226, gps: '13.20° N · 75.25° E', cls: 's-c down' },
  { t: 'Granite Sea Cliff Surge', l: 'Malvan, Maharashtra', img: '/images/rocky-sea-cliff-skyscape.jpg', alt: 94, gps: '16.05° N · 73.46° E', cls: 's-d' },
  { t: 'Emerald Coral Reef Lagoon', l: 'Lakshadweep Archipelago', img: '/images/coastal-lagoon-reef-skyscape.jpg', alt: 128, gps: '10.56° N · 72.64° E', cls: 's-b up' },
  { t: 'Volcanic Basalt Peak', l: 'Deccan Traps, Maharashtra', img: '/images/volcanic-peak-aerial-skyscape.jpg', alt: 275, gps: '19.70° N · 73.80° E', cls: 's-a' },
  { t: 'High Altitude Ridge', l: 'Himalayan Escarpment', img: '/images/aerial-ridge-topography-skyscape.jpg', alt: 295, gps: '32.12° N · 77.40° E', cls: 's-c down' },
  { t: 'Braided Estuary Channels', l: 'Swarna Estuary, Karnataka', img: '/images/river-delta-estuary-aerial-skyscape.jpg', alt: 164, gps: '13.36° N · 74.78° E', cls: 's-b' },
  { t: 'Golden Hour Ridge Mist', l: 'Western Ghats, India', img: '/images/western-ghats-valley-drone-skyscape.jpg', alt: 210, gps: '13.15° N · 75.18° E', cls: 's-d up' },
  { t: 'Islet Promontory', l: 'Indian Ocean Coast', img: '/images/emerald-island-promontory-skyscape.jpg', alt: 88, gps: '20.42° S · 57.35° E', cls: 's-a' },
  { t: 'Turquoise Atoll Reef', l: 'Coral Coast, Southeast Asia', img: '/images/coral-reef-turquoise-lagoon-skyscape.jpg', alt: 152, gps: '8.70° S · 115.42° E', cls: 's-c down' },
  { t: 'Oceanic Surge & Precipice', l: 'Nusa Coastal Ridge, Bali', img: '/images/ocean-surge-rocky-headland-skyscape.jpg', alt: 198, gps: '8.76° S · 115.48° E', cls: 's-b up' },
];
