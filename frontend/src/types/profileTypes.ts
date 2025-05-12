export interface ProfileData {
    name : string;
    title : string;
    bio : string[];
    skills : {
        languages : string[];
        frameworks : string[];
        others : string[];
    }
    education : EducationItem[];
}

export interface EducationItem {
    degree : string;
    institution : string;
    year : string;
}

export interface SectionProps {
    hoveredSection : string | null;
    setHoveredSection : (section : string | null) => void;
}
