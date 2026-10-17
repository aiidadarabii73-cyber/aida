const express = require('express')
const prisma = require('../db')
const { adminAuth } = require('../middleware')
const router = express.Router()

router.post('/', async (req, res) => {
  const { name, email, phone, message, propertyId } = req.body
  if (!name || !email || !phone || !propertyId) return res.status(400).json({ error: 'Name, email, phone and property are required' })
  const vr = await prisma.viewingRequest.create({
    data: { name, email, phone, message: message || '', propertyId: parseInt(propertyId) },
  })
  res.json({ success: true, id: vr.id })
})

router.get('/', adminAuth, async (req, res) => {
  const requests = await prisma.viewingRequest.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(requests)
})

module.exports = router
