'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Define type for profile data
interface ProfileData {
  name: string;
  title: string;
  bio: string[];
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Profile data
  const profile: ProfileData = {
    name: "宮木 笙伍",
    title: "MIYAKI SHOGO",
    bio: [
      "京都産業大学 情報理工学部の宮木笙伍です。画像処理やAIに興味があり、C/C++、Python3を使って競技プログラミングやkaggleに取り組んでいます。web開発も勉強中で、React、Next.js、TypeScript、CSS、Tailwind CSS、Node.jsを使っています。",
      "IOORという競技プログラミングサークルの運営をしており、コンテストの開催や勉強会の企画を行っています。他にC.A.C.というデジタル創作系の部活や写真部に所属し活動しています。",
      "趣味は旅行とプログラミングで、旅行先の写真を撮るのが好きです。大人数の旅行も一人旅も両方します。普段は競技プログラミングをしています。"
    ],
    skills: ["C/C++", "Python3", "GO", "React", "Next.js", "TypeScript", "CSS", "Tailwind CSS", "Node.js", "Photography"],
    education: [
      {
        degree: "京都産業大学",
        institution: "情報理工学部",
        year: "2023 - Present"
      },
    ]
  };

  // Handle scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.1) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Set initial visibility to true
    setIsVisible(true);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <main className="pt-12 md:pt-18 bg-white min-h-screen">
      <div
        ref={containerRef}
        className={`max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Top section with photo and intro */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="relative">
            <div
              className={`absolute rounded-full w-64 h-64 transition-all duration-700 ${
                hoveredSection === 'photo' ? 'opacity-70 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                background: 'radial-gradient(circle, rgba(0,150,255,0.3) 0%, rgba(255,255,255,0) 70%)',
                filter: hoveredSection === 'photo' ? 'blur(10px)' : 'blur(5px)',
                transform: `translate(-50%, -50%) ${hoveredSection === 'photo' ? 'scale(2.2)' : 'scale(0.8)'}`,
                left: '50%',
                top: '50%',
                pointerEvents: 'none',
              }}
            />
            <div
              className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden"
              onMouseEnter={() => setHoveredSection('photo')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <Image
                src="/images/dark8.jpg" // Make sure to create this placeholder
                alt="Miyaki Shogo"
                fill
                style={{ objectFit: 'cover' }}
                className="transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div
              className="relative"
              onMouseEnter={() => setHoveredSection('intro')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <div
                className={`absolute rounded-full w-48 h-16 transition-all duration-700 ${
                  hoveredSection === 'intro' ? 'opacity-70 scale-100' : 'opacity-0 scale-50'
                }`}
                style={{
                  background: 'radial-gradient(circle, rgba(0,150,255,0.3) 0%, rgba(255,255,255,0) 70%)',
                  filter: hoveredSection === 'intro' ? 'blur(10px)' : 'blur(5px)',
                  transform: `translate(-110%, -50%) ${hoveredSection === 'intro' ? 'scale(2.2)' : 'scale(0.8)'}`,
                  left: '50%',
                  top: '50px',
                  pointerEvents: 'none',
                }}
              />
              <h1
                className="text-4xl md:text-5xl font-bold mb-3"
                style={{
                  textShadow: hoveredSection === 'intro' ? '0 0 8px rgba(0,150,255,0.3)' : 'none',
                }}
              >
                {profile.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-600 mb-6">{profile.title}</h2>

              {profile.bio.map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Skills section */}
        <section
          className="mb-16"
          onMouseEnter={() => setHoveredSection('skills')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="relative">
            <div
              className={`absolute rounded-full w-48 h-16 transition-all duration-700 ${
                hoveredSection === 'skills' ? 'opacity-70 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                background: 'radial-gradient(circle, rgba(0,150,255,0.3) 0%, rgba(255,255,255,0) 70%)',
                filter: hoveredSection === 'skills' ? 'blur(10px)' : 'blur(5px)',
                transform: `translate(-160%, -50%) ${hoveredSection === 'skills' ? 'scale(1.8)' : 'scale(0.8)'}`,
                left: '20%',
                top: '50%',
                pointerEvents: 'none',
              }}
            />
            <h2
              className="text-3xl font-bold mb-6 inline-block"
              style={{
                textShadow: hoveredSection === 'skills' ? '0 0 8px rgba(0,150,255,0.3)' : 'none',
              }}
            >
              Skills
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {profile.skills.map((skill, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-blue-50 rounded-full transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Education section */}
        <section
          onMouseEnter={() => setHoveredSection('education')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="relative">
            <div 
              className={`absolute rounded-full w-48 h-16 transition-all duration-700 ${
                hoveredSection === 'education' ? 'opacity-70 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                background: 'radial-gradient(circle, rgba(0,150,255,0.3) 0%, rgba(255,255,255,0) 70%)',
                filter: hoveredSection === 'education' ? 'blur(10px)' : 'blur(5px)',
                transform: `translate(-130%, -50%) ${hoveredSection === 'education' ? 'scale(2.2)' : 'scale(0.8)'}`,
                left: '20%',
                top: '50%',
                pointerEvents: 'none',
              }}
            />
            <h2 
              className="text-3xl font-bold mb-6 inline-block"
              style={{
                textShadow: hoveredSection === 'education' ? '0 0 8px rgba(0,150,255,0.3)' : 'none',
              }}
            >
              Education
            </h2>
          </div>
          
          <div className="space-y-6">
            {profile.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-6 py-2 hover:border-blue-400 transition-all duration-300">
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <div className="flex justify-between flex-wrap">
                  <p className="text-blue-600 font-medium">{edu.institution}</p>
                  <p className="text-gray-500">{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
