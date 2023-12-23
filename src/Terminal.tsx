// Terminal.js
import { useEffect, useState } from "react";
import ParrotAnimation from "./DancingParrot";

const Terminal = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<any[]>([]);

    const [showCommand, setshowCommand] = useState(true);
    const handleInputChange = (e: any) => {
        // console.log(e.target.value);
        setInput(e.target.value);
    };

    const handleEnterKey = (e: any) => {
        console.log(e.target.value);
        if (e.key === "Enter") {
            // Handle the command and update the output
            if (e.target.value === "") {
                console.log("blank input");
            } else {
                handleCommand(e.target.value);
                // Clear the input field
                setInput("");
            }
        }
    };

    const handleCommand = (main_command: string) => {
        const name = [
            "Usage: ",
            "-> info        - Displays information about me.",
            "-> whoami      - Displays information about me.",
            "-> about       - Displays information about me.",
            "-> parrot      - Dancing parrot.",
            "-> clear       - clear display.",
        ];
        const about = [
            "Hi  👋,I'm Hrithik Dhakrey, a highly experienced and talented Python developer with a passion for delivering innovative and scalable solutions. With over four years of experience as a Python developer, I have a deep understanding of the technology and the skills required to create high-quality, reliable applications.",
            "-----",
            "I have comprehensive skill set that includes creating Discord bots, CLI based applications, and APIs. I have a strong educational background, having completed his Bachelor of Technology degree in Computer Science and Cyber Security from Galgotia University in 2020.",
            "-----",
            "I don’t like to define myself by the work I’ve done. I define myself by the work I want to do. Skills can be taught, personality is inherent. I prefer to keep learning, continue challenging myself, and do interesting things that matter.",
            "-----",
            "Fueled by high energy levels and boundless enthusiasm, I’m easily inspired and more then willing to follow my fascinations wherever they take me. I’m passionate, expressive, multi-talented spirit with a natural ability to entertain and inspire. I’m never satisfied to just come up with ideas. Instead I have an almost impulsive need to act on them.",
            "-----",
            "My abundant energy fuels me in the pursuit of many interests, hobbies, areas of study and artistic endeavors. I’m a fast learner, able to pick up new skills and juggle different projects and roles with relative ease.",
            "-----",
        ];
        const command = main_command.toLocaleLowerCase();
        if (command == "info" || command == "about" || command == "whoami") {
            setOutput((prevOutput) => [
                ...prevOutput,
                {
                    type: "command",
                    text: about,
                    command: command,
                },
            ]);
        } else if (command == "clear") {
            setOutput([]);
        } else if (command == "parrot") {
            setshowCommand(false);
            console.log(showCommand);
            setOutput([
                {
                    type: "parrot",
                    text: ["Parrot"],
                    command: command,
                    parrot: <ParrotAnimation />,
                },
            ]);
        } else if (command == "help") {
            setOutput((prevOutput) => [
                ...prevOutput,
                {
                    type: "command",
                    text: name,
                    command: command,
                },
            ]);
        } else {
            setOutput((prevOutput) => [
                ...prevOutput,
                {
                    type: "command",
                    text: [
                        command + ": Command Not Found",
                        "Run 'help' command for more inforation",
                    ],
                },
            ]);
        }
    };

    const placeholders = [
        "Run 'info' Displays information about me",
        "Run 'clear' for clearing the display",
        "Run 'help' for more information",
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
                // If the placeholder is fully typed, move to the next one
                setCurrentPlaceholderIndex(
                    (prevIndex) => (prevIndex + 1) % placeholders.length
                );
                setTypedText(""); // Reset the typed text
            }
        }, 90);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [currentPlaceholderIndex, typedText, placeholders]);

    return (
        <div className="pt-0 font-source space-y-3 overflow-y-scroll h-[83vh] max-w-screen-xl mx-auto text-white p-4">
            <div>
                {output.map((item, index: number) => (
                    <div
                        key={index}
                        className={
                            item.type === "command"
                                ? "text-green-400"
                                : "hidden"
                        }
                    >
                        <span className="text-white">
                            iamdhakrey:~# {item.command}
                        </span>
                        <div>
                            {item.text.map((itemname: string) => (
                                <div>{itemname}</div>
                            ))}
                        </div>
                    </div>
                ))}

                {output.map((item, index: number) => (
                    <div
                        key={index}
                        className={
                            item.type === "parrot"
                                ? "text-red-400"
                                : "text-yellow-400"
                        }
                    >
                        {item.parrot}
                    </div>
                ))}
            </div>
            <div>
                <i
                    className={
                        showCommand ? " text-white cursor-shadow" : "hidden"
                    }
                >
                    iamdhakrey:~#
                    <input
                        type="text"
                        className="bg-black font-source cursor-shadow text-white border-none outline-none w-full h-full flex justify-start animate-fade-in"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleEnterKey}
                        placeholder={typedText}
                    />
                </i>
                {/* </span> */}
            </div>
        </div>
    );
};

export default Terminal;
