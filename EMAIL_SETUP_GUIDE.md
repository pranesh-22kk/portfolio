# Email Setup Guide for Portfolio Contact Form

## Option 1: EmailJS Setup (Recommended for Frontend-Only Solution)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a free account (allows 200 emails/month)
3. Verify your email address

### Step 2: Add Email Service
1. Go to "Email Services" in your EmailJS dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

Hello Pranesh,

You have received a new message from your portfolio contact form:

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
Reply to: {{reply_to}}
```

4. Save the template and note down your **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key**

### Step 5: Update Configuration
1. Open `/src/config/emailConfig.js`
2. Replace the placeholder values:

```javascript
export const emailConfig = {
  serviceId: 'your_service_id_here',     // From Step 2
  templateId: 'your_template_id_here',   // From Step 3
  publicKey: 'your_public_key_here',     // From Step 4
};
```

### Step 6: Test the Form
1. Start your development server: `npm run dev`
2. Fill out the contact form
3. Check your email for the message
4. Check browser console for any errors

---

## Option 2: Backend API Setup (Advanced)

If you prefer a backend solution, you can:

1. Create a Node.js/Express backend
2. Use Nodemailer for sending emails
3. Deploy to services like Vercel, Netlify Functions, or Railway
4. Update the `sendEmailViaBackend` function in `/src/services/emailService.js`

---

## Testing

### Demo Mode
The current setup works in "demo mode" - it will log form submissions to the console without sending actual emails until EmailJS is configured.

### Production Testing
1. Test with your own email first
2. Try different email providers to ensure compatibility
3. Check spam folders initially
4. Monitor EmailJS dashboard for usage stats

---

## Security Notes

- EmailJS Public Key is safe to expose in frontend code
- Never expose your Private Key in frontend code
- EmailJS automatically prevents spam with built-in rate limiting
- Consider implementing additional client-side validation

---

## Troubleshooting

### Common Issues:
1. **Emails not sending**: Check EmailJS configuration and browser console
2. **Emails in spam**: This is normal initially, gets better over time
3. **Rate limiting**: Free plan has limits, upgrade if needed
4. **CORS errors**: EmailJS handles this automatically

### Support:
- EmailJS Documentation: https://www.emailjs.com/docs/
- Check browser console for detailed error messages
- EmailJS support: Available in their dashboard

---

## Alternative Services

If you prefer other services:
- **Formspree**: Simple form handling
- **Netlify Forms**: If deployed on Netlify
- **Web3Forms**: Another form service
- **Custom backend**: Full control but requires hosting
