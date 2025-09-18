import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  CircleArrowRight,
} from "lucide-react";

// CSS-in-JS for advanced 3D animations
const footerStyles = `
  @keyframes float3D {
    0%, 100% { 
      transform: translateY(0px) rotateX(0deg) rotateZ(0deg); 
    }
    33% { 
      transform: translateY(-10px) rotateX(3deg) rotateZ(1deg); 
    }
    66% { 
      transform: translateY(-5px) rotateX(-2deg) rotateZ(-0.5deg); 
    }
  }

  @keyframes morphBackground {
    0%, 100% { 
      background: linear-gradient(135deg, #03050e 0%, #0f172a 50%, #1e293b 100%);
      border-radius: 0px;
    }
    25% { 
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
      border-radius: 30px 0px 30px 0px;
    }
    50% { 
      background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
      border-radius: 0px 30px 0px 30px;
    }
    75% { 
      background: linear-gradient(135deg, #334155 0%, #475569 50%, #1e293b 100%);
      border-radius: 20px 10px 20px 10px;
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

  @keyframes iconOrbit {
    0% { 
      transform: rotate(0deg) translateX(20px) rotate(0deg) scale(1); 
    }
    100% { 
      transform: rotate(360deg) translateX(20px) rotate(-360deg) scale(1.1); 
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

  @keyframes slideInUp {
    0% { 
      opacity: 0; 
      transform: translateY(50px) rotateX(-20deg) scale(0.95); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0) rotateX(0deg) scale(1); 
    }
  }

  @keyframes particleFloat {
    0%, 100% { 
      transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); 
      opacity: 0.6; 
    }
    25% { 
      transform: translateY(-20px) translateX(10px) scale(1.2) rotate(90deg); 
      opacity: 1; 
    }
    50% { 
      transform: translateY(-10px) translateX(-15px) scale(0.8) rotate(180deg); 
      opacity: 0.4; 
    }
    75% { 
      transform: translateY(-25px) translateX(5px) scale(1.1) rotate(270deg); 
      opacity: 0.8; 
    }
  }

  .footer-3d {
    perspective: 1500px;
    transform-style: preserve-3d;
    position: relative;
    overflow: hidden;
  }

  .footer-content {
    transform: translateZ(30px);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .footer-3d:hover .footer-content {
    transform: translateZ(50px) rotateX(2deg);
  }

  .section-3d {
    transform: translateZ(20px);
    transition: all 0.4s ease;
    animation: slideInUp 1s ease-out;
  }

  .section-3d:hover {
    transform: translateZ(40px) scale(1.02);
  }

  .floating-element {
    animation: float3D 6s ease-in-out infinite;
  }

  .morph-bg {
    animation: morphBackground 8s ease-in-out infinite;
  }

  .glow-element {
    animation: glowPulse 4s ease-in-out infinite;
  }

  .icon-orbit {
    position: relative;
  }

  .icon-orbit::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, #22d3ee, #3b82f6);
    border-radius: 50%;
    animation: iconOrbit 3s linear infinite;
    top: 50%;
    left: 50%;
    transform-origin: center;
  }

  .text-glow {
    animation: textGlow 4s ease-in-out infinite;
  }

  .interactive-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(34, 211, 238, 0.1),
      transparent 40%
    );
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  .floating-particle {
    position: absolute;
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, #22d3ee, transparent);
    border-radius: 50%;
    animation: particleFloat 5s ease-in-out infinite;
    pointer-events: none;
    z-index: 2;
  }

  .button-3d {
    transform: translateZ(15px);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
  }

  .button-3d:hover {
    transform: translateZ(30px) rotateY(5deg) scale(1.05);
    box-shadow: 0 10px 25px rgba(34, 211, 238, 0.3);
  }

  .button-3d::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  .button-3d:hover::before {
    left: 100%;
  }

  .social-icon {
    transform: translateZ(20px);
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
  }

  .social-icon:hover {
    transform: translateZ(40px) rotateY(15deg) rotateX(5deg) scale(1.2);
    box-shadow: 0 15px 30px rgba(168, 85, 247, 0.4);
  }
`;

function Footer({ darkMode, scrollToSection }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const footerRef = useRef(null);

  // Inject styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = footerStyles;
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
      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 4,
          delay: Math.random() * 5,
          color: ['#22d3ee', '#a855f7', '#22c55e', '#f59e0b'][Math.floor(Math.random() * 4)],
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
        
        footerRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
        footerRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
      }
    };

    const footer = footerRef.current;
    if (footer) {
      footer.addEventListener('mousemove', handleMouseMove);
      return () => footer.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`footer-3d pt-12 pb-7 border-t transition-all duration-500 ${
        darkMode
          ? "morph-bg border-gray-800 text-gray-400"
          : "bg-gray-900 border-gray-700 text-gray-300"
      }`}
      style={{
        transform: `perspective(1500px) rotateX(${(mousePosition.y - 0.5) * 3}deg) rotateY(${(mousePosition.x - 0.5) * 3}deg)`,
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
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color}, transparent)`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="footer-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Left Section: About */}
          <div className="section-3d floating-element space-y-4">
            <h3 className="text-2xl font-bold text-white text-glow">Pranesh</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Thanks for exploring my portfolio! I'm passionate about crafting modern, scalable web applications.
            </p>
            <p className="text-gray-400 text-sm">
              Let's connect on social platforms to collaborate, innovate, and grow together.
            </p>
            <p className="text-gray-200 font-semibold text-sm glow-element">
              🚀 Keep Building. Keep Evolving.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://github.com/pranesh-22kk"
                className="social-icon icon-orbit w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-sm border border-gray-700 hover:bg-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-gray-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/pranesh-k-662567259/"
                className="social-icon icon-orbit w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-sm border border-gray-700 hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-gray-300" />
              </a>
            </div>
          </div>

          {/* Middle Section: Quick Links */}
          <div className="section-3d floating-element space-y-4" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-white text-glow">Quick Links</h3>
            <ul className="gap-y-4 text-sm grid grid-cols-3">
              {["home", "about", "skills", "education", "achievements", "work", "contact"].map(
                (section, index) => (
                  <li key={section}>
                    <button
                      onClick={() => scrollToSection(section)}
                      className="button-3d text-gray-400 flex flex-row gap-2 hover:text-white transition-colors capitalize p-2 rounded-lg"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CircleArrowRight className="icon-orbit" />
                      {section}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Right Section: Contact Info */}
          <div className="section-3d floating-element space-y-4" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl font-bold text-white text-glow">Contact Info</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center justify-center md:justify-start space-x-2 button-3d p-2 rounded-lg">
                <Phone className="h-4 w-4 text-gray-300 icon-orbit" />
                <span>+91 6383726393</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 button-3d p-2 rounded-lg">
                <Mail className="h-4 w-4 text-gray-300 icon-orbit" />
                <span>kpranesh2004@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 button-3d p-2 rounded-lg">
                <MapPin className="h-4 w-4 text-gray-300 icon-orbit" />
                <span>Erode, TamilNadu, India - 638455</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Credit */}
        <div className="section-3d mt-6 pt-6 border-t border-gray-700 text-center" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-500 text-sm mt-2 glow-element">
            © 2025 Pranesh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

