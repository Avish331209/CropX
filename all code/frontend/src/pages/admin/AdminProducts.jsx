import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Trash2, Eye, CheckCircle2 } from 'lucide-react';

export const AdminProducts = () => {
  const { products, deleteProduct, t, language } = useApp();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-black text-white font-tamil">{t('productCatalogMgmt')}</h1>
            <p className="text-xs text-slate-400 font-tamil">Inspect listed crops, compliance with pesticide standards, and pricing</p>
          </div>

          <div className="bg-slate-800/80 rounded-3xl border border-slate-700 shadow-xl p-6 overflow-x-auto">
            <table className="w-full text-left text-xs font-tamil">
              <thead>
                <tr className="bg-slate-900/60 text-slate-400 font-bold border-b border-slate-700 uppercase tracking-wider">
                  <th className="p-3.5">{t('products')}</th>
                  <th className="p-3.5">{t('farmerName')}</th>
                  <th className="p-3.5">{t('category')}</th>
                  <th className="p-3.5">{t('price')}</th>
                  <th className="p-3.5">{t('availableQty')}</th>
                  <th className="p-3.5">{t('status')}</th>
                  <th className="p-3.5 text-right">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800 transition">
                    <td className="p-3.5 flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-white block">{p.name}</span>
                        <span className="text-[10px] text-slate-400">{p.location}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-slate-300">{p.farmerName}</td>
                    <td className="p-3.5 font-semibold text-emerald-400">{p.category}</td>
                    <td className="p-3.5 font-black text-white">₹{p.price}/kg</td>
                    <td className="p-3.5 font-bold">{p.availableQty} kg</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button onClick={() => alert(`Product: ${p.name}`)} className="px-3 py-1 bg-slate-700 text-white font-bold rounded-lg">{t('view')}</button>
                      <button onClick={() => deleteProduct(p.id)} className="px-3 py-1 bg-rose-600 text-white font-bold rounded-lg">{t('remove')}</button>
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

export const AdminOrders = () => {
  const { orders, updateOrderStatus, t, language } = useApp();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-black text-white font-tamil">{t('orders')}</h1>
            <p className="text-xs text-slate-400 font-tamil">Real-time fulfillment tracking for all buyer-farmer transactions</p>
          </div>

          <div className="bg-slate-800/80 rounded-3xl border border-slate-700 shadow-xl p-6 overflow-x-auto">
            <table className="w-full text-left text-xs font-tamil">
              <thead>
                <tr className="bg-slate-900/60 text-slate-400 font-bold border-b border-slate-700 uppercase tracking-wider">
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">{t('buyerName')}</th>
                  <th className="p-3.5">{t('farmerName')}</th>
                  <th className="p-3.5">{t('products')}</th>
                  <th className="p-3.5">{t('amount')}</th>
                  <th className="p-3.5">{t('payment')}</th>
                  <th className="p-3.5">{t('status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-800 transition">
                    <td className="p-3.5 font-bold text-emerald-400">{o.id}</td>
                    <td className="p-3.5 font-bold text-white">{o.buyerName}</td>
                    <td className="p-3.5 text-slate-300">{o.farmerName}</td>
                    <td className="p-3.5 font-medium">{o.productName} ({o.quantity} kg)</td>
                    <td className="p-3.5 font-black text-emerald-400 text-sm">₹{o.total}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-slate-200">
                        {o.paymentStatus} ({o.paymentMethod})
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        {o.status}
                      </span>
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
