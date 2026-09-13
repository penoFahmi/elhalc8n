import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui/glass-card';
import { ArrowLeft, Save } from 'lucide-react';
import React from 'react';

export default function ExperienceForm({ experience }: any) {
    const isEdit = !!experience;

    const { data, setData, post, put, processing, errors } = useForm({
        title: experience?.title || '',
        institution: experience?.institution || '',
        type: experience?.type || 'work',
        start_date: experience?.start_date || '',
        end_date: experience?.end_date || '',
        description: experience?.description || '',
        order_number: experience?.order_number || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Experiences', href: '/admin/experiences' },
        { title: isEdit ? 'Edit Experience' : 'New Experience', href: '#' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/experiences/${experience.id}`);
        } else {
            post('/admin/experiences');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${isEdit ? 'Edit' : 'New'} Experience | Elhalc8n OS`} />

            <div className="flex flex-col gap-6 p-4 sm:p-6 w-full max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/experiences" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-300" />
                        </Link>
                        <h1 className="text-2xl font-bold text-white tracking-wide">
                            {isEdit ? 'Edit Experience' : 'Create New Experience'}
                        </h1>
                    </div>
                </div>

                <GlassCard>
                    <GlassCardHeader>
                        <GlassCardTitle>Experience Details</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-300">Title</label>
                                    <input 
                                        type="text" 
                                        value={data.title} 
                                        onChange={e => setData('title', e.target.value)}
                                        className="bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                        placeholder="e.g. Senior Developer"
                                    />
                                    {errors.title && <span className="text-red-400 text-xs">{errors.title}</span>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-300">Institution / Company</label>
                                    <input 
                                        type="text" 
                                        value={data.institution} 
                                        onChange={e => setData('institution', e.target.value)}
                                        className="bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                        placeholder="e.g. Google"
                                    />
                                    {errors.institution && <span className="text-red-400 text-xs">{errors.institution}</span>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-300">Type</label>
                                <select 
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                >
                                    <option value="work">Work</option>
                                    <option value="education">Education</option>
                                </select>
                                {errors.type && <span className="text-red-400 text-xs">{errors.type}</span>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-300">Start Date</label>
                                    <input 
                                        type="text" 
                                        value={data.start_date} 
                                        onChange={e => setData('start_date', e.target.value)}
                                        className="bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                        placeholder="e.g. 2021"
                                    />
                                    {errors.start_date && <span className="text-red-400 text-xs">{errors.start_date}</span>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-300">End Date</label>
                                    <input 
                                        type="text" 
                                        value={data.end_date} 
                                        onChange={e => setData('end_date', e.target.value)}
                                        className="bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                        placeholder="e.g. Present"
                                    />
                                    {errors.end_date && <span className="text-red-400 text-xs">{errors.end_date}</span>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-300">Description</label>
                                <textarea 
                                    rows={4}
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)}
                                    className="bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:outline-none focus:border-[#00FF41]/50 transition-colors"
                                    placeholder="Describe your responsibilities or achievements..."
                                />
                                {errors.description && <span className="text-red-400 text-xs">{errors.description}</span>}
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
                                    {isEdit ? 'Save Changes' : 'Create Experience'}
                                </button>
                            </div>
                        </form>
                    </GlassCardContent>
                </GlassCard>
            </div>
        </AppLayout>
    );
}
