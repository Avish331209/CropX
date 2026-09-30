import { Router } from 'express';
import { Product, Farmer } from '../models/index.js';
import { requireAuth } from '../middleware/auth.js';
import { uniqueId, pick } from '../utils.js';

const router = Router();
const FIELDS = ['name', 'nameTa', 'category', 'price', 'unit', 'availableQty', 'minOrderQty', 'location',
  'state', 'harvestDate', 'image', 'description', 'quality', 'marketPrice', 'costPerKg'];

const stockStatus = (qty) => (qty <= 0 ? 'Out of Stock' : qty < 50 ? 'Low Stock' : 'In Stock');

// Anyone can browse products
router.get('/', async (_req, res) => {
  res.json(await Product.find().sort({ createdAt: -1 }));
});

router.post('/', requireAuth('farmer'), async (req, res) => {
  const data = pick(req.body, FIELDS);
  if (!data.name?.trim()) return res.status(400).json({ error: 'Product name is required' });
  if (!(Number(data.price) > 0)) return res.status(400).json({ error: 'Price must be greater than zero' });
  if (!(Number(data.availableQty) > 0)) return res.status(400).json({ error: 'Quantity must be greater than zero' });

  const farmer = await Farmer.findOne({ id: req.auth.id });
  const product = await Product.create({
    ...data,
    id: await uniqueId(Product, 'PROD', 4),
    farmerId: farmer.id, farmerName: farmer.name, farmName: farmer.farmName,
    soldQty: 0, rating: 5.0, reviewsCount: 1,
    status: stockStatus(Number(data.availableQty)),
  });
  res.status(201).json(product);
});

// Owner farmer or admin only
async function loadOwned(req, res) {
  const product = await Product.findOne({ id: req.params.id });
  if (!product) { res.status(404).json({ error: 'Product not found' }); return null; }
  if (req.auth.role === 'farmer' && product.farmerId !== req.auth.id) {
    res.status(403).json({ error: 'You can only change your own products.' }); return null;
  }
  return product;
}

router.patch('/:id', requireAuth('farmer', 'admin'), async (req, res) => {
  const product = await loadOwned(req, res); if (!product) return;
  Object.assign(product, pick(req.body, FIELDS));
  product.status = stockStatus(product.availableQty);
  await product.save();
  res.json(product);
});

router.delete('/:id', requireAuth('farmer', 'admin'), async (req, res) => {
  const product = await loadOwned(req, res); if (!product) return;
  await product.deleteOne();
  res.json({ message: 'Product deleted successfully', id: req.params.id });
});

export default router;
