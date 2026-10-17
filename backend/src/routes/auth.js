const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../db')
const { auth } = require('../middleware')
const router = express.Router()

const SECRET = process.env.JWT_SECRET || 'dev-secret'

function sign(user) {
  return jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, SECRET)
}

function safe(user) {
  return { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin }
}

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body
  if (!email || !password || !name) return res.status(400).json({ error: 'All fields are required' })
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(400).json({ error: 'Email already registered' })
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { email, password: hashed, name } })
  res.json({ token: sign(user), user: safe(user) })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(400).json({ error: 'Invalid credentials' })
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' })
  res.json({ token: sign(user), user: safe(user) })
})

router.get('/me', auth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } })
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(safe(user))
})

module.exports = router
