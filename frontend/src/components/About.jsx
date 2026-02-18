import Link from "next/link";

export default function About() {
  const technologies = [
    "React / Next.js",
    "TensorFlow / PyTorch",
    "Python API",
    "Computer Vision",
    "Clinical NLP",
    "DICOM Processing"
  ];

  return (
    <section id="about" className="py-24 border-b border-white/5 bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Architecture & Infrastructure
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              NeuroX is built on a scalable, secure architecture designed for clinical environments. By combining modern front-end frameworks with robust Python-based machine learning backends, we deliver instantaneous, reliable diagnostic support.
            </p>
            <div className="pt-4">
              <Link
                href="/about-us"
                className="inline-flex items-center text-sm font-medium text-white hover:text-zinc-400 transition-colors group"
              >
                Read the Technical Whitepaper
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-6 font-medium">Core Stack</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-black border border-white/10 rounded-md text-zinc-300 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}