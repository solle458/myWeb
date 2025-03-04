"use client";

import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-xl font-bold">
            <a href="/" className="flex items-center">
              {/* You can add your logo here */}
              <span>Your Portfolio</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex space-x-8`}>
            <a href="#about" className="hover:text-blue-400 transition duration-300">About</a>
            <a href="#projects" className="hover:text-blue-400 transition duration-300">Projects</a>
            <a href="#skills" className="hover:text-blue-400 transition duration-300">Skills</a>
            <a href="#contact" className="hover:text-blue-400 transition duration-300">Contact</a>
          </nav>

          {/* Hamburger Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden flex flex-col justify-center items-center"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <nav className="flex flex-col space-y-4 py-4">
            <a 
              href="#about" 
              className="hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a 
              href="#projects" 
              className="hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#skills" 
              className="hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Skills
            </a>
            <a 
              href="#contact" 
              className="hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
