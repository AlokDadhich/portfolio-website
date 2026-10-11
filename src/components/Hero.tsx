import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Radio, Layers, Wrench, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import GlowingEffect from './GlowingEffect';
import LiquidGlassSurface, { LiquidGlassFilterDefs } from './LiquidGlassSurface';
import CursorTrackedRing from './CursorTrackedRing';

// A line rising up out of a mask rather than fading in place — the
// difference reads as "typography being revealed" instead of "a div
// appearing," which is the whole point of treating the hero as an entrance
// rather than a stack of text. Respects reduced-motion by skipping straight
// to the shown state instead of a bare opacity cross-fade, since a masked
// element with reduced motion should just... not move.
const MaskReveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={shouldReduceMotion ? { y: 0 } : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const stats = [
  { value: '2', label: 'ISRO SAC Papers' },
  { value: '11+', label: 'Engineering Projects' },
  { value: '34%', label: 'Solar Still Efficiency Gain' },
  { value: 'GATE', label: 'CS + Robotics & Automation' },
];

const flagshipProjects: { title: string; subtitle: string; icon: React.ReactNode }[] = [
  {
    title: 'EOT Crane Antenna Positioning',
    subtitle: 'First-author ISRO/SAC paper — retrofitting a crane into a large-aperture antenna positioner.',
    icon: <Radio className="h-4 w-4" />,
  },
  {
    title: 'Antenna Cut Analysis Suite',
    subtitle: 'MATLAB tool reconstructing radiation-pattern cuts from a single CATR raster scan.',
    icon: <Radio className="h-4 w-4" />,
  },
  {
    title: 'CADFlow — AutoCAD Automation',
    subtitle: 'Hardware-driven AutoCAD plugin — Logitech DevStudio 2026 semifinalist.',
    icon: <Layers className="h-4 w-4" />,
  },
  {
    title: 'Solar Still with Internal Condenser',
    subtitle: 'Fabricated and tested — 34% energy efficiency, 25% higher yield.',
    icon: <Wrench className="h-4 w-4" />,
  },
  {
    title: 'Tesla Turbine — Design & CFD',
    subtitle: 'CFD-analyzed bladeless disc turbine, 3D-printed and tested with compressed air.',
    icon: <Wrench className="h-4 w-4" />,
  },
  {
    title: 'Miniature CNC Machine',
    subtitle: 'Arduino + GRBL pen-plotter, driven by an Inkscape-to-G-code pipeline.',
    icon: <Zap className="h-4 w-4" />,
  },
];

const techMarquee = [
  'MATLAB', 'Python', 'C / C++', 'SolidWorks', 'Fusion 360', 'Ansys Fluent',
  'AutoCAD', 'Creo', 'React', 'Node.js', 'Arduino', 'GRBL', 'YOLOv8', 'Git'
];

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    'Mechanical Engineer',
    'Computational Tools Builder',
    'Robotics & Automation',
    'Systems Software Engineer'
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      const shouldDelete = isDeleting;

      if (shouldDelete) {
        setCurrentText(current.substring(0, currentText.length - 1));
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
      }

      if (!shouldDelete && currentText === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (shouldDelete && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }, isDeleting ? 100 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);

  const scrollToNext = () => {
    document.getElementById('home-highlights')?.scrollIntoView({ behavior: 'smooth' });
  };

  const coordinates = [
    { label: '// based in', value: 'Pune, India' },
    { label: '// discipline', value: 'Mechanical × Computational' },
    { label: '// status', value: 'Open to work' },
  ];

  return (
    <>
      {/* 1. Hero — an entrance, not a header block. Asymmetric on desktop:
          the identity sits lower-left where it has room to breathe, a quiet
          column of coordinates holds the right edge, and everything above
          it rises into place rather than fading where it stands. */}
      <section className="min-h-screen relative overflow-hidden flex flex-col justify-center">
        {/* Wider side padding than the site's usual lg:px-8 — the fixed
            social-icon columns (HeroSideLinks) sit at left-6/right-6 and
            need real clearance from this section's wider, asymmetric
            content, or they collide. */}
        <div className="max-w-6xl mx-auto px-6 lg:px-24 xl:px-28 w-full relative z-20">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div className="max-w-3xl">
              <Reveal y={10}>
                <p className="text-sm text-blue-400/80 font-mono mb-6">// entry_point</p>
              </Reveal>

              <h1 className="font-bold text-slate-100 tracking-tight leading-[0.95] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
                <MaskReveal delay={0.1}>Alok</MaskReveal>
                <MaskReveal delay={0.22}>Dadhich.</MaskReveal>
              </h1>

              <div className="mt-8 max-w-xl">
                <MaskReveal delay={0.4}>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-300 tracking-tight leading-snug">
                    Building computational tools for physical, real-world engineering systems.
                  </h2>
                </MaskReveal>
              </div>

              <Reveal delay={0.6} className="mt-6 text-base sm:text-lg text-slate-500 font-mono h-7 flex items-center">
                <span className="text-blue-400/60 mr-2">→</span>
                <span className="text-blue-400">{currentText}</span>
                <span className="w-0.5 h-5 bg-blue-400 animate-pulse ml-1"></span>
              </Reveal>

              <Reveal delay={0.7} className="mt-8 max-w-lg">
                <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
                  Mechanical engineering student at VIT Pune who ended up building software for
                  engineering problems — antenna test-range data processing and positioning-system
                  automation at ISRO's Space Applications Centre, CAD automation tooling, and
                  CFD-driven hardware projects.
                </p>
              </Reveal>

              <Reveal delay={0.8} className="mt-10">
                <Magnetic strength={0.3}>
                  <Link
                    to="/work"
                    className="group inline-flex items-center gap-2 text-slate-200 font-mono text-sm cursor-hover"
                  >
                    <span className="relative pb-1">
                      Explore the work
                      <span className="absolute left-0 bottom-0 h-px w-full bg-slate-600 group-hover:bg-blue-400 transition-colors duration-300" />
                    </span>
                    <ArrowRight size={15} className="text-blue-400 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>

            {/* Quiet coordinates column — information placed in the space
                rather than boxed into a card; desktop only, disappears
                gracefully rather than cramming onto mobile. */}
            <div className="hidden lg:flex flex-col gap-6 pb-2 text-right">
              {coordinates.map((c, i) => (
                <Reveal key={c.label} delay={0.9 + i * 0.1}>
                  <p className="text-xs font-mono text-slate-600 mb-1">{c.label}</p>
                  <p className="text-sm text-slate-400 whitespace-nowrap">{c.value}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue — a line drawing itself downward rather than a bouncing
            arrow icon; quieter, and reads as "continue" not "UI widget." */}
        <button
          onClick={scrollToNext}
          aria-label="Scroll to continue"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-600 hover:text-blue-400 transition-colors duration-300 cursor-hover z-20"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
          <span className="relative w-px h-10 overflow-hidden bg-slate-700/50">
            <span className="absolute inset-x-0 top-0 h-full bg-current animate-[scrollLine_2s_ease-in-out_infinite]" />
          </span>
        </button>
      </section>

      {/* 2. Quick stats strip — a plain readout, not a card grid: numbers
          given room, separated by hairlines instead of boxes. */}
      <section id="home-highlights" className="py-20 relative border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-800">
            {stats.map((stat, i) => (
              <div key={i} className="text-center px-4 first:pl-0 last:pr-0">
                <div className="text-3xl lg:text-4xl font-bold text-slate-100 font-mono mb-2">{stat.value}</div>
                <div className="text-slate-500 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 3. ISRO highlight teaser */}
      <section className="py-20 relative border-t border-slate-800/50">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-blue-400 font-mono text-sm mb-3">// isro_sac.log</p>
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Antenna test-range software, built at ISRO</h3>
            <p className="text-slate-400 leading-relaxed text-justify mb-6">
              At ISRO's Space Applications Centre, I worked on tooling that reconstructs antenna
              radiation-pattern cuts from raster scan data, and authored the conceptual design of
              a crane-based positioning platform for large-aperture antenna characterization —
              two papers, one as first author.
            </p>
            <Magnetic strength={0.3}>
              <Link
                to="/experience"
                className="inline-flex items-center gap-2 text-blue-400 font-mono text-sm border border-blue-400 px-6 py-3 rounded hover:bg-blue-400/10 transition-colors duration-300 cursor-hover"
              >
                View Experience <ArrowRight size={16} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* 4. Flagship projects teaser — the Aceternity bento-card structure
          (ui.aceternity.com/components/glowing-effect) reproduced closely:
          an outer bordered shell with padding, the glow effect living in
          that padding gap, and an inner bordered box (icon + title +
          subtitle) — two borders plus one glow, not a flat card. Re-themed
          to a dark, single-hue blue/cyan glow instead of the original
          rainbow gradient. */}
      <section className="py-20 relative border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-10">
            <p className="text-blue-400 font-mono text-sm mb-2">// selected_work</p>
            <h3 className="text-2xl font-bold text-slate-100">A few things I've built</h3>
          </Reveal>
          {/* Real backdrop-blur, finally: traced the reason it never worked
              to App.tsx's page-transition wrapper always setting a
              `transform` (even `scale(1)` at idle, which looks identical to
              no transform but still opens a new backdrop-root boundary) —
              fixed there (`transform: 'none'` at idle) rather than faked
              here, so the card can now generically blur whatever's actually
              behind it, real grid included. Confirmed live: a test card with
              backdrop-blur turned visibly hazy with zero crisp grid lines,
              while untouched neighbors stayed sharp. */}
          <LiquidGlassFilterDefs />
          <div className="grid sm:grid-cols-2 gap-6">
            {flagshipProjects.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <Link to="/work" className="cursor-hover group block h-full">
                  <div className="relative h-full rounded-2xl bg-slate-950/[0.03] p-2">
                    {/* No static border anymore — the shell is invisible at
                        rest. The specular ring (CursorTrackedRing) only
                        shows once the cursor is near, and its bright point
                        now follows the cursor's actual angle from the
                        card's center — fading to fully transparent exactly
                        opposite it — rather than a fixed top-left bias.
                        Fill dropped from /35 to /10 and its own
                        backdrop-blur-2xl removed: at /35 + blur, this shell
                        alone was compositing a dark, blurred layer before
                        the inner glass ever got a signal to work with — two
                        nested translucent dark fills stacking into flat
                        grey no matter what the inner SVG filter did. */}
                    <CursorTrackedRing className="rounded-2xl" />
                    {/* proximity kept small (not the ~90 first pass) so a
                        card's glow only ever activates while the cursor is
                        actually on or right at its own edge — with only
                        gap-6 (24px) between cards, a large proximity made
                        neighboring cards' zones overlap and glow together.
                        Outer shell + this glow are the lighting system —
                        untouched here. */}
                    <GlowingEffect proximity={8} spread={35} borderWidth={3} inactiveZone={0} />
                    {/* Inner surface: the actual LiquidGlassCard technique
                        from 21st.dev's Liquid Weather Glass, not a
                        Tailwind approximation — see LiquidGlassSurface.tsx. */}
                    <LiquidGlassSurface className="h-full min-h-[12rem]">
                      <div className="flex h-full flex-col justify-between gap-6 p-6">
                        <div className="relative w-fit rounded-lg border border-slate-700 p-2 text-slate-400">
                          {p.icon}
                        </div>
                        <div className="relative space-y-2">
                          <h4 className="text-lg font-semibold text-slate-100">{p.title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">{p.subtitle}</p>
                        </div>
                      </div>
                    </LiquidGlassSurface>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-10">
            <Magnetic strength={0.25}>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-blue-400 font-mono text-sm border border-blue-400 px-6 py-3 rounded hover:bg-blue-400/10 transition-colors duration-300 cursor-hover"
              >
                See all work <ArrowRight size={16} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* 5. Tech marquee */}
      <section className="py-16 relative border-t border-slate-800/50 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}>
          {[...techMarquee, ...techMarquee].map((t, i) => (
            <span key={i} className="text-slate-600 font-mono text-lg">
              {t} <span className="text-blue-400/40 mx-2">/</span>
            </span>
          ))}
        </div>
      </section>

      {/* 6. CTA strip */}
      <section className="py-24 relative border-t border-slate-800/50 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <h3 className="text-3xl font-bold text-slate-100 mb-4">Let's build something.</h3>
            <p className="text-slate-400 mb-8 text-justify">
              Open to internships and full-time roles at the intersection of mechanical systems,
              robotics, and software.
            </p>
            <Magnetic strength={0.3}>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 border border-blue-400 text-blue-400 rounded font-mono text-sm hover:bg-blue-400/10 transition-all duration-300 cursor-hover"
              >
                Get in touch
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Hero;
