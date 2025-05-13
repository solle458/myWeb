import React, { useState } from 'react';
import Image from 'next/image';
import { ProjectData } from '../../types/projectTypes';
import GradientEffect from '@/components/project/ui/GradientEffect';
import TechnologyBadge from '@/components/project/TechnologyBadge';
import { ProjectLinks } from './ProjectLinks';

interface ProjectCardProps {
  project: ProjectData;
}

export const ProjectCard = ({ project } : ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 説明が配列の場合は結合、文字列の場合はそのまま使用
  const description = Array.isArray(project.description) 
    ? project.description.join(' ') 
    : project.description;
  
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* プロジェクト画像 */}
      <div className="relative h-60">
        <Image
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0">
          <GradientEffect isActive={isHovered} />
        </div>
      </div>
      
      {/* プロジェクト情報 */}
      <div className="p-6">
        <h3 
          className="text-xl font-bold mb-3"
          style={{
            textShadow: isHovered ? '0 0 8px rgba(0,150,255,0.2)' : 'none',
          }}
        >
          {project.title}
        </h3>
        <p className="text-gray-700 mb-4">
          {description}
        </p>
        
        {/* 技術スタック */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">使用技術</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <TechnologyBadge key={index} name={tech} />
            ))}
          </div>
        </div>
        
        {/* プロジェクトリンク */}
        <ProjectLinks url={project.url} github={project.github} />
      </div>
    </div>
  );
};
