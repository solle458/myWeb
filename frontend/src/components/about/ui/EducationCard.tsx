import React from "react";
import { EducationItem } from "@/types/profileTypes";

interface EducationCardProps {
    education: EducationItem;
}

const EducationCard = ({ education }: EducationCardProps) => {
    return (
        <div className="border-l-4 border-blue-200 pl-6 py-2 hover:border-blue-400 transition-all duration-300">
            <h3 className="text-xl font-bold">
                {education.degree}
            </h3>
            <div className="flex justify-between flex-wrap">
                <p className="text-blue-600 font-medium">
                    {education.institution}
                </p>
                <p className="text-gray-500">
                    {education.year}
                </p>
            </div>
        </div>
    );
};

export default EducationCard;
