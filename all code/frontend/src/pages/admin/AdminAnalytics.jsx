import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Download, Calendar, FileText, BarChart3 } from 'lucide-react';

export const AdminAnalytics = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-black text-white">System Analytics & Growth Insights</h1>
            <p className="text-xs text-slate-400">Detailed metric analysis for market volume and seller adoption</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Monthly Active Hubs</span>
              <span className="text-3xl font-black text-emerald-400">7 Districts</span>
              <p className="text-xs text-slate-400">Salem, Namakkal, Erode, Coimbatore, Dharmapuri, Krishnagiri, Tiruchengode</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Average Order Fulfillment Time</span>
              <span className="text-3xl font-black text-teal-400">18.4 Hours</span>
              <p className="text-xs text-slate-400">Direct farm pickup to buyer door dispatch</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export const AdminReports = () => {
  const [reportType, setReportType] = useState('Sales Report');
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-09-29');

  const reportList = [
    'Sales Report',
    'Farmer Report',
    'Buyer Report',
    'Product Report',
    'Order Report',
    'Payment Report',
    'Complaint Report'
  ];

  const handleDownload = () => {
    alert(`Downloading ${reportType} (${startDate} to ${endDate}) as CSV/PDF...`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-black text-white">Exportable Audit & System Reports</h1>
            <p className="text-xs text-slate-400">Generate compliance spreadsheets and operational logs with date range filters</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-6 max-w-2xl">
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Select Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none"
                >
                  {reportList.map((rep) => (
                    <option key={rep} value={rep}>{rep}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition"
            >
              <Download className="w-4 h-4" /> Export {reportType} (CSV / Excel)
            </button>

          </div>
        </main>
      </div>
    </div>
  );
};

export const AdminSettings = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <h1 className="text-2xl font-black text-white">System Settings</h1>
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 text-xs space-y-3">
            <p className="font-bold text-emerald-400">AgriLink Platform Version: 2.4.0</p>
            <p className="text-slate-400">Database connection readiness: MongoDB Driver Configured</p>
            <p className="text-slate-400">Express API Gateway Port: 5000</p>
          </div>
        </main>
      </div>
    </div>
  );
};
