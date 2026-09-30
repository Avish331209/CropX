import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  ShoppingBag, 
  Heart, 
  Bell, 
  User, 
  Search, 
  Globe, 
  LogOut, 
  ChevronDown, 
  ShieldCheck, 
  Tractor, 
  ShoppingCart,
  Menu,
  X,
  Volume2
} from 'lucide-react';

export const Navbar = () => {
  const { 
    role, 
    switchRole, 
    user, 
    logoutUser, 
    language, 
    toggleLanguage, 
    t, 
    cart, 
    wishlist, 
    notifications,
    speakText 
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const roleFilteredNotifs = notifications.filter(
    (n) => n.forRole === role || role === 'admin'
  );

  // Role buttons never skip authentication: if you are already logged in as
  // that role you go to your dashboard, otherwise you are sent to that role's login page.
  const handleRoleChange = (newRole) => {
    if (role === newRole) {
      if (newRole === 'farmer') navigate('/farmer/dashboard');
      else if (newRole === 'buyer') navigate('/buyer/marketplace');
      else navigate('/admin/dashboard');
      return;
    }
    logoutUser();
    navigate(`/${newRole}/login`);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition transform">
                <Sprout className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 bg-clip-text text-transparent tracking-tight">
                  AgriLink
                </span>
                <span className="block text-[10px] uppercase tracking-widest font-bold text-emerald-600 -mt-1 font-sans">
                  AgriTech Direct Market
                </span>
              </div>
            </Link>
          </div>

          {/* Center Search Bar for Buyer/Landing */}
          {(role === 'buyer' || role === 'guest') && (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={language === 'ta' ? "காய்கறி, பழங்கள், தானியங்கள் தேட..." : "Search vegetables, fruits, grains, location..."}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 focus:bg-white text-sm text-slate-800 rounded-full border border-transparent focus:border-emerald-500 focus:outline-none transition shadow-inner font-tamil"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigate('/buyer/marketplace');
                  }}
                />
              </div>
            </div>
          )}

          {/* Right Navigation & Control Tools */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Quick Demo Role Switcher Badge */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
              <button
                onClick={() => handleRoleChange('farmer')}
                className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                  role === 'farmer' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                <Tractor className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'விவசாயி' : 'Farmer'}</span>
              </button>

              <button
                onClick={() => handleRoleChange('buyer')}
                className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                  role === 'buyer' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'வாடிக்கையாளர்' : 'Buyer'}</span>
              </button>

              <button
                onClick={() => handleRoleChange('admin')}
                className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                  role === 'admin' 
                    ? 'bg-emerald-900 text-white shadow-md' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Language Toggle (English | தமிழ்) */}
            <div className="flex items-center bg-emerald-50 rounded-xl p-1 border border-emerald-200">
              <Globe className="w-4 h-4 text-emerald-700 ml-2 mr-1" />
              <button
                onClick={() => {
                  toggleLanguage('en');
                  speakText("Language switched to English");
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  language === 'en' 
                    ? 'bg-white text-emerald-800 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  toggleLanguage('ta');
                  speakText("தமிழ் மொழி தேர்ந்தெடுக்கப்பட்டது");
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg font-tamil transition ${
                  language === 'ta' 
                    ? 'bg-white text-emerald-800 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* Buyer Specific Links (Cart, Wishlist, Notifications) */}
            {role === 'buyer' && (
              <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                <Link
                  to="/buyer/wishlist"
                  className="relative p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  title="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/buyer/cart"
                  className="relative p-2.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition"
                  title="Shopping Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            )}

            {/* Notification Bell */}
            {role !== 'guest' && (
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition"
                >
                  <Bell className="w-5 h-5" />
                  {roleFilteredNotifs.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping" />
                  )}
                  {roleFilteredNotifs.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full" />
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
                      <h4 className="font-bold text-slate-800 text-sm">{t('notifications')}</h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        {roleFilteredNotifs.length} New
                      </span>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {roleFilteredNotifs.map((n) => (
                        <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/60 transition">
                          <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile Dropdown / Login Button */}
            {role === 'guest' ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/farmer/login"
                  className="px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition"
                >
                  Farmer Login
                </Link>
                <Link
                  to="/buyer/login"
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/30 transition"
                >
                  Buyer Login
                </Link>
                <Link
                  to="/admin/login"
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl transition"
                >
                  Admin Login
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-slate-100 transition border border-slate-200"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-sm">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <div className="text-left hidden xl:block">
                    <span className="block text-xs font-bold text-slate-800 leading-tight">
                      {user?.name || 'User'}
                    </span>
                    <span className="block text-[10px] text-emerald-600 font-semibold uppercase">
                      {role}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-800">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                    </div>

                    <Link
                      to={role === 'farmer' ? '/farmer/profile' : role === 'buyer' ? '/buyer/profile' : '/admin/settings'}
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition font-tamil"
                    >
                      <User className="w-4 h-4" /> {t('profile')}
                    </Link>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logoutUser();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition font-tamil"
                    >
                      <LogOut className="w-4 h-4" /> {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-emerald-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4 animate-fadeIn">
          {/* Language Switcher Mobile */}
          <div className="flex items-center justify-between bg-slate-100 p-2 rounded-xl">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Globe className="w-4 h-4 text-emerald-600" /> Language:
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-3 py-1 text-xs font-bold rounded-lg ${language === 'en' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'}`}
              >
                English
              </button>
              <button
                onClick={() => toggleLanguage('ta')}
                className={`px-3 py-1 text-xs font-bold rounded-lg font-tamil ${language === 'ta' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'}`}
              >
                தமிழ்
              </button>
            </div>
          </div>

          {/* Mobile Role Switching */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Switch Role View</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { handleRoleChange('farmer'); setMobileMenuOpen(false); }}
                className={`p-2 rounded-xl text-xs font-bold text-center ${role === 'farmer' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                Farmer
              </button>
              <button
                onClick={() => { handleRoleChange('buyer'); setMobileMenuOpen(false); }}
                className={`p-2 rounded-xl text-xs font-bold text-center ${role === 'buyer' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                Buyer
              </button>
              <button
                onClick={() => { handleRoleChange('admin'); setMobileMenuOpen(false); }}
                className={`p-2 rounded-xl text-xs font-bold text-center ${role === 'admin' ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
