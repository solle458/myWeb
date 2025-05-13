import React from "react";

interface GradientEffectProps {
    isActive : boolean;
    size? : string;
}

const GradientEffect = ({ isActive, size = "w-1/2 h-1/2" } : GradientEffectProps) => {
    return (
        <div
            style={{
                background: 'radial-gradient(circle, rgba(0,150,255,0.3) 0%, rgba(255,255,255,0) 70%)',
                filter: isActive ? 'blur(10px)' : 'blur(5px)',
                transform: `translate(-50%, -50%) ${isActive ? 'scale(2.2)' : 'scale(0.8)'}`,
                opacity: isActive ? 0.7 : 0,
                transition: 'all 0.7s ease',
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: size,
                height: size,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

export default GradientEffect;
