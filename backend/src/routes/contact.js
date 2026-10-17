const express = require('express')
const prisma = require('../db')
const { adminAuth } = require('../middleware')
const router = express.Router()

router.post('/', async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ error: 'All fields are required' })
  const msg = await prisma.contactMessage.create({ data: { name, email, message } })
  res.json({ success: true, id: msg.id })
})

router.get('/', adminAuth, async (req, res) => {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(messages)
})

module.exports = router
