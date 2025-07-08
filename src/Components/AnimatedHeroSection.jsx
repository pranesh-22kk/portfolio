/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
    ChevronDown,
    Github,
    Linkedin,
    Code,
    BookOpenText,
} from "lucide-react";
import Button from "./Button";

const AnimatedHeroSection = ({ darkMode }) => {
    const [displayedText, setDisplayedText] = useState("");
    const role = "Full Stack Developer";

    useEffect(() => {
        let index = 0;
        let isDeleting = false;

        const typeWriter = () => {
            if (!isDeleting && index <= role.length) {
                setDisplayedText(role.slice(0, index));
                index++;
            } else if (isDeleting && index >= 0) {
                setDisplayedText(role.slice(0, index));
                index--;
            }

            if (index === role.length) {
                setTimeout(() => (isDeleting = true), 2000);
            }

            if (index === 0 && isDeleting) {
                isDeleting = false;
                index = 0;
            }

            setTimeout(typeWriter, isDeleting ? 50 : 120);
        };

        typeWriter();
    }, []);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="home"
            className={`relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden transition-all duration-500 ${darkMode ? "bg-[#03050e] text-gray-300" : "bg-gray-100 text-black"}`}
        >
            {/* Background Blur & Lighting */}
            <div className="absolute inset-0 -z-10">
                <div className="bg-gradient-to-br from-transparent via-indigo-200/10 to-transparent h-full w-full rounded-3xl blur-[80px] rotate-6 scale-[1.3]" />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto w-full z-10">
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                    {/* Text Area */}
                    <div className="col-span-12 lg:col-span-7 space-y-6 text-left">
                        <div className="uppercase tracking-widest text-sm font-semibold text-green-500 drop-shadow-md">
                            Hello, I'm{" "}
                            <span className="text-green-400 underline decoration-dotted">
                                Pranesh
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold leading-tight drop-shadow-xl">
                            I'm a{" "}
                            <span className="text-amber-500 inline-block transform-gpu transition-transform animate-pulse3d">
                                {displayedText}
                                <span className="inline-block w-1 h-6 bg-amber-500 ml-1 animate-blink align-bottom" />
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl leading-7">
                            Passionate about building fast, accessible, and scalable full stack applications.
Focused on clean code, intuitive UI, and seamless user experiences.
Driven by modern technologies, performance, and continuous learning.




                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <Button
                                onClick={() => scrollToSection("work")}
                                icon={BookOpenText}
                                containerClassName="bg-[#253575] hover:bg-[#162561]"
                                OuterContainerClassName="bg-gradient-to-b from-[#253575] to-[#162561] shadow-xl shadow-blue-500/30"
                            >
                                View My Work
                            </Button>
                            <a href="/22ITR078_Resume_final.pdf" target="_blank" rel="noopener noreferrer">
                                <Button
                                    icon={Code}
                                    containerClassName="bg-green-600 hover:bg-green-700"
                                    OuterContainerClassName="bg-gradient-to-b from-green-600 to-green-700 shadow-xl shadow-green-400/30"
                                >
                                    Resume
                                </Button>
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-6">
                            <a
                                href="https://github.com/pranesh-22kk"
                                className="w-11 h-11 sm:w-12 sm:h-12 bg-gray-900 text-white border border-gray-700 hover:bg-gray-800 flex items-center justify-center rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/pranesh-k-662567259/"
                                className="w-11 h-11 sm:w-12 sm:h-12 bg-blue-700 text-white border border-blue-800 hover:bg-blue-800 flex items-center justify-center rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="relative group transform-gpu hover:scale-105 transition-transform duration-500">
                            <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition duration-300" />
                            <img
                                src="/hero.png"
                                alt="Hero"
                                className="relative w-[280px] sm:w-[360px] md:w-[420px] rounded-full transform scale-x-[-1] shadow-2xl border-4 border-gray-100 dark:border-gray-800"
                                style={{ backdropFilter: darkMode ? "" : "blur(4px)" }}
                            />
                            <div className="absolute bottom-0 right-0 h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-bounce">
                                <Code className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chevron Scroll Down */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-2xl text-gray-500">
                <ChevronDown />
            </div>

            {/* Extra Tailwind Animations */}
            <style>{`
                @keyframes blink {
                    0%, 50%, 100% { opacity: 1; }
                    25%, 75% { opacity: 0; }
                }

                .animate-blink {
                    animation: blink 1s step-end infinite;
                }

                @keyframes pulse3d {
                    0%, 100% {
                        transform: perspective(600px) rotateX(0deg) rotateY(0deg) scale(1);
                    }
                    50% {
                        transform: perspective(600px) rotateX(2deg) rotateY(3deg) scale(1.05);
                    }
                }

                .animate-pulse3d {
                    animation: pulse3d 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default AnimatedHeroSection;
