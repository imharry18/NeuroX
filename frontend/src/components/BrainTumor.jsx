// src/components/BrainTumor.jsx
import Link from "next/link";

export default function BrainTumor() {
  return (
    <section id="brain-tumor" className="py-24 border-b border-slate-900 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left -> Image Visualization */}
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/3] rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-xl overflow-hidden relative group">
               {/* Decorative MRI scanning line */}
               <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/60 shadow-[0_0_15px_#06b6d4] z-10 animate-[pulse_2s_ease-in-out_infinite]"></div>
               <div className="text-center">
                 <svg className="w-20 h-20 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
                 <span className="text-slate-500 font-medium">MRI Scan Visualization</span>
               </div>
            </div>
          </div>

          {/* Right -> Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Brain Tumor Detection using Deep Learning
            </h2>
            <p className="text-lg text-slate-400">
              NeuroX analyzes MRI brain scans using trained deep learning models to assist in identifying potential tumor patterns.
            </p>
            
            <ul className="space-y-4 pt-4">
              {[
                "MRI Scan Upload",
                "AI Model Prediction",
                "Tumor Classification",
                "Visual Heatmap Detection"
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-slate-300">
                  <svg className="w-6 h-6 text-cyan-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <Link
                href="/brain-tumor-app"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-slate-900 border border-slate-700 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-all"
              >
                Upload MRI Scan
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}