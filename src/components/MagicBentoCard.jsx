import { useRef, useState, useCallback } from 'react';

/**
 * MagicBentoCard - A card with spotlight tracking, border glow, and star particle effects.
 * Inspired by ReactBits MagicBento component.
 */
const MagicBentoCard = ({
  children,
  className = '',
  spotlightRadius = 350,
  glowColor = '124, 58, 237',
  enableSpotlight = true,
  enableBorderGlow = true,
  enableStars = true,
  particleCount = 8,
  style = {},
  ...props
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [stars, setStars] = useState([]);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleClick = useCallback((e) => {
    if (!enableStars || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newStars = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (360 / particleCount) * i + Math.random() * 30,
      speed: 30 + Math.random() * 40,
      size: 3 + Math.random() * 4,
    }));

    setStars((prev) => [...prev, ...newStars]);

    setTimeout(() => {
      setStars((prev) => prev.filter((s) => !newStars.includes(s)));
    }, 800);
  }, [enableStars, particleCount]);

  return (
    <div
      ref={cardRef}
      className={`bento-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={style}
      {...props}
    >
      {/* Spotlight effect */}
      {enableSpotlight && (
        <div
          className="card-spotlight"
          style={{
            background: `radial-gradient(${spotlightRadius}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${glowColor}, 0.12), transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Star particles */}
      {stars.map((star) => (
        <span
          key={star.id}
          style={{
            position: 'absolute',
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            background: `rgba(${glowColor}, 0.9)`,
            boxShadow: `0 0 ${star.size * 2}px rgba(${glowColor}, 0.6)`,
            pointerEvents: 'none',
            zIndex: 10,
            animation: `starBurst-${star.angle} 0.7s ease-out forwards`,
          }}
        />
      ))}

      <style>{`
        ${stars.map((star) => `
          @keyframes starBurst-${star.angle} {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(${Math.cos(star.angle * Math.PI / 180) * star.speed}px, ${Math.sin(star.angle * Math.PI / 180) * star.speed}px) scale(0); opacity: 0; }
          }
        `).join('')}
      `}</style>

      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default MagicBentoCard;
