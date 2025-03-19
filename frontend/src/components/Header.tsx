"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    <header className="md:static fixed top-0 left-0 right-0 bg-white md:h-header h-header-mobile z-10 md:shadow-none">
      <div className="max-w-7xl h-full mx-auto md:px-10 px-5 flex justify-between items-center relative">
        <Link href="/" className="block md:w-[170px] w-[100px]">
          <Image
            src="/images/common/logo-header.png"
            alt="KISSA"
            width={170}
            height={50}
            priority
          />
        </Link>

        <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-black mb-1.5 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black mb-1.5 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

        <div className={`md:block ${isOpen ? 'block' : 'hidden'} md:static absolute top-full left-0 right-0 md:bg-transparent bg-kissa-menu-bg md:text-black text-white md:p-0 pt-[30px] pb-[50px]`}>
          <nav className="site-menu">
            <ul className="md:flex block md:text-left text-center">
              <li className="md:mx-5 md:mt-0 mt-5 transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"><Link href="/about">ABOUT</Link></li>
              <li className="md:mx-5 md:mt-0 mt-5 transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"><Link href="/projects">PROJECTS</Link></li>
              <li className="md:mx-5 md:mt-0 mt-5 transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"><Link href="/skills">SKILLS</Link></li>
              <li className="md:mx-5 md:mt-0 mt-5 transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"><Link href="/contact">CONTACT</Link></li>
              <li className="md:mx-5 md:mt-0 mt-5 transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"><Link href="/blog">BLOG</Link></li>
              <li className="md:mx-5 md:mt-0 mt-5 transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"><Link href="/photo">PHOTO</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    // <header className="text-black">
    //   <div className="container mx-auto px-4">
    //     <div className="flex justify-between items-center py-4">
    //       {/* Logo */}
    //       <div className="text-xl font-bold">
    //       <Image src="/images/logo3.png" alt="Portfolio Logo" className="hover:text-blue-400 transition duration-300" width={50} height={50} />
    //       </div>

    //       {/* Desktop Navigation */}
    //       <nav className={`hidden md:flex space-x-8`}>
    //         <a href="#about" className="hover:text-blue-300 transition duration-300">About</a>
    //         <a href="#projects" className="hover:text-blue-300 transition duration-300">Projects</a>
    //         <a href="#skills" className="hover:text-blue-300 transition duration-300">Skills</a>
    //         <a href="#contact" className="hover:text-blue-300 transition duration-300">Contact</a>
    //         <a href="#blog" className="hover:text-blue-300 transition duration-300">Blog</a>
    //         <a href="#photo" className="hover:text-blue-300 transition duration-300">Photo</a>
    //       </nav>

    //       {/* Hamburger Menu Button */}
    //       <button 
    //         onClick={toggleMenu} 
    //         className="md:hidden flex flex-col justify-center items-center"
    //         aria-label="Toggle menu"
    //       >
    //         <span className={`block w-6 h-0.5 bg-black mb-1.5 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
    //         <span className={`block w-6 h-0.5 bg-black mb-1.5 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
    //         <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
    //       </button>
    //     </div>

    //     {/* Mobile Menu */}
    //     <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
    //       <nav className="flex flex-col space-y-4 py-4">
    //         <a 
    //           href="#about" 
    //           className="hover:text-blue-300 transition duration-300"
    //           onClick={() => setIsOpen(false)}
    //         >
    //           About
    //         </a>
    //         <a 
    //           href="#projects" 
    //           className="hover:text-blue-300 transition duration-300"
    //           onClick={() => setIsOpen(false)}
    //         >
    //           Projects
    //         </a>
    //         <a 
    //           href="#skills" 
    //           className="hover:text-blue-300 transition duration-300"
    //           onClick={() => setIsOpen(false)}
    //         >
    //           Skills
    //         </a>
    //         <a 
    //           href="#contact" 
    //           className="hover:text-blue-300 transition duration-300"
    //           onClick={() => setIsOpen(false)}
    //         >
    //           Contact
    //         </a>
    //       </nav>
    //     </div>
    //   </div>
    // </header>
  );
};

export default Header;
