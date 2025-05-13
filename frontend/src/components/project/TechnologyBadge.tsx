import React from "react";

interface TechnologyBadgeProps {
    name : string;
}

const TechnologyBadge = ({ name } : TechnologyBadgeProps) => {
    return (
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
            {name}
        </span>
    );
};

export default TechnologyBadge;
