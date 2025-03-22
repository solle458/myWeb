'use client';

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// PC用と携帯用の画像配列を分ける
const pcImages = [
  "/images/pc/dark1.jpg",
  "/images/pc/dark2.jpg",
  "/images/pc/dark3.jpg",
  "/images/pc/dark4.jpg",
  "/images/pc/dark5.jpg",
  "/images/pc/dark6.jpg",
  "/images/pc/dark7.jpg",
  "/images/pc/light1.jpg",
  "/images/pc/light2.jpg",
  "/images/pc/light3.jpg",
  "/images/pc/light4.jpg",
  "/images/pc/light5.jpg",
  "/images/pc/light6.jpg",
  "/images/pc/light7.jpg",
];

const mobileImages = [
  "/images/mobile/dark1.jpg",
  "/images/mobile/dark2.jpg",
  "/images/mobile/dark3.jpg",
  "/images/mobile/dark4.jpg",
  "/images/mobile/light1.jpg",
  "/images/mobile/light2.jpg",
  "/images/mobile/light3.jpg",
  "/images/mobile/light4.jpg",
  "/images/mobile/light5.jpg",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [transitionStyle, setTransitionStyle] = useState('fade');
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const transitionStyles = ['fade', 'slide', 'zoom', 'blur'];

  // デバイスタイプの検出
  useEffect(() => {
    // 初期値を設定
    setIsMobile(window.innerWidth < 768);

    // リサイズイベントを監視
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 現在使用する画像配列
  const currentImages = isMobile ? mobileImages : pcImages;

  // Time-based image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      // Apply transition effect by temporarily setting isVisible to false
      setIsVisible(false);

      // Change transition style occasionally
      if (Math.random() > 0.7) {
        setTransitionStyle(transitionStyles[Math.floor(Math.random() * transitionStyles.length)]);
      }

      // After a short delay, change the image and make it visible again
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
        setIsVisible(true);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [currentImages]);

  // Scroll-based visibility using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only change visibility if it's significantly entering or leaving viewport
        if (entry.intersectionRatio > 0.5) {
          setIsVisible(true);
        } else if (entry.intersectionRatio < 0.3) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0.3, 0.5, 0.7],
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Get transition CSS classes based on current transition style
  const getTransitionClass = () => {
    const baseClasses = "transition-all duration-1000";
    
    if (!isVisible) {
      switch (transitionStyle) {
        case 'fade':
          return `${baseClasses} opacity-0`;
        case 'slide':
          return `${baseClasses} opacity-0 translate-x-full`;
        case 'zoom':
          return `${baseClasses} opacity-0 scale-125`;
        case 'blur':
          return `${baseClasses} opacity-50 blur-xl`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }
    
    return `${baseClasses} opacity-100`;
  };

  return (
    <div className="relative w-full h-screen" ref={containerRef}>
      <div className={`w-full h-full ${getTransitionClass()}`}>
        <Image
          src={currentImages[currentImageIndex]}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {/* グラデーションエフェクト用の div */}
        <div
          className={`absolute rounded-full w-64 h-64 transition-all duration-700 ${
            isHovered ? 'opacity-70 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(0,150,255,0.3) 0%, rgba(255,255,255,0) 70%)',
            filter: isHovered ? 'blur(10px)' : 'blur(5px)',
            transform: `translate(-50%, -50%) ${isHovered ? 'scale(2.2)' : 'scale(0.8)'}`,
            left: '50%',
            top: '50%',
            pointerEvents: 'none',
          }}
        />

        <h1
          className={`text-white text-4xl md:text-6xl font-bold transition-all duration-1000 relative z-10 px-8 py-4 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            textShadow: isHovered ? '0 0 10px rgba(0,150,255,0.8)' : '0 0 5px rgba(0,0,0,0.5)',
          }}
        >
          MIYAKI SHOGO
        </h1>
      </div>
    </div>
  );
}
