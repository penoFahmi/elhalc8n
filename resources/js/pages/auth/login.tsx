import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { Typewriter } from '@/components/terminal/Typewriter';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status }: Props) {
    const [bootPhase, setBootPhase] = useState(0);
    const [step, setStep] = useState(1); // 1: email, 2: password, 3: fake-loading, 4: submitting
    const [history, setHistory] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    // Boot sequence
    useEffect(() => {
        const timers = [
            setTimeout(() => setBootPhase(1), 400),
            setTimeout(() => setBootPhase(2), 800)
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    // Focus active input when clicking anywhere
    const handleContainerClick = () => {
        if (step === 1) emailRef.current?.focus();
        if (step === 2) passwordRef.current?.focus();
    };

    const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!emailInput.trim()) return;
            setHistory(h => [...h, `elhalc8n login: ${emailInput}`]);
            setStep(2);
            setTimeout(() => passwordRef.current?.focus(), 10);
        }
    };

    const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setHistory(h => [...h, `Password: ${'*'.repeat(passwordInput.length)}`]);
            setStep(3);
            setProgress(0);
            
            // Fake loading bar logic
            let currentProg = 0;
            const interval = setInterval(() => {
                currentProg += Math.floor(Math.random() * 20) + 10;
                if (currentProg >= 100) {
                    currentProg = 100;
                    clearInterval(interval);
                    
                    // Submit using standard Inertia router
                    router.post('/login', {
                        email: emailInput,
                        password: passwordInput,
                        remember: true
                    }, {
                        onError: (errs) => {
                            setHistory(h => [...h, `Login incorrect`]);
                            setStep(1);
                            setPasswordInput('');
                            setTimeout(() => emailRef.current?.focus(), 50);
                        }
                    });
                }
                setProgress(currentProg);
            }, 150);
        }
    };

    return (
        <>
            <Head title="Login | Terminal" />
            <div 
                className="min-h-screen bg-[#0c0c0c] text-[#00FF41] font-mono p-4 sm:p-8 relative overflow-hidden cursor-text flex flex-col"
                onClick={handleContainerClick}
            >
                {/* CRT Scanline effect */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-20" />
                
                <div className="w-full max-w-4xl mx-auto relative z-10 flex-1">
                    <div className="mb-4 space-y-1">
                        <div><Typewriter text="Elhalc8n OS 2.0.4 (tty1)" delay={10} /></div>
                        {bootPhase >= 1 && <div><Typewriter text="Starting authentication service..." delay={10} /></div>}
                        {status && bootPhase >= 1 && <div className="text-green-400 mt-2">[SYSTEM]: {status}</div>}
                    </div>

                    {bootPhase >= 2 && (
                        <div className="flex flex-col">
                            {/* Render History */}
                            {history.map((line, i) => (
                                <div key={i} className={line.startsWith('[ERROR]') ? 'text-red-500' : 'text-gray-300'}>{line}</div>
                            ))}

                            {/* Step 1: Email */}
                            {step === 1 && (
                                <div className="flex items-center text-gray-300">
                                    <span>elhalc8n login:&nbsp;</span>
                                    <input
                                        ref={emailRef}
                                        type="email"
                                        name="email"
                                        value={emailInput}
                                        onChange={e => setEmailInput(e.target.value)}
                                        onKeyDown={handleEmailKeyDown}
                                        autoFocus
                                        autoComplete="email"
                                        className="bg-transparent outline-none text-[#00FF41] border-none p-0 focus:ring-0 w-64"
                                    />
                                </div>
                            )}

                            {/* Step 2: Password */}
                            {step === 2 && (
                                <div className="flex items-center text-gray-300">
                                    <span>Password:&nbsp;</span>
                                    <input
                                        ref={passwordRef}
                                        type="password"
                                        name="password"
                                        value={passwordInput}
                                        onChange={e => setPasswordInput(e.target.value)}
                                        onKeyDown={handlePasswordKeyDown}
                                        autoComplete="current-password"
                                        className="bg-transparent outline-none text-transparent border-none p-0 focus:ring-0 w-64 text-clip"
                                        style={{ caretColor: '#00FF41' }} // Show caret but hide text
                                    />
                                </div>
                            )}

                            {/* Step 3 & 4: Submitting */}
                            {(step === 3 || step === 4) && (
                                <div className="flex flex-col text-gray-300">
                                    <div className="flex items-center mb-1">
                                        <span className="text-[#00FF41]">[ AUTHENTICATING ]</span>
                                        {step === 4 && <span className="inline-block w-2.5 h-4 bg-[#00FF41] animate-pulse ml-2"></span>}
                                    </div>
                                    {step === 3 && (
                                        <div className="text-[#00FF41]">
                                            [{'#'.repeat(Math.floor(progress / 5))}{'.'.repeat(20 - Math.floor(progress / 5))}] {progress}%
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
