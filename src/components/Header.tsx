import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/80 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          {/* Desktop Navigation - Centered with Underline Effects */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'About', id: 'about' },
              { name: 'Experience', id: 'experience' },
              { name: 'Work', id: 'projects' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm font-mono py-2 group"
              >
                {item.name}
                {/* Smooth underline effect from right to left */}
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 ease-out group-hover:w-full group-hover:left-0 group-hover:right-auto"></span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-blue-400 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50">
            <nav className="flex flex-col space-y-4 p-6">
              {[
                { name: 'About', id: 'about' },
                { name: 'Experience', id: 'experience' },
                { name: 'Work', id: 'projects' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm font-mono relative group py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 ease-out group-hover:w-full group-hover:left-0 group-hover:right-auto"></span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;