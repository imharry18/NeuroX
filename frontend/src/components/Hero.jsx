import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative pt-24 pb-24 lg:pt-36 lg:pb-32 overflow-hidden border-b border-white/5">
      {/* Subtle background grid for clinical tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              NeuroX Platform v2.0 Live
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] tracking-tight">
              Clinical-Grade AI for <br className="hidden md:block"/>
              <span className="text-zinc-400">Diagnostic Precision.</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl leading-relaxed font-light">
              Empower healthcare professionals with deep learning infrastructure. Automate the analysis of MRI neuroimaging and comprehensive hematology reports with high-confidence accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/brain-tumor-app"
                className="inline-flex justify-center items-center px-6 py-3 text-sm font-medium text-black bg-white rounded-md hover:bg-zinc-200 transition-all"
              >
                Access MRI Analysis
              </Link>
              <Link
                href="/blood-report-app"
                className="inline-flex justify-center items-center px-6 py-3 text-sm font-medium text-white bg-transparent border border-white/20 rounded-md hover:bg-white/5 transition-all"
              >
                Process Blood Panel
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-lg aspect-[4/3] rounded-xl bg-zinc-950 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col">
              {/* Dashboard Header */}
              <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-zinc-900/50">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                <span className="ml-auto text-[10px] text-zinc-500 font-mono uppercase tracking-widest">NX-SYS-STATUS: ACTIVE</span>
              </div>
              
              {/* Dashboard Content */}
              <div className="p-6 flex-1 flex flex-col gap-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Diagnostic Confidence</h3>
                    <p className="text-2xl font-light text-white">99.4%</p>
                  </div>
                  <div className="p-2 border border-white/5 rounded bg-white/5">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-3 mt-auto">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-500 font-mono">
                      <span>Neural Net Processing</span>
                      <span className="text-white">Complete</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1 rounded-none overflow-hidden">
                      <div className="bg-indigo-500 w-full h-full"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-500 font-mono">
                      <span>Feature Extraction</span>
                      <span className="text-white">Active</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1 rounded-none overflow-hidden">
                      <div className="bg-zinc-500 w-2/3 h-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}