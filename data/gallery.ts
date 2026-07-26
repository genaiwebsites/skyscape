export interface GalleryFrame {
  t: string;   // title
  l: string;   // location
  img: string; // Unsplash photo ID
  alt: number; // altitude in metres
  gps: string; // GPS coordinates string
  cls: string; // CSS class (s-a / s-b / s-c / s-d + up / down)
}

export const F: GalleryFrame[] = [
  { t: 'The Fractured Lake',     l: 'Little Rann of Kutch, Gujarat',  img: 'photo-1500534314209-a25ddb2bd429', alt: 212, gps: '23.43° N · 71.20° E', cls: 's-a' },
  { t: 'Serpent Valley',         l: 'Spiti Valley, Himachal Pradesh', img: 'photo-1464822759023-fed622ff2c3b', alt: 284, gps: '32.25° N · 78.03° E', cls: 's-b up' },
  { t: 'Staircase to Green',     l: 'Wayanad, Kerala',                img: 'photo-1503614472-8c93d56e92ce',  alt: 96,  gps: '11.68° N · 76.13° E', cls: 's-c down' },
  { t: 'Tidal Geometry',         l: 'Dhanushkodi, Tamil Nadu',        img: 'photo-1505118380757-91f5f5632de0', alt: 74,  gps: '9.15° N · 79.44° E',  cls: 's-d' },
  { t: 'Dust & Light',           l: 'Thar Desert, Rajasthan',         img: 'photo-1509316785289-025f5b846b35', alt: 158, gps: '26.92° N · 70.90° E', cls: 's-b up' },
  { t: 'Indigo Hour',            l: 'Leh, Ladakh',                    img: 'photo-1486870591958-9b9d0d1dda99', alt: 299, gps: '34.15° N · 77.57° E', cls: 's-a' },
  { t: 'The Cracked Earth',      l: 'Marathwada, Maharashtra',        img: 'photo-1494500764479-0c8f2919a3d8', alt: 64,  gps: '19.15° N · 76.21° E', cls: 's-c down' },
  { t: 'Forest Canopy',          l: 'Nagarhole, Karnataka',           img: 'photo-1448375240586-882707db888b', alt: 38,  gps: '12.00° N · 76.13° E', cls: 's-b' },
  { t: 'The Colour of Salt',     l: 'Sambhar Lake, Rajasthan',        img: 'photo-1469474968028-56623f02e42e', alt: 187, gps: '26.91° N · 75.19° E', cls: 's-d up' },
  { t: 'Chessboard Fields',      l: 'Punjab Plains, Punjab',          img: 'photo-1500076656116-558758c991c1', alt: 243, gps: '30.90° N · 75.85° E', cls: 's-a' },
  { t: 'Where Two Rivers Argue', l: 'Prayagraj, Uttar Pradesh',       img: 'photo-1507525428034-b723cf961d3e', alt: 132, gps: '25.43° N · 81.88° E', cls: 's-c down' },
  { t: 'The Monsoon Grid',       l: 'Western Ghats, Goa',             img: 'photo-1501854140801-50d01698950b', alt: 118, gps: '15.40° N · 74.02° E', cls: 's-b up' },
];
