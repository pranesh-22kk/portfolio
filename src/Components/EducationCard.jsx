import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

// Keyframes for animations
const float3D = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotateX(0deg) rotateZ(0deg); 
  }
  33% { 
    transform: translateY(-15px) rotateX(5deg) rotateZ(2deg); 
  }
  66% { 
    transform: translateY(-8px) rotateX(-3deg) rotateZ(-1deg); 
  }
`;

const morphCard = keyframes`
  0%, 100% { 
    border-radius: 25px;
    transform: perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1);
  }
  25% { 
    border-radius: 35px 15px 35px 15px;
    transform: perspective(1200px) rotateY(3deg) rotateX(2deg) scale(1.02);
  }
  50% { 
    border-radius: 15px 35px 15px 35px;
    transform: perspective(1200px) rotateY(-2deg) rotateX(3deg) scale(1.01);
  }
  75% { 
    border-radius: 30px 20px 30px 20px;
    transform: perspective(1200px) rotateY(2deg) rotateX(-1deg) scale(1.03);
  }
`;

const holographicShine = keyframes`
  0%, 100% { 
    background: linear-gradient(135deg, 
      rgba(34, 211, 238, 0.1) 0%, 
      rgba(59, 130, 246, 0.1) 25%, 
      rgba(168, 85, 247, 0.1) 50%, 
      rgba(34, 197, 94, 0.1) 75%, 
      rgba(245, 158, 11, 0.1) 100%);
    box-shadow: 
      0 0 30px rgba(34, 211, 238, 0.3),
      0 0 60px rgba(59, 130, 246, 0.2),
      inset 0 0 30px rgba(168, 85, 247, 0.1);
  }
  50% { 
    background: linear-gradient(135deg, 
      rgba(245, 158, 11, 0.1) 0%, 
      rgba(34, 197, 94, 0.1) 25%, 
      rgba(168, 85, 247, 0.1) 50%, 
      rgba(59, 130, 246, 0.1) 75%, 
      rgba(34, 211, 238, 0.1) 100%);
    box-shadow: 
      0 0 50px rgba(168, 85, 247, 0.4),
      0 0 80px rgba(34, 197, 94, 0.3),
      inset 0 0 50px rgba(245, 158, 11, 0.2);
  }
`;

const particleOrbit = keyframes`
  0% { 
    transform: rotate(0deg) translateX(80px) rotate(0deg) scale(1); 
    opacity: 0.7;
  }
  50% { 
    transform: rotate(180deg) translateX(80px) rotate(-180deg) scale(1.2); 
    opacity: 1;
  }
  100% { 
    transform: rotate(360deg) translateX(80px) rotate(-360deg) scale(1); 
    opacity: 0.7;
  }
`;

const textGlow = keyframes`
  0%, 100% { 
    text-shadow: 0 0 20px rgba(34, 211, 238, 0.5); 
  }
  50% { 
    text-shadow: 0 0 30px rgba(168, 85, 247, 0.7), 0 0 40px rgba(34, 197, 94, 0.4); 
  }
`;

const slideInCard = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(100px) rotateX(-45deg) scale(0.8); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0) rotateX(0deg) scale(1); 
  }
`;

const iconFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotateZ(0deg); 
  }
  50% { 
    transform: translateY(-10px) rotateZ(180deg); 
  }
`;

// Styled Components
const CardContainer = styled.div`
  position: relative;
  animation: ${slideInCard} 1s ease-out;
  transform-style: preserve-3d;
  perspective: 1200px;
  margin-bottom: 2rem;
  cursor: pointer;
