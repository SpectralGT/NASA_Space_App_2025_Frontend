import React, { useState, useEffect } from 'react';
import imgElement from "figma:asset/ecd43d9978f193734d73623e69473d3ba869ef48.png";
import imgElement1 from "figma:asset/0d3bac4e2fe634f771ae8a8ef8d8f67615772877.png";

const StarfieldBackground: React.FC = () => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  // Generate very rare, elegant shooting stars
  const shootingStars = React.useMemo(() => {
    return Array.from({ length: 2 }, (_, i) => ({
      id: i,
      startX: 100 + Math.random() * 20, // Start off-screen right
      startY: Math.random() * 30, // Start from top
      endX: -20, // End off-screen left
      endY: Math.random() * 40 + 60, // End towards bottom
      duration: Math.random() * 8 + 25, // 25-33 seconds for very elegant movement
      delay: Math.random() * 45 + 30, // 30-75 second delays - very rare
      size: 0.8 + Math.random() * 0.4, // More consistent sizing
      rotation: -25 + Math.random() * 10, // More consistent diagonal fall
      elementType: i, // Use different elements for variety
    }));
  }, []);

  // Generate evenly distributed interactive stars using grid-based positioning
  const stars = React.useMemo(() => {
    const starArray = [];
    const gridCols = 24; // Increased for more stars
    const gridRows = 16; // Increased for more stars
    
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        // Skip some stars randomly for natural distribution (reduced threshold for more stars)
        if (Math.random() > 0.35) {
          const baseX = (col / gridCols) * 100;
          const baseY = (row / gridRows) * 100;
          
          starArray.push({
            id: row * gridCols + col,
            x: baseX + (Math.random() - 0.5) * 6, // Slightly tighter randomness for better distribution
            y: baseY + (Math.random() - 0.5) * 6,
            size: Math.random() * 1.6 + 0.3, // Slightly smaller range for subtlety
            baseOpacity: Math.random() * 0.5 + 0.2,
            twinkleDelay: Math.random() * 25 + 10, // Much longer delays - 10-35 seconds
            twinkleDuration: Math.random() * 6 + 8, // 8-14 second cycles - much slower
            brightness: Math.random() * 0.7 + 0.3, // Wider brightness range
            interactive: Math.random() > 0.88, // Only 12% of stars are interactive - less distraction
          });
        }
      }
    }
    
    return starArray;
  }, []);

  // Generate special interactive moving dots
  const movingDots = React.useMemo(() => {
    return Array.from({ length: 2 }, (_, i) => ({
      id: `moving-${i}`,
      startX: 20 + Math.random() * 60,
      startY: 20 + Math.random() * 60,
      size: 2 + Math.random() * 3,
      color: i === 0 ? 'var(--exo-accent)' : 'var(--exo-success)',
      duration: 80 + Math.random() * 40, // 80-120 seconds - much slower
      delay: i * 60, // Much longer stagger - 60 seconds apart
    }));
  }, []);

  const getShootingStarElement = (type: number) => {
    return type === 0 ? imgElement : imgElement1;
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000814] via-[#001122] to-[#000308]"></div>

      {/* Dynamic interactive nebula gradients - distributed across the screen */}
      <div 
        className="absolute top-1/4 right-1/6 w-1/5 h-1/5 nebula-drift-gentle pointer-events-none"
      >
        <div 
          className="w-full h-full rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(233, 217, 176, 0.0006) 0%, rgba(147, 51, 234, 0.0003) 50%, transparent 100%)'
          }}
        ></div>
      </div>
      
      <div 
        className="absolute bottom-1/3 left-1/5 w-1/6 h-1/6 nebula-drift-alt pointer-events-none"
      >
        <div 
          className="w-full h-full rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(73, 225, 166, 0.0006) 0%, rgba(99, 102, 241, 0.0003) 60%, transparent 100%)'
          }}
        ></div>
      </div>

      {/* Evenly distributed interactive stars */}
      <div className="absolute inset-0 stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full transition-all duration-300 cursor-pointer ${
              star.interactive ? 'interactive-star' : 'static-star'
            }`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: hoveredStar === star.id ? 1 : star.baseOpacity,
              background: hoveredStar === star.id 
                ? `radial-gradient(circle, rgba(233, 217, 176, 1) 0%, rgba(233, 217, 176, 0.8) 40%, transparent 100%)`
                : `rgba(255, 255, 255, ${star.brightness})`,
              boxShadow: hoveredStar === star.id 
                ? '0 0 20px rgba(233, 217, 176, 0.8), 0 0 40px rgba(233, 217, 176, 0.4)'
                : star.interactive 
                ? '0 0 4px rgba(255, 255, 255, 0.3)'
                : 'none',
              animationDelay: `${star.twinkleDelay}s`,
              animationDuration: `${star.twinkleDuration}s`,
              transform: hoveredStar === star.id ? 'scale(2.5)' : 'scale(1)',
            }}
            onMouseEnter={() => star.interactive && setHoveredStar(star.id)}
            onMouseLeave={() => star.interactive && setHoveredStar(null)}
          />
        ))}
      </div>

      {/* Special interactive moving dots */}
      <div className="absolute inset-0">
        {movingDots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full interactive-moving-dot transition-all duration-500 cursor-pointer"
            style={{
              '--start-x': `${dot.startX}%`,
              '--start-y': `${dot.startY}%`,
              '--duration': `${dot.duration}s`,
              '--delay': `${dot.delay}s`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              background: `radial-gradient(circle, ${dot.color} 0%, ${dot.color}80 60%, transparent 100%)`,
              boxShadow: `0 0 10px ${dot.color}60, 0 0 20px ${dot.color}30`,
              filter: `brightness(1.2) saturate(1.1)`,
              animationDelay: `${dot.delay}s`,
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(2.5)';
              e.currentTarget.style.filter = 'brightness(1.8) saturate(1.4)';
              e.currentTarget.style.boxShadow = `0 0 25px ${dot.color}, 0 0 50px ${dot.color}80`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'brightness(1.2) saturate(1.1)';
              e.currentTarget.style.boxShadow = `0 0 10px ${dot.color}60, 0 0 20px ${dot.color}30`;
            }}
          />
        ))}
      </div>

      {/* Elegant shooting stars */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute shooting-star-elegant"
          style={{
            '--start-x': `${star.startX}vw`,
            '--start-y': `${star.startY}vh`,
            '--end-x': `${star.endX}vw`,
            '--end-y': `${star.endY}vh`,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
            '--rotation': `${star.rotation}deg`,
            '--size': star.size,
            left: `${star.startX}vw`,
            top: `${star.startY}vh`,
            animationDelay: `${star.delay}s`,
          } as React.CSSProperties}
        >
          <div 
            className="w-[80px] h-[20px] opacity-60 shooting-star-glow-elegant"
            style={{
              transform: `rotate(${star.rotation}deg) scale(${star.size})`,
            }}
          >
            <img
              alt=""
              className="w-full h-full object-contain filter brightness-125 drop-shadow-lg"
              src={getShootingStarElement(star.elementType)}
            />
          </div>
        </div>
      ))}

      {/* Ultra-subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-[var(--exo-accent)] rounded-full blur-3xl opacity-[0.001] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/2 right-1/3 w-64 h-64 bg-[var(--exo-success)] rounded-full blur-3xl opacity-[0.0008] animate-pulse" style={{ animationDelay: '12s', animationDuration: '10s' }}></div>
      </div>
    </div>
  );
};

export default StarfieldBackground;