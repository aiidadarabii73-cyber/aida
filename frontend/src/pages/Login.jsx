import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    api('/auth/login', { method: 'POST', body: JSON.stringify(form) })
      .then(data => { login(data.token, data.user); navigate('/') })
      .catch(e => setError(e.message))
  }

  return (
    <div className="pt-28 pb-20 max-w-md mx-auto px-4">
      <div className="card-base rounded-2xl p-8">
        <h1 className="section-title text-2xl mb-2">Login</h1>
        <span className="gold-line" />
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 text-sm mt-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-nestora-grey/60 focus:border-nestora-gold/40 outline-none" />
          <input type="password" placeholder="Password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full bg-nestora-bg border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-nestora-grey/60 focus:border-nestora-gold/40 outline-none" />
          <button type="submit" className="btn-gold w-full">Login</button>
        </form>
        <p className="text-center text-nestora-grey text-sm mt-4">
          Don't have an account? <Link to="/register" className="text-nestora-gold hover:underline">Register</Link>
        </p>
        <p className="text-center text-nestora-grey/60 text-xs mt-4">
          Demo admin: admin@nestora.com / admin123
        </p>
      </div>
    </div>
  )
}
