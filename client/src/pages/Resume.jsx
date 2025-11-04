import { useCallback, useState } from 'react'

export default function Resume() {
  const [file, setFile] = useState(null)
  const onDrop = useCallback((e) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f) setFile(f)
  }, [])
  return (
    <div className="max-w-3xl mx-auto">
      <div className="card p-8 text-center border-dashed border-2 border-slate-700"
        onDragOver={(e) => e.preventDefault()} onDrop={onDrop}
      >
        <div className="text-xl font-semibold">Resume Upload</div>
        <div className="text-slate-400 mt-1">Drag & drop your PDF here</div>
        <div className="mt-4">
          <label className="btn btn-primary cursor-pointer">
            Choose File
            <input type="file" className="hidden" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
        </div>
        {file && <div className="mt-3 text-slate-300 text-sm">Selected: {file.name}</div>}
      </div>
    </div>
  )
}


