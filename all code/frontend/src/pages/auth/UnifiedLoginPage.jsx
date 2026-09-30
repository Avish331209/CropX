import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Tractor, ShoppingBag, ShieldCheck, ArrowRight, Lock, Sparkles } from 'lucide-react';

export const UnifiedLoginPage = () => {
  const { switchRole, t, language } = useApp();
  const navigate = useNavigate();

  // Selected portal tab: 'farmer' | 'buyer' | 'admin'
  const [activeTab, setActiveTab] = useState('farmer');

  // Form states
  const [farmerData, setFarmerData] = useState({
    email: 'murugan@salemfarm.in',
    password: 'farmer123'
  });

  const [buyerData, setBuyerData] = useState({
    email: 'rajesh.kumar@gmail.com',
    password: 'buyer123'
  });

  const [adminData, setAdminData] = useState({
    email: 'admin@agrilink.gov.in',
    password: 'admin123'
  });

  const handleFarmerSubmit = (e) => {
    e.preventDefault();
    switchRole('farmer', {
      id: "FARM-001",
      name: "Murugan R.",
      email: farmerData.email,
      phone: "+91 94431 87654",
      farmName: "Green Valley Farms",
      location: "Salem",
      district: "Salem",
      state: "Tamil Nadu"
    });
    // Redirects to next page (Farmer Dashboard)
    navigate('/farmer/dashboard');
  };

  const handleBuyerSubmit = (e) => {
    e.preventDefault();
    switchRole('buyer', {
      id: "BUYER-101",
      name: "Rajesh Kumar",
      email: buyerData.email,
      phone: "+91 98765 43210",
      city: "Salem",
      state: "Tamil Nadu",
      address: "45 Gandhi Road, Fairlands"
    });
    // Redirects to next page (Buyer Marketplace)
    navigate('/buyer/marketplace');
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    switchRole('admin', {
      id: "ADM-001",
      name: "AgriLink System Administrator",
      email: adminData.email
    });
    // Redirects to next page (Admin Dashboard)
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between text-slate-100">
      <Navbar />

      <main className="max-w-xl w-full mx-auto px-4 py-12 flex-1 flex flex-col justify-center">
        
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-700 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20 inline-block font-tamil">
              🌾 AgriLink Portal Access
            </span>
            <h1 className="text-3xl font-black text-white font-tamil">AgriLink Portal Login</h1>
            <p className="text-xs text-slate-400 font-tamil">
              Select your role, enter credentials, and submit to access your dashboard
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-700">
            <button
              type="button"
              onClick={() => setActiveTab('farmer')}
              className={`py-3 rounded-xl font-bold text-xs transition flex flex-col items-center gap-1 font-tamil ${
                activeTab === 'farmer' 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tractor className="w-5 h-5" />
              <span>{language === 'ta' ? 'விவசாயி' : 'Farmer'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('buyer')}
              className={`py-3 rounded-xl font-bold text-xs transition flex flex-col items-center gap-1 font-tamil ${
                activeTab === 'buyer' 
                  ? 'bg-teal-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{language === 'ta' ? 'வாடிக்கையாளர்' : 'Buyer'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`py-3 rounded-xl font-bold text-xs transition flex flex-col items-center gap-1 font-tamil ${
                activeTab === 'admin' 
                  ? 'bg-emerald-900 text-white shadow-lg border border-emerald-500/50' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Admin</span>
            </button>
          </div>

          {/* FARMER FORM */}
          {activeTab === 'farmer' && (
            <form onSubmit={handleFarmerSubmit} className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 font-tamil">Farmer Mobile / Email</label>
                <input
                  type="text"
                  required
                  value={farmerData.email}
                  onChange={(e) => setFarmerData({ ...farmerData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 font-tamil">Password</label>
                <input
                  type="password"
                  required
                  value={farmerData.password}
                  onChange={(e) => setFarmerData({ ...farmerData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 font-tamil"
              >
                <span>Login & Open Farmer Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <Link to="/farmer/register" className="text-xs text-emerald-400 font-bold hover:underline font-tamil">
                  New Farmer? Click here to Register
                </Link>
              </div>
            </form>
          )}

          {/* BUYER FORM */}
          {activeTab === 'buyer' && (
            <form onSubmit={handleBuyerSubmit} className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Buyer Email / Mobile</label>
                <input
                  type="text"
                  required
                  value={buyerData.email}
                  onChange={(e) => setBuyerData({ ...buyerData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={buyerData.password}
                  onChange={(e) => setBuyerData({ ...buyerData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-teal-600/30 transition flex items-center justify-center gap-2"
              >
                <span>Login & Open Buyer Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <Link to="/buyer/register" className="text-xs text-teal-400 font-bold hover:underline">
                  New Buyer? Click here to Register
                </Link>
              </div>
            </form>
          )}

          {/* ADMIN FORM */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4 animate-fadeIn">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Authorized administrators only.</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Admin Email</label>
                <input
                  type="email"
                  required
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={adminData.password}
                  onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition flex items-center justify-center gap-2"
              >
                <span>Login & Open Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

      </main>

      <Footer />
    </div>
  );
};
