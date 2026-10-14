/** Shared contact links and send helpers used across Hero, Contact, and floating actions. */

export const EMAIL = 'Jagathcharan2004@gmail.com';
export const PHONE_DISPLAY = '+91 9198198123';
export const PHONE_TEL = '+919198198123';
/** WhatsApp number in international format, no +. */
export const WHATSAPP_NUMBER = '919198198123';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

/** Opens the user's email app with a prefilled portfolio inquiry. */
export function buildMailto(data: ContactMessage): string {
  const name = data.name.trim() || 'Visitor';
  const email = data.email.trim();
  const message = data.message.trim() || 'Hello Jagath, I found your portfolio and would like to connect.';
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(
    `Hi Jagath,\n\n${message}\n\n—\nName: ${name}\nEmail: ${email || '(not provided)'}\nSource: jagathcharan.github.io/portfolio`
  );
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

/** Opens WhatsApp with a prefilled message ready to send. */
export function buildWhatsAppSendUrl(data: ContactMessage): string {
  const name = data.name.trim() || 'Visitor';
  const email = data.email.trim();
  const message = data.message.trim() || 'Hello Jagath, I found your portfolio and would like to connect.';
  const text = encodeURIComponent(
    `Hi Jagath, I'm ${name}${email ? ` (${email})` : ''}.\n\n${message}\n\n— via portfolio`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function openMailto(data: ContactMessage): void {
  window.location.href = buildMailto(data);
}

export function openWhatsApp(data: ContactMessage): void {
  window.open(buildWhatsAppSendUrl(data), '_blank', 'noopener,noreferrer');
}
