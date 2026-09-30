import { Router } from 'express';
import { Farmer, Buyer, Product, Order, Complaint, Category } from '../models/index.js';
import { requireAuth } from '../middleware/auth.js';
import { uniqueId, smsLog, safeUser } from '../utils.js';

const router = Router();

// Categories: everyone can read, only admin can change
router.get('/categories', async (_req, res) => res.json(await Category.find().sort({ id: 1 })));

router.post('/categories', requireAuth('admin'), async (req, res) => {
  const name = String(req.body.name || '').trim();
  if (!name) return res.status(400).json({ error: 'Category name is required' });
  res.status(201).json(await Category.create({ id: await uniqueId(Category, 'CAT', 5), name, nameTa: req.body.nameTa || name, icon: 'Sprout', count: 0 }));
});

router.delete('/categories/:id', requireAuth('admin'), async (req, res) => {
  await Category.deleteOne({ id: req.params.id });
  res.json({ ok: true, id: req.params.id });
});

// Farmer / buyer directories (admin only). Photo, Aadhaar and bank number are not sent.
router.get('/farmers', requireAuth('admin'), async (_req, res) =>
  res.json((await Farmer.find().select('-photo -aadhaar -bank').sort({ createdAt: -1 })).map(safeUser)));
router.get('/buyers', requireAuth('admin'), async (_req, res) => res.json(await Buyer.find().sort({ createdAt: -1 })));

router.patch('/farmers/:id/status', requireAuth('admin'), async (req, res) => {
  if (!['Approved', 'Suspended'].includes(req.body.status)) return res.status(400).json({ error: 'Invalid status' });
  const { matchedCount } = await Farmer.updateOne({ id: req.params.id }, { status: req.body.status });
  if (!matchedCount) return res.status(404).json({ error: 'Farmer not found' });
  res.json(safeUser(await Farmer.findOne({ id: req.params.id }).select('-photo -aadhaar -bank')));
});

router.patch('/buyers/:id/status', requireAuth('admin'), async (req, res) => {
  if (!['Active', 'Suspended'].includes(req.body.status)) return res.status(400).json({ error: 'Invalid status' });
  const b = await Buyer.findOneAndUpdate({ id: req.params.id }, { status: req.body.status }, { new: true });
  b ? res.json(b) : res.status(404).json({ error: 'Buyer not found' });
});

router.get('/analytics', requireAuth('admin'), async (_req, res) => {
  const [rev, totalProducts, totalFarmers, totalBuyers, totalOrdersCount, pendingComplaints, topCategories] = await Promise.all([
    Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]),
    Product.countDocuments(), Farmer.countDocuments(), Buyer.countDocuments(), Order.countDocuments(),
    Complaint.countDocuments({ status: { $nin: ['Resolved', 'Rejected', 'Approved & Refunded'] } }),
    Category.find(),
  ]);
  res.json({ totalRevenue: rev[0]?.total || 0, totalProducts, totalFarmers, totalBuyers, totalOrdersCount, pendingComplaints, topCategories });
});

router.get('/sms-log', requireAuth('admin'), (_req, res) => res.json(smsLog));

export default router;