`;

const Card = styled.div`
  background: ${({ darkMode }) =>
    darkMode
      ? `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)`
      : `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)`};
  backdrop-filter: blur(20px);
  border: 2px solid ${({ darkMode }) =>
    darkMode ? `rgba(34, 211, 238, 0.2)` : `rgba(59, 130, 246, 0.3)`};
  border-radius: 25px;
  padding: 2.5rem;
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateZ(30px);
  position: relative;
  overflow: hidden;
  animation: ${holographicShine} 6s ease-in-out infinite;

  &:hover {
    animation: ${morphCard} 3s ease-in-out infinite;
    border-color: ${({ darkMode }) =>
      darkMode ? `rgba(168, 85, 247, 0.6)` : `rgba(168, 85, 247, 0.5)`};
    transform: translateZ(80px) rotateY(10deg) rotateX(5deg) scale(1.05);
    box-shadow: 
      0 25px 50px rgba(168, 85, 247, 0.3),
      0 0 40px rgba(34, 211, 238, 0.2),
      0 0 60px rgba(34, 197, 94, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(34, 211, 238, 0.1) 90deg,
      rgba(168, 85, 247, 0.1) 180deg,
      rgba(34, 197, 94, 0.1) 270deg,
      transparent 360deg
    );
    animation: rotate 8s linear infinite;
    z-index: -1;
  }

  @keyframes rotate {
    100% { transform: rotate(360deg); }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.8s ease;
  }

  &:hover::after {
    left: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: between;
  margin-bottom: 1.5rem;
  transform: translateZ(20px);
  transition: all 0.4s ease;

  &:hover {
    transform: translateZ(40px) scale(1.02);
  }
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  background: ${({ darkMode }) =>
    darkMode
      ? `linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(168, 85, 247, 0.2))`
      : `linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(34, 211, 238, 0.3);
  transition: all 0.5s ease;
  animation: ${float3D} 4s ease-in-out infinite;

  &:hover {
    transform: scale(1.2) rotateY(360deg);
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(34, 197, 94, 0.3));
    border-color: rgba(168, 85, 247, 0.6);
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
  }

  svg {
    width: 28px;
    height: 28px;
    color: ${({ darkMode }) => (darkMode ? "#22d3ee" : "#3b82f6")};
    transition: all 0.3s ease;
    animation: ${iconFloat} 3s ease-in-out infinite;
  }

  &:hover svg {
    color: #a855f7;
    filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.6));
  }
`;

const ContentSection = styled.div`
  flex: 1;
  transform: translateZ(15px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateZ(30px);
  }
`;

const Degree = styled.h3`
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: ${({ darkMode }) =>
    darkMode
      ? `linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #22c55e 100%)`
      : `linear-gradient(135deg, #3b82f6 0%, #7c3aed 50%, #059669 100%)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${textGlow} 4s ease-in-out infinite;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    animation-duration: 2s;
  }

  @media (min-width: 768px) {
    font-size: 1.6rem;
  }
`;

const Institution = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ darkMode }) => (darkMode ? "#e2e8f0" : "#374151")};
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ darkMode }) => (darkMode ? "#22d3ee" : "#3b82f6")};
    transform: translateX(5px);
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ darkMode }) =>
    darkMode
      ? `rgba(34, 211, 238, 0.1)`
      : `rgba(59, 130, 246, 0.05)`};
  border-radius: 20px;
  border: 1px solid rgba(34, 211, 238, 0.2);
  backdrop-filter: blur(5px);
  transition: all 0.4s ease;
  transform: translateZ(10px);

  &:hover {
    background: ${({ darkMode }) =>
      darkMode
        ? `rgba(168, 85, 247, 0.15)`
        : `rgba(168, 85, 247, 0.1)`};
    border-color: rgba(168, 85, 247, 0.4);
    transform: translateZ(20px) scale(1.1);
    box-shadow: 0 5px 15px rgba(168, 85, 247, 0.2);
  }

  svg {
    width: 16px;
    height: 16px;
    color: ${({ darkMode }) => (darkMode ? "#22d3ee" : "#3b82f6")};
    transition: all 0.3s ease;
  }

  &:hover svg {
    color: #a855f7;
    transform: rotateZ(360deg);
  }

  span {
    font-size: 0.9rem;
    color: ${({ darkMode }) => (darkMode ? "#cbd5e1" : "#64748b")};
    font-weight: 500;
    transition: all 0.3s ease;
  }

  &:hover span {
    color: ${({ darkMode }) => (darkMode ? "#f1f5f9" : "#1e293b")};
  }
