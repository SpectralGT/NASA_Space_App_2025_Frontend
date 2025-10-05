import React, { useState, useEffect } from 'react';
import StarfieldBackground from './components/StarfieldBackground';
import ParametersPanel from './components/ParametersPanel';
import HeroCard from './components/HeroCard';
import ConfirmedExoplanet from './components/results/ConfirmedExoplanet';
import PlanetCandidate from './components/results/PlanetCandidate';
import FalsePositive from './components/results/FalsePositive';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

interface ParameterField {
  id: string;
  label: string;
  unit: string;
  description: string;
  value: string;
}

interface ResultData {
  status: 'Confirmed Exoplanet' | 'Planet Candidate' | 'False Positive';
  confidence: number;
  parameters: Record<string, { value: string; unit: string; label: string }>;
}

export default function App() {
  const [parameters, setParameters] = useState<ParameterField[]>([
    {
      id: 'disposition_score',
      label: 'Disposition Score',
      unit: 'No Units',
      description: 'Disposition Score',
      value: ''
    },
    {
      id: 'orbital_period',
      label: 'Orbital Period',
      unit: 'Days',
      description: 'Length of the planet\'s year.',
      value: ''
    },
    {
      id: 'planetary_radius',
      label: 'Planetary Radius',
      unit: 'R⊕',
      description: 'Relative to Earth\'s radius.',
      value: ''
    },
    {
      id: 'equilibrium_temperature',
      label: 'Equilibrium Temperature',
      unit: 'K',
      description: 'Black-body estimate assuming no atmosphere.',
      value: ''
    },
    {
      id: 'insolation_flux',
      label: 'Insolation Flux',
      unit: 'S⊕',
      description: 'Stellar energy at the planet vs. Earth = 1.',
      value: ''
    },
    {
      id: 'transit_snr',
      label: 'Transit Signal-to-Noise',
      unit: 'SNR',
      description: 'Detection confidence of the transit signal.',
      value: ''
    },
    {
      id: 'transit_depth',
      label: 'Transit Depth',
      unit: 'ppm',
      description: 'Stellar light blocked during transit.',
      value: ''
    },
    {
      id: 'transit_duration',
      label: 'Transit Duration',
      unit: 'Hours',
      description: 'Total time of the transit event.',
      value: ''
    },
    {
      id: 'stellar_radius',
      label: 'Stellar Radius',
      unit: 'R⊙',
      description: 'Host star radius relative to our Sun.',
      value: ''
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);
  const [currentView, setCurrentView] = useState<'main' | 'result'>('main');

  // Load parameters from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const updatedParameters = parameters.map(param => ({
      ...param,
      value: urlParams.get(param.id) || ''
    }));
    setParameters(updatedParameters);
  }, []);

  const handleParameterChange = (id: string, value: string) => {
    setParameters(prev => prev.map(param =>
      param.id === id ? { ...param, value } : param
    ));
  };

  const completedCount = parameters.filter(param => param.value.trim() !== '').length;
  const isComplete = completedCount === parameters.length;

  // Demo classifier function - this would be replaced with actual model
  const demoClassifier = async (params: Record<string, number>): ResultData => {
    // Simple demo logic based on parameter ranges
    
    let prediction = 0;

    async function getPrediction(features: Number[]) {


      const response = await fetch("https://nasa-space-app-2025-backend.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }) // Array of numbers
      });



      const data = await response.json();
      prediction = data.prediction;

    }

    // Example input: 9 features
    await getPrediction([params.disposition_score,params.orbital_period,params.planetary_radius,params.equilibrium_temperature,params.insolation_flux,params.transit_snr,params.transit_depth,params.transit_duration,params.stellar_radius]);



    let status : 'Confirmed Exoplanet' | 'Planet Candidate' | 'False Positive';
    let confidence: number;

    status = 'False Positive'
    // Demo classification logic
    if(prediction==0){
        status = 'Confirmed Exoplanet';
    }
    if(prediction==1){
      status = 'Planet Candidate';
    }
    if(
      prediction == 2
    ){
      status = 'False Positive';
    }


    confidence = 1;

    const parameterData: Record<string, { value: string; unit: string; label: string }> = {};
    parameters.forEach(param => {
      parameterData[param.id] = {
        value: param.value,
        unit: param.unit,
        label: param.label
      };
    });

    return { status, confidence, parameters: parameterData };
  };

  const handleSubmit = async () => {
    if (!isComplete) {
      toast.error('Please complete all 8 parameters before analyzing.');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Convert parameters to numbers for analysis
      const paramValues: Record<string, number> = {};
      parameters.forEach(param => {
        paramValues[param.id] = parseFloat(param.value);
      });

      // Simulate API call delay

      // In a real implementation, this would call /api/classify
      // const response = await fetch('/api/classify', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(paramValues)
      // });
      // const result = await response.json();

      const analysisResult = await demoClassifier(paramValues);
      setResult(analysisResult);
      setCurrentView('result');

    } catch (error) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle keyboard submission
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && isComplete && !isAnalyzing) {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.tagName === 'INPUT') {
          handleSubmit();
        }
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [isComplete, isAnalyzing]);

  const handleBackToMain = () => {
    setCurrentView('main');
    setResult(null);
  };

  const renderResultPage = () => {
    if (!result) return null;

    switch (result.status) {
      case 'Confirmed Exoplanet':
        return <ConfirmedExoplanet result={result} onBack={handleBackToMain} />;
      case 'Planet Candidate':
        return <PlanetCandidate result={result} onBack={handleBackToMain} />;
      case 'False Positive':
        return <FalsePositive result={result} onBack={handleBackToMain} />;
      default:
        return null;
    }
  };

  if (currentView === 'result') {
    return (
      <>
        <StarfieldBackground />
        {renderResultPage()}
      </>
    );
  }

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-16 relative">
          {/* Decorative top border with enhanced glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--exo-accent)]/30 to-transparent"></div>

          <div className="max-w-7xl mx-auto px-8 relative">
            <div className="text-center space-y-4 relative">
              {/* Dynamic constellation around header */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-[var(--exo-accent)] rounded-full opacity-40 header-constellation animate-pulse"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.8}s`,
                      animationDuration: `${4 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>

              <h1 className="text-5xl font-light tracking-[0.4em] uppercase text-[var(--exo-ink)] relative group cursor-default">
                <span className="relative z-10 transition-all duration-500 group-hover:tracking-[0.45em] inline-block header-text-float">EXOQUEST</span>
                {/* Enhanced glow effects with subtle movement */}
                <div className="absolute inset-0 text-5xl font-light tracking-[0.4em] uppercase text-[var(--exo-accent)] opacity-30 blur-sm group-hover:opacity-40 transition-opacity duration-500 header-glow-drift">
                  EXOQUEST
                </div>
                <div className="absolute inset-0 text-5xl font-light tracking-[0.4em] uppercase text-[var(--exo-accent)] opacity-10 blur-lg">
                  EXOQUEST

                </div>



              </h1>

              {/* Enhanced tagline with subtle interaction */}
              <p className="text-sm tracking-[0.3em] uppercase text-[var(--exo-dim)] opacity-60 transition-all duration-300 hover:opacity-80 hover:tracking-[0.32em] cursor-default tagline-subtle">
                Beyond the Known Universe
              </p>
            </div>

            {/* Enhanced interactive decorative elements */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3">
              <div className="w-2 h-2 bg-[var(--exo-accent)] rounded-full opacity-70 animate-pulse cursor-pointer transition-all duration-3000 hover:scale-150 hover:opacity-60 decorative-orbit" title="Stellar Classification"></div>
              <div className="w-1 h-1 bg-[var(--exo-success)] rounded-full opacity-50 animate-pulse cursor-pointer transition-all duration-3000 hover:scale-200 hover:opacity-40 decorative-orbit" style={{ animationDelay: '5s' }} title="Confirmed Detection"></div>
              <div className="w-1.5 h-1.5 bg-[var(--exo-warn)] rounded-full opacity-30 animate-pulse cursor-pointer transition-all duration-3000 hover:scale-175 hover:opacity-80 decorative-orbit" style={{ animationDelay: '2s' }} title="Analysis Status"></div>
            </div>

            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3">
              <div className="w-1 h-1 bg-[var(--exo-accent)] rounded-full opacity-40 animate-pulse cursor-pointer transition-all duration-3000 hover:scale-200 hover:opacity-90 decorative-orbit" style={{ animationDelay: '0.5s' }} title="System Parameters"></div>
              <div className="w-1.5 h-1.5 bg-[var(--exo-success)] rounded-full opacity-60 animate-pulse cursor-pointer transition-all duration-3000 hover:scale-175 hover:opacity-100 decorative-orbit" style={{ animationDelay: '1.5s' }} title="Discovery Vector"></div>
            </div>

            {/* Subtle connecting lines between decorative elements */}
            <div className="absolute right-8 top-1/2 w-16 h-px bg-gradient-to-l from-[var(--exo-accent)]/20 to-transparent connection-line"></div>
            <div className="absolute left-8 top-1/2 w-16 h-px bg-gradient-to-r from-[var(--exo-accent)]/20 to-transparent connection-line" style={{ animationDelay: '1s' }}></div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-8 pb-8">
          <div className="flex gap-8 h-full">
            <ParametersPanel
              parameters={parameters}
              onParameterChange={handleParameterChange}
              completedCount={completedCount}
            />

            <HeroCard
              onSubmit={handleSubmit}
              isComplete={isComplete}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </main>
      </div>

      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--exo-background-secondary)',
            border: '1px solid var(--exo-glass-border)',
            color: 'var(--exo-ink)',
          },
        }}
      />
    </div>
  );
}