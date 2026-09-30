import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { loginAdmin } from '../../utils/api';
import { AuthShell, AuthField as Field, authInput, authButton } from '../../components/AuthShell';

export const AdminLogin = () => {
  const { switchRole } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const admin = await loginAdmin(email, password);
      switchRole('admin', admin);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell role="admin" title="Admin login" sub="For AgriLink administrators. Farmers and buyers use their own tab above.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Admin email"><input type="email" required value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} className={authInput} /></Field>
        <Field label="Password"><input type="password" required value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} className={authInput} /></Field>
        {error && <p className="text-sm font-semibold text-[#B3261E]">{error}</p>}
        <button type="submit" disabled={loading} className={authButton}>{loading ? 'Please wait...' : 'Log in to admin'}</button>
        <p className="text-xs text-[#6B6F5E]">Demo: admin@agrilink.gov.in / admin123</p>
      </form>
    </AuthShell>
  );
};
