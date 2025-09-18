/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import {
    ChevronDown,
    Github,
    Linkedin,
    Code,
    BookOpenText,
    Star,
    Zap,
    Heart,
    Coffee,
    Sparkles,
    Terminal,
} from "lucide-react";
import Button from "./Button";

// CSS-in-JS for advanced animations
const heroStyles = `
  @keyframes float3D {
    0%, 100% { 
      transform: translateY(0px) rotateX(0deg) rotateZ(0deg); 
    }
    33% { 
      transform: translateY(-15px) rotateX(10deg) rotateZ(5deg); 
    }
    66% { 
      transform: translateY(-5px) rotateX(-5deg) rotateZ(-3deg); 
    }
  }

  @keyframes orbit {
    0% { 
      transform: rotate(0deg) translateX(120px) rotate(0deg); 
    }
    100% { 
      transform: rotate(360deg) translateX(120px) rotate(-360deg); 
    }
  }

  @keyframes morphBorder {
    0%, 100% { 
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; 
      background: linear-gradient(45deg, #22d3ee, #3b82f6);
    }
    50% { 
      border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%; 
      background: linear-gradient(225deg, #22c55e, #f59e0b);
    }
  }

  @keyframes textGlow {
    0%, 100% { 
      text-shadow: 0 0 15px rgba(34, 211, 238, 0.4); 
    }
    50% { 
      text-shadow: 0 0 20px rgba(34, 197, 94, 0.5); 
    }
  }

  @keyframes particleFloat {
    0%, 100% { 
      transform: translateY(0px) scale(1); 
      opacity: 0.6; 
    }
    50% { 
      transform: translateY(-15px) scale(1.1); 
      opacity: 0.8; 
    }
  }

  @keyframes heroImageHover {
    0% { 
      transform: scale(1) rotateY(0deg) rotateX(0deg); 
    }
    100% { 
      transform: scale(1.05) rotateY(15deg) rotateX(10deg); 
    }
  }

  .hero-container {
    perspective: 1500px;
    transform-style: preserve-3d;
    position: relative;
    overflow: visible;
  }

  .text-3d {
    transform: translateZ(50px);
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .text-3d:hover {
    transform: translateZ(80px) rotateX(5deg) scale(1.02);
    animation: textGlow 2s ease-in-out infinite;
  }

  .hero-image-3d {
    transform: translateZ(100px) scale(1);
    transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
  }

  .hero-image-3d:hover {
    animation: heroImageHover 0.8s ease-out forwards;
  }

  .morphing-border {
    position: absolute;
    inset: -8px;
    z-index: -1;
    animation: morphBorder 12s ease-in-out infinite;
    filter: blur(6px);
  }

  .floating-particle {
    position: absolute;
    width: 10px;
    height: 10px;
    background: radial-gradient(circle, #22d3ee, #3b82f6);
    border-radius: 50%;
    animation: particleFloat 6s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }

  .orbiting-icon {
    position: absolute;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(34, 197, 94, 0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 50%;
    animation: orbit 20s linear infinite;
    transform-origin: center;
  }

  .orbiting-icon:nth-child(2) { animation-delay: -7s; }
  .orbiting-icon:nth-child(3) { animation-delay: -14s; }

  .floating-element {
    animation: float3D 6s ease-in-out infinite;
  }

  .interactive-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(34, 197, 94, 0.1),
      transparent 40%
    );
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 0;
  }
`;

