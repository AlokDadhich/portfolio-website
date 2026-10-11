import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Magnetic from './Magnetic';

// Lives outside the page-transition wrapper deliberately: these are
// `position: fixed`, and nesting them inside any ancestor that gets a
// `transform`/`filter` (like the zoom transition) would silently break
// their fixed positioning relative to the viewport.
const HeroSideLinks: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isHeroSection, setIsHeroSection] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoaded(true), 100);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      const heroHeight = window.innerHeight;
      setIsHeroSection(currentScrollY < heroHeight * 0.7);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(loadTimer);
    };
  }, []);

  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const scrollProgress = Math.min(scrollY / (heroHeight * 0.6), 1);
  const translateY = scrollProgress * -120;

  return (
    <>
      <div
        className={`fixed left-6 bottom-0 hidden lg:flex flex-col items-center space-y-6 z-30 transition-all duration-700 ease-out ${
          isLoaded && isHeroSection ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
        }`}
        style={{ transform: isLoaded ? `translateY(${translateY}px)` : 'translateY(0px)' }}
      >
        {[
          { icon: Github, href: "https://github.com/AlokDadhich", label: "GitHub" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/alok-dadhich-49741724a/", label: "LinkedIn" },
          { icon: Mail, href: "mailto:alokdadhich479@gmail.com?subject=Hello%20Alok&body=Hi%20Alok,%0D%0A%0D%0AI%20would%20like%20to%20get%20in%20touch%20with%20you.%0D%0A%0D%0ABest%20regards", label: "Gmail" }
        ].map((social, index) => (
          <Magnetic key={index} strength={0.4}>
            <a
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : '_self'}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
              className="p-3 text-slate-400 hover:text-blue-400 transition-colors duration-300 group cursor-hover block"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </a>
          </Magnetic>
        ))}
        <div className="w-px h-24 bg-slate-600"></div>
      </div>

      <div
        className={`fixed right-6 bottom-0 hidden lg:flex flex-col items-center space-y-6 z-30 transition-all duration-700 ease-out ${
          isLoaded && isHeroSection ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
        style={{ transform: isLoaded ? `translateY(${translateY}px)` : 'translateY(0px)' }}
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
    </>
  );
};

export default HeroSideLinks;
