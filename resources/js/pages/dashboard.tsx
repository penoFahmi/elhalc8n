import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui/glass-card';
import { GlassTable, GlassTableHeader, GlassTableRow, GlassTableHead, GlassTableBody, GlassTableCell } from '@/components/ui/glass-table';
import { Activity, Briefcase, MessageSquare, Star } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard | Elhalc8n OS" />
            <div className="flex flex-col gap-6 p-4 sm:p-6 w-full max-w-7xl mx-auto">
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <GlassCard>
                        <GlassCardHeader className="flex flex-row items-center justify-between pb-2">
                            <GlassCardTitle className="text-sm font-medium">Total Projects</GlassCardTitle>
                            <Briefcase className="h-4 w-4 text-[#00FF41]" />
                        </GlassCardHeader>
                        <GlassCardContent>
                            <div className="text-2xl font-bold text-white">12</div>
                            <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
                        </GlassCardContent>
                    </GlassCard>

                    <GlassCard>
                        <GlassCardHeader className="flex flex-row items-center justify-between pb-2">
                            <GlassCardTitle className="text-sm font-medium">Total Skills</GlassCardTitle>
                            <Star className="h-4 w-4 text-[#00FF41]" />
                        </GlassCardHeader>
                        <GlassCardContent>
                            <div className="text-2xl font-bold text-white">24</div>
                            <p className="text-xs text-muted-foreground mt-1">Across 4 categories</p>
                        </GlassCardContent>
                    </GlassCard>

                    <GlassCard>
                        <GlassCardHeader className="flex flex-row items-center justify-between pb-2">
                            <GlassCardTitle className="text-sm font-medium">Unread Messages</GlassCardTitle>
                            <MessageSquare className="h-4 w-4 text-[#00FF41]" />
                        </GlassCardHeader>
                        <GlassCardContent>
                            <div className="text-2xl font-bold text-white">3</div>
                            <p className="text-xs text-muted-foreground mt-1">Need your attention</p>
                        </GlassCardContent>
                    </GlassCard>

                    <GlassCard>
                        <GlassCardHeader className="flex flex-row items-center justify-between pb-2">
                            <GlassCardTitle className="text-sm font-medium">System Status</GlassCardTitle>
                            <Activity className="h-4 w-4 text-[#00FF41]" />
                        </GlassCardHeader>
                        <GlassCardContent>
                            <div className="text-2xl font-bold text-[#00FF41]">ONLINE</div>
                            <p className="text-xs text-muted-foreground mt-1">All services nominal</p>
                        </GlassCardContent>
                    </GlassCard>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <GlassCard className="h-full">
                            <GlassCardHeader>
                                <GlassCardTitle>Recent Messages</GlassCardTitle>
                            </GlassCardHeader>
                            <GlassCardContent>
                                <GlassTable>
                                    <GlassTableHeader>
                                        <GlassTableRow>
                                            <GlassTableHead>Name</GlassTableHead>
                                            <GlassTableHead>Email</GlassTableHead>
                                            <GlassTableHead>Date</GlassTableHead>
                                            <GlassTableHead className="text-right">Status</GlassTableHead>
                                        </GlassTableRow>
                                    </GlassTableHeader>
                                    <GlassTableBody>
                                        {[1,2,3].map(i => (
                                            <GlassTableRow key={i}>
                                                <GlassTableCell className="font-medium text-white">Guest User {i}</GlassTableCell>
                                                <GlassTableCell>guest{i}@example.com</GlassTableCell>
                                                <GlassTableCell>Today</GlassTableCell>
                                                <GlassTableCell className="text-right text-[#00FF41]">Unread</GlassTableCell>
                                            </GlassTableRow>
                                        ))}
                                    </GlassTableBody>
                                </GlassTable>
                            </GlassCardContent>
                        </GlassCard>
                    </div>

                    <div className="lg:col-span-1">
                        <GlassCard className="h-full">
                            <GlassCardHeader>
                                <GlassCardTitle>System Logs</GlassCardTitle>
                            </GlassCardHeader>
                            <GlassCardContent>
                                <div className="space-y-4">
                                    {[
                                        { time: '10:42 AM', log: 'Admin logged in from 192.168.1.1' },
                                        { time: '09:15 AM', log: 'Project "Elhalc8n OS" updated' },
                                        { time: 'Yesterday', log: 'New message received from Jane Doe' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex flex-col gap-1 border-b border-[#00FF41]/10 pb-2 last:border-0">
                                            <span className="text-[#FFB000] text-xs">{item.time}</span>
                                            <span className="text-gray-300 text-sm">{item.log}</span>
                                        </div>
                                    ))}
                                </div>
                            </GlassCardContent>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
