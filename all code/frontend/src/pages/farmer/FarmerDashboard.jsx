import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { VoiceAssistantModal } from '../../components/VoiceAssistantModal';
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Boxes, 
  PlusCircle, 
  Mic, 
  ArrowUpRight, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Volume2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar 
} from 'recharts';

export const FarmerDashboard = () => {
  const { 
    products, 
    orders, 
    user, 
    t, 
    language, 
    updateOrderStatus, 
    isVoiceModalOpen, 
    setIsVoiceModalOpen,
    speakText 
  } = useApp();

  const navigate = useNavigate();

  // Metrics calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 75000);
  const totalStock = products.reduce((sum, p) => sum + Number(p.availableQty || 0), 0);

  // Sales chart mock data
  const salesChartData = [
    { day: 'Mon', sales: 12000 },
    { day: 'Tue', sales: 18000 },
    { day: 'Wed', sales: 15000 },
    { day: 'Thu', sales: 22000 },
    { day: 'Fri', sales: 28000 },
    { day: 'Sat', sales: 34000 },
    { day: 'Sun', sales: 42000 },
  ];

  const topCrops = [
    { name: 'Tomato (தக்காளி)', revenue: 25000, qty: '450 kg' },
    { name: 'Onion (வெங்காயம்)', revenue: 18000, qty: '380 kg' },
    { name: 'Sona Masoori Rice (அரிசி)', revenue: 15000, qty: '250 kg' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
            <div>
              <h1 className="text-2xl font-black text-slate-900 font-tamil">
                {t('welcomeFarmer')}, {user?.name || 'Murugan'} 👋
              </h1>
              <p className="text-xs text-slate-500 font-tamil mt-1">
                {user?.farmName || 'Green Valley Farms'} • {user?.location || 'Salem'}, Tamil Nadu
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Voice Read Aloud Summary Button */}
              <button
                onClick={() => {
                  const speechText = language === 'ta'
                    ? `வணக்கம் விவசாயி. உங்கள் மொத்த விற்பனை ரூபாய் ${totalSales}. மொத்த ஆர்டர்கள் ${totalOrders}.`
                    : `Welcome Farmer. Your total sales are ${totalSales} rupees with ${totalOrders} orders.`;
                  speakText(speechText);
                }}
                className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-2xl border border-emerald-200 transition"
                title="Listen to Summary"
              >
                <Volume2 className="w-5 h-5 text-emerald-700" />
              </button>

              <button
                onClick={() => setIsVoiceModalOpen(true)}
                className="px-4 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs rounded-2xl shadow-md hover:opacity-95 transition flex items-center gap-2 font-tamil"
              >
                <Mic className="w-4 h-4" />
                <span>{t('speakToAddProduct')}</span>
              </button>

              <Link
                to="/farmer/products/add"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-emerald-600/30 transition flex items-center gap-2 font-tamil"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('addProduct')}</span>
              </Link>
            </div>
          </div>

          {/* SUMMARY METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-tamil">{t('totalProducts')}</span>
                <span className="text-3xl font-black text-slate-900 block">{totalProducts}</span>
                <span className="text-[11px] text-emerald-600 font-semibold">Active listings</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Package className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-tamil">{t('totalOrders')}</span>
                <span className="text-3xl font-black text-slate-900 block">{totalOrders}</span>
                <span className="text-[11px] text-emerald-600 font-semibold">+12% this week</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-tamil">{t('totalSales')}</span>
                <span className="text-3xl font-black text-emerald-700 block">₹{totalSales.toLocaleString()}</span>
                <span className="text-[11px] text-emerald-600 font-semibold">Guaranteed payouts</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-tamil">{t('availableStock')}</span>
                <span className="text-3xl font-black text-slate-900 block">{totalStock} kg</span>
                <span className="text-[11px] text-slate-400 font-semibold">Across farm hubs</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Boxes className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>

          </div>

          {/* CHARTS & RECENT ORDERS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sales Analytics Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base font-tamil">
                    {language === 'ta' ? 'விற்பனை வரைபடம் (வாராந்திர)' : 'Weekly Revenue Trends'}
                  </h3>
                  <p className="text-xs text-slate-500">Daily earnings from direct buyer orders</p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                  INR (₹)
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesChartData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Selling Products */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base font-tamil">{t('topSellingProducts')}</h3>

              <div className="space-y-3">
                {topCrops.map((crop, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{crop.name}</h4>
                      <span className="text-[10px] text-slate-500 font-semibold">{crop.qty} sold</span>
                    </div>
                    <span className="text-sm font-extrabold text-emerald-700">₹{crop.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1 font-tamil">
                <p className="font-bold">💡 சந்தை குறிப்பு (Market Tip):</p>
                <p className="text-slate-600">சேலம் பகுதியில் தக்காளி தேவை 20% உயர்ந்துள்ளது.</p>
              </div>
            </div>

          </div>

          {/* RECENT ORDERS TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg font-tamil">{t('recentOrders')}</h3>
                <p className="text-xs text-slate-500">Incoming harvest purchases from buyers</p>
              </div>
              <Link to="/farmer/orders" className="text-xs font-bold text-emerald-700 hover:underline">
                View All Orders →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider">
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Buyer</th>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Quantity</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-emerald-50/40 transition">
                      <td className="p-3.5 font-bold text-slate-900">{order.id}</td>
                      <td className="p-3.5 font-semibold text-slate-700">{order.buyerName}</td>
                      <td className="p-3.5 font-medium text-slate-800">{order.productName}</td>
                      <td className="p-3.5 font-bold">{order.quantity} {order.unit}</td>
                      <td className="p-3.5 font-extrabold text-emerald-700">₹{order.total}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                          order.status === 'Shipped' ? 'bg-teal-100 text-teal-800' :
                          order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="px-2 py-1 bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onParsedResult={(data) => {
          navigate('/farmer/products/add', { state: { prefill: data } });
        }}
      />
    </div>
  );
};
