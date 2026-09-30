import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { AlertTriangle, CheckCircle2, XCircle, ShieldAlert } from 'lucide-react';

export const AdminComplaints = () => {
  const { complaints, resolveComplaint, t, language } = useApp();
  const [activeComplaintModal, setActiveComplaintModal] = useState(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          
          <div>
            <h1 className="text-2xl font-black text-white font-tamil">{t('disputeResolutionCenter')}</h1>
            <p className="text-xs text-slate-400 font-tamil">Review damaged product claims, inspect photos, and authorize partial refunds</p>
          </div>

          <div className="bg-slate-800/80 rounded-3xl border border-slate-700 shadow-xl p-6 overflow-x-auto">
            <table className="w-full text-left text-xs font-tamil">
              <thead>
                <tr className="bg-slate-900/60 text-slate-400 font-bold border-b border-slate-700 uppercase tracking-wider">
                  <th className="p-3.5">Complaint ID</th>
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">{t('buyerName')}</th>
                  <th className="p-3.5">{t('farmerName')}</th>
                  <th className="p-3.5">Issue Type</th>
                  <th className="p-3.5">Damaged Qty</th>
                  <th className="p-3.5">Claimed Refund</th>
                  <th className="p-3.5">{t('status')}</th>
                  <th className="p-3.5 text-right">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {complaints.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800 transition">
                    <td className="p-3.5 font-bold text-rose-400">{c.id}</td>
                    <td className="p-3.5 font-bold text-white">{c.orderId}</td>
                    <td className="p-3.5 text-slate-300 font-semibold">{c.buyerName}</td>
                    <td className="p-3.5 text-slate-400">{c.farmerName}</td>
                    <td className="p-3.5 font-bold text-amber-400">{c.issueType}</td>
                    <td className="p-3.5 font-bold">{c.damagedQty} kg</td>
                    <td className="p-3.5 font-black text-emerald-400 text-sm">₹{c.refundAmount}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        c.status.includes('Approved') ? 'bg-emerald-500/20 text-emerald-400' :
                        c.status === 'Rejected' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setActiveComplaintModal(c)}
                        className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg"
                      >
                        View Claim
                      </button>
                      <button
                        onClick={() => resolveComplaint(c.id, 'Approved')}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg"
                      >
                        Approve Refund
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal Claim Viewer */}
          {activeComplaintModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <div className="bg-slate-800 rounded-3xl border border-slate-700 p-6 max-w-lg w-full space-y-4 text-white">
                <h3 className="text-xl font-bold">Dispute Details #{activeComplaintModal.id}</h3>
                <p className="text-xs text-slate-400">{activeComplaintModal.description}</p>
                <img src={activeComplaintModal.photoUrl} alt="Damage Proof" className="w-full h-48 object-cover rounded-xl border border-slate-700" />
                <div className="flex justify-end gap-2 pt-4">
                  <button onClick={() => setActiveComplaintModal(null)} className="px-4 py-2 bg-slate-700 text-xs font-bold rounded-xl">Close</button>
                  <button onClick={() => { resolveComplaint(activeComplaintModal.id, 'Approved'); setActiveComplaintModal(null); }} className="px-4 py-2 bg-emerald-600 text-xs font-bold rounded-xl">Authorize ₹{activeComplaintModal.refundAmount} Refund</button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
