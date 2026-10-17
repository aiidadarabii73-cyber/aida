import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, X, Mail, Phone, Calendar } from 'lucide-react'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../components/PropertyCard'

const emptyForm = {
  title: '', location: '', type: 'Villa', price: '', beds: '', baths: '', area: '',
  status: 'For Sale', images: '', description: '', features: '', featured: false,
}

export default function Admin() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('properties')
  const [properties, setProperties] = useState([])
  const [viewings, setViewings] = useState([])
  const [messages, setMessages] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProp, setEditingProp] = useState(null)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) navigate('/login')
  }, [user, loading, navigate])

  useEffect(() => {
    if (user?.isAdmin) {
      api('/properties?limit=100').then(d => setProperties(d.properties)).catch(() => {})
      api('/admin/viewings').then(setViewings).catch(() => {})
      api('/admin/messages').then(setMessages).catch(() => {})
    }
  }, [user])

  function loadProperties() {
    api('/properties?limit=100').then(d => setProperties(d.properties)).catch(() => {})
  }

  function handleSave(e) {
    e.preventDefault()
    const data = {
      ...form,
      price: parseInt(form.price) || 0,
      beds: parseInt(form.beds) || 0,
      baths: parseInt(form.baths) || 0,
      area: parseInt(form.area) || 0,
      images: form.images.split(',').map(s => s.trim()).filter(Boolean),
      features: form.features.split(',').map(s => s.trim()).filter(Boolean),
      featured: form.featured,
    }
    const url = editingProp ? `/admin/properties/${editingProp.id}` : '/admin/properties'
    const method = editingProp ? 'PUT' : 'POST'
    api(url, { method, body: JSON.stringify(data) })
      .then(() => { loadProperties(); resetForm() })
      .catch(() => {})
  }

  function resetForm() {
    setShowForm(false)
    setEditingProp(null)
    setForm(emptyForm)
  }

  function handleEdit(prop) {
    setEditingProp(prop)
    setForm({
      title: prop.title, location: prop.location, type: prop.type, price: String(prop.price),
      beds: String(prop.beds), baths: String(prop.baths), area: String(prop.area),
      status: prop.status, images: prop.images.join(', '), description: prop.description,
      features: prop.features.join(', '), featured: prop.featured,
    })
    setShowForm(true)
  }

  function handleDelete(id) {
    if (confirm('Delete this property?')) {
      api(`/admin/properties/${id}`, { method: 'DELETE' }).then(loadProperties).catch(() => {})
    }
  }

  if (loading) return <div className="pt-32 text-center text-nestora-grey">Loading...</div>
  if (!user?.isAdmin) return null

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="section-title text-3xl mb-2">Admin Panel</h1>
      <span className="gold-line" />

      <div className="flex gap-2 mt-8 mb-6">
        {['properties', 'viewings', 'messages'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-full font-heading text-sm uppercase tracking-wider transition-all ${tab === t ? 'gold-gradient text-nestora-bg font-semibold' : 'border border-white/10 text-nestora-grey hover:border-nestora-gold/40'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'properties' && (
        <div>
          <button onClick={() => { setEditingProp(null); setForm(emptyForm); setShowForm(true) }} className="btn-gold flex items-center gap-2 mb-6">
            <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Property
          </button>

          {showForm && (
            <div className="card-base rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold uppercase text-white">{editingProp ? 'Edit Property' : 'New Property'}</h3>
                <button onClick={resetForm}><X className="w-5 h-5 text-nestora-grey hover:text-white" /></button>
              </div>
              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-nestora-bg border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none" />
                <input type="text" placeholder="Location" required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="bg-nestora-bg border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none" />
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="bg-nestora-bg border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none">
                  {['Villa', 'Apartment', 'Residence', 'Penthouse', 'Townhouse'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input type="number" placeholder="Price" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="bg-nestora-bg border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none" />
                <input type="number" placeholder="Beds" value={form.beds} onChange={e => setForm({ ...form, beds: e.target.value })} className="bg-nestora-bg border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none" />
                <input type="number" placeholder="Baths" value={form.baths} onChange={e => setForm({ ...form, baths: e.target.value })} className="bg-nestora-bg border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none" />
                <input type="number" placeholder="Area (sq ft)" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} className="bg-nestora-bg border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none" />
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="bg-nestora-bg border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none">
                  <option value="For Sale">For Sale</option>
                  <option value="Sold">Sold</option>
                </select>
                <input type="text" placeholder="Images (comma-separated URLs)" value={form.images} onChange={e => setForm({ ...form, images: e.target.value })} className="md:col-span-2 bg-nestora-bg border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none" />
                <textarea placeholder="Description" rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="md:col-span-2 bg-nestora-bg border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none resize-none" />
                <input type="text" placeholder="Features (comma-separated)" value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} className="md:col-span-2 bg-nestora-bg border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-nestora-gold/40 outline-none" />
                <label className="flex items-center gap-2 text-nestora-grey text-sm">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="accent-nestora-gold" /> Featured
                </label>
                <button type="submit" className="btn-gold md:col-span-2">{editingProp ? 'Update' : 'Create'} Property</button>
              </form>
            </div>
          )}

          <div className="space-y-3">
            {properties.map(p => (
              <div key={p.id} className="card-base rounded-xl p-4 flex items-center gap-4">
                <img src={p.images[0]} alt={p.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-white truncate">{p.title}</h4>
                  <p className="text-nestora-grey text-sm">{p.location} · {formatPrice(p.price)} · {p.beds} beds</p>
                </div>
                <button onClick={() => handleEdit(p)} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-nestora-grey hover:text-nestora-gold hover:border-nestora-gold/40 transition-all shrink-0"><Edit className="w-4 h-4" strokeWidth={1.5} /></button>
                <button onClick={() => handleDelete(p.id)} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-nestora-grey hover:text-red-400 hover:border-red-400/40 transition-all shrink-0"><Trash2 className="w-4 h-4" strokeWidth={1.5} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'viewings' && (
        <div className="space-y-3">
          {viewings.length === 0 ? <p className="text-nestora-grey text-center py-10">No viewing requests yet.</p> : viewings.map(v => (
            <div key={v.id} className="card-base rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-heading font-bold text-white">{v.name}</h4>
                <span className="text-nestora-grey text-xs">{new Date(v.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-nestora-grey">
                <span className="flex items-center gap-1"><Mail className="w-4 h-4 text-nestora-gold" strokeWidth={1.5} /> {v.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-4 h-4 text-nestora-gold" strokeWidth={1.5} /> {v.phone}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-nestora-gold" strokeWidth={1.5} /> Property #{v.propertyId}</span>
              </div>
              {v.message && <p className="text-nestora-grey text-sm mt-2">{v.message}</p>}
            </div>
          ))}
        </div>
      )}

      {tab === 'messages' && (
        <div className="space-y-3">
          {messages.length === 0 ? <p className="text-nestora-grey text-center py-10">No contact messages yet.</p> : messages.map(m => (
            <div key={m.id} className="card-base rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-heading font-bold text-white">{m.name}</h4>
                <span className="text-nestora-grey text-xs">{new Date(m.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-nestora-gold text-sm mb-2">{m.email}</p>
              <p className="text-nestora-grey text-sm">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
