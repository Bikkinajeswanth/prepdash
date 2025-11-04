import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-slate-800/60 transition-colors ${isActive ? 'bg-slate-800/60 text-white' : 'text-slate-300'}`

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 min-h-screen sticky top-0 flex-col gap-2 p-4 border-r border-slate-800 bg-slate-950/80">
      <div className="text-xl font-bold mb-2">
        <span className="bg-gradient-to-r from-brand-blue to-brand-pink bg-clip-text text-transparent">PrepDash</span>
      </div>
      <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
      <NavLink to="/practice" className={linkClass}>Practice</NavLink>
      <NavLink to="/results" className={linkClass}>Results</NavLink>
      <NavLink to="/resume" className={linkClass}>Resume</NavLink>
    </aside>
  )
}


