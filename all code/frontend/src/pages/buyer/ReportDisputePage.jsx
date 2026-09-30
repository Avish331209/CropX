import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AlertTriangle, Upload, CheckCircle2, ArrowLeft, ShieldAlert } from 'lucide-react';

export const ReportDisputePage = () => {
  const { orders, submitComplaint } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const prefilledOrderId = location.state?.orderId || orders[0]?.id || 'ORD-9821';
  const targetOrder = orders.find(o => o.id === prefilledOrderId) || orders[0];

  const [formData, setFormData] = useState({
    orderId: prefilledOrderId,
    issueType: 'Damaged Product',
    damagedQty: 4,
    description: '4 kg of tomatoes were bruised during transit due to improper crate packing.',
    photoUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80'
  });

  const [submitted, setSubmitted] = useState(false);

  const unitPrice = targetOrder ? targetOrder.price : 40;
  const estimatedRefund = Number(formData.damagedQty) * unitPrice;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitComplaint(formData);
      setSubmitted(true);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1 w-full">
        
        <button
          onClick={() => navigate('/buyer/orders')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </button>

        {submitted ? (
          <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-xl text-center space-y-4 my-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Complaint Submitted</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your dispute for Order #{formData.orderId} has been logged. Admin will review the photo proof and process your partial refund of ₹{estimatedRefund}.
            </p>
            <button
              onClick={() => navigate('/buyer/orders')}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Return to My Orders
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8 space-y-6">
            
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900">Report an Issue / Quality Dispute</h1>
                <p className="text-xs text-slate-500">File a claim for damaged or wrong agricultural products</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Order ID</label>
                  <select
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none"
                  >
                    {orders.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.id} - {o.productName} ({o.quantity} kg)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Issue Type</label>
                  <select
                    value={formData.issueType}
                    onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none"
                  >
                    <option value="Damaged Product">Damaged Product</option>
                    <option value="Wrong Quantity">Wrong Quantity</option>
                    <option value="Wrong Product">Wrong Product</option>
                    <option value="Poor Quality">Poor Quality</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Damaged Quantity (kg)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={targetOrder?.quantity || 50}
                    value={formData.damagedQty}
                    onChange={(e) => setFormData({ ...formData, damagedQty: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none"
                  />
                </div>

                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 flex flex-col justify-center">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase">Estimated Partial Refund</span>
                  <span className="text-xl font-black text-emerald-900">₹{estimatedRefund}</span>
                  <span className="text-[10px] text-emerald-700">Calculated @ ₹{unitPrice}/kg</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issue Description</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Explain the damage or quality issue..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>

              {/* Photo Upload Area */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Upload Damage Photo Proof</label>
                <div className="border-2 border-dashed border-rose-200 bg-rose-50/40 p-6 rounded-2xl text-center space-y-2">
                  <Upload className="w-6 h-6 text-rose-500 mx-auto" />
                  <span className="text-xs font-bold text-rose-800 block">Click or Drag & drop photo of damaged produce</span>
                  <span className="text-[10px] text-slate-500">Supports JPG, PNG up to 5MB</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => navigate('/buyer/orders')}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-600/30 transition"
                >
                  Submit Complaint
                </button>
              </div>

            </form>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
