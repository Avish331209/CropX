import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// We keep the string "id" (FARM-001, PROD-101 ...) the React app already uses.
// { id: false } turns off Mongoose's own "id" virtual so it does not clash.
const opts = {
  id: false,
  timestamps: true,
  strict: false, // routes whitelist what clients may send
  toJSON: { transform: (_doc, ret) => { delete ret._id; delete ret.__v; delete ret.createdAt; delete ret.updatedAt; return ret; } },
};

const idField = { type: String, required: true, unique: true, index: true };

export const Farmer = model('Farmer', new Schema({
  id: idField,
  mobile: { type: String, required: true, unique: true }, // 10 digits, used to log in
  name: { type: String, required: true },
  phone: String, email: String, address: String, location: String, district: String,
  state: { type: String, default: 'Tamil Nadu' },
  farmName: String, mainCategory: String,
  aadhaar: String, photo: String, avatar: String,
  bank: { holder: String, number: String, ifsc: String, name: String },
  status: { type: String, default: 'Approved' },
  productsCount: { type: Number, default: 0 }, ordersCount: { type: Number, default: 0 },
  joinedDate: String,
}, opts));

export const Buyer = model('Buyer', new Schema({
  id: idField,
  mobile: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: String, email: String, address: String, city: String,
  state: { type: String, default: 'Tamil Nadu' }, pincode: String,
  status: { type: String, default: 'Active' },
  ordersCount: { type: Number, default: 0 }, totalSpent: { type: Number, default: 0 },
  joinedDate: String,
}, opts));

export const Admin = model('Admin', new Schema({
  id: idField,
  name: String,
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
}, opts));

export const Product = model('Product', new Schema({
  id: idField,
  name: { type: String, required: true }, nameTa: String, category: String,
  farmerId: { type: String, index: true }, farmerName: String, farmName: String,
  location: String, state: String,
  price: { type: Number, required: true, min: 0 }, unit: { type: String, default: 'kg' },
  availableQty: { type: Number, default: 0, min: 0 }, soldQty: { type: Number, default: 0 },
  minOrderQty: Number, harvestDate: String, rating: Number, reviewsCount: Number,
  status: { type: String, default: 'In Stock' },
  image: String, description: String, quality: String, marketPrice: Number, costPerKg: Number,
}, opts));

export const Order = model('Order', new Schema({
  id: idField,
  buyerId: { type: String, index: true }, buyerName: String, buyerPhone: String, buyerAddress: String,
  city: String, pincode: String,
  farmerId: { type: String, index: true }, farmerName: String,
  productId: String, productName: String, productImage: String,
  quantity: Number, unit: String, price: Number, subtotal: Number, deliveryFee: Number, total: Number,
  orderDate: String, paymentMethod: String, upiApp: String, paymentStatus: String, transactionId: String,
  costPerKg: Number, marketPrice: Number,
  status: { type: String, default: 'Confirmed' },
  trackingSteps: [{ _id: false, title: String, date: String, completed: Boolean }],
}, opts));

export const Complaint = model('Complaint', new Schema({
  id: idField,
  orderId: String, buyerId: { type: String, index: true }, buyerName: String,
  farmerId: String, farmerName: String, productName: String,
  issueType: String, orderedQty: Number, damagedQty: Number, unitPrice: Number, refundAmount: Number,
  description: String, photoUrl: String, date: String,
  status: { type: String, default: 'Pending' },
}, opts));

export const Category = model('Category', new Schema({
  id: idField, name: String, nameTa: String, icon: String, count: Number,
}, opts));

// One-time passwords. MongoDB deletes the document itself when expiresAt passes (TTL index).
export const Otp = model('Otp', new Schema({
  mobile: { type: String, required: true, unique: true },
  codeHash: String, tries: { type: Number, default: 0 }, verified: { type: Boolean, default: false },
  expiresAt: { type: Date, index: { expireAfterSeconds: 0 } },
}, { timestamps: false }));
