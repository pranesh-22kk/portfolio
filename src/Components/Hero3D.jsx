/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Center, Float, MeshDistortMaterial, Sphere, Torus, Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Avatar/Profile representation
function Avatar3D() {
  const meshRef = useRef();
  let lastUpdate = 0;
  
  useFrame((state) => {
    const now = state.clock.elapsedTime;
    if (meshRef.current && now - lastUpdate > 0.016) { // ~60fps throttle
      meshRef.current.rotation.y = Math.sin(now * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.sin(now * 0.3) * 0.1;
      lastUpdate = now;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#4f46e5"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
        
        {/* Orbiting elements */}
        <group>
          <Torus args={[2.5, 0.1, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#22d3ee" transparent opacity={0.6} />
          </Torus>
          <Torus args={[3, 0.05, 16, 32]} rotation={[0, Math.PI / 4, Math.PI / 4]}>
            <meshStandardMaterial color="#22c55e" transparent opacity={0.4} />
          </Torus>
        </group>
      </group>
    </Float>
  );
}

// Animated 3D Text
function AnimatedText3D({ text, position = [0, 0, 0] }) {
  const textRef = useRef();
  let lastUpdate = 0;
  
  useFrame((state) => {
    const now = state.clock.elapsedTime;
    if (textRef.current && now - lastUpdate > 0.033) { // ~30fps throttle
      textRef.current.rotation.y = Math.sin(now * 0.2) * 0.1;
      lastUpdate = now;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <Center ref={textRef} position={position}>
        <Text
          fontSize={0.5}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign={'left'}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
        >
          {text}
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
        </Text>
      </Center>
    </Float>
  );
}

// Code symbols floating around
function FloatingCodeElements() {
  const groupRef = useRef();
  let lastUpdate = 0;
  
  useFrame((state) => {
    const now = state.clock.elapsedTime;
    if (groupRef.current && now - lastUpdate > 0.05) { // ~20fps throttle
      groupRef.current.rotation.y = now * 0.1;
      lastUpdate = now;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={2}>
            <Box args={[0.3, 0.3, 0.3]} position={[x, Math.sin(angle) * 2, z]}>
              <meshStandardMaterial 
                color={`hsl(${i * 45}, 70%, 60%)`} 
                transparent 
                opacity={0.8} 
              />
            </Box>
          </Float>
        );
      })}
    </group>
  );
}

// Main 3D Hero Component
export default function Hero3D({ darkMode = true, scrollToSection }) {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  
  return (
    <div className="relative w-full min-h-screen overflow-hidden" id="home">
      {/* 3D Canvas - Optimized for mobile */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ 
            position: [0, 0, isMobile ? 12 : isTablet ? 10 : 8], 
            fov: isMobile ? 60 : 75 
          }}
          style={{ background: 'transparent' }}
          dpr={isMobile ? [0.5, 1] : [1, 1.5]}
          frameloop={isMobile ? "never" : "demand"}
          performance={{ min: isMobile ? 0.1 : 0.5 }}
          gl={{ 
            powerPreference: isMobile ? "low-power" : "high-performance", 
            antialias: !isMobile,
            alpha: true
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />
          
          {/* Only show complex 3D on desktop */}
          {!isMobile && (
            <>
              <Avatar3D />
              <FloatingCodeElements />
            </>
          )}
          
          {/* Simplified 3D for mobile */}
          {isMobile && (
            <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
              <Sphere args={[1.2, 16, 16]} position={[0, 0, 0]}>
                <meshStandardMaterial 
                  color="#4f46e5" 
                  roughness={0.3}
                  metalness={0.7}
                />
              </Sphere>
            </Float>
          )}
          
          {/* Background elements - simplified for mobile */}
          <Float speed={0.1} rotationIntensity={0.05} floatIntensity={0.2}>
            <Sphere args={[isMobile ? 6 : 8, 16, 16]} position={[0, 0, -15]}>
              <meshStandardMaterial 
                color={darkMode ? "#1a1a2e" : "#e2e8f0"} 
                transparent 
                opacity={isMobile ? 0.05 : 0.1} 
                wireframe 
              />
            </Sphere>
          </Float>
        </Canvas>
      </div>

      {/* 2D Content Overlay - Mobile Responsive */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full"
        >
          <motion.h1 
            className={`hero-heading font-bold leading-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
            whileHover={!isMobile ? { scale: 1.02 } : {}}
            style={{
              background: 'linear-gradient(45deg, #4f46e5, #22d3ee, #22c55e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            PRANESH
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-3 sm:space-y-4"
          >
            <h2 className={`heading-responsive font-semibold ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Full Stack Developer
            </h2>
            <p className={`text-responsive max-w-2xl mx-auto leading-relaxed px-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Creating immersive digital experiences with cutting-edge technologies
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8 px-2 w-full max-w-md sm:max-w-none mx-auto"
          >
            <motion.button
              onClick={() => scrollToSection && scrollToSection('work')}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
            >
              View Projects
            </motion.button>
            <motion.button
              onClick={() => scrollToSection && scrollToSection('contact')}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3 border-2 ${
                darkMode ? 'border-white text-white hover:bg-white hover:text-gray-900' : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
              } rounded-full font-semibold transition-all duration-300 text-sm sm:text-base`}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
