import { useEffect, useLayoutEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from './components/ThemeProvider';
import MagicBentoCard from './components/MagicBentoCard';
import SplitText from './components/SplitText';
import QuickLinks from './components/QuickLinks';
import SkillsMarquee from './components/SkillsMarquee';
import ProjectCard from './components/ProjectCard';
import ContactCard from './components/ContactCard';
import PillNav from './components/PillNav';
import Loading from './components/loading-page/Loading';
import { setProgress } from './utils/loadingProgress';

gsap.registerPlugin(ScrollTrigger);

// Lazy-load the heavy 3D model for better initial page performance
const CartoonBoyModel = lazy(() => import('./components/CartoonBoyModel'));

function ModelFallback() {
  return (
    <div className="model-loading-fallback">
      <div className="model-loading-spinner" />
      <span>Loading 3D Model...</span>
    </div>
  );
}

function App() {
  const { theme, toggleTheme } = useTheme();
  const gridRef = useRef(null);
  const [appReady, setAppReady] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const progressRef = useRef(null);

  useEffect(() => {
    progressRef.current = setProgress(setLoadingPercent);
    return () => progressRef.current?.clear();
  }, []);

  /* --- Track 3D model load --- */
  const handleModelLoaded = useCallback(() => {
    if (progressRef.current) {
      progressRef.current.loaded();
    }
  }, []);

  /* --- Safety timeout: dismiss preloader after 10s max --- */
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (progressRef.current) {
        progressRef.current.loaded();
      }
    }, 10000);
    return () => clearTimeout(timeout);
  }, []);

  /* ===== Enhanced scroll-triggered reveal animations ===== */
  useLayoutEffect(() => {
    if (!gridRef.current || !appReady) return;

    const cards = gridRef.current.querySelectorAll('.bento-card');

    cards.forEach((card, i) => {
      const isHero = card.classList.contains('hero-card');

      if (isHero) {
        /* Hero card: cinematic scale-up entrance */
        gsap.set(card, { opacity: 0, scale: 0.92, y: 24 });
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: 'power4.out',
          delay: 0.15,
        });
        return;
      }

      /* All section cards: uniform fade-up reveal */
      gsap.set(card, {
        opacity: 0,
        y: 50,
        scale: 0.96,
      });

      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 86%',
          once: true,
        },
      });
    });

    /* --- Subtle parallax float on section titles --- */
    const titles = gridRef.current.querySelectorAll('.section-title');
    titles.forEach((title) => {
      gsap.to(title, {
        y: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: title,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [appReady]);

  return (
    <>
      <title>Bhavya Bulani — Web Developer Portfolio</title>
      <meta name="description" content="Portfolio of Bhavya Bulani - Web Developer exploring IT, AI, and creative vibe coding." />

      {showLoading && (
        <Loading 
          percent={loadingPercent} 
          onExitStart={() => setAppReady(true)}
          onComplete={() => setShowLoading(false)} 
        />
      )}

      <div className="portfolio-container">
        <PillNav
          logo="/logo.png"
          items={[
            { label: 'Home', href: '#home' },
            { label: 'Link', href: '#links' },
            { label: 'Skills', href: '#skills' },
            { label: 'Project', href: '#projects' },
            { label: 'Contact', href: '#contact' }
          ]}
          activeHref="#home"
          className="custom-nav"
          ease="power2.easeOut"
          baseColor={theme === 'dark' ? '#7c3aed' : '#7c3aed'}
          pillColor={theme === 'dark' ? '#141420' : '#ffffff'}
          hoveredPillTextColor={theme === 'dark' ? '#141420' : '#ffffff'}
          pillTextColor="#7c3aed"
          initialLoadAnimation={false}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="bento-grid" style={{ marginTop: '70px' }} ref={gridRef}>

          {/* ===== HERO CARD ===== */}
          <MagicBentoCard
            id="home"
            className="hero-card"
            glowColor="124, 58, 237"
            spotlightRadius={400}
          >
            <div className="hero-content-left">
              <div className="hero-3d-container">
                <Suspense fallback={<ModelFallback />}>
                  <CartoonBoyModel onLoaded={handleModelLoaded} />
                </Suspense>
              </div>
            </div>
            <div className="hero-content-right">
              <SplitText
                text="Bhavya Bulani"
                className="hero-name"
                tag="h1"
                delay={60}
                duration={1.2}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-50px"
              />
              <SplitText
                text="Web Developer"
                className="hero-title"
                tag="p"
                delay={40}
                duration={0.8}
                ease="power2.out"
                splitType="chars"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-50px"
              />
              <p className="hero-desc">
                Building modern websites with creativity and precision,
                while exploring AI and the future of technology.
                Always learning, experimenting, and creating
                experiences that leave an impact.
              </p>
              <a
                href="/resume.pdf"
                download="Bhavya_Bulani_Resume.pdf"
                className="resume-btn"
                id="resume-download"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
            </div>
          </MagicBentoCard>

          {/* ===== INTRO CARD ===== */}
          <MagicBentoCard
            className="intro-card"
            glowColor="124, 58, 237"
          >
            <h2 className="section-title">Introduction</h2>
            <p className="intro-text">
              Hey, I&apos;m Bhavya Bulani, an undergraduate student and a web developer
              exploring the IT field, AI, and creative vibe coding. I&apos;m passionate about
              building modern web experiences and currently looking for opportunities to
              learn, grow, and collaborate on exciting projects.
            </p>
            <a
              href="https://github.com/BhavyaBulani"
              target="_blank"
              rel="noopener noreferrer"
              className="know-more"
              id="know-more-link"
            >
              Know more <span className="arrow">→</span>
            </a>
          </MagicBentoCard>

          {/* ===== QUICK LINKS CARD ===== */}
          <MagicBentoCard
            id="links"
            className="links-card"
            glowColor="124, 58, 237"
          >
            <h2 className="section-title">Links</h2>
            <QuickLinks />
          </MagicBentoCard>

          {/* ===== SKILLS CARD ===== */}
          <MagicBentoCard
            id="skills"
            className="skills-card"
            glowColor="124, 58, 237"
          >
            <h2 className="section-title">Skills</h2>
            <SkillsMarquee />
          </MagicBentoCard>

          {/* ===== PROJECTS CARD ===== */}
          <MagicBentoCard
            id="projects"
            className="projects-card"
            glowColor="124, 58, 237"
          >
            <h2 className="section-title">Projects</h2>
            <ProjectCard />
          </MagicBentoCard>

          {/* ===== CONTACT CARD ===== */}
          <MagicBentoCard
            id="contact"
            className="contact-card"
            glowColor="124, 58, 237"
          >
            <ContactCard />
          </MagicBentoCard>

        </div>
      </div>
    </>
  );
}

export default App;
