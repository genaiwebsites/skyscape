# Hero Section Images

This folder contains all the original full-scale landscape photographs used in the Hero section and its WebGL sequence:

1. `mauritius-coastal-drone-photography-skyscape.jpg` - **Primary Base Hero** (168 m AGL · Macondé Viewpoint, Mauritius)
2. `coastal-highway-drone-photography-skyscape.png` - **Beat 1** (High Band · 245 m AGL · Western Coast, India)
3. `ijen-crater-volcano-aerial-skyscape.png` - **Beat 2** (Mid Descent · 198 m AGL · Mount Ijen, Java)
4. `manipal-end-point-aerial-skyscape.png` - **Beat 3** (Plateau Band · 142 m AGL · Swarna Estuary)
5. `angels-billabong-nusa-penida-skyscape.png` - **Beat 4** (Approach Band · 88 m AGL · Angel's Billabong)

### Adding or Swapping Hero Images
To replace or add a new picture for the Hero section:
1. Place your full-scale high-resolution landscape photo directly into this folder (`public/images/hero/<your-photo-name>.jpg` or `.png`).
2. Update the corresponding texture reference in `components/SkyscapeEngine.tsx` (and `app/page.tsx` for fallback if replacing the primary hero).

