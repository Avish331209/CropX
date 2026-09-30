import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { language, t } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <Sprout className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">AgriLink</span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-tamil">
              {language === 'ta' 
                ? "விவசாயிகளையும் நுகர்வோரையும் நேரடியாக இணைக்கும் நவீன டிஜிட்டல் விவசாய சந்தை தளம்."
                : "Empowering farmers with better market access while helping buyers find fresh agricultural products directly from local farms."}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4" /> 100% Direct Farm Sourced
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/buyer/marketplace" className="hover:text-emerald-400 transition">Explore All Crops</Link></li>
              <li><Link to="/buyer/marketplace?category=Vegetables" className="hover:text-emerald-400 transition">Fresh Vegetables</Link></li>
              <li><Link to="/buyer/marketplace?category=Fruits" className="hover:text-emerald-400 transition">Organic Fruits</Link></li>
              <li><Link to="/buyer/marketplace?category=Grains" className="hover:text-emerald-400 transition">Grains & Pulses</Link></li>
              <li><Link to="/buyer/marketplace?category=Spices" className="hover:text-emerald-400 transition">Erode Turmeric & Spices</Link></li>
            </ul>
          </div>

          {/* Three Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platform Roles</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/farmer/login" className="hover:text-emerald-400 transition">Farmer Login / Register</Link></li>
              <li><Link to="/farmer/dashboard" className="hover:text-emerald-400 transition">Farmer Dashboard</Link></li>
              <li><Link to="/buyer/login" className="hover:text-emerald-400 transition">Buyer Login / Register</Link></li>
              <li><Link to="/buyer/marketplace" className="hover:text-emerald-400 transition">Buyer Marketplace</Link></li>
              <li><Link to="/admin/login" className="hover:text-emerald-400 transition">Admin Portal Login</Link></li>
            </ul>
          </div>

          {/* Regions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Active Hubs</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Salem, Tamil Nadu</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Namakkal, Tamil Nadu</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Erode, Tamil Nadu</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Coimbatore, Tamil Nadu</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Krishnagiri & Dharmapuri</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 AgriLink AgriTech Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Farmer Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
