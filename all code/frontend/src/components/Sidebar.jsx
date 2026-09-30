import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  ShoppingBag, 
  Boxes, 
  TrendingUp, 
  BarChart3, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Users, 
  CreditCard, 
  AlertTriangle, 
  FolderTree, 
  FileText,
  Mic,
  Sprout
} from 'lucide-react';

export const Sidebar = () => {
  const { role, t, language, logoutUser, setIsVoiceModalOpen } = useApp();
  const navigate = useNavigate();

  const farmerNavItems = [
    { path: '/farmer/dashboard', labelKey: 'dashboard', icon: LayoutDashboard },
    { path: '/farmer/products', labelKey: 'myProducts', icon: Package },
    { path: '/farmer/products/add', labelKey: 'addProduct', icon: PlusCircle },
    { path: '/farmer/orders', labelKey: 'orders', icon: ShoppingBag },
    { path: '/farmer/inventory', labelKey: 'inventory', icon: Boxes },
    { path: '/farmer/sales', labelKey: 'sales', icon: TrendingUp },
    { path: '/farmer/analytics', labelKey: 'analytics', icon: BarChart3 },
    { path: '/farmer/notifications', labelKey: 'notifications', icon: Bell },
    { path: '/farmer/profile', labelKey: 'profile', icon: User },
    { path: '/farmer/settings', labelKey: 'settings', icon: Settings }
  ];

  const adminNavItems = [
    { path: '/admin/dashboard', labelKey: 'dashboard', icon: LayoutDashboard },
    { path: '/admin/farmers', labelKey: 'farmers', icon: Sprout },
    { path: '/admin/buyers', labelKey: 'buyers', icon: Users },
    { path: '/admin/products', labelKey: 'products', icon: Package },
    { path: '/admin/orders', labelKey: 'orders', icon: ShoppingBag },
    { path: '/admin/payments', labelKey: 'payments', icon: CreditCard },
    { path: '/admin/complaints', labelKey: 'complaints', icon: AlertTriangle },
    { path: '/admin/categories', labelKey: 'categories', icon: FolderTree },
    { path: '/admin/analytics', labelKey: 'analytics', icon: BarChart3 },
    { path: '/admin/reports', labelKey: 'reports', icon: FileText },
    { path: '/admin/notifications', labelKey: 'notifications', icon: Bell },
    { path: '/admin/settings', labelKey: 'settings', icon: Settings }
  ];

  const navItems = role === 'farmer' ? farmerNavItems : adminNavItems;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 shrink-0 min-h-[calc(100vh-5rem)] flex flex-col justify-between p-4">
      
      <div className="space-y-6">
        
        {/* Voice Assistant Launcher Banner for Farmer */}
        {role === 'farmer' && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 rounded-2xl text-white shadow-lg shadow-emerald-600/20 relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-2 translate-y-2 pointer-events-none">
              <Mic className="w-24 h-24" />
            </div>
            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white/20 text-emerald-100 uppercase tracking-wider font-tamil">
                🎙️ {language === 'ta' ? 'குரல் உள்ளீடு' : 'Voice Assistant'}
              </span>
              <p className="text-xs font-semibold text-emerald-50 leading-snug font-tamil">
                {t('speakToAddProduct')}
              </p>
              <button
                type="button"
                onClick={() => setIsVoiceModalOpen(true)}
                className="w-full py-2 bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition font-tamil"
              >
                <Mic className="w-4 h-4 text-emerald-600" />
                <span>{language === 'ta' ? 'மைக்கில் பேசவும்' : 'Tap to Speak'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Section */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-sans">
            {role === 'farmer' ? (language === 'ta' ? 'விவசாயி போர்ட்டல்' : 'FARMER PORTAL') : 'ADMIN PORTAL'}
          </span>

          <nav className="space-y-1 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const displayLabel = item.labelKey ? t(item.labelKey) : item.label;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition duration-200 font-tamil ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                  <span>{displayLabel}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Logout button at bottom */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={() => {
            logoutUser();
            navigate('/');
          }}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition font-tamil"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('logout')}</span>
        </button>
      </div>

    </aside>
  );
};
