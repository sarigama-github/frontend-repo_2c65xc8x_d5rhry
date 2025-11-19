import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const Layer = ({ speed = 10, children, className = '' }) => {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const x = useTransform(mx, (v) => v / speed)
  const y = useTransform(my, (v) => v / speed)

  useEffect(() => {
    const handler = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mx.set(e.clientX - cx)
      my.set(e.clientY - cy)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mx, my])

  return (
    <motion.div style={{ x, y }} className={`absolute inset-0 ${className}`}>
      {children}
    </motion.div>
  )
}

const MountainSVG = ({ className = '', fill = '#94a3b8' }) => (
  <svg className={className} viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path fill={fill} d="M0,256L120,224C240,192,480,128,720,128C960,128,1200,192,1320,224L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
  </svg>
)

const TreeSVG = ({ className = '', fill = '#14532d' }) => (
  <svg className={className} viewBox="0 0 64 64">
    <path fill={fill} d="M32 2l10 14h-6l8 12h-6l8 12h-8v12h-4V40h-8l8-12h-6l8-12h-6L32 2z" />
  </svg>
)

const Snowflake = ({ className = '' }) => (
  <div className={`w-2 h-2 rounded-full bg-white/90 ${className}`} />
)

export default function ParallaxScene({ theme = 'mountains' }) {
  return (
    <div className="relative h-[70vh] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-sky-900 via-slate-900 to-slate-950">
      {/* sky glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.12),transparent_40%)]" />

      {/* far stars */}
      <Layer speed={60}>
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-10 left-1/4 w-1 h-1 bg-white/60 rounded-full" />
          <div className="absolute top-24 left-2/3 w-1 h-1 bg-white/40 rounded-full" />
          <div className="absolute top-40 left-1/2 w-1 h-1 bg-white/70 rounded-full" />
        </div>
      </Layer>

      {/* mountains/jungle base */}
      {theme === 'mountains' && (
        <>
          <Layer speed={30}>
            <MountainSVG className="absolute bottom-40 w-[140%] -left-20 opacity-70" fill="#334155" />
          </Layer>
          <Layer speed={18}>
            <MountainSVG className="absolute bottom-24 w-[140%] -left-24 opacity-90" fill="#475569" />
          </Layer>
          <Layer speed={12}>
            <MountainSVG className="absolute bottom-10 w-[140%] -left-28" fill="#64748b" />
          </Layer>
        </>
      )}

      {theme === 'jungle' && (
        <>
          <Layer speed={22}>
            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-emerald-900 to-transparent" />
          </Layer>
          <Layer speed={16}>
            <div className="absolute bottom-16 left-10 flex gap-6 opacity-80">
              {Array.from({ length: 6 }).map((_, i) => (
                <TreeSVG key={i} className="w-16 h-16" fill={i % 2 ? '#065f46' : '#064e3b'} />
              ))}
            </div>
          </Layer>
          <Layer speed={10}>
            <div className="absolute bottom-4 left-0 right-0 flex justify-around opacity-95">
              {Array.from({ length: 8 }).map((_, i) => (
                <TreeSVG key={i} className="w-20 h-20" fill={i % 2 ? '#166534' : '#14532d'} />
              ))}
            </div>
          </Layer>
        </>
      )}

      {theme === 'snow' && (
        <>
          <Layer speed={28}>
            <MountainSVG className="absolute bottom-20 w-[140%] -left-24" fill="#93c5fd" />
          </Layer>
          <Layer speed={14}>
            <MountainSVG className="absolute bottom-8 w-[140%] -left-28" fill="#bfdbfe" />
          </Layer>
          <Layer speed={6}>
            <div className="absolute inset-0">
              {Array.from({ length: 80 }).map((_, i) => (
                <Snowflake key={i} className={`absolute top-[${Math.random()*100}%] left-[${Math.random()*100}%] animate-[fall_10s_linear_infinite]`} />
              ))}
            </div>
          </Layer>
        </>
      )}

      {/* foreground fog */}
      <Layer speed={8}>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent" />
      </Layer>

      {/* title */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">Namaste, Nepali Students</h1>
        <p className="mt-4 text-slate-200/90 max-w-2xl">Personalized resources, tasks, and a calming parallax scene inspired by the Himalayas, jungles, and snowfall.</p>
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(90vh); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
