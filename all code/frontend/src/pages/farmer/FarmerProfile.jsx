import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { User, MapPin, Phone, Mail, Tractor, Star, Edit, Check } from 'lucide-react';

export const FarmerProfile = () => {
  const { user, updateProfile, products, orders, t, language } = useApp();
  const myOrders = orders.filter((o) => o.farmerId === user?.id);
  const myProducts = products.filter((p) => p.farmerId === user?.id);
  const profitOf = (o) => (o.price - (o.costPerKg || 0)) * o.quantity;
  const totalSales = myOrders.reduce((a, o) => a + o.subtotal, 0);
  const totalProfit = myOrders.reduce((a, o) => a + profitOf(o), 0);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'Murugan R.',
    phone: user?.phone || '+91 94431 87654',
    email: user?.email || 'murugan@salemfarm.in',
    location: user?.location || 'Salem',
    district: user?.district || 'Salem',
    state: user?.state || 'Tamil Nadu',
    farmName: user?.farmName || 'Green Valley Farms',
    mainCategory: user?.mainCategory || 'Vegetables'
  });

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto max-w-4xl">
          
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                {user?.photo ? (
                  <img src={user.photo} alt="" className="w-20 h-20 rounded-3xl object-cover shadow-lg" />
                ) : (
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-emerald-600/30">
                    {formData.name[0]}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-black text-slate-900 font-tamil">{formData.name}</h1>
                  <p className="text-xs text-emerald-700 font-bold">{formData.farmName} • {formData.location}</p>
                </div>
              </div>

              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 font-tamil"
              >
                {isEditing ? <><Check className="w-4 h-4" /> Save Profile</> : <><Edit className="w-4 h-4" /> Edit Profile</>}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Farmer Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  ) : (
                    <span className="text-sm font-bold text-slate-800">{formData.name}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Mobile Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  ) : (
                    <span className="text-sm font-bold text-slate-800">{formData.phone}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  ) : (
                    <span className="text-sm font-bold text-slate-800">{formData.email}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Farm Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.farmName}
                      onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  ) : (
                    <span className="text-sm font-bold text-slate-800">{formData.farmName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Location / District</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  ) : (
                    <span className="text-sm font-bold text-slate-800">{formData.location}, {formData.state}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Farmer Rating</label>
                  <div className="flex items-center text-amber-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current mr-1" /> 4.9 (34 Verified Buyer Reviews)
                  </div>
                </div>
              </div>

            </div>

          </div>


          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8 space-y-4">
            <h2 className="text-lg font-black text-slate-900">Sales History & Profit</h2>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-slate-50"><div className="text-[11px] font-bold text-slate-500">Orders</div><div className="text-xl font-black">{myOrders.length}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50"><div className="text-[11px] font-bold text-slate-500">Total Sales</div><div className="text-xl font-black">₹{totalSales}</div></div>
              <div className="p-4 rounded-2xl bg-emerald-50"><div className="text-[11px] font-bold text-emerald-700">Total Profit</div><div className="text-xl font-black text-emerald-700">₹{totalProfit}</div></div>
            </div>
            {myOrders.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No sales yet. Profit appears here once buyers purchase your products.</p>
            ) : (
              <div className="overflow-x-auto"><table className="w-full text-xs text-left">
                <thead><tr className="text-slate-400 border-b"><th className="py-2">Date</th><th>Product</th><th>Qty</th><th>Sold ₹/kg</th><th>Sales</th><th>Profit</th></tr></thead>
                <tbody>{myOrders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-100"><td className="py-2">{o.orderDate}</td><td className="font-bold">{o.productName}</td><td>{o.quantity} {o.unit}</td><td>₹{o.price}</td><td>₹{o.subtotal}</td><td className="font-bold text-emerald-700">₹{profitOf(o)}</td></tr>
                ))}</tbody>
              </table></div>
            )}
            {myProducts.some((p) => p.marketPrice) && (
              <div className="pt-3 border-t border-slate-100"><h3 className="text-xs font-black text-slate-700 mb-2">My Products: Market vs My Price</h3>
                {myProducts.filter((p) => p.marketPrice).map((p) => (
                  <div key={p.id} className="flex justify-between text-xs py-1"><span>{p.name} ({p.quality})</span><span>Market ₹{p.marketPrice} · <b className="text-emerald-700">Mine ₹{p.price}</b></span></div>
                ))}
              </div>
            )}
            {user?.bank && <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">Payout account: {user.bank.name} · ****{String(user.bank.number).slice(-4)} · {user.bank.ifsc} · Aadhaar ****{String(user.aadhaar || '').slice(-4)}</p>}
          </div>
        </main>
      </div>
    </div>
  );
};
