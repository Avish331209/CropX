// All communication with the Express + MongoDB backend goes through this file.
// Vite proxies /api  ->  http://localhost:5000  (see vite.config.js)

const TOKEN_KEY = 'agrilink_token';
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const cleanMobile = (m = '') => String(m).replace(/\D/g, '').slice(-10);

// Small wrapper around fetch: adds the login token, returns JSON, throws readable errors.
export async function api(path, { method = 'GET', body } = {}) {
  const token = getToken();
  let res;
  try {
    res = await fetch(`/api${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Cannot reach the server. Please start the backend (npm start) and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || 'Request failed. Please try again.');
    err.status = res.status;
    throw err;
  }
  return data;
}

// ---------- OTP ----------
export const sendOtp = (mobile) => api('/otp/send', { method: 'POST', body: { mobile: cleanMobile(mobile) } });
export const verifyOtp = (mobile, otp) =>
  api('/otp/verify', { method: 'POST', body: { mobile: cleanMobile(mobile), otp: String(otp).trim() } });

// ---------- Auth: each returns the user and saves the login token ----------
const withToken = async (promise) => {
  const { token, user } = await promise;
  setToken(token);
  return user;
};
export const loginFarmer = (mobile) => withToken(api('/farmer/login', { method: 'POST', body: { mobile: cleanMobile(mobile) } }));
export const loginBuyer = (mobile) => withToken(api('/buyer/login', { method: 'POST', body: { mobile: cleanMobile(mobile) } }));
export const loginAdmin = (email, password) => withToken(api('/admin/login', { method: 'POST', body: { email, password } }));
export const registerFarmer = (data) => withToken(api('/farmer/register', { method: 'POST', body: { ...data, mobile: cleanMobile(data.mobile) } }));
export const registerBuyer = (data) => withToken(api('/buyer/register', { method: 'POST', body: { ...data, mobile: cleanMobile(data.mobile) } }));
