import bcrypt from 'bcryptjs';
import { Farmer, Buyer, Admin, Product, Order, Complaint, Category } from './models/index.js';
import { cleanMobile } from './utils.js';
import {
  INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_FARMERS, INITIAL_BUYERS, INITIAL_COMPLAINTS, INITIAL_CATEGORIES,
} from '../src/data/mockData.js';

// Fills EMPTY collections with the demo data once. It never overwrites real data.
export async function seedIfEmpty() {
  const withMobile = (list) => list.map((u) => ({ ...u, mobile: cleanMobile(u.phone) }));
  const jobs = [
    [Farmer, withMobile(INITIAL_FARMERS)], [Buyer, withMobile(INITIAL_BUYERS)],
    [Product, INITIAL_PRODUCTS], [Order, INITIAL_ORDERS], [Complaint, INITIAL_COMPLAINTS], [Category, INITIAL_CATEGORIES],
  ];
  for (const [Model, rows] of jobs) {
    if ((await Model.countDocuments()) === 0) {
      await Model.insertMany(rows);
      console.log(`🌱 Seeded ${rows.length} ${Model.modelName} records`);
    }
  }

  // Admin account comes from .env (password is stored hashed)
  const email = (process.env.ADMIN_EMAIL || 'admin@agrilink.gov.in').toLowerCase();
  if (!(await Admin.exists({ email }))) {
    await Admin.create({
      id: 'ADM-001', name: 'AgriLink System Administrator', email,
      passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10),
    });
    console.log(`🛡️  Admin created: ${email}`);
  }
}
