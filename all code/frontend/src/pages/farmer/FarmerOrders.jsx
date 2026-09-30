import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { ShoppingBag, Truck, Check, Clock, Filter } from 'lucide-react';

export const FarmerOrders = () => {
  const { orders, updateOrderStatus, t, language } = useApp();
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = orders.filter(o => statusFilter === 'All' || o.status === statusFilter);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 font-tamil">{t('orders')}</h1>
              <p className="text-xs text-slate-500 font-tamil">
                {language === 'ta' ? 'வந்த ஆர்டர்கள் மற்றும் நிலைகளை புதுப்பிக்கலாம்' : 'Incoming harvest orders from buyers across India'}
              </p>
            </div>

            {/* Filter Pill */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200">
              <Filter className="w-4 h-4 text-slate-400 ml-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none pr-2"
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-x-auto space-y-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider">
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">Buyer Details</th>
                  <th className="p-3.5">Product Purchased</th>
                  <th className="p-3.5">Quantity</th>
                  <th className="p-3.5">Price/kg</th>
                  <th className="p-3.5">Total Amount</th>
                  <th className="p-3.5">Order Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Update Order Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-slate-900">{order.id}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-800 block">{order.buyerName}</span>
                      <span className="text-[10px] text-slate-400">{order.city} • {order.buyerPhone}</span>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800">{order.productName}</td>
                    <td className="p-3.5 font-bold">{order.quantity} {order.unit}</td>
                    <td className="p-3.5 font-medium">₹{order.price}</td>
                    <td className="p-3.5 font-black text-emerald-700 text-sm">₹{order.total}</td>
                    <td className="p-3.5 text-[11px] text-slate-500">{order.orderDate}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                        order.status === 'Shipped' ? 'bg-teal-100 text-teal-800' :
                        order.status === 'Packed' ? 'bg-indigo-100 text-indigo-800' :
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
                        className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 border border-slate-300 focus:border-emerald-500 rounded-xl text-xs font-bold text-slate-800 focus:outline-none transition"
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

        </main>
      </div>
    </div>
  );
};
