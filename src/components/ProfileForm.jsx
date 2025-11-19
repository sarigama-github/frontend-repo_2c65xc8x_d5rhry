import { useState } from 'react'

export default function ProfileForm({ onCreated }) {
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')
  const [region, setRegion] = useState('Kathmandu')
  const [theme, setTheme] = useState('mountains')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const save = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, grade, region, theme })
      })
      if (!res.ok) throw new Error('Failed to save')
      const data = await res.json()
      onCreated?.({ id: data.id, name, grade, region, theme })
      setName(''); setGrade('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={save} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-slate-200 mb-1">Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} required className="w-full px-3 py-2 rounded bg-slate-900/60 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500" />
        </div>
        <div>
          <label className="block text-sm text-slate-200 mb-1">Grade</label>
          <input value={grade} onChange={(e)=>setGrade(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/60 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500" />
        </div>
        <div>
          <label className="block text-sm text-slate-200 mb-1">Region</label>
          <input value={region} onChange={(e)=>setRegion(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/60 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500" />
        </div>
        <div>
          <label className="block text-sm text-slate-200 mb-1">Theme</label>
          <select value={theme} onChange={(e)=>setTheme(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/60 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500">
            <option value="mountains">Mountains</option>
            <option value="jungle">Jungle</option>
            <option value="snow">Snow</option>
          </select>
        </div>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button disabled={loading} className="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-50">
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  )
}
