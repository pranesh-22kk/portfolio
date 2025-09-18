import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award,
  Star,
  BookOpen,
  Trophy
} from 'lucide-react';
import educationalCertifications from '../constants/educationalCertifications';

// Keyframe animations
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const orbit = keyframes`
  0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
`;

// Styled Components
const CertificationsContainer = styled.section`
  min-height: 100vh;
  padding: 5rem 2rem;
  background: ${({ darkMode }) =>
    darkMode
      ? `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)`
      : `linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)`};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ darkMode }) =>
      darkMode
        ? `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
           radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
           radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)`
        : `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
           radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)`};
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: ${({ darkMode }) =>
    darkMode
      ? `linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)`
      : `linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #0891b2 100%)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: ${shimmer} 3s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${({ darkMode }) => (darkMode ? '#94a3b8' : '#64748b')};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const CertificationsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CertificationCard = styled(motion.div)`
  background: ${({ darkMode }) =>
    darkMode
      ? `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)`
      : `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)`};
  backdrop-filter: blur(20px);
  border: 2px solid ${({ darkMode }) =>
    darkMode ? `rgba(59, 130, 246, 0.2)` : `rgba(59, 130, 246, 0.3)`};
  border-radius: 25px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ darkMode }) =>
      darkMode ? `rgba(168, 85, 247, 0.4)` : `rgba(168, 85, 247, 0.5)`};
    box-shadow: 
      0 15px 30px rgba(168, 85, 247, 0.2),
      0 0 20px rgba(59, 130, 246, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ color }) => `linear-gradient(90deg, ${color})`};
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(59, 130, 246, 0.1) 90deg,
      rgba(168, 85, 247, 0.1) 180deg,
      rgba(34, 197, 94, 0.1) 270deg,
      transparent 360deg
    );
    animation: rotate 10s linear infinite;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  @keyframes rotate {
    100% { transform: rotate(360deg); }
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const IconContainer = styled.div`
  width: 70px;
  height: 70px;
  background: ${({ color }) => `linear-gradient(135deg, ${color})`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    border-radius: 50%;
    z-index: -1;
    animation: ${orbit} 8s linear infinite;
  }
`;

const CardContent = styled.div`
  flex: 1;
`;

const CertificationType = styled.span`
  display: inline-block;
  background: ${({ darkMode }) =>
    darkMode ? `rgba(59, 130, 246, 0.2)` : `rgba(59, 130, 246, 0.1)`};
  color: ${({ darkMode }) => (darkMode ? '#60a5fa' : '#2563eb')};
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
`;

const CertificationTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ darkMode }) => (darkMode ? '#f1f5f9' : '#1e293b')};
  line-height: 1.3;
`;

const Institution = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ darkMode }) => (darkMode ? '#e2e8f0' : '#374151')};
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ darkMode }) => (darkMode ? '#22d3ee' : '#3b82f6')};
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

  &:hover {
    background: ${({ darkMode }) =>
      darkMode
        ? `rgba(168, 85, 247, 0.15)`
        : `rgba(168, 85, 247, 0.1)`};
    border-color: rgba(168, 85, 247, 0.4);
    transform: translateY(-2px) scale(1.05);
  }

  svg {
    width: 16px;
    height: 16px;
    color: ${({ darkMode }) => (darkMode ? '#22d3ee' : '#3b82f6')};
  }

  span {
    font-size: 0.9rem;
    color: ${({ darkMode }) => (darkMode ? '#cbd5e1' : '#64748b')};
    font-weight: 500;
  }
`;

const Description = styled.p`
  color: ${({ darkMode }) => (darkMode ? '#94a3b8' : '#64748b')};
  line-height: 1.6;
  margin-bottom: 1.5rem;
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
  color: ${({ darkMode }) => (darkMode ? '#cbd5e1' : '#64748b')};
  transition: all 0.4s ease;

  &:hover {
    color: ${({ darkMode }) => (darkMode ? '#22c55e' : '#059669')};
    transform: translateX(10px);
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0, rotateX: -10 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const EducationalCertifications = ({ darkMode = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getColorFromGradient = (colorString) => {
    if (colorString.includes('blue')) return 'rgba(59, 130, 246, 0.7), rgba(147, 197, 253, 0.7)';
    if (colorString.includes('green')) return 'rgba(34, 197, 94, 0.7), rgba(134, 239, 172, 0.7)';
    if (colorString.includes('orange')) return 'rgba(249, 115, 22, 0.7), rgba(251, 146, 60, 0.7)';
    return 'rgba(59, 130, 246, 0.7), rgba(147, 197, 253, 0.7)';
  };

  return (
    <CertificationsContainer ref={ref} darkMode={darkMode} id="education">
      <ContentWrapper>
        <Header>
          <Title
            darkMode={darkMode}
            initial={{ y: -30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Educational Journey
          </Title>
          <Subtitle
            darkMode={darkMode}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            My academic progression from secondary school to pursuing B.Tech in Information Technology
          </Subtitle>
        </Header>

        <CertificationsGrid
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {educationalCertifications.map((cert) => (
            <CertificationCard
              key={cert.id}
              darkMode={darkMode}
              color={getColorFromGradient(cert.color)}
              variants={cardVariants}
            >
              <CardHeader>
                <IconContainer color={getColorFromGradient(cert.color)}>
                  {cert.icon}
                </IconContainer>
                <CardContent>
                  <CertificationType darkMode={darkMode}>
                    {cert.type}
                  </CertificationType>
                  <CertificationTitle darkMode={darkMode}>
                    {cert.title}
                  </CertificationTitle>
                  <Institution darkMode={darkMode}>
                    {cert.institution}
                  </Institution>
                </CardContent>
              </CardHeader>

              <MetaInfo>
                <MetaItem darkMode={darkMode}>
                  <Calendar />
                  <span>{cert.year}</span>
                </MetaItem>
                <MetaItem darkMode={darkMode}>
                  <Award />
                  <span>{cert.grade}</span>
                </MetaItem>
              </MetaInfo>

              <Description darkMode={darkMode}>
                {cert.description}
              </Description>

              {cert.achievements && cert.achievements.length > 0 && (
                <AchievementsList>
                  {cert.achievements.map((achievement, index) => (
                    <Achievement key={index} darkMode={darkMode}>
                      {achievement}
                    </Achievement>
                  ))}
                </AchievementsList>
              )}
            </CertificationCard>
          ))}
        </CertificationsGrid>
      </ContentWrapper>
    </CertificationsContainer>
  );
};

export default EducationalCertifications;
