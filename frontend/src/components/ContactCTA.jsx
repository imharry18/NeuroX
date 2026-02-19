import Link from "next/link";

export default function ContactCTA() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-zinc-950/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
          Deploy NeuroX in your facility.
        </h2>
        <p className="text-lg text-zinc-400 font-light mb-10">
          Request enterprise access, API keys, or speak directly with our integration engineers to establish a secure data pipeline.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex justify-center items-center px-6 py-3 text-sm font-medium text-black bg-white rounded-md hover:bg-zinc-200 transition-all w-full sm:w-auto"
          >
            Contact Integration Team
          </Link>
          <Link
            href="/demo"
            className="inline-flex justify-center items-center px-6 py-3 text-sm font-medium text-white bg-transparent border border-white/20 rounded-md hover:bg-white/5 transition-all w-full sm:w-auto"
          >
            Request Sandbox Access
          </Link>
        </div>
      </div>
    </section>
  );
}