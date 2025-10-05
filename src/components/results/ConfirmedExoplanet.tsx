import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle2, Star, Globe, Telescope, ArrowLeft } from 'lucide-react';

interface ResultData {
  status: 'Confirmed Exoplanet' | 'Planet Candidate' | 'False Positive';
  confidence: number;
  parameters: Record<string, { value: string; unit: string; label: string }>;
}

interface ConfirmedExoplanetProps {
  result: ResultData;
  onBack: () => void;
}

const ConfirmedExoplanet: React.FC<ConfirmedExoplanetProps> = ({ result, onBack }) => {

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced celebration background with dynamic elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000814] via-[#001a2e] to-[#002818]">
        {/* Success particle constellation */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[var(--exo-success)] opacity-70 animate-pulse transition-all duration-700 hover:scale-150 hover:opacity-100 cursor-pointer"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animationDelay: `${i * 0.4}s`,
              boxShadow: '0 0 8px var(--exo-success), 0 0 16px var(--exo-success)40',
            }}
          />
        ))}
        
        {/* Dynamic success rays */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`ray-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-[var(--exo-success)]20 to-transparent opacity-30 animate-pulse"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* Orbital celebration elements */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`orbit-${i}`}
            className="absolute w-2 h-2 rounded-full bg-[var(--exo-accent)] opacity-50 animate-pulse"
            style={{
              left: `${25 + i * 25}%`,
              top: `${30 + Math.random() * 40}%`,
              animationDelay: `${i * 0.8}s`,
              filter: 'brightness(1.3) saturate(1.2)',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-[var(--exo-dim)] hover:text-[var(--exo-ink)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Analysis
          </Button>
        </header>

        {/* Central celebration area */}
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-4xl w-full text-center space-y-12">
            
            {/* Dynamic success visualization */}
            <div className="relative w-80 h-80 mx-auto mb-16 group">
              {/* Animated confirmation rings */}
              <div className="absolute inset-0 rounded-full border-2 border-[var(--exo-success)]/40 animate-pulse"></div>
              <div className="absolute inset-4 rounded-full border border-[var(--exo-success)]/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-8 rounded-full border border-[var(--exo-success)]/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              {/* Central confirmed icon with glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32 rounded-full bg-[var(--exo-success)]/20 flex items-center justify-center backdrop-blur-xl border border-[var(--exo-success)]/50 transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--exo-success)]/30">
                  <CheckCircle2 className="w-16 h-16 text-[var(--exo-success)] transition-all duration-500 group-hover:scale-110" />
                  
                  {/* Success pulse effect */}
                  <div className="absolute inset-0 rounded-full bg-[var(--exo-success)]/10 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Interactive orbiting elements with orbital animation */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 hover:scale-125 cursor-pointer confirmed-orbit-1">
                <Star className="w-6 h-6 text-[var(--exo-success)] opacity-70 hover:opacity-100 transition-all duration-300" style={{ filter: 'drop-shadow(0 0 8px var(--exo-success))' }} />
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 hover:scale-125 cursor-pointer confirmed-orbit-2">
                <Globe className="w-5 h-5 text-[var(--exo-success)] opacity-70 hover:opacity-100 transition-all duration-300" style={{ filter: 'drop-shadow(0 0 6px var(--exo-success))' }} />
              </div>
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2 transition-all duration-300 hover:scale-125 cursor-pointer confirmed-orbit-3">
                <Telescope className="w-5 h-5 text-[var(--exo-success)] opacity-70 hover:opacity-100 transition-all duration-300" style={{ filter: 'drop-shadow(0 0 6px var(--exo-success))' }} />
              </div>
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 transition-all duration-300 hover:scale-125 cursor-pointer confirmed-orbit-4">
                <Star className="w-4 h-4 text-[var(--exo-success)] opacity-70 hover:opacity-100 transition-all duration-300" style={{ filter: 'drop-shadow(0 0 5px var(--exo-success))' }} />
              </div>
              
              {/* Dynamic discovery indicators */}
              <div className="absolute top-16 right-16 w-2 h-2 rounded-full bg-[var(--exo-accent)] opacity-60 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-16 left-16 w-1.5 h-1.5 rounded-full bg-[var(--exo-warn)] opacity-50 animate-pulse" style={{ animationDelay: '0.7s' }}></div>
              <div className="absolute top-20 left-20 w-1 h-1 rounded-full bg-[var(--exo-success)] opacity-80 animate-pulse" style={{ animationDelay: '1.1s' }}></div>
            </div>

            {/* Status and confidence */}
            <div className="space-y-6">
              <Badge className="bg-[var(--exo-success)] text-[var(--exo-background)] font-semibold px-8 py-3 text-lg tracking-wider">
                CONFIRMED EXOPLANET
              </Badge>
              
              {/* <div className="text-[var(--exo-dim)]">
                Analysis Confidence: <span className="text-[var(--exo-success)] font-semibold text-xl">
                  {(result.confidence * 100).toFixed(1)}%
                </span>
              </div> */}
            </div>

            {/* Enhanced celebration message */}
            <div className="space-y-8">
              <h1 className="text-6xl font-light tracking-[0.1em] uppercase text-[var(--exo-ink)] leading-tight group cursor-default">
                <span className="transition-all duration-500 group-hover:tracking-[0.12em]">Discovery</span>
                <br />
                <span className="text-5xl text-[var(--exo-success)] tracking-[0.15em] transition-all duration-500 group-hover:tracking-[0.17em] group-hover:text-shadow-lg">
                  Confirmed
                </span>
              </h1>
              
              <p className="text-xl text-[var(--exo-dim)] max-w-2xl mx-auto leading-relaxed transition-colors duration-300 hover:text-[var(--exo-ink)]">
                Congratulations! Your analysis has revealed a confirmed exoplanet. 
                This celestial body exhibits all the characteristics of a genuine planetary system, 
                marking another extraordinary step in our cosmic exploration.
              </p>
              
              <div className="text-lg text-[var(--exo-accent)] italic font-light transition-all duration-300 hover:text-[var(--exo-success)] hover:scale-105 cursor-default">
                <Star className="inline w-4 h-4 mr-2 opacity-60" />
                "We are one step closer to answering: Are we alone?"
                <Star className="inline w-4 h-4 ml-2 opacity-60" />
              </div>
              
              {/* Achievement celebration */}
              <div className="flex items-center justify-center space-x-3 text-[var(--exo-success)] font-medium">
                <CheckCircle2 className="w-5 h-5 animate-pulse" />
                <span className="tracking-wider">MISSION ACCOMPLISHED</span>
                <CheckCircle2 className="w-5 h-5 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>

            {/* Enhanced parameters summary */}
            <div className="glass-panel rounded-2xl p-8 max-w-2xl mx-auto border-[var(--exo-success)]/30 hover:border-[var(--exo-success)]/50 transition-all duration-500 group">
              <h3 className="text-lg font-medium mb-6 text-[var(--exo-ink)] flex items-center justify-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-[var(--exo-success)]" />
                <span>Confirmed Discovery Parameters</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(result.parameters).slice(0, 6).map(([key, data], index) => (
                  <div key={key} className="flex justify-between items-center py-2 group/param hover:bg-[var(--exo-success)]/5 rounded-lg px-2 transition-all duration-300">
                    <span className="text-[var(--exo-dim)] text-sm group-hover/param:text-[var(--exo-success)] transition-colors duration-300">{data.label}</span>
                    <span className="text-[var(--exo-ink)] font-medium group-hover/param:text-[var(--exo-success)] transition-colors duration-300">
                      {data.value} {data.unit}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-[var(--exo-glass-border)] text-center">
                <div className="text-sm text-[var(--exo-success)] font-medium flex items-center justify-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>Exoplanet Status: Confirmed</span>
                  <Star className="w-4 h-4" />
                </div>
                <div className="text-xs text-[var(--exo-dim)] mt-2 italic">
                  Ready for further scientific investigation
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConfirmedExoplanet;