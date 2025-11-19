import { useEffect, useState } from 'react'

export default function Resources() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/resources`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">Latest Resources</h3>
        <a href="#" className="text-sky-400 text-sm">Submit a link</a>
      </div>
      {loading ? (
        <p className="text-slate-300 text-sm">Loading...</p>
      ) : (
        <ul className="space-y-3">
          {items.map((r)=> (
            <li key={r._id} className="p-3 rounded bg-slate-900/60 border border-white/10">
              <a className="text-sky-300 hover:text-sky-200" href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
              <div className="text-xs text-slate-400 mt-1">{r.category} • {r.region}</div>
            </li>
          ))}
          {items.length === 0 && (
            <li className="text-slate-400 text-sm">No resources yet. Add some from the backend or ask me to seed data.</li>
          )}
        </ul>
      )}
    </div>
  )
}
