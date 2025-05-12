import React from "react";

interface SkillTagProps {
    skill : string;
}

const SkillTag = ({ skill } : SkillTagProps) => {
    return (
        <div 
            className="px-4 py-2 bg-blue-50 rounded-full transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
        >
            {skill}
        </div>
    );
};

export default SkillTag;
