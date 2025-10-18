export interface Story {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  confidence: number;
  opportunityScore: number;
  opportunityJustification: string;
  isVerified: boolean;
  category: 'earnings' | 'market' | 'crypto' | 'company' | 'policy';
  imageUrl?: string;
  content: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  detectedIssues: string[];
  affectedStocks?: string[];
  verificationSources: Array<{
    name: string;
    verified: boolean;
    timestamp: string;
  }>;
}
