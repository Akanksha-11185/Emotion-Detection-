export default function ContactUs() {
  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold mb-10 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Contact Us
        </h1>

        <div className="bg-slate-800/40 p-8 rounded-xl border border-slate-700/50 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/20 transition-all">
          <p className="text-slate-300 mb-6 text-lg">
            Have feedback or questions? Reach out to us.
          </p>

          <p className="text-blue-400 text-lg font-semibold">
            📧 emotionsupport.ai@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
