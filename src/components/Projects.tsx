import React from 'react';
import { ExternalLink, FileText, Folder, Wrench, Code, Zap, Layers, Radio } from 'lucide-react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import Magnetic from './Magnetic';
import ProjectVisual, { VisualVariant } from './visuals/ProjectVisual';

type ProjectType = 'isro' | 'research' | 'tool' | 'hardware' | 'ai';

const Projects = () => {
  const featuredProjects: {
    title: string;
    description: string;
    visual: VisualVariant;
    technologies: string[];
    liveUrl?: string;
    paperUrl?: string;
    type: ProjectType;
  }[] = [
    {
      title: "EOT Crane Antenna Positioning Platform",
      description: "Conceptual design and software architecture for a large-aperture antenna positioning system, built by retrofitting an existing EOT crane rather than procuring a dedicated scanner — encoder-based sensing, RS-485/MEMOBUS motor control, a wireless LoRa monitoring path kept deliberately separate from the wired control loop, and a browser-based scan-planning interface. First-author paper, written during my ISRO SAC internship.",
      visual: 'eot-crane',
      technologies: ["System Architecture", "RS-485 / MEMOBUS", "Embedded Control", "LoRa", "MATLAB"],
      paperUrl: "/papers/eot-crane.pdf",
      type: 'isro'
    },
    {
      title: "Antenna Cut Analysis Suite",
      description: "MATLAB tool built at ISRO's Space Applications Centre that reconstructs arbitrary Phi/Azimuth/Elevation antenna radiation-pattern cuts from a single Compact Antenna Test Range raster scan via bilinear interpolation — replacing slow, wobble-sensitive positioner sweeps — then validates the reconstructed cuts against GRASP-format reference data with automated peak/error/beamwidth statistics.",
      visual: 'antenna-cuts',
      technologies: ["MATLAB", "Antenna Metrology", "2D Interpolation", "Signal Processing"],
      paperUrl: "/papers/antenna-cuts.pdf",
      type: 'isro'
    },
    {
      title: "CADFlow",
      description: "Hardware-driven AutoCAD automation plugin — semifinalist (top 50 teams) at Logitech's DevStudio 2026, awarded ₹60,000 in hardware. Drives AutoCAD workflows directly from physical input rather than the standard UI.",
      visual: 'cadflow',
      technologies: ["AutoCAD SDK", "Automation", "Hardware Integration"],
      type: 'tool'
    },
    {
      title: "Solar Still with Internal Condenser",
      description: "Fabricated a single-slope solar still (galvanized-iron body, EPE insulation, a copper internal condenser sized via convective heat-transfer analysis, and phase-change material for thermal storage). Ran controlled experiments on condenser mass flow rate — 0.3 LPM optimum — and water depth, reaching 34% energy efficiency and a 25% increase in net freshwater yield with the condenser and PCM combined. Dassault Systems–sponsored.",
      visual: 'solar-still',
      technologies: ["Thermal Design", "Heat Transfer Analysis", "PCM", "Fabrication"],
      paperUrl: "/papers/solar-still.pdf",
      type: 'research'
    }
  ];

  const otherProjects: {
    title: string;
    description: string;
    visual: VisualVariant;
    technologies: string[];
    liveUrl?: string;
    paperUrl?: string;
    type: ProjectType;
  }[] = [
    {
      title: "Biomimetic Plate Heat Exchanger",
      description: "CFD comparison (SolidWorks Flow Simulation) of four plate designs — flat, grooved, vein-, and leaf-structured — inspired by fish gills and tracheal networks. The leaf-structured design won on every metric: +39.7% heat transfer coefficient with 14% lower pressure drop than the flat baseline.",
      visual: 'heat-exchanger',
      technologies: ["SolidWorks CFD", "Heat Transfer", "Biomimicry"],
      paperUrl: "/papers/heat-exchanger.pdf",
      type: 'research'
    },
    {
      title: "Tesla Turbine — Design & CFD Analysis",
      description: "CFD study (SimScale) of a bladeless disc turbine across two RPM regimes, backed by a 3D-printed working prototype tested with compressed air.",
      visual: 'tesla-turbine',
      technologies: ["CFD Analysis", "CAD Modeling", "3D Printing"],
      paperUrl: "/papers/tesla-turbine.pdf",
      type: 'research'
    },
    {
      title: "Miniature CNC Machine",
      description: "Arduino Uno–driven 3-axis CNC on GRBL firmware, with an Inkscape → JScut → UGS pipeline turning vector art into G-code. 3D-printed frame, working pen-plotter demo.",
      visual: 'cnc',
      technologies: ["Arduino", "GRBL", "Stepper Motors", "G-code"],
      paperUrl: "/papers/cnc.pdf",
      type: 'hardware'
    },
    {
      title: "Non-Electric Solar Tracker",
      description: "Passive solar tracker with no motors or electronics — differential heating of two R134a-refrigerant canisters shifts vapor pressure and tilts the panel frame to follow the sun. Measured 20%+ higher power output than a fixed panel.",
      visual: 'solar-tracker',
      technologies: ["Thermodynamics", "Fabrication", "Passive Systems"],
      paperUrl: "/papers/solar-tracker.pdf",
      type: 'hardware'
    },
    {
      title: "MedBuzz — IoT Medicine Reminder",
      description: "ESP8266-based medicine dispenser reminder with a browser configuration UI, NTP-synced alarms, and LED/buzzer alerts for caregivers of elderly patients.",
      visual: 'medbuzz',
      technologies: ["ESP8266", "NTP", "Web Server", "IoT"],
      paperUrl: "/papers/medbuzz.pdf",
      type: 'hardware'
    },
    {
      title: "Lunar Boulder & Crater Detection",
      description: "Built at an ISRO hackathon — a YOLOv8 computer-vision pipeline detecting lunar boulders and craters, using the detected features for spatial landslide-zone analysis, with a Streamlit app for inference and visualization.",
      visual: 'lunar-cv',
      technologies: ["YOLOv8", "Computer Vision", "Streamlit", "Python"],
      type: 'ai'
    },
    {
      title: "Satellite Antenna Coverage Prediction Tool",
      description: "A MATLAB application built during my ISRO internship that projects a satellite antenna's real gain pattern onto a geodetically accurate model of the Earth, predicting ground coverage and signal strength at specific locations. Internal ISRO work — implementation details stay unpublished, shared here only at a high level.",
      visual: 'coverage-map',
      technologies: ["MATLAB", "Geodesy", "Antenna Coverage Modeling"],
      type: 'isro'
    }
  ];

  const getProjectTypeColor = (type: ProjectType) => {
    switch (type) {
      case 'isro':
        return 'bg-blue-400 bg-opacity-20 text-blue-300 border-blue-400 border-opacity-30';
      case 'research':
        return 'bg-orange-400 bg-opacity-20 text-orange-300 border-orange-400 border-opacity-30';
      case 'tool':
        return 'bg-purple-400 bg-opacity-20 text-purple-300 border-purple-400 border-opacity-30';
      case 'hardware':
        return 'bg-green-400 bg-opacity-20 text-green-300 border-green-400 border-opacity-30';
      case 'ai':
        return 'bg-cyan-400 bg-opacity-20 text-cyan-300 border-cyan-400 border-opacity-30';
      default:
        return 'bg-slate-400 bg-opacity-20 text-slate-300 border-slate-400 border-opacity-30';
    }
  };

  const getProjectIcon = (type: ProjectType) => {
    switch (type) {
      case 'isro':
        return <Radio size={16} />;
      case 'research':
        return <Wrench size={16} />;
      case 'tool':
        return <Layers size={16} />;
      case 'hardware':
        return <Zap size={16} />;
      case 'ai':
        return <Code size={16} />;
      default:
        return <Folder size={16} />;
    }
  };

  const typeLabel = (type: ProjectType) => {
    switch (type) {
      case 'isro': return 'ISRO';
      case 'ai': return 'AI / CV';
      default: return type.toUpperCase();
    }
  };

  return (
    <section className="min-h-screen py-24 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-20">
        <div className="space-y-20">
          {/* Section Title */}
          <Reveal className="flex items-center space-x-4 mb-16">
            <h2 className="text-2xl font-bold text-slate-100 font-mono">
              <span className="text-blue-400">03.</span> Complete Mission Log
            </h2>
            <div className="flex-1 h-px bg-slate-600"></div>
          </Reveal>

          <Reveal delay={0.05} className="max-w-3xl">
            <p className="text-slate-400 leading-relaxed text-justify">
              A log of what I've actually shipped and fabricated — ISRO software tooling, CAD
              automation, CFD-validated hardware builds, and the odd hackathon project. Featured
              work first, everything else below it.
            </p>
          </Reveal>

          {/* Featured Projects */}
          <div className="space-y-20">
            {featuredProjects.map((project, index) => (
              <Reveal
                key={index}
                delay={index * 0.08}
                className="grid lg:grid-cols-12 gap-8 items-center"
              >
                {/* Project Visual */}
                <SpotlightCard
                  tilt
                  spotlightColor="rgba(96,165,250,0.12)"
                  className={`lg:col-span-7 rounded-lg ${index % 2 === 1 ? 'lg:col-start-6' : 'lg:col-start-1'}`}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <ProjectVisual variant={project.visual} className="w-full h-80" />
                    {/* Project Type Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono border flex items-center gap-2 backdrop-blur-sm ${getProjectTypeColor(project.type)}`}>
                      {getProjectIcon(project.type)}
                      {typeLabel(project.type)}
                    </div>
                  </div>
                </SpotlightCard>

                {/* Project Info */}
                <div className={`lg:col-span-5 space-y-5 ${
                  index % 2 === 1
                    ? 'lg:col-start-1 lg:row-start-1 lg:text-left'
                    : 'lg:col-start-8 lg:text-right'
                }`}>
                  <p className="text-blue-400 font-mono text-sm">Featured Project</p>

                  <h3 className="text-2xl font-bold text-slate-100 hover:text-blue-400 transition-colors duration-300">
                    {project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cursor-hover">
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>

                  <SpotlightCard className="bg-slate-800 bg-opacity-90 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-slate-700 border-opacity-50">
                    <p className="text-slate-300 leading-relaxed text-justify">
                      {project.description}
                    </p>
                  </SpotlightCard>

                  <div className={`flex flex-wrap gap-3 ${index % 2 === 1 ? 'lg:justify-start' : 'lg:justify-end'}`}>
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-slate-400 font-mono text-sm hover:text-blue-400 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {(project.liveUrl || project.paperUrl) && (
                    <div className={`flex items-center space-x-5 ${index % 2 === 1 ? 'lg:justify-start' : 'lg:justify-end'}`}>
                      {project.paperUrl && (
                        <Magnetic strength={0.3}>
                          <a
                            href={project.paperUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors duration-300 font-mono text-sm cursor-hover"
                          >
                            <FileText size={16} />
                            Read Paper
                          </a>
                        </Magnetic>
                      )}
                      {project.liveUrl && (
                        <Magnetic strength={0.4}>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-400 transition-colors duration-300 block cursor-hover"
                          >
                            <ExternalLink size={22} />
                          </a>
                        </Magnetic>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Other Projects */}
          <div className="space-y-12">
            <Reveal className="text-center">
              <h3 className="text-xl font-bold text-slate-100">Other Noteworthy Projects</h3>
            </Reveal>

            {/* Project Type Legend */}
            <Reveal className="flex justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 text-blue-300 text-sm font-mono">
                <Radio size={16} />
                ISRO
              </div>
              <div className="flex items-center gap-2 text-orange-300 text-sm font-mono">
                <Wrench size={16} />
                Research
              </div>
              <div className="flex items-center gap-2 text-purple-300 text-sm font-mono">
                <Layers size={16} />
                Tool
              </div>
              <div className="flex items-center gap-2 text-green-300 text-sm font-mono">
                <Zap size={16} />
                Hardware
              </div>
              <div className="flex items-center gap-2 text-cyan-300 text-sm font-mono">
                <Code size={16} />
                AI / CV
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project, index) => (
                <Reveal key={index} delay={(index % 3) * 0.08}>
                  <SpotlightCard className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-lg border border-slate-700 border-opacity-50 hover:border-slate-600 hover:border-opacity-70 transition-colors duration-300 group cursor-hover h-full overflow-hidden">
                    <ProjectVisual variant={project.visual} className="w-full h-36" />
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`px-2.5 py-1 rounded-full text-xs font-mono border flex items-center gap-1.5 ${getProjectTypeColor(project.type)}`}>
                          {getProjectIcon(project.type)}
                          {typeLabel(project.type)}
                        </div>
                        <div className="flex items-center gap-3">
                          {project.paperUrl && (
                            <Magnetic strength={0.3}>
                              <a
                                href={project.paperUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-blue-400 transition-colors duration-300 block cursor-hover"
                                aria-label="Read paper"
                              >
                                <FileText size={18} />
                              </a>
                            </Magnetic>
                          )}
                          {project.liveUrl && (
                            <Magnetic strength={0.4}>
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-blue-400 transition-colors duration-300 block cursor-hover"
                              >
                                <ExternalLink size={20} />
                              </a>
                            </Magnetic>
                          )}
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold text-slate-100 mb-4 group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h4>

                      <p className="text-slate-400 text-sm mb-6 leading-relaxed text-justify group-hover:text-slate-300 transition-colors duration-300">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-slate-500 font-mono text-xs group-hover:text-slate-400 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Skills by category */}
          <Reveal className="space-y-8">
            <h3 className="text-xl font-bold text-slate-100 text-center">Technical Skills</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { category: 'Design & CAD', items: ['SolidWorks', 'AutoCAD', 'Creo', 'Fusion 360'] },
                { category: 'Simulation', items: ['Ansys Fluent', 'CFD', 'FEA', 'MATLAB'] },
                { category: 'Mechatronics', items: ['Arduino', 'GRBL', 'Stepper Motors', 'CNC Integration'] },
                { category: 'AI & Automation', items: ['Python', 'YOLOv8', 'OpenCV', 'Streamlit'] },
              ].map((group, i) => (
                <SpotlightCard
                  key={i}
                  className="p-6 rounded-lg border border-slate-700/40 bg-slate-800/20 cursor-hover h-full"
                >
                  <h4 className="text-blue-400 font-mono text-sm mb-4">{group.category}</h4>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-slate-400 text-sm">{item}</li>
                    ))}
                  </ul>
                </SpotlightCard>
              ))}
            </div>
          </Reveal>

          {/* View More */}
          <Reveal className="text-center">
            <Magnetic strength={0.25}>
              <a
                href="https://github.com/AlokDadhich"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 border border-blue-400 text-blue-400 rounded font-mono text-sm hover:bg-blue-400 hover:bg-opacity-10 transition-all duration-300 cursor-hover"
              >
                Show More
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Projects;
