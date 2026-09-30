# AgriLink – React + Express + MongoDB

Farmers list produce, buyers order it, admin manages everything.
Login: farmers and buyers use **mobile + OTP**, admin uses **email + password**.

## 1. What you need
- Node.js 18 or newer
- MongoDB – **either** installed on your PC (MongoDB Community) **or** a free MongoDB Atlas cluster

## 2. Setup (first time only)
```bash
npm install
cp .env.example .env        # Windows: copy .env.example .env
```
Open `.env` and set:
- `MONGODB_URI` – local: `mongodb://127.0.0.1:27017/agrilink` (default) or your Atlas connection string
- `JWT_SECRET` – any long random text

## 3. Run
```bash
npm start
```
This starts both:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000 (`/api/health` to test)

On the first run the backend fills the empty database with the demo data (products, orders, farmers, buyers, categories) and creates the admin account. It never overwrites data that already exists.

## 4. Demo logins
| Role | How to log in |
|------|---------------|
| Farmer | mobile `9443187654` → Send OTP |
| Buyer | mobile `9876543210` → Send OTP |
| Admin | `admin@agrilink.gov.in` / `admin123` (change in `.env` before first run) |

No SMS provider is connected, so the OTP is shown on screen ("Demo mode"). New farmers and buyers can register from the login pages.

## 5. Folder structure
```
server/
  index.js            Express app + error handling
  config/db.js        MongoDB connection (Mongoose)
  models/index.js     Farmer, Buyer, Admin, Product, Order, Complaint, Category, Otp
  routes/             auth, products, orders, complaints, admin
  middleware/auth.js  JWT check + role check
  seed.js             demo data on first run
src/
  utils/api.js        ALL frontend -> backend calls (adds the login token)
  context/AppContext.jsx   app state, loads/saves through the API
  pages/ components/  screens
```

## 6. API summary
| Route | Who |
|-------|-----|
| `POST /api/otp/send`, `/api/otp/verify` | anyone |
| `POST /api/farmer/register`, `/login`, `/api/buyer/register`, `/login` | anyone (needs verified OTP) |
| `POST /api/admin/login` | anyone |
| `GET /api/products` | anyone |
| `POST/PATCH/DELETE /api/products` | farmer (own products) / admin |
| `GET/POST /api/orders`, `PATCH /api/orders/:id/status` | each role sees only its own orders |
| `GET/POST /api/complaints`, `PATCH /api/complaints/:id/status` | buyer creates, admin decides |
| `GET /api/farmers`, `/buyers`, `/analytics`, status changes, categories | admin |

## 7. Security notes
- Passwords (admin) are hashed with bcrypt. Login tokens (JWT) last 7 days.
- Prices, totals, refunds and the farmer of an order are calculated by the server, never trusted from the browser.
- Aadhaar and bank numbers are stored in the database but only sent back masked (last 4 digits).
- Before going live: connect a real SMS provider in `sendSms()` (`server/utils.js`), set `SMS_LIVE=true`, use a strong `JWT_SECRET`, change the admin password, and serve over HTTPS.

## 8. Not saved in the database yet
Cart, wishlist, language and the notification bell are still stored only in the browser.
