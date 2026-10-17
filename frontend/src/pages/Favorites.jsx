import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'
import PropertyCard from '../components/PropertyCard'
import ScrollReveal from '../components/ScrollReveal'

export default function Favorites() {
  const { user, loading } = useAuth()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (user) {
      api('/favorites').then(setFavorites).catch(() => {})
    }
  }, [user])

  if (loading) return <div className="pt-32 text-center text-nestora-grey">Loading...</div>

  if (!user) {
    return (
      <div className="pt-28 pb-20 text-center max-w-md mx-auto px-4">
        <Heart className="w-16 h-16 text-nestora-gold/40 mx-auto mb-4" strokeWidth={1.5} />
        <h1 className="font-heading font-bold text-2xl uppercase text-white mb-2">Favorites</h1>
        <p className="text-nestora-grey mb-6">Please login to view your favorite properties.</p>
        <Link to="/login" className="btn-gold inline-block">Login</Link>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <h1 className="section-title text-3xl mb-2">Your Favorites</h1>
        <span className="gold-line" />
      </ScrollReveal>
      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-16 h-16 text-nestora-gold/40 mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-nestora-grey">You haven't favorited any properties yet.</p>
          <Link to="/listings" className="btn-gold inline-block mt-4">Browse Properties</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {favorites.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 50}>
              <PropertyCard property={p} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  )
}
