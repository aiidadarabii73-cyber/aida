const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

const properties = [
  {
    title: 'Modern Villa',
    location: 'Malibu',
    type: 'Villa',
    price: 4500000,
    beds: 5, baths: 4, area: 4500,
    status: 'For Sale',
    featured: true,
    images: JSON.stringify([img('1600047509807-ba8f99d2cdde'), img('1567496898669-ee935f5f647a'), img('1522708323590-d24dbb6b0267')]),
    description: 'A stunning architectural masterpiece perched above the Pacific Ocean. This villa features floor-to-ceiling glass walls, an infinity pool blending with the horizon, and seamless indoor-outdoor living spaces designed for the ultimate luxury lifestyle.',
    features: JSON.stringify(['Infinity Pool', 'Smart Home System', 'Floor-to-Ceiling Windows', 'Wine Cellar', 'Home Theater', 'Ocean View']),
  },
  {
    title: 'Skyline Apartment',
    location: 'New York',
    type: 'Apartment',
    price: 2900000,
    beds: 5, baths: 4, area: 4000,
    status: 'For Sale',
    featured: true,
    images: JSON.stringify([img('1486406146926-c627a92ad1ab'), img('1582268611958-ebfd161ef9cf'), img('1600585152220-90363fe7e115')]),
    description: 'An extraordinary penthouse residence in the heart of Manhattan with breathtaking skyline views. Featuring a private elevator, designer finishes, and access to world-class building amenities.',
    features: JSON.stringify(['City View', 'Concierge Service', 'Gym Access', 'Smart Home System', 'Floor-to-Ceiling Windows', 'Private Elevator']),
  },
  {
    title: 'Lakeside Residence',
    location: 'Seattle',
    type: 'Residence',
    price: 3200000,
    beds: 5, baths: 4, area: 4800,
    status: 'For Sale',
    featured: true,
    images: JSON.stringify([img('1512917774080-9991f1c4c750'), img('1600607687939-ce8a6c25118c'), img('1605276374104-dee2a0ed3cd6')]),
    description: 'A serene waterfront property on the shores of Lake Washington. Expansive windows frame stunning lake views while the private dock offers direct access to the water for the discerning boating enthusiast.',
    features: JSON.stringify(['Private Dock', 'Lake View', 'Floor-to-Ceiling Windows', 'Fireplace', 'Garden', 'Smart Home System']),
  },
  {
    title: 'Contemporary Oasis',
    location: 'Miami',
    type: 'Villa',
    price: 1850000,
    beds: 5, baths: 4, area: 4600,
    status: 'For Sale',
    featured: true,
    images: JSON.stringify([img('1564013799919-ab600027ffc6'), img('1600573472550-8090b5e0745e'), img('1567496898669-ee935f5f647a')]),
    description: 'A tropical modern sanctuary in vibrant Miami Beach. Lush landscaping surrounds a stunning pool area, while the interior boasts designer finishes and an open-concept layout perfect for entertaining.',
    features: JSON.stringify(['Swimming Pool', 'Tropical Garden', 'Outdoor Kitchen', 'Smart Home System', 'Air Conditioning', 'Garage']),
  },
  {
    title: 'Hilltop Estate',
    location: 'Los Angeles',
    type: 'Villa',
    price: 5200000,
    beds: 6, baths: 5, area: 6200,
    status: 'For Sale',
    featured: false,
    images: JSON.stringify([img('1600607687644-c7171b42498f'), img('1486406146926-c627a92ad1ab'), img('1600585152220-90363fe7e115')]),
    description: 'A magnificent estate overlooking the entire Los Angeles basin. Resort-style amenities include a tennis court, home theater, and wine cellar, all set within meticulously landscaped grounds with panoramic city views.',
    features: JSON.stringify(['Infinity Pool', 'City View', 'Home Theater', 'Wine Cellar', 'Gym', 'Tennis Court']),
  },
  {
    title: 'Oceanfront Penthouse',
    location: 'Miami',
    type: 'Penthouse',
    price: 3750000,
    beds: 4, baths: 3, area: 3500,
    status: 'For Sale',
    featured: false,
    images: JSON.stringify([img('1605276374104-dee2a0ed3cd6'), img('1512917774080-9991f1c4c750'), img('1582268611958-ebfd161ef9cf')]),
    description: 'A breathtaking penthouse with panoramic ocean views and a private rooftop terrace. Floor-to-ceiling windows flood the space with natural light while offering ever-changing views of the Atlantic.',
    features: JSON.stringify(['Ocean View', 'Private Elevator', 'Rooftop Terrace', 'Floor-to-Ceiling Windows', 'Concierge Service', 'Smart Home System']),
  },
  {
    title: 'Urban Loft',
    location: 'New York',
    type: 'Apartment',
    price: 1200000,
    beds: 2, baths: 2, area: 1800,
    status: 'For Sale',
    featured: false,
    images: JSON.stringify([img('1522708323590-d24dbb6b0267'), img('1600585152220-90363fe7e115'), img('1567496898669-ee935f5f647a')]),
    description: 'A sleek industrial loft in Manhattan\'s trendy Tribeca neighborhood. Exposed brick walls and soaring ceilings preserve the historic character while modern updates provide contemporary comfort.',
    features: JSON.stringify(['Exposed Brick', 'High Ceilings', 'City View', 'Smart Home System', 'Air Conditioning', 'Gym Access']),
  },
  {
    title: 'Garden Townhouse',
    location: 'Seattle',
    type: 'Townhouse',
    price: 1650000,
    beds: 3, baths: 2, area: 2400,
    status: 'For Sale',
    featured: false,
    images: JSON.stringify([img('1600573472550-8090b5e0745e'), img('1600607687939-ce8a6c25118c'), img('1600047509807-ba8f99d2cdde')]),
    description: 'A charming modern townhouse with a lush private garden in one of Seattle\'s most sought-after neighborhoods. Hardwood floors, a cozy fireplace, and an open kitchen make this a perfect family home.',
    features: JSON.stringify(['Private Garden', 'Fireplace', 'Hardwood Floors', 'Garage', 'Air Conditioning', 'Smart Home System']),
  },
  {
    title: 'Desert Modern',
    location: 'Dubai',
    type: 'Villa',
    price: 4800000,
    beds: 5, baths: 6, area: 5500,
    status: 'For Sale',
    featured: false,
    images: JSON.stringify([img('1600607687644-c7171b42498f'), img('1512917774080-9991f1c4c750'), img('1605276374104-dee2a0ed3cd6')]),
    description: 'An architectural marvel in Dubai\'s most exclusive community. Clean lines, reflective water features, and expansive living spaces create a resort-like atmosphere in the heart of the desert metropolis.',
    features: JSON.stringify(['Infinity Pool', 'Smart Home System', 'Home Theater', 'Gym', 'Wine Cellar', 'Private Garage']),
  },
  {
    title: 'Coastal Retreat',
    location: 'Malibu',
    type: 'Residence',
    price: 3900000,
    beds: 4, baths: 4, area: 4100,
    status: 'For Sale',
    featured: false,
    images: JSON.stringify([img('1564013799919-ab600027ffc6'), img('1600573472550-8090b5e0745e'), img('1486406146926-c627a92ad1ab')]),
    description: 'A breathtaking beachfront property with direct ocean access. Wake to the sound of waves and enjoy spectacular sunsets from the expansive deck. The ultimate California coastal living experience.',
    features: JSON.stringify(['Beach Access', 'Ocean View', 'Swimming Pool', 'Outdoor Kitchen', 'Fireplace', 'Smart Home System']),
  },
]

