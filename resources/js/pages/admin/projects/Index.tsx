import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui/glass-card';
import { GlassTable, GlassTableHeader, GlassTableRow, GlassTableHead, GlassTableBody, GlassTableCell } from '@/components/ui/glass-table';
import { Github, Plus, RefreshCw, Trash2, Edit, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { Pagination } from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/admin/projects' },
];

export default function ProjectIndex({ projects, filters, flash }: any) {
    const [syncing, setSyncing] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const timer = setTimeout(() => {
            router.get('/admin/projects', { search, status }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);
        return () => clearTimeout(timer);
    }, [search, status]);

    const handleSync = () => {
        setSyncing(true);
        router.post('/admin/github-sync', {}, {
            onFinish: () => setSyncing(false),
        });
    };

    const confirmDelete = (id: number) => {
        setDeleteId(id);
    };

    const executeDelete = () => {
        if (deleteId) {
            router.delete(`/admin/projects/${deleteId}`);
            setDeleteId(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects CMS | Elhalc8n OS" />
            
            <div className="flex flex-col gap-6 p-4 sm:p-6 w-full max-w-7xl mx-auto">


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

                <div className="flex flex-col sm:flex-row gap-4 mb-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-md pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                        />
                    </div>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="bg-black/40 border border-white/10 rounded-md px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                    >
                        <option value="">All Statuses</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
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
                                {projects.data.length === 0 ? (
                                    <GlassTableRow>
                                        <GlassTableCell colSpan={5} className="text-center py-8 text-gray-500">
                                            No projects found.
                                        </GlassTableCell>
                                    </GlassTableRow>
                                ) : (
                                    projects.data.map((project: any) => (
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
                                                    <button onClick={() => confirmDelete(project.id)} className="p-2 hover:bg-white/10 rounded transition-colors text-red-500">
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

                <Pagination links={projects.links} />
            </div>

            <ConfirmModal 
                isOpen={deleteId !== null} 
                onClose={() => setDeleteId(null)} 
                onConfirm={executeDelete} 
                title="Delete Project"
                message="Are you sure you want to delete this project? This action cannot be undone."
            />
        </AppLayout>
    );
}
