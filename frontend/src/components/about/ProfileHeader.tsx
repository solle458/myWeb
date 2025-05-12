import React from "react";
import Image from "next/image";
import { ProfileData, SectionProps } from "@/types/profileTypes";
import HoverGlow from "./ui/HoverGlow";

interface ProfileHeaderProps extends SectionProps {
    profile: ProfileData;
}

const ProfileHeader = ({ profile, hoveredSection, setHoveredSection } : ProfileHeaderProps) => {
    return (
        <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="relative">
                <HoverGlow
                    isActive={hoveredSection === 'photo'}
                    size='large'
                    position={{ left: '50%', top: '50%' }}
                />
                <div
                    className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden"
                    onMouseEnter={() => setHoveredSection('photo')}
                    onMouseLeave={() => setHoveredSection(null)}
                >
                    <Image
                        src="/images/mobile/dark1.JPG"
                        alt={profile.name}
                        fill
                        style={{ objectFit : 'cover' }}
                        className="transition-all duration-500 hover:scale-105"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div
                    className="relative"
                    onMouseEnter={() => setHoveredSection('intro')}
                    onMouseLeave={() => setHoveredSection(null)}
                >
                    <HoverGlow
                        isActive={hoveredSection === 'intro'}
                        size='medium'
                        position={{ left: '50%', top: '50px' }}
                        transform="translate(-110%, -50%)"
                    />
                    <h1
                        className="text-4xl md:text-5xl font-bold mb-3"
                        style={{
                            textShadow : hoveredSection === 'intro' ? '0 0 8px rgba(0, 150, 255, 0.3)' : 'none',
                        }}
                    >
                        {profile.name}
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                        {profile.title}
                    </h2>
                    {profile.bio.map((paragraph, index) => (
                        <p key={index} className="text-gray-600 dark:text-gray-400 mt-4">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
