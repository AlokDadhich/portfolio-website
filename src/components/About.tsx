import React, { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);
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

  const technologies = [
    { name: 'JavaScript (ES6+)', color: 'text-yellow-400', bgColor: 'bg-yellow-400/10', borderColor: 'border-yellow-400/30' },
    { name: 'TypeScript', color: 'text-blue-400', bgColor: 'bg-blue-400/10', borderColor: 'border-blue-400/30' },
    { name: 'React', color: 'text-cyan-400', bgColor: 'bg-cyan-400/10', borderColor: 'border-cyan-400/30' },
    { name: 'Node.js', color: 'text-green-400', bgColor: 'bg-green-400/10', borderColor: 'border-green-400/30' },
    { name: 'Express.js', color: 'text-gray-400', bgColor: 'bg-gray-400/10', borderColor: 'border-gray-400/30' },
    { name: 'MongoDB', color: 'text-green-500', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30' },
    { name: 'HTML & CSS', color: 'text-orange-400', bgColor: 'bg-orange-400/10', borderColor: 'border-orange-400/30' },
    { name: 'TailwindCSS', color: 'text-teal-400', bgColor: 'bg-teal-400/10', borderColor: 'border-teal-400/30' },
    { name: 'Python', color: 'text-blue-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30' },
    { name: 'Git', color: 'text-red-400', bgColor: 'bg-red-400/10', borderColor: 'border-red-400/30' },
    { name: 'Webflow', color: 'text-purple-400', bgColor: 'bg-purple-400/10', borderColor: 'border-purple-400/30' },
    { name: 'IoT', color: 'text-indigo-400', bgColor: 'bg-indigo-400/10', borderColor: 'border-indigo-400/30' }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 relative"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="space-y-16">
            {/* Section Title */}
            <div className="flex items-center space-x-4 mb-12">
              <h2 className="text-2xl font-bold text-slate-100 font-mono">
                <span className="text-blue-400">01.</span> About Me
              </h2>
              <div className="flex-1 h-px bg-slate-600"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    Hello! I'm Alok, a passionate developer who enjoys creating things that live on the internet. 
                    My interest in web development started back in 2020 when I decided to try editing custom 
                    Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!
                  </p>
                  
                  <p>
                    Fast-forward to today, and I've had the privilege of working on various projects ranging from 
                    corporate websites to IoT applications. My main focus these days is building accessible, 
                    inclusive products and digital experiences for a variety of clients.
                  </p>

                  <p>
                    I'm currently pursuing my degree in Mechanical Engineering while simultaneously building 
                    my expertise in full-stack development, combining analytical thinking with creative problem-solving.
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 mb-6">
                    Here are a few technologies I've been working with recently:
                  </p>
                  
                  {/* Interactive Technology Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {technologies.map((tech, index) => (
                      <div 
                        key={index} 
                        className={`
                          group relative p-3 rounded-lg border transition-all duration-300 cursor-pointer
                          ${hoveredTech === index 
                            ? `${tech.bgColor} ${tech.borderColor} scale-105 shadow-lg` 
                            : 'bg-slate-800/20 border-slate-700/30 hover:bg-slate-800/40 hover:border-slate-600/50'
                          }
                        `}
                        onMouseEnter={() => setHoveredTech(index)}
                        onMouseLeave={() => setHoveredTech(null)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`
                            text-sm transition-all duration-300
                            ${hoveredTech === index 
                              ? tech.color 
                              : 'text-blue-400 group-hover:text-blue-300'
                            }
                          `}>
                            ▹
                          </span>
                          <span className={`
                            text-sm font-mono transition-all duration-300
                            ${hoveredTech === index 
                              ? `${tech.color} font-semibold` 
                              : 'text-slate-400 group-hover:text-slate-300'
                            }
                          `}>
                            {tech.name}
                          </span>
                        </div>
                        
                        {/* Hover Effect Overlay */}
                        <div className={`
                          absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300
                          ${hoveredTech === index ? 'opacity-20' : ''}
                          ${tech.bgColor}
                        `} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative group">
                <div className="relative">
                  <img 
                    src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400" 
                    alt="Alok Dadhich"
                    className="w-full h-80 object-cover rounded filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 border-2 border-blue-400 rounded translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;