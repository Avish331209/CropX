import 'dotenv/config';
import 'express-async-errors'; // lets async route errors reach the error handler below
import crypto from 'crypto';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { seedIfEmpty } from './seed.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import complaintRoutes from './routes/complaints.js';
import adminRoutes from './routes/admin.js';

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
  console.warn('⚠️  JWT_SECRET is not set in .env. Using a temporary one: everyone is logged out on every restart.');
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json({ limit: '8mb' })); // farmer photo / product images are sent as base64

app.get('/api/health', (_req, res) => res.json({ status: 'OK', message: 'AgriLink API Server Running', timestamp: new Date() }));

app.use('/api', authRoutes);              // /api/otp/*, /api/farmer/login ... /api/me
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api', adminRoutes);             // /api/categories, /api/farmers, /api/buyers, /api/analytics

app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found' }));

// One place that turns errors into clean JSON
app.use((err, _req, res, _next) => {
  if (err.code === 11000) return res.status(409).json({ error: 'This record already exists.' });
  if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

connectDB()
  .then(seedIfEmpty)
  .then(() => app.listen(PORT, () => console.log(`🌾 AgriLink backend running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('\n❌ Could not start the backend:', err.message);
    console.error('   Is MongoDB running? Check MONGODB_URI in your .env file (see .env.example).\n');
    process.exit(1);
  });
