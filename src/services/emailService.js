import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/emailConfig';

// Initialize EmailJS with your public key
const initEmailJS = () => {
  if (emailConfig.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(emailConfig.publicKey);
  }
};

// Send email function with better error handling
export const sendContactEmail = async (formData) => {
  try {
    // Initialize EmailJS
    initEmailJS();
    
    // Check if EmailJS is properly configured
    if (
      emailConfig.serviceId === 'service_portfolio' || 
      emailConfig.templateId === 'template_contact' || 
      emailConfig.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY'
    ) {
      console.log('📧 EmailJS Setup Required:');
      console.log('1. Go to https://www.emailjs.com/');
      console.log('2. Create account and get your credentials');
      console.log('3. Update /src/config/emailConfig.js');
      console.log('4. Form data received:', formData);
      
      // Return a more informative message
      return {
        success: true,
        message: '✅ Form submitted! Please check the QUICK_EMAIL_SETUP.md guide to enable real email delivery.'
      };
    }

    // Prepare the email parameters with better structure
    const emailParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Pranesh K',
      to_email: 'kpranesh2004@gmail.com',
      reply_to: formData.email,
      // Add timestamp for tracking
      timestamp: new Date().toLocaleString(),
    };

    console.log('Sending email with params:', emailParams);

    // Send the email with additional error handling
    const response = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      emailParams,
      {
        publicKey: emailConfig.publicKey,
        // Add rate limiting protection
        limitRate: {
          throttle: 10000, // 10 seconds between emails
        }
      }
    );

    console.log('Email sent successfully:', response);
    
    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!'
    };
    
  } catch (error) {
    console.error('Detailed email error:', error);
    
    // Handle specific error types
    if (error.text && error.text.includes('403')) {
      return {
        success: false,
        message: 'Gmail authentication error. Please contact me directly at kpranesh2004@gmail.com'
      };
    }
    
    if (error.text && error.text.includes('scope')) {
      return {
        success: false,
        message: 'Email service configuration error. Please contact me directly at kpranesh2004@gmail.com'
      };
    }
    
    return {
      success: false,
      message: 'Message could not be sent. Please email me directly at kpranesh2004@gmail.com'
    };
  }
};

// Alternative method: Send email using fetch to a backend service
export const sendEmailViaBackend = async (formData) => {
  try {
    // This would connect to your own backend API
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        to: 'kpranesh2004@gmail.com'
      }),
    });

    const result = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        message: 'Thank you! Your message has been sent successfully.'
      };
    } else {
      throw new Error(result.message || 'Failed to send email');
    }
    
  } catch (error) {
    console.error('Error sending email via backend:', error);
    
    return {
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.'
    };
  }
};
