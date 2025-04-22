'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// プロジェクトデータの型定義
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  url?: string;
  github?: string;
}

export default function Projects() {
  // UI表示状態
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // 装飾用画像
  const backgroundImage = "/images/pc/light4.JPG";

  // プロジェクトデータ
  const projects: Project[] = [
    {
      id: 'project1',
      title: 'ポートフォリオウェブサイト',
      description: 'Next.jsとTailwind CSSを使用した個人ポートフォリオサイト。アニメーションとインタラクティブな要素を取り入れ、レスポンシブデザインを実装。',
      image: '/images/mobile/dark1.JPG',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      url: 'https://solle.vercel.app/',
      github: 'https://github.com/solle458/myWeb/tree/main/frontend'
    }
  ];

  // スクロールベースのアニメーション
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

    // 初期表示を設定
    setIsVisible(true);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // グラデーションエフェクトのスタイルを取得
  const getGradientStyle = (element: string) => {
    const isActive = hoveredElement === element;
    return {
      background: 'radial-gradient(circle, rgba(0,150,255,0.3) 0%, rgba(255,255,255,0) 70%)',
      filter: isActive ? 'blur(10px)' : 'blur(5px)',
      transform: `translate(-50%, -50%) ${isActive ? 'scale(2.2)' : 'scale(0.8)'}`,
      opacity: isActive ? 0.7 : 0,
      transition: 'all 0.7s ease',
      position: 'absolute' as const,
      left: '50%',
      top: '50%',
      width: '16rem',
      height: '16rem',
      borderRadius: '50%',
      pointerEvents: 'none' as const,
      zIndex: 0,
    };
  };

  return (
    <main className="min-h-screen">
      {/* ヘッダー背景 */}
      <div className="relative h-64 md:h-96">
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Projects Header"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
            priority
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            style={getGradientStyle('header')}
            className="rounded-full"
          />
          <h1 
            className="text-white text-4xl md:text-6xl font-bold relative z-10 px-8 py-4"
            onMouseEnter={() => setHoveredElement('header')}
            onMouseLeave={() => setHoveredElement(null)}
            style={{
              textShadow: hoveredElement === 'header' 
                ? '0 0 10px rgba(0,150,255,0.8)' 
                : '0 0 5px rgba(0,0,0,0.5)',
            }}
          >
            PROJECTS
          </h1>
        </div>
      </div>

      {/* メインコンテンツエリア */}
      <div 
        ref={containerRef}
        className={`max-w-7xl mx-auto px-5 md:px-10 py-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="mb-12">
          <div 
            className="relative mb-10"
            onMouseEnter={() => setHoveredElement('projectsInfo')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div 
              className="absolute rounded-full w-48 h-16"
              style={getGradientStyle('projectsInfo')}
            />
            <h2 
              className="text-3xl font-bold mb-6 inline-block"
              style={{
                textShadow: hoveredElement === 'projectsInfo' ? '0 0 8px rgba(0,150,255,0.3)' : 'none',
              }}
            >
              プロジェクト
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed max-w-3xl">
              これまでに取り組んだプロジェクトの一部をご紹介します。
              普段は開発少なめのためプロジェクトが少なめです。
              Webアプリケーション、UIデザインなど。
            </p>
          </div>
        </div>

        {/* プロジェクトグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredElement(project.id)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div>
                {/* プロジェクト画像 */}
                <div className="relative h-60">
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div 
                    className="absolute inset-0"
                    style={getGradientStyle(project.id)}
                  />
                </div>
                
                {/* プロジェクト情報 */}
                <div className="p-6">
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{
                      textShadow: hoveredElement === project.id ? '0 0 8px rgba(0,150,255,0.2)' : 'none',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {project.description}
                  </p>
                  
                  {/* 技術スタック */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">使用技術</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* プロジェクトリンク */}
                  <div className="flex gap-4 mt-6">
                    {project.url && (
                      <a 
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        サイトを見る
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* お問い合わせリンク */}
        <div className="mt-20 text-center">
          <div 
            className="relative inline-block"
            onMouseEnter={() => setHoveredElement('contactLink')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div 
              className="absolute rounded-full w-32 h-32"
              style={getGradientStyle('contactLink')}
            />
            <p className="text-gray-700 mb-4">プロジェクトについてのご質問や、共同開発のご提案などがありましたら、お気軽にご連絡ください。</p>
            <a 
              href="/contact" 
              className="inline-block bg-blue-500 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 relative z-10"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
