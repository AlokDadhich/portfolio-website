import React from 'react';

export type VisualVariant =
  | 'eot-crane'
  | 'antenna-cuts'
  | 'cadflow'
  | 'solar-still'
  | 'heat-exchanger'
  | 'tesla-turbine'
  | 'cnc'
  | 'solar-tracker'
  | 'medbuzz'
  | 'lunar-cv'
  | 'coverage-map';

const icons: Record<VisualVariant, React.ReactNode> = {
  'eot-crane': (
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
      <line x1="15" y1="35" x2="145" y2="35" />
      <rect x="9" y="29" width="14" height="12" />
      <rect x="137" y="29" width="14" height="12" />
      <rect x="63" y="35" width="34" height="10" />
      <line x1="80" y1="45" x2="80" y2="88" strokeDasharray="2 3" />
      <path d="M58 96 A22 22 0 0 1 102 96" strokeDasharray="1 3" opacity="0.6" />
      <circle cx="80" cy="112" r="24" />
      <line x1="80" y1="88" x2="80" y2="136" />
      <line x1="56" y1="112" x2="104" y2="112" />
    </g>
  ),
  'antenna-cuts': (
    <g stroke="currentColor" strokeWidth="1.2" fill="none">
      <circle cx="80" cy="80" r="58" strokeDasharray="2 4" />
      <circle cx="80" cy="80" r="38" strokeDasharray="2 4" />
      <circle cx="80" cy="80" r="18" strokeDasharray="2 4" />
      <line x1="80" y1="20" x2="80" y2="140" />
      <line x1="20" y1="80" x2="140" y2="80" />
      <path d="M80 80 L128 42" strokeWidth="2" />
      <path d="M38 32 C 58 62, 100 98, 132 128" strokeWidth="2" opacity="0.6" />
    </g>
  ),
  cadflow: (
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
      <path d="M80 18 L132 45 L132 100 L80 127 L28 100 L28 45 Z" />
      <path d="M80 18 L80 73 M28 45 L80 73 L132 45" />
      <circle cx="80" cy="73" r="5" fill="currentColor" />
      <path d="M112 108 a16 16 0 1 0 -7 13" strokeWidth="2" />
      <path d="M105 116 l7 5 l4 -8" strokeWidth="2" strokeLinejoin="round" />
    </g>
  ),
  'solar-still': (
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
      <path d="M22 132 L22 92 L62 40 L138 40 L138 132 Z" />
      <line x1="22" y1="92" x2="138" y2="92" strokeDasharray="2 3" />
      <circle cx="122" cy="24" r="9" />
      <line x1="122" y1="8" x2="122" y2="3" />
      <line x1="136" y1="13" x2="140" y2="9" />
      <line x1="108" y1="13" x2="104" y2="9" />
      <path d="M100 55 q6 8 0 16 q-6 8 0 16 q6 8 0 16" strokeWidth="1.3" />
    </g>
  ),
  'heat-exchanger': (
    <g stroke="currentColor" strokeWidth="1.3" fill="none">
      <rect x="34" y="18" width="92" height="122" rx="8" />
      <line x1="80" y1="28" x2="80" y2="130" strokeWidth="2" />
      <path d="M80 42 L57 33 M80 42 L103 33 M80 62 L52 53 M80 62 L108 53 M80 84 L54 76 M80 84 L106 76 M80 106 L58 100 M80 106 L102 100" />
    </g>
  ),
  'tesla-turbine': (
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
      <circle cx="80" cy="80" r="54" />
      <circle cx="80" cy="80" r="36" strokeDasharray="2 3" />
      <circle cx="80" cy="80" r="7" fill="currentColor" />
      <path d="M80 26 a54 54 0 0 1 44 26" strokeWidth="2" />
      <path d="M117 44 l10 -3 l-2 10 Z" fill="currentColor" stroke="none" />
    </g>
  ),
  cnc: (
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
      <rect x="20" y="108" width="120" height="14" />
      <line x1="22" y1="42" x2="22" y2="108" />
      <line x1="138" y1="42" x2="138" y2="108" />
      <line x1="22" y1="46" x2="138" y2="46" />
      <rect x="72" y="46" width="16" height="10" />
      <line x1="80" y1="56" x2="80" y2="96" strokeDasharray="2 2" />
      <path d="M48 106 q16 -22 32 0 t32 0" strokeWidth="1.2" opacity="0.7" />
    </g>
  ),
  'solar-tracker': (
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
      <circle cx="34" cy="28" r="10" />
      <line x1="47" y1="38" x2="66" y2="55" strokeDasharray="2 2" />
      <rect x="52" y="66" width="72" height="14" transform="rotate(-12 88 73)" />
      <rect x="44" y="98" width="18" height="32" />
      <rect x="108" y="98" width="18" height="32" />
      <line x1="62" y1="114" x2="108" y2="114" strokeDasharray="2 2" />
    </g>
  ),
  medbuzz: (
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
      <rect x="30" y="42" width="100" height="70" rx="6" />
      <line x1="55" y1="42" x2="55" y2="112" />
      <line x1="80" y1="42" x2="80" y2="112" />
      <line x1="105" y1="42" x2="105" y2="112" />
      <line x1="30" y1="77" x2="130" y2="77" />
      <path d="M80 20 a14 14 0 0 1 14 14 v6 h-28 v-6 a14 14 0 0 1 14 -14 Z" />
      <line x1="74" y1="40" x2="86" y2="40" strokeWidth="2" />
    </g>
  ),
  'lunar-cv': (
    <g stroke="currentColor" strokeWidth="1.2" fill="none">
      <circle cx="60" cy="60" r="16" strokeDasharray="2 2" />
      <circle cx="106" cy="94" r="10" strokeDasharray="2 2" />
      <circle cx="46" cy="110" r="7" strokeDasharray="2 2" />
      <rect x="40" y="40" width="42" height="42" strokeWidth="1.2" />
      <rect x="92" y="80" width="28" height="28" strokeWidth="1.2" />
      <rect x="35" y="100" width="22" height="22" strokeWidth="1.2" />
    </g>
  ),
  'coverage-map': (
    <g stroke="currentColor" strokeWidth="1.3" fill="none">
      <circle cx="80" cy="80" r="56" />
      <circle cx="80" cy="80" r="40" strokeDasharray="2 4" opacity="0.7" />
      <circle cx="80" cy="80" r="24" strokeDasharray="2 4" opacity="0.5" />
      <path d="M80 24 A56 56 0 0 1 129 106" strokeWidth="2" />
      <circle cx="80" cy="24" r="4" fill="currentColor" stroke="none" />
      <circle cx="60" cy="66" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="96" cy="92" r="2.5" fill="currentColor" stroke="none" />
      <line x1="80" y1="80" x2="60" y2="66" strokeWidth="1" opacity="0.6" />
      <line x1="80" y1="80" x2="96" y2="92" strokeWidth="1" opacity="0.6" />
    </g>
  ),
};

interface ProjectVisualProps {
  variant: VisualVariant;
  className?: string;
}

const ProjectVisual: React.FC<ProjectVisualProps> = ({ variant, className = '' }) => (
  <div
    className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800/80 to-slate-900 ${className}`}
  >
    <div
      className="absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(96,165,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.5) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    />
    <svg viewBox="0 0 160 160" className="w-2/3 h-2/3 text-blue-400 relative z-10">
      {icons[variant]}
    </svg>
  </div>
);

export default ProjectVisual;
