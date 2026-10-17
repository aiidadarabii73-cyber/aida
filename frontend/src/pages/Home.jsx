import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home as HomeIcon, Handshake, BarChart3, ShieldCheck } from 'lucide-react'
import api from '../api/client'
import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import ScrollReveal from '../components/ScrollReveal'

const heroImg = 'https://images.unsplash.com/photo-1600596542815-ff1a8f6f6f6e?auto=format&fit=crop&w=1920&q=80'
const ctaImg = 'https://images.unsplash.com/photo-1600210491369-e3f6c7c1c3f1?auto=format&fit=crop&w=1920&q=80'

const whyChooseUs = [
  { icon: HomeIcon, title: 'Premium Listings', desc: 'Curated exclusive luxury homes and sophisticated properties.' },
  { icon: Handshake, title: 'Expert Guidance', desc: 'Expert, local knowledge and personalized guidance.' },
  { icon: BarChart3, title: 'Market Analytics', desc: 'Data-driven insights for smarter real estate decisions.' },
  { icon: ShieldCheck, title: 'Secure Transactions', desc: 'Secure and transparent process for a worry-free experience.' },
]

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    api('/properties/featured').then(setFeatured).catch(() => {})
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury villa at dusk" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-nestora-bg via-nestora-bg/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40 w-full">
          <div className="max-w-2xl">
            <h1 className="font-heading font-bold uppercase leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              <span className="block text-white">Find Your</span>
              <span className="block text-white">Perfect</span>
              <span className="block gold-text">Living Space</span>
            </h1>
            <div className="w-16 h-1 gold-gradient rounded-full mb-6" />
            <p className="text-nestora-grey text-lg max-w-lg">
              Discover exclusive luxury homes and sophisticated properties tailored to your modern lifestyle with Nestora Homes.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pb-8 px-4 z-10">
          <SearchBar />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="section-title text-3xl mb-2">Featured Properties</h2>
          <span className="gold-line" />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {featured.length === 0 ? (
            <p className="text-nestora-grey col-span-full text-center py-10">Loading featured properties...</p>
          ) : featured.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 100}>
              <PropertyCard property={p} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="card-base rounded-3xl p-8 md:p-16">
            <h2 className="section-title text-3xl mb-2">Why Choose Us</h2>
            <span className="gold-line" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
              {whyChooseUs.map((item, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className={`text-center md:text-left ${i < 3 ? 'md:border-r md:border-white/[0.06] md:pr-8' : ''}`}>
                    <div className="w-14 h-14 rounded-2xl bg-nestora-gold/10 flex items-center justify-center mx-auto md:mx-0 mb-4">
                      <item.icon className="w-7 h-7 text-nestora-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading font-semibold uppercase text-sm tracking-wider text-white mb-2">{item.title}</h3>
                    <p className="text-nestora-grey text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ctaImg} alt="Luxury interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-nestora-bg/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading font-bold uppercase text-3xl md:text-4xl text-white mb-3">Ready to Find Your Dream Home?</h2>
            <p className="text-nestora-grey text-lg">Let us help you discover a place you'll love to live.</p>
          </div>
          <Link to="/listings" className="btn-gold flex items-center gap-2 text-lg whitespace-nowrap">
            See Portfolio <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </div>
  )
}
