// src/components/BloodReport.jsx
import Link from "next/link";

export default function BloodReport() {
  return (
    <section id="blood-report" className="py-24 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left -> Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              AI Blood Report Analyzer
            </h2>
            <p className="text-lg text-slate-400">
              Upload your blood report and NeuroX will analyze medical parameters and highlight abnormal values instantly.
            </p>
            
            <ul className="space-y-4 pt-4">
              {[
                "Automatic Parameter Detection",
                "Abnormal Value Highlighting",
                "Medical Summary",
                "Quick Health Insights"
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-slate-300">
                  <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <Link
                href="/blood-report-app"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-slate-900 border border-slate-700 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-all"
              >
                Upload Blood Report
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right -> Image Visualization */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-slate-900 border border-slate-800 flex flex-col p-6 shadow-xl relative">
              <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                <span className="text-white font-semibold">Blood Panel Results</span>
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">Scanned</span>
              </div>
              <div className="space-y-4 w-full">
                {/* Mock Data Rows */}
                <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-sm">Hemoglobin</span>
                  <span className="text-emerald-400 font-bold">14.2 g/dL</span>
                </div>
                <div className="flex justify-between items-center bg-red-950/20 p-3 rounded-lg border border-red-900/50">
                  <span className="text-slate-400 text-sm">WBC Count</span>
                  <span className="text-red-400 font-bold">12.5 x10³/µL (High)</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-sm">Platelets</span>
                  <span className="text-emerald-400 font-bold">250 x10³/µL</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}