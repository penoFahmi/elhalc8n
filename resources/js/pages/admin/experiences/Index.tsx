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

                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md flex flex-col sm:flex-row gap-3 mb-4 shadow-lg">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search title or institution..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00FF41]/30 focus:border-[#00FF41]/50 transition-all shadow-inner"
                        />
                    </div>
                    <div className="relative w-full sm:w-48">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full appearance-none bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00FF41]/30 focus:border-[#00FF41]/50 transition-all shadow-inner cursor-pointer"
                        >
                            <option value="" className="bg-gray-900">All Types</option>
                            <option value="work" className="bg-gray-900">Work</option>
                            <option value="education" className="bg-gray-900">Education</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                    </div>
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
