import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { loginBuyer, registerBuyer } from '../../utils/api';
import { OtpVerify } from '../../components/OtpVerify';
import { AuthShell, AuthField as Field, authInput as inp, authButton } from '../../components/AuthShell';

const Shell = ({ title, sub, children }) => <AuthShell role="buyer" title={title} sub={sub}>{children}</AuthShell>;

export const BuyerLogin = () => {
  const { switchRole } = useApp();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const done = async () => {
    try {
      const buyer = await loginBuyer(mobile);
      switchRole('buyer', buyer); navigate('/buyer/marketplace');
    } catch (err) { setError(err.message); }
  };
  return (
    <Shell title="Buyer Login" sub="Login with your mobile number and OTP">
      <Field label="Mobile Number"><input type="tel" maxLength={10} value={mobile} onChange={e => { setMobile(e.target.value.replace(/\D/g, '')); setError(''); }} placeholder="10 digit mobile" className={inp} /></Field>
      <OtpVerify mobile={mobile} onVerified={done} />
      {error && <p className="text-sm font-semibold text-[#B3261E] text-center">{error}</p>}
      <p className="text-center text-sm text-[#14201A] pt-4 border-t border-[#d5dacb]">New buyer? <Link to="/buyer/register" className="font-bold text-[#0E3B2B] hover:underline">Register here</Link></p>
      <p className="text-center text-xs text-[#6B6F5E]">Demo buyer mobile: 9876543210</p>
    </Shell>
  );
};

export const BuyerRegister = () => {
  const { switchRole } = useApp();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: '', mobile: '', email: '' });
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setError('');
    if (!verified) return setError('Please verify your mobile number with OTP');
    try {
      const buyer = await registerBuyer({ name: f.name, mobile: f.mobile, email: f.email });
      switchRole('buyer', buyer); navigate('/buyer/marketplace');
    } catch (err) { setError(err.message); }
  };

  return (
    <Shell title="Buyer Registration" sub="Enter your details and verify your mobile number">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Name"><input required value={f.name} onChange={e => setF({ ...f, name: e.target.value })} className={inp} /></Field>
        <Field label="Mobile Number"><input required type="tel" maxLength={10} value={f.mobile} onChange={e => { setF({ ...f, mobile: e.target.value.replace(/\D/g, '') }); setVerified(false); }} className={inp} /></Field>
        <Field label="Email ID"><input required type="email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} className={inp} /></Field>
        <OtpVerify key={f.mobile} mobile={f.mobile} onVerified={() => setVerified(true)} />
        {error && <p className="text-sm font-semibold text-[#B3261E] text-center">{error}</p>}
        <button type="submit" disabled={!verified} className={authButton}>Create Buyer Account</button>
      </form>
    </Shell>
  );
};
