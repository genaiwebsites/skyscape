import os
from PIL import Image, ImageOps, ImageDraw, ImageFont

PUBLIC_DIR = r'public'
OG_WIDE_DIR = os.path.join(PUBLIC_DIR, 'og')
OG_SQ_DIR = os.path.join(PUBLIC_DIR, 'og', 'square')

os.makedirs(OG_WIDE_DIR, exist_ok=True)
os.makedirs(OG_SQ_DIR, exist_ok=True)

def generate_pure_white_logo():
    """Converts the black logo into a pristine, 100% solid white logo with identical alpha."""
    black_logo_path = os.path.join(PUBLIC_DIR, 'skyscape-aerial-photography-logo-black.png')
    with Image.open(black_logo_path) as img:
        img = img.convert('RGBA')
        r, g, b, a = img.split()
        pure_white = Image.merge('RGBA', (
            Image.new('L', img.size, 255),
            Image.new('L', img.size, 255),
            Image.new('L', img.size, 255),
            a
        ))
        # Overwrite the corrupted white logo
        pure_white.save(os.path.join(PUBLIC_DIR, 'skyscape-aerial-photography-logo-white.png'))
        print("[OK] Updated skyscape-aerial-photography-logo-white.png with pristine white monogram")
        return pure_white

def create_wide_banner(logo_img):
    """Creates the standard 1200x630 (1.91:1) OpenGraph wide card image."""
    out_path = os.path.join(OG_WIDE_DIR, 'og_homepage.jpg')
    custom_banner = os.path.join(PUBLIC_DIR, 'images', 'skyscape-og-banner-art.png')
    
    if os.path.exists(custom_banner):
        with Image.open(custom_banner) as img:
            img = img.convert('RGB')
            fitted = ImageOps.fit(img, (1200, 630), Image.Resampling.LANCZOS)
            fitted.save(out_path, 'JPEG', quality=92, optimize=True)
            print(f"[OK] Created Wide OG from custom art (1200x630): {out_path} ({os.path.getsize(out_path)} bytes)")
            return

    # Find best hero image fallback
    hero_candidates = [
        os.path.join(PUBLIC_DIR, 'images', 'ocean-surge-rocky-headland-skyscape.jpg'),
        os.path.join(PUBLIC_DIR, 'images', 'nusa-penida-featured.jpeg'),
        os.path.join(PUBLIC_DIR, 'images', 'coastal-highway-drone-photography-skyscape.png'),
    ]
    hero_path = next((p for p in hero_candidates if os.path.exists(p)), None)
    
    with Image.open(hero_path) as base:
        base = base.convert('RGB')
        # Crop & fit to 1200x630
        fitted = ImageOps.fit(base, (1200, 630), Image.Resampling.LANCZOS)
        
        # Dark vignette / cinematic overlay for text legibility
        overlay = Image.new('RGBA', (1200, 630), (5, 8, 13, 0)) # --ink color
        draw_ov = ImageDraw.Draw(overlay)
        
        # Gradient overlay from left to right / bottom
        for y in range(630):
            # bottom darken
            alpha_bottom = int(140 * (y / 630.0)**1.5)
            draw_ov.line([(0, y), (1200, y)], fill=(5, 8, 13, alpha_bottom))
            
        for x in range(1200):
            # left darken
            alpha_left = int(180 * (1.0 - (x / 1200.0))**0.8)
            draw_ov.line([(x, 0), (x, 630)], fill=(5, 8, 13, max(alpha_left, 40)))
            
        combined = Image.alpha_composite(fitted.convert('RGBA'), overlay)
        
        # Overlay logo (scale to 140x140)
        logo_scaled = logo_img.resize((140, 140), Image.Resampling.LANCZOS)
        combined.paste(logo_scaled, (80, 120), logo_scaled)
        
        # Typography
        draw = ImageDraw.Draw(combined)
        
        # Load fonts
        try:
            font_title = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 44)
            font_sub = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 22)
            font_tag = ImageFont.truetype("C:/Windows/Fonts/segoeuil.ttf", 16)
        except Exception:
            font_title = ImageFont.load_default()
            font_sub = ImageFont.load_default()
            font_tag = ImageFont.load_default()
            
        # Draw Brand Name
        draw.text((80, 290), "SKYSCAPE", fill=(238, 243, 247), font=font_title) # --white
        # Draw Accent line
        draw.line([(80, 355), (200, 355)], fill=(206, 148, 80), width=3) # --amber
        # Draw Subtitle
        draw.text((80, 380), "Aerial Landscape Photography", fill=(238, 243, 247), font=font_sub)
        draw.text((80, 420), "Kshitiz Bathwal · Flown between 30 and 299m AGL", fill=(158, 172, 186), font=font_tag) # --fog
        draw.text((80, 450), "Fine Art Prints & Perspectives across the Indian Subcontinent", fill=(124, 167, 194), font=font_tag) # --haze
        
        # Save as optimized JPEG
        final_rgb = combined.convert('RGB')
        final_rgb.save(out_path, 'JPEG', quality=90, optimize=True)
        print(f"[OK] Created Wide OG (1200x630): {out_path} ({os.path.getsize(out_path)} bytes)")

