/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial, Box, Torus } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Terminal,
  Send,
  MessageCircle,
  User,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import * as THREE from 'three';
import { sendContactEmail } from '../services/emailService';

// 3D Contact Elements
function ContactElements3D({ isHovered }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 32, 32]}>
          <MeshDistortMaterial
            color="#4f46e5"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            emissive="#4f46e5"
            emissiveIntensity={isHovered ? 0.3 : 0.1}
          />
        </Sphere>
      </Float>
      
      {/* Orbiting contact icons */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 2.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={i} speed={1 + i * 0.3} rotationIntensity={1} floatIntensity={1.5}>
            <Box args={[0.3, 0.3, 0.3]} position={[x, Math.sin(angle) * 0.5, z]}>
              <meshStandardMaterial 
                color={`hsl(${220 + i * 30}, 70%, 60%)`}
                emissive={`hsl(${220 + i * 30}, 70%, 60%)`}
                emissiveIntensity={0.2}
              />
            </Box>
          </Float>
        );
      })}
      
      {/* Ring elements */}
      <Float speed={0.8} rotationIntensity={0.5} floatIntensity={1}>
        <Torus args={[2, 0.1, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#22d3ee" transparent opacity={0.6} />
        </Torus>
      </Float>
    </group>
  );
}

// Contact Form with 3D effects
function ContactForm3D({ darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

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
        setFormData({ name: '', email: '', message: '' });
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`space-y-6 p-8 rounded-2xl ${
        darkMode ? 'bg-gray-900/80' : 'bg-white/80'
      } backdrop-blur-sm border ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      } perspective-1000`}
      initial={{ opacity: 0, rotateY: -30, z: -100 }}
      whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Name Field */}
      <motion.div
        style={{ transform: 'translateZ(20px)' }}
        whileHover={{ scale: 1.02, z: 30 }}
      >
        <label className={`block text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          <User className="inline w-4 h-4 mr-2" />
          Name
        </label>
        <motion.input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 rounded-lg ${
            darkMode 
              ? 'bg-gray-800 text-white border-gray-600 focus:border-blue-500' 
              : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
          } border-2 focus:outline-none transition-all duration-300`}
          whileFocus={{ scale: 1.02, boxShadow: '0 10px 20px rgba(79, 70, 229, 0.2)' }}
          placeholder="Your Name"
        />
      </motion.div>

      {/* Email Field */}
      <motion.div
        style={{ transform: 'translateZ(15px)' }}
        whileHover={{ scale: 1.02, z: 25 }}
      >
        <label className={`block text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          <Mail className="inline w-4 h-4 mr-2" />
          Email
        </label>
        <motion.input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 rounded-lg ${
            darkMode 
              ? 'bg-gray-800 text-white border-gray-600 focus:border-blue-500' 
              : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
          } border-2 focus:outline-none transition-all duration-300`}
          whileFocus={{ scale: 1.02, boxShadow: '0 10px 20px rgba(79, 70, 229, 0.2)' }}
          placeholder="kpranesh2004@gmail.com"
        />
      </motion.div>

      {/* Message Field */}
      <motion.div
        style={{ transform: 'translateZ(10px)' }}
        whileHover={{ scale: 1.02, z: 20 }}
      >
        <label className={`block text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          <MessageCircle className="inline w-4 h-4 mr-2" />
          Message
        </label>
        <motion.textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className={`w-full px-4 py-3 rounded-lg ${
            darkMode 
              ? 'bg-gray-800 text-white border-gray-600 focus:border-blue-500' 
              : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
          } border-2 focus:outline-none resize-none transition-all duration-300`}
          whileFocus={{ scale: 1.02, boxShadow: '0 10px 20px rgba(79, 70, 229, 0.2)' }}
          placeholder="Your message here..."
        />
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'
        }`}
        style={{ transform: 'translateZ(25px)' }}
        whileHover={{ 
          scale: isSubmitting ? 1 : 1.02, 
          rotateY: 5,
          boxShadow: '0 15px 30px rgba(79, 70, 229, 0.4)' 
        }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Sending...
          </>
        ) : (
          <>
            <Send size={20} />
            Send Message
          </>
        )}
      </motion.button>

      {/* Status Message */}
      {submitStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
            submitStatus === 'success'
              ? darkMode
                ? 'bg-green-900/30 border border-green-500/30 text-green-400'
                : 'bg-green-50 border border-green-200 text-green-700'
              : darkMode
                ? 'bg-red-900/30 border border-red-500/30 text-red-400'
                : 'bg-red-50 border border-red-200 text-red-700'
          }`}
          style={{ transform: 'translateZ(20px)' }}
        >
          {submitStatus === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="font-medium">{statusMessage}</span>
        </motion.div>
      )}
    </motion.form>
  );
}

// Contact Info Card
function ContactInfoCard({ icon: Icon, title, content, link, darkMode }) {
  return (
    <motion.div
      className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-900/80' : 'bg-white/80'
      } backdrop-blur-sm border ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      } group cursor-pointer perspective-1000`}
      initial={{ opacity: 0, y: 50, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 10,
        z: 20,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}
      onClick={() => link && window.open(link, '_blank')}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="flex items-center gap-4"
        style={{ transform: 'translateZ(20px)' }}
      >
        <motion.div
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white"
          whileHover={{ rotateZ: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon size={24} />
        </motion.div>
        <div>
          <h4 className={`font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h4>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {content}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Social Links with 3D effects
function SocialLinks3D({ darkMode }) {
  const socialLinks = [
    { 
      icon: Github, 
      label: 'GitHub', 
      url: 'https://github.com/pranesh-22kk',
      color: 'hover:text-gray-600'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/pranesh-k-662567259/',
      color: 'hover:text-blue-600'
    },
    { 
      icon: Terminal, 
      label: 'LeetCode', 
      url: 'https://leetcode.com/u/Pranesh__22/',
      color: 'hover:text-orange-500'
    },
    { 
      icon: Mail, 
      label: 'Email', 
      url: 'mailto:kpranesh2004@gmail.com',
      color: 'hover:text-red-500'
    }
  ];

  return (
    <motion.div
      className="flex justify-center gap-6 mt-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-4 rounded-full ${
            darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
          } transition-all duration-300 ${social.color} group perspective-1000`}
          initial={{ opacity: 0, scale: 0, rotateY: -180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ 
            scale: 1.2, 
            rotateY: 360,
            z: 20,
            boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
          }}
          whileTap={{ scale: 0.9 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <social.icon size={24} />
        </motion.a>
      ))}
    </motion.div>
  );
}

