import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { MapPin, CreditCard, ShieldCheck, CheckCircle2, QrCode, Banknote, Sparkles } from 'lucide-react';

export const BuyerCheckout = () => {
  const { cart, user, placeOrder } = useApp();
  const navigate = useNavigate();

  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: user?.name || 'Rajesh Kumar',
    mobile: user?.phone || '+91 98765 43210',
    deliveryAddress: user?.address || '45 Gandhi Road, Fairlands',
    city: user?.city || 'Salem',
    pincode: user?.pincode || '636016',
    paymentMethod: 'Online',
    upiApp: 'GPay'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const grandTotal = subtotal + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(async () => {
      try {
        const createdId = await placeOrder(deliveryInfo);
        setOrderSuccess(createdId);
      } catch (err) {
        alert(err.message); // e.g. "Not enough stock available for this product."
      } finally {
        setIsProcessing(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        
        {orderSuccess ? (
          /* Payment & Order Success Modal View */
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 border border-emerald-200 shadow-2xl text-center space-y-6 animate-fadeIn my-12">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">{deliveryInfo.paymentMethod === 'Cash on Delivery' ? 'Order Confirmed' : 'Payment Successful'}</span>
              <h2 className="text-3xl font-black text-slate-900">Order #{orderSuccess} Placed!</h2>
              <p className="text-xs text-slate-500">
                Your direct farm produce order has been transmitted to the farmer. You can track real-time packing and delivery steps.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between font-semibold text-slate-700">
                <span>Payment Mode:</span>
                <span className="font-bold text-slate-900">{deliveryInfo.paymentMethod === 'Online' ? `Online (${deliveryInfo.upiApp})` : deliveryInfo.paymentMethod}</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-700">
                <span>{deliveryInfo.paymentMethod === 'Cash on Delivery' ? 'Amount to Pay on Delivery:' : 'Total Amount Paid:'}</span>
                <span className="font-extrabold text-emerald-700">₹{grandTotal}</span>
              </div>
            </div>

            <p className="text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl py-2.5">📱 Bill sent by SMS to your mobile {deliveryInfo.mobile} and to the farmer.</p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/buyer/orders/${orderSuccess}`)}
                className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition"
              >
                Track Order Timeline
              </button>

              <button
                onClick={() => navigate('/buyer/orders')}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                View My Orders
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-6">
              
              {/* 1. Delivery Address */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-extrabold text-slate-900 text-base">1. Delivery Address</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={deliveryInfo.fullName}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Phone</label>
                    <input
                      type="text"
                      required
                      value={deliveryInfo.mobile}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={deliveryInfo.deliveryAddress}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, deliveryAddress: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={deliveryInfo.city}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      value={deliveryInfo.pincode}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Payment Method */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-extrabold text-slate-900 text-base">2. Payment Method</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[{ id: 'Online', label: 'Online Payment', icon: QrCode }, { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote }].map((pm) => {
                    const Icon = pm.icon; const isSel = deliveryInfo.paymentMethod === pm.id;
                    return (
                      <button key={pm.id} type="button" onClick={() => setDeliveryInfo({ ...deliveryInfo, paymentMethod: pm.id })}
                        className={`p-4 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-2 ${isSel ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 ring-2 ring-emerald-300 font-bold' : 'border-slate-200 hover:border-emerald-300 text-slate-600'}`}>
                        <Icon className="w-5 h-5" /><span className="text-xs">{pm.label}</span>
                      </button>
                    );
                  })}
                </div>

                {deliveryInfo.paymentMethod === 'Online' && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pay using</span>
                    <div className="grid grid-cols-3 gap-3">
                      {['GPay', 'Paytm', 'PhonePe'].map((app) => (
                        <button key={app} type="button" onClick={() => setDeliveryInfo({ ...deliveryInfo, upiApp: app })}
                          className={`py-3 rounded-xl border text-xs font-bold transition ${deliveryInfo.upiApp === app ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-300' : 'border-slate-200 text-slate-600 hover:border-emerald-300'}`}>
                          {app}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400">Demo payment: no real money is charged. A live gateway (Razorpay/PhonePe) must be connected for real UPI payments.</p>
                  </div>
                )}
              </div>

            </div>

            {/* 3. Order Summary & Place Order */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 h-fit">
              <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">3. Order Summary</h3>

              <div className="space-y-3 max-h-48 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800 block">{item.name}</span>
                      <span className="text-[10px] text-slate-400">{item.quantity} kg @ ₹{item.price}</span>
                    </div>
                    <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100 text-xs font-semibold">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Logistics Delivery</span>
                  <span className="font-bold text-slate-900">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Amount</span>
                  <span className="text-emerald-700">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Processing Secure Payment...</span>
                ) : (
                  <span>Place Order (₹{grandTotal})</span>
                )}
              </button>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
