import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui/glass-card';
import { GlassTable, GlassTableHeader, GlassTableRow, GlassTableHead, GlassTableBody, GlassTableCell } from '@/components/ui/glass-table';
import { Github, Plus, RefreshCw, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/admin/projects' },
];

export default function ProjectIndex({ projects, flash }: any) {
    const [syncing, setSyncing] = useState(false);

    const handleSync = () => {
        setSyncing(true);
        router.post('/admin/github-sync', {}, {
            onFinish: () => setSyncing(false),
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(`/admin/projects/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects CMS | Elhalc8n OS" />
            
            <div className="flex flex-col gap-6 p-4 sm:p-6 w-full max-w-7xl mx-auto">
                {/* Flash Message */}
                {flash?.success && (
                    <div className="bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41] p-4 rounded-xl backdrop-blur-sm">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl backdrop-blur-sm">
                        {flash.error}
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white tracking-wide">Project Management</h1>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleSync}
                            disabled={syncing}
                            className="flex items-center gap-2 bg-[#00FF41]/10 hover:bg-[#00FF41]/20 text-[#00FF41] border border-[#00FF41]/30 px-4 py-2 rounded-md transition-all disabled:opacity-50"
                        >
                            <Github className="w-4 h-4" />
                            {syncing ? 'Syncing via AI...' : 'Sync from GitHub'}
                            <RefreshCw className={`w-4 h-4 ml-1 ${syncing ? 'animate-spin' : ''}`} />
                        </button>
                        <Link 
                            href="/admin/projects/create"
                            className="flex items-center gap-2 bg-[#00FF41] hover:bg-[#00cc33] text-black px-4 py-2 rounded-md font-medium transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            New Project
                        </Link>
                    </div>
                </div>

                <GlassCard>
                    <GlassCardHeader>
                        <GlassCardTitle>All Projects</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                        <GlassTable>
                            <GlassTableHeader>
                                <GlassTableRow>
                                    <GlassTableHead>Title</GlassTableHead>
                                    <GlassTableHead>Category</GlassTableHead>
                                    <GlassTableHead>Status</GlassTableHead>
                                    <GlassTableHead>Skills (AI Extracted)</GlassTableHead>
                                    <GlassTableHead className="text-right">Actions</GlassTableHead>
                                </GlassTableRow>
                            </GlassTableHeader>
                            <GlassTableBody>
                                {projects.length === 0 ? (
                                    <GlassTableRow>
                                        <GlassTableCell colSpan={5} className="text-center py-8 text-gray-500">
                                            No projects found. Click "Sync from GitHub" to import.
                                        </GlassTableCell>
                                    </GlassTableRow>
                                ) : (
                                    projects.map((project: any) => (
                                        <GlassTableRow key={project.id}>
                                            <GlassTableCell className="font-medium text-white">{project.title}</GlassTableCell>
                                            <GlassTableCell>{project.category?.name || '-'}</GlassTableCell>
                                            <GlassTableCell>
                                                <span className={`px-2 py-1 rounded text-xs ${project.status === 'published' ? 'bg-[#00FF41]/20 text-[#00FF41]' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                                    {project.status.toUpperCase()}
                                                </span>
                                            </GlassTableCell>
                                            <GlassTableCell>
                                                <div className="flex gap-1 flex-wrap max-w-[200px]">
                                                    {project.skills?.map((skill: any) => (
                                                        <span key={skill.id} className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-gray-300">
                                                            {skill.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </GlassTableCell>
                                            <GlassTableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/projects/${project.id}/edit`} className="p-2 hover:bg-white/10 rounded transition-colors text-blue-400">
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-white/10 rounded transition-colors text-red-500">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </GlassTableCell>
                                        </GlassTableRow>
                                    ))
                                )}
                            </GlassTableBody>
                        </GlassTable>
                    </GlassCardContent>
                </GlassCard>
            </div>
        </AppLayout>
    );
}
