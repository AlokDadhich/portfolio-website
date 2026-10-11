import React from 'react';
import { ExternalLink, Radio, Boxes, Settings, FileText, Award } from 'lucide-react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';

const publications = [
  {
    title: 'Conceptual Design and Automation of an EOT Crane-Based Positioning Platform for Large-Aperture Antenna Characterization',
    role: 'First Author',
    venue: 'SAC, ISRO',
    paperUrl: '/papers/eot-crane.pdf'
  },
  {
    title: 'Automated Extraction and Validation of Antenna Radiation-Pattern Phi Cuts from Compact Antenna Test Range Raster Data',
    role: 'Co-Author',
    venue: 'SAC, ISRO',
    paperUrl: '/papers/antenna-cuts.pdf'
  },
  {
    title: 'Comparative Analysis of Nature-Inspired Designs in Plate Heat Exchangers',
    role: 'Co-Author',
    venue: 'VIT Pune',
    paperUrl: '/papers/heat-exchanger.pdf'
  },
  {
    title: 'Design and Fabrication of a Solar Still with an Internal Condenser',
    role: 'Co-Author',
    venue: 'VIT Pune · Dassault-sponsored',
    paperUrl: '/papers/solar-still.pdf'
  },
  {
    title: 'Design and Computational Analysis of a Tesla Turbine',
    role: 'Co-Author',
    venue: 'VIT Pune',
    paperUrl: '/papers/tesla-turbine.pdf'
  }
];

const achievements = [
  {
    title: 'Logitech DevStudio 2026 — Semifinalist',
    detail: 'Top 50 teams for CADFlow, a hardware-driven AutoCAD automation plugin; awarded ₹60,000 in hardware.'
  },
  {
    title: 'ISRO Hackathon — Built Lunar Boulder/Crater Detection',
    detail: 'YOLOv8 computer-vision pipeline used for spatial landslide-zone analysis on lunar imagery.'
  },
  {
    title: 'High Commendation Award, SSI MUN 2024',
    detail: 'National-level Model United Nations recognition.'
  }
];

