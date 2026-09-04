import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Code, Database, Server } from 'lucide-react';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      period: "2024 — PRESENT",
      title: "Full Stack Systems Engineer",
      company: "Freelance Development",
      companyUrl: "#",
      description: "Architect and deploy scalable web applications using modern JavaScript frameworks and cloud infrastructure. Implement RESTful APIs, database optimization, and CI/CD pipelines. Focus on performance optimization, security best practices, and maintainable code architecture across multiple client projects.",
      technologies: ["JavaScript", "TypeScript", "React", "Node.js", "Express.js", "MongoDB", "AWS", "Docker"],
      icon: <Code className="w-5 h-5" />
    },
    {
      period: "2023 — 2024",
      title: "Frontend Development Specialist",
      company: "Web Application Projects",
      companyUrl: "#",
      description: "Developed responsive web applications with emphasis on user experience and performance optimization. Implemented modern frontend architectures using component-based design patterns, state management solutions, and automated testing frameworks. Collaborated with design teams to translate mockups into pixel-perfect interfaces.",
      technologies: ["React", "Webflow", "HTML5", "CSS3", "JavaScript", "Responsive Design", "Git", "Figma"],
      icon: <Server className="w-5 h-5" />
    },
    {
      period: "2022 — 2023",
      title: "IoT Systems Developer",
      company: "Solar Still Monitoring System",
      companyUrl: "https://solar-still.vercel.app/",
      description: "Built end-to-end IoT solution for real-time environmental monitoring and data analytics. Developed sensor integration protocols, implemented data visualization dashboards, and created predictive algorithms for system optimization. Managed database architecture and API development for seamless data flow.",
      technologies: ["IoT", "Python", "React", "Express.js", "Machine Learning", "MongoDB", "Raspberry Pi", "Sensors"],
      icon: <Database className="w-5 h-5" />
    }
  ];

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-24 relative"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="space-y-16">
            {/* Section Title with Cosmic Theme */}
            <div className="flex items-center space-x-4 mb-16">
              <h2 className="text-2xl font-bold text-slate-100 font-mono">
                <span className="text-blue-400">02.</span> Cosmic History
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-600 via-blue-400/50 to-slate-600"></div>
            </div>

            {/* Experience Timeline with Technical Focus */}
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className="group p-6 rounded-lg transition-all duration-300 hover:bg-slate-800/20 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer border border-transparent hover:border-slate-700/50"
                >
                  <div className="grid lg:grid-cols-4 gap-6">
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
                            className="inline-flex items-center space-x-1 text-blue-400 hover:underline hover:text-blue-300 transition-colors duration-300"
                          >
                            <span>{exp.company}</span>
                            <ExternalLink size={14} />
                          </a>
                        </h3>
                      </div>

                      <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
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
                </div>
              ))}
            </div>

            {/* Resume Link with Technical Theme */}
            <div className="text-center pt-8">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-8 py-4 border border-blue-400 text-blue-400 rounded font-mono text-sm hover:bg-blue-400/10 hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 group"
              >
                <Code className="w-4 h-4 group-hover:animate-pulse" />
                <span>View Full Technical Resume</span>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;