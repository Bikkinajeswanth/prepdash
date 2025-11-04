import { useEffect, useState } from 'react'
import CircularProgress from '../components/CircularProgress.jsx'

export default function Results() {
  const [result, setResult] = useState({ correct: 0, total: 0, percentage: 0 })
  useEffect(() => {
    try {
      const raw = localStorage.getItem('lastResult')
      if (raw) setResult(JSON.parse(raw))
    } catch {}
  }, [])
  return (
    <div className="max-w-xl mx-auto card p-6 text-center">
      <h1 className="text-2xl font-semibold mb-4">Your Result</h1>
      <div className="flex justify-center">
        <CircularProgress value={result.percentage} />
      </div>
      <div className="mt-4 text-slate-300">Score: <span className="font-semibold text-white">{result.correct}</span> / {result.total}</div>
      <div className="mt-1 text-slate-400">Keep practicing to improve!</div>
    </div>
  )
}


