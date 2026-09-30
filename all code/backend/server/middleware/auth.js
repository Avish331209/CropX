import jwt from 'jsonwebtoken';

// Usage: router.post('/x', requireAuth('farmer'), handler)   or requireAuth('farmer','admin')
export const requireAuth = (...roles) => (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Please log in first.' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (roles.length && !roles.includes(payload.role)) {
      return res.status(403).json({ error: 'You do not have permission to do this.' });
    }
    req.auth = payload; // { id, role }
    next();
  } catch {
    res.status(401).json({ error: 'Session expired. Please log in again.' });
  }
};
