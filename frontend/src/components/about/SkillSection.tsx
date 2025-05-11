import React from 'react';
import { SectionProps } from '@/types/profileTypes';
import SectionTitle from './ui/SectionTitle';
import SkillTag from './ui/SkillTag';

interface SkillsSectionProps extends SectionProps {
    skills: {
        languages: string[];
        frameworks: string[];
        others: string[];
    };
}

const SkillsSection = ({ skills, hoveredSection, setHoveredSection } : SkillsSectionProps) => {
    const allSkills = [
        ...skills.languages,
        ...skills.frameworks,
        ...skills.others
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
                {allSkills.map((skill, index) => (
                    <SkillTag key={index} skill={skill} />
                ))}
            </div>
        </section>
    );
};

export default SkillsSection;
