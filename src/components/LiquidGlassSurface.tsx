import React from 'react';

// Adapted from 21st.dev's "Liquid Weather Glass" component
// (@uilayout.contact/liquid-weather-glass), inspected via its live preview
// bundle since the source view is paywalled. Real technique: an SVG
// feTurbulence + feDisplacementMap filter combined with backdrop-blur (so
// whatever's behind is actually bent/distorted, not just dimmed), plus a
// soft drop shadow and an inset specular edge highlight.
//
// No hover variant: the idle glass look was already the good state, and
// intensifying it on hover just washed it out. Everything below is static
// now — the outer GlowingEffect is the only thing that reacts to hover.
export const LiquidGlassFilterDefs: React.FC = () => (
  <svg className="hidden" aria-hidden>
    <defs>
      <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves={1} result="turbulence" />
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale={26} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

interface LiquidGlassSurfaceProps {
  className?: string;
  radiusClassName?: string;
  children: React.ReactNode;
}

// Expects an ancestor with the Tailwind `group` class (Hero.tsx's card Link)
// so hover state can drive the glass's own group-hover: variants.
const LiquidGlassSurface: React.FC<LiquidGlassSurfaceProps> = ({
  className = '',
  radiusClassName = 'rounded-xl',
  children,
}) => (
  <div className={`relative overflow-hidden bg-white/[0.01] ${radiusClassName} ${className}`}>
    {/* Layer 0: the actual glass. A hairline (2.5%) neutral white tint on
        the root — physical thickness, not a fill. No brightness/saturate:
        those were pushing the (blue-tinted) space background too dominant,
        reading as a blue panel rather than colorless glass. Only a touch
        of contrast remains, purely to keep the blurred grid from washing
        out flat — not a color/brightness change. Static — no hover
        variant; only the outer GlowingEffect carries color/reacts. */}
    <div
      className={`absolute inset-0 [filter:url(#glass-blur)] backdrop-blur-sm backdrop-contrast-[1.02] ${radiusClassName}`}
    />
    {/* Layer 1: soft drop shadow — a float, not a lift. */}
    <div
      className={`absolute inset-0 shadow-[0_8px_30px_rgba(0,0,0,0.18)] ${radiusClassName}`}
    />
    {/* No specular edge on the inner glass anymore — that ring moved to
        the outer shell in Hero.tsx (same gradient values), so it only
        ever shows once, as the border, rather than doubling up on two
        nested rings. */}
    {/* Layer 2: content, above the glass. */}
    <div className="relative z-10 h-full">{children}</div>
  </div>
);

export default LiquidGlassSurface;
