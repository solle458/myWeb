import React from "react";
import { EducationItem, SectionProps } from "@/types/profileTypes";
import SectionTitle from "./ui/SectionTitle";
import EducationCard from "./ui/EducationCard";

interface EducationSectionProps extends SectionProps {
    education: EducationItem[];
}

const EducationSection = ({ education, hoveredSection, setHoveredSection }: EducationSectionProps) => {
    return (
        <section
            onMouseEnter={() => setHoveredSection("education")}
            onMouseLeave={() => setHoveredSection(null)}
        >
            <SectionTitle
                title='Education'
                isActive={hoveredSection === "education"}
                position={{ left : "20%", top : "50%" }}
                transform="translate(-130%, -50%)"
            />
            <div className="space-y-4">
                {education.map((item, index) => (
                    <EducationCard key={index} education={item}/>
                ))}
            </div>
        </section>
    );
};

export default EducationSection;
