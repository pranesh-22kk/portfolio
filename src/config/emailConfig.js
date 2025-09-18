// Email service configuration for contact form
// Updated with your actual EmailJS credentials

export const emailConfig = {
  serviceId: 'service_n5phko9', // Your EmailJS Service ID
  templateId: 'template_kz1n8kv', // Your EmailJS Template ID  
  publicKey: 'l8chw_S79QQss5wSj', // Your EmailJS Public Key
};

// For testing purposes, you can use these sample values:
// After setting up EmailJS, replace the values above with your actual credentials

export const emailTemplate = {
  from_name: '{{from_name}}',
  from_email: '{{from_email}}',
  to_name: 'Pranesh K',
  to_email: 'kpranesh2004@gmail.com',
  message: '{{message}}',
  reply_to: '{{from_email}}',
};

// Quick Setup Instructions:
/*
1. Go to https://www.emailjs.com/ and create a free account
2. Add Gmail as your email service
3. Create a template with the content above
4. Get your Service ID, Template ID, and Public Key
5. Replace the values in emailConfig above
6. Your contact form will then send real emails!
*/
