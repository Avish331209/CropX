import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { ShieldCheck, Users, Sprout, Package, ShoppingBag, CreditCard, AlertTriangle, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const AdminDashboard = () => {
  const { farmers, buyers, products, orders, complaints, t, language } = useApp();

  const totalFarmers = 1250;
  const totalBuyers = 3420;
  const totalProducts = 5680;
  const totalOrders = 8450;
  const totalRevenue = 12480000;
  const pendingComplaintsCount = complaints.filter(c => c.status !== 'Resolved' && c.status !== 'Approved & Refunded').length;

  const adminAnalyticsData = [
    { month: 'Apr', revenue: 1800000 },
    { month: 'May', revenue: 2200000 },
    { month: 'Jun', revenue: 2500000 },
    { month: 'Jul', revenue: 2800000 },
    { month: 'Aug', revenue: 3100000 },
    { month: 'Sep', revenue: 3500000 }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h1 className="text-3xl font-black text-white font-tamil">{t('adminDashboard')}</h1>
              <p className="text-xs text-slate-400 font-tamil">{t('adminMonitoring')}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30 font-tamil">
              {t('systemStatus')}
            </span>
          </div>

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase font-tamil">{t('totalFarmersCount')}</span>
              <span className="text-3xl font-black text-emerald-400 block">{totalFarmers.toLocaleString()}</span>
              <span className="text-[11px] text-slate-400">Across 7 main hubs in TN</span>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase font-tamil">{t('totalBuyersCount')}</span>
              <span className="text-3xl font-black text-teal-400 block">{totalBuyers.toLocaleString()}</span>
              <span className="text-[11px] text-slate-400">Retailers & direct consumers</span>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase font-tamil">{t('totalProducts')}</span>
              <span className="text-3xl font-black text-indigo-400 block">{totalProducts.toLocaleString()}</span>
              <span className="text-[11px] text-slate-400">Active produce catalog</span>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase font-tamil">{t('totalOrders')}</span>
              <span className="text-3xl font-black text-amber-400 block">{totalOrders.toLocaleString()}</span>
              <span className="text-[11px] text-slate-400">Fulfilled farm logistics</span>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase font-tamil">{t('totalRevenue')}</span>
              <span className="text-3xl font-black text-emerald-400 block">₹{(totalRevenue / 10000000).toFixed(2)} Cr</span>
              <span className="text-[11px] text-slate-400">Direct farm transactions</span>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase font-tamil">{t('pendingComplaints')}</span>
              <span className="text-3xl font-black text-rose-400 block">{pendingComplaintsCount}</span>
              <span className="text-[11px] text-rose-300">Requires refund review</span>
            </div>

          </div>

          {/* Analytics Chart */}
          <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-4">
            <h3 className="font-extrabold text-white text-base">Monthly Platform Revenue Growth (₹)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adminAnalyticsData}>
                  <defs>
                    <linearGradient id="adminColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#adminColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};