const AnimatedHeroSection = ({ darkMode, scrollToSection }) => {
    const [displayedText, setDisplayedText] = useState("");
    const role = "Full Stack Developer";
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);
    const heroRef = useRef(null);
    const imageRef = useRef(null);

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

    // Advanced mouse tracking for 3D effects - optimized
    useEffect(() => {
        let animationId;
        const handleMouseMove = (e) => {
            if (heroRef.current) {
                cancelAnimationFrame(animationId);
                animationId = requestAnimationFrame(() => {
                    const rect = heroRef.current.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    setMousePosition({ x, y });
                    
                    // Update CSS custom properties for interactive background
                    heroRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
                    heroRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
                });
            }
        };

        const hero = heroRef.current;
        if (hero) {
            hero.addEventListener('mousemove', handleMouseMove);
            return () => {
                hero.removeEventListener('mousemove', handleMouseMove);
                cancelAnimationFrame(animationId);
            };
        }
    }, []);

    // Generate fewer floating particles for better performance
    useEffect(() => {
        const generateParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 8; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    delay: Math.random() * 4,
                    size: Math.random() * 6 + 4,
                });
            }
            setParticles(newParticles);
        };
        generateParticles();
    }, []);

    // Inject styles
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.textContent = heroStyles;
        document.head.appendChild(styleElement);
        return () => document.head.removeChild(styleElement);
    }, []);

    return (
        <section
            ref={heroRef}
            id="home"
            className={`hero-container min-h-screen flex items-center transition-all duration-500 ${
                darkMode ? "bg-transparent text-gray-300" : "bg-gray-200/50 text-black"
            }`}
            style={{
                transform: `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * 4}deg) rotateY(${(mousePosition.x - 0.5) * 4}deg)`,
                transition: 'transform 0.2s ease-out',
            }}
        >
            {/* Interactive Background */}
            <div className="interactive-bg" />
            
            {/* Floating Particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="floating-particle"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        animationDelay: `${particle.delay}s`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                    }}
                />
            ))}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-8 w-full">
                <div className="grid lg:grid-cols-12 gap-8 sm:gap-14 items-center">
                    <div className="floating-element space-y-6 sm:space-y-8 col-span-12 lg:col-span-7 order-2 lg:order-1 mt-8 lg:mt-0">
                        <div className="space-y-4 sm:space-y-6">
                            <div
                                className={`text-3d text-sm sm:text-[18px] w-full font-bold leading-[16px] tracking-[0.3em] mb-3 sm:mb-5 uppercase ${
                                    darkMode ? "text-[#ffffff]" : "text-[#000000]"
                                }`}
                            >
                                i'm{" "}
                                <span
                                    style={{
                                        ...(darkMode
                                            ? {
                                                  color: "transparent",
                                                  WebkitTextStrokeWidth: "1px",
                                                  WebkitTextStrokeColor: "#22c55e",
                                                  textStrokeWidth: "3px",
                                                  textStrokeColor: "#d97706",
                                              }
                                            : {}),
                                        filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.5))',
                                    }}
                                    className={`${darkMode ? "text-green-500" : "text-green-600"}`}
                                >
                                    Pranesh
                                </span>
                            </div>
                            <div
                                className={`text-3d mb-4 sm:mb-6 w-full text-4xl sm:text-5xl md:text-6xl font-extrabold ${
                                    darkMode ? "text-white" : "text-black"
                                }`}
                            >
                                I'm a{" "}
                                <span
                                    className={`inline-block transition-all duration-200 capitalize ease-in-out ${
                                        darkMode ? "text-amber-500" : "text-amber-600"
                                    }`}
                                    style={{
                                        filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.6))',
                                        textShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
                                    }}
                                >
                                    {displayedText}
                                    <span
                                        className={`inline-block w-1 h-12 sm:h-14 md:h-12 ml-1 ${
                                            darkMode ? "bg-amber-500" : "bg-amber-600"
                                        } animate-pulse`}
                                        style={{
                                            boxShadow: '0 0 20px rgba(245, 158, 11, 0.8)',
                                        }}
                                    />
                                </span>
                            </div>
                            <p
                                className={`text-3d w-full mb-8 sm:mb-14 leading-6 sm:leading-[32px] text-sm sm:text-[18px] md:text-[22px] md:leading-[36px] transition-all duration-500 ${
                                    darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                            >
                                I'm a full stack developer with a strong passion for crafting responsive, user-friendly web applications,
                                with a particular focus on modern frontend technologies. I thrive on building intuitive interfaces and seamless user experiences.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                            <div className="text-white flex flex-row gap-3">
                                <div
                                    style={{
                                        transform: 'translateZ(30px)',
                                        transition: 'transform 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateZ(50px) scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateZ(30px) scale(1)';
                                    }}
                                >
                                    <Button
                                        onClick={() => scrollToSection("work")}
                                        icon={BookOpenText}
                                        containerClassName="bg-[#253575] hover:bg-[#162561]"
                                        OuterContainerClassName="bg-gradient-to-b from-[#253575] to-[#162561]"
                                    >
                                        View My Work
                                    </Button>
                                </div>
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block"
                                    style={{
                                        transform: 'translateZ(30px)',
                                        transition: 'transform 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateZ(50px) scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateZ(30px) scale(1)';
                                    }}
                                >
                                    <Button
                                        icon={Code}
                                        containerClassName="bg-green-600 hover:bg-green-700"
                                        OuterContainerClassName="bg-gradient-to-b from-green-600 to-green-700"
                                    >
                                        Resume
                                    </Button>
                                </a>
                            </div>
                            <div className="flex space-x-3 sm:space-x-4">
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
                                <a
                                    href="https://leetcode.com/u/Pranesh__22/"
                                    className="w-11 h-11 sm:w-12 sm:h-12 bg-orange-600 text-white border border-orange-700 hover:bg-orange-700 flex items-center justify-center rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
                                >
                                    <Terminal className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="relative col-span-12 lg:col-span-5 order-1 lg:order-2">
                        {/* Hero Image with advanced 3D effects */}
                        <div
                            ref={imageRef}
                            className="hero-image-3d relative z-20 -mt-12 rounded-full transform w-full duration-300 h-fit flex justify-center lg:justify-end items-center"
                            style={{
                                transform: `translateZ(80px) rotateY(${(mousePosition.x - 0.5) * 10}deg) rotateX(${(mousePosition.y - 0.5) * 5}deg)`,
                            }}
                        >
                            <div className="relative">
                                {/* Morphing border */}
                                <div className="morphing-border"></div>
                                
                                {/* Reduced orbiting icons for better performance */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="orbiting-icon">
                                        <Star className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div className="orbiting-icon">
                                        <Zap className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="orbiting-icon">
                                        <Heart className="w-5 h-5 text-red-400" />
                                    </div>
                                </div>

                                <img
                                    src="/hero.png"
                                    className={`w-[280px] sm:w-[380px] md:w-[480px] ${
                                        darkMode ? "bg-[#03050e]" : "bg-gray-200 backdrop-blur-md"
                                    } rounded-full transform scale-x-[-1] h-auto relative z-10`}
                                    style={{
                                        filter: darkMode
                                            ? "drop-shadow(0 0 30px rgba(34, 197, 94, 0.4))"
                                            : "drop-shadow(0 0 10px rgba(14, 165, 233, 0.4))",
                                        transition: 'filter 0.3s ease',
                                    }}
                                    alt="Hero"
                                />
                            </div>
                        </div>

                        {/* Enhanced Floating Code Icon */}
                        <div
                            className={`absolute z-10 h-12 w-12 sm:h-16 sm:w-16 -bottom-6 sm:-bottom-10 duration-1000 -right-0 sm:-right-0 rounded-full flex justify-center items-center ${
                                darkMode ? "bg-gray-700/40" : "bg-gray-500/20"
                            }`}
                            style={{
                                animation: 'float3D 4s ease-in-out infinite',
                                background: 'rgba(34, 197, 94, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)',
                            }}
                        >
                            <Code
                                className={`h-5 w-5 sm:h-6 sm:w-6 ${darkMode ? "text-gray-300" : ""}`}
                                style={{
                                    color: '#22c55e',
                                    filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.6))',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ChevronDown
                    className={darkMode ? "text-gray-500" : "text-gray-400"}
                    style={{
                        filter: 'drop-shadow(0 0 10px rgba(156, 163, 175, 0.5))',
                    }}
                />
            </div>
        </section>
    );
};

export default AnimatedHeroSection;
