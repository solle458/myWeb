import React from "react";
import Image from "next/image";
import GradientEffect from "@/components/project/ui/GradientEffect";

interface ProjectHeaderProps {
    title : string;
    backgroundImage : string;
}

const ProjectHeader = ({ title, backgroundImage } : ProjectHeaderProps) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div className="relative h-64 md:h-96">
            <div className="absolute inset-0">
                <Image
                    src={backgroundImage}
                    alt={`${title} Header`}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-75"
                    priority
                />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <GradientEffect isActive={isHovered}/>
                <h1
                    className="text-white text-4xl md:text-6xl font-bold relative z-10 px-8 py-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        textShadow : isHovered ? '0 0 10px rgba(0, 150, 255, 0.8)' : 'none',
                    }}
                >
                    {title}
                </h1>
            </div>
        </div>
    );
};

export default ProjectHeader;
