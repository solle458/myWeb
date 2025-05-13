export interface ProjectData {
    id : string;
    title : string;
    description : string[];
    image : string;
    technologies : string[];
    url? : string;
    github? : string;
};

export interface ProjectResponse {
    data : ProjectData[];
    success : boolean;
    error? : string;
}
