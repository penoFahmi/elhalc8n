import { useState, useEffect } from 'react';
import { Setting, Project, Skill, Experience } from '@/types/portfolio';
import { TerminalTheme } from '@/components/portfolio/TerminalTheme';
import { ModernTheme } from '@/components/portfolio/ModernTheme';
import { ThemeSwitcher } from '@/components/portfolio/ThemeSwitcher';

type ThemeMode = 'terminal' | 'modern';

export default function Welcome({
    canRegister = true,
    settings,
    projects,
    skills,
    experiences
}: {
    canRegister?: boolean;
    settings: Setting;
    projects: Project[];
    skills: Skill[];
    experiences: Experience[];
}) {
    // Default to modern theme, or retrieve from localStorage
    const [theme, setTheme] = useState<ThemeMode>('terminal');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio_theme') as ThemeMode;
        if (savedTheme === 'terminal' || savedTheme === 'modern') {
            setTheme(savedTheme);
        }
        setMounted(true);
    }, []);

    const handleThemeChange = (newTheme: ThemeMode) => {
        setTheme(newTheme);
        localStorage.setItem('portfolio_theme', newTheme);
    };

    // Prevent hydration mismatch by not rendering theme until mounted
    if (!mounted) {
        return <div className="min-h-screen bg-[#0c0c0c]" />; // simple fallback
    }

    return (
        <>
            {theme === 'terminal' ? (
                <TerminalTheme 
                    settings={settings} 
                    projects={projects} 
                    skills={skills} 
                    experiences={experiences} 
                />
            ) : (
                <ModernTheme 
                    settings={settings} 
                    projects={projects} 
                    skills={skills} 
                    experiences={experiences} 
                />
            )}
            
            <ThemeSwitcher currentTheme={theme} onChange={handleThemeChange} />
        </>
    );
}
