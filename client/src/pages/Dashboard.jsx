import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="col-span-2 card p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-sm">Upcoming Mock Test</div>
              <div className="text-xl font-semibold">DSA Fundamentals - 9:00 AM, Tomorrow</div>
            </div>
            <Link to="/practice" className="btn btn-primary">Start Practice</Link>
          </div>
        </div>
        <div className="card p-5">
          <div className="text-slate-400 text-sm">Overall Progress</div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-3">
            <div className="bg-brand-blue h-3 rounded-full" style={{ width: '62%' }} />
          </div>
          <div className="text-sm text-slate-400 mt-1">62% complete</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {[1,2,3].map(i => (
          <div key={i} className="card p-5">
            <div className="text-slate-400 text-sm">Interview Tip {i}</div>
            <div className="mt-1">Prepare a concise story for each resume bullet. Use STAR.</div>
            <button className="mt-4 btn btn-pink">Read More</button>
          </div>
        ))}
      </div>
    </div>
  )
}


