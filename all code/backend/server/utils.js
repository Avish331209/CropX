import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const cleanMobile = (m = '') => String(m).replace(/\D/g, '').slice(-10);
export const sha = (s) => crypto.createHash('sha256').update(String(s)).digest('hex');
export const nowLabel = () =>
  new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

// Random id like PROD-4821, retried until it is unused.
export async function uniqueId(Model, prefix, digits = 4) {
  for (let i = 0; i < 20; i++) {
    const id = `${prefix}-${Math.floor(10 ** (digits - 1) + Math.random() * 9 * 10 ** (digits - 1))}`;
    if (!(await Model.exists({ id }))) return id;
  }
  return `${prefix}-${Date.now()}`;
}

export const signToken = (user, role) =>
  jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Pick only the allowed keys from an object (stops clients writing fields they shouldn't).
export const pick = (obj = {}, keys = []) =>
  Object.fromEntries(keys.filter((k) => obj[k] !== undefined).map((k) => [k, obj[k]]));

// SMS: demo sender (prints to console). Replace body with Fast2SMS / Twilio / MSG91 to send real SMS.
export const smsLog = [];
export async function sendSms(mobile, message) {
  console.log(`📱 SMS to ${mobile}: ${message}`);
  smsLog.unshift({ mobile, message, time: new Date() });
  smsLog.length = Math.min(smsLog.length, 50);
}

// Never send full Aadhaar / bank number back to the browser.
const mask = (s) => (s ? '•'.repeat(Math.max(0, String(s).length - 4)) + String(s).slice(-4) : s);
export function safeUser(doc) {
  const u = doc.toJSON ? doc.toJSON() : { ...doc };
  delete u.passwordHash;
  if (u.aadhaar) u.aadhaar = mask(u.aadhaar);
  if (u.bank?.number) u.bank = { ...u.bank, number: mask(u.bank.number) };
  return u;
}
