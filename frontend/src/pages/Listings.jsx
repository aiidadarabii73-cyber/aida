import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api/client'
import PropertyCard from '../components/PropertyCard'
import ScrollReveal from '../components/ScrollReveal'

const locations = ['All', 'Malibu', 'New York', 'Seattle', 'Miami', 'Los Angeles', 'Dubai']
const types = ['All', 'Villa', 'Apartment', 'Residence', 'Penthouse', 'Townhouse']
const bedsOptions = ['Any', '1', '2', '3', '4', '5']

function fmtPrice(p) {
  if (p >= 1000000) return `$${(p / 1000000).toFixed(1)}M`
  return `$${(p / 1000).toFixed(0)}K`
}

export default function Listings() {
  const [searchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const [location, setLocation] = useState(searchParams.get('location') || 'All')
  const [type, setType] = useState(searchParams.get('type') || 'All')
  const [maxPrice, setMaxPrice] = useState(parseInt(searchParams.get('maxPrice')) || 5000000)
  const [beds, setBeds] = useState('Any')
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (location !== 'All') params.set('location', location)
    if (type !== 'All') params.set('type', type)
    params.set('maxPrice', maxPrice)
    if (beds !== 'Any') params.set('beds', beds)
    if (sort !== 'newest') params.set('sort', sort)
    params.set('page', page)
    params.set('limit', 9)

    api(`/properties?${params.toString()}`)
      .then(data => {
        setProperties(data.properties)
        setTotal(data.total)
        setPages(data.pages)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [location, type, maxPrice, beds, sort, page])

  useEffect(() => { setPage(1) }, [location, type, maxPrice, beds, sort])

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="section-title text-3xl mb-2">All Listings</h1>
      <span className="gold-line" />

      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        {/* Filters */}
        <aside className="lg:w-64 shrink-0">
          <div className="card-base rounded-2xl p-6 lg:sticky lg:top-28">
            <h3 className="font-heading font-semibold uppercase text-sm tracking-wider text-white mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="text-nestora-grey text-xs uppercase tracking-wider mb-1 block">Location</label>
                <select value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none">
                  {locations.map(l => <option key={l} value={l}>{l === 'All' ? 'Any' : l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-nestora-grey text-xs uppercase tracking-wider mb-1 block">Type</label>
                <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none">
                  {types.map(t => <option key={t} value={t}>{t === 'All' ? 'Any' : t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-nestora-grey text-xs uppercase tracking-wider mb-1 block">Max Price: {fmtPrice(maxPrice)}</label>
                <input type="range" min="100000" max="5000000" step="100000" value={maxPrice} onChange={e => setMaxPrice(parseInt(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="text-nestora-grey text-xs uppercase tracking-wider mb-1 block">Min Beds</label>
                <select value={beds} onChange={e => setBeds(e.target.value)} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none">
                  {bedsOptions.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-nestora-grey text-sm">{total} {total === 1 ? 'property' : 'properties'} found</p>
            <select value={sort} onChange={e => setSort(e.target.value)} className="bg-nestora-card border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none">
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-20 text-nestora-grey">Loading properties...</div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20 text-nestora-grey">No properties found matching your criteria.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((p, i) => (
                  <ScrollReveal key={p.id} delay={i * 50}>
                    <PropertyCard property={p} />
                  </ScrollReveal>
                ))}
              </div>
              {pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  {Array.from({ length: pages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-full font-heading text-sm transition-all ${page === i + 1 ? 'gold-gradient text-nestora-bg font-semibold' : 'border border-white/10 text-nestora-grey hover:border-nestora-gold/40'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
