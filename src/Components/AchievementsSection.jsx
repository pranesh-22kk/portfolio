import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { 
  Award, 
  Trophy, 
  Star, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Code,
  Filter,
  ChevronDown,
  Github,
  Eye
} from 'lucide-react';
import achievements, { achievementCategories, achievementStats } from '../constants/achievements';

// Keyframe animations
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Styled Components
const AchievementsContainer = styled.section`
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
        ? `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
           radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
        : `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
           radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)`};
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
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
`;

const StatCard = styled(motion.div)`
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
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ darkMode }) =>
      darkMode ? `rgba(168, 85, 247, 0.4)` : `rgba(168, 85, 247, 0.5)`};
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: ${({ darkMode }) =>
    darkMode
      ? `linear-gradient(135deg, #22d3ee, #a855f7)`
      : `linear-gradient(135deg, #0891b2, #7c3aed)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${({ darkMode }) => (darkMode ? '#cbd5e1' : '#64748b')};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 3rem 0;
`;

const FilterButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  background: ${({ active, darkMode }) =>
    active
      ? `linear-gradient(135deg, #3b82f6, #8b5cf6)`
      : darkMode
      ? `rgba(30, 41, 59, 0.8)`
      : `rgba(248, 250, 252, 0.9)`};
  color: ${({ active, darkMode }) =>
    active ? 'white' : darkMode ? '#e2e8f0' : '#374151'};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ active, darkMode }) =>
    active
      ? 'transparent'
      : darkMode
      ? `rgba(59, 130, 246, 0.2)`
      : `rgba(59, 130, 246, 0.3)`};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

const AchievementsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const AchievementCard = styled(motion.div)`
  background: ${({ darkMode }) =>
    darkMode
      ? `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)`
      : `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)`};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ darkMode }) =>
    darkMode ? `rgba(59, 130, 246, 0.2)` : `rgba(59, 130, 246, 0.3)`};
  border-radius: 25px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ darkMode }) =>
      darkMode ? `rgba(168, 85, 247, 0.4)` : `rgba(168, 85, 247, 0.5)`};
    box-shadow: 
      0 15px 30px rgba(168, 85, 247, 0.15),
      0 0 20px rgba(59, 130, 246, 0.08);
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
      rgba(6, 182, 212, 0.1) 270deg,
      transparent 360deg
    );
    animation: rotate 8s linear infinite;
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

const AchievementHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  background: ${({ color }) => `linear-gradient(135deg, ${color})`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  animation: ${pulse} 3s ease-in-out infinite;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const AchievementContent = styled.div`
  flex: 1;
`;

const AchievementTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ darkMode }) => (darkMode ? '#f1f5f9' : '#1e293b')};
  line-height: 1.3;
`;

const AchievementCategory = styled.span`
  display: inline-block;
  background: ${({ darkMode }) =>
    darkMode ? `rgba(59, 130, 246, 0.2)` : `rgba(59, 130, 246, 0.1)`};
  color: ${({ darkMode }) => (darkMode ? '#60a5fa' : '#2563eb')};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AchievementDescription = styled.p`
  color: ${({ darkMode }) => (darkMode ? '#cbd5e1' : '#64748b')};
  line-height: 1.6;
  margin: 1rem 0;
