import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, Bed, Bath, Maximize, Check, Heart, ChevronLeft, ChevronRight, Phone } from 'lucide-react'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../components/PropertyCard'

export default function PropertyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [property, setProperty] = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [isFav, setIsFav] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)

  useEffect(() => {
    api(`/properties/${id}`).then(p => { setProperty(p); setActiveImg(0) }).catch(() => {})
  }, [id])

  useEffect(() => {
    if (user) {
      api('/favorites/ids').then(ids => setIsFav(ids.includes(parseInt(id)))).catch(() => {})
    }
  }, [user, id])

  function toggleFav() {
    if (!user) { navigate('/login'); return }
    if (isFav) {
      api(`/favorites/${id}`, { method: 'DELETE' }).then(() => setIsFav(false)).catch(() => {})
    } else {
      api('/favorites', { method: 'POST', body: JSON.stringify({ propertyId: parseInt(id) }) }).then(() => setIsFav(true)).catch(() => {})
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    api('/viewings', { method: 'POST', body: JSON.stringify({ ...form, propertyId: parseInt(id) }) })
      .then(() => {
        setFormStatus('success')
        setForm({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setFormStatus(null), 5000)
      })
      .catch(() => setFormStatus('error'))
  }

  if (!property) return <div className="pt-32 pb-20 text-center text-nestora-grey">Loading property...</div>

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 text-sm text-nestora-grey mb-6">
        <Link to="/" className="hover:text-nestora-gold">Home</Link>
        <span>/</span>
        <Link to="/listings" className="hover:text-nestora-gold">Listings</Link>
        <span>/</span>
        <span className="text-white">{property.title}</span>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <div className="lg:col-span-3 relative rounded-2xl overflow-hidden h-[400px] md:h-[500px]">
          <img src={property.images[activeImg]} alt={property.title} className="w-full h-full object-cover" />
          {property.images.length > 1 && (
            <>
              <button onClick={() => setActiveImg((activeImg - 1 + property.images.length) % property.images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setActiveImg((activeImg + 1) % property.images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible">
          {property.images.map((img, i) => (
            <button key={i} onClick={() => setActiveImg(i)} className={`shrink-0 w-24 h-24 lg:w-full lg:h-32 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-nestora-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="font-heading font-bold text-3xl uppercase text-white mb-2">{property.title}</h1>
              <p className="flex items-center gap-1 text-nestora-grey"><MapPin className="w-4 h-4 text-nestora-gold" strokeWidth={1.5} /> {property.location}</p>
            </div>
            <button onClick={toggleFav} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all shrink-0 ${isFav ? 'bg-nestora-gold/20 border-nestora-gold text-nestora-gold' : 'border-white/10 text-nestora-grey hover:border-nestora-gold/40'}`}>
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-2"><Bed className="w-5 h-5 text-nestora-gold" strokeWidth={1.5} /><div><div className="text-white font-heading font-bold text-lg">{property.beds}</div><div className="text-nestora-grey text-xs uppercase">Beds</div></div></div>
            <div className="flex items-center gap-2"><Bath className="w-5 h-5 text-nestora-gold" strokeWidth={1.5} /><div><div className="text-white font-heading font-bold text-lg">{property.baths}</div><div className="text-nestora-grey text-xs uppercase">Baths</div></div></div>
            <div className="flex items-center gap-2"><Maximize className="w-5 h-5 text-nestora-gold" strokeWidth={1.5} /><div><div className="text-white font-heading font-bold text-lg">{property.area.toLocaleString()}</div><div className="text-nestora-grey text-xs uppercase">Sq Ft</div></div></div>
            <div className="ml-auto text-right">
              <div className="text-3xl font-heading font-bold gold-text">{formatPrice(property.price)}</div>
              <div className="text-nestora-grey text-xs uppercase">{property.status}</div>
            </div>
          </div>

          <h2 className="font-heading font-bold text-xl uppercase text-white mb-3">Description</h2>
          <p className="text-nestora-grey leading-relaxed mb-8">{property.description}</p>

          <h2 className="font-heading font-bold text-xl uppercase text-white mb-3">Features</h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {property.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-nestora-grey"><Check className="w-4 h-4 text-nestora-gold" strokeWidth={1.5} /> {f}</div>
            ))}
          </div>

          <h2 className="font-heading font-bold text-xl uppercase text-white mb-3">Location</h2>
          <div className="rounded-2xl overflow-hidden border border-white/[0.06] h-80">
            <iframe
              title="Property location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
              width="100%" height="100%"
              style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) brightness(0.85) contrast(0.9)' }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Viewing form */}
        <div>
          <div className="card-base rounded-2xl p-6 lg:sticky lg:top-28">
            <h2 className="font-heading font-bold text-xl uppercase text-white mb-4">Request a Viewing</h2>
            {formStatus === 'success' && <div className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl p-3 text-sm mb-4">Request submitted! We'll contact you shortly.</div>}
            {formStatus === 'error' && <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 text-sm mb-4">Something went wrong. Please try again.</div>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Your Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-nestora-grey/60 focus:border-nestora-gold/40 outline-none" />
              <input type="email" placeholder="Your Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-nestora-grey/60 focus:border-nestora-gold/40 outline-none" />
              <input type="tel" placeholder="Your Phone" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-nestora-grey/60 focus:border-nestora-gold/40 outline-none" />
              <textarea placeholder="Message (optional)" rows="3" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-nestora-grey/60 focus:border-nestora-gold/40 outline-none resize-none" />
              <button type="submit" className="btn-gold w-full">Submit Request</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
