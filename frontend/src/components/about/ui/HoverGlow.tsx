import React from 'react';

interface HoverGlowProps {
    isActive : boolean;
    size : 'small' | 'medium' | 'large';
    position : {
        left : string;
        top : string;
    };
    transform? : string;
}

const HoverGlow = ({ isActive, size, position, transform = 'translate(-50%, -50%)' } : HoverGlowProps) => {
    const sizeMap = {
        small : 'w-24 h-24',
        medium : 'w-48 h-16',
        large : 'w-64 h-64',
    }

    return (
        <div 
            className={
                `absolute rounded-full ${sizeMap[size]} transition-all duration-700 ${isActive ? 'opacity-70 scale-100' : 'opacity-0 scale-50'}`
            }
            style={{
                background : 'radial-gradient(circle, rgba(0, 150, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
                filter : isActive ? 'blur(10px)' : 'blur(5px)',
                transform : `${transform} ${isActive ? 'scale(1.8)' : 'scale(0.8)'}`,
                left : position.left,
                top : position.top,
                pointerEvents : 'none',
            }}
        >
        </div>
    );
};

export default HoverGlow;
