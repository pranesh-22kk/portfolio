import React, { useState, useEffect, useRef } from "react";
import {
    Menu,
    X,
} from "lucide-react";

// CSS-in-JS for advanced 3D animations
const navbarStyles = `
  @keyframes float3D {
    0%, 100% { 
      transform: translateY(0px) rotateX(0deg) rotateZ(0deg); 
    }
    33% { 
      transform: translateY(-5px) rotateX(2deg) rotateZ(1deg); 
    }
    66% { 
      transform: translateY(-2px) rotateX(-1deg) rotateZ(-0.5deg); 
    }
  }

  @keyframes morphNavbar {
    0%, 100% { 
      border-radius: 0px;
      background: rgba(3, 5, 14, 0.3);
    }
    25% { 
      border-radius: 20px 20px 0px 0px;
      background: rgba(15, 23, 42, 0.4);
    }
    50% { 
      border-radius: 10px 30px 10px 30px;
      background: rgba(30, 41, 59, 0.35);
    }
    75% { 
      border-radius: 30px 10px 30px 10px;
      background: rgba(51, 65, 85, 0.3);
    }
  }

  @keyframes glowPulse {
    0%, 100% { 
      box-shadow: 
        0 0 20px rgba(34, 211, 238, 0.3),
        0 0 40px rgba(34, 211, 238, 0.1),
        inset 0 0 20px rgba(34, 211, 238, 0.05);
    }
    50% { 
      box-shadow: 
        0 0 30px rgba(168, 85, 247, 0.4),
        0 0 60px rgba(168, 85, 247, 0.2),
        inset 0 0 30px rgba(168, 85, 247, 0.1);
    }
  }

  @keyframes slideInDown {
    0% { 
      opacity: 0; 
      transform: translateY(-50px) rotateX(-20deg) scale(0.95); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0) rotateX(0deg) scale(1); 
    }
  }

  @keyframes particleOrbit {
    0% { 
      transform: rotate(0deg) translateX(15px) rotate(0deg) scale(1); 
      opacity: 0.7;
    }
    50% { 
      transform: rotate(180deg) translateX(15px) rotate(-180deg) scale(1.2); 
      opacity: 1;
    }
    100% { 
      transform: rotate(360deg) translateX(15px) rotate(-360deg) scale(1); 
      opacity: 0.7;
    }
  }

  @keyframes textGlow {
    0%, 100% { 
      text-shadow: 0 0 15px rgba(34, 211, 238, 0.4); 
    }
    50% { 
      text-shadow: 0 0 25px rgba(168, 85, 247, 0.6), 0 0 35px rgba(34, 197, 94, 0.3); 
    }
  }

  @keyframes buttonMorph {
    0%, 100% { 
      border-radius: 8px;
      transform: perspective(800px) rotateY(0deg) rotateX(0deg) scale(1);
    }
    25% { 
      border-radius: 15px 5px 15px 5px;
      transform: perspective(800px) rotateY(5deg) rotateX(2deg) scale(1.02);
    }
    50% { 
      border-radius: 5px 15px 5px 15px;
      transform: perspective(800px) rotateY(-3deg) rotateX(3deg) scale(1.01);
    }
    75% { 
      border-radius: 12px 8px 12px 8px;
      transform: perspective(800px) rotateY(2deg) rotateX(-1deg) scale(1.03);
    }
  }

  .navbar-3d {
    perspective: 1200px;
    transform-style: preserve-3d;
    position: relative;
    overflow: visible;
    animation: slideInDown 1s ease-out;
  }

  .navbar-content {
    transform: translateZ(20px);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .navbar-3d:hover .navbar-content {
    transform: translateZ(40px) rotateX(1deg);
  }

  .nav-button {
    transform: translateZ(15px);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
    animation: float3D 6s ease-in-out infinite;
  }

  .nav-button:hover {
    animation: buttonMorph 2s ease-in-out infinite;
    transform: translateZ(35px) rotateY(5deg) scale(1.05);
    text-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
  }

  .nav-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  .nav-button:hover::before {
    left: 100%;
  }

  .nav-button.active {
    animation: glowPulse 3s ease-in-out infinite;
    transform: translateZ(30px) scale(1.1);
  }

  .toggle-button {
    transform: translateZ(20px);
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    animation: float3D 4s ease-in-out infinite;
  }

  .toggle-button:hover {
    transform: translateZ(40px) rotateY(10deg) rotateX(5deg) scale(1.2);
    box-shadow: 0 15px 30px rgba(168, 85, 247, 0.4);
    animation: buttonMorph 1.5s ease-in-out infinite;
  }

  .mobile-menu {
    transform: translateZ(10px);
    animation: slideInDown 0.5s ease-out;
  }

  .mobile-menu-button {
    transform: translateZ(5px);
    transition: all 0.3s ease;
  }

  .mobile-menu-button:hover {
    transform: translateZ(15px) translateX(10px) scale(1.05);
    text-shadow: 0 0 15px rgba(34, 211, 238, 0.6);
  }

  .floating-particle {
    position: absolute;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, #22d3ee, transparent);
    border-radius: 50%;
    animation: particleOrbit 4s linear infinite;
    pointer-events: none;
    z-index: 10;
  }

  .interactive-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(34, 211, 238, 0.08),
      transparent 40%
    );
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  .logo-3d {
    transform: translateZ(25px);
    transition: all 0.5s ease;
    animation: textGlow 4s ease-in-out infinite;
  }

  .logo-3d:hover {
    transform: translateZ(45px) rotateY(10deg) scale(1.1);
  }
`;

