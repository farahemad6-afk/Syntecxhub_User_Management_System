const User = require('../models/User');

const unauthorized = (res) =>
  res
    .status(401)
    .set('WWW-Authenticate', 'Basic realm="User Management API"')
    .json({ success: false, message: 'Authentication required or invalid credentials' });

// Basic Auth: Authorization: Basic base64(email:password)
exports.basicAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Basic ')) return unauthorized(res);

    const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
    const idx = decoded.indexOf(':');
    if (idx < 0) return unauthorized(res);

    const email = decoded.slice(0, idx).trim().toLowerCase();
    const password = decoded.slice(idx + 1);

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) return unauthorized(res);

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.requireAdmin = (req, res, next) =>
  req.user.role === 'admin'
    ? next()
    : res.status(403).json({ success: false, message: 'Admin access required' });

exports.selfOrAdmin = (req, res, next) =>
  req.user.role === 'admin' || req.user.id === req.params.id
    ? next()
    : res.status(403).json({ success: false, message: 'You can only access your own account' });
