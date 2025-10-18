import { Moon, Sun } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface FooterProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Footer({ darkMode, onToggleDarkMode }: FooterProps) {
  return (
    <footer className="border-t-2 border-[rgba(151,223,252,0.3)] dark:border-[rgba(151,223,252,0.2)] bg-white/90 dark:bg-[rgb(114,120,141)]/95 backdrop-blur-sm mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-[rgb(114,120,141)] dark:text-white/80">
              © 2025 TruthCapital. Real-time misinformation detection for financial markets.
            </p>
            <p className="text-xs text-[rgb(114,120,141)] dark:text-white/60 mt-1">
              Protecting your portfolio from market manipulation and deepfakes.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-[rgba(151,223,252,0.1)] dark:bg-[rgba(151,223,252,0.15)] px-4 py-3 rounded-lg border border-[rgba(151,223,252,0.3)] dark:border-[rgba(151,223,252,0.4)]">
            <Sun className="w-4 h-4 text-[rgb(151,223,252)] dark:text-[rgb(151,223,252)]" />
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={onToggleDarkMode}
              className="data-[state=checked]:bg-[rgb(114,120,141)] data-[state=unchecked]:bg-[rgb(151,223,252)]"
            />
            <Moon className="w-4 h-4 text-[rgb(114,120,141)] dark:text-white" />
            <Label 
              htmlFor="dark-mode" 
              className="text-sm cursor-pointer text-[rgb(114,120,141)] dark:text-white"
            >
              Dark Mode
            </Label>
          </div>
        </div>
      </div>
    </footer>
  );
}
