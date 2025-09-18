import React, { useState, useEffect, useRef } from "react";

import useInView from "../hooks/useInView";

// CSS-in-JS for advanced 3D animations
const skillCardStyles = `
  @keyframes float3D {
    0%, 100% { 
      transform: translateY(0px) rotateX(0deg) rotateZ(0deg); 
    }
    33% { 
      transform: translateY(-15px) rotateX(5deg) rotateZ(2deg); 
    }
    66% { 
      transform: translateY(-8px) rotateX(-3deg) rotateZ(-1deg); 
    }
  }

  @keyframes morphCard {
    0%, 100% { 
      border-radius: 32px;
      transform: perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1);
    }
    25% { 
      border-radius: 40px 16px 40px 16px;
      transform: perspective(1200px) rotateY(4deg) rotateX(3deg) scale(1.02);
    }
    50% { 
      border-radius: 16px 40px 16px 40px;
      transform: perspective(1200px) rotateY(-3deg) rotateX(4deg) scale(1.01);
    }
    75% { 
      border-radius: 36px 20px 36px 20px;
      transform: perspective(1200px) rotateY(3deg) rotateX(-2deg) scale(1.03);
    }
  }

  @keyframes holographicShine {
    0%, 100% { 
      background: linear-gradient(135deg, 
        rgba(34, 211, 238, 0.1) 0%, 
        rgba(59, 130, 246, 0.1) 25%, 
        rgba(168, 85, 247, 0.1) 50%, 
        rgba(34, 197, 94, 0.1) 75%, 
        rgba(245, 158, 11, 0.1) 100%);
      box-shadow: 
        0 0 40px rgba(34, 211, 238, 0.3),
        0 0 80px rgba(59, 130, 246, 0.2),
        inset 0 0 40px rgba(168, 85, 247, 0.1);
    }
    50% { 
      background: linear-gradient(135deg, 
        rgba(245, 158, 11, 0.1) 0%, 
        rgba(34, 197, 94, 0.1) 25%, 
        rgba(168, 85, 247, 0.1) 50%, 
        rgba(59, 130, 246, 0.1) 75%, 
        rgba(34, 211, 238, 0.1) 100%);
      box-shadow: 
        0 0 60px rgba(168, 85, 247, 0.4),
        0 0 120px rgba(34, 197, 94, 0.3),
        inset 0 0 60px rgba(245, 158, 11, 0.2);
    }
  }

  @keyframes iconSpin3D {
    0% { transform: rotateY(0deg) rotateX(0deg) scale(1); }
    25% { transform: rotateY(90deg) rotateX(15deg) scale(1.1); }
    50% { transform: rotateY(180deg) rotateX(0deg) scale(1.2); }
    75% { transform: rotateY(270deg) rotateX(-15deg) scale(1.1); }
    100% { transform: rotateY(360deg) rotateX(0deg) scale(1); }
  }

  @keyframes skillChipFloat {
    0%, 100% { 
      transform: translateY(0px) rotateZ(0deg) scale(1); 
    }
    50% { 
      transform: translateY(-8px) rotateZ(5deg) scale(1.05); 
    }
  }

  @keyframes textGlow {
    0%, 100% { 
      text-shadow: 0 0 20px rgba(34, 211, 238, 0.5); 
    }
    50% { 
      text-shadow: 0 0 30px rgba(168, 85, 247, 0.7), 0 0 40px rgba(34, 197, 94, 0.4); 
    }
  }

  @keyframes slideInCard {
    0% { 
      opacity: 0; 
      transform: translateY(100px) rotateX(-45deg) scale(0.8); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0) rotateX(0deg) scale(1); 
    }
  }

  @keyframes particleOrbit {
    0% { 
      transform: rotate(0deg) translateX(80px) rotate(0deg) scale(1); 
      opacity: 0.7;
    }
    50% { 
      transform: rotate(180deg) translateX(80px) rotate(-180deg) scale(1.3); 
      opacity: 1;
    }
    100% { 
      transform: rotate(360deg) translateX(80px) rotate(-360deg) scale(1); 
      opacity: 0.7;
    }
  }

  .skill-card-3d {
    perspective: 1200px;
    transform-style: preserve-3d;
    position: relative;
    animation: slideInCard 1s ease-out;
  }

  .card-container {
    transform: translateZ(30px);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
    animation: float3D 8s ease-in-out infinite;
  }

  .card-container:hover {
    animation: morphCard 3s ease-in-out infinite;
    transform: translateZ(80px) rotateY(10deg) rotateX(8deg) scale(1.08);
  }

  .card-glow {
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: inherit;
    animation: holographicShine 6s ease-in-out infinite;
    z-index: -1;
  }

  .title-icon-3d {
    transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
    transform: translateZ(25px);
    filter: drop-shadow(0 0 15px rgba(34, 211, 238, 0.4));
  }

  .card-container:hover .title-icon-3d {
    animation: iconSpin3D 2s ease-in-out;
    transform: translateZ(50px) scale(1.3);
    filter: drop-shadow(0 0 30px rgba(168, 85, 247, 0.8));
  }

  .title-3d {
    transform: translateZ(20px);
    transition: all 0.5s ease;
    animation: textGlow 4s ease-in-out infinite;
  }

  .card-container:hover .title-3d {
    transform: translateZ(40px) scale(1.1);
    animation-duration: 2s;
  }

  .skill-chip {
    transform: translateZ(10px);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    animation: skillChipFloat 3s ease-in-out infinite;
    position: relative;
    overflow: hidden;
  }

  .skill-chip:hover {
    transform: translateZ(30px) rotateY(10deg) scale(1.15);
    background: rgba(34, 211, 238, 0.2);
    border-color: rgba(34, 211, 238, 0.6);
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
  }

  .skill-chip::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  .skill-chip:hover::before {
    left: 100%;
  }

  .skill-icon {
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 5px rgba(34, 211, 238, 0.3));
  }

  .skill-chip:hover .skill-icon {
    transform: rotateY(360deg) scale(1.2);
    filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.6));
  }

  .orbiting-particle {
    position: absolute;
    width: 10px;
    height: 10px;
    background: radial-gradient(circle, #22d3ee, #3b82f6);
    border-radius: 50%;
    animation: particleOrbit 8s linear infinite;
    pointer-events: none;
    z-index: 15;
  }

  .orbiting-particle:nth-child(1) { animation-delay: 0s; }
  .orbiting-particle:nth-child(2) { animation-delay: -2.5s; }
  .orbiting-particle:nth-child(3) { animation-delay: -5s; }

  .interactive-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(34, 211, 238, 0.1),
      transparent 40%
    );
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 1;
    border-radius: inherit;
  }

  .gradient-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(34, 211, 238, 0.05) 50%, transparent 100%);
    opacity: 0;
    transition: opacity 0.5s ease;
    border-radius: inherit;
  }

  .card-container:hover .gradient-overlay {
    opacity: 1;
  }
`;