// Main Enhanced Contact Section
export default function ContactMe3D({ darkMode = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'kpranesh2004@gmail.com',
      link: 'mailto:kpranesh2004@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 6383726393',
      link: 'tel:+916383726393'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'India',
      link: null
    }
  ];

  return (
    <section
      id="contact"
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
              src={`https://img.icons8.com/?size=80&id=9730&format=png&color=${
                darkMode ? "ffffff" : "000000"
              }`}
              alt="Contact"
              className="w-14 h-14"
            />
            Get In Touch
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's create something amazing together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 3D Contact Visualization */}
          <motion.div
            className="relative h-96 perspective-1000"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Canvas
              camera={{ position: [0, 0, 6], fov: 50 }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
              <pointLight position={[-10, -5, 5]} intensity={0.5} color="#22d3ee" />
              
              <ContactElements3D isHovered={isHovered} />
            </Canvas>
            
            {/* Contact Info Cards */}
            <div className="absolute bottom-0 left-0 right-0 space-y-4">
              {contactInfo.map((info, index) => (
                <ContactInfoCard
                  key={info.title}
                  icon={info.icon}
                  title={info.title}
                  content={info.content}
                  link={info.link}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ContactForm3D darkMode={darkMode} />
          </motion.div>
        </div>

        {/* Social Links */}
        <SocialLinks3D darkMode={darkMode} />
      </div>
    </section>
  );
}
