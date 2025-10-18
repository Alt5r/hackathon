import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Story } from '../types/story';
import { ConfidenceBand } from './ConfidenceBar';
import { OpportunityBand } from './OpportunityBand';

interface StoryCardProps {
  story: Story;
  onClick: () => void;
  compact?: boolean;
}

export function StoryCard({ story, onClick, compact = false }: StoryCardProps) {
  const getRiskBadge = () => {
    const config = {
      critical: { color: 'bg-[#d4183d] hover:bg-[#b01532]', label: 'CRITICAL' },
      high: { color: 'bg-[rgb(239,208,202)] hover:bg-[rgb(229,188,182)] text-[rgb(114,120,141)]', label: 'HIGH RISK' },
      medium: { color: 'bg-[rgb(173,252,146)] hover:bg-[rgb(153,232,126)] text-[rgb(114,120,141)]', label: 'MEDIUM RISK' },
      low: { color: 'bg-[rgb(15,255,149)] hover:bg-[rgb(0,235,129)]', label: 'VERIFIED' }
    };
    return config[story.riskLevel];
  };

  const categoryColors = {
    earnings: 'bg-[rgba(151,223,252,0.2)] text-[rgb(151,223,252)] border-[rgb(151,223,252)]',
    market: 'bg-[rgba(173,252,146,0.2)] text-[rgb(173,252,146)] border-[rgb(173,252,146)]',
    crypto: 'bg-[rgba(15,255,149,0.2)] text-[rgb(15,255,149)] border-[rgb(15,255,149)]',
    company: 'bg-[rgba(114,120,141,0.2)] text-[rgb(114,120,141)] border-[rgb(114,120,141)]',
    policy: 'bg-[rgba(239,208,202,0.3)] text-[rgb(239,208,202)] border-[rgb(239,208,202)]'
  };

  return (
    <Card
      onClick={onClick}
      className={`${compact ? 'p-3' : 'p-5'} shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-[rgba(151,223,252,0.3)] dark:border-[rgba(151,223,252,0.4)] hover:border-[rgb(151,223,252)] bg-white dark:bg-[rgba(114,120,141,0.5)] group`}
    >
      <div className={`flex items-start justify-between ${compact ? 'mb-2' : 'mb-3'}`}>
        <div className="flex items-center gap-2">
          {story.isVerified ? (
            <CheckCircle className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-[rgb(15,255,149)] flex-shrink-0`} />
          ) : (
            <AlertTriangle className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-[#d4183d] flex-shrink-0`} />
          )}
          <Badge className={`${getRiskBadge().color} text-white border-0 ${compact ? 'text-xs px-2 py-0.5' : ''}`}>
            {getRiskBadge().label}
          </Badge>
        </div>
        <Badge variant="outline" className={`${categoryColors[story.category]} ${compact ? 'text-xs px-2 py-0.5' : ''}`}>
          {story.category.toUpperCase()}
        </Badge>
      </div>

      <h3 className={`${compact ? 'mb-1.5 text-sm' : 'mb-2'} text-[rgb(114,120,141)] dark:text-white group-hover:text-[rgb(151,223,252)] transition-colors line-clamp-2`}>
        {story.title}
      </h3>

      <div className={`flex items-center gap-2 ${compact ? 'mb-2' : 'mb-3'} text-[rgb(114,120,141)] dark:text-white/70`}>
        <Clock className={`${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
        <span className={`${compact ? 'text-xs' : 'text-sm'}`}>{story.timestamp}</span>
        <span className={`${compact ? 'text-xs' : 'text-sm'}`}>• {story.source}</span>
      </div>

      {story.affectedStocks && story.affectedStocks.length > 0 && (
        <div className={`flex items-center gap-2 ${compact ? 'mb-2' : 'mb-4'}`}>
          <TrendingUp className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-[rgb(114,120,141)] dark:text-white/70`} />
          <div className="flex gap-1.5">
            {story.affectedStocks.map((stock) => (
              <Badge key={stock} variant="outline" className={`bg-[rgba(151,223,252,0.1)] dark:bg-[rgba(151,223,252,0.2)] text-[rgb(151,223,252)] border-[rgb(151,223,252)] ${compact ? 'text-xs px-1.5 py-0' : ''}`}>
                ${stock}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className={compact ? 'space-y-2' : 'space-y-3'}>
        <ConfidenceBand confidence={story.confidence} size="sm" />
        <OpportunityBand opportunityScore={story.opportunityScore} size="sm" />
      </div>

      {story.detectedIssues.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[rgba(151,223,252,0.2)]">
          <p className="text-xs text-[rgb(114,120,141)]">
            {story.detectedIssues.length} issue{story.detectedIssues.length !== 1 ? 's' : ''} detected
          </p>
        </div>
      )}
    </Card>
  );
}
