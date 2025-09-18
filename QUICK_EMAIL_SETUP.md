# Quick EmailJS Setup Guide

## Step 1: Create EmailJS Account (2 minutes)
1. Go to **https://www.emailjs.com/**
2. Click "Sign Up"
3. Use your Gmail account to sign up
4. Verify your email

## Step 2: Add Email Service (1 minute)
1. In EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Select "Gmail"
4. Click "Connect Account" and authorize EmailJS
5. **Copy the Service ID** (looks like: service_xxxxxxx)

## Step 3: Create Email Template (2 minutes)
1. Click "Email Templates"
2. Click "Create New Template"
3. Replace the default content with this:

```
Subject: 📧 New Contact Form Message from {{from_name}}

Hello Pranesh,

You have a new message from your portfolio:

👤 Name: {{from_name}}
📧 Email: {{from_email}}

💬 Message:
{{message}}

---
Sent from your portfolio contact form
Reply directly to this email to respond.
```

4. **Copy the Template ID** (looks like: template_xxxxxxx)

## Step 4: Get Public Key (30 seconds)
1. Click "Account" → "General"
2. **Copy the Public Key** (looks like: xxxxxxxxx)

## Step 5: Update Your Portfolio (1 minute)
Open `/src/config/emailConfig.js` and replace:

```javascript
export const emailConfig = {
  serviceId: 'service_xxxxxxx',      // Paste your Service ID here
  templateId: 'template_xxxxxxx',    // Paste your Template ID here
  publicKey: 'xxxxxxxxx',            // Paste your Public Key here
};
```

## Step 6: Test! 🎉
1. Save the file
2. Refresh your portfolio
3. Fill out the contact form
4. Check your Gmail inbox!

## That's it! Total time: ~5 minutes

Your contact form will now send real emails to kpranesh2004@gmail.com when someone contacts you through your portfolio.

## Need Help?
- EmailJS is free for 200 emails/month
- Check your Gmail spam folder initially
- All configuration is in the frontend - no backend needed!
