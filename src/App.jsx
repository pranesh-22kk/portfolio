/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, Suspense } from "react";

import skillsData from "./constants/Skills";
import AnimatedHeroSection from "./Components/AnimatedHeroSection";
import NavBar from "./Components/NavBar";
import NavBar3D from "./Components/NavBar3D";
import SkillCard from "./Components/SkillCard";
import EnhancedSkillCard from "./Components/SkillCard3D";
import ProjectCard from "./Components/ProjectCard";
import ProjectCard3D from "./Components/ProjectCard3D";
import EducationCard from "./Components/EducationCard";
import EducationalCertifications from "./Components/EducationalCertifications";
import AboutSection from "./Components/AboutSection";
import AboutSection3D from "./Components/AboutSection3D";
import AchievementsSection from "./Components/AchievementsSection";
import Hero3D from "./Components/Hero3D";
import ThreeBackground from "./Components/ThreeBackground";
import projects from "./constants/projects";
import ContactMe from "./Components/ContactMe";
import ContactMe3D from "./Components/ContactMe3D";
import Footer from "./Components/Footer";
import ErrorBoundary from "./Components/ErrorBoundary";

// Mobile-friendly loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center space-y-4 px-4">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-blue-500"></div>
        <p className="text-blue-400 text-base sm:text-lg text-center">Loading Portfolio...</p>
        <p className="text-gray-400 text-sm text-center">Optimizing for your device</p>
      </div>
    </div>
  );
}

