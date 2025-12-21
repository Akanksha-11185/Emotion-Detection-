export default function Privacy() {
  return (
    <div className="pt-20 pb-16 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>

        <p className="text-slate-700 dark:text-slate-400 max-w-3xl mb-12 leading-relaxed">
          Emotion Support is designed with privacy, anonymity, and user safety
          as foundational principles. This page explains how data is handled
          and the boundaries of the platform.
        </p>

        {/* Data Collection */}
        <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-4">
          Data Collection
        </h2>

        <div className="space-y-4 mb-10">
          <div className="rounded-lg bg-blue-50 border border-blue-200 dark:bg-slate-800/30 dark:border-slate-700/50 p-5 text-slate-700 dark:text-slate-300">
            No user login or personal identification is required to use the platform.
          </div>

          <div className="rounded-lg bg-blue-50 border border-blue-200 dark:bg-slate-800/30 dark:border-slate-700/50 p-5 text-slate-700 dark:text-slate-300">
            Emotion Support does not collect names, email addresses, or personal identifiers
            during anonymous usage.
          </div>
        </div>

        {/* Data Processing */}
        <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-4">
          Data Processing
        </h2>

        <div className="space-y-4 mb-10">
          <div className="rounded-lg bg-blue-50 border border-blue-200 dark:bg-slate-800/30 dark:border-slate-700/50 p-5 text-slate-700 dark:text-slate-300">
            Messages are processed temporarily in memory to generate emotion analysis.
          </div>

          <div className="rounded-lg bg-blue-50 border border-blue-200 dark:bg-slate-800/30 dark:border-slate-700/50 p-5 text-slate-700 dark:text-slate-300">
            User messages are not permanently stored or used for profiling.
          </div>
        </div>

        {/* Access & Security */}
        <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-4">
          Access & Security
        </h2>

        <div className="space-y-4 mb-10">
          <div className="rounded-lg bg-blue-50 border border-blue-200 dark:bg-slate-800/30 dark:border-slate-700/50 p-5 text-slate-700 dark:text-slate-300">
            All interactions are anonymous and isolated per session.
          </div>

          <div className="rounded-lg bg-blue-50 border border-blue-200 dark:bg-slate-800/30 dark:border-slate-700/50 p-5 text-slate-700 dark:text-slate-300">
            Administrative access is strictly restricted and monitored.
          </div>
        </div>

        {/* Responsible Use */}
        <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-4">
          Responsible Use & Limitations
        </h2>

        <div className="space-y-4 mb-12">
          <div className="rounded-lg bg-blue-50 border border-blue-200 dark:bg-slate-800/30 dark:border-slate-700/50 p-5 text-slate-700 dark:text-slate-300">
            Emotion Support is not a replacement for professional mental health services.
          </div>

          <div className="rounded-lg bg-blue-50 border border-blue-200 dark:bg-slate-800/30 dark:border-slate-700/50 p-5 text-slate-700 dark:text-slate-300">
            The platform provides AI-assisted insights and does not offer diagnosis or treatment.
          </div>
        </div>

        {/* Closing */}
        <p className="text-slate-500 text-sm max-w-3xl">
          Your privacy and safety are central to every design and engineering decision
          made in Emotion Support.
        </p>

      </div>
    </div>
  );
}
