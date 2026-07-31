export interface DescentStep {
  a: number;    // altitude in metres
  band: string; // band label
  img: string;  // local image path
  h: string;    // headline
  p: string;    // body paragraph
}

export const D: DescentStep[] = [
  {
    a: 299, band: 'Ceiling · 299 m', img: '/images/kelingking-beach-nusa-penida-drone-skyscape.jpg',
    h: 'Kelingking T-Rex Cliff & Emerald Bay',
    p: 'At 299 metres AGL, the legendary T-Rex limestone cliff of Nusa Penida emerges from the Indian Ocean, where turquoise waves carve dramatic white foam arches against sheer 200-metre vertical precipices.',
  },
  {
    a: 212, band: 'Volcanic Ridge · 212 m', img: '/images/ijen-crater-volcano-aerial-skyscape.png',
    h: 'Mount Ijen Acidic Crater Lake',
    p: 'Descending to 212 metres over Mount Ijen caldera in East Java: the world\'s largest highly acidic crater lake glows in surreal turquoise hues framed by steaming sulfur solfataras and ancient volcanic ridges.',
  },
  {
    a: 168, band: 'Coastal Ridge · 168 m', img: '/mauritius-coastal-drone-photography-skyscape.jpg',
    h: 'Macondé Viewpoint & Emerald Lagoon',
    p: 'Flown at 168 metres over Macondé Viewpoint in Baie du Cap, Mauritius. Golden sunlight carves the volcanic basalt ridge as winding coastal tarmac cuts between ancient rock and turquoise ocean waters.',
  },
  {
    a: 114, band: 'Tidal Cavern · 114 m', img: '/images/angels-billabong-nusa-penida-skyscape.png',
    h: 'Angel\'s Billabong Tidal Pool',
    p: 'Hovering at 114 metres above Angel\'s Billabong: natural emerald infinity rock pools carved by ocean spindrift where crystalline seawater reflects the morning sky.',
  },
  {
    a: 72, band: 'Coastal Om · 72 m', img: '/images/gokarna-om-beach-drone-skyscape.jpg',
    h: 'Om Beach & Coastal Cliffs',
    p: 'At 72 metres above Gokarna: twin crescent coves shape the sacred Om landform as dense coconut palms meet black granite sea cliffs and breaking Arabian Sea surf.',
  },
  {
    a: 38, band: 'Promontory · 38 m', img: '/images/manipal-end-point-aerial-skyscape.png',
    h: 'Manipal End Point Ridge & Estuary',
    p: 'Final approach at 38 metres over Manipal End Point: lush plateau meadows slope gently into Swarna River estuary channels with the distant Arabian Sea horizon glowing at dusk.',
  },
];
