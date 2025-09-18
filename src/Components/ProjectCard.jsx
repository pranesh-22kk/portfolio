import React, { useState, useEffect, useRef } from "react";
import {
    Github,
    ExternalLink,
    Code,
} from "lucide-react";

import useInView from "../hooks/useInView";

// CSS-in-JS for advanced 3D animations
const projectCardStyles = `
  @keyframes float3D {
    0%, 100% { 
      transform: translateY(0px) rotateX(0deg) rotateZ(0deg); 
    }
    33% { 
      transform: translateY(-12px) rotateX(3deg) rotateZ(1deg); 
    }
    66% { 
      transform: translateY(-6px) rotateX(-2deg) rotateZ(-0.5deg); 
    }
  }

  @keyframes morphCard {
    0%, 100% { 
      border-radius: 16px;
      transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1);
    }
    25% { 
      border-radius: 24px 8px 24px 8px;
      transform: perspective(1000px) rotateY(3deg) rotateX(2deg) scale(1.02);
    }
    50% { 
      border-radius: 8px 24px 8px 24px;
      transform: perspective(1000px) rotateY(-2deg) rotateX(3deg) scale(1.01);
    }
    75% { 
      border-radius: 20px 12px 20px 12px;
      transform: perspective(1000px) rotateY(2deg) rotateX(-1deg) scale(1.03);
    }
  }

  @keyframes holographicShine {
    0%, 100% { 
      background: linear-gradient(135deg, 
        rgba(34, 211, 238, 0.15) 0%, 
        rgba(59, 130, 246, 0.15) 25%, 
        rgba(168, 85, 247, 0.15) 50%, 
        rgba(34, 197, 94, 0.15) 75%, 
        rgba(245, 158, 11, 0.15) 100%);
      box-shadow: 
        0 0 40px rgba(34, 211, 238, 0.3),
        0 0 80px rgba(59, 130, 246, 0.2),
        inset 0 0 40px rgba(168, 85, 247, 0.1);
    }
    50% { 
      background: linear-gradient(135deg, 
        rgba(245, 158, 11, 0.15) 0%, 
        rgba(34, 197, 94, 0.15) 25%, 
        rgba(168, 85, 247, 0.15) 50%, 
        rgba(59, 130, 246, 0.15) 75%, 
        rgba(34, 211, 238, 0.15) 100%);
      box-shadow: 
        0 0 60px rgba(168, 85, 247, 0.4),
        0 0 120px rgba(34, 197, 94, 0.3),
        inset 0 0 60px rgba(245, 158, 11, 0.2);
    }
  }

  @keyframes particleOrbit {
    0% { 
      transform: rotate(0deg) translateX(60px) rotate(0deg) scale(1); 
      opacity: 0.7;
    }
    50% { 
      transform: rotate(180deg) translateX(60px) rotate(-180deg) scale(1.3); 
      opacity: 1;
    }
    100% { 
      transform: rotate(360deg) translateX(60px) rotate(-360deg) scale(1); 
      opacity: 0.7;
    }
  }

  @keyframes slideInCard {
    0% { 
      opacity: 0; 
      transform: translateY(80px) rotateX(-30deg) scale(0.9); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0) rotateX(0deg) scale(1); 
    }
  }

  @keyframes textGlow {
    0%, 100% { 
      text-shadow: 0 0 15px rgba(255, 255, 255, 0.5); 
    }
    50% { 
      text-shadow: 0 0 25px rgba(34, 211, 238, 0.8), 0 0 35px rgba(168, 85, 247, 0.6); 
    }
  }

  @keyframes overlaySlide {
    0% { 
      opacity: 0; 
      transform: translateY(100%) rotateX(-45deg); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0) rotateX(0deg); 
    }
  }

  .project-card-3d {
    perspective: 1200px;
    transform-style: preserve-3d;
    position: relative;
    animation: slideInCard 1s ease-out;
  }

  .card-container {
    transform: translateZ(20px);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
    animation: float3D 8s ease-in-out infinite;
  }

  .card-container:hover {
    animation: morphCard 3s ease-in-out infinite;
    transform: translateZ(60px) rotateY(8deg) rotateX(5deg) scale(1.05);
  }

  .card-glow {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: inherit;
    animation: holographicShine 6s ease-in-out infinite;
    z-index: -1;
  }

  .image-3d {
    transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
    transform: translateZ(10px);
  }

  .card-container:hover .image-3d {
    transform: translateZ(30px) rotateX(5deg) scale(1.08);
    filter: brightness(0.8) saturate(1.2) drop-shadow(0 0 20px rgba(34, 211, 238, 0.4));
  }

  .title-overlay {
    transform: translateZ(15px);
    transition: all 0.5s ease;
    animation: textGlow 4s ease-in-out infinite;
  }

  .card-container:hover .title-overlay {
    transform: translateZ(35px) scale(1.05);
  }

  .hover-overlay {
    animation: overlaySlide 0.5s ease-out;
    backdrop-filter: blur(15px);
    transform: translateZ(25px);
  }

  .tag-3d {
    transform: translateZ(5px);
    transition: all 0.3s ease;
  }

  .tag-3d:hover {
    transform: translateZ(15px) scale(1.1) rotateZ(5deg);
    background: rgba(34, 211, 238, 0.3);
    box-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
  }

  .link-3d {
    transform: translateZ(10px);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .link-3d:hover {
    transform: translateZ(20px) rotateY(5deg) scale(1.1);
    text-shadow: 0 0 15px rgba(34, 211, 238, 0.8);
  }

  .link-3d::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  .link-3d:hover::before {
    left: 100%;
  }

  .orbiting-particle {
    position: absolute;
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, #22d3ee, #3b82f6);
    border-radius: 50%;
    animation: particleOrbit 6s linear infinite;
    pointer-events: none;
    z-index: 10;
  }

  .orbiting-particle:nth-child(1) { animation-delay: 0s; }
  .orbiting-particle:nth-child(2) { animation-delay: -2s; }
  .orbiting-particle:nth-child(3) { animation-delay: -4s; }

  .interactive-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(34, 211, 238, 0.1),
      transparent 40%
    );
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 1;
    border-radius: inherit;
  }
`;

