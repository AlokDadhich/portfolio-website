import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Folder, Wrench, Code, Zap, Layers } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const featuredProjects = [
    {
      title: "Solar Still R&D (Dassault)",
      description: "Built a virtual laboratory with three configurations: conventional, with condenser, and with Fresnel lens + condenser. Developed ML model to predict yield from date and water input, studying effects of water depth on evaporation.",
      image: "https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Machine Learning", "Python", "Flask", "Virtual Lab", "Thermal Analysis"],
      liveUrl: "https://solar-still-predictor.onrender.com/",
      type: "fullstack",
      featured: true
    },
    {
      title: "Hospifyy - Healthcare Platform",
      description: "Full-stack healthcare management system with appointment scheduling, patient records, and doctor dashboard. Built with MERN stack for seamless user experience and efficient data management.",
      image: "https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "Full Stack"],
      liveUrl: "https://hospifyy.netlify.app/",
      type: "fullstack",
      featured: true
    },
    {
      title: "VIT Pune MUN Platform",
      description: "Official website for VIT Pune Model United Nations conference. Led as Under-Secretary-General, boosted participation by 10% through strategic outreach campaigns and modern responsive web design.",
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Webflow", "UI/UX Design", "Event Management", "Responsive Design"],
      liveUrl: "https://www.vitpunemun.com/",
      type: "web",
      featured: true
    }
  ];

  const otherProjects = [
    {
      title: "HiTech Pune",
      description: "Full-stack business website for technology solutions company with dynamic content management, service showcases, and client portfolio sections.",
      technologies: ["MERN Stack", "React", "Node.js", "MongoDB"],
      liveUrl: "https://hitechpune.co.in/",
      type: "fullstack",
      icon: "layers"
    },
    {
      title: "Kaladham Cultural Platform",
      description: "Interactive cultural platform showcasing arts and events with seamless navigation, gallery features, and event management system.",
      technologies: ["React", "Next.js", "Vercel", "UI/UX"],
      liveUrl: "https://kaladhamsite.vercel.app/",
      type: "fullstack",
      icon: "layers"
    },
    {
      title: "Numan Trainfotech",
      description: "Corporate training platform with course listings, registration system, and resource management for professional development services.",
      technologies: ["MERN Stack", "React", "Full Stack Development"],
      liveUrl: "https://numantrainfotech.com/",
      type: "fullstack",
      icon: "layers"
    },
    {
      title: "Vector Studio",
      description: "Creative agency portfolio website featuring project showcases, service offerings, and client testimonials with modern animations.",
      technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      liveUrl: "https://alokdadhich.github.io/VectorStudio/",
      type: "web",
      icon: "code"
    },
    {
      title: "Vishwa Conclave 2024",
      description: "Managed official conference website as Website Head for 2,500+ visitors. Features event scheduling and participant management.",
      technologies: ["Webflow", "UI/UX Design", "Event Management", "CMS"],
      liveUrl: "https://vishwaconclave24.webflow.io/",
      type: "web",
      icon: "code"
    },
    {
      title: "Gling E-commerce",
      description: "E-commerce platform with product catalogs, shopping cart functionality, and secure payment processing using Google Sites and Ecwid.",
      technologies: ["Google Sites", "Ecwid", "E-commerce", "Payment Integration"],
      liveUrl: "https://www.theglintforyou.com/",
      type: "web",
      icon: "code"
    },
    {
      title: "Heat Sink CFD Simulation",
      description: "Simulated fin geometries in Ansys Fluent to study airflow and heat transfer. Compared multiple designs to identify most effective cooling configuration.",
      technologies: ["Ansys Fluent", "CFD", "Thermal Engineering", "SolidWorks"],
      type: "engineering",
      icon: "wrench"
    },
    {
      title: "Tesla Turbine Analysis",
      description: "Modeled bladeless turbine in CAD and performed CFD analysis to evaluate flow characteristics, torque output, and efficiency improvements.",
      technologies: ["SolidWorks", "CFD Analysis", "CAD Modeling", "MATLAB"],
      type: "engineering",
      icon: "wrench"
    },
    {
      title: "Reciprocating Air Compressor",
      description: "Conducted design study on reciprocation gear. Analyzed cooling and thermal management strategies using spiral-groove concepts.",
      technologies: ["Ansys Fluent", "Thermal Analysis", "Mechanical Design"],
      type: "engineering",
      icon: "wrench"
    },
    {
      title: "CNC for Robotics",
      description: "Developed CNC coding and robotic machining model focused on tool-path generation to enhance machining precision and repeatability.",
      technologies: ["CNC Programming", "Robotics", "Automation"],
      type: "engineering",
      icon: "wrench"
    },
    {
      title: "IoT Solar Tracker",
      description: "Designed IoT-based Arduino solar tracker to dynamically align panels with sunlight, improving energy capture efficiency.",
      technologies: ["Arduino", "IoT", "Solar Technology", "Hardware"],
      type: "iot",
      icon: "zap"
    },
    {
      title: "MedBuzz IoT System",
      description: "Developed IoT vitals monitoring system with real-time emergency alerts, enabling faster caregiver response and improved patient safety.",
      technologies: ["IoT", "Real-time Systems", "Healthcare", "Emergency Alerts"],
      type: "iot",
      icon: "zap"
    }
  ];

  const getProjectTypeColor = (type) => {
    switch (type) {
      case 'engineering':
        return 'bg-orange-400 bg-opacity-20 text-orange-300 border-orange-400 border-opacity-30';
      case 'web':
        return 'bg-blue-400 bg-opacity-20 text-blue-300 border-blue-400 border-opacity-30';
      case 'fullstack':
        return 'bg-purple-400 bg-opacity-20 text-purple-300 border-purple-400 border-opacity-30';
      case 'iot':
        return 'bg-green-400 bg-opacity-20 text-green-300 border-green-400 border-opacity-30';
      default:
        return 'bg-slate-400 bg-opacity-20 text-slate-300 border-slate-400 border-opacity-30';
    }
  };

  const getProjectIcon = (type) => {
    switch (type) {
      case 'engineering':
        return <Wrench size={16} />;
      case 'web':
        return <Code size={16} />;
      case 'fullstack':
        return <Layers size={16} />;
      case 'iot':
        return <Zap size={16} />;
      default:
        return <Folder size={16} />;
    }
  };

  const getIconForCard = (iconType) => {
    switch (iconType) {
      case 'layers':
        return <Layers size={24} />;
      case 'code':
        return <Code size={24} />;
      case 'wrench':
        return <Wrench size={24} />;
      case 'zap':
        return <Zap size={24} />;
      default:
        return <Folder size={24} />;
    }
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-24 relative"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-20">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="space-y-20">
            {/* Section Title */}
            <div className="flex items-center space-x-4 mb-16">
              <h2 className="text-2xl font-bold text-slate-100 font-mono">
                <span className="text-blue-400">03.</span> Complete Mission Log
              </h2>
              <div className="flex-1 h-px bg-slate-600"></div>
            </div>

            {/* Featured Projects */}
            <div className="space-y-20">
              {featuredProjects.map((project, index) => (
                <div 
                  key={index} 
                  className="grid lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Project Image */}
                  <div className={`lg:col-span-7 relative group ${index % 2 === 1 ? 'lg:col-start-6' : 'lg:col-start-1'}`}>
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-80 object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-blue-900 bg-opacity-20 hover:bg-opacity-0 transition-all duration-500"></div>
                      {/* Project Type Badge */}
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono border flex items-center gap-2 backdrop-blur-sm ${getProjectTypeColor(project.type)}`}>
                        {getProjectIcon(project.type)}
                        {project.type === 'fullstack' ? 'FULL STACK' : project.type.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className={`lg:col-span-5 space-y-5 ${
                    index % 2 === 1 
                      ? 'lg:col-start-1 lg:row-start-1 lg:text-left' 
                      : 'lg:col-start-8 lg:text-right'
                  }`}>
                    <p className="text-blue-400 font-mono text-sm">Featured Project</p>
                    
                    <h3 className="text-2xl font-bold text-slate-100 hover:text-blue-400 transition-colors duration-300">
                      {project.liveUrl ? (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    
                    <div className="bg-slate-800 bg-opacity-90 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-slate-700 border-opacity-50">
                      <p className="text-slate-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

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

                    {project.liveUrl && (
                      <div className={`flex items-center space-x-5 ${index % 2 === 1 ? 'lg:justify-start' : 'lg:justify-end'}`}>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-blue-400 hover:-translate-y-1 transition-all duration-300"
                        >
                          <ExternalLink size={22} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Other Projects */}
            <div className="space-y-12">
              <h3 className="text-xl font-bold text-slate-100 text-center">Other Noteworthy Projects</h3>
              
              {/* Project Type Legend */}
              <div className="flex justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2 text-purple-300 text-sm font-mono">
                  <Layers size={16} />
                  Full Stack
                </div>
                <div className="flex items-center gap-2 text-blue-300 text-sm font-mono">
                  <Code size={16} />
                  Web Dev
                </div>
                <div className="flex items-center gap-2 text-orange-300 text-sm font-mono">
                  <Wrench size={16} />
                  Engineering
                </div>
                <div className="flex items-center gap-2 text-green-300 text-sm font-mono">
                  <Zap size={16} />
                  IoT Systems
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherProjects.map((project, index) => (
                  <div 
                    key={index} 
                    className="bg-slate-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg border border-slate-700 border-opacity-50 hover:bg-slate-800 hover:bg-opacity-70 hover:border-slate-600 hover:border-opacity-70 transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-2 rounded-lg ${getProjectTypeColor(project.type)} transition-colors duration-300`}>
                        {getIconForCard(project.icon)}
                      </div>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-blue-400 hover:-translate-y-1 transition-all duration-300"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                    
                    <h4 className="text-lg font-semibold text-slate-100 mb-4 group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h4>
                    
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
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
                ))}
              </div>
            </div>

            {/* View More */}
            <div className="text-center">
              <a
                href="https://github.com/AlokDadhich"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 border border-blue-400 text-blue-400 rounded font-mono text-sm hover:bg-blue-400 hover:bg-opacity-10 transition-all duration-300"
              >
                Show More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;