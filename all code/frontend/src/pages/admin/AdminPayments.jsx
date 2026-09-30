import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { CreditCard, DollarSign } from 'lucide-react';

export const AdminPayments = () => {
  const { orders, t, language } = useApp();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-black text-white font-tamil">{t('financialTransactions')}</h1>
            <p className="text-xs text-slate-400 font-tamil">Transaction logs, bank settlements, and escrow payment statuses</p>
          </div>

          <div className="bg-slate-800/80 rounded-3xl border border-slate-700 shadow-xl p-6 overflow-x-auto">
            <table className="w-full text-left text-xs font-tamil">
              <thead>
                <tr className="bg-slate-900/60 text-slate-400 font-bold border-b border-slate-700 uppercase tracking-wider">
                  <th className="p-3.5">Transaction ID</th>
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">{t('buyerName')}</th>
                  <th className="p-3.5">{t('farmerName')}</th>
                  <th className="p-3.5">{t('amount')}</th>
                  <th className="p-3.5">{t('method')}</th>
                  <th className="p-3.5">{t('status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-800 transition">
                    <td className="p-3.5 font-bold text-emerald-400">{o.transactionId || 'TXN-88492019'}</td>
                    <td className="p-3.5 font-bold text-white">{o.id}</td>
                    <td className="p-3.5 text-slate-300">{o.buyerName}</td>
                    <td className="p-3.5 text-slate-400">{o.farmerName}</td>
                    <td className="p-3.5 font-black text-emerald-400 text-sm">₹{o.total}</td>
                    <td className="p-3.5 font-semibold text-slate-300">{o.paymentMethod}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        {o.paymentStatus}
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

export const AdminCategories = () => {
  const { categories, addCategory, removeCategory } = useApp();

  const handleAddCategory = () => {
    const name = prompt("Enter new Category Name:");
    if (name) addCategory(name);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-white">Crop Category Management</h1>
              <p className="text-xs text-slate-400">Create, rename, or reorganize marketplace produce categories</p>
            </div>
            <button onClick={handleAddCategory} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow">
              + Add Category
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-xl flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                  <span className="text-xs text-emerald-400 font-tamil">{cat.nameTa}</span>
                  <span className="text-xs text-slate-400 block mt-1">{cat.count || 24} produce listed</span>
                </div>
                <button
                  onClick={() => removeCategory(cat.id)}
                  className="px-3 py-1 bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white font-bold text-xs rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
