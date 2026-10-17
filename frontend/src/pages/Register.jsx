import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    api('/auth/register', { method: 'POST', body: JSON.stringify(form) })
      .then(data => { login(data.token, data.user); navigate('/') })
      .catch(e => setError(e.message))
  }

  return (
    <div className="pt-28 pb-20 max-w-md mx-auto px-4">
      <div className="card-base rounded-2xl p-8">
        <h1 className="section-title text-2xl mb-2">Register</h1>
        <span className="gold-line" />
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 text-sm mt-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input type="text" placeholder="Full Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-nestora-grey/60 focus:border-nestora-gold/40 outline-none" />
          <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-nestora-grey/60 focus:border-nestora-gold/40 outline-none" />
          <input type="password" placeholder="Password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-nestora-grey/60 focus:border-nestora-gold/40 outline-none" />
          <button type="submit" className="btn-gold w-full">Create Account</button>
        </form>
        <p className="text-center text-nestora-grey text-sm mt-4">
          Already have an account? <Link to="/login" className="text-nestora-gold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}
