import { AlertTriangle } from 'lucide-react';
import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

export function ConfirmModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = 'Confirm Deletion', 
    message = 'Are you sure you want to proceed? This action cannot be undone.' 
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0c0c0c] border border-white/10 p-6 rounded-2xl shadow-2xl w-full max-w-sm animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 bg-red-500/10 text-red-500 rounded-full">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
                        <p className="text-sm text-gray-400">{message}</p>
                    </div>
                </div>
                <div className="flex gap-3 mt-6">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
