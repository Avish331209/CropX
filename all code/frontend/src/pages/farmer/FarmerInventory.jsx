import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Boxes, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export const FarmerInventory = () => {
  const { products, t, language } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-tamil">{t('inventory')}</h1>
            <p className="text-xs text-slate-500 font-tamil">
              {language === 'ta' ? 'சரக்கு இருப்பு கண்காணிப்பு மற்றும் இருப்பு நிலைகள்' : 'Monitor harvest quantities, sold stocks and automated reorder alerts'}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-x-auto space-y-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider">
                  <th className="p-4">Crop Produce</th>
                  <th className="p-4">Available Quantity</th>
                  <th className="p-4">Sold Quantity</th>
                  <th className="p-4">Stock Health Visual Indicator</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((item) => {
                  const total = (item.availableQty || 0) + (item.soldQty || 0);
                  const availablePercent = total > 0 ? Math.round((item.availableQty / total) * 100) : 0;

                  return (
                    <tr key={item.id} className="hover:bg-emerald-50/30 transition">
                      <td className="p-4 flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <span className="font-bold text-slate-900 block">{item.name}</span>
                          <span className="text-[10px] text-slate-400">{item.category} • ₹{item.price}/kg</span>
                        </div>
                      </td>
                      <td className="p-4 font-black text-slate-900 text-sm">{item.availableQty} kg</td>
                      <td className="p-4 font-bold text-emerald-700">{item.soldQty || 0} kg</td>
                      <td className="p-4 min-w-[200px]">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-slate-500">
                            <span>{availablePercent}% Available</span>
                            <span>{item.availableQty} / {total} kg</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                availablePercent < 15 ? 'bg-rose-500' :
                                availablePercent < 40 ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${availablePercent}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold ${
                          item.status === 'In Stock' ? 'bg-emerald-100 text-emerald-800' :
                          item.status === 'Low Stock' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {item.status === 'In Stock' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          {item.status === 'Low Stock' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                          {item.status === 'Out of Stock' && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                          <span>{item.status}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};