`;

const Description = styled.p`
  color: ${({ darkMode }) => (darkMode ? "#94a3b8" : "#64748b")};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  transform: translateZ(10px);
  transition: all 0.3s ease;

  &:hover {
    color: ${({ darkMode }) => (darkMode ? "#e2e8f0" : "#374151")};
    transform: translateZ(20px) scale(1.02);
  }
`;

const AchievementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Achievement = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: ${({ darkMode }) => (darkMode ? "#cbd5e1" : "#64748b")};
  transition: all 0.4s ease;
  transform: translateZ(5px);

  &:hover {
    color: ${({ darkMode }) => (darkMode ? "#22c55e" : "#059669")};
    transform: translateZ(15px) translateX(10px);
  }

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
  }

  &:hover::before {
    transform: scale(1.5);
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.8);
  }
`;

const OrbitingParticle = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background: ${({ color }) => color};
  border-radius: 50%;
  animation: ${particleOrbit} ${({ duration }) => duration}s linear infinite;
  pointer-events: none;
  filter: blur(1px);
  z-index: 10;

  &:nth-child(1) { animation-delay: 0s; }
  &:nth-child(2) { animation-delay: -2s; }
  &:nth-child(3) { animation-delay: -4s; }
`;

const EducationCard = ({ 
  degree, 
  institution, 
  duration, 
  location, 
  gpa, 
  description, 
  achievements = [],
  darkMode = true 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const card = cardRef.current;
    if (card && isHovered) {
      card.addEventListener('mousemove', handleMouseMove);
      return () => card.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isHovered]);

  return (
    <CardContainer>
      <Card
        ref={cardRef}
        darkMode={darkMode}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered 
            ? `perspective(1200px) rotateX(${(mousePosition.y - 0.5) * 20}deg) rotateY(${(mousePosition.x - 0.5) * 20}deg) translateZ(50px)`
            : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
        }}
      >
        {/* Orbiting Particles */}
        <OrbitingParticle 
          color="radial-gradient(circle, #22d3ee, #3b82f6)" 
          duration={8}
        />
        <OrbitingParticle 
          color="radial-gradient(circle, #a855f7, #8b5cf6)" 
          duration={10}
        />
        <OrbitingParticle 
          color="radial-gradient(circle, #22c55e, #16a34a)" 
          duration={12}
        />

        <Header>
          <IconContainer darkMode={darkMode}>
            <GraduationCap />
          </IconContainer>
          <ContentSection>
            <Degree darkMode={darkMode}>{degree}</Degree>
            <Institution darkMode={darkMode}>{institution}</Institution>
          </ContentSection>
        </Header>

        <MetaInfo>
          {duration && (
            <MetaItem darkMode={darkMode}>
              <Calendar />
              <span>{duration}</span>
            </MetaItem>
          )}
          {location && (
            <MetaItem darkMode={darkMode}>
              <MapPin />
              <span>{location}</span>
            </MetaItem>
          )}
          {gpa && (
            <MetaItem darkMode={darkMode}>
              <Award />
              <span>GPA: {gpa}</span>
            </MetaItem>
          )}
        </MetaInfo>

        {description && (
          <Description darkMode={darkMode}>
            {description}
          </Description>
        )}

        {achievements.length > 0 && (
          <AchievementsList>
            {achievements.map((achievement, index) => (
              <Achievement key={index} darkMode={darkMode}>
                {achievement}
              </Achievement>
            ))}
          </AchievementsList>
        )}
      </Card>
    </CardContainer>
  );
};

export default EducationCard;