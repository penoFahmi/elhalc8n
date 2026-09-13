import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    className?: string;
}

export function Pagination({ links, className = '' }: PaginationProps) {
    if (!links || links.length <= 3) return null; // Only Previous, Next, and no pages

    return (
        <div className={`flex flex-wrap items-center justify-center gap-1 mt-6 ${className}`}>
            {links.map((link, index) => {
                let label = link.label;
                let icon = null;

                if (label.includes('&laquo;')) {
                    label = '';
                    icon = <ChevronLeft className="w-4 h-4" />;
                } else if (label.includes('&raquo;')) {
                    label = '';
                    icon = <ChevronRight className="w-4 h-4" />;
                }

                if (!link.url) {
                    return (
                        <span 
                            key={index} 
                            className="flex items-center justify-center w-8 h-8 rounded-md bg-white/5 text-gray-500 cursor-not-allowed text-sm"
                        >
                            {icon || <span dangerouslySetInnerHTML={{ __html: label }} />}
                        </span>
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        preserveState
                        preserveScroll
                        className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors text-sm font-medium
                            ${link.active 
                                ? 'bg-[#00FF41]/20 border border-[#00FF41]/50 text-[#00FF41]' 
                                : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-transparent'
                            }`}
                    >
                        {icon || <span dangerouslySetInnerHTML={{ __html: label }} />}
                    </Link>
                );
            })}
        </div>
    );
}
