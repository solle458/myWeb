'use client';

import React, { useState, useEffect, useRef } from 'react';
import ProfileHeader from '@/components/about/ProfileHeader';
import SkillsSection from '@/components/about/SkillSection';
import EducationSection from '@/components/about/EducationSection';
import { ProfileData } from '@/types/profileTypes';
import { getSkills } from '@/api/getSkills';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [skills, setSkills] = useState<{
    languages: string[];
    frameworks: string[];
    others: string[];
  }>({ languages: [], frameworks: [], others: [] });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        console.log("Fetched skills data:", data);
        
        // APIが配列を返す場合、最初の要素を取得
        const skillsData = Array.isArray(data) ? data[0] : data;
        
        // データ構造を変換（toolsをothersに変換）
        const formattedSkills = {
          languages: Array.isArray(skillsData.languages) ? skillsData.languages : [],
          frameworks: Array.isArray(skillsData.frameworks) ? skillsData.frameworks : [],
          others: Array.isArray(skillsData.others) ? skillsData.others : []
        };
        
        console.log("Formatted skills:", formattedSkills);
        setSkills(formattedSkills);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };
    
    fetchSkills();
  }, []);

  const profile: ProfileData = {
    name: "宮木 笙伍",
    title: "MIYAKI SHOGO",
    bio: [
      "京都産業大学 情報理工学部の宮木笙伍です。画像処理やAIに興味があり、C/C++、Python3を使って競技プログラミングやkaggleに取り組んでいます。web開発も勉強中で、React、Next.js、TypeScript、CSS、Tailwind CSS、Node.jsを使っています。",
      "IOORという競技プログラミングサークルの運営をしており、コンテストの開催や勉強会の企画を行っています。他にC.A.C.というデジタル創作系の部活や写真部に所属し活動しています。",
      "趣味は旅行とプログラミングで、旅行先の写真を撮るのが好きです。大人数の旅行も一人旅も両方します。普段は競技プログラミングをしています。"
    ],
    skills: skills,
    education: [
      {
        degree: "京都産業大学",
        institution: "情報理工学部",
        year: "2023 - Present"
      },
    ]
  };

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
        <ProfileHeader 
          profile={profile} 
          hoveredSection={hoveredSection} 
          setHoveredSection={setHoveredSection} 
        />
        
        <SkillsSection 
          skills={skills} 
          hoveredSection={hoveredSection} 
          setHoveredSection={setHoveredSection} 
        />
        
        <EducationSection 
          education={profile.education} 
          hoveredSection={hoveredSection} 
          setHoveredSection={setHoveredSection} 
        />
      </div>
    </main>
  );
};
