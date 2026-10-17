import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Maximize } from 'lucide-react'

export function formatPrice(p) {
  if (p >= 1000000) return `$${(p / 1000000).toFixed(1)}M`
  return `$${(p / 1000).toFixed(0)}K`
}

export default function PropertyCard({ property }) {
  return (
    <Link to={`/property/${property.id}`} className="card-base card-hover overflow-hidden group block">
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-nestora-gold text-xs font-heading font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-nestora-gold/20">
          {property.status}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-lg uppercase tracking-wide text-white mb-1">{property.title}</h3>
        <p className="flex items-center gap-1 text-nestora-grey text-sm mb-3">
          <MapPin className="w-4 h-4 text-nestora-gold" strokeWidth={1.5} /> {property.location}
        </p>
        <p className="font-heading font-bold text-xl gold-text mb-4">{formatPrice(property.price)}</p>
        <div className="flex items-center gap-4 text-nestora-grey text-sm border-t border-white/[0.06] pt-3">
          <span className="flex items-center gap-1"><Bed className="w-4 h-4 text-nestora-gold" strokeWidth={1.5} /> {property.beds} Beds</span>
          <span className="flex items-center gap-1"><Bath className="w-4 h-4 text-nestora-gold" strokeWidth={1.5} /> {property.baths} Baths</span>
          <span className="flex items-center gap-1"><Maximize className="w-4 h-4 text-nestora-gold" strokeWidth={1.5} /> {property.area.toLocaleString()} sq ft</span>
        </div>
      </div>
    </Link>
  )
}
