import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Search, Filter, Star, MapPin, ShoppingBag, Eye, Heart } from 'lucide-react';

export const BuyerMarketplace = () => {
  const { products, addToCart, wishlist, toggleWishlist, t, language } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [minRating, setMinRating] = useState('All');

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || p.location === selectedLocation;

    let matchesPrice = true;
    if (selectedPriceRange === 'under50') matchesPrice = p.price < 50;
    else if (selectedPriceRange === '50to100') matchesPrice = p.price >= 50 && p.price <= 100;
    else if (selectedPriceRange === 'above100') matchesPrice = p.price > 100;

    let matchesRating = true;
    if (minRating === '4.5') matchesRating = p.rating >= 4.5;

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-8 text-white space-y-3 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-tamil">
            {language === 'ta' ? 'தமிழ்நாடு பண்ணைகளில் இருந்து நேரடியாக' : 'Direct From Tamil Nadu Farms'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-tamil">
            {language === 'ta' ? 'உள்ளூர் விவசாயிகளின் புதிய விளைபொருட்கள்' : 'Fresh Products From Local Farmers'}
          </h1>
          <p className="text-xs text-emerald-100 max-w-2xl font-tamil">
            {language === 'ta' ? 'வெளிப்படையான விலையில் காய்கறி, பழங்கள், தானியங்கள் மற்றும் மளிகை பொருட்களை நேரடியாக ஆர்டர் செய்யுங்கள்.' : 'Order veggies, fruits, grains and spices with 100% transparent pricing directly supporting rural agricultural communities.'}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search vegetables, fruits, grains, turmeric, farmer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
                <option value="Pulses">Pulses</option>
                <option value="Spices">Spices</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Farm Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="All">All Places</option>
                {[...new Set(products.map((x) => x.location))].sort().map((loc) => (<option key={loc} value={loc}>{loc}</option>))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Price Range</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="All">All Prices</option>
                <option value="under50">Under ₹50 / kg</option>
                <option value="50to100">₹50 - ₹100 / kg</option>
                <option value="above100">Above ₹100 / kg</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="All">All Ratings</option>
                <option value="4.5">★ 4.5+ Rating</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => {
            const isWishlisted = wishlist.includes(p.id);

            return (
              <div key={p.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md hover:bg-white text-slate-700 hover:text-rose-600 rounded-full transition shadow-md"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                    </button>

                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {p.category}
                    </span>

                    <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {p.location}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">{p.farmerName} ({p.farmName})</span>
                      <div className="flex items-center text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-current mr-1" /> {p.rating}
                      </div>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{p.name}</h3>

                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-2xl font-black text-emerald-700">₹{p.price}</span>
                        <span className="text-xs text-slate-400 font-semibold"> / {p.unit}</span>
                        {p.marketPrice && <span className="block text-[11px] text-slate-400">Market price <s>₹{p.marketPrice}</s> · {p.quality}</span>}
                      </div>

                      <span className={`text-xs font-bold ${p.availableQty < 50 ? 'text-amber-600' : 'text-slate-600'}`}>
                        {p.availableQty} {p.unit} available
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3">
                  <Link
                    to={`/buyer/product/${p.id}`}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition"
                  >
                    <Eye className="w-4 h-4" /> View Details
                  </Link>

                  <button
                    onClick={() => {
                      addToCart(p, 5);
                      navigate('/buyer/cart');
                    }}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" /> Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      <Footer />
    </div>
  );
};
