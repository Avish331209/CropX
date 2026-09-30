import React, { useRef, useState } from 'react';
import { sendOtp, verifyOtp } from '../utils/api';

// Mobile field + "Send OTP" + 6 OTP boxes + "Verify OTP"
export const OtpVerify = ({ mobile, onVerified, accent = 'emerald' }) => {
  const [stage, setStage] = useState('idle'); // idle | sent | done
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [msg, setMsg] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [busy, setBusy] = useState(false);
  const refs = useRef([]);
  const valid = String(mobile).replace(/\D/g, '').length >= 10;
  const btn = 'bg-[#0E3B2B] hover:bg-[#164d3a]';

  const send = async () => {
    setBusy(true); setMsg('');
    try {
      const d = await sendOtp(mobile);
      setDevOtp(d.devOtp || ''); setStage('sent'); setDigits(['', '', '', '', '', '']);
      setTimeout(() => refs.current[0]?.focus(), 50);
    } catch (e) { setMsg(e.message); }
    setBusy(false);
  };

  const verify = async () => {
    setBusy(true); setMsg('');
    try { await verifyOtp(mobile, digits.join('')); setStage('done'); onVerified(); }
    catch (e) { setMsg(e.message); }
    setBusy(false);
  };

  const change = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const n = [...digits]; n[i] = v; setDigits(n);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  const key = (i, e) => { if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus(); };
  const paste = (e) => {
    const t = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (t) { e.preventDefault(); setDigits(t.padEnd(6, ' ').split('').map(c => c.trim())); }
  };

  if (stage === 'done') return <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700">✓ Mobile number verified</div>;

  return (
    <div className="space-y-3">
      {stage === 'idle' && (
        <button type="button" disabled={!valid || busy} onClick={send} className={`w-full py-3 ${btn} disabled:opacity-40 text-white font-bold text-sm rounded-lg transition`}>
          {busy ? 'Sending...' : 'Send OTP'}
        </button>
      )}
      {stage === 'sent' && (
        <>
          <p className="text-xs text-slate-500">Enter the 6-digit OTP sent to <b>{mobile}</b></p>
          <div className="flex gap-2 justify-center" onPaste={paste}>
            {digits.map((d, i) => (
              <input key={i} ref={el => (refs.current[i] = el)} value={d} inputMode="numeric" maxLength={1}
                onChange={e => change(i, e.target.value)} onKeyDown={e => key(i, e)}
                className="w-11 h-12 text-center text-lg font-bold bg-white border border-[#d5dacb] rounded-lg focus:border-[#0E3B2B] focus:outline-none focus:ring-2 focus:ring-[#F2B21B]/60" />
            ))}
          </div>
          {devOtp && <p className="text-[11px] text-center text-amber-700 bg-amber-50 rounded-lg py-1.5">Demo mode (no SMS provider connected) — your OTP is <b>{devOtp}</b></p>}
          <button type="button" disabled={digits.join('').length < 6 || busy} onClick={verify} className={`w-full py-3 ${btn} disabled:opacity-40 text-white font-bold text-sm rounded-lg transition`}>
            {busy ? 'Verifying...' : 'Verify OTP'}
          </button>
          <button type="button" onClick={send} className="w-full text-xs text-slate-500 hover:underline">Resend OTP</button>
        </>
      )}
      {msg && <p className="text-xs font-bold text-rose-600 text-center">{msg}</p>}
    </div>
  );
};
