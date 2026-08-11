import { useEffect, useRef } from 'react'

export const MatrixRain = ({ color = '#22c55e' }: { color?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.offsetWidth
    let height = canvas.offsetHeight
    canvas.width = width
    canvas.height = height

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'.split('')
    const fontSize = 14
    let columns = width / fontSize
    let drops = Array(Math.floor(columns)).fill(1)

    let animationFrameId: number
    let lastTime = 0
    const fps = 20 // Slower matrix for subtle effect
    const interval = 1000 / fps

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw)
      const deltaTime = currentTime - lastTime
      if (deltaTime > interval) {
        lastTime = currentTime - (deltaTime % interval)

        ctx.globalCompositeOperation = 'destination-out'
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)' // Fading effect
        ctx.fillRect(0, 0, width, height)
        ctx.globalCompositeOperation = 'source-over'

        ctx.fillStyle = color
        ctx.font = `${fontSize}px monospace`

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)]
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)

          if (drops[i] * fontSize > height && Math.random() > 0.95) {
            drops[i] = 0
          }
          drops[i]++
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw)

    const handleResize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height
      columns = width / fontSize
      drops = Array(Math.floor(columns)).fill(1)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-20 dark:opacity-15 group-hover:opacity-30 dark:group-hover:opacity-25 transition-opacity duration-700 pointer-events-none rounded-2xl z-0" 
    />
  )
}

export const Waveform = ({ color = '#eab308' }: { color?: string }) => {
  return (
    <div className="absolute inset-0 w-full h-full opacity-20 dark:opacity-[0.15] group-hover:opacity-30 dark:group-hover:opacity-25 transition-opacity duration-700 pointer-events-none rounded-2xl overflow-hidden flex items-center justify-center z-0">
       <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-full animate-[pan_12s_linear_infinite]" style={{ minWidth: '200%' }}>
         <path d="M0,100 C100,0 300,200 400,100 C500,0 700,200 800,100" fill="none" stroke={color} strokeWidth="2" />
         <path d="M0,100 C150,200 250,0 400,100 C550,200 650,0 800,100" fill="none" stroke={color} strokeWidth="4" />
         <path d="M0,100 C50,150 350,50 400,100 C450,150 750,50 800,100" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
       </svg>
       <style>{`
         @keyframes pan {
           0% { transform: translateX(0); }
           100% { transform: translateX(-50%); }
         }
       `}</style>
    </div>
  )
}

export const Eclipse = ({ color = '#a855f7' }: { color?: string }) => {
  return (
    <div className="absolute inset-0 w-full h-full opacity-25 dark:opacity-15 group-hover:opacity-40 dark:group-hover:opacity-30 transition-opacity duration-700 pointer-events-none rounded-2xl overflow-hidden z-0 flex items-center justify-end pr-12">
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full" style={{ backgroundColor: color, filter: 'blur(2px)' }}>
        <div className="absolute inset-0 rounded-full bg-background animate-[eclipse_10s_ease-in-out_infinite]"></div>
      </div>
      <style>{`
        @keyframes eclipse {
          0% { transform: translateX(110%); }
          50% { transform: translateX(10%); }
          100% { transform: translateX(110%); }
        }
      `}</style>
    </div>
  )
}