const ProjectCard = ({
    title,
    description,
    tags,
    link,
    githubLink,
    image,
    darkMode = true,
}) => {
    const [ref, inView] = useInView();
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    // Inject styles
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.textContent = projectCardStyles;
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

    return (
        <div
            ref={(node) => {
                ref(node);
                cardRef.current = node;
            }}
            role="article"
            aria-label={`Project card: ${title}`}
            className={`project-card-3d group relative h-[260px] sm:h-[280px] md:h-[300px] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`card-container rounded-2xl overflow-hidden border shadow-md transition-all duration-700 ease-in-out transform h-full ${
                    darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                } hover:shadow-2xl`}
            >
                {/* Card Glow Effect */}
                <div className="card-glow" />
                
                {/* Interactive Glow */}
                <div className="interactive-glow" />
                
                {/* Orbiting Particles */}
                <div className="orbiting-particle" style={{ background: 'radial-gradient(circle, #22d3ee, #3b82f6)' }} />
                <div className="orbiting-particle" style={{ background: 'radial-gradient(circle, #a855f7, #8b5cf6)' }} />
                <div className="orbiting-particle" style={{ background: 'radial-gradient(circle, #22c55e, #16a34a)' }} />

                {/* Image Layer */}
                <div className="relative w-full h-full">
                    {image ? (
                        title === "easyocr-js" ? (
                            <div className="flex flex-col h-full">
                                <img
                                    src={image.split(",")[0]}
                                    alt={`${title} image 1`}
                                    className="image-3d w-full h-1/2 object-cover"
                                />
                                <img
                                    src={image.split(",")[1]}
                                    alt={`${title} image 2`}
                                    className="image-3d w-full h-1/2 object-cover"
                                />
                            </div>
                        ) : (
                            <img
                                src={image}
                                alt={`${title} cover`}
                                className="image-3d w-full h-full object-cover"
                            />
                        )
                    ) : (
                        <div className="image-3d w-full h-full bg-gray-100 flex items-center justify-center">
                            <Code className="h-12 w-12 text-gray-400 group-hover:text-gray-600 transition-colors duration-500" />
                        </div>
                    )}

                    {/* Title Overlay */}
                    <div className="title-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-lg font-semibold text-white drop-shadow-sm truncate">{title}</h3>
                    </div>
                </div>

                {/* Hover Overlay */}
                <div
                    className={`hover-overlay absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 overflow-auto ${
                        isHovered ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    style={{ 
                        scrollbarWidth: "none",
                        transform: `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * 10}deg) rotateY(${(mousePosition.x - 0.5) * 10}deg)`
                    }}
                >
                    <div className="space-y-3 text-white">
                        {/* Description */}
                        <p className="text-sm leading-snug max-h-24 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
                            {description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="tag-3d px-2 py-0.5 bg-white/10 text-white rounded-full text-xs font-medium backdrop-blur-sm hover:bg-white/20 transition"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Links */}
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-2">
                            {githubLink && (
                                <a
                                    href={githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link-3d inline-flex items-center gap-2 text-sm text-white hover:text-gray-300 transition px-2 py-1 rounded"
                                >
                                    <Github className="h-4 w-4" />
                                    GitHub
                                </a>
                            )}
                            {link && (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link-3d inline-flex items-center gap-2 text-sm text-white hover:text-gray-300 transition px-2 py-1 rounded"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
