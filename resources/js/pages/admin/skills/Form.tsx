import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui/glass-card';
import { ArrowLeft, Save } from 'lucide-react';
import React from 'react';

export default function SkillForm({ skill }: any) {
    const isEdit = !!skill;

    const { data, setData, post, put, processing, errors } = useForm({
        name: skill?.name || '',
        category: skill?.category || '',
        percentage: skill?.percentage || 50,
        order_number: skill?.order_number || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Skills', href: '/admin/skills' },
        { title: isEdit ? 'Edit Skill' : 'New Skill', href: '#' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/skills/${skill.id}`);
        } else {
            post('/admin/skills');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${isEdit ? 'Edit' : 'New'} Skill | Elhalc8n OS`} />

            <div className="flex flex-col gap-6 p-4 sm:p-6 w-full max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/skills" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-300" />
                        </Link>
                        <h1 className="text-2xl font-bold text-white tracking-wide">
                            {isEdit ? 'Edit Skill' : 'Create New Skill'}
                        </h1>
                    </div>
                </div>

                <GlassCard>
                    <GlassCardHeader>
                        <GlassCardTitle>Skill Information</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-300">Name</label>
                                <input 
                                    type="text" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)}
                                    className="bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                    placeholder="e.g. React"
                                />
                                {errors.name && <span className="text-red-400 text-xs">{errors.name}</span>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-300">Category</label>
                                <input 
                                    type="text" 
                                    value={data.category} 
                                    onChange={e => setData('category', e.target.value)}
                                    className="bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                    placeholder="e.g. Frontend"
                                />
                                {errors.category && <span className="text-red-400 text-xs">{errors.category}</span>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-300">Proficiency Percentage ({data.percentage}%)</label>
                                <input 
                                    type="range" 
                                    min="0" max="100"
                                    value={data.percentage} 
                                    onChange={e => setData('percentage', parseInt(e.target.value))}
                                    className="w-full accent-[#00FF41]"
                                />
                                {errors.percentage && <span className="text-red-400 text-xs">{errors.percentage}</span>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-300">Display Order</label>
                                <input 
                                    type="number" 
                                    value={data.order_number} 
                                    onChange={e => setData('order_number', e.target.value)}
                                    className="bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                    placeholder="e.g. 1"
                                />
                                {errors.order_number && <span className="text-red-400 text-xs">{errors.order_number}</span>}
                                <span className="text-xs text-gray-500">Leave blank to append at the end.</span>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="flex items-center gap-2 bg-[#00FF41] hover:bg-[#00cc33] text-black px-6 py-2.5 rounded-md font-medium transition-all disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    {isEdit ? 'Save Changes' : 'Create Skill'}
                                </button>
                            </div>
                        </form>
                    </GlassCardContent>
                </GlassCard>
            </div>
        </AppLayout>
    );
}
