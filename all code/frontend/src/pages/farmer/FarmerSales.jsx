import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { TrendingUp, DollarSign, Award, Calendar } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const FarmerSales = () => {
  const { orders, t, language } = useApp();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 75000);

  const cropSales = [
    { crop: 'Tomato (தக்காளி)', revenue: 25000, qty: '450 kg' },
    { crop: 'Onion (வெங்காயம்)', revenue: 18000, qty: '380 kg' },
    { crop: 'Sona Masoori Rice (அரிசி)', revenue: 15000, qty: '250 kg' },
    { crop: 'Turmeric (மஞ்சள்)', revenue: 12000, qty: '120 kg' },
    { crop: 'Potato (உருளைக்கிழங்கு)', revenue: 5000, qty: '150 kg' }
  ];

  const monthlyTrend = [
    { month: 'May', sales: 45000 },
    { month: 'Jun', sales: 52000 },
    { month: 'Jul', sales: 61000 },
    { month: 'Aug', sales: 68000 },
    { month: 'Sep', sales: totalRevenue }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-tamil">{t('sales')} & {t('analytics')}</h1>
            <p className="text-xs text-slate-500 font-tamil">
              {language === 'ta' ? 'வருவாய் மற்றும் பயிர் விற்பனை புள்ளிவிவரங்கள்' : 'Revenue, crop breakdown, and financial growth performance'}
            </p>
          </div>

          {/* Revenue Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Revenue</span>
              <span className="text-3xl font-black text-emerald-700 block">₹{totalRevenue.toLocaleString()}</span>
              <span className="text-[11px] text-emerald-600 font-semibold">Direct bank credit</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Daily Sales</span>
              <span className="text-3xl font-black text-slate-900 block">₹4,200</span>
              <span className="text-[11px] text-slate-400 font-semibold">Average per day</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Weekly Sales</span>
              <span className="text-3xl font-black text-slate-900 block">₹28,500</span>
              <span className="text-[11px] text-emerald-600 font-semibold">+18% growth</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Monthly Sales</span>
              <span className="text-3xl font-black text-slate-900 block">₹75,000</span>
              <span className="text-[11px] text-slate-400 font-semibold">September 2026</span>
            </div>
          </div>

          {/* Charts & Crop breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Monthly Revenue Trend (₹)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#16a34a" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Best Selling Produce Revenue</h3>
              <div className="space-y-3">
                {cropSales.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                        #{idx + 1}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">{item.crop}</span>
                        <span className="text-[10px] text-slate-500 font-semibold">{item.qty} sold</span>
                      </div>
                    </div>
                    <span className="text-sm font-black text-emerald-700">₹{item.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};
