import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  return (
    <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-800">
      <div className="max-w-6xl mx-auto flex items-center gap-3 p-4">
        <div className="flex-1">
          <input placeholder="Search..." className="w-full bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue" />
        </div>
        <div className="flex items-center gap-3">
          {token ? (
            <button className="btn btn-pink" onClick={() => { localStorage.removeItem('token'); navigate('/login') }}>Logout</button>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
          )}
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-brand-blue to-brand-pink" />
        </div>
      </div>
    </div>
  )
}


