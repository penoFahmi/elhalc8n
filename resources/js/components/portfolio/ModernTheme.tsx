import { Head, Link } from '@inertiajs/react';
import { ThemeProps } from './TerminalTheme';
import { Github, ExternalLink, Briefcase, GraduationCap, ChevronRight } from 'lucide-react';
import { login } from '@/routes';
import { useState } from 'react';

export function ModernTheme({ settings, projects, skills, experiences }: ThemeProps) {
    // Helper to group experiences
    const workExperiences = experiences.filter(e => e.type === 'work');
    const eduExperiences = experiences.filter(e => e.type === 'education');

    // Extract unique skills from projects for filtering
    const [activeFilter, setActiveFilter] = useState('All');
    const allProjectSkills = projects.flatMap(p => p.skills?.map(s => s.name) || []);
    const uniqueProjectSkills = Array.from(new Set(allProjectSkills)).slice(0, 6); // Limit to top 6 skills
    const filters = ['All', ...uniqueProjectSkills];

    const filteredProjects = activeFilter === 'All' 
        ? projects 
        : projects.filter(p => p.skills?.some(s => s.name === activeFilter));

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00FF41]/30 font-sans">
            <Head title={`${settings.site_title} | Portfolio`} />
            
            {/* Ambient Background Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-[#00FF41]/10 blur-[100px]" />
            </div>

            <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg">
                <nav className="container mx-auto px-6 h-20 flex justify-between items-center animate-in slide-in-from-top-4 fade-in duration-1000">
                    <div className="text-2xl font-black tracking-tighter">
                        {settings.site_title.split(' ').map((word, i) => (
                            <span key={i} className={i === 0 ? "text-white" : "text-[#00FF41]"}>{word} </span>
                        ))}
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="#projects" className="text-gray-400 hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#00FF41] hover:after:w-full after:transition-all">Projects</a>
                        <a href="#skills" className="text-gray-400 hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#00FF41] hover:after:w-full after:transition-all">Skills</a>
                        <a href="#experience" className="text-gray-400 hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#00FF41] hover:after:w-full after:transition-all">Experience</a>
                        <a href="mailto:admin@elhalc8n.space" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            Contact Me
                        </a>
                    </div>
                </nav>
            </header>

            <main className="relative z-10 container mx-auto px-6 pt-32 pb-12 md:pb-24 max-w-6xl">

                {/* Hero Section */}
                <section className="min-h-[50vh] flex flex-col justify-center mb-32 animate-in fade-in zoom-in-95 duration-1000 delay-150">
                    <h2 className="text-gray-400 text-lg md:text-xl font-medium mb-4 tracking-wide">
                        HELLO, I AM
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8">
                        A Developer <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-emerald-400">
                            {settings.hero_title}
                        </span>
                    </h1>
                    <p className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed mb-10">
                        {settings.about_text}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="#projects" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95">
                            View Work
                        </a>
                        <a href="mailto:admin@elhalc8n.space" className="px-8 py-4 bg-white/5 text-white font-medium rounded-full border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md">
                            Get in Touch
                        </a>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="mb-32 scroll-mt-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <h2 className="text-4xl font-bold">Featured <span className="text-gray-500">Projects</span></h2>
                        
                        {/* Professional Filter Pills */}
                        <div className="flex flex-wrap gap-2">
                            {filters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                        activeFilter === filter
                                            ? 'bg-[#00FF41] text-black shadow-[0_0_15px_rgba(0,255,65,0.4)] scale-105'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:scale-105'
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredProjects.map((project, i) => (
                            <div key={project.id} className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00FF41]/10">
                                {/* Thumbnail */}
                                <div className="aspect-video w-full bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                                    {project.thumbnail_url ? (
                                        <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                            <div className="w-32 h-32 rounded-full bg-[#00FF41]/20 blur-2xl"></div>
                                        </div>
                                    )}
                                    {/* Overlay Links */}
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        {project.repo_url && (
                                            <a href={project.repo_url} target="_blank" rel="noreferrer" className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors">
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                        {project.demo_url && (
                                            <a href={project.demo_url} target="_blank" rel="noreferrer" className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-[#00FF41] hover:text-black transition-colors">
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                                    <p className="text-gray-400 mb-6 line-clamp-2">{project.content}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.skills?.map(s => (
                                            <span key={s.id} className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-xs font-medium border border-white/5">
                                                {s.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="mb-32 scroll-mt-24">
                    <h2 className="text-4xl font-bold mb-12">Technical <span className="text-gray-500">Arsenal</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skills.map((skill) => (
                            <div key={skill.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-semibold text-lg">{skill.name}</h4>
                                    <span className="text-[#00FF41] font-mono text-sm">{skill.percentage}%</span>
                                </div>
                                <div className="w-full bg-black/50 rounded-full h-2">
                                    <div 
                                        className="bg-gradient-to-r from-emerald-500 to-[#00FF41] h-2 rounded-full transition-all duration-1000 ease-out" 
                                        style={{ width: `${skill.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="mb-32 scroll-mt-24">
                    <h2 className="text-4xl font-bold mb-12">Journey <span className="text-gray-500">& Timeline</span></h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Work */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Experience</h3>
                            </div>
                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                                {workExperiences.map((exp) => (
                                    <div key={exp.id} className="relative pl-12 md:pl-0">
                                        <div className="md:w-1/2 md:pr-12 md:ml-auto">
                                            <div className="absolute left-0 top-2 md:left-1/2 w-10 h-10 -ml-5 flex items-center justify-center">
                                                <div className="w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]"></div>
                                            </div>
                                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                                                <div className="text-blue-400 text-sm font-bold mb-2">{exp.start_date} - {exp.end_date || 'Present'}</div>
                                                <h4 className="text-xl font-bold">{exp.title}</h4>
                                                <div className="text-gray-400 text-sm mb-4">{exp.institution}</div>
                                                <p className="text-gray-500 text-sm">{exp.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Education</h3>
                            </div>
                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                                {eduExperiences.map((exp) => (
                                    <div key={exp.id} className="relative pl-12 md:pl-0">
                                        <div className="md:w-1/2 md:pr-12 md:ml-auto">
                                            <div className="absolute left-0 top-2 md:left-1/2 w-10 h-10 -ml-5 flex items-center justify-center">
                                                <div className="w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]"></div>
                                            </div>
                                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                                                <div className="text-purple-400 text-sm font-bold mb-2">{exp.start_date} - {exp.end_date || 'Present'}</div>
                                                <h4 className="text-xl font-bold">{exp.title}</h4>
                                                <div className="text-gray-400 text-sm mb-4">{exp.institution}</div>
                                                <p className="text-gray-500 text-sm">{exp.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Footer */}
                <footer className="border-t border-white/10 pt-12 pb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {settings.site_title}. All rights reserved.</p>
                    <Link href={login()} className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-1">
                        System Admin <ChevronRight className="w-4 h-4" />
                    </Link>
                </footer>
            </main>
        </div>
    );
}
