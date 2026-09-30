import { Router } from 'express';
import { Order, Product, Buyer, Farmer } from '../models/index.js';
import { requireAuth } from '../middleware/auth.js';
import { uniqueId, nowLabel, sendSms, pick } from '../utils.js';

const router = Router();
const STEPS = ['Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
const ALL_STATUSES = [...STEPS, 'Cancelled'];
const stockStatus = (qty) => (qty <= 0 ? 'Out of Stock' : qty < 50 ? 'Low Stock' : 'In Stock');

// Each role only sees its own orders
router.get('/', requireAuth('farmer', 'buyer', 'admin'), async (req, res) => {
  const { id, role } = req.auth;
  const filter = role === 'farmer' ? { farmerId: id } : role === 'buyer' ? { buyerId: id } : {};
  res.json(await Order.find(filter).sort({ createdAt: -1 }));
});

// Buyer places an order for ONE product. Price, farmer and totals come from the database, not the browser.
router.post('/', requireAuth('buyer'), async (req, res) => {
  const d = req.body;
  const quantity = Number(d.quantity);
  if (!d.productId || !(quantity > 0)) return res.status(400).json({ error: 'Product and quantity are required' });

  const buyer = await Buyer.findOne({ id: req.auth.id });
  if (buyer.status === 'Suspended') return res.status(403).json({ error: 'Your account is suspended.' });

  // Atomic stock reduction: only succeeds if enough stock is left.
  const product = await Product.findOneAndUpdate(
    { id: d.productId, availableQty: { $gte: quantity } },
    { $inc: { availableQty: -quantity, soldQty: quantity } },
    { new: true }
  );
  if (!product) return res.status(409).json({ error: 'Not enough stock available for this product.' });
  product.status = stockStatus(product.availableQty);
  await product.save();

  const deliveryFee = d.deliveryFee === 0 ? 0 : 50;
  const subtotal = product.price * quantity;
  const paymentMethod = d.paymentMethod || 'UPI';

  const order = await Order.create({
    id: await uniqueId(Order, 'ORD', 4),
    buyerId: buyer.id, buyerName: buyer.name,
    buyerPhone: d.mobile || buyer.phone,
    buyerAddress: d.deliveryAddress || buyer.address, city: d.city || buyer.city, pincode: d.pincode || buyer.pincode,
    farmerId: product.farmerId, farmerName: product.farmerName,
    productId: product.id, productName: product.name, productImage: product.image,
    quantity, unit: product.unit || 'kg', price: product.price, subtotal, deliveryFee, total: subtotal + deliveryFee,
    costPerKg: product.costPerKg || 0, marketPrice: product.marketPrice || 0,
    orderDate: nowLabel(), paymentMethod, upiApp: d.upiApp || '',
    paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
    transactionId: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
    status: 'Confirmed',
    trackingSteps: STEPS.map((title, i) => ({ title, date: i === 0 ? 'Just now' : 'Pending', completed: i === 0 })),
  });

  // Bill by SMS to buyer and farmer (numbers come from the database)
  const farmer = await Farmer.findOne({ id: product.farmerId });
  const text = `AgriLink Bill ${order.id}: ${order.productName} ${quantity}${order.unit} | Total Rs.${order.total} | ${paymentMethod}${order.upiApp ? ' (' + order.upiApp + ')' : ''} | ${order.paymentStatus}`;
  await sendSms(buyer.mobile, `Thank you ${buyer.name}! ${text}`);
  if (farmer) await sendSms(farmer.mobile, `New sale for ${farmer.name}! Buyer: ${buyer.name}. ${text}`);

  res.status(201).json(order);
});

router.patch('/:id/status', requireAuth('farmer', 'buyer', 'admin'), async (req, res) => {
  const { status } = req.body;
  if (!ALL_STATUSES.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const order = await Order.findOne({ id: req.params.id });
  if (!order) return res.status(404).json({ error: 'Order not found' });

  const { role, id } = req.auth;
  if (role === 'farmer' && order.farmerId !== id) return res.status(403).json({ error: 'Not your order.' });
  if (role === 'buyer' && (order.buyerId !== id || status !== 'Cancelled' || order.status !== 'Confirmed')) {
    return res.status(403).json({ error: 'Buyers can only cancel their own order before it is packed.' });
  }

  // Cancelling puts the stock back
  if (status === 'Cancelled' && order.status !== 'Cancelled') {
    const p = await Product.findOneAndUpdate({ id: order.productId }, { $inc: { availableQty: order.quantity, soldQty: -order.quantity } }, { new: true });
    if (p) { p.status = stockStatus(p.availableQty); await p.save(); }
  }

  const idx = STEPS.indexOf(status);
  if (status !== 'Cancelled') {
    order.trackingSteps = order.trackingSteps.map((s, i) =>
      i <= idx ? { title: s.title, completed: true, date: s.date === 'Pending' ? nowLabel() : s.date } : s
    );
  }
  order.status = status;
  await order.save();
  res.json(order);
});

export default router;
