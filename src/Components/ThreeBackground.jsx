import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Optimized particles background with reduced count
function AnimatedParticles({ count = 150 }) {
  const mesh = useRef();
  const light = useRef();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Generate random positions for particles
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Spread particles in a smaller area for better performance
      positions[i * 3] = (Math.random() - 0.5) * (isMobile ? 10 : 15);
      positions[i * 3 + 1] = (Math.random() - 0.5) * (isMobile ? 10 : 15);
      positions[i * 3 + 2] = (Math.random() - 0.5) * (isMobile ? 10 : 15);
      
      // Random colors
      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.8, 0.8);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, [count, isMobile]);

  // Optimized animation loop with reduced calculations
  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.elapsedTime;
      const updateFrequency = isMobile ? 5 : 3; // Update less frequently on mobile
      
      // Only update every nth frame for better performance
      if (Math.floor(time * 60) % updateFrequency === 0) {
        // Slower, simpler rotation
        mesh.current.rotation.x = Math.sin(time * 0.01) * (isMobile ? 0.02 : 0.05);
        mesh.current.rotation.y = Math.sin(time * 0.015) * (isMobile ? 0.04 : 0.08);
        
        if (!isMobile) {
          // Skip particle animation on mobile for better performance
          const positions = mesh.current.geometry.attributes.position.array;
          for (let i = 0; i < positions.length; i += 24) {
            positions[i + 1] += Math.sin(time + positions[i]) * 0.0002;
          }
          mesh.current.geometry.attributes.position.needsUpdate = true;
        }
      }
    }
    
    if (light.current && !isMobile) {
      light.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2;
      light.current.position.z = Math.cos(state.clock.elapsedTime * 0.1) * 2;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight ref={light} position={[10, 10, 10]} intensity={1} color="#4f46e5" />
      <Points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          size={0.02}
          threshold={0.1}
          color="#ffffff"
          sizeAttenuation={true}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

// Simplified floating shapes
function FloatingShapes() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Slower rotation for better performance
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh position={[-8, 2, -5]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#4f46e5" wireframe opacity={0.3} transparent />
        </mesh>
      </Float>
      
      <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[8, -2, -8]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial color="#22d3ee" wireframe opacity={0.2} transparent />
        </mesh>
      </Float>
    </group>
  );
}

export default function ThreeBackground({ darkMode = true }) {
  // Mobile detection for performance optimization
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 75 : 150; // Reduced particles on mobile
  
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={isMobile ? [1, 1] : [1, 1.2]} // Lower DPR on mobile
        frameloop="demand"
        performance={{ min: isMobile ? 0.1 : 0.3 }} // Lower performance threshold on mobile
        gl={{ 
          powerPreference: "high-performance", 
          antialias: false,
          alpha: true,
          stencil: false,
          depth: false
        }}
      >
        <color attach="background" args={darkMode ? ['#03050e'] : ['#f8fafc']} />
        <AnimatedParticles count={particleCount} />
        {!isMobile && <FloatingShapes />} {/* Skip floating shapes on mobile */}
      </Canvas>
    </div>
  );
}