import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Single Line: Copyright and Back to Top */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-500 text-sm font-mono">
              Built by Alok Dadhich © {currentYear}
            </div>
            
            <button
              onClick={scrollToTop}
              className="text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm font-mono group"
            >
              <span className="group-hover:-translate-y-1 inline-block transition-transform duration-300">
                Back to top ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;