const agents = [
  { name: 'Sarah Mitchell', photo: img('1573496359142-b8d87734a5a2'), phone: '+1 (310) 555-0148', email: 'sarah@nestora.com', specialty: 'Luxury Villas' },
  { name: 'James Anderson', photo: img('1500648767791-00dcc994a43e'), phone: '+1 (212) 555-0192', email: 'james@nestora.com', specialty: 'City Apartments' },
  { name: 'Emma Thompson', photo: img('1494790108377-be9c29b29330'), phone: '+1 (206) 555-0175', email: 'emma@nestora.com', specialty: 'Waterfront Properties' },
  { name: 'Michael Bennett', photo: img('1472099645785-5658abf4ff4e'), phone: '+1 (305) 555-0163', email: 'michael@nestora.com', specialty: 'International Estates' },
]

async function main() {
  const count = await prisma.property.count()
  if (count > 0) {
    console.log('Database already seeded — skipping.')
    return
  }

  const hashed = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: { email: 'admin@nestora.com', password: hashed, name: 'Admin', isAdmin: true },
  })
  console.log('Admin user created: admin@nestora.com / admin123')

  for (const p of properties) {
    await prisma.property.create({ data: p })
  }
  console.log(`${properties.length} properties seeded.`)

  for (const a of agents) {
    await prisma.agent.create({ data: a })
  }
  console.log(`${agents.length} agents seeded.`)

  console.log('Seed complete!')
}

main()
  .catch((e) => { console.error('Seed error:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
