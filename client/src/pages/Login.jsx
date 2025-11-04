import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../lib/api.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const loc = useLocation()

  async function onSubmit(e) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const { token } = await loginUser({ email, password })
      localStorage.setItem('token', token)
      const from = loc.state?.from?.pathname || '/dashboard'
      navigate(from)
    } catch (e) {
      setError(e?.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 card">
      <h1 className="text-2xl font-semibold mb-4">Welcome back</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="w-full bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-2" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      <div className="text-sm text-slate-400 mt-3">No account? <Link to="/register" className="text-brand-blue">Register</Link></div>
    </div>
  )
}


