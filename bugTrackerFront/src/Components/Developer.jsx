import { useState } from "react";

export default function Developer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="bg-gray-950">
                <nav className="flex justify-around items-center h-14 bg-gray-700 px-4 relative">
                    <div>
                        <h1 className="text-3xl text-white font-bold">
                            <a href="https://www.google.com"><i>BugTracker</i></a>
                        </h1>
                    </div> 

                    <div className="relative">
                        {/* Navigation Menu */}
                        <ul
                            className={`absolute md:static top-16 right-0 w-full md:w-auto bg-gray-700 md:bg-transparent flex flex-col md:flex-row items-center gap-1 p-4 md:p-0 transition-all duration-300 ease-in-out ${
                                isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none" 
                            } md:opacity-100 md:translate-y-0 md:pointer-events-auto`}
                        >
                            <li className="text-white cursor-pointer p-2 w-full text-center"><a href="">Roles</a></li>
                            <li className="text-white cursor-pointer p-2 w-full text-center"><a href="">Projects</a></li>
                            <li className="text-white cursor-pointer p-2 w-full text-center"><a href="  ">Notifications</a></li>
                            <li className="text-white cursor-pointer p-2 w-full text-center"><a href="">Others</a></li>
                        </ul>

                        {/* Hamburger Menu for Mobile */}
                        <div className="md:hidden">
                            <a
                                href="#"
                                className="text-3xl cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                &#8801;
                            </a>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="h-screen bg-slate-800 grid place-content-center">
                <h1 className="text-2xl text-white">Hello, I am the developer</h1>
            </div>
        </>
    );
}
