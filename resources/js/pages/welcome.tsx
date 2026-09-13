import { Head, Link } from '@inertiajs/react';
import { login } from '@/routes';
import { Setting, Project, Skill, Experience } from '@/types/portfolio';
import { useState, useEffect } from 'react';
import { Typewriter } from '@/components/terminal/Typewriter';
import { CommandPrompt } from '@/components/terminal/CommandPrompt';

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
    const [bootPhase, setBootPhase] = useState(0);

    useEffect(() => {
        // Boot sequence delays
        const timers = [
            setTimeout(() => setBootPhase(1), 800),
            setTimeout(() => setBootPhase(2), 1600),
            setTimeout(() => setBootPhase(3), 2400)
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <>
            <Head title="Welcome | Terminal" />
            <div className="min-h-screen bg-[#0c0c0c] text-[#00FF41] font-mono p-4 sm:p-8 relative overflow-hidden">
                {/* CRT Scanline effect (pseudo) */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-20" />
                
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="mb-6 space-y-1">
                        <div><Typewriter text="[OK] Initializing Elhalc8n OS..." delay={20} /></div>
                        {bootPhase >= 1 && <div><Typewriter text="[OK] Loading system modules..." delay={20} /></div>}
                        {bootPhase >= 2 && <div><Typewriter text="[OK] Establishing secure connection..." delay={20} /></div>}
                    </div>

                    {bootPhase >= 3 && (
                        <div className="animate-in fade-in duration-1000 mt-8">
                            <pre className="text-[#FFB000] text-xs sm:text-sm mb-6 whitespace-pre-wrap">
{`
  _____ _ _           _      ___      
 | ____| | |__   __ _| | ___( _ ) _ __ 
 |  _| | | '_ \\ / _\` | |/ __/ _ \\| '_ \\
 | |___| | | | | (_| | | (__| (_) | | | |
 |_____|_|_| |_|\\__,_|_|\\___\\___/|_| |_|
                                      
`}
                            </pre>
                            
                            <p className="text-gray-300 mb-6">
                                Welcome to <span className="text-white font-bold">{settings.site_title}</span>. <br/>
                                {settings.hero_title} <br/>
                                {settings.about_text}
                            </p>

                            <CommandPrompt command="./show-skills.sh" />
                            <div className="mb-6 pl-4 border-l border-gray-700">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                    {skills.map(skill => (
                                        <li key={skill.id} className="flex items-center gap-2">
                                            <span className="text-blue-400">[{skill.category}]</span> 
                                            <span className="text-gray-300">{skill.name}</span>
                                            <span className="text-gray-500">{".".repeat(Math.max(2, 20 - skill.name.length))}</span>
                                            <span className="text-[#00FF41]">{skill.percentage}%</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <CommandPrompt command="cat experiences.log" />
                            <div className="mb-6 pl-4 border-l border-gray-700 space-y-4 mt-2">
                                {experiences.map(exp => (
                                    <div key={exp.id}>
                                        <div className="text-[#FFB000]">{exp.start_date} - {exp.end_date || 'Present'}</div>
                                        <div className="text-white font-bold">{exp.title} <span className="text-gray-500">@</span> {exp.institution}</div>
                                        <div className="text-gray-400 text-sm mt-1">{exp.description}</div>
                                    </div>
                                ))}
                            </div>

                            <CommandPrompt command="ls -la ./projects" />
                            <div className="mb-8 mt-2 space-y-4">
                                {projects.map(project => (
                                    <div key={project.id} className="border border-gray-800 bg-[#111] p-4 rounded hover:border-[#00FF41] transition-colors">
                                        <h3 className="text-white font-bold text-lg">{project.title}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{project.content}</p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {project.skills?.map(s => (
                                                <span key={s.id} className="px-2 py-0.5 bg-gray-800 text-xs rounded text-gray-300">
                                                    {s.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <CommandPrompt command="whoami" />
                            <div className="mt-2 flex gap-4 text-sm">
                                <Link href={login()} className="hover:text-white underline decoration-gray-600 underline-offset-4">
                                    Admin Login
                                </Link>
                                <span>|</span>
                                <a href="mailto:admin@elhalc8n.space" className="hover:text-white underline decoration-gray-600 underline-offset-4">
                                    Contact
                                </a>
                            </div>

                            <div className="mt-12 flex items-center gap-2">
                                <span className="text-[#00FF41] font-bold">guest@elhalc8n.space</span>
                                <span className="text-white">:</span>
                                <span className="text-blue-400 font-bold">~</span>
                                <span className="text-white">$</span>
                                <span className="inline-block w-2.5 h-4 bg-[#00FF41] animate-pulse"></span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
