import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X, AlertCircle, Zap, RotateCcw, ArrowLeft, TrendingDown } from 'lucide-react';

interface ResultData {
  status: 'Confirmed Exoplanet' | 'Planet Candidate' | 'False Positive';
  confidence: number;
  parameters: Record<string, { value: string; unit: string; label: string }>;
}

interface FalsePositiveProps {
  result: ResultData;
  onBack: () => void;
}

const FalsePositive: React.FC<FalsePositiveProps> = ({ result, onBack }) => {

  const getAnalysisExplanation = () => {
    const scenarios = [
      "Stellar activity mimicking planetary transit",
      "Background binary star interference", 
      "Instrumental noise correlation",
      "Systematic measurement error",
      "Stellar variability pattern"
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic disrupted signal background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000814] via-[#1a0808] to-[#2a0000]">
        {/* Animated signal disruption effects - falling red lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 bg-[var(--exo-danger)] opacity-50 animate-pulse signal-disruption-fall"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${15 + Math.random() * 60}px`,
              top: '-50px',
              animationDelay: `${(i * 0.3) + Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* Dynamic glitch lines that slide across */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`glitch-${i}`}
            className="absolute h-px bg-[var(--exo-danger)] opacity-30 glitch-slide"
            style={{ 
              top: `${10 + i * 15}%`,
              width: `${30 + Math.random() * 40}%`,
              left: '-50%',
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* Flickering interference patterns */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`interference-${i}`}
            className="absolute w-2 h-2 bg-[var(--exo-danger)] rounded-full opacity-60 interference-flicker"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + Math.random()}s`,
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

        {/* Central disruption visualization */}
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-4xl w-full text-center space-y-12">
            
            {/* Interactive disrupted signal visualization */}
            <div className="relative w-80 h-80 mx-auto mb-16 group cursor-pointer">
              {/* Disrupted signal rings with glitch effects */}
              <div className="absolute inset-0 rounded-full border-2 border-[var(--exo-danger)]/40 group-hover:border-[var(--exo-danger)]/60 transition-all duration-300 false-positive-glitch"></div>
              <div className="absolute inset-4 rounded-full border border-[var(--exo-danger)]/30 group-hover:border-[var(--exo-danger)]/50 transition-all duration-300 false-positive-glitch" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute inset-8 rounded-full border border-[var(--exo-danger)]/20 group-hover:border-[var(--exo-danger)]/40 transition-all duration-300 false-positive-glitch" style={{ animationDelay: '0.6s' }}></div>
              
              {/* Central disrupted core with interactive effects */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32 rounded-full bg-[var(--exo-danger)]/20 flex items-center justify-center backdrop-blur-xl border border-[var(--exo-danger)]/50 group-hover:bg-[var(--exo-danger)]/30 group-hover:scale-105 transition-all duration-500">
                  <X className="w-16 h-16 text-[var(--exo-danger)] group-hover:scale-110 transition-all duration-500" />
                  
                  {/* Interactive interference with hover enhancement */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-[var(--exo-danger)] rounded-full opacity-60 animate-pulse group-hover:opacity-80 group-hover:scale-150 transition-all duration-300 cursor-pointer"
                      style={{
                        left: `${30 + Math.random() * 40}%`,
                        top: `${30 + Math.random() * 40}%`,
                        animationDelay: `${i * 0.2}s`,
                        filter: 'drop-shadow(0 0 4px var(--exo-danger))',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Interactive error indicators with hover effects */}
              <div className="absolute top-8 right-8 transition-all duration-300 hover:scale-125 cursor-pointer false-positive-shake">
                <AlertCircle className="w-6 h-6 text-[var(--exo-danger)] opacity-60 hover:opacity-100 transition-all duration-300" style={{ filter: 'drop-shadow(0 0 8px var(--exo-danger))' }} />
              </div>
              
              <div className="absolute bottom-8 left-8 transition-all duration-300 hover:scale-125 cursor-pointer false-positive-shake" style={{ animationDelay: '0.5s' }}>
                <Zap className="w-5 h-5 text-[var(--exo-danger)] opacity-60 hover:opacity-100 transition-all duration-300" style={{ filter: 'drop-shadow(0 0 6px var(--exo-danger))' }} />
              </div>
              
              {/* Additional interactive disruption indicators */}
              <div className="absolute top-1/4 left-8 transition-all duration-300 hover:scale-125 cursor-pointer false-positive-shake" style={{ animationDelay: '0.2s' }}>
                <TrendingDown className="w-4 h-4 text-[var(--exo-danger)] opacity-50 hover:opacity-80 transition-all duration-300" />
              </div>
              
              <div className="absolute bottom-1/4 right-8 transition-all duration-300 hover:scale-125 cursor-pointer false-positive-shake" style={{ animationDelay: '0.7s' }}>
                <RotateCcw className="w-4 h-4 text-[var(--exo-danger)] opacity-50 hover:opacity-80 transition-all duration-300" />
              </div>
            </div>

            {/* Status and confidence */}
            <div className="space-y-6">
              <Badge className="bg-[var(--exo-danger)] text-[var(--exo-ink)] font-semibold px-8 py-3 text-lg tracking-wider">
                FALSE POSITIVE
              </Badge>
              
              {/* <div className="text-[var(--exo-dim)]">
                Analysis Confidence: <span className="text-[var(--exo-danger)] font-semibold text-xl">
                  {(result.confidence * 100).toFixed(1)}%
                </span>
              </div> */}
            </div>

            {/* Learning experience message */}
            <div className="space-y-8">
              <h1 className="text-6xl font-light tracking-[0.1em] uppercase text-[var(--exo-ink)] leading-tight">
                Signal
                <br />
                <span className="text-5xl text-[var(--exo-danger)] tracking-[0.15em]">
                  Disrupted
                </span>
              </h1>
              
              <p className="text-xl text-[var(--exo-dim)] max-w-2xl mx-auto leading-relaxed">
                Analysis indicates a false positive detection. While this isn't a planet, 
                every measurement brings us closer to understanding cosmic phenomena. 
                Science advances through both discoveries and eliminations.
              </p>
              
              <div className="flex items-center justify-center space-x-3 text-lg text-[var(--exo-accent)] font-medium">
                <TrendingDown className="w-5 h-5" />
                <span>Continue the Search</span>
                <RotateCcw className="w-5 h-5" />
              </div>
            </div>

            {/* Diagnostic summary */}
            <div className="glass-panel rounded-2xl p-8 max-w-2xl mx-auto border-[var(--exo-danger)]/30">
              <h3 className="text-lg font-medium mb-6 text-[var(--exo-ink)] flex items-center justify-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>Signal Analysis</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.entries(result.parameters).slice(0, 6).map(([key, data]) => (
                  <div key={key} className="flex justify-between items-center py-2 group">
                    <span className="text-[var(--exo-dim)] text-sm group-hover:text-[var(--exo-danger)] transition-colors">
                      {data.label}
                    </span>
                    <span className="text-[var(--exo-ink)] font-medium opacity-60">
                      {data.value} {data.unit}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-[var(--exo-glass-border)] space-y-3">
                <div className="text-sm text-[var(--exo-danger)] font-medium">
                  Likely Cause: {getAnalysisExplanation()}
                </div>
                <div className="text-sm text-[var(--exo-dim)] italic">
                  Each false positive refines our detection algorithms
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FalsePositive;