def create_square_thumbnail(logo_img):
    """Creates the standard 800x800 (1:1) square thumbnail for WhatsApp, iMessage, Slack."""
    out_path = os.path.join(OG_SQ_DIR, 'sq_homepage.jpg')
    art_path = os.path.join(PUBLIC_DIR, 'images', 'skyscape-drone-monogram-art.png')
    
    if os.path.exists(art_path):
        with Image.open(art_path) as img:
            img = img.convert('RGB')
            fitted = ImageOps.fit(img, (800, 800), Image.Resampling.LANCZOS)
            fitted.save(out_path, 'JPEG', quality=92, optimize=True)
            print(f"[OK] Created Square OG from custom art (800x800): {out_path} ({os.path.getsize(out_path)} bytes)")
            return
            
    # Fallback to generated dark canvas if custom art not present
    canvas = Image.new('RGB', (800, 800), (5, 8, 13))
    draw = ImageDraw.Draw(canvas)
    
    # Scale logo to 240x240
    logo_scaled = logo_img.resize((240, 240), Image.Resampling.LANCZOS)
    canvas.paste(logo_scaled, ((800 - 240) // 2, 190), logo_scaled)
    
    # Typography
    try:
        font_title = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 44)
        font_sub = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 20)
        font_author = ImageFont.truetype("C:/Windows/Fonts/segoeuil.ttf", 18)
    except Exception:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_author = ImageFont.load_default()
        
    # Center text
    title_text = "SKYSCAPE"
    sub_text = "AERIAL LANDSCAPE PHOTOGRAPHY"
    author_text = "KSHITIZ BATHWAL · FLOWN ACROSS INDIA"
    
    bbox_t = draw.textbbox((0, 0), title_text, font=font_title)
    w_t = bbox_t[2] - bbox_t[0]
    draw.text(((800 - w_t) // 2, 480), title_text, fill=(238, 243, 247), font=font_title)
    
    # Amber divider line
    draw.line([(350, 545), (450, 545)], fill=(206, 148, 80), width=2)
    
    bbox_s = draw.textbbox((0, 0), sub_text, font=font_sub)
    w_s = bbox_s[2] - bbox_s[0]
    draw.text(((800 - w_s) // 2, 565), sub_text, fill=(158, 172, 186), font=font_sub)
    
    bbox_a = draw.textbbox((0, 0), author_text, font=font_author)
    w_a = bbox_a[2] - bbox_a[0]
    draw.text(((800 - w_a) // 2, 605), author_text, fill=(124, 167, 194), font=font_author)
    
    canvas.save(out_path, 'JPEG', quality=92, optimize=True)
    print(f"[OK] Created Square OG (800x800): {out_path} ({os.path.getsize(out_path)} bytes)")

def update_apple_touch_icon(logo_img):
    """Creates a proper 180x180 Apple touch icon with dark background."""
    apple_icon_path = os.path.join(r'app', 'apple-icon.png')
    canvas = Image.new('RGBA', (512, 512), (5, 8, 13, 255))
    logo_scaled = logo_img.resize((320, 320), Image.Resampling.LANCZOS)
    canvas.paste(logo_scaled, ((512 - 320) // 2, (512 - 320) // 2), logo_scaled)
    canvas.save(apple_icon_path)
    canvas.save(os.path.join(PUBLIC_DIR, 'apple-icon.png'))
    print(f"[OK] Created clean Apple Touch Icon: {apple_icon_path}")
    
    # Also create app/icon.png
    app_icon_path = os.path.join(r'app', 'icon.png')
    canvas.save(app_icon_path)
    print(f"[OK] Created clean App Icon: {app_icon_path}")

if __name__ == '__main__':
    white_logo = generate_pure_white_logo()
    create_wide_banner(white_logo)
    create_square_thumbnail(white_logo)
    update_apple_touch_icon(white_logo)
    print("\nAll OpenGraph & Icon assets generated successfully following opengraph_setup.md!")
