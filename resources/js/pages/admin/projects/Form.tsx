import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui/glass-card';
import { Save, ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ProjectForm({ project, categories, skills }: any) {
    const isEdit = !!project;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Projects', href: '/admin/projects' },
        { title: isEdit ? 'Edit Project' : 'New Project', href: '#' },
    ];

    const { data, setData, post, put, processing, errors } = useForm({
        title: project?.title || '',
        slug: project?.slug || '',
        content: project?.content || '',
        category_id: project?.category_id || (categories.length > 0 ? categories[0].id : ''),
        status: project?.status || 'draft',
        repo_url: project?.repo_url || '',
        demo_url: project?.demo_url || '',
        skills: project?.skills?.map((s: any) => s.id) || [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/projects/${project.id}`);
        } else {
            post('/admin/projects');
        }
    };

    const handleSkillToggle = (skillId: number) => {
        const currentSkills = [...data.skills];
        if (currentSkills.includes(skillId)) {
            setData('skills', currentSkills.filter(id => id !== skillId));
        } else {
            setData('skills', [...currentSkills, skillId]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${isEdit ? 'Edit' : 'New'} Project | Elhalc8n OS`} />
            
            <div className="flex flex-col gap-6 p-4 sm:p-6 w-full max-w-4xl mx-auto">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/projects" className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold text-white tracking-wide">
                            {isEdit ? 'Edit Project' : 'Create New Project'}
                        </h1>
                    </div>
                </div>

                <GlassCard>
                    <GlassCardContent className="pt-6">
                        <form onSubmit={submit} className="flex flex-col gap-5">
                            
                            {/* Title & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-[#00FF41]">Project Title</label>
                                    <input 
                                        type="text" 
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="bg-black/40 border border-white/10 rounded p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                        placeholder="E.g. Elhalc8n Terminal"
                                    />
                                    {errors.title && <span className="text-red-500 text-xs">{errors.title}</span>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-[#00FF41]">Category</label>
                                    <select 
                                        value={data.category_id}
                                        onChange={e => setData('category_id', e.target.value)}
                                        className="bg-black/40 border border-white/10 rounded p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {categories.map((c: any) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    {errors.category_id && <span className="text-red-500 text-xs">{errors.category_id}</span>}
                                </div>
                            </div>

                            {/* URLs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-[#00FF41]">Repository URL</label>
                                    <input 
                                        type="url" 
                                        value={data.repo_url}
                                        onChange={e => setData('repo_url', e.target.value)}
                                        className="bg-black/40 border border-white/10 rounded p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-[#00FF41]">Demo URL (Optional)</label>
                                    <input 
                                        type="url" 
                                        value={data.demo_url}
                                        onChange={e => setData('demo_url', e.target.value)}
                                        className="bg-black/40 border border-white/10 rounded p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            {/* Content / Description */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-[#00FF41]">Description (AI Generated or Manual)</label>
                                <textarea 
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    rows={5}
                                    className="bg-black/40 border border-white/10 rounded p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors resize-none"
                                    placeholder="Describe your project here..."
                                />
                                {errors.content && <span className="text-red-500 text-xs">{errors.content}</span>}
                            </div>

                            {/* Skills Tagging */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-[#00FF41]">Associated Skills</label>
                                <div className="flex flex-wrap gap-2 p-3 bg-black/20 border border-white/5 rounded min-h-[100px]">
                                    {skills.map((skill: any) => {
                                        const isSelected = data.skills.includes(skill.id);
                                        return (
                                            <button
                                                key={skill.id}
                                                type="button"
                                                onClick={() => handleSkillToggle(skill.id)}
                                                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                                                    isSelected 
                                                    ? 'bg-[#00FF41]/20 border-[#00FF41] text-[#00FF41]' 
                                                    : 'bg-transparent border-white/20 text-gray-400 hover:border-white/50'
                                                }`}
                                            >
                                                {skill.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Status & Submit */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium text-gray-300">Status:</label>
                                    <select 
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="bg-black/40 border border-white/10 rounded p-1.5 text-sm text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="flex items-center gap-2 bg-[#00FF41] hover:bg-[#00cc33] text-black px-6 py-2.5 rounded-md font-bold transition-all disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    {processing ? 'Saving...' : 'Save Project'}
                                </button>
                            </div>

                        </form>
                    </GlassCardContent>
                </GlassCard>
            </div>
        </AppLayout>
    );
}
