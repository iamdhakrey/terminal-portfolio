import { useState } from "react";
import { useDate } from "./UpdateTime";

// fontawesome.library.add(faGithub);

function Navbar() {
    //   const [count, setCount] = useState(0);
    const date = useDate();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <nav className="max-w-screen-xl grid grid-cols-12 items-center justify-between lg:space-y-0 space-y-1 mx-auto p-4">
            <div className="lg:order-1 lg:col-span-4 col-span-6 flex justify-start">
                <a href="#" className="text-white block text-2xl font-semibold">
                    <span className="text-green-400">i</span>amdhakrey
                    <span className="text-green-400">.</span>dev
                </a>
            </div>

            <div className="lg:col-span-4 lg:order-3 col-span-6 flex sm:justify-start lg:justify-end md:justify-end xl:justify-end 2xl:justify-end">
                <a
                    href="#"
                    target="_blank"
                    className="block text-green-400 font-source tracking-wide"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    /blogs
                    {isHovered && (
                        <div className="absolute bg-gray-800 text-white p-2 rounded mt-2">
                            Coming Soon
                        </div>
                    )}
                </a>
                <pre className="text-white"> </pre>
                <a
                    href="https://t.me/iamdhakrey"
                    target="_blank"
                    className="block text-green-400 font-source tracking-wide"
                >
                    /telegram
                </a>
                <pre className="text-white"> </pre>
                <a
                    href="https://github.com/iamdhakrey/"
                    target="_blank"
                    className="block text-green-400 font-source tracking-wide"
                >
                    /github
                </a>
            </div>

            <div className="lg:col-span-4 lg:order-2 col-span-6 flex lg:justify-center justify-start">
                <span className="text-green-400 text-sm tracking-wide">
                    {date.date} {date.time}
                </span>
            </div>
        </nav>
    );
}

export default Navbar;
