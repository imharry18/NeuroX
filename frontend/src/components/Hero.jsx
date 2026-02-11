// src/components/Hero.jsx
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-slate-900">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left -> Text */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              AI-Powered Medical Intelligence for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Early Disease Detection</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
              Upload MRI scans or blood reports and let NeuroX assist in detecting brain tumors and analyzing medical data instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/brain-tumor-app"
                className="inline-flex justify-center items-center px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25"
              >
                Analyze MRI Scan
              </Link>
              <Link
                href="/blood-report-app"
                className="inline-flex justify-center items-center px-8 py-3.5 text-base font-semibold text-white bg-slate-900 border border-slate-700 rounded-lg hover:border-cyan-500 hover:bg-slate-800 transition-all"
              >
                Upload Blood Report
              </Link>
            </div>
          </div>

          {/* Right -> Image / AI Brain Graphic */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-md aspect-square rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group p-8">
              {/* Abstract Brain/Medical AI Graphic */}
              <div className="relative w-48 h-48 mb-6">
                <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
                <div className="absolute inset-4 border-4 border-blue-500/50 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="w-full bg-slate-950/80 backdrop-blur border border-slate-800 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-400">AI Medical Dashboard</span>
                  <span className="text-xs font-semibold text-emerald-400">Processing...</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 w-2/3 h-full rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}