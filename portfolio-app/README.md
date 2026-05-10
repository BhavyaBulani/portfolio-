# 🚀 3D Interactive Portfolio

An interactive 3D portfolio showcasing web development skills with animated hero sections, magic bento cards, dynamic text animations, and 3D model integration. Built with React, Vite, Three.js, and GSAP for maximum visual impact.

## ✨ Features

- **3D Model Integration** - Interactive 3D models using Three.js and React Three Fiber
- **Smooth Animations** - Advanced text animations and page transitions with GSAP
- **Magic Bento Cards** - Interactive hover effects with spotlight, glow, and tilt animations
- **Hero Section** - Animated Earth 3D model with dynamic text introduction
- **Responsive Design** - Fully responsive across all devices
- **Fast Performance** - Optimized with Vite for lightning-fast builds
- **Modern UI** - Beautiful gradient backgrounds and glassmorphism effects
- **Contact Integration** - Direct contact cards with social media links

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Drei** - Helpful utilities for React Three Fiber
- **GSAP** - Professional animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Motion** - Animation library for React
- **React Fast Marquee** - Scrolling text animations
- **React Icons** - Icon library

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/BhavyaBulani/portfolio.git
cd portfolio/portfolio-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

The portfolio will open at `http://localhost:5173`

## 🚀 Build & Deploy

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

**Linting:**
```bash
npm run lint
```

## 📁 Project Structure

```
portfolio-app/
├── src/
│   ├── components/
│   │   ├── CartoonBoyModel.jsx      # 3D model component
│   │   ├── ContactCard.jsx          # Contact information card
│   │   ├── LogoLoop.jsx             # Animated logo carousel
│   │   ├── MagicBentoCard.jsx       # Interactive bento card with effects
│   │   ├── PillNav.jsx              # Navigation pills
│   │   ├── ProjectCard.jsx          # Project showcase card
│   │   ├── QuickLinks.jsx           # Quick navigation links
│   │   ├── SkillsMarquee.jsx        # Scrolling skills animation
│   │   ├── SplitText.jsx            # Dynamic text animation
│   │   ├── ThemeProvider.jsx        # Theme context
│   │   └── loading-page/
│   │       ├── Loading.jsx          # Loading screen
│   │       └── Loading.css
│   ├── utils/
│   │   └── loadingProgress.js       # Loading utilities
│   ├── App.jsx                      # Main app component
│   └── main.jsx                     # Entry point
├── public/                          # Static assets
├── package.json
├── vite.config.js
└── index.html
```

## 🎨 Features in Detail

### Hero Section
- Animated 3D Earth model
- Dynamic text introduction with character-by-character animation
- Smooth scroll to sections

### Magic Bento Cards
- Spotlight hover effect
- Glow animation on interaction
- Tilt transformation
- Click effects

### Skills Showcase
- Animated marquee with scrolling skills
- Smooth infinite scroll effect

### Projects Display
- Interactive project cards
- Hover animations
- Direct links to projects

### Contact Section
- Professional contact card
- Social media integration
- Quick contact links

## 🔧 Configuration

The portfolio uses Vite for build configuration. Key files:
- `vite.config.js` - Vite configuration
- `eslint.config.js` - ESLint rules
- `.gitignore` - Git ignore rules

## 📱 Responsive Design

The portfolio is optimized for:
- Desktop (1920px and above)
- Laptop (1366px - 1919px)
- Tablet (768px - 1365px)
- Mobile (320px - 767px)

## 🚀 Performance

- Lazy loading for components
- Optimized 3D models
- Efficient animation timing
- Tree-shaking with Vite
- Minified production builds

## 📝 Customization

To customize the portfolio:

1. **Update personal info** - Edit component content in `src/components/`
2. **Change colors** - Modify CSS files and Tailwind config
3. **Add projects** - Update `ProjectCard.jsx` with your projects
4. **Update skills** - Modify `SkillsMarquee.jsx`
5. **Change 3D models** - Replace models in assets folder

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Bhavya Bulani**
- GitHub: [@BhavyaBulani](https://github.com/BhavyaBulani)
- Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- Three.js documentation and community
- GSAP animation library
- React and Vite communities
- All open-source contributors

---

**Made with ❤️ and React**