// Navigation Component with Dark Mode Toggle
const NavBar = ({
    activeSection,
    scrollToSection,
    isMenuOpen,
    setIsMenuOpen,
    darkMode,
    setDarkMode,
}) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);
    const navRef = useRef(null);

    // Inject styles
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.textContent = navbarStyles;
        document.head.appendChild(styleElement);
        return () => {
            if (document.head.contains(styleElement)) {
                document.head.removeChild(styleElement);
            }
        };
    }, []);

    // Generate floating particles
    useEffect(() => {
        const generateParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 8; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    delay: Math.random() * 4,
                    color: ['#22d3ee', '#a855f7', '#22c55e'][Math.floor(Math.random() * 3)],
                });
            }
            setParticles(newParticles);
        };
        generateParticles();
    }, []);

    // Mouse tracking for 3D effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (navRef.current) {
                const rect = navRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                setMousePosition({ x, y });
                
                navRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
                navRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
            }
        };

        const nav = navRef.current;
        if (nav) {
            nav.addEventListener('mousemove', handleMouseMove);
            return () => nav.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    return (
        <nav
            ref={navRef}
            className={`navbar-3d fixed top-0 py-2 left-0 right-0 z-50 backdrop-blur-sm border-b shadow-md transition-all duration-500 ${
                darkMode
                    ? "border-gray-800 shadow-black text-white"
                    : "border-sky-950 shadow-gray-600/60 bg-white/50 text-black"
            }`}
            style={{
                background: darkMode 
                    ? `rgba(3, 5, 14, 0.3)` 
                    : `rgba(255, 255, 255, 0.5)`,
                transform: `perspective(1200px) rotateX(${(mousePosition.y - 0.5) * 2}deg) rotateY(${(mousePosition.x - 0.5) * 2}deg)`,
                animation: darkMode ? 'morphNavbar 10s ease-in-out infinite' : 'none'
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
                        background: `radial-gradient(circle, ${particle.color}, transparent)`,
                        animationDelay: `${particle.delay}s`,
                    }}
                />
            ))}

            <div className="navbar-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="logo-3d">
                        <h1 className="text-xl font-bold">Pranesh</h1>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-4 lg:space-x-8">
                        {["home", "about", "skills", "education", "achievements", "work", "contact"].map(
                            (section, index) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className={`nav-button capitalize transition-all duration-500 text-sm sm:text-base font-medium px-3 py-2 rounded-lg ${
                                        activeSection === section
                                            ? `active ${darkMode ? "text-white" : "text-black"}`
                                            : darkMode
                                                ? "text-gray-400 hover:text-white"
                                                : "text-gray-600 hover:text-gray-900"
                                    }`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {section}
                                </button>
                            )
                        )}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            aria-label="Toggle Dark Mode"
                            className={`toggle-button p-1 sm:p-2 rounded-md transition-all duration-500 ${
                                darkMode
                                    ? "bg-gray-900 hover:bg-gray-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                            }`}
                        >
                            <span style={{ fontSize: '1.2rem' }}>
                                {darkMode ? "🌙" : "☀️"}
                            </span>
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`toggle-button md:hidden p-1 sm:p-2 rounded-lg ${
                                darkMode ? "text-white hover:bg-gray-800" : "text-black hover:bg-gray-200"
                            }`}
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    className={`mobile-menu md:hidden transition-all duration-500 ${
                        darkMode ? "bg-[#03050e]/90 border-gray-800" : "bg-white/90 border-gray-200"
                    } border-b backdrop-blur-md`}
                >
                    <div className="px-4 py-2 space-y-1">
                        {["home", "about", "skills", "education", "achievements", "work", "contact"].map(
                            (section, index) => (
                                <button
                                    key={section}
                                    onClick={() => {
                                        scrollToSection(section);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`mobile-menu-button block w-full text-left py-2 px-3 capitalize transition-all duration-500 text-sm rounded-lg ${
                                        darkMode
                                            ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {section}
                                </button>
                            )
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;