/* eslint-disable no-unused-vars */

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, RoundedBox, Text, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Star } from 'lucide-react';
import * as THREE from 'three';

// 3D Card Component
function Card3D({ isHovered, darkMode }) {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        isHovered ? 0.3 : 0,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        isHovered ? -0.1 : 0,
        0.1
      );
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        isHovered ? 0.5 : 0,
        0.1
      );
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Main card */}
        <RoundedBox args={[4, 5, 0.2]} radius={0.1} smoothness={4}>
          <meshStandardMaterial 
            color={darkMode ? "#1e293b" : "#f8fafc"} 
            metalness={0.1}
            roughness={0.8}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        
        {/* Glow effect */}
        <RoundedBox args={[4.1, 5.1, 0.1]} radius={0.1} smoothness={4} position={[0, 0, -0.1]}>
          <meshStandardMaterial 
            color="#4f46e5" 
            transparent 
            opacity={isHovered ? 0.3 : 0.1}
            emissive="#4f46e5"
            emissiveIntensity={isHovered ? 0.2 : 0.05}
          />
        </RoundedBox>
        
        {/* Floating elements */}
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Box args={[0.3, 0.3, 0.3]} position={[-1.5, 2, 0.3]}>
            <meshStandardMaterial color="#22d3ee" transparent opacity={0.8} />
          </Box>
        </Float>
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
          <Box args={[0.2, 0.2, 0.2]} position={[1.7, 1.5, 0.4]}>
            <meshStandardMaterial color="#22c55e" transparent opacity={0.6} />
          </Box>
        </Float>
      </group>
    </Float>
  );
}

// Enhanced Project Card with 3D effects
export default function ProjectCard3D({ 
  title, 
  description, 
  tags, 
  githubLink, 
  liveLink, 
  image, 
  darkMode = true 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      className="relative w-full h-96 perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#4f46e5" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#22d3ee" />
          
          <Card3D isHovered={isHovered} darkMode={darkMode} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <motion.div
        className={`relative z-10 p-6 h-full flex flex-col justify-between rounded-xl ${
          darkMode ? 'bg-gray-900/80' : 'bg-white/80'
        } backdrop-blur-sm border ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        } transition-all duration-300`}
        style={{
          transform: `rotateY(${mousePosition.x * 0.1}deg) rotateX(${-mousePosition.y * 0.1}deg)`,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: darkMode 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
            : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Project Image */}
        <motion.div 
          className="mb-4 rounded-lg overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-32 object-cover"
            style={{
              filter: isHovered ? 'brightness(1.1) saturate(1.2)' : 'brightness(1)',
              transition: 'filter 0.3s ease',
            }}
          />
        </motion.div>

        {/* Project Title */}
        <motion.h3
          className={`text-xl font-bold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
          style={{
            transform: `translateZ(${isHovered ? '20px' : '0px'})`,
            transition: 'transform 0.3s ease',
          }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className={`text-sm mb-4 flex-grow ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
          style={{
            transform: `translateZ(${isHovered ? '15px' : '0px'})`,
            transition: 'transform 0.3s ease',
          }}
        >
          {description}
        </motion.p>

        {/* Tags */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-4"
          style={{
            transform: `translateZ(${isHovered ? '10px' : '0px'})`,
            transition: 'transform 0.3s ease',
          }}
        >
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              className={`px-3 py-1 text-xs rounded-full ${
                darkMode
                  ? 'bg-blue-900/50 text-blue-300 border border-blue-700'
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}
              whileHover={{ scale: 1.1, rotateZ: 5 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex gap-3"
          style={{
            transform: `translateZ(${isHovered ? '25px' : '0px'})`,
            transition: 'transform 0.3s ease',
          }}
        >
          {githubLink && (
            <motion.a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
              }`}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 10,
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)' 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} />
              <span className="text-sm">Code</span>
            </motion.a>
          )}
          
          {liveLink && (
            <motion.a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.05, 
                rotateY: -10,
                boxShadow: '0 10px 20px rgba(79, 70, 229, 0.4)' 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              <span className="text-sm">Live</span>
            </motion.a>
          )}
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-40"
            animate={{
              x: Math.random() * 300,
              y: Math.random() * 300,
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
