// src/components/ContactCTA.jsx
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Ready to experience Next-Gen Healthcare?
        </h2>
        <p className="text-lg text-slate-400 mb-10">
          Get in touch with our team or try the diagnostic tools today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex justify-center items-center px-8 py-3.5 text-base font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-200 transition-all w-full sm:w-auto"
          >
            Contact Us
          </Link>
          <Link
            href="/brain-tumor-app"
            className="inline-flex justify-center items-center px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 shadow-lg transition-all w-full sm:w-auto"
          >
            Try NeuroX Now
          </Link>
        </div>
      </div>
    </section>
  );
}