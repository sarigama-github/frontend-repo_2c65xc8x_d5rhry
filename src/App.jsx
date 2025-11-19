import { useEffect, useState } from 'react'
import ParallaxScene from './components/ParallaxScene'
import ProfileForm from './components/ProfileForm'
import Resources from './components/Resources'

function App() {
  const [profiles, setProfiles] = useState([])
  const [theme, setTheme] = useState('mountains')

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/profiles`)
        const data = await res.json()
        setProfiles(data)
        if (data[0]?.theme) setTheme(data[0].theme)
      } catch (e) {
        // ignore
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-slate-900/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🇳🇵</span>
            <span className="text-white font-semibold">Nepali Students</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setTheme('mountains')} className={`px-3 py-1.5 rounded text-sm border ${theme==='mountains'?'bg-sky-600 text-white border-transparent':'bg-white/5 text-slate-200 border-white/10'}`}>Mountains</button>
            <button onClick={()=>setTheme('jungle')} className={`px-3 py-1.5 rounded text-sm border ${theme==='jungle'?'bg-sky-600 text-white border-transparent':'bg-white/5 text-slate-200 border-white/10'}`}>Jungle</button>
            <button onClick={()=>setTheme('snow')} className={`px-3 py-1.5 rounded text-sm border ${theme==='snow'?'bg-sky-600 text-white border-transparent':'bg-white/5 text-slate-200 border-white/10'}`}>Snow</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        <ParallaxScene theme={theme} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <ProfileForm onCreated={(p)=>{ setProfiles([p, ...profiles]); setTheme(p.theme) }} />
            <Resources />
          </div>
          <aside className="space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6">
              <h3 className="text-white font-semibold mb-3">Saved Profiles</h3>
              <ul className="space-y-2">
                {profiles.map((p)=> (
                  <li key={p._id || p.id} className="p-3 rounded bg-slate-900/60 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-slate-100">{p.name}</div>
                      <div className="text-xs text-slate-400">{p.grade || '—'} • {p.region || 'Nepal'}</div>
                    </div>
                    <span className="text-xs text-white/80 px-2 py-0.5 rounded bg-sky-600/70">{p.theme}</span>
                  </li>
                ))}
                {profiles.length===0 && (<li className="text-slate-400 text-sm">No profiles yet. Create one to personalize the scene.</li>)}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400">
        Made for Nepali learners • Switch themes to explore mountains, jungles, and snow
      </footer>
    </div>
  )
}

export default App
