import { Router } from 'express';
import { Complaint, Order } from '../models/index.js';
import { requireAuth } from '../middleware/auth.js';
import { uniqueId, nowLabel, pick } from '../utils.js';

const router = Router();

router.get('/', requireAuth('farmer', 'buyer', 'admin'), async (req, res) => {
  const { id, role } = req.auth;
  const filter = role === 'farmer' ? { farmerId: id } : role === 'buyer' ? { buyerId: id } : {};
  res.json(await Complaint.find(filter).sort({ createdAt: -1 }));
});

router.post('/', requireAuth('buyer'), async (req, res) => {
  const d = pick(req.body, ['orderId', 'issueType', 'damagedQty', 'description', 'photoUrl']);
  const order = await Order.findOne({ id: d.orderId, buyerId: req.auth.id });
  if (!order) return res.status(404).json({ error: 'Order not found for your account.' });

  const damagedQty = Math.min(Math.max(Number(d.damagedQty) || 1, 1), order.quantity);
  const complaint = await Complaint.create({
    ...d,
    id: await uniqueId(Complaint, 'CMP', 3),
    buyerId: order.buyerId, buyerName: order.buyerName,
    farmerId: order.farmerId, farmerName: order.farmerName, productName: order.productName,
    orderedQty: order.quantity, damagedQty, unitPrice: order.price,
    refundAmount: damagedQty * order.price, // calculated here, not trusted from the browser
    date: nowLabel(), status: 'Pending',
  });
  res.status(201).json(complaint);
});

// Admin decides: action = 'Approved' | 'Rejected' | 'Resolved'
router.patch('/:id/status', requireAuth('admin'), async (req, res) => {
  const { action } = req.body;
  if (!['Approved', 'Rejected', 'Resolved'].includes(action)) return res.status(400).json({ error: 'Invalid action' });
  const complaint = await Complaint.findOne({ id: req.params.id });
  if (!complaint) return res.status(404).json({ error: 'Complaint not found' });

  complaint.status = action === 'Approved' ? 'Approved & Refunded' : action;
  await complaint.save();

  let order = null;
  if (action === 'Approved') {
    order = await Order.findOneAndUpdate({ id: complaint.orderId }, { paymentStatus: 'Partially Refunded' }, { new: true });
  }
  res.json({ complaint, order });
});

export default router;
