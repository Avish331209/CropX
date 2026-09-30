import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, ShieldCheck } from 'lucide-react';

export const BuyerCart = () => {
  const { cart, updateCartQty, removeFromCart, clearCart } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 50 : 0;
  const totalAmount = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        <h1 className="text-3xl font-black text-slate-900">Your Agricultural Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Your cart is currently empty</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">Browse fresh vegetables, fruits, and grains listed directly by verified Tamil Nadu farmers.</p>
            <Link
              to="/buyer/marketplace"
              className="inline-block px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-emerald-600/30 transition"
            >
              Explore Products Marketplace
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase">{item.farmerName} • {item.location}</span>
                      <h3 className="font-extrabold text-slate-900 text-base">{item.name}</h3>
                      <span className="text-sm font-bold text-emerald-800">₹{item.price} / kg</span>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                      <button
                        onClick={() => updateCartQty(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-slate-700 shadow-sm"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-bold text-slate-900 text-sm">{item.quantity} kg</span>
                      <button
                        onClick={() => updateCartQty(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-slate-700 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-black text-slate-900 text-base min-w-[80px] text-right">
                      ₹{item.price * item.quantity}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Side Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 h-fit">
              <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Order Summary</h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600 font-semibold">
                  <span>Subtotal ({cart.length} produce)</span>
                  <span className="text-slate-900 font-bold">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-slate-600 font-semibold">
                  <span>Farm Logistics Delivery Fee</span>
                  <span className="text-slate-900 font-bold">₹{deliveryFee}</span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between text-base font-black text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-emerald-700">₹{totalAmount}</span>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Damaged product complaint resolution active for all orders.</span>
              </div>

              <button
                onClick={() => navigate('/buyer/checkout')}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
