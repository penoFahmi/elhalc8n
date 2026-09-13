import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui/glass-card';
import { GlassTable, GlassTableHeader, GlassTableRow, GlassTableHead, GlassTableBody, GlassTableCell } from '@/components/ui/glass-table';
import { Plus, Trash2, Edit, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { Pagination } from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Experiences', href: '/admin/experiences' },
];

export default function ExperienceIndex({ experiences, filters, flash }: any) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [search, setSearch] = useState(filters?.search || '');
    const [type, setType] = useState(filters?.type || '');
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const timer = setTimeout(() => {
            router.get('/admin/experiences', { search, type }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);
        return () => clearTimeout(timer);
    }, [search, type]);

    const confirmDelete = (id: number) => {
        setDeleteId(id);
    };

    const executeDelete = () => {
        if (deleteId) {
            router.delete(`/admin/experiences/${deleteId}`);
            setDeleteId(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Experiences CMS | Elhalc8n OS" />
            
            <div className="flex flex-col gap-6 p-4 sm:p-6 w-full max-w-7xl mx-auto">


                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white tracking-wide">Experiences Management</h1>
                    <Link 
                        href="/admin/experiences/create"
                        className="flex items-center gap-2 bg-[#00FF41] hover:bg-[#00cc33] text-black px-4 py-2 rounded-md font-medium transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        New Experience
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search title or institution..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-md pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                        />
                    </div>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="bg-black/40 border border-white/10 rounded-md px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                    >
                        <option value="">All Types</option>
                        <option value="work">Work</option>
                        <option value="education">Education</option>
                    </select>
                </div>

                <GlassCard>
                    <GlassCardHeader>
                        <GlassCardTitle>All Experiences</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                        <GlassTable>
                            <GlassTableHeader>
                                <GlassTableRow>
                                    <GlassTableHead>Title</GlassTableHead>
                                    <GlassTableHead>Institution</GlassTableHead>
                                    <GlassTableHead>Type</GlassTableHead>
                                    <GlassTableHead>Duration</GlassTableHead>
                                    <GlassTableHead className="text-right">Actions</GlassTableHead>
                                </GlassTableRow>
                            </GlassTableHeader>
                            <GlassTableBody>
                                {experiences.data.length === 0 ? (
                                    <GlassTableRow>
                                        <GlassTableCell colSpan={6} className="text-center py-8 text-gray-500">
                                            No experiences found.
                                        </GlassTableCell>
                                    </GlassTableRow>
                                ) : (
                                    experiences.data.map((exp: any) => (
                                        <GlassTableRow key={exp.id}>
                                            <GlassTableCell className="font-medium text-white">{exp.title}</GlassTableCell>
                                            <GlassTableCell>{exp.institution}</GlassTableCell>
                                            <GlassTableCell>
                                                <span className="capitalize px-2 py-1 bg-white/10 rounded text-xs">
                                                    {exp.type}
                                                </span>
                                            </GlassTableCell>
                                            <GlassTableCell>
                                                <span className="text-sm text-gray-400">
                                                    {exp.start_date} - {exp.end_date || 'Present'}
                                                </span>
                                            </GlassTableCell>
                                            <GlassTableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/experiences/${exp.id}/edit`} className="p-2 hover:bg-white/10 rounded transition-colors text-blue-400">
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button onClick={() => confirmDelete(exp.id)} className="p-2 hover:bg-white/10 rounded transition-colors text-red-500">
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

                <Pagination links={experiences.links} />
            </div>

            <ConfirmModal 
                isOpen={deleteId !== null} 
                onClose={() => setDeleteId(null)} 
                onConfirm={executeDelete} 
                title="Delete Experience"
                message="Are you sure you want to delete this experience? This action cannot be undone."
            />
        </AppLayout>
    );
}
