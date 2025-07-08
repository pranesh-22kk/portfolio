/* eslint-disable no-unused-vars */
import {
    MapPin,
    Calendar,
    Code,
    Smartphone,
    BookOpen,
    GitFork,
} from "lucide-react";


function AboutSection({ darkMode = true }) {
    {/* About Section */ }
    return (
        <section
            className={`about py-12 sm:py-20 transition-all duration-500 ${darkMode ? "bg-[#03050e]/90 text-gray-300" : "bg-white/50 text-gray-900"
                }`}
            id="about"
        >
            <h2 className="heading text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center flex items-center justify-center gap-3 sm:gap-4 font-serif">
                <img
                    src={`https://img.icons8.com/?size=64&id=6pczL8OSclRq&format=png&color=${darkMode ? "ffffff" : "000000"
                        }`}
                    alt=""
                    className="w-10 h-10 sm:w-16 sm:h-16"
                />{" "}
                Meet <span className={darkMode ? "text-gray-400" : "text-gray-700"}>Pranesh</span>
            </h2>

            <div className="row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse gap-8 sm:gap-12">
                <div className="content w-3/5 ">
                    <h3
                        className={`text-2xl sm:text-3xl font-bold mb-2 ${darkMode ? "text-gray-300" : "text-gray-900"
                            }`}
                    >
                        Hello, I'm Pranesh!
                    </h3>
                    <span
                        className={`tag text-base sm:text-lg font-semibold ${darkMode ? "text-gray-400" : "text-gray-700"
                            }`}
                    >
                        Full Stack Innovator
                    </span>

                    <p
                        className={`mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-800"
                            }`}
                    >
                        I'm a 21-year-old{" "}
                        <span
                            className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-900"
                                }`}
                        >
                            Full Stack Developer
                        </span>{" "}
                        from Erode, Tamilnadu, pursuing my B.Tech IT at Kongu Engineering College.
                        <b>
                            💡 "I specialize in transforming ideas into intuitive, high-performing web applications. 
                                With hands-on expertise in React, Next.js, Tailwind CSS for clean frontends and Node.js
                                for scalable backends, I build digital experiences that stand out and deliver impact."
                        </b>{" "}
                        With expertise in{" "}
                        <span
                            className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-900"
                                }`}
                        >
                            React, Next.js, and Tailwind CSS
                        </span>{" "}
                        for stunning frontends and{" "}
                        <span
                            className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-900"
                                }`}
                        >
                            Node.js
                        </span>{" "}
                        for robust backends, I've developed real-world projects like Erode Fancy Store (an e-commerce platform) and an Advanced Employee Management System.{" "}
                        My 2-month internship at Codsoft Technologies honed my skills, and I'm an
                        active{" "}
                        <span
                            className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-900"
                                }`}
                        >
                            open-source contributor
                        </span>
                        . When not coding, I'm exploring new frameworks or dreaming up the next big
                        app.{" "}
                        <span
                            className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-900"
                                }`}
                        >
                            Let's create something extraordinary!
                        </span>
                    </p>

                    <div className="box-container mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
                        <div className={`box text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            <p>
                                <span
                                    className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-900"
                                        }`}
                                >
                                    Email:
                                </span>{" "}
                                kpranesh2004@gmail.com
                            </p>
                            <p>
                                <span
                                    className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-900"
                                        }`}
                                >
                                    Phone:
                                </span>{" "}
                                +91 6383726393
                            </p>
                            <p>
                                <span
                                    className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-900"
                                        }`}
                                >
                                    Location:
                                </span>{" "}
                                Erode, TamilNadu, India - 638455
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-2/5 h-full ">
                    {/* <h3
                        className={`text-2xl sm:text-3xl text-center font-bold mb-3 sm:mb-4 ${darkMode ? "text-gray-300" : "text-gray-900"
                            }`}
                    >
                        Quick View Highlights
                    </h3> */}
                    <div className="grid grid-cols-1 w-full h-full gap-3">
                        {[
                            { icon: Calendar, label: "2-Month Internship at CodeSoft" },
                            { icon: BookOpen, label: "B.Tech IT in Progress" },
                            { icon: Code, label: "MERN Stack Developer" },
                            { icon: GitFork, label: "Open Source Enthusiast" },
                            { icon: Smartphone, label: "Web & Mobile Dev" },
                            { icon: MapPin, label: "Erode, TamilNadu" },
                        ].map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className={`w-full h-20 sm:h-24 md:h-12 rounded-lg p-2 sm:p-4 flex items-center justify-center space-x-2 sm:space-x-3 shadow-sm border transition-all duration-500 hover:shadow-md hover:-translate-y-1 ${darkMode ? "bg-gray-950 border-gray-700" : "bg-white shadow-lg border-gray-100"
                                    }`}
                            >
                                <Icon
                                    className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${darkMode ? "text-gray-400" : "text-gray-700"
                                        }`}
                                />
                                <span
                                    className={`text-xs sm:text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-800"
                                        }`}
                                >
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection