import { Router } from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { Farmer, Buyer, Admin, Otp } from '../models/index.js';
import { cleanMobile, sha, uniqueId, signToken, safeUser, sendSms, pick } from '../utils.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
// Slow down guessing: only the OTP / login / register routes are limited (not the whole API).
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.AUTH_RATE_LIMIT || 40),
  standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many attempts. Please wait a few minutes and try again.' },
});
router.use(['/otp', '/farmer/login', '/farmer/register', '/buyer/login', '/buyer/register', '/admin/login'], limiter);

// ---------- OTP ----------
router.post('/otp/send', async (req, res) => {
  const mobile = cleanMobile(req.body.mobile);
  if (mobile.length !== 10) return res.status(400).json({ error: 'Enter a valid 10 digit mobile number' });
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  await Otp.findOneAndUpdate(
    { mobile },
    { codeHash: sha(otp), tries: 0, verified: false, expiresAt: new Date(Date.now() + 5 * 60 * 1000) },
    { upsert: true }
  );
  await sendSms(mobile, `Your AgriLink OTP is ${otp}. Valid for 5 minutes. Do not share it.`);
  // devOtp lets the demo work without an SMS provider. Set SMS_LIVE=true in .env to hide it.
  res.json({ ok: true, devOtp: process.env.SMS_LIVE === 'true' ? undefined : otp });
});

router.post('/otp/verify', async (req, res) => {
  const mobile = cleanMobile(req.body.mobile);
  const rec = await Otp.findOne({ mobile });
  if (!rec || rec.expiresAt < new Date()) return res.status(400).json({ error: 'OTP expired. Please resend.' });
  if (rec.tries >= 5) { await rec.deleteOne(); return res.status(429).json({ error: 'Too many attempts. Resend OTP.' }); }
  if (rec.codeHash !== sha(String(req.body.otp).trim())) {
    rec.tries += 1; await rec.save();
    return res.status(400).json({ error: 'Wrong OTP' });
  }
  // Mark this mobile as verified for 10 minutes; register/login then "consume" it.
  rec.verified = true; rec.expiresAt = new Date(Date.now() + 10 * 60 * 1000); await rec.save();
  res.json({ ok: true });
});

// A mobile must have passed OTP verification recently. Consumed (deleted) on use.
async function consumeVerifiedOtp(mobile) {
  const rec = await Otp.findOneAndDelete({ mobile, verified: true, expiresAt: { $gt: new Date() } });
  return !!rec;
}

// ---------- Farmer & Buyer (mobile + OTP) ----------
const kinds = { farmer: Farmer, buyer: Buyer };
const blocked = { farmer: 'Suspended', buyer: 'Suspended' };

for (const role of Object.keys(kinds)) {
  const Model = kinds[role];

  router.post(`/${role}/login`, async (req, res) => {
    const mobile = cleanMobile(req.body.mobile);
    const user = await Model.findOne({ mobile });
    if (!user) return res.status(404).json({ error: `No ${role} account with this number. Please register first.` });
    if (user.status === blocked[role]) return res.status(403).json({ error: 'This account is suspended. Contact support.' });
    if (!(await consumeVerifiedOtp(mobile))) return res.status(401).json({ error: 'Please verify your mobile number with OTP.' });
    res.json({ token: signToken(user, role), user: safeUser(user) });
  });
}

router.post('/farmer/register', async (req, res) => {
  const d = req.body;
  const mobile = cleanMobile(d.mobile);
  if (!d.name?.trim()) return res.status(400).json({ error: 'Name is required' });
  if (mobile.length !== 10) return res.status(400).json({ error: 'Enter a valid 10 digit mobile number' });
  if (!/^\d{12}$/.test(d.aadhaar || '')) return res.status(400).json({ error: 'Aadhaar number must be 12 digits' });
  if (!/^\d{9,18}$/.test(d.accNumber || '')) return res.status(400).json({ error: 'Enter a valid account number (9-18 digits)' });
  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(d.ifsc || '')) return res.status(400).json({ error: 'Enter a valid IFSC code' });
  if (await Farmer.exists({ mobile })) return res.status(409).json({ error: 'A farmer with this mobile already exists. Please log in.' });
  if (!(await consumeVerifiedOtp(mobile))) return res.status(401).json({ error: 'Please verify your mobile number with OTP.' });

  const farmer = await Farmer.create({
    id: await uniqueId(Farmer, 'FARM', 5), mobile, phone: mobile,
    name: d.name.trim(), address: d.address, aadhaar: d.aadhaar, photo: d.photo,
    location: (d.address || '').split(',').pop().trim(), district: '', state: 'Tamil Nadu',
    farmName: `${d.name.trim()}'s Farm`, mainCategory: 'Vegetables',
    bank: { holder: d.accHolder || d.name, number: d.accNumber, ifsc: d.ifsc.toUpperCase(), name: d.bank },
    joinedDate: new Date().toISOString().slice(0, 10),
  });
  res.status(201).json({ token: signToken(farmer, 'farmer'), user: safeUser(farmer) });
});

router.post('/buyer/register', async (req, res) => {
  const d = req.body;
  const mobile = cleanMobile(d.mobile);
  if (!d.name?.trim()) return res.status(400).json({ error: 'Name is required' });
  if (mobile.length !== 10) return res.status(400).json({ error: 'Enter a valid 10 digit mobile number' });
  if (!/\S+@\S+\.\S+/.test(d.email || '')) return res.status(400).json({ error: 'Enter a valid email' });
  if (await Buyer.exists({ mobile })) return res.status(409).json({ error: 'A buyer with this mobile already exists. Please log in.' });
  if (!(await consumeVerifiedOtp(mobile))) return res.status(401).json({ error: 'Please verify your mobile number with OTP.' });

  const buyer = await Buyer.create({
    id: await uniqueId(Buyer, 'BUYER', 5), mobile, phone: mobile, name: d.name.trim(), email: d.email,
    address: '', city: '', state: 'Tamil Nadu', pincode: '',
    joinedDate: new Date().toISOString().slice(0, 10),
  });
  res.status(201).json({ token: signToken(buyer, 'buyer'), user: safeUser(buyer) });
});

// ---------- Admin (email + password) ----------
router.post('/admin/login', async (req, res) => {
  const admin = await Admin.findOne({ email: String(req.body.email || '').trim().toLowerCase() });
  const ok = admin && (await bcrypt.compare(String(req.body.password || ''), admin.passwordHash));
  if (!ok) return res.status(401).json({ error: 'Email or password is incorrect. Check both and try again.' });
  res.json({ token: signToken(admin, 'admin'), user: safeUser(admin) });
});

// ---------- Update own profile ----------
router.patch('/me', requireAuth('farmer', 'buyer'), async (req, res) => {
  const Model = kinds[req.auth.role];
  const fields = req.auth.role === 'farmer'
    ? ['name', 'email', 'farmName', 'location', 'district', 'state', 'mainCategory', 'address', 'city', 'pincode']
    : ['name', 'email', 'address', 'city', 'state', 'pincode'];
  const user = await Model.findOneAndUpdate({ id: req.auth.id }, pick(req.body, fields), { new: true });
  res.json(safeUser(user));
});

export default router;
