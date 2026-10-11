import React from 'react';

const stats = [
  { label: 'Based in', value: 'Pune, India' },
  { label: 'Degree', value: 'B.Tech, Mechanical Eng.' },
  { label: 'Institute', value: 'VIT Pune' },
  { label: 'Currently', value: 'GATE CS + R&A prep' },
];

const ProfilePanel: React.FC = () => (
  <div className="relative w-full h-80 rounded overflow-hidden border-2 border-blue-400/40 bg-gradient-to-br from-slate-900 via-slate-800/70 to-slate-900 flex flex-col justify-between p-6">
    {/* Grid backdrop */}
    <div
      className="absolute inset-0 opacity-[0.12]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(96,165,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.5) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />
    <div className="relative z-10 flex items-center justify-between">
      <span className="text-blue-400 font-mono text-xs">// alok_dadhich.dat</span>
      <span className="flex items-center gap-1 text-slate-500 font-mono text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> online
      </span>
    </div>

    <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="text-slate-500">{s.label}</div>
          <div className="text-slate-300">{s.value}</div>
        </div>
      ))}
    </div>
  </div>
);

export default ProfilePanel;
