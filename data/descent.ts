export interface DescentStep {
  a: number;    // altitude in metres
  band: string; // band label
  img: string;  // Unsplash photo ID
  h: string;    // headline
  p: string;    // body paragraph
}

export const D: DescentStep[] = [
  {
    a: 299, band: 'Ceiling', img: 'photo-1486870591958-9b9d0d1dda99',
    h: 'Regional mountain systems.',
    p: 'At the 299m legal ceiling, individual geological features resolve into entire mountain ranges. Micro-details give way to large-scale structural direction.',
  },
  {
    a: 212, band: 'High band', img: 'photo-1500534314209-a25ddb2bd429',
    h: 'Drainage networks & oxbows.',
    p: 'At 200 metres, hydrologic patterns become clear — ancient riverbeds, oxbow lakes, and active silt channels mapped across the valley floor.',
  },
  {
    a: 158, band: 'Mid band', img: 'photo-1509316785289-025f5b846b35',
    h: 'Geomorphology & dune lines.',
    p: 'Dune ridges and salt crust formations display pure abstract patterns when shadow angles align with early morning light.',
  },
  {
    a: 96, band: 'Low band', img: 'photo-1503614472-8c93d56e92ce',
    h: 'Agricultural & human land use.',
    p: 'Below 100 metres, human intervention marks the landscape — terrace farming, stone bunds, irrigation canals, and boundary lines.',
  },
  {
    a: 38, band: 'Floor', img: 'photo-1448375240586-882707db888b',
    h: 'Canopy & forest structure.',
    p: 'Low altitude reveals individual tree crowns, rock fractures, and localized topography right before touchdown.',
  },
];
