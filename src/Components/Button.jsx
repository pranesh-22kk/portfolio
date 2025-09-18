import React, { useState, useEffect, useRef } from "react";

// CSS-in-JS for advanced 3D animations
const buttonStyles = `
  @keyframes morphButton {
    0%, 100% { 
      border-radius: 12px;
      transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1);
    }
    25% { 
      border-radius: 20px 8px 20px 8px;
      transform: perspective(1000px) rotateX(2deg) rotateY(1deg) scale(1.02);
    }
    50% { 
      border-radius: 8px 20px 8px 20px;
      transform: perspective(1000px) rotateX(-1deg) rotateY(2deg) scale(1.01);
    }
    75% { 
      border-radius: 16px 4px 16px 4px;
      transform: perspective(1000px) rotateX(1deg) rotateY(-1deg) scale(1.03);
    }
  }

  @keyframes glowPulse {
    0%, 100% { 
      box-shadow: 
        0 0 20px rgba(34, 197, 94, 0.4),
        0 0 40px rgba(34, 197, 94, 0.2),
        inset 0 0 20px rgba(34, 197, 94, 0.1);
    }
    50% { 
      box-shadow: 
        0 0 30px rgba(34, 197, 94, 0.6),
        0 0 60px rgba(34, 197, 94, 0.4),
        inset 0 0 30px rgba(34, 197, 94, 0.2);
    }
  }

  @keyframes rippleEffect {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }

  @keyframes particleTrail {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) scale(0);
      opacity: 0;
    }
  }

  @keyframes iconSpin3D {
    0% { transform: rotateY(0deg) rotateX(0deg); }
    25% { transform: rotateY(90deg) rotateX(15deg); }
    50% { transform: rotateY(180deg) rotateX(0deg); }
    75% { transform: rotateY(270deg) rotateX(-15deg); }
    100% { transform: rotateY(360deg) rotateX(0deg); }
  }

  @keyframes textFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-2px); }
  }

  .button-3d {
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
    perspective: 1000px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .button-3d:hover {
    animation: morphButton 2s ease-in-out infinite;
    transform: perspective(1000px) rotateX(-5deg) rotateY(5deg) translateY(-5px) scale(1.05);
  }

  .button-3d:active {
    transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) translateY(2px) scale(0.98);
  }

  .button-glow {
    animation: glowPulse 3s ease-in-out infinite;
  }

  .button-3d:hover .button-glow {
    animation-duration: 1s;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, #22d3ee, #3b82f6);
    border-radius: 50%;
    animation: particleTrail 1s ease-out forwards;
    pointer-events: none;
  }

  .button-icon {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .button-3d:hover .button-icon {
    animation: iconSpin3D 1s ease-in-out;
  }

  .button-text {
    animation: textFloat 2s ease-in-out infinite;
  }

  .button-3d:hover .button-text {
    animation-duration: 0.8s;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }

  .button-gradient {
    background: linear-gradient(135deg, 
      rgba(34, 197, 94, 0.8) 0%, 
      rgba(59, 130, 246, 0.8) 25%, 
      rgba(168, 85, 247, 0.8) 50%, 
      rgba(245, 158, 11, 0.8) 75%, 
      rgba(239, 68, 68, 0.8) 100%);
    background-size: 400% 400%;
    animation: gradientShift 4s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .button-3d::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  .button-3d:hover::before {
    transform: translateX(100%);
  }

  .button-shadow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: blur(20px);
    opacity: 0.3;
    z-index: -1;
    transform: translateY(10px) scale(0.95);
    transition: all 0.3s ease;
  }

  .button-3d:hover .button-shadow {
    transform: translateY(20px) scale(1.1);
    opacity: 0.5;
  }
`;

const Button = ({ 
  children, 
  onClick, 
  icon: Icon, 
  containerClassName = "", 
  OuterContainerClassName = "",
  disabled = false,
  variant = "default" // "default", "gradient", "glow"
}) => {
  const [ripples, setRipples] = useState([]);
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);

  // Inject styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = buttonStyles;
    document.head.appendChild(styleElement);
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  // Create ripple effect on click
  const createRipple = (event) => {
    if (!buttonRef.current) return;
    
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  // Create particle trail on hover - moved inside useEffect
  useEffect(() => {
    if (!isHovered) return;
    
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 5; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 0.5
        });
      }
      
      setParticles(prev => [...prev, ...newParticles]);
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 1000);
    };

    const interval = setInterval(createParticles, 200);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleClick = (event) => {
    if (disabled) return;
    createRipple(event);
    onClick?.(event);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "button-gradient";
      case "glow":
        return "button-glow";
      default:
        return "";
    }
  };

  return (
    <div className={`relative ${OuterContainerClassName}`}>
      {/* Button shadow */}
      <div className="button-shadow" />
      
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
        className={`
          button-3d
          ${getVariantClasses()}
          relative flex items-center justify-center gap-2 px-6 py-3
          font-medium text-white transition-all duration-300
          transform-gpu will-change-transform
          ${containerClassName}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        style={{
          transform: 'translateZ(0)', // Enable hardware acceleration
        }}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}

        {/* Particle effects */}
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        {/* Icon with 3D animation */}
        {Icon && (
          <Icon 
            className="button-icon w-5 h-5" 
            style={{
              filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
            }}
          />
        )}
        
        {/* Text with floating animation */}
        <span 
          className="button-text relative z-10"
          style={{
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          {children}
        </span>

        {/* Shine effect overlay */}
        <div className="absolute inset-0 rounded-inherit opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700" />
        </div>
      </button>
    </div>
  );
};

export default Button;