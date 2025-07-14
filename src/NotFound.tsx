import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
    const navigate = useNavigate();
    const [glitchText, setGlitchText] = useState("404");
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [terminalInput, setTerminalInput] = useState("");
    const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
    const [matrixChars, setMatrixChars] = useState<string[]>([]);
    const [showMatrix, setShowMatrix] = useState(false);
    const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);
    const [konamiCode, setKonamiCode] = useState<string[]>([]);
    const [visitCount, setVisitCount] = useState(0);

    // Matrix rain effect
    useEffect(() => {
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const matrix = Array.from({ length: 50 }, () => chars[Math.floor(Math.random() * chars.length)]);
        setMatrixChars(matrix);
        
        const interval = setInterval(() => {
            setMatrixChars(prev => 
                prev.map(() => chars[Math.floor(Math.random() * chars.length)])
            );
        }, 150);

        return () => clearInterval(interval);
    }, []);

    // Konami code listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
            const newCode = [...konamiCode, e.code];
            
            if (newCode.length > konamiSequence.length) {
                newCode.shift();
            }
            
            setKonamiCode(newCode);
            
            if (newCode.length === konamiSequence.length && 
                newCode.every((code, index) => code === konamiSequence[index])) {
                setEasterEggUnlocked(true);
                setTerminalHistory(prev => [...prev, "🎮 KONAMI CODE ACTIVATED! Welcome to the Matrix, Neo!"]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [konamiCode]);

    // Visit counter
    useEffect(() => {
        const count = parseInt(localStorage.getItem('404-visits') || '0') + 1;
        localStorage.setItem('404-visits', count.toString());
        setVisitCount(count);
    }, []);

    // Glitch effect for 404 text
    useEffect(() => {
        const glitchChars = ['4', '0', '4', '█', '▓', '▒', '░', '╬', '╫', '╪', '┼', '┤', '├', '╋', '▀', '▄'];
        const originalText = "404";
        
        const glitchInterval = setInterval(() => {
            const shouldGlitch = Math.random() < 0.3;
            if (shouldGlitch) {
                const glitched = originalText.split('').map(char => 
                    Math.random() < 0.5 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
                ).join('');
                setGlitchText(glitched);
                setTimeout(() => setGlitchText(originalText), 150);
            }
        }, 1200);

        return () => clearInterval(glitchInterval);
    }, []);

    // Update time
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(timeInterval);
    }, []);

    // Animated terminal output
    useEffect(() => {
        const commands = [
            "Scanning for route...",
            "Route not found in routing table",
            "Attempting to recover...",
            "Checking backup routes...",
            "Generating navigation suggestions...",
            "Ready to assist with navigation!"
        ];

        let index = 0;
        const interval = setInterval(() => {
            if (index < commands.length) {
                setTerminalOutput(prev => [...prev, commands[index]]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 800);

        return () => clearInterval(interval);
    }, []);

    const handleTerminalCommand = (command: string) => {
        const cmd = command.toLowerCase().trim();
        setTerminalHistory(prev => [...prev, `$ ${command}`]);
        
        switch (cmd) {
            case "help":
                setTerminalHistory(prev => [...prev, "Available commands: help, clear, whoami, date, exit, matrix, joke, hack, neofetch, quotes, stats, konami"]);
                break;
            case "clear":
                setTerminalHistory([]);
                break;
            case "whoami":
                setTerminalHistory(prev => [...prev, "You are: A curious explorer lost in cyberspace 🚀"]);
                break;
            case "date":
                setTerminalHistory(prev => [...prev, `Current time: ${new Date().toLocaleString()}`]);
                break;
            case "exit":
                setTerminalHistory(prev => [...prev, "Redirecting to home..."]);
                setTimeout(() => navigate("/"), 1000);
                break;
            case "matrix":
                setShowMatrix(!showMatrix);
                setTerminalHistory(prev => [...prev, showMatrix ? "Matrix mode disabled" : "Matrix mode enabled! 🔴💊"]);
                break;
            case "joke":
                const jokes = [
                    "Why did the 404 error break up with the 500 error? Because it couldn't find the relationship!",
                    "What's a 404 error's favorite movie? Gone in 60 Seconds!",
                    "Why don't 404 errors ever win at hide and seek? Because they're always missing!",
                    "404 Error: Joke not found. Please try again later.",
                    "Why did the developer cry at the 404 page? Because it was a page not found!",
                    "What do you call a 404 error in space? A missing link!"
                ];
                const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                setTerminalHistory(prev => [...prev, randomJoke]);
                break;
            case "hack":
                const hackMessages = [
                    "Initializing hacking sequence...",
                    "Accessing mainframe...",
                    "Bypassing firewall...",
                    "Downloading the internet...",
                    "Hack complete! You now have root access to this 404 page! 😎"
                ];
                hackMessages.forEach((msg, index) => {
                    setTimeout(() => {
                        setTerminalHistory(prev => [...prev, msg]);
                    }, index * 1000);
                });
                break;
            case "neofetch":
                const sysInfo = [
                    "┌─────────────────────────────────────┐",
                    "│  OS: Error OS v404.0                │",
                    "│  Kernel: Lost-in-Space 5.15.0       │",
                    "│  Shell: /bin/confusion               │",
                    "│  Resolution: 404x404                 │",
                    "│  Terminal: iTerm404                  │",
                    "│  CPU: Intel i404-8086K              │",
                    "│  Memory: 404MB / 1337MB             │",
                    "│  Uptime: Forever lost                │",
                    "└─────────────────────────────────────┘"
                ];
                sysInfo.forEach(line => {
                    setTerminalHistory(prev => [...prev, line]);
                });
                break;
            case "quotes":
                const quotes = [
                    "\"The best error messages are the ones that make you smile.\" - Anonymous",
                    "\"404: The page you're looking for is in another castle.\" - Super Mario",
                    "\"I'm not lost, I'm just exploring alternative routes.\" - Every 404 page",
                    "\"Error 404: Sense of direction not found.\" - GPS",
                    "\"Life is like a 404 page, sometimes you just have to go back and try again.\" - Philosopher"
                ];
                const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                setTerminalHistory(prev => [...prev, randomQuote]);
                break;
            case "stats":
                setTerminalHistory(prev => [...prev, `404 Page Stats: You've visited this page ${visitCount} times!`]);
                break;
            case "konami":
                setTerminalHistory(prev => [...prev, "Try the Konami Code: ↑↑↓↓←→←→BA"]);
                break;
            default:
                setTerminalHistory(prev => [...prev, `Command not found: ${command}. Type 'help' for available commands.`]);
        }
    };

    const handleTerminalKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleTerminalCommand(terminalInput);
            setTerminalInput("");
        }
    };

    const handleGoHome = () => {
        setIsTyping(true);
        setTimeout(() => {
            navigate("/");
        }, 1000);
    };

    const handleGoBack = () => {
        setIsTyping(true);
        setTimeout(() => {
            window.history.back();
        }, 1000);
    };

    const handleCommandClick = (command: string) => {
        const routes: { [key: string]: string } = {
            "cd /home": "/",
            "cd /projects": "/projects",
            "cd /blogs": "/blogs",
            "cd /profile": "/profile"
        };

        if (routes[command]) {
            setIsTyping(true);
            setTimeout(() => {
                navigate(routes[command]);
            }, 800);
        }
    };

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono p-4 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Matrix Rain Background */}
            {showMatrix && (
                <div className="fixed inset-0 pointer-events-none z-0">
                    {matrixChars.map((char, index) => (
                        <div
                            key={index}
                            className="absolute text-green-400 opacity-20 animate-pulse"
                            style={{
                                left: `${(index * 2) % 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                fontSize: `${Math.random() * 20 + 10}px`
                            }}
                        >
                            {char}
                        </div>
                    ))}
                </div>
            )}

            {/* Space Background Effect */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${Math.random() * 3 + 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Terminal Window */}
            <div className="w-full max-w-5xl bg-gray-900 rounded-lg shadow-2xl overflow-hidden relative z-10">
                {/* Terminal Header */}
                <div className="bg-gray-800 p-3 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
                    <div className="ml-4 text-gray-400 text-sm">
                        user@iamdhakrey.dev: /lost/in/cyberspace
                    </div>
                    <div className="ml-auto text-gray-500 text-xs">
                        {currentTime}
                    </div>
                    {easterEggUnlocked && (
                        <div className="ml-2 text-green-400 text-xs animate-bounce">
                            🎮 KONAMI
                        </div>
                    )}
                </div>

                {/* Terminal Content */}
                <div className="p-6 space-y-6">
                    {/* Boot sequence */}
                    <div className="text-blue-400 text-sm space-y-1">
                        <div>Last login: {currentTime} on ttys000</div>
                        <div>Terminal session: recovery-mode</div>
                        <div className="text-yellow-400">WARNING: Route not found in filesystem</div>
                        <div className="text-purple-400">Visit #{visitCount} • Easter eggs: {easterEggUnlocked ? '1' : '0'}/1</div>
                    </div>

                    {/* Glitch ASCII Art */}
                    <div className="text-center py-8">
                        <div className="text-red-500 text-6xl md:text-8xl font-bold mb-4 font-mono">
                            <span className="glitch relative inline-block">
                                {glitchText}
                                <span className="absolute top-0 left-0 text-blue-500 opacity-70 animate-pulse">
                                    {glitchText}
                                </span>
                                <span className="absolute top-0 left-0 text-yellow-500 opacity-50 animate-bounce">
                                    {glitchText}
                                </span>
                            </span>
                        </div>
                        <div className="text-yellow-400 text-2xl md:text-3xl mb-2 animate-pulse">
                            ⚠️ ROUTE_NOT_FOUND_ERROR
                        </div>
                        <div className="text-gray-400 text-lg">
                            The requested endpoint has vanished into the digital void
                        </div>
                        {easterEggUnlocked && (
                            <div className="text-green-400 text-sm mt-2 animate-pulse">
                                🎮 Matrix Mode Unlocked! Type 'matrix' to toggle
                            </div>
                        )}
                    </div>

                    {/* Animated Terminal Output */}
                    <div className="bg-black p-4 rounded border-2 border-red-500 overflow-hidden">
                        <div className="space-y-2">
                            {terminalOutput.map((line, index) => (
                                <div key={index} className="text-green-400 animate-fadeIn">
                                    <span className="text-blue-400">system</span>
                                    <span className="text-white">@</span>
                                    <span className="text-red-400">error</span>
                                    <span className="text-white">: </span>
                                    <span>{line}</span>
                                    {index === terminalOutput.length - 1 && (
                                        <span className="animate-pulse">_</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Error Diagnostics */}
                    <div className="bg-gradient-to-r from-red-900 to-red-800 p-4 rounded border-l-4 border-red-400">
                        <div className="text-red-300 font-bold mb-2 flex items-center">
                            <span className="mr-2">🚨</span>
                            SYSTEM DIAGNOSTIC REPORT
                        </div>
                        <div className="text-red-100 space-y-1 text-sm">
                            <div>• Status Code: <span className="text-red-400 font-bold">HTTP 404</span></div>
                            <div>• Process ID: <span className="text-yellow-400">web-server [PID: 1337]</span></div>
                            <div>• Error Type: <span className="text-red-400">ROUTE_NOT_FOUND</span></div>
                            <div>• Stack Trace: Route missing from navigation mesh</div>
                            <div>• Recovery: <span className="text-green-400">Multiple options available</span></div>
                        </div>
                    </div>

                    {/* Interactive Navigation */}
                    <div className="bg-gray-800 p-4 rounded">
                        <div className="text-yellow-400 font-bold mb-3 flex items-center">
                            <span className="mr-2">🧭</span>
                            NAVIGATION MATRIX
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                                <div className="text-green-400 font-semibold">📂 Available Routes:</div>
                                {[
                                    { cmd: "cd /home", desc: "Return to terminal" },
                                    { cmd: "cd /projects", desc: "Browse projects" },
                                    { cmd: "cd /blogs", desc: "Read blog posts" },
                                    { cmd: "cd /profile", desc: "View profile" }
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        onClick={() => handleCommandClick(item.cmd)}
                                        className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors duration-200 hover:bg-gray-700 p-2 rounded"
                                    >
                                        <span className="font-mono">{item.cmd}</span>
                                        <span className="text-gray-300 ml-2">→ {item.desc}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <div className="text-green-400 font-semibold">🔧 System Commands:</div>
                                {[
                                    { cmd: "hack", desc: "Hacking simulator" },
                                    { cmd: "neofetch", desc: "System information" },
                                    { cmd: "quotes", desc: "Random quotes" },
                                    { cmd: "stats", desc: "Visit statistics" }
                                ].map((item, index) => (
                                    <div key={index} className="text-gray-300 hover:text-green-400 cursor-pointer transition-colors duration-200 hover:bg-gray-700 p-2 rounded">
                                        <span className="font-mono text-yellow-400">{item.cmd}</span>
                                        <span className="ml-2">→ {item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Interactive Terminal Easter Egg */}
                    <div className="bg-black p-4 rounded border-2 border-green-500">
                        <div className="text-green-400 mb-2">
                            <span className="text-blue-400">user@iamdhakrey.dev</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-600">/lost/in/cyberspace</span>
                            <span className="text-white">$ </span>
                            {isTyping ? (
                                <span className="text-yellow-400">Executing command...</span>
                            ) : (
                                <input
                                    type="text"
                                    value={terminalInput}
                                    onChange={(e) => setTerminalInput(e.target.value)}
                                    onKeyPress={handleTerminalKeyPress}
                                    className="bg-transparent text-white border-none outline-none font-mono"
                                    placeholder="Type 'help' for commands"
                                />
                            )}
                        </div>
                        
                        {/* Terminal History */}
                        <div className="text-gray-300 text-sm max-h-32 overflow-y-auto">
                            {terminalHistory.map((line, index) => (
                                <div key={index} className="mb-1">
                                    {line.startsWith('$') ? (
                                        <span className="text-green-400">{line}</span>
                                    ) : (
                                        <span className="text-gray-300">{line}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        <div className="text-gray-400 text-sm mt-2">
                            💡 Try: help, hack, matrix, neofetch, quotes, stats, konami
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                        <button
                            onClick={handleGoHome}
                            disabled={isTyping}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-green-500/25"
                        >
                            <span>🏠</span>
                            <span>cd /home</span>
                            {isTyping && <span className="animate-spin">⟳</span>}
                        </button>
                        <button
                            onClick={handleGoBack}
                            disabled={isTyping}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-blue-500/25"
                        >
                            <span>↩️</span>
                            <span>cd ..</span>
                            {isTyping && <span className="animate-spin">⟳</span>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Matrix-style footer */}
            <div className="mt-8 text-center space-y-2 relative z-10">
                <div className="text-gray-500 text-sm">
                    <span className="text-green-400">⚡</span>
                    <span>Lost in cyberspace? No problem!</span>
                    <span className="text-green-400">⚡</span>
                </div>
                <div className="text-gray-600 text-xs">
                    💡 Pro tip: Real developers never get lost, they just discover new routes
                </div>
                <div className="text-gray-700 text-xs">
                    🎯 This 404 page is more interactive than most websites!
                </div>
                {easterEggUnlocked && (
                    <div className="text-green-400 text-xs animate-pulse">
                        🎮 You found the secret! Welcome to the Matrix, Neo!
                    </div>
                )}
            </div>

            {/* Enhanced CSS */}
            <style>{`
                .glitch {
                    animation: glitch 2s infinite;
                }
                
                @keyframes glitch {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                    100% { transform: translate(0); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default NotFound;
