import Link from "next/link";

export default function BloodReport() {
  return (
    <section id="blood-report" className="py-24 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
                Automated Hematology Analysis
              </h2>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                Instantly digitize and evaluate complex blood panel reports. Our OCR and NLP pipeline extracts key biomarkers, cross-referencing values against established clinical thresholds.
              </p>
            </div>
            
            <ul className="space-y-4">
              {[
                "Optical Character Recognition (OCR) for PDFs/Images",
                "Intelligent parameter mapping",
                "Flagging of critical out-of-bound variables",
                "Longitudinal data structuring"
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-zinc-300">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-4 flex-shrink-0"></div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href="/blood-report-app"
                className="inline-flex items-center text-sm font-medium text-white hover:text-zinc-400 transition-colors group"
              >
                Upload Patient Report
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl bg-zinc-950 border border-white/10 flex flex-col p-6 shadow-2xl relative">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                <span className="text-sm font-medium text-white tracking-wide">Complete Blood Count (CBC)</span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">Verified</span>
              </div>
              <div className="space-y-2 w-full font-mono text-sm">
                
                <div className="flex justify-between items-center bg-black p-3 border border-white/5 rounded-md">
                  <span className="text-zinc-500">Hemoglobin (HGB)</span>
                  <div className="flex items-center gap-4">
                    <span className="text-white">14.2 g/dL</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-black p-3 border border-white/5 rounded-md">
                  <span className="text-zinc-500">White Blood Cells</span>
                  <div className="flex items-center gap-4">
                    <span className="text-white">12.5 x10³/µL</span>
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-black p-3 border border-white/5 rounded-md">
                  <span className="text-zinc-500">Platelet Count</span>
                  <div className="flex items-center gap-4">
                    <span className="text-white">250 x10³/µL</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
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