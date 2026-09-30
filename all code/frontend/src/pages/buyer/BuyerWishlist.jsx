import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const BuyerWishlist = () => {
  const { wishlist, products, addToCart, toggleWishlist } = useApp();
  const navigate = useNavigate();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1 w-full">
        <h1 className="text-3xl font-black text-slate-900">Saved Farm Produce (Wishlist)</h1>

        {savedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200">
            <Heart className="w-12 h-12 text-rose-400 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800">Your wishlist is currently empty</h3>
            <Link to="/buyer/marketplace" className="inline-block px-6 py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md">
              Browse Marketplace
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-48 bg-slate-100 relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute top-3 right-3 p-2 bg-white text-rose-600 rounded-full shadow"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">{p.farmerName}</span>
                    <h3 className="font-bold text-slate-900 text-base">{p.name}</h3>
                    <span className="text-xl font-black text-emerald-700 block">₹{p.price}/kg</span>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      addToCart(p, 5);
                      navigate('/buyer/cart');
                    }}
                    className="w-full py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export const BuyerProfile = () => {
  const { user } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1 w-full">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white font-black flex items-center justify-center text-2xl shadow-lg">
              {user?.name?.[0] || 'B'}
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">{user?.name}</h1>
              <p className="text-xs text-slate-500">{user?.email} • {user?.phone}</p>
            </div>
          </div>

          <div className="space-y-4 text-xs font-bold text-slate-700">
            <div>
              <span className="block text-[10px] uppercase text-slate-400">Delivery Address</span>
              <span className="text-sm font-bold text-slate-800">{user?.address}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-slate-400">City & Pincode</span>
              <span className="text-sm font-bold text-slate-800">{user?.city}, {user?.state} - {user?.pincode}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
