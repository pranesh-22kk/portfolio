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
import Enhanced3DBackground from "./Components/Enhanced3DBackground";
import projects from "./constants/projects";
import ContactMe from "./Components/ContactMe";
import ContactMe3D from "./Components/ContactMe3D";
import Footer from "./Components/Footer";
import ErrorBoundary from "./Components/ErrorBoundary";
import { throttle, detectPerformanceCapability } from "./utils/performance";

// Optimized loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
        <p className="text-green-400 text-lg">Loading 3D Portfolio...</p>
      </div>
    </div>
  );
}

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // default dark mode enabled
  const [lowPerformanceMode, setLowPerformanceMode] = useState(false);
  const [performanceCapability, setPerformanceCapability] = useState(1);

  // Enhanced performance detection
  useEffect(() => {
    const capability = detectPerformanceCapability();
    setPerformanceCapability(capability);
    setLowPerformanceMode(capability < 0.5);
  }, []);

  // Optimized scroll handler with throttling
  const handleScroll = throttle(() => {
    const sections = ["home", "about", "skills", "projects", "education", "achievements", "contact"];
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= scrollPosition) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

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
      className={`body-wrap m-0 sm:min-h-screen min-h-screen font-sans text-body transition-all duration-500 leading-6 text-base box-border -webkit-font-smoothing:antialiased flex flex-col bg-fixed ${darkMode ? "bg-[#03050e] text-gray-300" : "text-black bg-gray-100"}`}
    >
      {/* Performance Mode Indicator */}
      {lowPerformanceMode && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-500 text-black px-3 py-1 rounded-lg text-sm font-medium">
          Performance Mode
        </div>
      )}

      {/* Enhanced 3D Background based on performance */}
      {!lowPerformanceMode && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Enhanced3DBackground 
              darkMode={darkMode} 
              intensity={performanceCapability}
            />
          </Suspense>
        </ErrorBoundary>
      )}

      <NavBar3D
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Conditional Enhanced 3D Hero Section */}
      {!lowPerformanceMode ? (
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Hero3D darkMode={darkMode} scrollToSection={scrollToSection} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <AnimatedHeroSection darkMode={darkMode} scrollToSection={scrollToSection} />
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