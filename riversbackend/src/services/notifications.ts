import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const businessPhone = process.env.BUSINESS_WHATSAPP_NUMBER;

let twilioClient: twilio.Twilio | null = null;

if (accountSid && authToken) {
  twilioClient = twilio(accountSid, authToken);
}

export async function sendWhatsAppNotification(data: {
  phone: string;
  name: string;
  eventType?: string;
  eventDate?: string;
  guestCount?: string;
  location?: string;
  message?: string;
  subject?: string;
}) {
  if (!twilioClient || !fromNumber || !businessPhone) {
    console.log('WhatsApp notification skipped (not configured)');
    return { success: false, reason: 'Not configured' };
  }

  try {
    const to = `whatsapp:${data.phone}`;
    const body = data.message || `
Hello ${data.name}! 👋

Thank you for contacting Rivers Kitchen.

${data.subject ? `Subject: ${data.subject}` : ''}
${data.eventType ? `Event Type: ${data.eventType}` : ''}
${data.eventDate ? `Event Date: ${data.eventDate}` : ''}
${data.guestCount ? `Guest Count: ${data.guestCount}` : ''}
${data.location ? `Location: ${data.location}` : ''}

We will contact you shortly to discuss your event details.

Best regards,
Rivers Kitchen Team
    `.trim();

    await twilioClient.messages.create({
      to,
      from: fromNumber,
      body,
    });

    return { success: true };
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    return { success: false, error };
  }
}

export async function sendEmailNotification(data: {
  to: string;
  subject: string;
  body: string;
}) {
  console.log(`Email notification to ${data.to}: ${data.subject}`);
  return { success: true };
}