const SkillCard = ({ title, skills, icon, fallbackIcon, isDark = true }) => {
    const [titleIconError, setTitleIconError] = useState(false);
    const [skillIconErrors, setSkillIconErrors] = useState({});
    const [ref, inView] = useInView();
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    // Inject styles
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.textContent = skillCardStyles;
        document.head.appendChild(styleElement);
        return () => {
            if (document.head.contains(styleElement)) {
                document.head.removeChild(styleElement);
            }
        };
    }, []);

    // Mouse tracking for interactive glow
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                setMousePosition({ x, y });
                
                cardRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
                cardRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
            }
        };

        const card = cardRef.current;
        if (card && isHovered) {
            card.addEventListener('mousemove', handleMouseMove);
            return () => card.removeEventListener('mousemove', handleMouseMove);
        }
    }, [isHovered]);

    const handleTitleIconError = () => {
        if (!titleIconError) setTitleIconError(true);
    };

    const handleSkillIconError = (index) => {
        if (!skillIconErrors[index]) {
            setSkillIconErrors((prev) => ({ ...prev, [index]: true }));
        }
    };

    return (
        <div
            ref={(node) => {
                ref(node);
                cardRef.current = node;
            }}
            className={`skill-card-3d group relative min-h-[300px] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`card-container rounded-2xl p-4 sm:p-6 md:p-8 px-3 shadow-md border transition-all duration-700 transform ${
                    isDark ? "bg-gray-950 border-gray-700" : "bg-white border-gray-100"
                } hover:shadow-2xl`}
                style={{
                    transform: isHovered 
                        ? `perspective(1200px) rotateX(${(mousePosition.y - 0.5) * 15}deg) rotateY(${(mousePosition.x - 0.5) * 15}deg) translateZ(50px)`
                        : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
                }}
            >
                {/* Card Glow Effect */}
                <div className="card-glow" />
                
                {/* Interactive Glow */}
                <div className="interactive-glow" />
                
                {/* Gradient Overlay */}
                <div className="gradient-overlay" />
                
                {/* Orbiting Particles */}
                <div className="orbiting-particle" style={{ background: 'radial-gradient(circle, #22d3ee, #3b82f6)' }} />
                <div className="orbiting-particle" style={{ background: 'radial-gradient(circle, #a855f7, #8b5cf6)' }} />
                <div className="orbiting-particle" style={{ background: 'radial-gradient(circle, #22c55e, #16a34a)' }} />

                <div className="relative z-10 flex flex-col items-center text-center">
                    <img
                        src={titleIconError ? fallbackIcon : icon}
                        alt={`${title} icon`}
                        className="title-icon-3d w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 saturate-0 brightness-200 object-contain"
                        style={isDark ? { filter: "invert(1) brightness(2) saturate(0) drop-shadow(0 0 15px rgba(34, 211, 238, 0.4))" } : {}}
                        onError={handleTitleIconError}
                    />
                    
                    <h3 className={`title-3d text-lg sm:text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                        {title}
                    </h3>

                    <div className="flex flex-wrap justify-center gap-2">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className={`skill-chip flex items-center space-x-2 p-1 sm:p-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
                                    isDark
                                        ? "bg-white/5 border border-gray-700"
                                        : "bg-white/90 hover:bg-gray-200/90 border border-gray-100"
                                }`}
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <img
                                    src={
                                        skillIconErrors[index]
                                            ? "https://img.icons8.com/ios-filled/50/000000/404.png"
                                            : skill.icon
                                    }
                                    alt={`${skill.name} icon`}
                                    className="skill-icon w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain"
                                    onError={() => handleSkillIconError(index)}
                                />
                                <span className={`text-xs font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillCard;