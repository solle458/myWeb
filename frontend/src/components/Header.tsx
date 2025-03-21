"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if viewport is mobile size and handle scroll
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        document.body.style.overflow = ''; // Reset body overflow when resized to desktop
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Set initial states
    handleResize();
    handleScroll();

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = ''; // Reset on unmount
    };
  }, []);

  // Toggle menu with body lock for mobile
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent background scrolling when menu is open (mobile only)
    if (isMobile) {
      if (!isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  };

  // Menu items with their routes
  const menuItems = [
    { name: 'ABOUT', href: '/about' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'SKILLS', href: '/skills' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'BLOG', href: '/blog' },
    { name: 'PHOTO', href: '/photo' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white bg-opacity-90 shadow-md' : 'bg-white/50'
    }`}>
      <div className="max-w-7xl h-header-mobile md:h-header mx-auto md:px-10 px-5 flex justify-between items-center relative">
        {/* Logo/Title with hover effect */}
        <Link href="/" className="block md:w-[250px] w-[180px] relative">
          <div 
            className={`absolute rounded-full w-48 h-16 transition-all duration-700 ${
              hoveredItem === 'logo' ? 'opacity-70 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{
              background: 'radial-gradient(circle, rgba(0,150,255,0.8) 0%, rgba(255,255,255,0) 70%)',
              filter: hoveredItem === 'logo' ? 'blur(10px)' : 'blur(5px)',
              transform: `translate(-65%, -50%) ${hoveredItem === 'logo' ? 'scale(2.2)' : 'scale(0.8)'}`,
              left: '50%',
              top: '50%',
              pointerEvents: 'none',
            }}
          />
          <h1 
            className="font-montserrat font-bold text-2xl text-white transition-all duration-300"
            style={{
              textShadow: hoveredItem === 'logo' 
                ? "2px 2px 12px #4b2c14, 0 0 10px rgba(0,150,255,0.3)" 
                : "1px 1px 10px #4b2c14",
            }}
            onMouseEnter={() => setHoveredItem('logo')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            MIYAKI SHOGO
          </h1>
        </Link>

        {/* Modern hamburger menu button - mobile only */}
        <button
          onClick={toggleMenu}
          className="relative z-50 md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <span 
              className={`absolute h-0.5 w-6 bg-black rounded-full transform transition-all duration-300 ease-in-out ${
                isOpen ? 'rotate-45 top-3' : 'rotate-0 top-1'
              }`}
            />
            <span 
              className={`absolute h-0.5 w-6 bg-black rounded-full top-3 transform transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-0 -translate-x-2' : 'opacity-100 translate-x-0'
              }`}
            />
            <span 
              className={`absolute h-0.5 w-6 bg-black rounded-full transform transition-all duration-300 ease-in-out ${
                isOpen ? '-rotate-45 top-3' : 'rotate-0 top-5'
              }`}
            />
          </div>
        </button>

        {/* Desktop navigation - always visible on desktop */}
        <nav className="hidden md:block">
          <ul className="flex">
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                className="mx-5 relative"
                onMouseEnter={() => setHoveredItem(`menu-${index}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Gradient effect for each menu item */}
                <div 
                  className={`absolute rounded-full w-32 h-12 transition-all duration-500 ${
                    hoveredItem === `menu-${index}` ? 'opacity-70 scale-100' : 'opacity-0 scale-50'
                  }`}
                  style={{
                    background: 'radial-gradient(circle, rgba(0,150,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                    filter: hoveredItem === `menu-${index}` ? 'blur(8px)' : 'blur(3px)',
                    transform: `translate(-50%, -50%) ${hoveredItem === `menu-${index}` ? 'scale(2.2)' : 'scale(0.8)'}`,
                    left: '50%',
                    top: '50%',
                    pointerEvents: 'none',
                  }}
                />
                <Link 
                  href={item.href}
                  className="relative z-10 py-2 px-3 transition-all duration-300 font-bold"
                  style={{
                    textShadow: hoveredItem === `menu-${index}` 
                      ? '0 0 8px rgba(0,150,255,0.3)'
                      : 'none',
                    color: 'black',
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu overlay - only visible on mobile when open */}
        <div 
          className={`md:hidden fixed inset-0 bg-gradient-to-br from-white to-blue-50 z-40 transition-all duration-500 ease-in-out ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{
            clipPath: isOpen 
              ? 'circle(150% at top right)' 
              : 'circle(0% at calc(100% - 20px) 20px)',
            transition: 'clip-path 0.5s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.4s ease-in-out, visibility 0.4s ease-in-out',
          }}
        >
          <nav className="h-full flex items-center justify-center">
            <ul className="text-center">
              {menuItems.map((item, index) => (
                <li 
                  key={index} 
                  className="my-8 relative"
                  onMouseEnter={() => setHoveredItem(`menu-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isOpen ? 1 : 0,
                    transition: `transform 0.4s ease ${0.1 + index * 0.1}s, opacity 0.4s ease ${0.1 + index * 0.1}s`,
                    transitionDelay: isOpen ? `${0.1 + index * 0.1}s` : '0s',
                  }}
                >
                  {/* Gradient effect for each menu item */}
                  <div 
                    className={`absolute rounded-full w-32 h-12 transition-all duration-500 ${
                      hoveredItem === `menu-${index}` ? 'opacity-70 scale-100' : 'opacity-0 scale-50'
                    }`}
                    style={{
                      background: 'radial-gradient(circle, rgba(0,150,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                      filter: hoveredItem === `menu-${index}` ? 'blur(8px)' : 'blur(3px)',
                      transform: `translate(-50%, -50%) ${hoveredItem === `menu-${index}` ? 'scale(2.2)' : 'scale(0.8)'}`,
                      left: '50%',
                      top: '50%',
                      pointerEvents: 'none',
                    }}
                  />
                  <Link 
                    href={item.href}
                    className={`relative z-10 py-2 px-3 text-lg transition-all duration-300 ${
                      hoveredItem === `menu-${index}` ? 'font-bold' : ''
                    }`}
                    style={{
                      textShadow: hoveredItem === `menu-${index}` 
                        ? '0 0 8px rgba(0,150,255,0.5)'
                        : 'none',
                      color: 'black',
                    }}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
