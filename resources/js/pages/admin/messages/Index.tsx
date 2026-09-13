import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui/glass-card';
import { GlassTable, GlassTableHeader, GlassTableRow, GlassTableHead, GlassTableBody, GlassTableCell } from '@/components/ui/glass-table';
import { Trash2, Eye, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { Pagination } from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Messages', href: '/admin/messages' },
];

export default function MessageIndex({ messages, filters, flash }: any) {
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
            router.get('/admin/messages', { search, status }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);
        return () => clearTimeout(timer);
    }, [search, status]);

    const confirmDelete = (id: number) => {
        setDeleteId(id);
    };

    const executeDelete = () => {
        if (deleteId) {
            router.delete(`/admin/messages/${deleteId}`);
            setDeleteId(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages | Elhalc8n OS" />
            
            <div className="flex flex-col gap-6 p-4 sm:p-6 w-full max-w-7xl mx-auto">


                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white tracking-wide">Inbox</h1>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search name, email, or subject..."
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
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                    </select>
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
                                {messages.data.length === 0 ? (
                                    <GlassTableRow>
                                        <GlassTableCell colSpan={5} className="text-center py-8 text-gray-500">
                                            No messages found.
                                        </GlassTableCell>
                                    </GlassTableRow>
                                ) : (
                                    messages.data.map((msg: any) => (
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
                                                    <button onClick={() => confirmDelete(msg.id)} className="p-2 hover:bg-white/10 rounded transition-colors text-red-500">
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

                <Pagination links={messages.links} />
            </div>

            <ConfirmModal 
                isOpen={deleteId !== null} 
                onClose={() => setDeleteId(null)} 
                onConfirm={executeDelete} 
                title="Delete Message"
                message="Are you sure you want to delete this message? This action cannot be undone."
            />
        </AppLayout>
    );
}
