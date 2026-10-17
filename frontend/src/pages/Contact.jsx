import { useState } from 'react'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import api from '../api/client'
import ScrollReveal from '../components/ScrollReveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    api('/contact', { method: 'POST', body: JSON.stringify(form) })
      .then(() => {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(null), 5000)
      })
      .catch(() => setStatus('error'))
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <h1 className="section-title text-3xl mb-2">Contact Us</h1>
        <span className="gold-line" />
        <p className="text-center text-nestora-grey mt-4 max-w-2xl mx-auto">
          Get in touch with our team. We're here to help you find your dream property.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <ScrollReveal>
          <div className="card-base rounded-2xl p-8">
            <h2 className="font-heading font-bold text-xl uppercase text-white mb-4">Send a Message</h2>
            {status === 'success' && <div className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl p-3 text-sm mb-4">Message sent! We'll get back to you soon.</div>}
            {status === 'error' && <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 text-sm mb-4">Something went wrong. Please try again.</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-nestora-grey/60 focus:border-nestora-gold/40 outline-none" />
              <input type="email" placeholder="Your Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-nestora-grey/60 focus:border-nestora-gold/40 outline-none" />
              <textarea placeholder="Your Message" rows="5" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-nestora-grey/60 focus:border-nestora-gold/40 outline-none resize-none" />
              <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2">
                <Send className="w-4 h-4" strokeWidth={1.5} /> Send Message
              </button>
            </form>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="space-y-6">
            <div className="card-base rounded-2xl p-8">
              <h2 className="font-heading font-bold text-xl uppercase text-white mb-4">Contact Info</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-nestora-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-nestora-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-heading uppercase">Address</div>
                    <div className="text-nestora-grey text-sm">90210 Wilshire Blvd, Beverly Hills, CA</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-nestora-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-nestora-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-heading uppercase">Phone</div>
                    <div className="text-nestora-grey text-sm">+1 (310) 555-0100</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-nestora-gold/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-nestora-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-heading uppercase">Email</div>
                    <div className="text-nestora-grey text-sm">info@nestora.com</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/[0.06] h-64">
              <iframe
                title="Office location"
                src="https://maps.google.com/maps?q=Beverly%20Hills%20CA&output=embed"
                width="100%" height="100%"
                style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) brightness(0.85) contrast(0.9)' }}
                loading="lazy"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
