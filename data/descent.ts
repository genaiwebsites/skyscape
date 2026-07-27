export interface DescentStep {
  a: number;    // altitude in metres
  band: string; // band label
  img: string;  // Unsplash photo ID or local image path
  h: string;    // headline
  p: string;    // body paragraph
}

export const D: DescentStep[] = [
  {
    a: 299, band: 'Ceiling', img: 'photo-1486870591958-9b9d0d1dda99',
    h: 'The Grand Ceiling',
    p: 'At 299 metres, individual peaks dissolve into vast, silent mountain ranges. High-altitude perspective turns rugged geology into liquid geometry.',
  },
  {
    a: 212, band: 'High band', img: 'photo-1500534314209-a25ddb2bd429',
    h: 'Braided River Arteries',
    p: 'Glacial meltwater and ancient river channels flow like veins across the valley floor, creating natural abstractions drawn by gravity over millennia.',
  },
  {
    a: 168, band: 'Coastal Ridge', img: '/mauritius-coastal-drone-photography-skyscape.jpg',
    h: 'Macondé Viewpoint & Emerald Lagoon',
    p: 'Flown at 168 metres over Macondé Viewpoint in Baie du Cap, Mauritius. Golden sunlight carves the volcanic basalt ridge as winding coastal tarmac cuts between ancient rock and turquoise ocean waters.',
  },
  {
    a: 118, band: 'Mid band', img: 'photo-1509316785289-025f5b846b35',
    h: 'Sculpted Dunes & Ridge Shadows',
    p: 'Low-angle morning light reveals wind-carved dune ridges and salt crust textures in vivid relief.',
  },
  {
    a: 72, band: 'Low band', img: 'photo-1503614472-8c93d56e92ce',
    h: 'Terraced Earth & Human Traces',
    p: 'Human presence appears as delicate geometry: ancestral terrace farms, hand-built stone bunds, and winding irrigation channels.',
  },
  {
    a: 38, band: 'Floor', img: 'photo-1448375240586-882707db888b',
    h: 'Canopy Density & Ground Approach',
    p: 'Individual tree crowns and granite fractures loom into crisp detail moments before touchdown.',
  },
];
