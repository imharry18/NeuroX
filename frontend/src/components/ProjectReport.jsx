import Link from "next/link";

export default function ProjectReport() {
  return (
    <section id="project-report" className="py-32 border-b border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
          Evidence-Based Validation
        </h2>
        <p className="text-lg text-zinc-400 font-light mb-10 leading-relaxed">
          Transparency is critical in healthcare software. Review our methodology, training datasets, model evaluation metrics, and peer-reviewed protocols.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/research"
            className="inline-flex justify-center items-center px-6 py-3 text-sm font-medium text-black bg-white rounded-md hover:bg-zinc-200 transition-all w-full sm:w-auto"
          >
            Access Documentation
          </Link>
          <a
            href="/assets/NeuroX_Report.pdf"
            download
            className="inline-flex justify-center items-center px-6 py-3 text-sm font-medium text-white bg-transparent border border-white/20 rounded-md hover:bg-white/5 transition-all w-full sm:w-auto"
          >
            Download PDF Report
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}