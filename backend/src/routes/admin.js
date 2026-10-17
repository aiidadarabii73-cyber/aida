const express = require('express')
const prisma = require('../db')
const { adminAuth } = require('../middleware')
const router = express.Router()

router.use(adminAuth)

// --- Properties CRUD ---

router.post('/properties', async (req, res) => {
  const { title, location, type, price, beds, baths, area, status, images, description, features, featured } = req.body
  if (!title || !location || !type || !price) return res.status(400).json({ error: 'title, location, type, price are required' })
  const property = await prisma.property.create({
    data: {
      title, location, type,
      price: parseInt(price),
      beds: parseInt(beds) || 0,
      baths: parseInt(baths) || 0,
      area: parseInt(area) || 0,
      status: status || 'For Sale',
      images: JSON.stringify(images || []),
      description: description || '',
      features: JSON.stringify(features || []),
      featured: featured || false,
    },
  })
  res.json(property)
})

router.put('/properties/:id', async (req, res) => {
  const b = req.body
  const data = {}
  if (b.title !== undefined) data.title = b.title
  if (b.location !== undefined) data.location = b.location
  if (b.type !== undefined) data.type = b.type
  if (b.price !== undefined) data.price = parseInt(b.price)
  if (b.beds !== undefined) data.beds = parseInt(b.beds)
  if (b.baths !== undefined) data.baths = parseInt(b.baths)
  if (b.area !== undefined) data.area = parseInt(b.area)
  if (b.status !== undefined) data.status = b.status
  if (b.images !== undefined) data.images = JSON.stringify(b.images)
  if (b.description !== undefined) data.description = b.description
  if (b.features !== undefined) data.features = JSON.stringify(b.features)
  if (b.featured !== undefined) data.featured = b.featured

  const property = await prisma.property.update({ where: { id: parseInt(req.params.id) }, data })
  res.json(property)
})

router.delete('/properties/:id', async (req, res) => {
  await prisma.property.delete({ where: { id: parseInt(req.params.id) } })
  res.json({ success: true })
})

// --- Viewing requests & messages ---

router.get('/viewings', async (req, res) => {
  const requests = await prisma.viewingRequest.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(requests)
})

router.get('/messages', async (req, res) => {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(messages)
})

module.exports = router
