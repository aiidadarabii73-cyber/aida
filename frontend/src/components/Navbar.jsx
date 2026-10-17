import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Listings', path: '/listings' },
  { label: 'Agents', path: '/agents' },
  { label: 'Contact', path: '/contact' },
  { label: 'About', path: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-7 h-7 text-nestora-gold" strokeWidth={1.5} />
              <span className="font-heading font-bold tracking-wide">
                <span className="text-white text-2xl">NESTORA</span>{' '}
                <span className="gold-text">HOMES</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-heading text-sm uppercase tracking-wider transition-colors relative group ${location.pathname === link.path ? 'text-nestora-gold' : 'text-nestora-grey hover:text-white'}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-[2px] gold-gradient rounded-full transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  {user.isAdmin && <Link to="/admin" className="text-nestora-grey hover:text-nestora-gold text-sm font-heading uppercase tracking-wider">Admin</Link>}
                  <Link to="/favorites" className="text-nestora-grey hover:text-nestora-gold text-sm font-heading uppercase tracking-wider">Favorites</Link>
                  <button onClick={logout} className="text-nestora-grey hover:text-white text-sm font-heading uppercase tracking-wider">Logout</button>
                </>
              ) : (
                <Link to="/login" className="text-nestora-grey hover:text-white text-sm font-heading uppercase tracking-wider">Login</Link>
              )}
              <button onClick={() => navigate('/listings')} className="btn-gold text-sm">Get Started</button>
            </div>

            <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-nestora-bg2 border-l border-white/10 p-6 pt-24 flex flex-col gap-4">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className={`font-heading text-sm uppercase tracking-wider ${location.pathname === link.path ? 'text-nestora-gold' : 'text-nestora-grey'}`}>
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            {user ? (
              <>
                {user.isAdmin && <Link to="/admin" className="text-nestora-grey font-heading text-sm uppercase">Admin</Link>}
                <Link to="/favorites" className="text-nestora-grey font-heading text-sm uppercase">Favorites</Link>
                <button onClick={logout} className="text-left text-nestora-grey font-heading text-sm uppercase">Logout</button>
              </>
            ) : (
              <Link to="/login" className="text-nestora-grey font-heading text-sm uppercase">Login</Link>
            )}
            <button onClick={() => { navigate('/listings'); setMobileOpen(false) }} className="btn-gold text-sm mt-2">Get Started</button>
          </div>
        </div>
      )}
    </>
  )
}
