// Performance utilities for the portfolio

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const detectPerformanceCapability = () => {
  // Check for WebGL support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) {
    return 'low';
  }

  // Check device characteristics
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
  const hasSlowConnection = navigator.connection && 
    (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');
  
  // Check GPU info
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
  const isIntegratedGPU = renderer.toLowerCase().includes('intel') || renderer.toLowerCase().includes('integrated');
  
  if (isMobile || hasLowMemory || hasSlowConnection || isIntegratedGPU) {
    return 'medium';
  }
  
  return 'high';
};

export const getOptimalParticleCount = (performanceLevel) => {
  switch (performanceLevel) {
    case 'low':
      return 100;
    case 'medium':
      return 300;
    case 'high':
    default:
      return 500;
  }
};

export const getOptimalAnimationSettings = (performanceLevel) => {
  switch (performanceLevel) {
    case 'low':
      return {
        enableParticles: false,
        enable3DTransforms: false,
        animationSpeed: 0.5,
        maxFPS: 30
      };
    case 'medium':
      return {
        enableParticles: true,
        enable3DTransforms: true,
        animationSpeed: 0.7,
        maxFPS: 45
      };
    case 'high':
    default:
      return {
        enableParticles: true,
        enable3DTransforms: true,
        animationSpeed: 1,
        maxFPS: 60
      };
  }
};
