import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ShoppingBag, Truck, AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react';

export const BuyerOrders = () => {
  const { orders, user } = useApp();
  const navigate = useNavigate();

  const userOrders = orders.filter(o => o.buyerName === user?.name || o.buyerId === user?.id || true);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">My Orders History</h1>
            <p className="text-xs text-slate-500">Track shipments, view farm invoice history, and report quality issues</p>
          </div>

          <Link
            to="/buyer/dispute"
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4 text-rose-600" /> Report Quality Issue / Complaint
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider">
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Products</th>
                <th className="p-3.5">Farmer Hub</th>
                <th className="p-3.5">Quantity</th>
                <th className="p-3.5">Total Paid</th>
                <th className="p-3.5">Order Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {userOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition">
                  <td className="p-3.5 font-bold text-slate-900">{order.id}</td>
                  <td className="p-3.5 flex items-center gap-3">
                    <img src={order.productImage} alt={order.productName} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <span className="font-bold text-slate-800 block">{order.productName}</span>
                      <span className="text-[10px] text-slate-400">TXN: {order.transactionId}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">{order.farmerName} ({order.city || 'Salem'})</td>
                  <td className="p-3.5 font-bold">{order.quantity} {order.unit}</td>
                  <td className="p-3.5 font-black text-emerald-700 text-sm">₹{order.total}</td>
                  <td className="p-3.5 text-slate-500">{order.orderDate}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                      order.status === 'Shipped' ? 'bg-teal-100 text-teal-800' :
                      order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => navigate(`/buyer/orders/${order.id}`)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
                    >
                      Track Order
                    </button>
                    <button
                      onClick={() => navigate(`/buyer/dispute`, { state: { orderId: order.id } })}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition"
                    >
                      Report Issue
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
};
