export interface Setting {
    id: number;
    site_title: string;
    hero_title: string;
    about_text: string;
    avatar_url: string | null;
    cv_url: string | null;
    meta_title: string;
    meta_description: string;
}

export interface Skill {
    id: number;
    name: string;
    category: string;
    percentage: number;
    icon_url: string | null;
    order_number: number;
}

export interface Project {
    id: number;
    category_id: number;
    title: string;
    slug: string;
    content: string;
    thumbnail_url: string | null;
    demo_url: string | null;
    repo_url: string | null;
    status: string;
    published_at: string;
    skills: Skill[];
}

export interface Experience {
    id: number;
    type: 'education' | 'work';
    title: string;
    institution: string;
    start_date: string;
    end_date: string | null;
    description: string;
    order_number: number;
}
