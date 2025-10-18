import { useState, useEffect } from 'react';
import { Shield, TrendingUp, AlertTriangle, Search, Bell, Menu, Activity } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { StoryCard } from './components/StoryCard';
import { StoryDetailPage } from './components/StoryDetailPage';
import { WavyBackground } from './components/WavyBackground';
import { Footer } from './components/Footer';
import { NewsMonitor } from './components/NewsMonitor';
import { mockStories } from './data/mockStories';
import { Story } from './types/story';

export default function App() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewsMonitor, setShowNewsMonitor] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  if (selectedStory) {
    return <StoryDetailPage story={selectedStory} onBack={() => setSelectedStory(null)} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
  }

  if (showNewsMonitor) {
    return (
      <div className="min-h-screen bg-white dark:bg-[rgb(114,120,141)]">
        <WavyBackground darkMode={darkMode} />
        <header className="border-b-2 border-[rgba(151,223,252,0.3)] dark:border-[rgba(151,223,252,0.2)] bg-white/90 dark:bg-[rgb(114,120,141)]/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[rgb(151,223,252)] to-[rgb(173,252,146)] p-2 rounded-lg shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-[rgb(114,120,141)] dark:text-white">TruthCapital</h1>
                  <p className="text-xs text-[rgb(114,120,141)] dark:text-white/70 opacity-70">News Monitor - Backend Integration</p>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowNewsMonitor(false)}
                variant="outline" 
                className="border-[rgba(151,223,252,0.3)] hover:bg-[rgba(151,223,252,0.1)] text-[rgb(114,120,141)] dark:text-white"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </header>
        <NewsMonitor />
        <Footer darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      </div>
    );
  }

  const trendingStories = mockStories.slice(0, 6);
  const criticalAlerts = mockStories.filter(s => s.riskLevel === 'critical' || s.riskLevel === 'high');

  return (
    <div className="min-h-screen bg-white dark:bg-[rgb(114,120,141)]">
      <WavyBackground darkMode={darkMode} />
      {/* Header */}
      <header className="border-b-2 border-[rgba(151,223,252,0.3)] dark:border-[rgba(151,223,252,0.2)] bg-white/90 dark:bg-[rgb(114,120,141)]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[rgb(151,223,252)] to-[rgb(173,252,146)] p-2 rounded-lg shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-[rgb(114,120,141)] dark:text-white">TruthCapital</h1>
                <p className="text-xs text-[rgb(114,120,141)] dark:text-white/70 opacity-70">Real-time misinformation detection</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setShowNewsMonitor(true)}
                variant="outline" 
                className="border-[rgba(151,223,252,0.3)] hover:bg-[rgba(151,223,252,0.1)] text-[rgb(114,120,141)] dark:text-white dark:border-[rgba(151,223,252,0.4)] dark:hover:bg-[rgba(151,223,252,0.2)]"
              >
                <Activity className="w-4 h-4 mr-2" />
                News Monitor
              </Button>
              <Button variant="ghost" size="icon" className="relative hover:bg-[rgba(151,223,252,0.1)] text-[rgb(114,120,141)] dark:text-white dark:hover:bg-[rgba(151,223,252,0.2)]">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d4183d] rounded-full text-xs text-white flex items-center justify-center">
                  {criticalAlerts.length}
                </span>
              </Button>
              <Button variant="outline" size="icon" className="border-[rgba(151,223,252,0.3)] hover:bg-[rgba(151,223,252,0.1)] text-[rgb(114,120,141)] dark:text-white dark:border-[rgba(151,223,252,0.4)] dark:hover:bg-[rgba(151,223,252,0.2)]">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-[rgb(151,223,252)] to-[rgb(173,252,146)] p-3 rounded-xl shadow-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl bg-gradient-to-r from-[rgb(151,223,252)] to-[rgb(173,252,146)] bg-clip-text text-transparent">
                TruthCapital
              </h1>
            </div>
            <Badge className="mb-4 bg-[rgba(15,255,149,0.2)] text-[rgb(15,255,149)] border-[rgb(15,255,149)] hover:bg-[rgba(15,255,149,0.3)] dark:bg-[rgba(15,255,149,0.3)] dark:text-[rgb(15,255,149)]">
              Live Detection Active
            </Badge>
            <h2 className="mb-4 bg-gradient-to-r from-[rgb(151,223,252)] to-[rgb(173,252,146)] bg-clip-text text-transparent dark:from-[rgb(151,223,252)] dark:to-[rgb(173,252,146)]">
              Protect Your Portfolio from Misinformation
            </h2>
            <p className="text-[rgb(114,120,141)] dark:text-white/80 mb-8">
              AI-powered verification detects deepfakes, market manipulation, and fake news before they impact your trades.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(151,223,252)]" />
              <Input
                type="text"
                placeholder="Search for news, companies, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-2 border-[rgba(151,223,252,0.3)] focus:border-[rgb(151,223,252)] shadow-xl focus:shadow-2xl transition-all bg-white dark:bg-[rgba(114,120,141,0.5)] text-[rgb(114,120,141)] dark:text-white dark:border-[rgba(151,223,252,0.4)] dark:placeholder:text-white/60"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/90 dark:bg-[rgba(114,120,141,0.5)] backdrop-blur-sm rounded-xl p-6 border-2 border-[rgba(15,255,149,0.3)] dark:border-[rgba(15,255,149,0.4)] shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-[rgba(15,255,149,0.2)] dark:bg-[rgba(15,255,149,0.3)] p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-[rgb(15,255,149)]" />
                </div>
                <span className="text-[rgb(15,255,149)] text-xs">+12% today</span>
              </div>
              <p className="text-3xl text-[rgb(114,120,141)] dark:text-white mb-1">1,247</p>
              <p className="text-sm text-[rgb(114,120,141)] dark:text-white/70 opacity-70">Stories Verified</p>
            </div>

            <div className="bg-white/90 dark:bg-[rgba(114,120,141,0.5)] backdrop-blur-sm rounded-xl p-6 border-2 border-[rgba(212,24,61,0.3)] dark:border-[rgba(212,24,61,0.4)] shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-[rgba(212,24,61,0.1)] dark:bg-[rgba(212,24,61,0.2)] p-2 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-[#d4183d]" />
                </div>
                <span className="text-[#d4183d] text-xs">Active</span>
              </div>
              <p className="text-3xl text-[rgb(114,120,141)] dark:text-white mb-1">{criticalAlerts.length}</p>
              <p className="text-sm text-[rgb(114,120,141)] dark:text-white/70 opacity-70">Critical Alerts</p>
            </div>

            <div className="bg-white/90 dark:bg-[rgba(114,120,141,0.5)] backdrop-blur-sm rounded-xl p-6 border-2 border-[rgba(151,223,252,0.3)] dark:border-[rgba(151,223,252,0.4)] shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-[rgba(151,223,252,0.2)] dark:bg-[rgba(151,223,252,0.3)] p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-[rgb(151,223,252)]" />
                </div>
                <span className="text-[rgb(151,223,252)] text-xs">Live</span>
              </div>
              <p className="text-3xl text-[rgb(114,120,141)] dark:text-white mb-1">98.3%</p>
              <p className="text-sm text-[rgb(114,120,141)] dark:text-white/70 opacity-70">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-gradient-to-r from-[rgba(212,24,61,0.05)] to-[rgba(239,208,202,0.15)] dark:from-[rgba(212,24,61,0.1)] dark:to-[rgba(239,208,202,0.2)] border-2 border-[rgba(212,24,61,0.3)] dark:border-[rgba(212,24,61,0.4)] rounded-xl p-6 mb-8 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="bg-[#d4183d] p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-[rgb(114,120,141)] dark:text-white mb-2">Critical Misinformation Detected</h2>
                <p className="text-sm text-[rgb(114,120,141)] dark:text-white/80 opacity-80 mb-4">
                  {criticalAlerts.length} high-risk stor{criticalAlerts.length === 1 ? 'y' : 'ies'} detected that could impact market decisions. Review immediately.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {criticalAlerts.map((story) => (
                    <StoryCard key={story.id} story={story} onClick={() => setSelectedStory(story)} compact />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trending Stories */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="mb-1 text-[rgb(114,120,141)] dark:text-white">Trending Stories</h2>
            <p className="text-sm text-[rgb(114,120,141)] dark:text-white/70 opacity-70">Real-time verification of financial news</p>
          </div>
          <Button variant="outline" className="border-[rgba(151,223,252,0.3)] dark:border-[rgba(151,223,252,0.4)] hover:bg-[rgba(151,223,252,0.1)] dark:hover:bg-[rgba(151,223,252,0.2)] text-[rgb(114,120,141)] dark:text-white">
            View All
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingStories.map((story) => (
            <StoryCard key={story.id} story={story} onClick={() => setSelectedStory(story)} />
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-[rgb(151,223,252)] to-[rgb(173,252,146)] rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="mb-4 text-white">Stay Protected 24/7</h2>
          <p className="mb-8 text-white opacity-90 max-w-2xl mx-auto">
            Get real-time alerts on your phone when critical misinformation is detected affecting your portfolio.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-white text-[rgb(151,223,252)] hover:bg-white/90 shadow-lg">
              Enable Alerts
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <Footer darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
    </div>
  );
}
