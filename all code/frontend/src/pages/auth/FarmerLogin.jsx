import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { loginFarmer, registerFarmer } from '../../utils/api';
import { OtpVerify } from '../../components/OtpVerify';
import { AuthShell, AuthField as Field, authInput as inp, authButton } from '../../components/AuthShell';

const Shell = ({ title, sub, children }) => <AuthShell role="farmer" title={title} sub={sub}>{children}</AuthShell>;

export const FarmerLogin = () => {
  const { switchRole } = useApp();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const done = async () => {
    try {
      const farmer = await loginFarmer(mobile);
      switchRole('farmer', farmer); navigate('/farmer/dashboard');
    } catch (err) { setError(err.message); }
  };
  return (
    <Shell title="Farmer Login" sub="Login with your mobile number and OTP">
      <Field label="Mobile Number">
        <input type="tel" maxLength={10} value={mobile} onChange={e => { setMobile(e.target.value.replace(/\D/g, '')); setError(''); }} placeholder="10 digit mobile" className={inp} />
      </Field>
      <OtpVerify mobile={mobile} onVerified={done} />
      {error && <p className="text-sm font-semibold text-[#B3261E] text-center">{error}</p>}
      <p className="text-center text-sm text-[#14201A] pt-4 border-t border-[#d5dacb]">New farmer? <Link to="/farmer/register" className="font-bold text-[#0E3B2B] hover:underline">Register here</Link></p>
      <p className="text-center text-xs text-[#6B6F5E]">Demo farmer mobile: 9443187654</p>
    </Shell>
  );
};

export const FarmerRegister = () => {
  const { switchRole } = useApp();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: '', mobile: '', address: '', aadhaar: '', photo: '', accHolder: '', accNumber: '', ifsc: '', bank: '' });
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setVerified(k === 'mobile' ? false : verified); };

  const onPhoto = (e) => {
    const file = e.target.files[0]; if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setError('Image must be under 2 MB'); return; }
    const r = new FileReader(); r.onload = () => setF(prev => ({ ...prev, photo: r.result })); r.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault(); setError('');
    if (!/^\d{12}$/.test(f.aadhaar)) return setError('Aadhaar number must be 12 digits');
    if (!f.photo) return setError('Please upload your photo');
    if (!/^\d{9,18}$/.test(f.accNumber)) return setError('Enter a valid account number (9-18 digits)');
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(f.ifsc)) return setError('Enter a valid IFSC code (e.g. SBIN0001234)');
    if (!verified) return setError('Please verify your mobile number with OTP');
    try {
      const farmer = await registerFarmer({
        name: f.name, mobile: f.mobile, address: f.address, aadhaar: f.aadhaar, photo: f.photo,
        accHolder: f.accHolder, accNumber: f.accNumber, ifsc: f.ifsc, bank: f.bank,
      });
      switchRole('farmer', farmer); navigate('/farmer/dashboard');
    } catch (err) { setError(err.message); }
  };

  return (
    <Shell title="Farmer Registration" sub="Fill your details and verify your mobile number">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full Name"><input required value={f.name} onChange={set('name')} className={inp} /></Field>
        <Field label="Mobile Number"><input required type="tel" maxLength={10} value={f.mobile} onChange={e => { setF({ ...f, mobile: e.target.value.replace(/\D/g, '') }); setVerified(false); }} className={inp} /></Field>
        <Field label="Address"><textarea required rows={2} value={f.address} onChange={set('address')} className={inp} placeholder="Door no, street, village, district" /></Field>
        <Field label="Aadhaar Number"><input required maxLength={12} inputMode="numeric" value={f.aadhaar} onChange={e => setF({ ...f, aadhaar: e.target.value.replace(/\D/g, '') })} className={inp} placeholder="12 digit Aadhaar" /></Field>
        <Field label="Your Photo">
          <div className="flex items-center gap-3">
            {f.photo && <img src={f.photo} alt="" className="w-14 h-14 rounded-xl object-cover border" />}
            <input type="file" accept="image/*" onChange={onPhoto} className="text-xs" />
          </div>
        </Field>
        <div className="pt-2 border-t border-slate-100"><p className="text-xs font-black text-slate-800 mb-3">Account Details (for payments)</p>
          <div className="space-y-3">
            <Field label="Account Holder Name"><input required value={f.accHolder} onChange={set('accHolder')} className={inp} /></Field>
            <Field label="Bank Name"><input required value={f.bank} onChange={set('bank')} className={inp} /></Field>
            <Field label="Account Number"><input required inputMode="numeric" value={f.accNumber} onChange={e => setF({ ...f, accNumber: e.target.value.replace(/\D/g, '') })} className={inp} /></Field>
            <Field label="IFSC Code"><input required maxLength={11} value={f.ifsc} onChange={set('ifsc')} className={inp + ' uppercase'} /></Field>
          </div>
        </div>
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs font-black text-slate-800 mb-3">Verify Mobile</p>
          <OtpVerify key={f.mobile} mobile={f.mobile} onVerified={() => setVerified(true)} />
        </div>
        {error && <p className="text-sm font-semibold text-[#B3261E] text-center">{error}</p>}
        <button type="submit" disabled={!verified} className={authButton}>Create Farmer Account</button>
      </form>
    </Shell>
  );
};
