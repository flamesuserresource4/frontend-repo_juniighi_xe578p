import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg tracking-tight">Approval Center</h1>
          <p className="mt-3 text-blue-100/90 max-w-xl mx-auto">Review and approve incoming requests quickly. Optimized for mobile workflows.</p>
        </div>
      </div>

      {/* gradient overlay to improve text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/40 to-slate-900/80" />
    </section>
  )
}

export default Hero