// Fallback component for mobile devices
function MobileFallback({ darkMode, error }) {
  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
            darkMode ? 'bg-blue-600' : 'bg-blue-500'
          } text-white text-2xl font-bold`}>
            P
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Pranesh Portfolio</h1>
        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {error ? 'Loading issue detected. ' : ''}
          Please switch to desktop for the full 3D experience.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // default dark mode enabled
  const [lowPerformanceMode, setLowPerformanceMode] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Error boundary handler
  useEffect(() => {
    const handleError = (error) => {
      console.error('Portfolio Error:', error);
      setHasError(true);
      setLowPerformanceMode(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Performance detection with mobile-first approach
  useEffect(() => {
    const detectPerformance = () => {
      // Aggressive mobile detection
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                       window.innerWidth < 768 ||
                       window.screen.width < 768 ||
                       ('ontouchstart' in window);
      
      // Force low performance mode on mobile to prevent white screen
      if (isMobile) {
        console.log('Mobile device detected - enabling low performance mode');
        setLowPerformanceMode(true);
        return;
      }

      // Desktop WebGL check
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        console.log('WebGL not supported - enabling low performance mode');
        setLowPerformanceMode(true);
        return;
      }

      // Additional performance checks for desktop
      const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
      const hasSlowConnection = navigator.connection && 
        (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');
      
      if (hasLowMemory || hasSlowConnection) {
        console.log('Low performance detected - enabling low performance mode');
        setLowPerformanceMode(true);
      }
    };

    detectPerformance();
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ["home", "about", "skills", "education", "achievements", "work", "contact"];
          const scrollPosition = window.scrollY + 100;

          for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i]);
            if (element && scrollPosition >= element.offsetTop) {
              setActiveSection(sections[i]);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Enhanced smooth scrolling with offset for navbar
      const navbarHeight = 64; // Adjust based on navbar height
      const elementTop = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementTop,
        behavior: "smooth"
      });
      
      // For even smoother scrolling on mobile
      if (window.innerWidth < 768) {
        // Use requestAnimationFrame for smoother mobile scrolling
        let start = null;
        const startPos = window.pageYOffset;
        const distance = elementTop - startPos;
        const duration = 800; // Slightly longer duration for mobile
        
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          
          // Ease-in-out cubic function for smooth animation
          const easeInOutCubic = progress < 0.5 
            ? 4 * progress * progress * progress 
            : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
          
          window.scrollTo(0, startPos + distance * easeInOutCubic);
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        
        window.requestAnimationFrame(step);
      }
    }
    setIsMenuOpen(false);
  };

  // Early loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Mobile fallback for devices with issues
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                   window.innerWidth < 768;
                   
  if (isMobile && (hasError || lowPerformanceMode)) {
    return <MobileFallback darkMode={darkMode} error={hasError} />;
  }

  return (
    <div
      style={{
        lineHeight: "1.5",
        WebkitTextSizeAdjust: "100%",
        fontFamily: "system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        MozOsxFontSmoothing: "grayscale",
        touchAction: "manipulation",
        backgroundImage: "radial-gradient(#2d2d2d 0.8px, transparent 0), radial-gradient(#373636 0.5px, transparent 0)",
        backgroundPosition: "0 0, 25px 25px",
        backgroundSize: "50px 50px",
      }}
      className={`body-wrap m-0 w-full min-h-screen font-sans text-body transition-all duration-500 leading-6 text-base box-border flex flex-col overflow-x-hidden ${darkMode ? "bg-[#03050e] text-gray-300" : "text-black bg-gray-100"
        }`}
    >
      {/* Performance Mode Indicator */}
      {lowPerformanceMode && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-500 text-black px-3 py-1 rounded-lg text-sm font-medium">
          Performance Mode
        </div>
      )}

      {/* Conditional 3D Background based on performance */}
      {!lowPerformanceMode && (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <ThreeBackground darkMode={darkMode} />
          </Suspense>
        </ErrorBoundary>
      )}

      <ErrorBoundary fallback={
        <nav className={`fixed top-0 left-0 right-0 z-50 ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        } border-b border-gray-200 h-16 flex items-center justify-center`}>
          <div className="text-lg font-bold">Pranesh Portfolio</div>
        </nav>
      }>
        <NavBar3D
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </ErrorBoundary>

      {/* Conditional Enhanced 3D Hero Section */}
      {!lowPerformanceMode ? (
        <ErrorBoundary fallback={
          <div className={`min-h-screen flex items-center justify-center ${
            darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
          }`}>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">PRANESH</h1>
              <h2 className="text-xl mb-4">Full Stack Developer</h2>
              <p className="text-gray-500">Creating digital experiences</p>
            </div>
          </div>
        }>
          <Suspense fallback={<LoadingSpinner />}>
            <Hero3D darkMode={darkMode} scrollToSection={scrollToSection} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <ErrorBoundary fallback={
          <div className={`min-h-screen flex items-center justify-center ${
            darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
          }`}>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">PRANESH</h1>
              <h2 className="text-xl mb-4">Full Stack Developer</h2>
              <p className="text-gray-500">Mobile-optimized version</p>
            </div>
          </div>
        }>
          <AnimatedHeroSection darkMode={darkMode} scrollToSection={scrollToSection} />
        </ErrorBoundary>
      )}

      {/* Conditional Enhanced 3D About Section */}
      {!lowPerformanceMode ? (
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <AboutSection3D darkMode={darkMode} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <AboutSection darkMode={darkMode} />
      )}
      {/* Skills Section */}
      <section
        id="skills"
        className={`py-12 sm:py-20 transition-all duration-500 ${darkMode ? "text-gray-300" : "bg-gray-200/50 text-gray-900"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 flex flex-row justify-center items-center gap-3 sm:gap-4">
              <img
                src={`https://img.icons8.com/?size=64&id=wWh3KNXLFm0y&format=png&color=${darkMode ? "ffffff" : "000000"
                  }`}
                alt="code "
                className="w-10 h-10 sm:w-14 sm:h-14"
              />
              Skills & Technologies
            </h2>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto">
              My toolkit for building modern, scalable, and user-friendly applications
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {skillsData.map((category, index) => (
              !lowPerformanceMode ? (
                <Suspense key={index} fallback={<div className="h-32 bg-gray-800 animate-pulse rounded-lg"></div>}>
                  <EnhancedSkillCard
                    icon={category.icon}
                    title={category.title}
                    skills={category.skills}
                    fallbackIcon={category.icon}
                    isDark={darkMode}
                  />
                </Suspense>
              ) : (
                <SkillCard
                  key={index}
                  icon={category.icon}
                  title={category.title}
                  skills={category.skills}
                  fallbackIcon={category.icon}
                  isDark={darkMode}
                />
              )
            ))}
          </div>
        </div>
      </section>

      {/* Educational Certifications Section */}
      <EducationalCertifications darkMode={darkMode} />

      {/* Achievements Section */}
      <AchievementsSection darkMode={darkMode} />

      {/* Work Section */}
      <section
        id="work"
        className={`py-20 transition-all duration-500 ${darkMode ? "text-gray-300" : "bg-gray-200/50 text-gray-900"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 flex flex-row justify-center items-center gap-4">
              <img
                src={`https://img.icons8.com/?size=80&id=58808&format=png&color=${darkMode ? "ffffff" : "000000"
                  }`}
                alt="Projects "
              />
              Featured Projects
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              A selection of my GitHub projects showcasing my development skills
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              !lowPerformanceMode ? (
                <Suspense key={index} fallback={<div className="h-64 bg-gray-800 animate-pulse rounded-lg"></div>}>
                  <ProjectCard3D
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    githubLink={project.githubLink}
                    liveLink={project.liveLink}
                    image={project.image}
                    darkMode={darkMode}
                  />
                </Suspense>
              ) : (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  githubLink={project.githubLink}
                  liveLink={project.liveLink}
                  image={project.image}
                  darkMode={darkMode}
                />
              )
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {!lowPerformanceMode ? (
        <Suspense fallback={<LoadingSpinner />}>
          <ContactMe3D darkMode={darkMode} />
        </Suspense>
      ) : (
        <ContactMe darkMode={darkMode} />
      )}

      {/* Footer */}
<Footer darkMode={darkMode} scrollToSection={scrollToSection}/>
    </div>
  );
};

export default Portfolio;