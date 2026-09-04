import React, { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isHeroSection, setIsHeroSection] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const texts = [
    'Full Stack Developer',
    'Mechanical Engineer', 
    'Problem Solver',
    'Tech Enthusiast'
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

  useEffect(() => {
    // Set loaded state after component mounts
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Fade out icons much earlier - when we're 70% through hero section
      const heroHeight = window.innerHeight;
      setIsHeroSection(currentScrollY < heroHeight * 0.7);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(loadTimer);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate transform based on scroll position - more aggressive movement
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const scrollProgress = Math.min(scrollY / (heroHeight * 0.6), 1);
  const translateY = scrollProgress * -120; // Move up faster

  return (
    <>
      {/* Star Field Background */}
      <div className="stars stars-small"></div>
      <div className="stars stars-medium"></div>
      <div className="stars stars-big"></div>
      
      <section 
        id="hero"
        className="min-h-screen flex items-center justify-center relative"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-left relative z-20">
          <div className="space-y-8 fade-in-up">
            {/* Greeting */}
            <p className="text-base text-slate-400 font-mono">Hi, my name is</p>

            {/* Main Heading - Smaller Size */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-100 tracking-tight">
                Alok Dadhich.
              </h1>
              
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-400 tracking-tight">
          An engineer creating digital experiences for the real world.
        </h2>
            </div>

            {/* Typing Animation */}
            <div className="text-lg sm:text-xl text-slate-300 h-8 flex items-center">
              <span className="text-blue-400 font-mono">
                {currentText}
              </span>
              <span className="w-0.5 h-6 bg-blue-400 animate-pulse ml-1"></span>
            </div>

            {/* Description */}
            <div className="max-w-2xl">
  <p className="text-slate-400 leading-relaxed text-justify">
    Mechanical engineering student and full-stack developer blending product thinking,
    engineering logic, and user-centered design to create meaningful web experiences.
    Currently exploring how digital systems and engineering come together to shape smarter,
    more scalable solutions.
  </p>
</div>


            {/* CTA Button */}
            <div className="pt-8">
              <button
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 border border-blue-400 text-blue-400 rounded font-mono text-sm hover:bg-blue-400/10 transition-all duration-300"
              >
                Check out my work!
              </button>
            </div>

            {/* Social Links - Positioned at bottom left with proper loading state */}
            <div 
              className={`fixed left-6 bottom-0 hidden lg:flex flex-col items-center space-y-6 z-30 transition-all duration-700 ease-out ${
                isLoaded && isHeroSection ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
              }`}
              style={{
                transform: isLoaded ? `translateY(${translateY}px)` : 'translateY(0px)',
              }}
            >
              {[
                { icon: Github, href: "https://github.com/AlokDadhich", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/alok-dadhich-49741724a/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:alokdadhich479@gmail.com?subject=Hello%20Alok&body=Hi%20Alok,%0D%0A%0D%0AI%20would%20like%20to%20get%20in%20touch%20with%20you.%0D%0A%0D%0ABest%20regards", label: "Gmail" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="p-3 text-slate-400 hover:text-blue-400 hover:-translate-y-1 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
              <div className="w-px h-24 bg-slate-600"></div>
            </div>

            {/* Email Text - Positioned at bottom right with proper loading state */}
            <div 
              className={`fixed right-6 bottom-0 hidden lg:flex flex-col items-center space-y-6 z-30 transition-all duration-700 ease-out ${
                isLoaded && isHeroSection ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
              }`}
              style={{
                transform: isLoaded ? `translateY(${translateY}px)` : 'translateY(0px)',
              }}
            >
              <a
                href="mailto:alokdadhich479@gmail.com?subject=Hello%20Alok&body=Hi%20Alok,%0D%0A%0D%0AI%20would%20like%20to%20get%20in%20touch%20with%20you.%0D%0A%0D%0ABest%20regards"
                className="text-slate-400 hover:text-blue-400 hover:-translate-y-1 transition-all duration-300 font-mono text-sm group"
                style={{ writingMode: 'vertical-rl' }}
                aria-label="Send email to alokdadhich479@gmail.com"
              >
                alokdadhich479@gmail.com
              </a>
              <div className="w-px h-24 bg-slate-600"></div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => scrollToSection('about')}
                className="animate-bounce p-2 text-slate-400 hover:text-blue-400 transition-colors duration-300"
              >
                <ArrowDown size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;