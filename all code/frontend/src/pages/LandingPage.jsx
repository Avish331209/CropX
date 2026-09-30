import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { 
  Sprout, 
  Tractor, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Users, 
  Clock, 
  ChevronRight,
  Mic
} from 'lucide-react';

export const LandingPage = () => {
  const { products, switchRole, language, t, addToCart } = useApp();
  const navigate = useNavigate();

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-emerald-900 via-emerald-850 to-slate-900 text-white overflow-hidden py-20 lg:py-28">
        {/* Background decorative graphic accents */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span>Next-Gen Agricultural Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                AgriLink <br />
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                  Connecting Farmers Directly With Buyers
                </span>
              </h1>

              <p className="text-lg text-emerald-100/90 max-w-xl font-normal leading-relaxed">
                Empowering farmers with better market access while helping buyers find fresh agricultural products directly from farms without middlemen.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/buyer/login"
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-500/25 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" /> Explore Products
                </Link>

                <Link
                  to="/farmer/login"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-2xl border border-white/20 backdrop-blur-md transition flex items-center gap-2"
                >
                  <Tractor className="w-5 h-5 text-emerald-300" /> Join AgriLink
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-emerald-800/80">
                <div>
                  <span className="block text-2xl font-black text-white">1,250+</span>
                  <span className="text-xs text-emerald-300/80">Verified Farmers</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-white">3,420+</span>
                  <span className="text-xs text-emerald-300/80">Active Buyers</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-white">₹1.2 Cr+</span>
                  <span className="text-xs text-emerald-300/80">Direct Income Paid</span>
                </div>
              </div>

            </div>

            {/* Hero Card Visual */}
            <div className="relative">
              <div className="relative mx-auto max-w-md bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl space-y-6">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xl shadow-lg">
                      🌾
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Salem Fresh Tomatoes</h4>
                      <p className="text-xs text-emerald-300">Harvested Today • Salem Hub</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-400/30">
                    ₹40 / kg
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/40 p-3 rounded-2xl border border-white/10 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Available Stock</span>
                    <span className="text-lg font-bold text-white">350 kg</span>
                  </div>
                  <div className="bg-slate-900/40 p-3 rounded-2xl border border-white/10 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Direct Savings</span>
                    <span className="text-lg font-bold text-emerald-400">28% Less</span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Mic className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-emerald-100 font-medium font-tamil">
                      "தக்காளி நாற்பது ரூபாய்" Voice Added
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                    Tamil Ready
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THREE ROLES SECTION */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">Tailored For Every Agricultural Stakeholder</h2>
            <p className="text-slate-600 mt-2">AgriLink connects farmers, buyers, and administrators in one unified platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Farmer Card */}
            <div className="bg-emerald-50/60 rounded-3xl p-8 border border-emerald-200/80 hover:shadow-xl transition duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-110 transition">
                  <Tractor className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-tamil">Farmer</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-tamil">
                  Sell your products directly to buyers without intermediaries. Enjoy Tamil voice input, simple dashboards, and guaranteed payout schedules.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-700 pt-2 font-tamil">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> தமிழ் / English UI</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Voice Assistant for product listing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Real-time order & inventory alerts</li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigate('/farmer/login')}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                >
                  Farmer Login <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Buyer Card */}
            <div className="bg-teal-50/60 rounded-3xl p-8 border border-teal-200/80 hover:shadow-xl transition duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 group-hover:scale-110 transition">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Buyer</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Discover and purchase fresh agricultural products directly from verified local Tamil Nadu farms with transparent pricing and live order tracking.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-700 pt-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Direct farm-to-door delivery</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Transparent ₹/kg prices</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Damaged product refund guarantee</li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigate('/buyer/login')}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                >
                  Buyer Login <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Admin Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 hover:shadow-xl transition duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Admin</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Manage and monitor the complete marketplace ecosystem, resolve buyer complaints, inspect quality, approve sellers, and access system analytics.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-300 pt-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Farmer & Buyer verification</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Complaint resolution center</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Comprehensive financial reporting</li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigate('/admin/login')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                >
                  Admin Login <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Simplified Workflow</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">How AgriLink Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-base">1</div>
              <h4 className="font-bold text-slate-900">Farmer Lists Crop</h4>
              <p className="text-xs text-slate-600">Farmers quickly list available harvest quantities via voice input or simple touch form.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-base">2</div>
              <h4 className="font-bold text-slate-900">Buyer Browses & Orders</h4>
              <p className="text-xs text-slate-600">Buyers compare farm prices, inspect harvest dates, and place instant cart orders.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-base">3</div>
              <h4 className="font-bold text-slate-900">Direct Farm Dispatch</h4>
              <p className="text-xs text-slate-600">Produce is packed in farm hubs (Salem, Erode, etc.) and tracked in real-time.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-base">4</div>
              <h4 className="font-bold text-slate-900">Instant Settlement</h4>
              <p className="text-xs text-slate-600">Payment is credited directly to the farmer's account with quality satisfaction guaranteed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Fresh Produce</span>
              <h2 className="text-3xl font-extrabold text-slate-900">Featured Farm Crops</h2>
            </div>
            <Link
              to="/buyer/marketplace"
              onClick={() => switchRole('buyer')}
              className="text-emerald-700 hover:text-emerald-800 font-bold text-sm flex items-center gap-1"
            >
              View All Marketplace <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {product.category}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                      {product.location}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-semibold">{product.farmerName}</span>
                      <div className="flex items-center text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current mr-1" /> {product.rating}
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{product.name}</h3>

                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-extrabold text-emerald-700">₹{product.price}</span>
                      <span className="text-xs text-slate-500 font-semibold">/ {product.unit}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      switchRole('buyer');
                      addToCart(product, 5);
                      navigate('/buyer/cart');
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-md shadow-emerald-600/20"
                  >
                    Add to Cart & Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 to-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Transform Agricultural Commerce?</h2>
          <p className="text-emerald-100 max-w-2xl mx-auto text-base">
            Join thousands of farmers and buyers across Tamil Nadu already trading transparently on AgriLink.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/farmer/login"
              onClick={() => switchRole('farmer')}
              className="px-8 py-3.5 bg-white text-emerald-900 font-extrabold rounded-2xl shadow-lg hover:bg-emerald-50 transition"
            >
              Start Selling as Farmer
            </Link>
            <Link
              to="/buyer/login"
              onClick={() => switchRole('buyer')}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl shadow-lg transition"
            >
              Start Buying Fresh Crops
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
