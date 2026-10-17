import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-nestora-bg2 border-t border-white/[0.06] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Home className="w-6 h-6 text-nestora-gold" strokeWidth={1.5} />
              <span className="font-heading font-bold text-lg">
                <span className="text-white">NESTORA</span> <span className="gold-text">HOMES</span>
              </span>
            </Link>
            <p className="text-nestora-grey text-sm leading-relaxed">
              Discover exclusive luxury homes and sophisticated properties tailored to your modern lifestyle.
            </p>
            <div className="flex gap-3 mt-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-nestora-grey hover:text-nestora-gold hover:border-nestora-gold/40 transition-all">
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold uppercase text-sm tracking-wider mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[['Home', '/'], ['Listings', '/listings'], ['Agents', '/agents'], ['About', '/about'], ['Contact', '/contact']].map(([label, path]) => (
                <li key={path}><Link to={path} className="text-nestora-grey text-sm hover:text-nestora-gold transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold uppercase text-sm tracking-wider mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-nestora-grey"><MapPin className="w-4 h-4 text-nestora-gold mt-0.5 shrink-0" strokeWidth={1.5} /> 90210 Wilshire Blvd, Beverly Hills, CA</li>
              <li className="flex items-center gap-2 text-nestora-grey"><Phone className="w-4 h-4 text-nestora-gold shrink-0" strokeWidth={1.5} /> +1 (310) 555-0100</li>
              <li className="flex items-center gap-2 text-nestora-grey"><Mail className="w-4 h-4 text-nestora-gold shrink-0" strokeWidth={1.5} /> info@nestora.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold uppercase text-sm tracking-wider mb-4 text-white">Newsletter</h4>
            <p className="text-nestora-grey text-sm mb-3">Subscribe for exclusive property updates.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-nestora-card border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-nestora-grey/60 focus:border-nestora-gold/40 outline-none"
              />
              <button type="submit" className="btn-gold text-sm px-4 py-2">Subscribe</button>
            </form>
            {subscribed && <p className="text-nestora-gold text-xs mt-2">Thank you for subscribing!</p>}
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-12 pt-6 text-center">
          <p className="text-nestora-grey text-sm">© {new Date().getFullYear()} Nestora Homes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
