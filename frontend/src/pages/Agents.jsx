import { useState, useEffect } from 'react'
import { Phone, Mail } from 'lucide-react'
import api from '../api/client'
import ScrollReveal from '../components/ScrollReveal'

export default function Agents() {
  const [agents, setAgents] = useState([])

  useEffect(() => {
    api('/agents').then(setAgents).catch(() => {})
  }, [])

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <h1 className="section-title text-3xl mb-2">Our Agents</h1>
        <span className="gold-line" />
        <p className="text-center text-nestora-grey mt-4 max-w-2xl mx-auto">
          Meet our team of expert real estate professionals dedicated to finding your perfect property.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {agents.length === 0 ? (
          <p className="text-nestora-grey col-span-full text-center py-10">Loading agents...</p>
        ) : agents.map((a, i) => (
          <ScrollReveal key={a.id} delay={i * 100}>
            <div className="card-base card-hover rounded-2xl overflow-hidden">
              <div className="relative h-72 overflow-hidden">
                <img src={a.photo} alt={a.name} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-nestora-card to-transparent p-4">
                  <h3 className="font-heading font-bold text-lg text-white">{a.name}</h3>
                  <p className="text-nestora-gold text-sm">{a.specialty}</p>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <p className="flex items-center gap-2 text-nestora-grey text-sm"><Phone className="w-4 h-4 text-nestora-gold shrink-0" strokeWidth={1.5} /> {a.phone}</p>
                <p className="flex items-center gap-2 text-nestora-grey text-sm"><Mail className="w-4 h-4 text-nestora-gold shrink-0" strokeWidth={1.5} /> {a.email}</p>
                <a href={`tel:${a.phone}`} className="btn-gold w-full flex items-center justify-center gap-2 mt-3 text-sm">
                  <Phone className="w-4 h-4" strokeWidth={1.5} /> Contact
                </a>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