const Experience = () => {
  const experiences = [
    {
      period: "MAR 2026 — AUG 2026",
      title: "Research Intern",
      company: "Space Applications Centre, ISRO",
      companyUrl: "https://www.sac.gov.in/",
      description: "Worked with the Antenna Systems Area / SRTD group on software tooling for antenna test-range measurement and positioning. Co-authored a MATLAB tool that reconstructs arbitrary antenna radiation-pattern cuts from a single Compact Antenna Test Range raster scan via 2D interpolation, validated against GRASP-format reference cuts. Authored the conceptual design and software prototype for an EOT crane-based positioning platform for large-aperture antenna characterization — encoder-based sensing, RS-485/MEMOBUS control, and a browser-based supervisory interface.",
      technologies: ["MATLAB", "Antenna Metrology", "RS-485 / MEMOBUS", "Embedded Control", "Signal Processing", "System Architecture"],
      icon: <Radio className="w-5 h-5" />
    },
    {
      period: "AUG 2025 — DEC 2025",
      title: "Body and Trim Design Intern",
      company: "JSW Greentech",
      companyUrl: "#",
      description: "Created and modified CAD models for mechanical subsystems using AutoCAD and Creo. Assisted in prototype validation, tolerance analysis, and SAP-based engineering documentation, collaborating with manufacturing and quality teams to improve component manufacturability and reduce rework.",
      technologies: ["AutoCAD", "Creo", "SAP", "Tolerance Analysis", "GD&T", "Manufacturing"],
      icon: <Settings className="w-5 h-5" />
    },
    {
      period: "2023 — PRESENT",
      title: "CAD Automation & Engineering Tools",
      company: "Independent Projects",
      companyUrl: "https://github.com/AlokDadhich",
      description: "Built CADFlow, a hardware-driven AutoCAD automation plugin (Logitech DevStudio 2026 semifinalist, top 50 teams), and a computer-vision pipeline for lunar boulder/crater detection built at an ISRO hackathon. Runs alongside CFD-validated fabrication projects — a biomimetic plate heat exchanger, a Tesla turbine, and a solar still with an internal condenser.",
      technologies: ["AutoCAD SDK", "Python", "YOLOv8", "Streamlit", "SolidWorks Flow Simulation", "Ansys Fluent"],
      icon: <Boxes className="w-5 h-5" />
    }
  ];

  return (
    <section className="min-h-screen py-24 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Section Title with Cosmic Theme */}
          <Reveal className="flex items-center space-x-4 mb-4">
            <h2 className="text-2xl font-bold text-slate-100 font-mono">
              <span className="text-blue-400">02.</span> Cosmic History
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-600 via-blue-400/50 to-slate-600"></div>
          </Reveal>

          {/* Experience Timeline with Technical Focus */}
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Reveal
                key={index}
                delay={index * 0.1}
                className="group relative p-6 rounded-lg transition-all duration-300 hover:bg-slate-800/20 hover:shadow-lg hover:shadow-blue-500/10 border border-transparent hover:border-slate-700/50 cursor-hover"
              >
                <div className="grid gap-6 lg:grid-cols-4">
                  {/* Period with Technical Icon */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                        {exp.icon}
                      </div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse group-hover:bg-blue-300"></div>
                    </div>
                    <p className="text-slate-500 font-mono text-sm uppercase tracking-wide group-hover:text-blue-400 transition-colors duration-300">
                      {exp.period}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100 group-hover:text-blue-400 transition-colors duration-300">
                        {exp.title} · {' '}
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-blue-400 hover:underline hover:text-blue-300 transition-colors duration-300 cursor-hover"
                        >
                          <span>{exp.company}</span>
                          <ExternalLink size={14} />
                        </a>
                      </h3>
                    </div>

                    <p className="text-slate-400 leading-relaxed text-justify group-hover:text-slate-300 transition-colors duration-300">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="tech-tag group-hover:bg-blue-400/20 group-hover:border-blue-400/40 group-hover:text-blue-300 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subtle Technical Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>
              </Reveal>
            ))}
          </div>

          {/* Publications */}
          <Reveal className="space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-bold text-slate-100">Publications</h3>
            </div>
            <div className="space-y-3">
              {publications.map((pub, i) => (
                <a
                  key={i}
                  href={pub.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-hover"
                >
                  <SpotlightCard className="p-5 rounded-lg border border-slate-700/40 bg-slate-800/20 hover:border-blue-400/40 transition-colors duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <p className="text-slate-300 text-sm text-justify">{pub.title}</p>
                    <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                      <span className="text-blue-400">{pub.role}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-500">{pub.venue}</span>
                      <FileText size={14} className="text-blue-400 ml-1" />
                    </div>
                  </SpotlightCard>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Achievements */}
          <Reveal delay={0.05} className="space-y-6">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-bold text-slate-100">Achievements &amp; Hackathons</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {achievements.map((a, i) => (
                <SpotlightCard
                  key={i}
                  className="p-6 rounded-lg border border-slate-700/40 bg-slate-800/20 cursor-hover h-full"
                >
                  <h4 className="text-slate-100 font-semibold text-sm mb-3">{a.title}</h4>
                  <p className="text-slate-400 text-sm text-justify">{a.detail}</p>
                </SpotlightCard>
              ))}
            </div>
          </Reveal>

          {/* Resume Link with Technical Theme */}
          <Reveal delay={0.2} className="text-center pt-8">
            <a
              href="/papers/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-8 py-4 border border-blue-400 text-blue-400 rounded font-mono text-sm hover:bg-blue-400/10 hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 group cursor-hover"
            >
              <Radio className="w-4 h-4 group-hover:animate-pulse" />
              <span>View Full Technical Resume</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Experience;
