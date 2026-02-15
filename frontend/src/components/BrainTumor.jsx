import Link from "next/link";

export default function BrainTumor() {
  return (
    <section id="brain-tumor" className="py-24 border-b border-white/5 bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-xl border border-white/10 bg-black flex items-center justify-center relative overflow-hidden group">
               {/* Clinical crosshair aesthetic */}
               <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                 <div className="w-full h-[1px] bg-zinc-700"></div>
                 <div className="h-full w-[1px] bg-zinc-700 absolute"></div>
                 <div className="w-32 h-32 border border-zinc-600 rounded-full absolute"></div>
               </div>
               
               <div className="text-center z-10 p-6 bg-black/60 backdrop-blur-sm border border-white/5 rounded-lg">
                 <svg className="w-12 h-12 mx-auto text-indigo-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
                 <span className="text-sm text-zinc-300 font-medium tracking-wide">AWAITING DICOM/JPEG INPUT</span>
               </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
                Neuro-Oncology Imaging
              </h2>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                Utilize highly-trained convolutional neural networks to evaluate cranial MRI scans. The system maps morphological anomalies to assist radiologists in identifying and classifying tumor structures.
              </p>
            </div>
            
            <ul className="space-y-4">
              {[
                "High-resolution scan parsing",
                "Sub-millimeter anomaly detection",
                "Multi-class tumor categorization",
                "Exportable diagnostic reports"
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-zinc-300">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-4 flex-shrink-0"></div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href="/brain-tumor-app"
                className="inline-flex items-center text-sm font-medium text-white hover:text-indigo-400 transition-colors group"
              >
                Initialize Scan Protocol
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}