// src/components/ProjectReport.jsx
import Link from "next/link";

export default function ProjectReport() {
  return (
    <section id="project-report" className="py-24 border-b border-slate-900 bg-slate-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-slate-700 mb-8 shadow-lg">
          <svg className="w-8 h-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
          Project Research & Documentation
        </h2>
        <p className="text-lg text-slate-400 mb-10 leading-relaxed">
          Explore the research methodology, datasets, model architecture, and experimental results behind NeuroX.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/research"
            className="inline-flex justify-center items-center px-8 py-3.5 text-base font-semibold text-white bg-slate-800 border border-slate-700 rounded-lg hover:border-cyan-500 hover:bg-slate-800 transition-all w-full sm:w-auto"
          >
            View Project Report
          </Link>
          <a
            href="/assets/NeuroX_Report.pdf"
            download
            className="inline-flex justify-center items-center px-8 py-3.5 text-base font-semibold text-slate-300 bg-transparent border border-slate-700 rounded-lg hover:text-white hover:border-slate-500 transition-all w-full sm:w-auto"
          >
            Download PDF
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}