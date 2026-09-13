interface CommandPromptProps {
    command: string;
    path?: string;
    user?: string;
}

export function CommandPrompt({ command, path = '~', user = 'guest@elhalc8n.space' }: CommandPromptProps) {
    return (
        <div className="flex flex-wrap items-center gap-2 font-mono text-sm sm:text-base mt-2 mb-1">
            <span className="text-primary font-bold">{user}</span>
            <span className="text-white">:</span>
            <span className="text-blue-400 font-bold">{path}</span>
            <span className="text-white">$</span>
            <span className="text-gray-300 ml-1">{command}</span>
        </div>
    );
}
