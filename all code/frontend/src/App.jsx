import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Pages Import
import { LandingPage } from './pages/LandingPage';

// Auth Pages
import { FarmerLogin, FarmerRegister } from './pages/auth/FarmerLogin';
import { BuyerLogin, BuyerRegister } from './pages/auth/BuyerLogin';
import { AdminLogin } from './pages/auth/AdminLogin';

// Farmer Pages
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { FarmerAddProduct } from './pages/farmer/FarmerAddProduct';
import { FarmerProducts } from './pages/farmer/FarmerProducts';
import { FarmerInventory } from './pages/farmer/FarmerInventory';
import { FarmerOrders } from './pages/farmer/FarmerOrders';
import { FarmerSales } from './pages/farmer/FarmerSales';
import { FarmerProfile } from './pages/farmer/FarmerProfile';

// Buyer Pages
import { BuyerDashboard } from './pages/buyer/BuyerDashboard';
import { BuyerMarketplace } from './pages/buyer/BuyerMarketplace';
import { ProductDetails } from './pages/buyer/ProductDetails';
import { BuyerCart } from './pages/buyer/BuyerCart';
import { BuyerCheckout } from './pages/buyer/BuyerCheckout';
import { BuyerOrders } from './pages/buyer/BuyerOrders';
import { OrderTrackingPage } from './pages/buyer/OrderTrackingPage';
import { ReportDisputePage } from './pages/buyer/ReportDisputePage';
import { BuyerWishlist, BuyerProfile } from './pages/buyer/BuyerWishlist';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminFarmers, AdminBuyers } from './pages/admin/AdminFarmers';
import { AdminProducts, AdminOrders } from './pages/admin/AdminProducts';
import { AdminComplaints } from './pages/admin/AdminComplaints';
import { AdminPayments, AdminCategories } from './pages/admin/AdminPayments';
import { AdminAnalytics, AdminReports, AdminSettings } from './pages/admin/AdminAnalytics';

// Only logged-in users with the right role can open a portal; everyone else goes to that portal's login.
const Guard = ({ role: need, children }) => {
  const { role } = useApp();
  return role === need ? children : <Navigate to={`/${need}/login`} replace />;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public / Landing & Login Gateway */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />

          {/* Farmer Auth */}
          <Route path="/farmer/login" element={<FarmerLogin />} />
          <Route path="/farmer/register" element={<FarmerRegister />} />

          {/* Farmer Portal Routes */}
          <Route path="/farmer/dashboard" element={<Guard role="farmer"><FarmerDashboard /></Guard>} />
          <Route path="/farmer/products" element={<Guard role="farmer"><FarmerProducts /></Guard>} />
          <Route path="/farmer/products/add" element={<Guard role="farmer"><FarmerAddProduct /></Guard>} />
          <Route path="/farmer/orders" element={<Guard role="farmer"><FarmerOrders /></Guard>} />
          <Route path="/farmer/inventory" element={<Guard role="farmer"><FarmerInventory /></Guard>} />
          <Route path="/farmer/sales" element={<Guard role="farmer"><FarmerSales /></Guard>} />
          <Route path="/farmer/analytics" element={<Guard role="farmer"><FarmerSales /></Guard>} />
          <Route path="/farmer/notifications" element={<Guard role="farmer"><FarmerDashboard /></Guard>} />
          <Route path="/farmer/profile" element={<Guard role="farmer"><FarmerProfile /></Guard>} />
          <Route path="/farmer/settings" element={<Guard role="farmer"><FarmerProfile /></Guard>} />

          {/* Buyer Auth */}
          <Route path="/buyer/login" element={<BuyerLogin />} />
          <Route path="/buyer/register" element={<BuyerRegister />} />

          {/* Buyer Portal Routes */}
          <Route path="/buyer/dashboard" element={<Guard role="buyer"><BuyerDashboard /></Guard>} />
          <Route path="/buyer/marketplace" element={<Guard role="buyer"><BuyerMarketplace /></Guard>} />
          <Route path="/buyer/product/:id" element={<ProductDetails />} />
          <Route path="/buyer/cart" element={<Guard role="buyer"><BuyerCart /></Guard>} />
          <Route path="/buyer/checkout" element={<Guard role="buyer"><BuyerCheckout /></Guard>} />
          <Route path="/buyer/orders" element={<Guard role="buyer"><BuyerOrders /></Guard>} />
          <Route path="/buyer/orders/:id" element={<Guard role="buyer"><OrderTrackingPage /></Guard>} />
          <Route path="/buyer/dispute" element={<Guard role="buyer"><ReportDisputePage /></Guard>} />
          <Route path="/buyer/wishlist" element={<Guard role="buyer"><BuyerWishlist /></Guard>} />
          <Route path="/buyer/profile" element={<Guard role="buyer"><BuyerProfile /></Guard>} />

          {/* Admin Auth */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Portal Routes */}
          <Route path="/admin/dashboard" element={<Guard role="admin"><AdminDashboard /></Guard>} />
          <Route path="/admin/farmers" element={<Guard role="admin"><AdminFarmers /></Guard>} />
          <Route path="/admin/buyers" element={<Guard role="admin"><AdminBuyers /></Guard>} />
          <Route path="/admin/products" element={<Guard role="admin"><AdminProducts /></Guard>} />
          <Route path="/admin/orders" element={<Guard role="admin"><AdminOrders /></Guard>} />
          <Route path="/admin/payments" element={<Guard role="admin"><AdminPayments /></Guard>} />
          <Route path="/admin/complaints" element={<Guard role="admin"><AdminComplaints /></Guard>} />
          <Route path="/admin/categories" element={<Guard role="admin"><AdminCategories /></Guard>} />
          <Route path="/admin/analytics" element={<Guard role="admin"><AdminAnalytics /></Guard>} />
          <Route path="/admin/reports" element={<Guard role="admin"><AdminReports /></Guard>} />
          <Route path="/admin/notifications" element={<Guard role="admin"><AdminDashboard /></Guard>} />
          <Route path="/admin/settings" element={<Guard role="admin"><AdminSettings /></Guard>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
