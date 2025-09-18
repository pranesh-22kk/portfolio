/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import {
    MapPin,
    Calendar,
    Code,
    Smartphone,
    BookOpen,
    GitFork,
    Database,
    Globe,
    Zap,
    Star,
    Heart,
    Coffee
} from "lucide-react";
import { 
  getAnimationConfig, 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer,
  getViewportAnimation,
  isMobile 
} from "../utils/animationConfig";

// Simple static keyframes for better performance
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const rotate3D = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse3D = keyframes`
  0%, 100% { 
    transform: scale(1); 
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.3); 
  }
  50% { 
    transform: scale(1.02); 
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.6); 
  }
`;

const slideInLeft = keyframes`
  0% { 
    opacity: 0; 
    transform: translateX(-30px); 
  }
  100% { 
    opacity: 1; 
    transform: translateX(0); 
  }
`;

const slideInRight = keyframes`
  0% { 
    opacity: 0; 
    transform: translateX(30px); 
  }
  100% { 
    opacity: 1; 
    transform: translateX(0); 
  }
`;

const morphBg = keyframes`
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
  75% { border-radius: 60% 40% 60% 30% / 40% 50% 60% 30%; }
`;

const AboutContainer = styled.section`
  min-height: 100vh;
  padding: 120px 20px 80px;
  background: ${({ darkMode }) =>
    darkMode
      ? `linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)`
      : `linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%)`};
  position: relative;
  overflow: hidden;
  perspective: 1200px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ darkMode }) =>
      darkMode
        ? `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), 
           radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
        : `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.05) 0%, transparent 50%), 
           radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)`};
    animation: ${morphBg} 20s ease-in-out infinite;
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
`;

const TextSection = styled.div`
  animation: ${slideInLeft} 1s ease-out;
  transform-style: preserve-3d;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: ${({ darkMode }) =>
    darkMode
      ? `linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #22c55e 100%)`
      : `linear-gradient(135deg, #0891b2 0%, #1d4ed8 50%, #059669 100%)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(34, 211, 238, 0.3);
  transform: translateZ(50px);
  transition: all 0.5s ease;

  &:hover {
    transform: translateZ(80px) rotateX(10deg);
    text-shadow: 0 0 50px rgba(34, 211, 238, 0.6);
  }

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: ${({ darkMode }) => (darkMode ? "#e2e8f0" : "#475569")};
  transform: translateZ(30px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateZ(50px) scale(1.02);
    color: ${({ darkMode }) => (darkMode ? "#f1f5f9" : "#334155")};
  }

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SkillCard = styled.div`
  background: ${({ darkMode }) =>
    darkMode
      ? `rgba(15, 23, 42, 0.6)`
      : `rgba(255, 255, 255, 0.7)`};
  backdrop-filter: blur(12px);
  border: 1px solid ${({ darkMode }) =>
    darkMode ? `rgba(34, 211, 238, 0.2)` : `rgba(14, 165, 233, 0.2)`};
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateZ(20px);
  cursor: pointer;

  &:hover {
    transform: translateZ(60px) rotateY(15deg) scale(1.1);
    background: ${({ darkMode }) =>
      darkMode
        ? `rgba(34, 197, 94, 0.1)`
        : `rgba(34, 197, 94, 0.05)`};
    border-color: ${({ darkMode }) =>
      darkMode ? `rgba(34, 197, 94, 0.6)` : `rgba(34, 197, 94, 0.4)`};
    box-shadow: 
      0 20px 40px rgba(34, 197, 94, 0.2),
      0 0 30px rgba(34, 211, 238, 0.3);
  }

  svg {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 1rem;
    color: ${({ darkMode }) => (darkMode ? "#22d3ee" : "#0891b2")};
    transition: all 0.3s ease;
  }

  &:hover svg {
    color: #22c55e;
    animation: ${rotate3D} 2s ease-in-out infinite;
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ darkMode }) => (darkMode ? "#f1f5f9" : "#1e293b")};
    margin: 0;
  }
`;

const VisualSection = styled.div`
  position: relative;
  animation: ${slideInRight} 1s ease-out;
  transform-style: preserve-3d;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Avatar3D = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: ${({ darkMode }) =>
    darkMode
      ? `linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)`
      : `linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)`};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: translateZ(100px);
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  animation: ${pulse3D} 4s ease-in-out infinite;

  &:hover {
    transform: translateZ(150px) rotateY(25deg) rotateX(15deg) scale(1.1);
    animation-play-state: paused;
  }

  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: linear-gradient(135deg, #22d3ee, #3b82f6, #22c55e, #f59e0b);
    z-index: -1;
    animation: ${rotate3D} 10s linear infinite;
  }

  img {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    object-fit: cover;
    transition: all 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
    filter: brightness(1.1) saturate(1.2);
  }
