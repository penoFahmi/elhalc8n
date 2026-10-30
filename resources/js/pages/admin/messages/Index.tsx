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

                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md flex flex-col sm:flex-row gap-3 mb-4 shadow-lg">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search name, email, or subject..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00FF41]/30 focus:border-[#00FF41]/50 transition-all shadow-inner"
                        />
                    </div>
                    <div className="relative w-full sm:w-48">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full appearance-none bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00FF41]/30 focus:border-[#00FF41]/50 transition-all shadow-inner cursor-pointer"
                        >
                            <option value="" className="bg-gray-900">All Statuses</option>
                            <option value="unread" className="bg-gray-900">Unread</option>
                            <option value="read" className="bg-gray-900">Read</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                    </div>
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
