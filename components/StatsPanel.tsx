import React from 'react';
import { TextStats } from '@/lib/textStats';

interface StatsPanelProps {
  stats: TextStats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="w-full p-4 rounded-md border-2 border-button-border bg-button-bg shadow-md">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatItem label="Characters" value={stats.totalChars} />
        <StatItem label="Chars (no space)" value={stats.charsNoSpace} />
        <StatItem label="Words" value={stats.wordCount} />
        <StatItem label="Lines" value={stats.lineCount} />
      </div>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: number;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-2xl font-bold text-text-primary">{value}</span>
      <span className="text-sm text-text-secondary mt-1">{label}</span>
    </div>
  );
}
