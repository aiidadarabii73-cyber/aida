import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Home, Search, DollarSign } from 'lucide-react'

const locations = ['All', 'Malibu', 'New York', 'Seattle', 'Miami', 'Los Angeles', 'Dubai']
const types = ['All', 'Villa', 'Apartment', 'Residence', 'Penthouse', 'Townhouse']

function formatPrice(p) {
  if (p >= 1000000) return `$${(p / 1000000).toFixed(1)}M`
  return `$${(p / 1000).toFixed(0)}K`
}

export default function SearchBar() {
  const [location, setLocation] = useState('All')
  const [type, setType] = useState('All')
  const [maxPrice, setMaxPrice] = useState(5000000)
  const navigate = useNavigate()

  function handleSearch() {
    const params = new URLSearchParams()
    if (location !== 'All') params.set('location', location)
    if (type !== 'All') params.set('type', type)
    params.set('maxPrice', maxPrice)
    navigate(`/listings?${params.toString()}`)
  }

  return (
    <div className="glass rounded-2xl p-5 md:p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="flex items-center gap-1 text-nestora-grey text-xs font-heading uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-nestora-gold" strokeWidth={1.5} /> Location
          </label>
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full bg-nestora-card border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-nestora-gold/40 outline-none"
          >
            {locations.map(l => <option key={l} value={l}>{l === 'All' ? 'Any Location' : l}</option>)}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-1 text-nestora-grey text-xs font-heading uppercase tracking-wider mb-2">
            <Home className="w-3.5 h-3.5 text-nestora-gold" strokeWidth={1.5} /> Property Type
          </label>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full bg-nestora-card border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-nestora-gold/40 outline-none"
          >
            {types.map(t => <option key={t} value={t}>{t === 'All' ? 'Any Type' : t}</option>)}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-1 text-nestora-grey text-xs font-heading uppercase tracking-wider mb-2">
            <DollarSign className="w-3.5 h-3.5 text-nestora-gold" strokeWidth={1.5} /> Max Price: {formatPrice(maxPrice)}
          </label>
          <input
            type="range"
            min="100000"
            max="5000000"
            step="100000"
            value={maxPrice}
            onChange={e => setMaxPrice(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-nestora-grey/60 mt-1">
            <span>$100K</span>
            <span>$5M+</span>
          </div>
        </div>

        <button onClick={handleSearch} className="btn-gold flex items-center justify-center gap-2 w-full">
          <Search className="w-4 h-4" strokeWidth={1.5} /> Search
        </button>
      </div>
    </div>
  )
}
