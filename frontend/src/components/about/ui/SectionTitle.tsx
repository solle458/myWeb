import React from 'react';
import HoverGlow from '@/components/about/ui/HoverGlow';

interface SectionTitleProps {
    title : string;
    isActive : boolean;
    position : {
        left : string;
        top : string;
    };
    transform : string;
}

const SectionTitle = ({ title, isActive, position, transform } : SectionTitleProps) => {
    return (
        <div className='relative'>
            <HoverGlow
                isActive={isActive}
                size='medium'
                position={position}
                transform={transform}
            />
            <h2
                className='text-3xl font-bold mb-6 inline-block'
                style={{
                    textShadow : isActive ? '0 0 8px rgba(0, 150, 255, 0.3)' : 'none',
                }}
            >
                {title}
            </h2>
        </div>
    );
};

export default SectionTitle;
