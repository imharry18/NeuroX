// src/components/About.jsx
import Link from "next/link";

export default function About() {
  const technologies = [
    "React",
    "TensorFlow / PyTorch",
    "Python",
    "Flask / Node",
    "Deep Learning",
    "Medical Imaging"
  ];

  return (
    <section id="about" className="py-24 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                About NeuroX
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                NeuroX is an AI-powered medical assistant designed to assist in the early detection of brain tumors and intelligent analysis of blood reports using advanced machine learning techniques.
              </p>
              <div className="pt-4">
                <Link
                  href="/about-us"
                  className="inline-flex items-center text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                >
                  Learn More About Us
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-sm font-medium hover:border-cyan-500/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}