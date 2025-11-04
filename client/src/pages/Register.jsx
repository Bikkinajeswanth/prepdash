import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../lib/api.js'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const { token } = await registerUser({ name, email, password })
      localStorage.setItem('token', token)
      navigate('/dashboard')
    } catch (e) {
      setError(e?.response?.data?.message || 'Registration failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 card">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="w-full bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-2" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
        <input className="w-full bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-2" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
      </form>
      <div className="text-sm text-slate-400 mt-3">Have an account? <Link to="/login" className="text-brand-blue">Login</Link></div>
    </div>
  )
}


