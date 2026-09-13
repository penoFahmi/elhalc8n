import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui/glass-card';
import { GlassTable, GlassTableHeader, GlassTableRow, GlassTableHead, GlassTableBody, GlassTableCell } from '@/components/ui/glass-table';
import { Plus, Trash2, Edit } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Experiences', href: '/admin/experiences' },
];

export default function ExperienceIndex({ experiences, flash }: any) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            router.delete(`/admin/experiences/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Experiences CMS | Elhalc8n OS" />
            
            <div className="flex flex-col gap-6 p-4 sm:p-6 w-full max-w-7xl mx-auto">
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
                    <h1 className="text-2xl font-bold text-white tracking-wide">Experiences Management</h1>
                    <Link 
                        href="/admin/experiences/create"
                        className="flex items-center gap-2 bg-[#00FF41] hover:bg-[#00cc33] text-black px-4 py-2 rounded-md font-medium transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        New Experience
                    </Link>
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
                                {experiences.length === 0 ? (
                                    <GlassTableRow>
                                        <GlassTableCell colSpan={5} className="text-center py-8 text-gray-500">
                                            No experiences found. Create one.
                                        </GlassTableCell>
                                    </GlassTableRow>
                                ) : (
                                    experiences.map((exp: any) => (
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
                                                    <button onClick={() => handleDelete(exp.id)} className="p-2 hover:bg-white/10 rounded transition-colors text-red-500">
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
