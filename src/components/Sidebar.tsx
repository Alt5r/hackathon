import React from 'react';
import { Shield } from 'lucide-react';

export type SidebarRoute = 'home' | 'news' | 'settings' | 'about';

interface SidebarProps {
  current?: SidebarRoute;
  onNavigate?: (route: SidebarRoute) => void;
}

const links: { key: SidebarRoute; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'news', label: 'News Monitor' },
  { key: 'settings', label: 'Settings' },
  { key: 'about', label: 'About' },
];

export default function Sidebar({ current = 'home', onNavigate }: SidebarProps) {
  return (
    <aside className="app-sidebar" aria-label="Main navigation">
      <div className="sidebar-header">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-[rgba(151,223,252,0.15)]">
            <Shield className="w-5 h-5 text-[rgb(151,223,252)]" />
          </div>
          <h2 className="text-lg font-semibold">TruthCapital</h2>
        </div>
      </div>

      <nav className="sidebar-nav" role="navigation">
        {links.map((l) => (
          <button
            key={l.key}
            onClick={() => onNavigate?.(l.key)}
            className={`sidebar-link ${current === l.key ? 'active' : ''}`}
            aria-current={current === l.key ? 'page' : undefined}
          >
            {l.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <small className="text-xs text-muted">v0.1</small>
      </div>
    </aside>
  );
}
