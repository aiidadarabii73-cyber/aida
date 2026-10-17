const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const header = req.headers.authorization
  const token = header && header.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Authentication required' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

function adminAuth(req, res, next) {
  auth(req, res, () => {
    if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin access required' })
    next()
  })
}

module.exports = { auth, adminAuth }
