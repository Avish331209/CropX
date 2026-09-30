import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CheckCircle2, Truck, Package, MapPin, ArrowLeft, Clock } from 'lucide-react';

export const OrderTrackingPage = () => {
  const { id } = useParams();
  const { orders } = useApp();
  const navigate = useNavigate();

  const order = orders.find(o => o.id === id) || orders[0];

  const steps = [
    { title: "Confirmed", key: "Confirmed", icon: CheckCircle2 },
    { title: "Packed", key: "Packed", icon: Package },
    { title: "Shipped", key: "Shipped", icon: Truck },
    { title: "Out for Delivery", key: "Out for Delivery", icon: MapPin },
    { title: "Delivered", key: "Delivered", icon: CheckCircle2 }
  ];

  const orderStatuses = ["Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"];
  const currentIdx = orderStatuses.indexOf(order.status);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        
        <button
          onClick={() => navigate('/buyer/orders')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders List
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Live Logistics Tracker</span>
              <h1 className="text-3xl font-black text-slate-900">Order #{order.id}</h1>
              <p className="text-xs text-slate-500 mt-1">Placed on {order.orderDate} • Farmer: {order.farmerName}</p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 font-bold block uppercase">Current Status</span>
              <span className="px-4 py-1.5 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-full inline-block mt-1">
                {order.status}
              </span>
            </div>
          </div>

          {/* VISUAL STEP PROGRESS BAR */}
          <div className="py-6 px-2">
            <div className="relative flex items-center justify-between">
              
              {/* Connecting Background Line */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-slate-100 -z-0">
                <div 
                  className="h-full bg-emerald-600 transition-all duration-700" 
                  style={{ width: `${(Math.max(0, currentIdx) / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {/* Step Nodes */}
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div key={step.key} className="relative z-10 flex flex-col items-center">
                    <div 
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${
                        isCompleted 
                          ? 'bg-emerald-600 text-white shadow-emerald-600/30' 
                          : 'bg-white border-2 border-slate-200 text-slate-400'
                      } ${isCurrent ? 'ring-4 ring-emerald-200 scale-110' : ''}`}
                    >
                      <Icon className="w-6 h-6 stroke-[2.5]" />
                    </div>

                    <span className={`mt-3 text-xs font-bold text-center ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Product Summary */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={order.productImage} alt={order.productName} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">{order.productName}</h4>
                <p className="text-xs text-slate-500">{order.quantity} {order.unit} @ ₹{order.price}/kg</p>
                <p className="text-[11px] text-emerald-700 font-bold mt-0.5">Shipping to: {order.buyerAddress}, {order.city}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block font-bold">Total Invoice</span>
              <span className="text-xl font-black text-emerald-800">₹{order.total}</span>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
