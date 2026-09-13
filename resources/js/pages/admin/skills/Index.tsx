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
    { title: 'Skills', href: '/admin/skills' },
];

export default function SkillIndex({ skills, filters, flash }: any) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [search, setSearch] = useState(filters?.search || '');
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const timer = setTimeout(() => {
            router.get('/admin/skills', { search }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const confirmDelete = (id: number) => {
        setDeleteId(id);
    };

    const executeDelete = () => {
        if (deleteId) {
            router.delete(`/admin/skills/${deleteId}`);
            setDeleteId(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Skills CMS | Elhalc8n OS" />
            
            <div className="flex flex-col gap-6 p-4 sm:p-6 w-full max-w-7xl mx-auto">


                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white tracking-wide">Skills Management</h1>
                    <Link 
                        href="/admin/skills/create"
                        className="flex items-center gap-2 bg-[#00FF41] hover:bg-[#00cc33] text-black px-4 py-2 rounded-md font-medium transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        New Skill
                    </Link>
                </div>

                <div className="flex mb-2">
                    <div className="relative w-full sm:w-1/2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search skills or categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-md pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                        />
                    </div>
                </div>

                <GlassCard>
                    <GlassCardHeader>
                        <GlassCardTitle>All Skills</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                        <GlassTable>
                            <GlassTableHeader>
                                <GlassTableRow>
                                    <GlassTableHead>Order</GlassTableHead>
                                    <GlassTableHead>Name</GlassTableHead>
                                    <GlassTableHead>Category</GlassTableHead>
                                    <GlassTableHead>Proficiency</GlassTableHead>
                                    <GlassTableHead className="text-right">Actions</GlassTableHead>
                                </GlassTableRow>
                            </GlassTableHeader>
                            <GlassTableBody>
                                {skills.data.length === 0 ? (
                                    <GlassTableRow>
                                        <GlassTableCell colSpan={5} className="text-center py-8 text-gray-500">
                                            No skills found.
                                        </GlassTableCell>
                                    </GlassTableRow>
                                ) : (
                                    skills.data.map((skill: any) => (
                                        <GlassTableRow key={skill.id}>
                                            <GlassTableCell>{skill.order_number}</GlassTableCell>
                                            <GlassTableCell className="font-medium text-white">{skill.name}</GlassTableCell>
                                            <GlassTableCell>{skill.category}</GlassTableCell>
                                            <GlassTableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-full bg-white/10 rounded-full h-2 max-w-[100px]">
                                                        <div className="bg-[#00FF41] h-2 rounded-full" style={{ width: `${skill.percentage}%` }}></div>
                                                    </div>
                                                    <span className="text-xs text-gray-400">{skill.percentage}%</span>
                                                </div>
                                            </GlassTableCell>
                                            <GlassTableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/skills/${skill.id}/edit`} className="p-2 hover:bg-white/10 rounded transition-colors text-blue-400">
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button onClick={() => confirmDelete(skill.id)} className="p-2 hover:bg-white/10 rounded transition-colors text-red-500">
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

                <Pagination links={skills.links} />
            </div>

            <ConfirmModal 
                isOpen={deleteId !== null} 
                onClose={() => setDeleteId(null)} 
                onConfirm={executeDelete} 
                title="Delete Skill"
                message="Are you sure you want to delete this skill? This action cannot be undone."
            />
        </AppLayout>
    );
}
