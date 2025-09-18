/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Moon, Sun, User } from 'lucide-react';

// 3D Navigation Item
function NavItem3D({ section, activeSection, scrollToSection, darkMode, isMobile = false }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const isActive = activeSection === section.id;
  
  return (
    <motion.button
      className={`relative px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
        isActive
          ? darkMode
            ? 'text-blue-400'
            : 'text-blue-600'
          : darkMode
            ? 'text-gray-300 hover:text-white'
            : 'text-gray-700 hover:text-gray-900'
      } ${isMobile ? 'w-full text-left py-3' : ''}`}
      onClick={() => scrollToSection(section.id)}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      whileHover={!isMobile ? { 
        scale: 1.05,
        rotateY: 5,
        z: 10
      } : {}}
      whileTap={{ scale: 0.95 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Background glow */}
      <motion.div
        className={`absolute inset-0 rounded-lg ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
            : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isActive || isHovered ? 1 : 0,
          scale: isActive || isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Text */}
      <motion.span
        className="relative z-10"
        style={{
          transform: isHovered ? 'translateZ(10px)' : 'translateZ(0px)',
          transition: 'transform 0.3s ease',
        }}
      >
        {section.name}
      </motion.span>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-500 rounded-full"
          layoutId="activeIndicator"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ transform: 'translateX(-50%)' }}
        />
      )}
      
      {/* Hover particles */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                initial={{ 
                  opacity: 0,
                  x: '50%',
                  y: '50%',
                  scale: 0
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Enhanced 3D Navigation Bar
export default function NavBar3D({
  activeSection,
  scrollToSection,
  isMenuOpen,
  setIsMenuOpen,
  darkMode,
  setDarkMode
}) {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'skills', name: 'Skills' },
    { id: 'education', name: 'Education' },
    { id: 'work', name: 'Projects' },
    { id: 'contact', name: 'Contact' },
  ];

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? darkMode
              ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-700'
              : 'bg-white/90 backdrop-blur-md border-b border-gray-200'
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 w-full min-w-0">
            {/* Logo */}
            <motion.div
              className="flex items-center flex-shrink-0"
              whileHover={!isMobile ? { scale: 1.05, rotateY: 10 } : {}}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="flex items-center gap-2 sm:gap-3"
                whileHover={!isMobile ? { scale: 1.1 } : {}}
              >
                {/* Person Icon */}
                <motion.div
                  className={`p-1.5 sm:p-2 rounded-full ${
                    darkMode ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                  } text-white`}
                  whileHover={!isMobile ? { 
                    rotate: 360,
                    scale: 1.2,
                    boxShadow: '0 0 20px rgba(79, 70, 229, 0.5)'
                  } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <User size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </motion.div>
                
                {/* Name - Responsive sizing */}
                <motion.h1
                  className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  } whitespace-nowrap`}
                  style={{
                    background: 'linear-gradient(45deg, #4f46e5, #22d3ee)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Pranesh
                </motion.h1>
              </motion.div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {sections.map((section) => (
                <NavItem3D
                  key={section.id}
                  section={section}
                  activeSection={activeSection}
                  scrollToSection={scrollToSection}
                  darkMode={darkMode}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 180,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }}
                whileTap={{ scale: 0.9 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotateY: -180, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun size={16} className="sm:w-5 sm:h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotateY: -180, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon size={16} className="sm:w-5 sm:h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Download Resume */}
              <motion.a
                href="/22ITR078_Resume_final.pdf"
                download
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm sm:text-base"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  boxShadow: '0 15px 30px rgba(79, 70, 229, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Download size={14} className="sm:w-4 sm:h-4" />
                <span>Resume</span>
              </motion.a>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-1.5 sm:p-2 rounded-lg ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
                whileHover={{ scale: 1.1, rotateY: 10 }}
                whileTap={{ scale: 0.9 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotateZ: -90, opacity: 0 }}
                      animate={{ rotateZ: 0, opacity: 1 }}
                      exit={{ rotateZ: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotateZ: 90, opacity: 0 }}
                      animate={{ rotateZ: 0, opacity: 1 }}
                      exit={{ rotateZ: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`fixed inset-0 z-40 md:hidden ${
              darkMode ? 'bg-gray-900/95' : 'bg-white/95'
            } backdrop-blur-lg`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center justify-center h-full space-y-6 px-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full max-w-xs"
                >
                  <NavItem3D
                    section={section}
                    activeSection={activeSection}
                    scrollToSection={(id) => {
                      scrollToSection(id);
                      setIsMenuOpen(false); // Close menu after selection
                    }}
                    darkMode={darkMode}
                    isMobile={true}
                  />
                </motion.div>
              ))}
              
              {/* Mobile Resume Button */}
              <motion.a
                href="/22ITR078_Resume_final.pdf"
                download
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium mt-8 w-full max-w-xs text-base"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 15px 30px rgba(79, 70, 229, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={20} />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
        style={{
          scaleX: scrolled ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
