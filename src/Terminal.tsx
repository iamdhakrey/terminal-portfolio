// Terminal.js
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ParrotAnimation from "./DancingParrot";

const Terminal = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<any[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: any) => {
        setInput(e.target.value);
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            if (e.target.value.trim() === "") {
                addToOutput({ type: "command", command: "", text: [""] });
            } else {
                const command = e.target.value.trim();
                setCommandHistory(prev => [command, ...prev.slice(0, 99)]); // Keep last 100 commands
                handleCommand(command);
                setInput("");
            }
            setHistoryIndex(-1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex] || "");
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex] || "");
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            // Simple tab completion for common commands
            const commands = ["help", "about", "whoami", "neofetch", "clear", "ls", "cd", "pwd", "fortune", "cowsay", "tree", "ps", "top", "grep", "cat", "man", "history", "date", "uptime", "uname"];
            const matches = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
            if (matches.length === 1) {
                setInput(matches[0]);
            } else if (matches.length > 1) {
                addToOutput({
                    type: "completion",
                    command: input,
                    text: [`Tab completion: ${matches.join(", ")}`]
                });
            }
        }
    };

    const addToOutput = (item: any) => {
        setOutput(prev => [...prev, item]);
    };

    const handleCommand = (command: string) => {
        const args = command.split(' ');
        const cmd = args[0].toLowerCase();
        const params = args.slice(1);

        // Add command to output first
        addToOutput({ type: "input", command, text: [`user@localhost:~$ ${command}`] });

        switch (cmd) {
            case "help":
                addToOutput({
                    type: "command",
                    command: cmd,
                    text: [
                        "Available commands:",
                        "",
                        "  System Information:",
                        "    neofetch     - Display system information",
                        "    whoami       - Current user information",
                        "    about        - About me",
                        "    uname        - System information",
                        "    uptime       - System uptime",
                        "",
                        "  Navigation:",
                        "    cd [dir]     - Change directory (cd blogs, cd ~)",
                        "    ls [options] - List directory contents",
                        "    pwd          - Print working directory",
                        "    tree         - Display directory tree",
                        "",
                        "  Fun Stuff:",
                        "    parrot       - Dancing parrot animation",
                        "    fortune      - Random fortune cookie",
                        "    cowsay [msg] - Cowsay with message",
                        "    sl           - Steam locomotive",
                        "",
                        "  Utilities:",
                        "    clear        - Clear terminal",
                        "    history      - Command history",
                        "    date         - Current date and time",
                        "    ps           - Running processes",
                        "    top          - System monitor",
                        "    man [cmd]    - Manual for command",
                        "",
                        "Type any command to get started!"
                    ]
                });
                break;

            case "neofetch":
                addToOutput({
                    type: "neofetch",
                    command: cmd,
                    text: [
                        "                   -`                    user@localhost",
                        "                  .o+`                   ─────────────────",
                        "                 `ooo/                   OS: Arch Linux x86_64",
                        "                `+oooo:                  Host: iamdhakrey.dev",
                        "               `+oooooo:                 Kernel: 6.1.0-kali7-amd64",
                        "               -+oooooo+:                Uptime: 2 hours, 34 mins",
                        "             `/:-:++oooo+:               Packages: 1337 (pacman)",
                        "            `/++++/+++++++:              Shell: zsh 5.9",
                        "           `/++++++++++++++:             Resolution: 1920x1080",
                        "          `/+++ooooooooooooo/`           DE: Awesome",
                        "         ./ooosssso++osssssso+`          WM: Awesome",
                        "        .oossssso-````/ossssss+`         Terminal: alacritty",
                        "       -osssssso.      :ssssssso.        CPU: Intel i7-10750H (12) @ 2.6GHz",
                        "      :osssssss/        osssso+++.       GPU: NVIDIA GeForce GTX 1650",
                        "     /ossssssss/        +ssssooo/-       Memory: 3840MiB / 15951MiB",
                        "   `/ossssso+/:-        -:/+osssso+-     ",
                        "  `+sso+:-`                 `.-/+oso:    ",
                        " `++:.                           `-/+/   ",
                        " .`                                 `/   "
                    ]
                });
                break;

            case "whoami":
            case "about":
                addToOutput({
                    type: "command",
                    command: cmd,
                    text: [
                        "┌─ Hrithik Dhakrey (@iamdhakrey) ─┐",
                        "│                                 │",
                        "│ 🚀 Python Developer & DevOps    │",
                        "│ 🎓 B.Tech Computer Science      │",
                        "│ 🐧 Linux Enthusiast            │",
                        "│ 🤖 Discord Bot Developer        │",
                        "│ ⚡ CLI Applications Creator     │",
                        "│ 🔧 API Development Specialist   │",
                        "│                                 │",
                        "│ 📧 Contact: t.me/iamdhakrey     │",
                        "│ 🌐 GitHub: github.com/iamdhakrey│",
                        "└─────────────────────────────────┘",
                        "",
                        "💡 I'm a passionate developer who loves creating",
                        "   innovative solutions and learning new technologies.",
                        "   Always excited to work on interesting projects!",
                        "",
                        "🏗️  Current Focus:",
                        "   • Building scalable web applications",
                        "   • DevOps automation and infrastructure",
                        "   • Open source contributions"
                    ]
                });
                break;

            case "clear":
                setOutput([]);
                break;

            case "ls":
                if (params.includes("blogs") || params.includes("/blogs")) {
                    addToOutput({
                        type: "command",
                        command: cmd,
                        text: [
                            "total 3",
                            "drwxr-xr-x 2 user user 4096 Jan  1 12:00 .",
                            "drwxr-xr-x 3 user user 4096 Jan  1 11:30 ..",
                            "-rw-r--r-- 1 user user 8420 Jan  1 12:00 linux_commands.md",
                            "-rw-r--r-- 1 user user 6250 Dec 31 15:20 react-typescript-guide.md",
                            "-rw-r--r-- 1 user user 4180 Dec 30 10:15 sudoko.md",
                            "",
                            "💡 Use 'cd blogs' to navigate to blog directory"
                        ]
                    });
                } else {
                    addToOutput({
                        type: "command",
                        command: cmd,
                        text: [
                            "total 12",
                            "drwxr-xr-x 3 user user 4096 Jan  1 12:00 .",
                            "drwxr-xr-x 5 user user 4096 Jan  1 11:30 ..",
                            "drwxr-xr-x 2 user user 4096 Jan  1 12:00 blogs/",
                            "-rwxr-xr-x 1 user user 2048 Jan  1 10:00 portfolio.sh*",
                            "-rw-r--r-- 1 user user 1024 Jan  1 09:30 README.md",
                            "",
                            "📁 Directories: blogs/",
                            "💡 Try 'ls blogs' to see blog posts"
                        ]
                    });
                }
                break;

            case "cd":
                const dir = params[0] || "~";
                if (dir === "blogs" || dir === "/blogs") {
                    addToOutput({
                        type: "command",
                        command: cmd,
                        text: [
                            "📁 Navigating to blogs directory...",
                            "✨ Opening blog interface..."
                        ]
                    });
                    setTimeout(() => navigate("/blogs"), 1000);
                } else if (dir === ".." || dir === "~" || dir === "/") {
                    addToOutput({
                        type: "command",
                        command: cmd,
                        text: ["📁 Changed directory to: " + (dir === ".." ? "parent directory" : "home")]
                    });
                } else {
                    addToOutput({
                        type: "command",
                        command: cmd,
                        text: [`❌ cd: ${dir}: No such file or directory`]
                    });
                }
                break;

            case "pwd":
                addToOutput({
                    type: "command",
                    command: cmd,
                    text: ["/home/user"]
                });
                break;

            case "fortune":
                const fortunes = [
                    "The best way to predict the future is to invent it. - Alan Kay",
                    "Code is like humor. When you have to explain it, it's bad. - Cory House",
                    "First, solve the problem. Then, write the code. - John Johnson",
                    "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
                    "In order to be irreplaceable, one must always be different. - Coco Chanel",
                    "The only way to do great work is to love what you do. - Steve Jobs",
                    "It's not a bug; it's an undocumented feature. - Anonymous",
                    "Learning never exhausts the mind. - Leonardo da Vinci"
                ];
                const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
                addToOutput({
                    type: "command",
                    command: cmd,
                    text: [
                        "╭─────────────────────────────────────────╮",
                        "│ 🔮 Fortune Cookie                      │",
                        "├─────────────────────────────────────────┤",
                        `│ ${randomFortune.padEnd(39)} │`,
                        "╰─────────────────────────────────────────╯"
                    ]
                });
                break;

            case "cowsay":
                const message = params.join(" ") || "Moo! Welcome to my terminal!";
                const msgLine = message.length > 30 ? message.substring(0, 27) + "..." : message;
                addToOutput({
                    type: "command",
                    command: cmd,
                    text: [
                        ` ${"_".repeat(msgLine.length + 2)}`,
                        `< ${msgLine} >`,
                        ` ${"‾".repeat(msgLine.length + 2)}`,
                        "        \\   ^__^",
                        "         \\  (oo)\\_______",
                        "            (__)\\       )\\/\\",
                        "                ||----w |",
                        "                ||     ||"
                    ]
                });
                break;

            case "tree":
                addToOutput({
                    type: "command",
                    command: cmd,
                    text: [
                        ".",
                        "├── blogs/",
                        "│   ├── linux_commands.md",
                        "│   ├── react-typescript-guide.md",
                        "│   └── sudoko.md",
                        "├── public/",
                        "│   ├── assets/",
                        "│   └── images/",
                        "├── src/",
                        "│   ├── components/",
                        "│   ├── utils/",
                        "│   └── styles/",
                        "├── README.md",
                        "└── package.json",
                        "",
                        "4 directories, 8 files"
                    ]
                });
                break;

            case "ps":
                addToOutput({
                    type: "command",
                    command: cmd,
                    text: [
                        "PID    COMMAND",
                        "1      systemd",
                        "2      kthreadd",
                        "1337   terminal.jsx",
                        "1338   react-dom",
                        "1339   webpack-dev-server",
                        "1340   node",
                        "1341   zsh"
                    ]
                });
                break;

            case "top":
                addToOutput({
                    type: "command",
                    command: cmd,
                    text: [
                        "top - 14:30:45 up 2:34, 1 user, load average: 0.08, 0.12, 0.09",
                        "Tasks: 156 total, 1 running, 155 sleeping",
                        "Memory: 15951MB total, 3840MB used, 12111MB free",
                        "",
                        "PID  USER   %CPU %MEM  COMMAND",
                        "1337 user   12.5  2.1  node",
                        "1338 user    8.3  1.8  chrome",
                        "1339 user    5.2  1.2  code",
                        "1340 user    2.1  0.8  terminal"
                    ]
                });
                break;

            case "date":
                addToOutput({
                    type: "command",
                    command: cmd,
                    text: [new Date().toString()]
                });
                break;

            case "uptime":
                addToOutput({
                    type: "command",
                    command: cmd,
                    text: ["14:30:45 up 2:34, 1 user, load average: 0.08, 0.12, 0.09"]
                });
                break;

            case "uname":
                const flag = params[0];
                if (flag === "-a") {
                    addToOutput({
                        type: "command",
                        command: cmd,
                        text: ["Linux localhost 6.1.0-kali7-amd64 #1 SMP Debian 6.1.20-2kali1 x86_64 GNU/Linux"]
                    });
                } else {
                    addToOutput({
                        type: "command",
                        command: cmd,
                        text: ["Linux"]
                    });
                }
                break;

            case "history":
                addToOutput({
                    type: "command",
                    command: cmd,
                    text: commandHistory.slice(0, 10).map((cmd, i) => `${(commandHistory.length - i).toString().padStart(4, ' ')} ${cmd}`)
                });
                break;

            case "man":
                const manCmd = params[0];
                if (manCmd) {
                    addToOutput({
                        type: "command",
                        command: cmd,
                        text: [
                            `Manual page for ${manCmd}:`,
                            "",
                            `NAME`,
                            `    ${manCmd} - Linux command`,
                            "",
                            "DESCRIPTION",
                            `    This is a simulated man page for ${manCmd}.`,
                            `    For real documentation, use the actual man command.`,
                            "",
                            "💡 This is a demo terminal. Try 'help' for available commands."
                        ]
                    });
                } else {
                    addToOutput({
                        type: "command",
                        command: cmd,
                        text: ["What manual page do you want?", "Usage: man [command]"]
                    });
                }
                break;

            case "parrot":
                addToOutput({
                    type: "parrot",
                    command: cmd,
                    text: ["🦜 Party Parrot Activated!"],
                    parrot: <ParrotAnimation />
                });
                break;

            case "sl":
                addToOutput({
                    type: "command",
                    command: cmd,
                    text: [
                        "                 (  ) (@@) ( )  (@)  ()    @@    O     @     O     @      O",
                        "            (@@@)",
                        "        (    )",
                        "     (@@@@)",
                        " (   )",
                        "",
                        "🚂 Choo choo! The train has left the station!",
                        "💡 Tip: You meant to type 'ls', didn't you? 😄"
                    ]
                });
                break;

            default:
                addToOutput({
                    type: "command",
                    command: cmd,
                    text: [
                        `❌ ${cmd}: command not found`,
                        "",
                        "💡 Did you mean:",
                        "   • help    - Show available commands",
                        "   • ls      - List files",
                        "   • clear   - Clear terminal",
                        "   • about   - Learn about me"
                    ]
                });
                break;
        }
    };

    const placeholders = [
        "Type 'help' to see available commands",
        "Try 'neofetch' for system information",
        "Run 'ls' to list files and directories",
        "Use 'cd blogs' to navigate to blog posts",
        "Type 'about' to learn more about me",
        "Try 'fortune' for a random quote",
        "Use 'clear' to clear the terminal"
    ];

    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentText = placeholders[currentPlaceholderIndex];
            const nextChar = currentText[typedText.length];
            if (nextChar) {
                setTypedText((prevTypedText) => prevTypedText + nextChar);
            } else {
                setTimeout(() => {
                    setCurrentPlaceholderIndex(
                        (prevIndex) => (prevIndex + 1) % placeholders.length
                    );
                    setTypedText("");
                }, 2000);
            }
        }, 90);

        return () => clearInterval(intervalId);
    }, [currentPlaceholderIndex, typedText, placeholders]);

    // Auto-focus input
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div
            className="pt-0 font-mono space-y-1 overflow-y-auto h-[calc(100vh-160px)] max-w-screen-xl mx-auto text-white p-4 bg-black"
            onClick={() => inputRef.current?.focus()}
        >
            {/* Welcome message */}
            {output.length === 0 && (
                <div className="mb-6 text-green-400">
                    <div className="border border-gray-700 rounded-lg p-4 bg-gray-900">
                        <h2 className="text-xl mb-2">🐧 Welcome to iamdhakrey.dev terminal!</h2>
                        <p className="text-gray-400 mb-2">
                            This is an interactive Linux-style terminal. Type <span className="text-green-400">'help'</span> to see available commands.
                        </p>
                        <p className="text-gray-500 text-sm">
                            💡 Pro tip: Use arrow keys for command history, Tab for completion
                        </p>
                    </div>
                </div>
            )}

            {/* Output */}
            <div className="space-y-1">
                {output.map((item, index) => (
                    <div key={index}>
                        {item.type === "input" && (
                            <div className="text-green-400">
                                {item.text.map((line: string, i: number) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </div>
                        )}
                        {item.type === "command" && (
                            <div className="text-gray-200 ml-4">
                                {item.text.map((line: string, i: number) => (
                                    <div key={i} className={
                                        line.startsWith("❌") ? "text-red-400" :
                                            line.startsWith("✨") || line.startsWith("📁") ? "text-blue-400" :
                                                line.startsWith("💡") ? "text-yellow-400" :
                                                    line.startsWith("│") || line.startsWith("┌") || line.startsWith("└") || line.startsWith("├") ? "text-cyan-400" :
                                                        ""
                                    }>
                                        {line}
                                    </div>
                                ))}
                            </div>
                        )}
                        {item.type === "neofetch" && (
                            <div className="text-blue-400 ml-4 font-mono text-sm">
                                {item.text.map((line: string, i: number) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </div>
                        )}
                        {item.type === "parrot" && (
                            <div className="ml-4">
                                <div className="text-yellow-400 mb-2">{item.text[0]}</div>
                                {item.parrot}
                            </div>
                        )}
                        {item.type === "completion" && (
                            <div className="text-yellow-400 ml-4">
                                {item.text.map((line: string, i: number) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Input line */}
            <div className="flex items-center text-green-400 pt-2">
                <span className="text-blue-400">user@localhost</span>
                <span className="text-white">:</span>
                <span className="text-blue-600">~</span>
                <span className="text-white">$ </span>
                <input
                    ref={inputRef}
                    type="text"
                    className="bg-transparent text-white border-none outline-none flex-1 font-mono"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={output.length === 0 ? typedText : ""}
                />
            </div>
        </div>
    );
};

export default Terminal;
