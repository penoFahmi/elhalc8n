import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui/glass-card';
import { GlassTable, GlassTableHeader, GlassTableRow, GlassTableHead, GlassTableBody, GlassTableCell } from '@/components/ui/glass-table';
import { Trash2, Eye } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Messages', href: '/admin/messages' },
];

export default function MessageIndex({ messages, flash }: any) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(`/admin/messages/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages | Elhalc8n OS" />
            
            <div className="flex flex-col gap-6 p-4 sm:p-6 w-full max-w-7xl mx-auto">
                {flash?.success && (
                    <div className="bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41] p-4 rounded-xl backdrop-blur-sm">
                        {flash.success}
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white tracking-wide">Inbox</h1>
                </div>

                <GlassCard>
                    <GlassCardHeader>
                        <GlassCardTitle>All Messages</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                        <GlassTable>
                            <GlassTableHeader>
                                <GlassTableRow>
                                    <GlassTableHead>Status</GlassTableHead>
                                    <GlassTableHead>Name</GlassTableHead>
                                    <GlassTableHead>Subject</GlassTableHead>
                                    <GlassTableHead>Date</GlassTableHead>
                                    <GlassTableHead className="text-right">Actions</GlassTableHead>
                                </GlassTableRow>
                            </GlassTableHeader>
                            <GlassTableBody>
                                {messages.length === 0 ? (
                                    <GlassTableRow>
                                        <GlassTableCell colSpan={5} className="text-center py-8 text-gray-500">
                                            No messages found.
                                        </GlassTableCell>
                                    </GlassTableRow>
                                ) : (
                                    messages.map((msg: any) => (
                                        <GlassTableRow key={msg.id} className={!msg.is_read ? 'bg-white/5' : ''}>
                                            <GlassTableCell>
                                                {!msg.is_read ? (
                                                    <span className="flex items-center gap-2 text-xs text-[#00FF41]">
                                                        <span className="w-2 h-2 rounded-full bg-[#00FF41]"></span> Unread
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-500">Read</span>
                                                )}
                                            </GlassTableCell>
                                            <GlassTableCell className={!msg.is_read ? "font-bold text-white" : "text-gray-300"}>
                                                {msg.name}
                                                <div className="text-xs text-gray-500 font-normal">{msg.email}</div>
                                            </GlassTableCell>
                                            <GlassTableCell className={!msg.is_read ? "text-white" : "text-gray-400"}>
                                                {msg.subject || 'No Subject'}
                                            </GlassTableCell>
                                            <GlassTableCell className="text-sm text-gray-400">
                                                {new Date(msg.created_at).toLocaleDateString()}
                                            </GlassTableCell>
                                            <GlassTableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/messages/${msg.id}`} className="p-2 hover:bg-white/10 rounded transition-colors text-blue-400">
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <button onClick={() => handleDelete(msg.id)} className="p-2 hover:bg-white/10 rounded transition-colors text-red-500">
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
