const express = require('express')
const prisma = require('../db')
const router = express.Router()

function parseProp(p) {
  return { ...p, images: JSON.parse(p.images), features: JSON.parse(p.features) }
}

// GET /api/properties?location=&type=&minPrice=&maxPrice=&beds=&sort=&page=&limit=
router.get('/', async (req, res) => {
  const { location, type, minPrice, maxPrice, beds, sort, page = 1, limit = 9 } = req.query
  const where = {}
  if (location && location !== 'All') where.location = { contains: location }
  if (type && type !== 'All') where.type = type
  if (minPrice || maxPrice) {
    where.price = {}
    if (minPrice) where.price.gte = parseInt(minPrice)
    if (maxPrice) where.price.lte = parseInt(maxPrice)
  }
  if (beds && beds !== 'Any') where.beds = { gte: parseInt(beds) }

  const orderBy = {}
  if (sort === 'price-asc') orderBy.price = 'asc'
  else if (sort === 'price-desc') orderBy.price = 'desc'
  else orderBy.createdAt = 'desc'

  const take = parseInt(limit)
  const skip = (parseInt(page) - 1) * take

  const [properties, total] = await Promise.all([
    prisma.property.findMany({ where, orderBy, skip, take }),
    prisma.property.count({ where }),
  ])

  res.json({
    properties: properties.map(parseProp),
    total,
    pages: Math.ceil(total / take),
    page: parseInt(page),
  })
})

// GET /api/properties/featured
router.get('/featured', async (req, res) => {
  const properties = await prisma.property.findMany({ where: { featured: true }, take: 4 })
  res.json(properties.map(parseProp))
})

// GET /api/properties/:id
router.get('/:id', async (req, res) => {
  const property = await prisma.property.findUnique({ where: { id: parseInt(req.params.id) } })
  if (!property) return res.status(404).json({ error: 'Property not found' })
  res.json(parseProp(property))
})

module.exports = router
