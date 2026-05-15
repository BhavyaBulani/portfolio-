import { useRef, useState, useCallback, useMemo } from 'react';

/**
 * MagicBentoCard - A card with spotlight tracking, border glow, and star particle effects.
 * Optimized: spotlight uses RAF-throttled updates, stars use shared keyframes.
 */
const MagicBentoCard = ({
  children,
  className = '',
  spotlightRadius = 350,
  glowColor = '124, 58, 237',
  enableSpotlight = true,
  enableBorderGlow = true,
  enableStars = true,
  particleCount = 6, // Reduced from 8
  style = {},
  ...props
}) => {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const rafRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [stars, setStars] = useState([]);

  // Throttled mouse tracking using requestAnimationFrame instead of setState on every move
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !spotlightRef.current) return;

    // Cancel previous pending frame
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current || !spotlightRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Direct DOM update — avoids React re-render on every mouse move
      spotlightRef.current.style.background =
        `radial-gradient(${spotlightRadius}px circle at ${x}px ${y}px, rgba(${glowColor}, 0.12), transparent 70%)`;
    });
  }, [spotlightRadius, glowColor]);

  const handleClick = useCallback((e) => {
    if (!enableStars || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newStars = Array.from({ length: particleCount }, (_, i) => {
      const angle = (360 / particleCount) * i + Math.random() * 30;
      const speed = 30 + Math.random() * 40;
      return {
        id: Date.now() + i,
        x, y, angle, speed,
        size: 3 + Math.random() * 4,
        // Pre-calculate end position
        tx: Math.cos(angle * Math.PI / 180) * speed,
        ty: Math.sin(angle * Math.PI / 180) * speed,
      };
    });

    setStars((prev) => [...prev, ...newStars]);

    setTimeout(() => {
      setStars((prev) => prev.filter((s) => !newStars.includes(s)));
    }, 700);
  }, [enableStars, particleCount]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      ref={cardRef}
      className={`bento-card ${className}`}
      onMouseMove={enableSpotlight ? handleMouseMove : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={style}
      {...props}
    >
      {/* Spotlight effect — uses direct DOM ref instead of state-driven re-renders */}
      {enableSpotlight && (
        <div
          ref={spotlightRef}
          className="card-spotlight"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      )}

      {/* Star particles — uses inline transform instead of dynamic @keyframes */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="star-particle"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            '--star-tx': `${star.tx}px`,
            '--star-ty': `${star.ty}px`,
            '--star-glow': `rgba(${glowColor}, 0.9)`,
            '--star-shadow-size': `${star.size * 2}px`,
          }}
        />
      ))}

      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default MagicBentoCard;
