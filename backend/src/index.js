const express = require('express')
const cors = require('cors')

const propertiesRouter = require('./routes/properties')
const agentsRouter = require('./routes/agents')
const authRouter = require('./routes/auth')
const contactRouter = require('./routes/contact')
const viewingsRouter = require('./routes/viewings')
const favoritesRouter = require('./routes/favorites')
const adminRouter = require('./routes/admin')

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/properties', propertiesRouter)
app.use('/api/agents', agentsRouter)
app.use('/api/auth', authRouter)
app.use('/api/contact', contactRouter)
app.use('/api/viewings', viewingsRouter)
app.use('/api/favorites', favoritesRouter)
app.use('/api/admin', adminRouter)

const PORT = process.env.PORT || 8000
app.listen(PORT, '0.0.0.0', () => console.log(`Nestora API running on port ${PORT}`))
