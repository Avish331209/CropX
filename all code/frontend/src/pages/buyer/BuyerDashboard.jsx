import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ShoppingBag, Clock, CheckCircle2, TrendingUp, Star, ChevronRight } from 'lucide-react';

export const BuyerDashboard = () => {
  const { user, orders, products, addToCart, t, language } = useApp();
  const navigate = useNavigate();

  const userOrders = orders.filter(o => o.buyerName === user?.name || o.buyerId === user?.id);
  const activeOrdersCount = userOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const completedOrdersCount = userOrders.filter(o => o.status === 'Delivered').length;
  const totalSpending = userOrders.reduce((sum, o) => sum + (o.total || 0), 14850);

  const recommendedProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-3xl p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <h1 className="text-3xl font-black font-tamil">{t('welcomeBuyer')}, {user?.name || 'Buyer'} 👋</h1>
            <p className="text-xs text-emerald-100 mt-1 font-tamil">
              {language === 'ta' ? 'நேரடியாக தமிழ்நாட்டின் விவசாயிகளிடமிருந்து புதிய விளைபொருட்களை பெறுங்கள்.' : 'Discover fresh agricultural harvest directly from local Tamil Nadu farms.'}
            </p>
          </div>

          <Link
            to="/buyer/marketplace"
            className="px-6 py-3 bg-white text-emerald-900 font-extrabold text-xs rounded-2xl shadow-lg hover:bg-emerald-50 transition text-center font-tamil"
          >
            {t('goToMarketplace')} →
          </Link>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase font-tamil">{t('totalOrders')}</span>
            <span className="text-3xl font-black text-slate-900 block">{userOrders.length || 12}</span>
            <span className="text-[11px] text-emerald-600 font-semibold font-tamil">Direct farm purchases</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase font-tamil">{t('activeOrders')}</span>
            <span className="text-3xl font-black text-emerald-700 block">{activeOrdersCount || 2}</span>
            <span className="text-[11px] text-teal-600 font-semibold font-tamil">In transit</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase font-tamil">{t('completedOrders')}</span>
            <span className="text-3xl font-black text-slate-900 block">{completedOrdersCount || 10}</span>
            <span className="text-[11px] text-slate-400 font-semibold font-tamil">Successfully delivered</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase font-tamil">{t('totalSpending')}</span>
            <span className="text-3xl font-black text-emerald-700 block">₹{totalSpending.toLocaleString()}</span>
            <span className="text-[11px] text-emerald-600 font-semibold font-tamil">Saved ~25% vs retail</span>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900">Recommended Farm Fresh Crops</h2>
            <Link to="/buyer/marketplace" className="text-xs font-bold text-emerald-700 hover:underline">
              View All Marketplace →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="h-44 bg-slate-100 relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                      {p.location}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">{p.farmerName}</span>
                    <h3 className="font-bold text-slate-900 text-sm">{p.name}</h3>
                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-black text-emerald-700">₹{p.price}/kg</span>
                      <span className="text-xs text-slate-400 font-medium">{p.availableQty} kg left</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      addToCart(p, 5);
                      navigate('/buyer/cart');
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};
