import { ArrowLeft, AlertTriangle, CheckCircle, Clock, TrendingUp, Shield, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Story } from '../types/story';
import { ConfidenceBand } from './ConfidenceBar';
import { OpportunityBand } from './OpportunityBand';
import { WavyBackground } from './WavyBackground';

interface StoryDetailPageProps {
  story: Story;
  onBack: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function StoryDetailPage({ story, onBack, darkMode = false, onToggleDarkMode }: StoryDetailPageProps) {
  const getRiskConfig = () => {
    const configs = {
      critical: { 
        color: 'bg-[#d4183d]', 
        label: 'CRITICAL RISK',
        description: 'This content poses a critical threat to trading decisions',
        icon: AlertTriangle,
        borderColor: 'border-[#d4183d]',
        bgColor: 'bg-[rgba(212,24,61,0.1)]'
      },
      high: { 
        color: 'bg-[rgb(239,208,202)]', 
        label: 'HIGH RISK',
        description: 'This content has significant verification issues',
        icon: AlertCircle,
        borderColor: 'border-[rgb(239,208,202)]',
        bgColor: 'bg-[rgba(239,208,202,0.2)]'
      },
      medium: { 
        color: 'bg-[rgb(173,252,146)]', 
        label: 'MEDIUM RISK',
        description: 'This content requires additional verification',
        icon: Shield,
        borderColor: 'border-[rgb(173,252,146)]',
        bgColor: 'bg-[rgba(173,252,146,0.2)]'
      },
      low: { 
        color: 'bg-[rgb(15,255,149)]', 
        label: 'VERIFIED',
        description: 'This content has been verified from multiple trusted sources',
        icon: CheckCircle,
        borderColor: 'border-[rgb(15,255,149)]',
        bgColor: 'bg-[rgba(15,255,149,0.1)]'
      }
    };
    return configs[story.riskLevel];
  };

  const riskConfig = getRiskConfig();
  const RiskIcon = riskConfig.icon;

  return (
    <div className="min-h-screen bg-white">
      <WavyBackground />
      {/* Header */}
      <div className="border-b-2 border-[rgba(151,223,252,0.3)] bg-white/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="hover:bg-[rgba(151,223,252,0.1)] text-[rgb(114,120,141)]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Risk Alert Banner */}
        <Card className={`p-6 mb-6 border-2 shadow-2xl ${riskConfig.borderColor} ${riskConfig.bgColor}`}>
          <div className="flex items-start gap-4">
            <div className={`${riskConfig.color} p-3 rounded-lg`}>
              <RiskIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-[rgb(114,120,141)]">{riskConfig.label}</h3>
                <Badge className={`${riskConfig.color} text-white border-0`}>
                  {story.category.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-[rgb(114,120,141)]">{riskConfig.description}</p>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <Card className="p-8 mb-6 border-2 shadow-2xl border-[rgba(151,223,252,0.3)]">
          <div className="flex items-center gap-3 mb-4 text-[rgb(114,120,141)]">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{story.timestamp}</span>
            <Separator orientation="vertical" className="h-4 bg-[rgba(151,223,252,0.3)]" />
            <span className="text-sm">{story.source}</span>
          </div>

          <h1 className="mb-6 text-[rgb(114,120,141)]">{story.title}</h1>

          {story.affectedStocks && story.affectedStocks.length > 0 && (
            <div className="flex items-center gap-2 mb-6 pb-6 border-b-2 border-[rgba(151,223,252,0.2)]">
              <TrendingUp className="w-5 h-5 text-[rgb(151,223,252)]" />
              <span className="text-sm text-[rgb(114,120,141)] mr-2">Affected Stocks:</span>
              <div className="flex gap-2">
                {story.affectedStocks.map((stock) => (
                  <Badge key={stock} variant="outline" className="bg-[rgba(151,223,252,0.2)] text-[rgb(151,223,252)] border-[rgb(151,223,252)]">
                    ${stock}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="prose max-w-none mb-8">
            <p className="text-[rgb(114,120,141)]">{story.content}</p>
          </div>

          {/* Verification Metrics */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Confidence Band */}
            <div className="bg-[rgba(151,223,252,0.05)] border-2 border-[rgba(151,223,252,0.2)] rounded-lg p-6">
              <ConfidenceBand confidence={story.confidence} size="lg" />
              <p className="text-sm text-[rgb(114,120,141)] mt-4 opacity-80">
                This score represents our AI's confidence in the authenticity and accuracy of this information
                based on source credibility, cross-referencing, and deepfake detection.
              </p>
            </div>

            {/* Opportunity Band */}
            <div className="bg-[rgba(151,223,252,0.05)] border-2 border-[rgba(151,223,252,0.2)] rounded-lg p-6">
              <OpportunityBand 
                opportunityScore={story.opportunityScore} 
                justification={story.opportunityJustification}
                size="lg" 
                showJustification={true}
              />
            </div>
          </div>

          {/* Detected Issues */}
          {story.detectedIssues.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-4 flex items-center gap-2 text-[rgb(114,120,141)]">
                <AlertTriangle className="w-5 h-5 text-[#d4183d]" />
                Detected Issues ({story.detectedIssues.length})
              </h3>
              <div className="space-y-2">
                {story.detectedIssues.map((issue, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-[rgba(212,24,61,0.05)] border-2 border-[rgba(212,24,61,0.3)] rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#d4183d] mt-2 flex-shrink-0" />
                    <p className="text-sm text-[rgb(114,120,141)]">{issue}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Sources */}
          <div>
            <h3 className="mb-4 text-[rgb(114,120,141)]">Cross-Reference Check</h3>
            <div className="grid gap-3">
              {story.verificationSources.map((source, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    source.verified
                      ? 'bg-[rgba(15,255,149,0.1)] border-[rgb(15,255,149)]'
                      : 'bg-[rgba(151,223,252,0.05)] border-[rgba(151,223,252,0.3)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {source.verified ? (
                      <CheckCircle className="w-5 h-5 text-[rgb(15,255,149)]" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-[rgb(114,120,141)]" />
                    )}
                    <div>
                      <p className="text-[rgb(114,120,141)]">
                        {source.name}
                      </p>
                      <p className="text-xs text-[rgb(114,120,141)] opacity-70">Checked {source.timestamp}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      source.verified
                        ? 'bg-[rgba(15,255,149,0.2)] text-[rgb(15,255,149)] border-[rgb(15,255,149)]'
                        : 'bg-[rgba(114,120,141,0.1)] text-[rgb(114,120,141)] border-[rgb(114,120,141)]'
                    }
                  >
                    {source.verified ? 'Confirmed' : 'Not Found'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Action Card */}
        <Card className="p-6 shadow-2xl bg-gradient-to-r from-[rgba(151,223,252,0.2)] to-[rgba(173,252,146,0.2)] border-2 border-[rgb(151,223,252)]">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="mb-2 text-[rgb(114,120,141)]">Need More Information?</h3>
              <p className="text-sm text-[rgb(114,120,141)] mb-4">
                Access detailed analysis reports and real-time market impact assessments
              </p>
              <Button className="bg-[rgb(151,223,252)] hover:bg-[rgb(131,203,232)] text-[rgb(114,120,141)]">
                View Full Analysis
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
