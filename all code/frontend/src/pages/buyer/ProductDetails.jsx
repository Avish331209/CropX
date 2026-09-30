import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { 
  Star, 
  MapPin, 
  Tractor, 
  Calendar, 
  ShieldCheck, 
  ShoppingBag, 
  Heart, 
  Minus, 
  Plus, 
  ArrowLeft 
} from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart, wishlist, toggleWishlist } = useApp();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id) || products[0];
  const [qty, setQty] = useState(5);

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-3xl overflow-hidden bg-slate-100 shadow-inner">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-600 rounded-full shadow-lg transition"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>

              <span className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" /> {product.location}, Tamil Nadu
              </span>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="space-y-6">
            
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-[10px] rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl font-black text-slate-900">{product.name}</h1>
              
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current mr-1" /> {product.rating} ({product.reviewsCount} Buyer Reviews)
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium">Harvest Date: {product.harvestDate}</span>
              </div>
            </div>

            {/* Price & Stock */}
            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-bold block uppercase">Direct Farm Price</span>
                <span className="text-3xl font-black text-emerald-800">₹{product.price}</span>
                <span className="text-xs text-slate-500 font-semibold"> / {product.unit}</span>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-700 block">Stock Availability</span>
                <span className="text-sm font-extrabold text-emerald-700">{product.availableQty} kg Available</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">About Harvest</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Farmer Profile Card */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center text-lg">
                  <Tractor className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{product.farmerName}</h4>
                  <p className="text-xs text-slate-500">{product.farmName} • {product.location}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                Verified Farmer
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-400">Select Quantity (kg)</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-300 rounded-2xl bg-slate-50 p-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 rounded-xl bg-white hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 shadow-sm"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-14 text-center font-black text-slate-900 text-base">{qty} kg</span>
                  <button
                    onClick={() => setQty(Math.min(product.availableQty, qty + 1))}
                    className="w-10 h-10 rounded-xl bg-white hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-sm font-black text-slate-900">
                  Subtotal: <span className="text-emerald-700">₹{product.price * qty}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => {
                  addToCart(product, qty);
                  navigate('/buyer/cart');
                }}
                className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>

              <button
                onClick={() => {
                  addToCart(product, qty);
                  navigate('/buyer/checkout');
                }}
                className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-2xl shadow-lg transition text-center"
              >
                Buy Now
              </button>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
