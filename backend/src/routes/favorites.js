const express = require('express')
const prisma = require('../db')
const { auth } = require('../middleware')
const router = express.Router()

router.use(auth)

function parseProp(p) {
  return { ...p, images: JSON.parse(p.images), features: JSON.parse(p.features) }
}

// GET /api/favorites/ids — just the property IDs
router.get('/ids', async (req, res) => {
  const favs = await prisma.favorite.findMany({ where: { userId: req.user.id }, select: { propertyId: true } })
  res.json(favs.map(f => f.propertyId))
})

// GET /api/favorites — full property objects
router.get('/', async (req, res) => {
  const favs = await prisma.favorite.findMany({ where: { userId: req.user.id }, select: { propertyId: true } })
  const ids = favs.map(f => f.propertyId)
  const properties = await prisma.property.findMany({ where: { id: { in: ids } } })
  res.json(properties.map(parseProp))
})

// POST /api/favorites { propertyId }
router.post('/', async (req, res) => {
  const { propertyId } = req.body
  if (!propertyId) return res.status(400).json({ error: 'propertyId is required' })
  try {
    const fav = await prisma.favorite.create({ data: { userId: req.user.id, propertyId: parseInt(propertyId) } })
    res.json({ success: true, id: fav.id })
  } catch {
    res.status(400).json({ error: 'Already favorited or invalid property' })
  }
})

// DELETE /api/favorites/:propertyId
router.delete('/:propertyId', async (req, res) => {
  await prisma.favorite.deleteMany({ where: { userId: req.user.id, propertyId: parseInt(req.params.propertyId) } })
  res.json({ success: true })
})

module.exports = router
