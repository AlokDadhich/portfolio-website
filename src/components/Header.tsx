import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
  { name: 'Work', path: '/work' },
  { name: 'Contact', path: '/contact' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsScrolled(window.scrollY > 50);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-slate-900/80 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Magnetic key={item.path} strength={0.25}>
                  <Link
                    to={item.path}
                    className={`relative text-sm font-mono py-2 group cursor-hover transition-colors duration-300 ${
                      isActive ? 'text-blue-400' : 'text-slate-400 hover:text-blue-400'
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-out ${
                        isActive ? 'left-0 right-0 w-full' : 'right-0 w-0 group-hover:w-full group-hover:left-0 group-hover:right-auto'
                      }`}
                    ></span>
                  </Link>
                </Magnetic>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-blue-400 transition-colors duration-300 cursor-hover"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50">
            <nav className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-left text-sm font-mono relative group py-2 cursor-hover transition-colors duration-300 ${
                      isActive ? 'text-blue-400' : 'text-slate-400 hover:text-blue-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
