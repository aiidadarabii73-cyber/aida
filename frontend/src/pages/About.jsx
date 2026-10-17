import ScrollReveal from '../components/ScrollReveal'
import { Home, Award, Users, TrendingUp } from 'lucide-react'

const stats = [
  { icon: Home, value: '500+', label: 'Properties Sold' },
  { icon: Award, value: '15', label: 'Years Experience' },
  { icon: Users, value: '1,200+', label: 'Happy Clients' },
  { icon: TrendingUp, value: '$2B+', label: 'In Sales' },
]

const team = [
  { name: 'Sarah Mitchell', role: 'Founder & CEO', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { name: 'James Anderson', role: 'Head of Sales', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c3ce6?auto=format&fit=crop&w=400&q=80' },
  { name: 'Emma Thompson', role: 'Property Director', photo: 'https://images.unsplash.com/photo-1580489944761-15a4d5b6c4f6?auto=format&fit=crop&w=400&q=80' },
  { name: 'Michael Bennett', role: 'International Lead', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
]

export default function About() {
  return (
    <div className="pt-28 pb-20">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h1 className="section-title text-4xl mb-2">About Nestora Homes</h1>
          <span className="gold-line" />
          <p className="text-nestora-grey text-lg leading-relaxed mt-6">
            Founded in 2009, Nestora Homes has established itself as a premier luxury real estate firm, specializing in the most exclusive properties across the world's most desirable locations. Our commitment to excellence and personalized service has made us the trusted partner for discerning clients seeking their dream home.
          </p>
          <p className="text-nestora-grey text-lg leading-relaxed mt-4">
            We believe that finding the perfect home is more than a transaction — it's a life milestone. Our team of experienced professionals combines deep market knowledge with a passion for exceptional service, ensuring every client receives the attention and expertise they deserve.
          </p>
        </ScrollReveal>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="card-base rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-nestora-gold/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-7 h-7 text-nestora-gold" strokeWidth={1.5} />
                </div>
                <div className="font-heading font-bold text-3xl gold-text mb-1">{s.value}</div>
                <div className="text-nestora-grey text-sm uppercase tracking-wider">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <ScrollReveal>
          <h2 className="section-title text-3xl mb-2">Our Team</h2>
          <span className="gold-line" />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {team.map((m, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="card-base card-hover rounded-2xl overflow-hidden">
                <div className="h-80 overflow-hidden">
                  <img src={m.photo} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-heading font-bold text-lg text-white">{m.name}</h3>
                  <p className="text-nestora-gold text-sm">{m.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}
