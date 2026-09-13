import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui/glass-card';
import { ArrowLeft, Trash2, Mail, Calendar, User } from 'lucide-react';
import { useState } from 'react';
import { ConfirmModal } from '@/components/ui/confirm-modal';

export default function MessageShow({ message }: any) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Messages', href: '/admin/messages' },
        { title: 'View Message', href: '#' },
    ];

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const executeDelete = () => {
        router.delete(`/admin/messages/${message.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Read Message | Elhalc8n OS" />

            <div className="flex flex-col gap-6 p-4 sm:p-6 w-full max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/messages" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-300" />
                        </Link>
                        <h1 className="text-2xl font-bold text-white tracking-wide">
                            View Message
                        </h1>
                    </div>
                    <button 
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 px-4 py-2 rounded-md font-medium transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                </div>

                <GlassCard>
                    <GlassCardHeader className="border-b border-white/10 pb-4 mb-4">
                        <GlassCardTitle className="text-xl">{message.subject || 'No Subject'}</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/5 rounded-full">
                                        <User className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">From</div>
                                        <div className="text-sm font-medium text-white">{message.name}</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/5 rounded-full">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">Email</div>
                                        <div className="text-sm text-blue-400">
                                            <a href={`mailto:${message.email}`}>{message.email}</a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 sm:col-span-2">
                                    <div className="p-2 bg-white/5 rounded-full">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">Received On</div>
                                        <div className="text-sm text-gray-300">
                                            {new Date(message.created_at).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/40 rounded-xl p-5 border border-white/5 min-h-[200px]">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Message Content</h3>
                                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                    {message.message}
                                </p>
                            </div>
                        </div>
                    </GlassCardContent>
                </GlassCard>
            </div>

            <ConfirmModal 
                isOpen={showDeleteConfirm} 
                onClose={() => setShowDeleteConfirm(false)} 
                onConfirm={executeDelete} 
                title="Delete Message"
                message="Are you sure you want to delete this message? This action cannot be undone."
            />
        </AppLayout>
    );
}
