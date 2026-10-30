import { Terminal, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';

type ThemeMode = 'terminal' | 'modern';

interface ThemeSwitcherProps {
    currentTheme: ThemeMode;
    onChange: (theme: ThemeMode) => void;
}

export function ThemeSwitcher({ currentTheme, onChange }: ThemeSwitcherProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const toggleTheme = () => {
        const next = currentTheme === 'terminal' ? 'modern' : 'terminal';
        onChange(next);
    };

    return (
        <button
            onClick={toggleTheme}
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 flex items-center justify-center gap-2 group
                ${currentTheme === 'terminal' 
                    ? 'bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30 hover:bg-[#00FF41]/20 shadow-[0_0_20px_rgba(0,255,65,0.3)]' 
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                }`}
            title={`Switch to ${currentTheme === 'terminal' ? 'Modern GUI' : 'Terminal'} Mode`}
        >
            <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transition-all duration-500 ${currentTheme === 'terminal' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
                    <Terminal className="w-6 h-6" />
                </div>
                <div className={`absolute inset-0 transition-all duration-500 ${currentTheme === 'modern' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
                    <Monitor className="w-6 h-6" />
                </div>
            </div>
            
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[120px] transition-all duration-500 ease-in-out font-bold text-sm opacity-0 group-hover:opacity-100 group-hover:ml-2">
                {currentTheme === 'terminal' ? 'GUI Mode' : 'CLI Mode'}
            </span>
        </button>
    );
}
