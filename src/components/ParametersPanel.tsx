import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle2, Circle } from 'lucide-react';

interface ParameterField {
  id: string;
  label: string;
  unit: string;
  description: string;
  value: string;
}

interface ParametersPanelProps {
  parameters: ParameterField[];
  onParameterChange: (id: string, value: string) => void;
  completedCount: number;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({
  parameters,
  onParameterChange,
  completedCount,
}) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const progressPercentage = (completedCount / parameters.length) * 100;

  return (
    <div className="w-[440px] glass-enhanced rounded-3xl p-8 space-y-6 relative overflow-hidden">
      {/* Header with enhanced styling */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-[var(--exo-accent)] rounded-full animate-pulse"></div>
          <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--exo-dim)]">
            Mission Parameters
          </h2>
        </div>
        
        <div className="glass-panel rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--exo-dim)] tracking-wide">Data Collection Progress</span>
            <span className="text-[var(--exo-ink)] font-medium">
              {completedCount} / {parameters.length}
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-[var(--exo-background-secondary)] rounded-full overflow-hidden"
          />
          <div className={`text-xs transition-all duration-300 ${
            progressPercentage === 100 
              ? 'text-[var(--exo-success)] font-medium' 
              : 'text-[var(--exo-dim)]'
          }`}>
            {progressPercentage === 100 
              ? '✓ Ready for cosmic discovery' 
              : `${Math.round(progressPercentage)}% complete`}
          </div>
        </div>
      </div>
      
      {/* Parameters list */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
        {parameters.map((param, index) => {
          const isCompleted = param.value.trim() !== '';
          const isFocused = focusedField === param.id;
          
          return (
            <div 
              key={param.id} 
              className={`parameter-item transition-all duration-300 ${
                isFocused ? 'scale-[1.02] z-10' : ''
              }`}
            >
              <div className={`glass-panel rounded-xl p-5 space-y-4 relative overflow-hidden transition-all duration-300 ${
                isCompleted 
                  ? 'border-[var(--exo-success)]/30 bg-gradient-to-br from-[var(--exo-success)]/5 to-transparent' 
                  : isFocused 
                  ? 'border-[var(--exo-accent)]/40 bg-gradient-to-br from-[var(--exo-accent)]/5 to-transparent'
                  : ''
              }`}>
                {/* Parameter number indicator */}
                <div className="absolute top-3 right-3 flex items-center space-x-2">
                  <span className="text-xs text-[var(--exo-dim)] opacity-60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[var(--exo-success)]" />
                  ) : (
                    <Circle className="w-4 h-4 text-[var(--exo-dim)] opacity-40" />
                  )}
                </div>
                
                <div className="flex items-start justify-between pr-12">
                  <div className="space-y-1">
                    <Label 
                      htmlFor={param.id}
                      className="text-[var(--exo-ink)] font-medium tracking-wide text-sm uppercase"
                    >
                      {param.label}
                    </Label>
                    <p className="text-xs text-[var(--exo-dim)] leading-tight max-w-[280px]">
                      {param.description}
                    </p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs font-mono transition-colors duration-200 ${
                      isCompleted 
                        ? 'bg-[var(--exo-success)]/20 text-[var(--exo-success)] border-[var(--exo-success)]/30'
                        : 'bg-[var(--exo-background-secondary)] text-[var(--exo-dim)] border-[var(--exo-glass-border)]'
                    }`}
                  >
                    {param.unit}
                  </Badge>
                </div>
                
                <Input
                  id={param.id}
                  type="number"
                  step="any"
                  value={param.value}
                  onChange={(e) => onParameterChange(param.id, e.target.value)}
                  onFocus={() => setFocusedField(param.id)}
                  onBlur={() => setFocusedField(null)}
                  className={`
                    bg-[var(--input-background)] border-[var(--exo-glass-border)] 
                    text-[var(--exo-ink)] placeholder-[var(--exo-dim)] 
                    transition-all duration-200 rounded-lg h-11
                    focus:border-[var(--exo-accent)] focus:ring-2 focus:ring-[var(--exo-accent)]/20
                    hover:border-[var(--exo-accent)]/50
                    ${isCompleted ? 'border-[var(--exo-success)]/30' : ''}
                  `}
                  placeholder="Enter value..."
                />
                
                {/* Subtle animation indicator for active field */}
                {isFocused && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--exo-accent)] to-transparent animate-pulse"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--exo-accent)]/10 to-transparent rounded-full blur-2xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--exo-success)]/10 to-transparent rounded-full blur-xl opacity-40"></div>
    </div>
  );
};

export default ParametersPanel;