'use client';

import React, { useRef } from 'react';
import PageHeader from '@/components/project/ProjectHeader';
import ProjectsIntro from '@/components/project/ProjectsIntro';
import { ProjectsList } from '@/components/project/ProjectList';
import ContactSection from '@/components/ContactSection';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useProjects } from '@/hooks/useProjects';

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef as React.RefObject<HTMLElement>);
  
  // プロジェクトデータを取得
  const { projects, loading, error, refetch } = useProjects();

  // 装飾用画像
  const backgroundImage = "/images/pc/light4.JPG";

  return (
    <main className="min-h-screen">
      {/* ヘッダー */}
      <PageHeader title="PROJECTS" backgroundImage={backgroundImage} />

      {/* メインコンテンツエリア */}
      <div 
        ref={containerRef}
        className={`max-w-7xl mx-auto px-5 md:px-10 py-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* プロジェクト紹介 */}
        <ProjectsIntro />

        {/* エラー時の再取得ボタン */}
        {error && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => refetch()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded transition-colors"
            >
              再読み込み
            </button>
          </div>
        )}

        {/* プロジェクト一覧 */}
        <ProjectsList projects={projects} loading={loading} error={error} />

        {/* お問い合わせリンク */}
        <ContactSection />
      </div>
    </main>
  );
}
