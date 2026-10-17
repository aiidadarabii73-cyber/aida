const express = require('express')
const prisma = require('../db')
const router = express.Router()

router.get('/', async (req, res) => {
  const agents = await prisma.agent.findMany({ orderBy: { id: 'asc' } })
  res.json(agents)
})

module.exports = router
