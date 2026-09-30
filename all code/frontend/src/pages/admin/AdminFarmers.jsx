import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Check, X, ShieldAlert, Eye, Search } from 'lucide-react';

export const AdminFarmers = () => {
  const { farmers, setFarmerStatus, t, language } = useApp();
  const [search, setSearch] = useState('');

  const toggleStatus = (id, newStatus) => setFarmerStatus(id, newStatus);

  const filteredFarmers = farmers.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-white font-tamil">{t('farmerApprovalMgmt')}</h1>
              <p className="text-xs text-slate-400 font-tamil">Manage agricultural producer accreditations and account statuses</p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search farmers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none font-tamil"
              />
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-3xl border border-slate-700 shadow-xl p-6 overflow-x-auto">
            <table className="w-full text-left text-xs font-tamil">
              <thead>
                <tr className="bg-slate-900/60 text-slate-400 font-bold border-b border-slate-700 uppercase tracking-wider">
                  <th className="p-3.5">Farmer ID</th>
                  <th className="p-3.5">{t('farmerName')}</th>
                  <th className="p-3.5">{t('location')}</th>
                  <th className="p-3.5">{t('category')}</th>
                  <th className="p-3.5">{t('orders')}</th>
                  <th className="p-3.5">{t('status')}</th>
                  <th className="p-3.5 text-right">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {filteredFarmers.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-800 transition">
                    <td className="p-3.5 font-bold text-emerald-400">{f.id}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-white block">{f.name}</span>
                      <span className="text-[10px] text-slate-400">{f.farmName}</span>
                    </td>
                    <td className="p-3.5 text-slate-300 font-semibold">{f.location}, {f.state}</td>
                    <td className="p-3.5 font-medium">{f.mainCategory}</td>
                    <td className="p-3.5 font-bold text-teal-400">{f.ordersCount} orders</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        f.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {f.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => alert(`Farmer Details: ${f.name} (${f.phone})`)}
                        className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg"
                      >
                        View
                      </button>
                      {f.status !== 'Approved' ? (
                        <button
                          onClick={() => toggleStatus(f.id, 'Approved')}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleStatus(f.id, 'Suspended')}
                          className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg"
                        >
                          Suspend
                        </button>
                      )}
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

export const AdminBuyers = () => {
  const { buyers, setBuyerStatus, t, language } = useApp();

  const toggleBuyerStatus = (id) => {
    const buyer = buyers.find((b) => b.id === id);
    setBuyerStatus(id, buyer?.status === 'Active' ? 'Suspended' : 'Active');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-black text-white font-tamil">{t('buyerDirectoryMgmt')}</h1>
            <p className="text-xs text-slate-400 font-tamil">Monitor active buyers, retailers, and account statuses</p>
          </div>

          <div className="bg-slate-800/80 rounded-3xl border border-slate-700 shadow-xl p-6 overflow-x-auto">
            <table className="w-full text-left text-xs font-tamil">
              <thead>
                <tr className="bg-slate-900/60 text-slate-400 font-bold border-b border-slate-700 uppercase tracking-wider">
                  <th className="p-3.5">Buyer ID</th>
                  <th className="p-3.5">{t('buyerName')}</th>
                  <th className="p-3.5">{t('location')}</th>
                  <th className="p-3.5">{t('orders')}</th>
                  <th className="p-3.5">{t('totalSpending')}</th>
                  <th className="p-3.5">{t('status')}</th>
                  <th className="p-3.5 text-right">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {buyers.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800 transition">
                    <td className="p-3.5 font-bold text-emerald-400">{b.id}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-white block">{b.name}</span>
                      <span className="text-[10px] text-slate-400">{b.email}</span>
                    </td>
                    <td className="p-3.5 text-slate-300 font-semibold">{b.city}, {b.state}</td>
                    <td className="p-3.5 font-bold">{b.ordersCount} orders</td>
                    <td className="p-3.5 font-black text-emerald-400">₹{b.totalSpent?.toLocaleString()}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button onClick={() => alert(`Buyer: ${b.name}`)} className="px-3 py-1 bg-slate-700 text-white font-bold rounded-lg">View</button>
                      <button onClick={() => toggleBuyerStatus(b.id)} className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg">
                        {b.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
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