`;

const AchievementMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${({ darkMode }) => (darkMode ? '#94a3b8' : '#64748b')};

  svg {
    width: 16px;
    height: 16px;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const TechTag = styled.span`
  background: ${({ darkMode }) =>
    darkMode ? `rgba(168, 85, 247, 0.2)` : `rgba(168, 85, 247, 0.1)`};
  color: ${({ darkMode }) => (darkMode ? '#c084fc' : '#7c3aed')};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  background: ${({ primary, darkMode }) =>
    primary
      ? `linear-gradient(135deg, #3b82f6, #8b5cf6)`
      : darkMode
      ? `rgba(30, 41, 59, 0.8)`
      : `rgba(248, 250, 252, 0.9)`};
  color: ${({ primary, darkMode }) =>
    primary ? 'white' : darkMode ? '#e2e8f0' : '#374151'};
  border: 1px solid ${({ primary, darkMode }) =>
    primary ? 'transparent' : darkMode ? `rgba(59, 130, 246, 0.2)` : `rgba(59, 130, 246, 0.3)`};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.2);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const AchievementsSection = ({ darkMode = true }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredAchievements = activeFilter === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === activeFilter);

  const getColorFromGradient = (colorString) => {
    if (colorString.includes('orange')) return 'rgba(249, 115, 22, 0.7), rgba(251, 146, 60, 0.7)';
    if (colorString.includes('yellow')) return 'rgba(245, 158, 11, 0.7), rgba(251, 191, 36, 0.7)';
    if (colorString.includes('blue')) return 'rgba(59, 130, 246, 0.7), rgba(147, 197, 253, 0.7)';
    if (colorString.includes('purple')) return 'rgba(168, 85, 247, 0.7), rgba(196, 181, 253, 0.7)';
    if (colorString.includes('green')) return 'rgba(34, 197, 94, 0.7), rgba(134, 239, 172, 0.7)';
    if (colorString.includes('red')) return 'rgba(239, 68, 68, 0.7), rgba(252, 165, 165, 0.7)';
    if (colorString.includes('cyan')) return 'rgba(6, 182, 212, 0.7), rgba(103, 232, 249, 0.7)';
    if (colorString.includes('pink')) return 'rgba(236, 72, 153, 0.7), rgba(251, 207, 232, 0.7)';
    return 'rgba(59, 130, 246, 0.7), rgba(147, 197, 253, 0.7)';
  };

  return (
    <AchievementsContainer ref={ref} darkMode={darkMode} id="achievements">
      <ContentWrapper>
        <Header>
          <Title
            darkMode={darkMode}
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Achievements & Milestones
          </Title>
          <Subtitle
            darkMode={darkMode}
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            A showcase of my professional accomplishments, certifications, and project milestones 
            that demonstrate my commitment to excellence and continuous growth.
          </Subtitle>
        </Header>

        <StatsContainer
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <StatCard darkMode={darkMode} variants={itemVariants}>
            <StatNumber darkMode={darkMode}>{achievementStats.totalAchievements}</StatNumber>
            <StatLabel darkMode={darkMode}>Total Achievements</StatLabel>
          </StatCard>
          <StatCard darkMode={darkMode} variants={itemVariants}>
            <StatNumber darkMode={darkMode}>{achievementStats.certifications}</StatNumber>
            <StatLabel darkMode={darkMode}>Certifications</StatLabel>
          </StatCard>
          <StatCard darkMode={darkMode} variants={itemVariants}>
            <StatNumber darkMode={darkMode}>{achievementStats.competitions}</StatNumber>
            <StatLabel darkMode={darkMode}>Competition Wins</StatLabel>
          </StatCard>
          <StatCard darkMode={darkMode} variants={itemVariants}>
            <StatNumber darkMode={darkMode}>{achievementStats.projects}</StatNumber>
            <StatLabel darkMode={darkMode}>Major Projects</StatLabel>
          </StatCard>
        </StatsContainer>

        <FilterContainer
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {achievementCategories.map((category) => (
            <FilterButton
              key={category.value}
              active={activeFilter === category.value}
              darkMode={darkMode}
              onClick={() => setActiveFilter(category.value)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </FilterButton>
          ))}
        </FilterContainer>

        <AchievementsGrid
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              darkMode={darkMode}
              color={getColorFromGradient(achievement.color)}
              variants={cardVariants}
            >
                <AchievementHeader>
                  <IconContainer color={getColorFromGradient(achievement.color)}>
                    {achievement.icon}
                  </IconContainer>
                  <AchievementContent>
                    <AchievementCategory darkMode={darkMode}>
                      {achievement.category}
                    </AchievementCategory>
                    <AchievementTitle darkMode={darkMode}>
                      {achievement.title}
                    </AchievementTitle>
                  </AchievementContent>
                </AchievementHeader>

                <AchievementDescription darkMode={darkMode}>
                  {achievement.description}
                </AchievementDescription>

                <AchievementMeta>
                  {achievement.date && (
                    <MetaItem darkMode={darkMode}>
                      <Calendar />
                      <span>{achievement.date}</span>
                    </MetaItem>
                  )}
                  {achievement.venue && (
                    <MetaItem darkMode={darkMode}>
                      <MapPin />
                      <span>{achievement.venue}</span>
                    </MetaItem>
                  )}
                  {achievement.company && (
                    <MetaItem darkMode={darkMode}>
                      <Award />
                      <span>{achievement.company}</span>
                    </MetaItem>
                  )}
                  {achievement.institution && (
                    <MetaItem darkMode={darkMode}>
                      <Award />
                      <span>{achievement.institution}</span>
                    </MetaItem>
                  )}
                  {achievement.validity && (
                    <MetaItem darkMode={darkMode}>
                      <Calendar />
                      <span>{achievement.validity}</span>
                    </MetaItem>
                  )}
                </AchievementMeta>

                {achievement.technologies && (
                  <TechStack>
                    {achievement.technologies.map((tech, index) => (
                      <TechTag key={index} darkMode={darkMode}>
                        {tech}
                      </TechTag>
                    ))}
                  </TechStack>
                )}

                <ActionButtons>
                  {achievement.certificateLink && (
                    <ActionButton
                      href={achievement.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      primary
                      darkMode={darkMode}
                    >
                      <Award />
                      View Certificate
                    </ActionButton>
                  )}
                  {achievement.githubLink && (
                    <ActionButton
                      href={achievement.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      darkMode={darkMode}
                    >
                      <Github />
                      View Code
                    </ActionButton>
                  )}
                  {achievement.liveLink && (
                    <ActionButton
                      href={achievement.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      darkMode={darkMode}
                    >
                      <Eye />
                      Live Demo
                    </ActionButton>
                  )}
                </ActionButtons>
              </AchievementCard>
            ))}
          </AchievementsGrid>
      </ContentWrapper>
    </AchievementsContainer>
  );
};

export default AchievementsSection;
