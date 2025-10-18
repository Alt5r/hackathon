interface ConfidenceBandProps {
  confidence: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ConfidenceBand({ confidence, size = 'md', showLabel = true }: ConfidenceBandProps) {
  const getColor = () => {
    if (confidence >= 80) return 'bg-[#1FC955]'; // Green (80-100)
    if (confidence >= 60) return 'bg-[#B3CB70]'; // Yellow-green (60-79)
    if (confidence >= 40) return 'bg-[#F3DA74]'; // Yellow (40-59)
    if (confidence >= 20) return 'bg-[#FDAA56]'; // Orange (20-39)
    return 'bg-[#FC3838]'; // Red (0-19)
  };

  const getTextColor = () => {
    if (confidence >= 80) return 'text-[#1FC955]';
    if (confidence >= 60) return 'text-[#B3CB70]';
    if (confidence >= 40) return 'text-[#F3DA74]';
    if (confidence >= 20) return 'text-[#FDAA56]';
    return 'text-[#FC3838]';
  };

  const getStatus = () => {
    if (confidence >= 80) return 'Very High';
    if (confidence >= 60) return 'High';
    if (confidence >= 40) return 'Medium';
    if (confidence >= 20) return 'Low';
    return 'Very Low';
  };

  const height = size === 'sm' ? 'h-2' : size === 'lg' ? 'h-4' : 'h-3';
  const labelSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className={`${labelSize} text-[rgb(114,120,141)] dark:text-white`}>
            Confidence Band
          </span>
          <div className="flex items-center gap-2">
            <span className={`${labelSize} ${getTextColor()}`}>
              {getStatus()}
            </span>
            <span className={`${labelSize} ${getTextColor()}`}>
              {confidence}%
            </span>
          </div>
        </div>
      )}
      <div className={`w-full bg-[rgba(151,223,252,0.15)] dark:bg-[rgba(151,223,252,0.2)] rounded-full overflow-hidden ${height} border border-[rgba(151,223,252,0.3)] dark:border-[rgba(151,223,252,0.4)]`}>
        <div
          className={`${height} ${getColor()} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
}
