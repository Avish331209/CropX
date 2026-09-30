import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_PRODUCTS } from '../data/mockData';

// Shared look for every login / registration page.
// Palette: paddy #0E3B2B, turmeric #F2B21B, rice #F6F7F1, ink #14201A
export const authInput =
  'w-full px-4 py-3 bg-white border border-[#d5dacb] rounded-lg text-sm text-[#14201A] placeholder:text-[#9aa08c] focus:border-[#0E3B2B] focus:outline-none focus:ring-2 focus:ring-[#F2B21B]/60';
export const authButton =
  'w-full py-3.5 bg-[#0E3B2B] hover:bg-[#164d3a] disabled:opacity-40 text-white font-bold text-sm rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B21B] focus-visible:ring-offset-2';

export const AuthField = ({ label, children }) => (
  <div>
    <label className="block text-sm font-semibold text-[#14201A] mb-1.5">{label}</label>
    {children}
  </div>
);

const ROLES = [
  { id: 'farmer', en: 'Farmer', ta: 'விவசாயி', to: '/farmer/login' },
  { id: 'buyer', en: 'Buyer', ta: 'வாங்குவோர்', to: '/buyer/login' },
  { id: 'admin', en: 'Admin', ta: 'நிர்வாகி', to: '/admin/login' },
];

const RateBoard = () => {
  const rows = INITIAL_PRODUCTS.slice(0, 6);
  return (
    <div className="w-full max-w-sm">
      <h2 className="font-tamil text-3xl font-bold text-white leading-tight">இன்றைய விலை</h2>
      <p className="text-[#F2B21B] font-semibold mt-1">Today's farm rates</p>
      <ul className="mt-8 space-y-4">
        {rows.map((p, i) => (
          <li key={p.id} className="rate-row flex items-baseline gap-3" style={{ animationDelay: `${i * 90}ms` }}>
            <span className="min-w-0">
              <span className="block font-tamil text-[15px] text-white truncate">{p.nameTa}</span>
              <span className="block text-xs text-white/55 truncate">{p.name}</span>
            </span>
            <span className="flex-1 border-b-2 border-dotted border-white/25 translate-y-[-4px]" aria-hidden="true" />
            <span className="font-heading text-xl font-bold text-[#F2B21B] whitespace-nowrap">
              ₹{p.price}<span className="text-xs font-medium text-white/60">/{p.unit}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs text-white/55 leading-relaxed">Listed by farmers in Tamil Nadu. Buyers pay these prices directly, with no middleman.</p>
    </div>
  );
};

export const AuthShell = ({ role, title, sub, children }) => {
  const { language } = useApp();
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] bg-[#F6F7F1] text-[#14201A]">
      <aside className="hidden lg:flex flex-col justify-between bg-[#0E3B2B] px-12 py-10 lg:sticky lg:top-0 lg:h-screen">
        <Link to="/" className="flex items-center gap-2.5 text-white w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B21B] rounded">
          <span className="w-9 h-9 rounded-lg bg-[#F2B21B] text-[#0E3B2B] flex items-center justify-center"><Sprout className="w-5 h-5" /></span>
          <span className="font-heading text-xl font-bold">AgriLink</span>
        </Link>
        <RateBoard />
        <span className="text-xs text-white/40">Salem · Erode · Coimbatore · Madurai</span>
      </aside>

      <main className="flex flex-col px-5 sm:px-10 py-8 lg:py-10">
        <Link to="/" className="lg:hidden flex items-center gap-2 mb-8 w-fit">
          <span className="w-8 h-8 rounded-lg bg-[#0E3B2B] text-[#F2B21B] flex items-center justify-center"><Sprout className="w-4 h-4" /></span>
          <span className="font-heading text-lg font-bold">AgriLink</span>
        </Link>

        <div className="w-full max-w-md mx-auto my-auto">
          <nav aria-label="Choose account type" className="flex border-b border-[#d5dacb] mb-8">
            {ROLES.map((r) => (
              <Link key={r.id} to={r.to} aria-current={r.id === role ? 'page' : undefined}
                className={`flex-1 pb-3 text-center -mb-px border-b-[3px] transition focus:outline-none focus-visible:bg-[#F2B21B]/20 ${r.id === role ? 'border-[#F2B21B] text-[#14201A] font-bold' : 'border-transparent text-[#6B6F5E] hover:text-[#14201A]'}`}>
                <span className="block text-sm">{r.en}</span>
                <span className="block font-tamil text-xs">{r.ta}</span>
              </Link>
            ))}
          </nav>

          <h1 className="font-heading text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-[#6B6F5E] mt-1.5 mb-7">{sub}</p>
          <div className="space-y-5">{children}</div>
          <p className="mt-10 text-xs text-[#6B6F5E]"><Link to="/" className="hover:underline">Back to home page</Link></p>
        </div>
      </main>
    </div>
  );
};
