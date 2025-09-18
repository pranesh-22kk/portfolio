// Animation configuration utility for mobile optimization
export const getAnimationConfig = () => {
  const isMobile = window.innerWidth < 768;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Base configuration for different device types
  const baseConfig = {
    // Reduced animations for mobile and accessibility
    reduced: {
      duration: 0.2,
      ease: "easeOut",
      scale: { duration: 0.15 },
      opacity: { duration: 0.1 },
      stagger: 0.02,
      bounce: 0,
      damping: 30,
      stiffness: 300
    },
    // Standard animations for desktop
    standard: {
      duration: 0.4,
      ease: "easeInOut",
      scale: { duration: 0.3 },
      opacity: { duration: 0.2 },
      stagger: 0.05,
      bounce: 0.1,
      damping: 20,
      stiffness: 200
    },
    // Enhanced animations for high-performance devices
    enhanced: {
      duration: 0.6,
      ease: "easeInOut",
      scale: { duration: 0.4 },
      opacity: { duration: 0.3 },
      stagger: 0.08,
      bounce: 0.2,
      damping: 15,
      stiffness: 150
    }
  };

  // Return appropriate config based on device capabilities
  if (prefersReducedMotion) {
    return baseConfig.reduced;
  } else if (isMobile) {
    return baseConfig.reduced;
  } else {
    return baseConfig.standard;
  }
};

// Pre-defined animation variants
export const fadeInUp = (config = getAnimationConfig()) => ({
  initial: { 
    opacity: 0, 
    y: isMobile() ? 20 : 30 
  },
  animate: { 
    opacity: 1, 
    y: 0 
  },
  transition: {
    duration: config.duration,
    ease: config.ease
  }
});

export const fadeInLeft = (config = getAnimationConfig()) => ({
  initial: { 
    opacity: 0, 
    x: isMobile() ? -20 : -30 
  },
  animate: { 
    opacity: 1, 
    x: 0 
  },
  transition: {
    duration: config.duration,
    ease: config.ease
  }
});

export const fadeInRight = (config = getAnimationConfig()) => ({
  initial: { 
    opacity: 0, 
    x: isMobile() ? 20 : 30 
  },
  animate: { 
    opacity: 1, 
    x: 0 
  },
  transition: {
    duration: config.duration,
    ease: config.ease
  }
});

export const scaleIn = (config = getAnimationConfig()) => ({
  initial: { 
    opacity: 0, 
    scale: 0.8 
  },
  animate: { 
    opacity: 1, 
    scale: 1 
  },
  transition: {
    duration: config.scale.duration,
    ease: config.ease
  }
});

export const staggerContainer = (config = getAnimationConfig()) => ({
  animate: {
    transition: {
      staggerChildren: config.stagger,
      delayChildren: 0.1
    }
  }
});

// Hover animations (disabled on mobile)
export const hoverScale = () => {
  if (isMobile()) {
    return {}; // No hover effects on mobile
  }
  
  return {
    whileHover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    whileTap: { 
      scale: 0.95 
    }
  };
};

export const hoverGlow = () => {
  if (isMobile()) {
    return {}; // No hover effects on mobile
  }
  
  return {
    whileHover: {
      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
      transition: { duration: 0.2 }
    }
  };
};

// Spring animations
export const springTransition = (config = getAnimationConfig()) => ({
  type: "spring",
  damping: config.damping,
  stiffness: config.stiffness,
  bounce: config.bounce
});

// Utility functions
export const isMobile = () => window.innerWidth < 768;
export const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;
export const isDesktop = () => window.innerWidth >= 1024;

// Performance monitoring
export const withPerformanceMonitoring = (animation) => {
  const start = performance.now();
  
  return {
    ...animation,
    onAnimationComplete: () => {
      const duration = performance.now() - start;
      if (duration > 16.67) { // More than one frame at 60fps
        console.warn(`Animation took ${duration.toFixed(2)}ms - consider optimization`);
      }
      animation.onAnimationComplete?.();
    }
  };
};

// Viewport-based animations
export const getViewportAnimation = (threshold = 0.1) => {
  const config = getAnimationConfig();
  
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: threshold },
    variants: {
      hidden: { opacity: 0, y: isMobile() ? 20 : 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: config.duration,
          ease: config.ease
        }
      }
    }
  };
};