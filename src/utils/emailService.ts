// Email service utility
// Integrated EmailJS with given template
import { logger } from './logger';

interface EmailData {
  name: string;
  email: string;
  company: string;
  message: string;
  conversationSummary?: string;
  title?: string; // For template "title" field, if needed
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  const serviceId = 'service_j2co12v'; // Provided Service ID
  const templateId = 'template_hzhlmro'; // Provided Template ID
  const publicKey = 'w3gv7myAnA6gv2V9L'; // Provided Public Key

  // EmailJS template parameters - variable names must match template exactly
  // Template uses: {{name}}, {{email}}, {{title}}, {{message}}
  const templateParams = {
    name: data.name || 'Portfolio Visitor',
    email: data.email,
    title: data.title || 'Portfolio Contact Form Inquiry',
    message: data.message,
    // Additional fields if your template uses them
    company: data.company || 'Not provided',
    conversation: data.conversationSummary || 'N/A',
    to_email: 'Jagathcharan2004@gmail.com',
  };

  try {
    // Using EmailJS as primary email sender
    const emailjs = (await import('@emailjs/browser')).default;

    console.log('Sending email with template params:', templateParams);
    console.log('User message being sent:', templateParams.message);
    console.log('Message length:', templateParams.message.length);
    
    // Log email attempt with detailed message info
    logger.log('info', { 
      templateParams, 
      serviceId, 
      templateId,
      emailData: data,
      messagePreview: templateParams.message.substring(0, 100) + (templateParams.message.length > 100 ? '...' : ''),
      messageLength: templateParams.message.length
    }, 'pending', `Attempting to send email - Message: "${templateParams.message.substring(0, 50)}${templateParams.message.length > 50 ? '...' : ''}"`);

    await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    console.log('Email sent successfully via EmailJS');
    logger.log('info', { templateParams }, 'success', 'EmailJS send() completed successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    // Log more details for debugging
    const errorDetails = error instanceof Error 
      ? { message: error.message, stack: error.stack, name: error.name }
      : { error: String(error) };
    
    logger.log('email_error', { templateParams, error: errorDetails }, 'error', 
      `EmailJS error: ${error instanceof Error ? error.message : String(error)}`);
    
    return false;
  }
};

// For future: Backend API integration
export const sendEmailViaAPI = async (data: EmailData): Promise<boolean> => {
  try {
    // Replace with your backend API endpoint
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending email via API:', error);
    return false;
  }
};
