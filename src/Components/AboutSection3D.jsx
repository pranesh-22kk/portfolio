/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial, Text, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';

// 3D Avatar Component
function Avatar3D({ isHovered }) {
  const meshRef = useRef();
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={meshRef}>
          {/* Main avatar sphere */}
          <Sphere args={[1.5, 64, 64]}>
            <MeshDistortMaterial
              color="#4f46e5"
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0.1}
              metalness={0.8}
              emissive="#4f46e5"
              emissiveIntensity={isHovered ? 0.3 : 0.1}
            />
          </Sphere>
          
          {/* Inner glow */}
          <Sphere args={[1.3, 32, 32]}>
            <meshStandardMaterial
              color="#22d3ee"
              transparent
              opacity={0.3}
              emissive="#22d3ee"
              emissiveIntensity={0.2}
            />
          </Sphere>
        </group>
      </Float>
      
      {/* Orbiting particles */}
      <group ref={particlesRef}>
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 3;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          
          return (
            <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={2}>
              <Sphere args={[0.1, 16, 16]} position={[x, Math.sin(angle) * 0.5, z]}>
                <meshStandardMaterial 
                  color={`hsl(${200 + i * 20}, 70%, 60%)`}
                  emissive={`hsl(${200 + i * 20}, 70%, 60%)`}
                  emissiveIntensity={0.5}
                />
              </Sphere>
            </Float>
          );
        })}
      </group>
    </group>
  );
}

// 3D Text Component
function Text3DComponent({ text, position = [0, 0, 0], size = 0.5 }) {
  const textRef = useRef();
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
      <Center ref={textRef} position={position}>
        <Text
          fontSize={size}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign={'center'}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
        >
          {text}
          <meshStandardMaterial 
            color="#ffffff" 
            metalness={0.5} 
            roughness={0.2}
            emissive="#4f46e5"
            emissiveIntensity={0.1}
          />
        </Text>
      </Center>
    </Float>
  );
}

// Stats card with 3D effect
function StatCard3D({ number, label, delay = 0, darkMode }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        const increment = number / 50;
        const counter = setInterval(() => {
          setCount(prev => {
            if (prev >= number) {
              clearInterval(counter);
              return number;
            }
            return prev + increment;
          });
        }, 50);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [inView, number, delay]);

  return (
    <motion.div
      ref={ref}
      className={`relative p-6 rounded-xl ${
        darkMode ? 'bg-gray-800/50' : 'bg-white/50'
      } backdrop-blur-sm border ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      } text-center group perspective-1000`}
      whileHover={{ 
        scale: 1.05,
        rotateY: 10,
        z: 20
      }}
      style={{ transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className="relative z-10"
        style={{
          transform: 'translateZ(20px)',
        }}
      >
        <motion.div
          className={`text-3xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
          animate={{ scale: inView ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
        >
          {Math.round(count)}+
        </motion.div>
        <div className={`text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {label}
        </div>
      </motion.div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
    </motion.div>
  );
}

// Main Enhanced About Section
export default function AboutSection3D({ darkMode = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const stats = [
    { number: 4, label: "Major Projects" },
    { number: 8, label: "Technologies" },
    { number: 2, label: "Internships" },
    { number: 1, label: "AWS Certification" }
  ];

  return (
    <section
      id="about"
      ref={ref}
      className={`py-20 transition-all duration-500 ${
        darkMode ? "bg-[#03050e]/90 text-white" : "bg-white/50 text-gray-900"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 flex flex-row justify-center items-center gap-4">
            <img
              src={`https://img.icons8.com/?size=80&id=7819&format=png&color=${
                darkMode ? "ffffff" : "000000"
              }`}
              alt="About"
              className="w-14 h-14"
            />
            About Me
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Passionate full stack developer crafting digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Avatar Section */}
          <motion.div
            className="relative h-96 perspective-1000"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Canvas
              camera={{ position: [0, 0, 8], fov: 50 }}
              style={{ background: 'transparent' }}
              dpr={[1, 1.5]}
              frameloop="demand"
              performance={{ min: 0.5 }}
              gl={{ powerPreference: "high-performance", antialias: false }}
            >
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
              <pointLight position={[-10, -5, 5]} intensity={0.5} color="#22d3ee" />
              
              <Avatar3D isHovered={isHovered} />
            </Canvas>
            
            {/* Floating text elements */}
            <div className="absolute inset-0 pointer-events-none">
              {['React', 'Node.js', 'MongoDB', 'JavaScript'].map((tech, i) => (
                <motion.div
                  key={tech}
                  className={`absolute text-sm font-semibold px-3 py-1 rounded-full ${
                    darkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-900'
                  } backdrop-blur-sm border ${
                    darkMode ? 'border-gray-600' : 'border-gray-200'
                  }`}
                  animate={{
                    x: Math.sin(Date.now() * 0.001 + i) * 30,
                    y: Math.cos(Date.now() * 0.001 + i) * 20,
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${20 + i * 15}%`,
                  }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="space-y-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.h3
                className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                style={{ transform: 'translateZ(20px)' }}
              >
                Hi, I'm Pranesh
              </motion.h3>
              
              <motion.p
                className={`text-lg leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
                style={{ transform: 'translateZ(15px)' }}
              >
                A passionate Full Stack Developer with expertise in modern web technologies. 
                I love creating innovative solutions and bringing ideas to life through code.
              </motion.p>
              
              <motion.p
                className={`text-lg leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
                style={{ transform: 'translateZ(10px)' }}
              >
                Currently pursuing B.Tech in Information Technology at Kongu Engineering College, 
                I'm always eager to learn new technologies and take on challenging projects.
              </motion.p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <StatCard3D
                  key={stat.label}
                  number={stat.number}
                  label={stat.label}
                  delay={index * 0.1}
                  darkMode={darkMode}
                />
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg"
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  boxShadow: '0 20px 40px rgba(79, 70, 229, 0.4)' 
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                Download Resume
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
