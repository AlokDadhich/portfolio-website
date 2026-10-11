import React from 'react';
import { GraduationCap, Users } from 'lucide-react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import ProfilePanel from './visuals/ProfilePanel';

const leadership = [
  {
    role: 'Under-Secretary-General, VIT Pune MUN',
    period: 'Jul 2024 — Jul 2025',
    detail: 'Directed outreach campaigns and improved delegate participation by 10%.'
  },
  {
    role: 'Website Head, Vishwaconclave 2024',
    period: 'Jan 2024 — Apr 2024',
    detail: 'Led web development for a conference of 2,500+ participants, improving registration efficiency.'
  },
  {
    role: 'Coordinator, Social Welfare & Development',
    period: 'Jul 2023 — May 2024',
    detail: 'Organized the Go Green Drive in partnership with the Aanandwan Foundation.'
  }
];

const About = () => {
  const technologies = [
    { name: 'MATLAB', color: 'text-orange-400' },
    { name: 'Python', color: 'text-blue-400' },
    { name: 'C / C++ (Arduino)', color: 'text-cyan-400' },
    { name: 'SolidWorks / Fusion 360', color: 'text-red-400' },
    { name: 'Ansys Fluent / CFD', color: 'text-yellow-400' },
    { name: 'AutoCAD / Creo', color: 'text-indigo-400' },
    { name: 'JavaScript / TypeScript', color: 'text-yellow-300' },
    { name: 'React', color: 'text-cyan-300' },
    { name: 'Node.js / Express', color: 'text-green-400' },
    { name: 'MongoDB', color: 'text-green-500' },
    { name: 'Embedded / IoT', color: 'text-purple-400' },
    { name: 'Git', color: 'text-slate-300' }
  ];

  return (
    <section className="min-h-screen py-24 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Section Title */}
          <Reveal className="flex items-center space-x-4 mb-12">
            <h2 className="text-2xl font-bold text-slate-100 font-mono">
              <span className="text-blue-400">01.</span> About Me
            </h2>
            <div className="flex-1 h-px bg-slate-600"></div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Content */}
            <div className="lg:col-span-2 space-y-6">
              <Reveal delay={0.1} className="space-y-4 text-slate-400 leading-relaxed">
                <p className="text-justify">
                  Hi, I'm Alok — a Mechanical Engineering student at Vishwakarma Institute of Technology,
                  Pune, who ended up spending most of my time building software for engineering problems.
                  At ISRO's Space Applications Centre, I worked on tooling for antenna test-range data
                  (reconstructing radiation-pattern cuts from raster scans) and on the conceptual design and
                  automation software for a large-aperture antenna positioning platform built around an
                  existing EOT crane.
                </p>

                <p className="text-justify">
                  Alongside that, I build CAD automation tools (CADFlow, a hardware-driven AutoCAD plugin),
                  run CFD-validated thermal/fluid simulations for fabricated hardware projects — a solar
                  still, a Tesla turbine, a biomimetic heat exchanger — and work on robotics and automation
                  builds ranging from a mini CNC machine to computer-vision pipelines.
                </p>

                <p className="text-justify">
                  I sit at the intersection of mechanical engineering, robotics, and computational tooling —
                  currently preparing for GATE in CS and in Robotics &amp; Automation, and looking to build a
                  career at that intersection rather than picking one side of it.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-slate-400 mb-6">
                  Here are a few technologies I've been working with recently:
                </p>

                {/* Interactive Technology Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {technologies.map((tech, index) => (
                    <SpotlightCard
                      key={index}
                      className="p-3 rounded-lg border bg-slate-800/20 border-slate-700/30 hover:border-slate-600/50 transition-colors duration-300 cursor-hover"
                    >
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${tech.color}`}>▹</span>
                        <span className="text-sm font-mono text-slate-300">{tech.name}</span>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Profile Panel */}
            <Reveal delay={0.15} className="relative group">
              <div className="relative">
                <ProfilePanel />
                <div className="absolute inset-0 border-2 border-blue-400/60 rounded translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
              </div>
            </Reveal>
          </div>

          {/* Education */}
          <Reveal className="space-y-6">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-bold text-slate-100">Education</h3>
            </div>
            <SpotlightCard className="p-6 rounded-lg border border-slate-700/40 bg-slate-800/20 cursor-hover">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h4 className="text-slate-100 font-semibold">B.Tech, Mechanical Engineering</h4>
                <span className="text-slate-500 font-mono text-sm">2022 — 2026</span>
              </div>
              <p className="text-slate-400 text-justify">
                Vishwakarma Institute of Technology, Pune. Also preparing for GATE in Computer Science
                and in Robotics &amp; Automation, alongside a project cohort spanning CFD-driven thermal
                systems, mechatronics, and IoT.
              </p>
            </SpotlightCard>
          </Reveal>

          {/* Leadership & Extracurricular */}
          <Reveal delay={0.05} className="space-y-6">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-bold text-slate-100">Leadership &amp; Extracurricular</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {leadership.map((item, i) => (
                <SpotlightCard
                  key={i}
                  className="p-6 rounded-lg border border-slate-700/40 bg-slate-800/20 cursor-hover h-full"
                >
                  <p className="text-slate-500 font-mono text-xs uppercase tracking-wide mb-2">{item.period}</p>
                  <h4 className="text-slate-100 font-semibold text-sm mb-3">{item.role}</h4>
                  <p className="text-slate-400 text-sm text-justify">{item.detail}</p>
                </SpotlightCard>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
