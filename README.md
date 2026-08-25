# Shubh Avas Realty 🏛️✨
> **Luxury Architectural Estates in the Sacred Land of Mathura, Uttar Pradesh.**

Shubh Avas Realty is a premier, high-end creative landing page designed for an ultra-luxury real estate developer. Built with modern symmetrical principles, this project delivers a cinematic web experience using advanced animations, interactive 3D/canvas image sequences, and premium aesthetics.

---

## 🌟 Interactive Live Experience Elements

The website leverages high-performance frontend engineering to create a sensory brand experience for high-net-worth patrons:

1. **Cinematic Hero Image Sequence (60FPS Canvas Blending)**
   - Preloads a frame-by-frame sequence of 300 high-resolution architectural images.
   - Smoothly scrub-renders on a HTML5 Canvas based on Lenis scroll delta.
   - Dynamic staggering text reveals (SplitType + GSAP) synchronized with scroll progress.

2. **Premium Load Experience**
   - Custom, smooth loading bar that shows loading percentage (0% to 100%) to ensure all assets are fully preloaded before fading out for a seamless showcase.

3. **Horizontal Scrolling Pin Showcase**
   - Implements a modern horizontal portfolio strip of flagship properties (e.g., *The Aurelia Canopy*, *Yamuna Vista Pavilion*) that pins and scrolls sideways on desktop displays before continuing vertical scrolling.

4. **Apple-Style Storytelling**
   - Interactive timeline tracks representing "The Art of Execution" (Symmetry, Materials, Serenity) with dynamic background gradient/color blending as you scroll.

5. **Aesthetic UI/UX Accents**
   - **Custom Glow Cursor**: A smooth magnetic glow light following the cursor client-side.
   - **Dynamic Grids with Tilt**: Tilt effects powered by Vanilla-Tilt with dynamic glassmorphism borders and custom radial hover light tracking.
   - **Masonry Gallery**: Filtering by category tags (Exteriors, Interiors, Concept Sketches) combined with a fullscreen custom Lightbox.
   - **Elegant Accessibility**: Full Vastu advisory FAQs with custom accordion heights and grayscale-mapped Google Maps locator.

---

## 🛠️ Technology Stack & Libraries

To achieve smooth 60FPS scroll performance and animations, the project uses the following tools:

- **Core**: Vanilla HTML5, CSS3, and JavaScript (ES6)
- **Smooth Scroll**: [Lenis Scroll Engine](https://github.com/darkroomengineering/lenis) (for unifying delta speeds across scroll types)
- **Animation Framework**: [GSAP (GreenSock Animation Platform)](https://gsap.com/) & [ScrollTrigger Plugin](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **Text Manipulation**: [SplitType](https://github.com/lukePeavey/Split-Type) (for elegant typographic animations)
- **3D Card Hover**: [Vanilla-Tilt.js](https://micku7zu.github.io/vanilla-tilt.js/)
- **Slider/Carousel**: [Swiper.js](https://swiperjs.com/) (for patrons testimonials)
- **Fonts**: Playfair Display (Serif) & Inter (Sans-serif) via Google Fonts

---

## 📂 Project Structure

```bash
Real Estate/
├── index.html                  # Main semantic HTML structure
├── index.css                   # Core styling system (Glassmorphism & Gradients)
├── index.js                    # Core animation engine and canvas logic
├── luxury villa images/        # Media assets (Image frames, testimonial avatars)
│   ├── ezgif-frame-001.jpg     # Preloaded cinematic canvas frame sequence
│   └── ...                     
└── README.md                   # Project documentation
```

---

## ⚡ Setup & Local Development

This project runs entirely on client-side vanilla code (HTML, CSS, JS). Due to modern browser security restrictions (CORS) regarding reading image files on canvas locally (via `file://`), you should host it via a local web server to experience the cinematic image sequence.

### Quick Start:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ravithakur776/Shubh-Avas-Realty.git
   cd Shubh-Avas-Realty
   ```

2. **Run a local server:**
   - If you have **Node.js** installed, you can use `npx`:
     ```bash
     npx serve .
     ```
   - Alternatively, using **VS Code**, install the **Live Server** extension, right-click `index.html`, and select *Open with Live Server*.
   - If you have **Python** installed:
     ```bash
     python -m http.server 8000
     ```

3. **View the website:**
   Open your browser and navigate to `http://localhost:3000` (or `http://localhost:8000` for python).

---

## 🎨 Visual Design Guidelines Applied

- **Color Palette**: Obsidian Blue background (`#090E1A`), Premium Architectural Gold (`#C8A45D`), and rich dark velvet and forest transitions for storytelling sections.
- **Glassmorphism**: Elegant translucent container backdrops using `backdrop-filter: blur(16px)` and subtle white borders with low opacities.
- **Typography**: Playfair Display for majestic headlines, and Inter for clean, legible interface data.

---

## ⚖️ License ##

All rights reserved. Designed and developed with modern symmetrical guidelines for ultra-luxury presentations.