`;

const FloatingIcon = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: ${({ darkMode }) =>
    darkMode
      ? `rgba(34, 197, 94, 0.1)`
      : `rgba(34, 197, 94, 0.05)`};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${float} 3s ease-in-out infinite;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2) rotateZ(180deg);
    background: rgba(34, 197, 94, 0.2);
    box-shadow: 0 0 30px rgba(34, 197, 94, 0.5);
  }

  svg {
    width: 24px;
    height: 24px;
    color: #22c55e;
  }

  &:nth-child(1) {
    top: 10%;
    left: 10%;
    animation-delay: -0.5s;
  }

  &:nth-child(2) {
    top: 20%;
    right: 15%;
    animation-delay: -1s;
  }

  &:nth-child(3) {
    bottom: 25%;
    left: 5%;
    animation-delay: -1.5s;
  }

  &:nth-child(4) {
    bottom: 15%;
    right: 10%;
    animation-delay: -2s;
  }
`;

const StatsSection = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const StatCard = styled.div`
  background: ${({ darkMode }) =>
    darkMode
      ? `rgba(15, 23, 42, 0.8)`
      : `rgba(255, 255, 255, 0.9)`};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ darkMode }) =>
    darkMode ? `rgba(59, 130, 246, 0.2)` : `rgba(59, 130, 246, 0.3)`};
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transform: translateZ(40px);
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;

  &:hover {
    transform: translateZ(80px) rotateX(10deg) scale(1.05);
    border-color: #3b82f6;
    box-shadow: 
      0 25px 50px rgba(59, 130, 246, 0.3),
      0 0 40px rgba(59, 130, 246, 0.2);
  }

  h3 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    color: ${({ darkMode }) => (darkMode ? "#cbd5e1" : "#64748b")};
    font-weight: 500;
    margin: 0;
  }
`;

const AboutSection = ({ darkMode = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const skills = [
    { icon: <Code />, name: "Frontend" },
    { icon: <Database />, name: "Backend" },
    { icon: <Globe />, name: "Full Stack" },
    { icon: <Zap />, name: "Performance" },
  ];

  const stats = [
    { number: "4", label: "Major Projects" },
    { number: "8+", label: "Technologies" },
    { number: "2", label: "Internships" },
    { number: "1", label: "AWS Certification" },
  ];

  return (
    <AboutContainer 
      ref={containerRef} 
      darkMode={darkMode}
      style={{
        transform: `perspective(1200px) rotateX(${(mousePosition.y - 0.5) * 5}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)`
      }}
    >
      <ContentWrapper>
        <TextSection>
          <Title darkMode={darkMode}>About Me</Title>
          <Description darkMode={darkMode}>
            I'm a passionate full-stack developer with a love for creating beautiful, 
            functional web experiences. With expertise in modern technologies and a 
            keen eye for design, I bring ideas to life through code.
          </Description>
          <Description darkMode={darkMode}>
            My journey in web development started with curiosity and has evolved into 
            a career focused on building scalable applications that make a difference. 
            I believe in writing clean, maintainable code and staying up-to-date with 
            the latest industry trends.
          </Description>
          <SkillsGrid>
            {skills.map((skill, index) => (
              <SkillCard key={index} darkMode={darkMode}>
                {skill.icon}
                <h3>{skill.name}</h3>
              </SkillCard>
            ))}
          </SkillsGrid>
        </TextSection>

        <VisualSection>
          <Avatar3D darkMode={darkMode}>
            <img src="/hero.png" alt="Profile" />
          </Avatar3D>
          <FloatingIcon darkMode={darkMode}>
            <Star />
          </FloatingIcon>
          <FloatingIcon darkMode={darkMode}>
            <Heart />
          </FloatingIcon>
          <FloatingIcon darkMode={darkMode}>
            <Coffee />
          </FloatingIcon>
          <FloatingIcon darkMode={darkMode}>
            <Zap />
          </FloatingIcon>
        </VisualSection>

        <StatsSection>
          {stats.map((stat, index) => (
            <StatCard key={index} darkMode={darkMode}>
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </StatCard>
          ))}
        </StatsSection>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default AboutSection;