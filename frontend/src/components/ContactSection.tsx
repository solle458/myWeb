import React from "react";
import GradientEffect from "./project/ui/GradientEffect";

const ContactSection = () => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div className="mt-20 text-center">
            <div
                className="relative inline-block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="absolute rounded-full w-32 h-32">
                    <GradientEffect isActive={isHovered} />
                </div>
                <p className="text-gray-700 mb-4">プロジェクトについてのご質問や、共同開発のご提案などがありましたら、お気軽にご連絡ください。</p>
                <a
                    href="/contact"
                    className="inline-block bg-blue-500 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 relative z-10"
                >
                    お問い合わせ
                </a>
            </div>
        </div>
    );
};

export default ContactSection;
