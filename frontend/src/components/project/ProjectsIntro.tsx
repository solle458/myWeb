import React, {useState} from "react";
import GradientEffect from "./ui/GradientEffect";

const ProjectsIntro = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="mb-12">
            <div
                className="relative mb-10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="absolute rounded-full w-48 h-16">
                    <GradientEffect isActive={isHovered} size="16rem"/>
                </div>
                <h2
                    className="text-3xl font-bold mb-6 inline-block"
                    style={{
                        textShadow : isHovered ? '0 0 8px rgba(0, 150, 255, 0.3)' : 'none',
                    }}
                >
                    プロジェクト
                </h2>
                <p className="text-gray-700 mb-8 leading-relaxed max-w-3xl">
                    これまでに取り組んだプロジェクトの一部をご紹介します。
                    普段は開発少なめです。
                    Webアプリケーション、UIデザインなど。
                </p>
            </div>
        </div>
    );
};

export default ProjectsIntro;
