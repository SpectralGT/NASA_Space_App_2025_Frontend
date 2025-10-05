import React, { useState } from 'react';
import { Button } from './ui/button';

interface HeroCardProps {
  onSubmit: () => void;
  isComplete: boolean;
  isAnalyzing: boolean;
}

const HeroCard: React.FC<HeroCardProps> = ({ onSubmit, isComplete, isAnalyzing }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex-1 glass-panel rounded-3xl p-12 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced background glow effect */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isHovered ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(233, 217, 176, 0.1) 0%, transparent 70%)'
        }}
      />
      
      <div className="max-w-2xl space-y-8 relative z-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-1 h-8 bg-[var(--exo-accent)] rounded-full opacity-60"></div>
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--exo-dim)] font-medium">
                EXOPLANET DISCOVERY SYSTEM
              </span>
            </div>
            <h1 className="text-5xl font-light tracking-[0.08em] uppercase text-[var(--exo-ink)] leading-tight">
              Welcome!
              <br />
              <span className="text-4xl tracking-[0.12em]">
                Explore the Unknown!
              </span>
            </h1>
          </div>
          
          <p className="text-lg text-[var(--exo-dim)] font-light leading-relaxed tracking-wide">
            Complete the 8 key parameters to unlock your discovery
          </p>
        </div>
        
        <div className="space-y-6">
          <Button
            onClick={onSubmit}
            disabled={!isComplete || isAnalyzing}
            className={`
              bg-[var(--exo-accent)] hover:bg-[var(--exo-accent)]/90 
              text-[var(--exo-background)] font-semibold 
              px-16 py-5 rounded-full text-lg tracking-[0.1em] uppercase
              transition-all duration-300 ease-out
              hover:transform hover:translate-y-[-3px] 
              hover:shadow-2xl hover:shadow-[var(--exo-accent)]/30
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              relative overflow-hidden group
              ${isComplete && !isAnalyzing ? 'animate-pulse' : ''}
            `}
            style={{
              boxShadow: isComplete && !isAnalyzing 
                ? '0 0 30px rgba(233, 217, 176, 0.4), 0 8px 25px rgba(0, 0, 0, 0.3)' 
                : '0 4px 15px rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            
            {isAnalyzing ? (
              <div className="flex items-center space-x-3 relative z-10">
                <div className="w-5 h-5 border-2 border-[var(--exo-background)] border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              <span className="relative z-10">Enter</span>
            )}
          </Button>
          
          <div className="flex items-center">
            <p className="text-sm text-[var(--exo-dim)] font-light italic">
              Another step toward answering: Are we alone?
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-8 right-8 w-2 h-2 bg-[var(--exo-accent)] rounded-full opacity-40"></div>
      <div className="absolute bottom-8 left-8 w-1 h-1 bg-[var(--exo-success)] rounded-full opacity-60"></div>
    </div>
  );
};

export default HeroCard;