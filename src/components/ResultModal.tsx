import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ResultData {
  status: 'Confirmed Exoplanet' | 'Planet Candidate' | 'False Positive';
  confidence: number;
  parameters: Record<string, { value: string; unit: string; label: string }>;
}

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ResultData | null;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, result }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed Exoplanet':
        return 'bg-[var(--exo-success)] text-[var(--exo-background)]';
      case 'Planet Candidate':
        return 'bg-[var(--exo-warn)] text-[var(--exo-background)]';
      case 'False Positive':
        return 'bg-[var(--exo-danger)] text-[var(--exo-ink)]';
      default:
        return 'bg-[var(--exo-dim)] text-[var(--exo-background)]';
    }
  };

  const generatePermalink = () => {
    if (!result) return '';
    
    const params = new URLSearchParams();
    Object.entries(result.parameters).forEach(([key, data]) => {
      params.set(key, data.value);
    });
    
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  };

  const copyPermalink = () => {
    const permalink = generatePermalink();
    navigator.clipboard.writeText(permalink);
    toast.success('Permalink copied to clipboard!');
  };

  if (!result) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-[var(--exo-glass-border)] bg-[var(--exo-background)] text-[var(--exo-ink)] max-w-2xl">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-2xl font-light tracking-wide">
            Analysis Complete
          </DialogTitle>
          <DialogDescription className="text-[var(--exo-dim)] text-sm">
            Your exoplanet analysis has been completed. Review the results and classification below.
          </DialogDescription>
          
          <div className="flex items-center space-x-4">
            <Badge className={`${getStatusColor(result.status)} font-medium px-4 py-2 text-sm`}>
              {result.status}
            </Badge>
            <div className="text-sm text-[var(--exo-dim)]">
              Confidence: <span className="text-[var(--exo-ink)] font-medium">{(result.confidence * 100).toFixed(1)}%</span>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-medium mb-4 text-[var(--exo-ink)]">Parameter Summary</h3>
            <div className="glass-panel rounded-xl p-4 space-y-3">
              {Object.entries(result.parameters).map(([key, data]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-[var(--exo-dim)] text-sm">{data.label}</span>
                  <span className="text-[var(--exo-ink)] font-medium">
                    {data.value} {data.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-[var(--exo-glass-border)]">
            <p className="text-sm text-[var(--exo-dim)] italic">
              Another step toward answering: Are we alone?
            </p>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyPermalink}
                className="border-[var(--exo-glass-border)] text-[var(--exo-dim)] hover:text-[var(--exo-ink)] hover:border-[var(--exo-accent)]"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              
              <Button
                onClick={onClose}
                className="bg-[var(--exo-accent)] hover:bg-[var(--exo-accent)]/90 text-[var(--exo-background)]"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;