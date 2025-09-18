/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Skill Icon
function SkillIcon3D({ isHovered, position = [0, 0, 0] }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.scale.setScalar(isHovered ? 1.2 : 1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={meshRef} position={position}>
        <RoundedBox args={[0.8, 0.8, 0.2]} radius={0.1} smoothness={4}>
          <meshStandardMaterial 
            color="#4f46e5" 
            metalness={0.8}
            roughness={0.2}
            emissive="#4f46e5"
            emissiveIntensity={isHovered ? 0.3 : 0.1}
          />
        </RoundedBox>
      </group>
    </Float>
  );
}

// 3D Skill Card
function SkillCard3D({ isHovered, darkMode, skillCount = 4 }) {
  const groupRef = useRef();
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        isHovered ? 0.2 : 0,
        0.1
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        isHovered ? 0.5 : 0,
        0.1
      );
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Main card */}
        <RoundedBox args={[5, 6, 0.3]} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color={darkMode ? "#1e293b" : "#f8fafc"} 
            metalness={0.1}
            roughness={0.7}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        
        {/* Glow effect */}
        <RoundedBox args={[5.1, 6.1, 0.2]} radius={0.2} smoothness={4} position={[0, 0, -0.1]}>
          <meshStandardMaterial 
            color="#22d3ee" 
            transparent 
            opacity={isHovered ? 0.2 : 0.05}
            emissive="#22d3ee"
            emissiveIntensity={isHovered ? 0.1 : 0.02}
          />
        </RoundedBox>
        
        {/* Skill icons */}
        {[...Array(skillCount)].map((_, i) => {
          const angle = (i / skillCount) * Math.PI * 2;
          const radius = 1.5;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.5;
          
          return (
            <SkillIcon3D 
              key={i} 
              isHovered={isHovered} 
              position={[x, y, 0.3]} 
            />
          );
        })}
      </group>
    </Float>
  );
}

// Enhanced Skill Card Component
export default function EnhancedSkillCard({ 
  icon, 
  title, 
  skills, 
  isDark = true 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      className="relative w-full h-80 perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50, rotateY: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8 }}
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
          <pointLight position={[-10, 5, 5]} intensity={0.4} color="#22d3ee" />
          
          <SkillCard3D 
            isHovered={isHovered} 
            darkMode={isDark} 
            skillCount={skills.length}
          />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <motion.div
        className={`relative z-10 p-6 h-full rounded-xl ${
          isDark ? 'bg-gray-900/80' : 'bg-white/80'
        } backdrop-blur-sm border ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        } transition-all duration-300`}
        style={{
          transform: `rotateY(${mousePosition.x * 0.05}deg) rotateX(${-mousePosition.y * 0.05}deg)`,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: isDark 
            ? '0 25px 50px -12px rgba(79, 70, 229, 0.3)' 
            : '0 25px 50px -12px rgba(79, 70, 229, 0.2)'
        }}
      >
        {/* Category Icon and Title */}
        <motion.div 
          className="flex items-center gap-3 mb-6"
          style={{
            transform: `translateZ(${isHovered ? '20px' : '0px'})`,
            transition: 'transform 0.3s ease',
          }}
        >
          <motion.img
            src={icon}
            alt={title}
            className="w-12 h-12"
            whileHover={{ 
              scale: 1.2, 
              rotateZ: 360,
              filter: 'brightness(1.2) saturate(1.3)'
            }}
            transition={{ duration: 0.6 }}
          />
          <motion.h3
            className={`text-lg font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {title}
          </motion.h3>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-3"
          style={{
            transform: `translateZ(${isHovered ? '15px' : '0px'})`,
            transition: 'transform 0.3s ease',
          }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={`flex items-center gap-2 p-3 rounded-lg ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50' 
                  : 'bg-gray-100/50 hover:bg-gray-200/50'
              } transition-all duration-300 cursor-pointer group`}
              initial={{ opacity: 0, x: -20, rotateY: -45 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 10,
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.img
                src={skill.icon}
                alt={skill.name}
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotateZ: 360 }}
                transition={{ duration: 0.6 }}
              />
              <span className={`text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating skill indicators */}
        <div className="absolute inset-0 pointer-events-none">
          {skills.slice(0, 3).map((skill, i) => (
            <motion.div
              key={`float-${i}`}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-60"
              animate={{
                x: Math.sin(Date.now() * 0.001 + i) * 20,
                y: Math.cos(Date.now() * 0.001 + i) * 15,
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${20 + i * 25}%`,
                top: `${15 + i * 20}%`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
