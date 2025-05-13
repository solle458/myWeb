import React from 'react';
import { SectionProps } from '@/types/profileTypes';
import SectionTitle from './ui/SectionTitle';
import SkillTag from './ui/SkillTag';

interface SkillsSectionProps extends SectionProps {
    skills: {
        languages?: string[];
        frameworks?: string[];
        others?: string[];
    };
}

const SkillsSection = ({ skills, hoveredSection, setHoveredSection } : SkillsSectionProps) => {
    // 各カテゴリが存在し、配列であることを確認
    const languages = Array.isArray(skills.languages) ? skills.languages : [];
    const frameworks = Array.isArray(skills.frameworks) ? skills.frameworks : [];
    const others = Array.isArray(skills.others) ? skills.others : [];
    
    const allSkills = [
        ...languages,
        ...frameworks,
        ...others
    ].filter(Boolean);

    return (
        <section
            className="mb-16"
            onMouseEnter={() => setHoveredSection('skills')}
            onMouseLeave={() => setHoveredSection(null)}
        >
            <SectionTitle 
                title="Skills" 
                isActive={hoveredSection === 'skills'} 
                position={{ left: '20%', top: '50%' }}
                transform="translate(-160%, -50%)"
            />

            <div className="flex flex-wrap gap-3">
                {allSkills.length > 0 ? (
                    allSkills.map((skill, index) => (
                        <SkillTag key={index} skill={skill} />
                    ))
                ) : (
                    <p className="text-gray-500">スキルデータを読み込み中です...</p>
                )}
            </div>
        </section>
    );
};

export default SkillsSection;
