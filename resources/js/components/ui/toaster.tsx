import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, XCircle, Info, X } from 'lucide-react';

export function Toaster() {
    const { flash } = usePage().props;
    const [isVisible, setIsVisible] = useState(false);
    const [currentFlash, setCurrentFlash] = useState<{ type: string; message: string } | null>(null);

    useEffect(() => {
        if (flash?.success) setCurrentFlash({ type: 'success', message: flash.success });
        else if (flash?.error) setCurrentFlash({ type: 'error', message: flash.error });
        else if (flash?.warning) setCurrentFlash({ type: 'warning', message: flash.warning });
        else if (flash?.info) setCurrentFlash({ type: 'info', message: flash.info });
        else setCurrentFlash(null);

        if (flash?.success || flash?.error || flash?.warning || flash?.info) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!isVisible || !currentFlash) return null;

    const getStyles = () => {
        switch (currentFlash.type) {
            case 'success':
                return 'bg-[#00FF41]/10 border-[#00FF41]/30 text-[#00FF41]';
            case 'error':
                return 'bg-red-500/10 border-red-500/30 text-red-400';
            case 'warning':
                return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
            case 'info':
            default:
                return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
        }
    };

    const getIcon = () => {
        switch (currentFlash.type) {
            case 'success':
                return <CheckCircle2 className="w-5 h-5" />;
            case 'error':
                return <XCircle className="w-5 h-5" />;
            case 'warning':
                return <AlertCircle className="w-5 h-5" />;
            case 'info':
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl ${getStyles()} min-w-[300px] max-w-[400px]`}>
                <div className="flex-shrink-0 mt-0.5">
                    {getIcon()}
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium leading-relaxed">{currentFlash.message}</p>
                </div>
                <button 
                    onClick={() => setIsVisible(false)}
                    className="flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
