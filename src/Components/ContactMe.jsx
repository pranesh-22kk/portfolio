import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Send, Mail, Phone, MapPin, MessageCircle, User, Sparkles, Star, CheckCircle, AlertCircle } from "lucide-react";
import { sendContactEmail } from "../services/emailService";

// Keyframes for animations
const float3D = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotateX(0deg) rotateZ(0deg); 
  }
  33% { 
    transform: translateY(-20px) rotateX(5deg) rotateZ(2deg); 
  }
  66% { 
    transform: translateY(-10px) rotateX(-3deg) rotateZ(-1deg); 
  }
`;

const morphForm = keyframes`
  0%, 100% { 
    border-radius: 30px;
    transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
  }
  25% { 
    border-radius: 40px 20px 40px 20px;
    transform: perspective(1000px) rotateY(2deg) rotateX(1deg);
  }
  50% { 
    border-radius: 20px 40px 20px 40px;
    transform: perspective(1000px) rotateY(-1deg) rotateX(2deg);
  }
  75% { 
    border-radius: 35px 15px 35px 15px;
    transform: perspective(1000px) rotateY(1deg) rotateX(-1deg);
  }
`;

const glowPulse = keyframes`
  0%, 100% { 
    box-shadow: 
      0 0 30px rgba(34, 197, 94, 0.3),
      0 0 60px rgba(34, 197, 94, 0.1),
      inset 0 0 30px rgba(34, 197, 94, 0.05);
  }
  50% { 
    box-shadow: 
      0 0 50px rgba(34, 197, 94, 0.5),
      0 0 100px rgba(34, 197, 94, 0.2),
      inset 0 0 50px rgba(34, 197, 94, 0.1);
  }
`;

const particleFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); 
    opacity: 0.7; 
  }
  25% { 
    transform: translateY(-30px) translateX(15px) scale(1.2) rotate(90deg); 
    opacity: 1; 
  }
  50% { 
    transform: translateY(-20px) translateX(-20px) scale(0.8) rotate(180deg); 
    opacity: 0.5; 
  }
  75% { 
    transform: translateY(-40px) translateX(10px) scale(1.1) rotate(270deg); 
    opacity: 0.9; 
  }
`;

const slideInUp = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(100px) rotateX(-30deg) scale(0.9); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0) rotateX(0deg) scale(1); 
  }
`;

// Styled Components
const ContactContainer = styled.section`
  min-height: 100vh;
  padding: 120px 20px 80px;
  background: ${({ darkMode }) =>
    darkMode
      ? `linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)`
      : `linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%)`};
  position: relative;
  overflow: hidden;
  perspective: 1500px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ darkMode }) =>
      darkMode
        ? `radial-gradient(circle at 30% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), 
           radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
           radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)`
        : `radial-gradient(circle at 30% 20%, rgba(34, 197, 94, 0.05) 0%, transparent 50%), 
           radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)`};
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1.2fr;
    gap: 100px;
    align-items: start;
  }
`;

const ContactInfo = styled.div`
  animation: ${slideInUp} 1s ease-out;
  transform-style: preserve-3d;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 2rem;
  background: ${({ darkMode }) =>
    darkMode
      ? `linear-gradient(135deg, #22d3ee 0%, #3b82f6 30%, #8b5cf6 60%, #22c55e 100%)`
      : `linear-gradient(135deg, #0891b2 0%, #1d4ed8 30%, #7c3aed 60%, #059669 100%)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(34, 211, 238, 0.3);
  transform: translateZ(60px);
  transition: all 0.5s ease;
  animation: ${float3D} 6s ease-in-out infinite;

  &:hover {
    transform: translateZ(100px) rotateX(10deg) scale(1.02);
    text-shadow: 0 0 60px rgba(34, 211, 238, 0.6);
  }

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  color: ${({ darkMode }) => (darkMode ? "#e2e8f0" : "#475569")};
  transform: translateZ(40px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateZ(60px) scale(1.02);
    color: ${({ darkMode }) => (darkMode ? "#f1f5f9" : "#334155")};
  }

  @media (min-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ContactCard = styled.div`
  background: ${({ darkMode }) =>
    darkMode
      ? `rgba(15, 23, 42, 0.7)`
      : `rgba(255, 255, 255, 0.8)`};
  backdrop-filter: blur(20px);
  border: 2px solid ${({ darkMode }) =>
    darkMode ? `rgba(34, 211, 238, 0.2)` : `rgba(14, 165, 233, 0.3)`};
  border-radius: 25px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateZ(30px);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateZ(80px) rotateY(8deg) rotateX(5deg) scale(1.05);
    background: ${({ darkMode }) =>
      darkMode
        ? `rgba(34, 197, 94, 0.1)`
        : `rgba(34, 197, 94, 0.05)`};
    border-color: ${({ darkMode }) =>
      darkMode ? `rgba(34, 197, 94, 0.6)` : `rgba(34, 197, 94, 0.5)`};
    box-shadow: 
      0 25px 50px rgba(34, 197, 94, 0.3),
      0 0 40px rgba(34, 211, 238, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }

  &:hover::before {
    left: 100%;
  }

  svg {
    width: 2rem;
    height: 2rem;
    margin-bottom: 1rem;
    color: ${({ darkMode }) => (darkMode ? "#22d3ee" : "#0891b2")};
    transition: all 0.4s ease;
    filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.4));
  }

  &:hover svg {
    color: #22c55e;
    transform: rotateY(360deg) scale(1.2);
    filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.6));
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${({ darkMode }) => (darkMode ? "#f1f5f9" : "#1e293b")};
  }

  p {
    color: ${({ darkMode }) => (darkMode ? "#cbd5e1" : "#64748b")};
    margin: 0;
  }
