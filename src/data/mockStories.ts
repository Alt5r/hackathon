import { Story } from '../types/story';

export const mockStories: Story[] = [
  {
    id: '1',
    title: 'Tesla CEO Announces Unexpected $50B Stock Buyback Program',
    source: 'Unknown Twitter Account',
    timestamp: '2 minutes ago',
    confidence: 23,
    opportunityScore: 8,
    opportunityJustification: 'Low opportunity - unverified source and high likelihood of misinformation. Market manipulation detected. Recommend avoiding any trading action until official confirmation from verified channels.',
    isVerified: false,
    category: 'company',
    content: 'A viral tweet from an unverified account claims Tesla will announce a $50 billion stock buyback program. Our AI detected several red flags including deepfake video elements, unusual posting patterns, and no corroboration from verified financial news sources.',
    riskLevel: 'critical',
    detectedIssues: [
      'Source account created 3 days ago',
      'Deepfake video detected (98% confidence)',
      'No corroboration from verified sources',
      'Suspicious engagement patterns detected',
      'Image metadata manipulation found'
    ],
    affectedStocks: ['TSLA'],
    verificationSources: [
      { name: 'Bloomberg', verified: false, timestamp: '10 min ago' },
      { name: 'Reuters', verified: false, timestamp: '8 min ago' },
      { name: 'CNBC', verified: false, timestamp: '5 min ago' }
    ]
  },
  {
    id: '2',
    title: 'Federal Reserve Announces Emergency Rate Cut to 0.5%',
    source: 'FakeNewsFinance.com',
    timestamp: '15 minutes ago',
    confidence: 12,
    opportunityScore: 5,
    opportunityJustification: 'Critical risk - fabricated source mimicking legitimate outlets. Zero investment opportunity as this is confirmed market manipulation. Trading on this information could result in significant losses.',
    isVerified: false,
    category: 'policy',
    content: 'A fabricated website mimicking legitimate financial news outlets claims the Federal Reserve announced an emergency rate cut. The domain was registered yesterday, and the content contains numerous factual errors about Fed procedures.',
    riskLevel: 'critical',
    detectedIssues: [
      'Domain registered 1 day ago',
      'SSL certificate suspicious',
      'Content contradicts Fed official schedule',
      'No mention on Fed official channels',
      'Similar scam detected last month'
    ],
    affectedStocks: ['SPY', 'QQQ'],
    verificationSources: [
      { name: 'Federal Reserve', verified: false, timestamp: '20 min ago' },
      { name: 'Wall Street Journal', verified: false, timestamp: '12 min ago' },
      { name: 'Financial Times', verified: false, timestamp: '10 min ago' }
    ]
  },
  {
    id: '3',
    title: 'Apple Reports Q4 Earnings Beat, Revenue Up 12% YoY',
    source: 'Apple Inc. Official',
    timestamp: '1 hour ago',
    confidence: 97,
    opportunityScore: 78,
    opportunityJustification: 'Strong opportunity - verified earnings beat with positive revenue growth. Multiple confirmed sources and SEC filings validate the information. Market sentiment positive, consider long positions on pullbacks or options strategies for earnings momentum.',
    isVerified: true,
    category: 'earnings',
    content: 'Apple officially announced Q4 earnings results showing revenue growth of 12% year-over-year. Multiple verified sources confirm the announcement, and all data points align with SEC filings.',
    riskLevel: 'low',
    detectedIssues: [],
    affectedStocks: ['AAPL'],
    verificationSources: [
      { name: 'SEC Filings', verified: true, timestamp: '1 hour ago' },
      { name: 'Apple IR', verified: true, timestamp: '1 hour ago' },
      { name: 'Bloomberg', verified: true, timestamp: '58 min ago' },
      { name: 'Reuters', verified: true, timestamp: '55 min ago' }
    ]
  },
  {
    id: '4',
    title: 'Microsoft Acquires OpenAI for $200 Billion',
    source: 'Unverified Blog',
    timestamp: '30 minutes ago',
    confidence: 8,
    opportunityScore: 12,
    opportunityJustification: 'Minimal opportunity - highly likely false information contradicting known partnership structures. No credible sources support this claim. Avoid trading on this news to prevent losses from misinformation-driven volatility.',
    isVerified: false,
    category: 'company',
    content: 'An unverified blog post claims Microsoft is acquiring OpenAI for $200 billion. This contradicts Microsoft\'s existing partnership structure with OpenAI and has no supporting evidence from credible sources.',
    riskLevel: 'high',
    detectedIssues: [
      'No official announcement from either company',
      'Contradicts known partnership agreements',
      'Blog has history of false reports',
      'Financial details are implausible',
      'No SEC filings detected'
    ],
    affectedStocks: ['MSFT'],
    verificationSources: [
      { name: 'Microsoft PR', verified: false, timestamp: '25 min ago' },
      { name: 'OpenAI', verified: false, timestamp: '25 min ago' },
      { name: 'TechCrunch', verified: false, timestamp: '20 min ago' }
    ]
  },
  {
    id: '5',
    title: 'Bitcoin ETF Approval Confirmed by SEC',
    source: 'Financial Times',
    timestamp: '3 hours ago',
    confidence: 94,
    opportunityScore: 85,
    opportunityJustification: 'Excellent opportunity - SEC official approval creates strong bullish catalyst for crypto markets. Verified across multiple authoritative sources. Consider exposure to crypto-related equities and Bitcoin ETFs for medium-term gains. Entry on early dips recommended.',
    isVerified: true,
    category: 'crypto',
    content: 'The SEC has officially approved multiple spot Bitcoin ETF applications. Confirmation comes from SEC official channels, verified news sources, and regulatory filings.',
    riskLevel: 'low',
    detectedIssues: [],
    affectedStocks: ['COIN', 'MSTR'],
    verificationSources: [
      { name: 'SEC', verified: true, timestamp: '3 hours ago' },
      { name: 'Financial Times', verified: true, timestamp: '3 hours ago' },
      { name: 'Bloomberg', verified: true, timestamp: '2.5 hours ago' },
      { name: 'Wall Street Journal', verified: true, timestamp: '2 hours ago' }
    ]
  },
  {
    id: '6',
    title: 'NVIDIA Stock Split 10-for-1 Effective Immediately',
    source: 'Suspicious Social Media Post',
    timestamp: '45 minutes ago',
    confidence: 31,
    opportunityScore: 22,
    opportunityJustification: 'Limited opportunity - unconfirmed news with coordinated bot activity suggests manipulation. While stock splits can be positive, lack of official confirmation makes this high-risk. Wait for official IR announcement before considering positions.',
    isVerified: false,
    category: 'company',
    content: 'A coordinated social media campaign claims NVIDIA announced an immediate 10-for-1 stock split. No official announcement exists, and the timing contradicts typical corporate procedures.',
    riskLevel: 'high',
    detectedIssues: [
      'No official company announcement',
      'Coordinated bot activity detected',
      'Timing inconsistent with corporate procedures',
      'No SEC Form 8-K filing',
      'Similar accounts posting identical content'
    ],
    affectedStocks: ['NVDA'],
    verificationSources: [
      { name: 'NVIDIA IR', verified: false, timestamp: '40 min ago' },
      { name: 'Bloomberg', verified: false, timestamp: '35 min ago' },
      { name: 'CNBC', verified: false, timestamp: '30 min ago' }
    ]
  },
  {
    id: '7',
    title: 'Amazon Reports Record Prime Day Sales, Up 23% Year Over Year',
    source: 'Amazon Official PR',
    timestamp: '2 hours ago',
    confidence: 92,
    opportunityScore: 71,
    opportunityJustification: 'Good opportunity - strong sales growth indicates healthy consumer spending and Amazon market dominance. Verified through official channels. Consider bullish positions, though some upside may be priced in. Options strategies could capture earnings momentum.',
    isVerified: true,
    category: 'company',
    content: 'Amazon officially reported record-breaking Prime Day sales with 23% year-over-year growth. Multiple verified sources and official company statements confirm the data.',
    riskLevel: 'low',
    detectedIssues: [],
    affectedStocks: ['AMZN'],
    verificationSources: [
      { name: 'Amazon PR', verified: true, timestamp: '2 hours ago' },
      { name: 'Reuters', verified: true, timestamp: '1.5 hours ago' },
      { name: 'Bloomberg', verified: true, timestamp: '1 hour ago' },
      { name: 'CNBC', verified: true, timestamp: '1 hour ago' }
    ]
  },
  {
    id: '8',
    title: 'Google AI Achieves Quantum Supremacy Breakthrough',
    source: 'Sketchy Tech Blog',
    timestamp: '1 hour ago',
    confidence: 67,
    opportunityScore: 45,
    opportunityJustification: 'Moderate opportunity - partial verification suggests some truth but details uncertain. Google has made quantum advances, but scope of this specific claim unclear. Conservative position sizing recommended until full confirmation from official Google sources and peer review.',
    isVerified: false,
    category: 'company',
    content: 'Reports suggest Google has achieved a major quantum computing breakthrough. While Google has been working on quantum computing, the specific claims in this article lack full verification from official channels.',
    riskLevel: 'medium',
    detectedIssues: [
      'Source credibility questionable',
      'Partial confirmation from secondary sources',
      'No official Google announcement yet',
      'Technical details lack peer review'
    ],
    affectedStocks: ['GOOGL'],
    verificationSources: [
      { name: 'Google Official', verified: false, timestamp: '1 hour ago' },
      { name: 'Nature Journal', verified: false, timestamp: '50 min ago' },
      { name: 'TechCrunch', verified: true, timestamp: '45 min ago' },
      { name: 'Wired', verified: true, timestamp: '40 min ago' }
    ]
  }
];
