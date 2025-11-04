import { useEffect, useMemo, useState } from 'react'
import { fetchQuestions, submitAnswers } from '../lib/api.js'
import { useNavigate } from 'react-router-dom'

export default function Practice() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [secondsLeft, setSecondsLeft] = useState(60 * 5)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const { questions } = await fetchQuestions(5)
        setQuestions(questions)
      } finally { setLoading(false) }
    })()
  }, [])

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (secondsLeft === 0) handleSubmit()
  }, [secondsLeft])

  const mmss = useMemo(() => {
    const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0')
    const s = (secondsLeft % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }, [secondsLeft])

  function choose(qid, idx) {
    setAnswers(prev => ({ ...prev, [qid]: idx }))
  }

  async function handleSubmit() {
    const nonEmpty = Object.keys(answers).length > 0
    const ids = questions.map(q => q.id)
    const payload = nonEmpty ? answers : Object.fromEntries(ids.map((id) => [id, -1]))
    const result = await submitAnswers(payload)
    localStorage.setItem('lastResult', JSON.stringify(result))
    navigate('/results')
  }

  if (loading) return <div className="text-slate-400">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Practice Test</h1>
        <div className="px-3 py-1 rounded-full bg-slate-800 text-slate-200">Time Left: {mmss}</div>
      </div>
      <div className="space-y-4">
        {questions.map((q, qi) => (
          <div key={q.id} className="card p-5">
            <div className="font-medium">{qi + 1}. {q.text}</div>
            <div className="mt-3 grid md:grid-cols-2 gap-2">
              {q.options.map((opt, idx) => (
                <label key={idx} className={`flex items-center gap-2 p-3 rounded-xl border ${answers[q.id] === idx ? 'border-brand-blue bg-slate-800/60' : 'border-slate-800 bg-slate-900/50'}`}>
                  <input type="radio" name={`q-${q.id}`} checked={answers[q.id] === idx} onChange={() => choose(q.id, idx)} />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}