`;

const FormSection = styled.div`
  animation: ${slideInUp} 1s ease-out 0.3s both;
  transform-style: preserve-3d;
`;

const FormContainer = styled.div`
  background: ${({ darkMode }) =>
    darkMode
      ? `rgba(15, 23, 42, 0.8)`
      : `rgba(255, 255, 255, 0.9)`};
  backdrop-filter: blur(25px);
  border: 2px solid ${({ darkMode }) =>
    darkMode ? `rgba(59, 130, 246, 0.2)` : `rgba(59, 130, 246, 0.3)`};
  border-radius: 30px;
  padding: 3rem;
  transform: translateZ(50px);
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  animation: ${glowPulse} 4s ease-in-out infinite;

  &:hover {
    animation: ${morphForm} 3s ease-in-out infinite;
    border-color: #3b82f6;
    box-shadow: 
      0 30px 60px rgba(59, 130, 246, 0.3),
      0 0 50px rgba(59, 130, 246, 0.2);
  }

  @media (min-width: 768px) {
    padding: 4rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
  transform: translateZ(20px);
  transition: all 0.4s ease;

  &:hover {
    transform: translateZ(40px) scale(1.02);
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${({ darkMode }) => (darkMode ? "#e2e8f0" : "#374151")};
  font-size: 1rem;
  transform: translateZ(10px);
  transition: all 0.3s ease;

  &:hover {
    color: ${({ darkMode }) => (darkMode ? "#22d3ee" : "#3b82f6")};
    transform: translateZ(20px) scale(1.05);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid ${({ darkMode }) =>
    darkMode ? `rgba(75, 85, 99, 0.5)` : `rgba(209, 213, 219, 0.7)`};
  border-radius: 15px;
  background: ${({ darkMode }) =>
    darkMode
      ? `rgba(31, 41, 55, 0.7)`
      : `rgba(249, 250, 251, 0.8)`};
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  backdrop-filter: blur(10px);
  transform: translateZ(15px);

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: ${({ darkMode }) =>
      darkMode
        ? `rgba(59, 130, 246, 0.1)`
        : `rgba(59, 130, 246, 0.05)`};
    transform: translateZ(30px) scale(1.02);
    box-shadow: 
      0 10px 25px rgba(59, 130, 246, 0.2),
      0 0 20px rgba(59, 130, 246, 0.3);
  }

  &:hover {
    border-color: ${({ darkMode }) =>
      darkMode ? `rgba(34, 211, 238, 0.6)` : `rgba(34, 211, 238, 0.5)`};
    transform: translateZ(25px);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid ${({ darkMode }) =>
    darkMode ? `rgba(75, 85, 99, 0.5)` : `rgba(209, 213, 219, 0.7)`};
  border-radius: 15px;
  background: ${({ darkMode }) =>
    darkMode
      ? `rgba(31, 41, 55, 0.7)`
      : `rgba(249, 250, 251, 0.8)`};
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  backdrop-filter: blur(10px);
  transform: translateZ(15px);

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: ${({ darkMode }) =>
      darkMode
        ? `rgba(59, 130, 246, 0.1)`
        : `rgba(59, 130, 246, 0.05)`};
    transform: translateZ(30px) scale(1.02);
    box-shadow: 
      0 10px 25px rgba(59, 130, 246, 0.2),
      0 0 20px rgba(59, 130, 246, 0.3);
  }

  &:hover {
    border-color: ${({ darkMode }) =>
      darkMode ? `rgba(34, 211, 238, 0.6)` : `rgba(34, 211, 238, 0.5)`};
    transform: translateZ(25px);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.2rem 2rem;
  background: ${({ isSubmitting }) => 
    isSubmitting 
      ? 'linear-gradient(135deg, #6b7280 0%, #9ca3af 50%, #6b7280 100%)'
      : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #22c55e 100%)'
  };
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: ${({ isSubmitting }) => (isSubmitting ? 'not-allowed' : 'pointer')};
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateZ(25px);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: ${({ isSubmitting }) => (isSubmitting ? 0.7 : 1)};

  &:hover {
    transform: ${({ isSubmitting }) => 
      isSubmitting 
        ? 'translateZ(25px)' 
        : 'translateZ(50px) rotateX(-5deg) scale(1.05)'
    };
    box-shadow: ${({ isSubmitting }) => 
      isSubmitting 
        ? 'none'
        : '0 20px 40px rgba(59, 130, 246, 0.4), 0 0 30px rgba(139, 92, 246, 0.3)'
    };
    background: ${({ isSubmitting }) => 
      isSubmitting 
        ? 'linear-gradient(135deg, #6b7280 0%, #9ca3af 50%, #6b7280 100%)'
        : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #16a34a 100%)'
    };
  }

  &:active {
    transform: ${({ isSubmitting }) => 
      isSubmitting 
        ? 'translateZ(25px)' 
        : 'translateZ(30px) scale(0.98)'
    };
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  &:hover::before {
    left: ${({ isSubmitting }) => (isSubmitting ? '-100%' : '100%')};
  }
`;

const StatusMessage = styled.div`
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  transform: translateZ(20px);
  backdrop-filter: blur(10px);
  
  ${({ status, darkMode }) => {
    if (status === 'success') {
      return `
        background: ${darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)'};
        border: 2px solid rgba(34, 197, 94, 0.3);
        color: ${darkMode ? '#22c55e' : '#16a34a'};
      `;
    } else if (status === 'error') {
      return `
        background: ${darkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)'};
        border: 2px solid rgba(239, 68, 68, 0.3);
        color: ${darkMode ? '#ef4444' : '#dc2626'};
      `;
    }
    return '';
  }}
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }
`;

const FloatingParticle = styled.div`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
  border-radius: 50%;
  animation: ${particleFloat} ${({ duration }) => duration}s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
  filter: blur(1px);
`;

const ContactMe = ({ darkMode = true }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [statusMessage, setStatusMessage] = useState('');
  const containerRef = useRef(null);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          color: `radial-gradient(circle, ${
            ['#22d3ee', '#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b'][Math.floor(Math.random() * 5)]
          }, transparent)`,
          duration: Math.random() * 6 + 4,
          delay: Math.random() * 4,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  // Mouse tracking for 3D effects
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setStatusMessage('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send email using our email service
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage(result.message);
        
        // Clear the form on success
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setStatusMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setStatusMessage('');
      }, 5000);
    }
  };

  const contactData = [
    {
      icon: <Mail />,
      title: "Email",
      info: "kpranesh2004@gmail.com"
    },
    {
      icon: <Phone />,
      title: "Phone",
      info: "+91 6383726393"
    },
    {
      icon: <MapPin />,
      title: "Location",
      info: "India"
    }
  ];

  return (
    <ContactContainer 
      ref={containerRef}
      darkMode={darkMode}
      style={{
        transform: `perspective(1500px) rotateX(${(mousePosition.y - 0.5) * 5}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)`
      }}
    >
      {/* Floating Particles */}
      {particles.map((particle) => (
        <FloatingParticle
          key={particle.id}
          size={particle.size}
          color={particle.color}
          duration={particle.duration}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <ContentWrapper>
        <ContactInfo>
          <Title darkMode={darkMode}>Get In Touch</Title>
          <Description darkMode={darkMode}>
            Ready to bring your ideas to life? Let's collaborate and create something amazing together. 
            I'm always excited to work on new projects and challenges.
          </Description>
          
          {contactData.map((contact, index) => (
            <ContactCard key={index} darkMode={darkMode}>
              {contact.icon}
              <h3>{contact.title}</h3>
              <p>{contact.info}</p>
            </ContactCard>
          ))}
        </ContactInfo>

        <FormSection>
          <FormContainer darkMode={darkMode}>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label darkMode={darkMode} htmlFor="name">
                  <User className="inline w-4 h-4 mr-2" />
                  Name
                </Label>
                <Input
                  darkMode={darkMode}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
              </FormGroup>

              <FormGroup>
                <Label darkMode={darkMode} htmlFor="email">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email
                </Label>
                <Input
                  darkMode={darkMode}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </FormGroup>

              <FormGroup>
                <Label darkMode={darkMode} htmlFor="message">
                  <MessageCircle className="inline w-4 h-4 mr-2" />
                  Message
                </Label>
                <TextArea
                  darkMode={darkMode}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell me about your project..."
                />
              </FormGroup>

              <SubmitButton 
                type="submit" 
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="inline w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="inline w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </SubmitButton>

              {/* Status Message */}
              {submitStatus && (
                <StatusMessage status={submitStatus} darkMode={darkMode}>
                  {submitStatus === 'success' ? (
                    <CheckCircle />
                  ) : (
                    <AlertCircle />
                  )}
                  {statusMessage}
                </StatusMessage>
              )}
            </form>
          </FormContainer>
        </FormSection>
      </ContentWrapper>
    </ContactContainer>
  );
};

export default ContactMe;