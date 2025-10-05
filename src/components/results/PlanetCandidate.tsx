import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Search, Star, AlertTriangle, Telescope, ArrowLeft, Eye } from 'lucide-react';

interface ResultData {
  status: 'Confirmed Exoplanet' | 'Planet Candidate' | 'False Positive';
  confidence: number;
  parameters: Record<string, { value: string; unit: string; label: string }>;
}

interface PlanetCandidateProps {
  result: ResultData;
  onBack: () => void;
}

const PlanetCandidate: React.FC<PlanetCandidateProps> = ({ result, onBack }) => {

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.7) return 'text-[var(--exo-warn)]';
    if (confidence > 0.5) return 'text-[var(--exo-accent)]';
    return 'text-[var(--exo-dim)]';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic mysterious scanning background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000814] via-[#1a1400] to-[#2a1810]">
        {/* Animated scanning beam */}
        <div className="absolute inset-0 scanning-beam opacity-20"></div>
        
        {/* Floating question mark particles with movement */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-[var(--exo-warn)] opacity-30 text-2xl animate-pulse floating-question cursor-pointer hover:opacity-60 hover:scale-125 transition-all duration-300"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            ?
          </div>
        ))}
        
        {/* Scanning grid lines */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`grid-h-${i}`}
            className="absolute w-full h-px bg-[var(--exo-warn)] opacity-10 scanning-grid-horizontal"
            style={{ 
              top: `${25 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
        
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`grid-v-${i}`}
            className="absolute h-full w-px bg-[var(--exo-warn)] opacity-10 scanning-grid-vertical"
            style={{ 
              left: `${30 + i * 20}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
        
        {/* Uncertainty particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`uncertainty-${i}`}
            className="absolute w-1 h-1 bg-[var(--exo-accent)] rounded-full opacity-40 uncertainty-drift"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
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

        {/* Central analysis area */}
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-4xl w-full text-center space-y-12">
            
            {/* Interactive scanning visualization */}
            <div className="relative w-80 h-80 mx-auto mb-16 group cursor-pointer">
              {/* Outer scanning rings with animation */}
              <div className="absolute inset-0 rounded-full border-2 border-[var(--exo-warn)]/40 group-hover:border-[var(--exo-warn)]/60 transition-all duration-500 candidate-scan-ring"></div>
              <div className="absolute inset-4 rounded-full border border-[var(--exo-warn)]/30 group-hover:border-[var(--exo-warn)]/50 transition-all duration-500 candidate-scan-ring" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Central scanning target with interactive hover */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32 rounded-full bg-[var(--exo-warn)]/20 flex items-center justify-center backdrop-blur-xl border border-[var(--exo-warn)]/50 group-hover:bg-[var(--exo-warn)]/30 group-hover:scale-105 transition-all duration-500">
                  <Search className="w-16 h-16 text-[var(--exo-warn)] group-hover:scale-110 transition-all duration-500" />
                  
                  {/* Dynamic orbs around center with hover interaction */}
                  <div className="absolute w-4 h-4 rounded-full bg-[var(--exo-warn)] blur-sm opacity-60 top-2 left-1/2 transform -translate-x-1/2 group-hover:opacity-80 group-hover:scale-125 transition-all duration-300 candidate-orbit-dot"></div>
                  <div className="absolute w-3 h-3 rounded-full bg-[var(--exo-accent)] blur-sm opacity-50 bottom-2 left-1/2 transform -translate-x-1/2 group-hover:opacity-70 group-hover:scale-125 transition-all duration-300 candidate-orbit-dot" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute w-2 h-2 rounded-full bg-[var(--exo-success)] blur-sm opacity-40 left-2 top-1/2 transform -translate-y-1/2 group-hover:opacity-60 group-hover:scale-125 transition-all duration-300 candidate-orbit-dot" style={{ animationDelay: '2s' }}></div>
                </div>
              </div>

              {/* Interactive analysis icons with hover effects */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 hover:scale-125 cursor-pointer candidate-float">
                <Eye className="w-6 h-6 text-[var(--exo-warn)] opacity-60 hover:opacity-100 transition-all duration-300" style={{ filter: 'drop-shadow(0 0 8px var(--exo-warn))' }} />
              </div>
              
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 hover:scale-125 cursor-pointer candidate-float" style={{ animationDelay: '1s' }}>
                <Telescope className="w-5 h-5 text-[var(--exo-accent)] opacity-60 hover:opacity-100 transition-all duration-300" style={{ filter: 'drop-shadow(0 0 6px var(--exo-accent))' }} />
              </div>
              
              {/* Additional interactive scanning indicators */}
              <div className="absolute top-1/4 right-8 transition-all duration-300 hover:scale-125 cursor-pointer candidate-float" style={{ animationDelay: '0.5s' }}>
                <AlertTriangle className="w-4 h-4 text-[var(--exo-warn)] opacity-50 hover:opacity-80 transition-all duration-300" />
              </div>
              
              <div className="absolute bottom-1/4 left-8 transition-all duration-300 hover:scale-125 cursor-pointer candidate-float" style={{ animationDelay: '1.5s' }}>
                <Star className="w-3 h-3 text-[var(--exo-accent)] opacity-50 hover:opacity-80 transition-all duration-300" />
              </div>
            </div>

            {/* Status and confidence */}
            <div className="space-y-6">
              <Badge className="bg-[var(--exo-warn)] text-[var(--exo-background)] font-semibold px-8 py-3 text-lg tracking-wider">
                CANDIDATE
              </Badge>
              
              {/* <div className="text-[var(--exo-dim)]">
                Analysis Confidence: <span className={`font-semibold text-xl ${getConfidenceColor(result.confidence)}`}>
                  {(result.confidence * 100).toFixed(1)}%
                </span>
              </div> */}
            </div>

            {/* Investigation message */}
            <div className="space-y-8">
              <h1 className="text-6xl font-light tracking-[0.1em] uppercase text-[var(--exo-ink)] leading-tight">
                Further
                <br />
                <span className="text-5xl text-[var(--exo-warn)] tracking-[0.15em]">
                  Investigation
                </span>
              </h1>
              
              <p className="text-xl text-[var(--exo-dim)] max-w-2xl mx-auto leading-relaxed">
                Intriguing signals detected! Your analysis reveals a planetary candidate that requires 
                additional observations to confirm its true nature. The cosmos holds its secrets carefully, 
                but we're on the right track.
              </p>
              
              <div className="flex items-center justify-center space-x-3 text-lg text-[var(--exo-warn)] font-medium">
                <AlertTriangle className="w-5 h-5" />
                <span>Requires Additional Analysis</span>
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>

            {/* Parameters summary with uncertainty indicators */}
            <div className="glass-panel rounded-2xl p-8 max-w-2xl mx-auto border-[var(--exo-warn)]/30">
              <h3 className="text-lg font-medium mb-6 text-[var(--exo-ink)] flex items-center justify-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Candidate Parameters</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(result.parameters).slice(0, 6).map(([key, data]) => (
                  <div key={key} className="flex justify-between items-center py-2 group">
                    <span className="text-[var(--exo-dim)] text-sm group-hover:text-[var(--exo-warn)] transition-colors">
                      {data.label}
                    </span>
                    <span className="text-[var(--exo-ink)] font-medium">
                      {data.value} {data.unit}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-[var(--exo-glass-border)] text-sm text-[var(--exo-dim)] italic">
                Additional spectroscopic analysis recommended for confirmation
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlanetCandidate;