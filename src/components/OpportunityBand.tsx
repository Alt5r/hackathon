interface OpportunityBandProps {
  opportunityScore: number;
  justification?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showJustification?: boolean;
}

export function OpportunityBand({ 
  opportunityScore, 
  justification,
  size = 'md', 
  showLabel = true,
  showJustification = false 
}: OpportunityBandProps) {
  const getColor = () => {
    if (opportunityScore >= 80) return 'bg-[#1FC955]'; // Green (80-100)
    if (opportunityScore >= 60) return 'bg-[#B3CB70]'; // Yellow-green (60-79)
    if (opportunityScore >= 40) return 'bg-[#F3DA74]'; // Yellow (40-59)
    if (opportunityScore >= 20) return 'bg-[#FDAA56]'; // Orange (20-39)
    return 'bg-[#FC3838]'; // Red (0-19)
  };

  const getTextColor = () => {
    if (opportunityScore >= 80) return 'text-[#1FC955]';
    if (opportunityScore >= 60) return 'text-[#B3CB70]';
    if (opportunityScore >= 40) return 'text-[#F3DA74]';
    if (opportunityScore >= 20) return 'text-[#FDAA56]';
    return 'text-[#FC3838]';
  };

  const getStatus = () => {
    if (opportunityScore >= 80) return 'Very Strong';
    if (opportunityScore >= 60) return 'Strong';
    if (opportunityScore >= 40) return 'Moderate';
    if (opportunityScore >= 20) return 'Weak';
    return 'Very Weak';
  };

  const height = size === 'sm' ? 'h-2' : size === 'lg' ? 'h-4' : 'h-3';
  const labelSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className={`${labelSize} text-[rgb(114,120,141)] dark:text-white`}>
            Opportunity Band
          </span>
          <div className="flex items-center gap-2">
            <span className={`${labelSize} ${getTextColor()}`}>
              {getStatus()}
            </span>
            <span className={`${labelSize} ${getTextColor()}`}>
              {opportunityScore}%
            </span>
          </div>
        </div>
      )}
      <div className={`w-full bg-[rgba(151,223,252,0.15)] dark:bg-[rgba(151,223,252,0.2)] rounded-full overflow-hidden ${height} border border-[rgba(151,223,252,0.3)] dark:border-[rgba(151,223,252,0.4)]`}>
        <div
          className={`${height} ${getColor()} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${opportunityScore}%` }}
        />
      </div>
      {showJustification && justification && (
        <div className="mt-3 p-4 bg-[rgba(151,223,252,0.05)] dark:bg-[rgba(151,223,252,0.1)] border border-[rgba(151,223,252,0.2)] dark:border-[rgba(151,223,252,0.3)] rounded-lg">
          <p className="text-sm text-[rgb(114,120,141)] dark:text-white/80">
            <span className="opacity-70">Investment Analysis: </span>
            {justification}
          </p>
        </div>
      )}
    </div>
  );
}
