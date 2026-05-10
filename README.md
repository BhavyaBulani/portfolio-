# ✨ Bhavya Bulani — Portfolio

## 🚀 About The Project

A premium, single-page portfolio website featuring a **bento grid layout**, **interactive 3D character model**, and **cinematic scroll animations**. Designed to deliver a visually stunning first impression with attention to every micro-interaction, transition, and detail.

### ✦ Key Highlights

- 🎭 **Interactive 3D Avatar** — A cursor-reactive animated cartoon character rendered with React Three Fiber, complete with orbit constraints and floating physics.
- 🧱 **Bento Grid Layout** — A modern card-based UI with spotlight tracking, border glow effects, and star particle burst on click.
- 🎬 **Cinematic Loading Screen** — A pancake-cooking animation with a percentage-based progress bar and curtain-style slide-up transition.
- 🌗 **Dark / Light Theme** — Seamless theme toggling with CSS custom properties and localStorage persistence.
- 💬 **Animated Typography** — GSAP SplitText-powered character-by-character reveal animations on scroll.
- 🧭 **Pill Navigation** — A fully custom animated nav bar with circle-expand hover effects, mobile hamburger menu, and smooth section highlighting.
- 📱 **Fully Responsive** — Optimized for all screen sizes from mobile to ultrawide displays.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | React 19, Vite 8 |
| **3D Rendering** | Three.js, React Three Fiber, Drei |
| **Animations** | GSAP (ScrollTrigger, SplitText), Framer Motion |
| **Styling** | Vanilla CSS with CSS Custom Properties |
| **Icons** | React Icons (Feather, Font Awesome) |
| **UI Components** | Custom Bento Cards, LogoLoop Marquee, Pill Navigation |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── cartoon boy 3d model.glb   # 3D character model
│   ├── logo.png                    # Brand logo
│   ├── resume.pdf                  # Downloadable resume
│   └── favicon.svg                 # Site favicon
├── src/
│   ├── components/
│   │   ├── loading-page/
│   │   │   ├── Loading.jsx         # Animated loading screen
│   │   │   └── Loading.css         # Loading screen styles
│   │   ├── CartoonBoyModel.jsx     # 3D character with React Three Fiber
│   │   ├── ContactCard.jsx         # Contact form with mailto integration
│   │   ├── LogoLoop.jsx            # Infinite scrolling marquee engine
│   │   ├── MagicBentoCard.jsx      # Interactive card with spotlight & particles
│   │   ├── PillNav.jsx             # Animated pill-style navigation bar
│   │   ├── ProjectCard.jsx         # Project showcase cards
│   │   ├── QuickLinks.jsx          # Social links with marquee animation
│   │   ├── SkillsMarquee.jsx       # Auto-scrolling skills display
│   │   ├── SplitText.jsx           # GSAP character animation wrapper
│   │   └── ThemeProvider.jsx       # Dark/light theme context provider
│   ├── utils/
│   │   └── loadingProgress.js      # Progressive loading state manager
│   ├── App.jsx                     # Main application with layout & animations
│   ├── App.css                     # App-level styles
│   ├── index.css                   # Global design system & variables
│   └── main.jsx                    # React entry point
├── index.html                      # HTML shell with SEO meta tags
├── vite.config.js                  # Vite configuration
└── package.json                    # Dependencies & scripts
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn / pnpm)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/BhavyaBulani/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to `http://localhost:5173` to see the portfolio live.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 🎨 Features In Detail

### 🧱 Magic Bento Cards
Each section is wrapped in a `MagicBentoCard` component featuring:
- **Cursor-tracking spotlight** — A radial gradient that follows the mouse.
- **Star particle burst** — Click anywhere on a card to emit animated particles.
- **Configurable glow** — Adjustable glow color, spotlight radius, and particle count.

### 🎭 3D Character Model
- Loaded via `@react-three/fiber` and `@react-three/drei` with a `.glb` model.
- **Cursor-reactive movement** — The character subtly follows the user's cursor.
- **Lazy-loaded** for performance — Heavy 3D assets don't block initial render.
- **Constrained orbit controls** — Users can interact without losing the composition.

### 🎬 Loading Experience
- Simulated progressive loading with a natural acceleration curve.
- Animated pancake-cooking visual during load.
- Smooth curtain-style exit transition synchronized with hero entrance animations.

### 🧭 Pill Navigation
- Desktop: Animated circle-expand hover effects with dual-label text swap.
- Mobile: Hamburger menu with GSAP-animated X morph and slide-down popover.
- Section highlighting on click with auto-dismiss after 5 seconds.
- Integrated theme toggle button.

### 💬 Contact Form
- Opens the visitor's default email client via `mailto:` with pre-filled subject and body.
- Visual feedback on submission with auto-reset.
- "Open to Work" status indicator.

---

## 🧪 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## 🗺️ Roadmap

- [ ] Add more project showcase cards
- [ ] Integrate a blog section
- [ ] Add page transition animations between sections
- [ ] Deploy to Vercel / Netlify with custom domain
- [ ] Add analytics tracking

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🙏 Usage & Credit

This portfolio is **open source** and free to use as inspiration or as a template for your own portfolio. However, if you do use it, **please give proper credit** by:

1. **Linking back** to [this repository](https://github.com/BhavyaBulani/portfolio) or my [GitHub profile](https://github.com/BhavyaBulani) somewhere in your site (e.g. footer, README, or source comments).
2. **Not claiming** the design as entirely your own work.
3. **Starring ⭐ the repo** — it's free and means a lot!

> [!NOTE]
> You are free to modify, remix, and adapt the code for personal or commercial use. Just don't create an exact copy without attribution. A small credit goes a long way! 💜

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📬 Contact

**Bhavya Bulani**

- GitHub: [@BhavyaBulani](https://github.com/BhavyaBulani)
- LinkedIn: [bhavya-bulani](https://www.linkedin.com/in/bhavya-bulani)
- Email: [bhavyabulani9@gmail.com](mailto:bhavyabulani9@gmail.com)

---

<div align="center">

**Built with ❤️ and lots of ☕**

⭐ Star this repo if you found it helpful!
