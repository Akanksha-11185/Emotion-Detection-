export default function About() {
  return (
    <div className="pt-20 pb-16 bg-white dark:bg-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">


      <div className="max-w-6xl mx-auto px-6">

        {/* =========================
            ABOUT THE PLATFORM
        ========================== */}
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
          About Emotion Support
        </h1>

        <p className="text-slate-700 dark:text-slate-400  max-w-3xl mb-12 text-lg leading-relaxed">
          Emotion Support is a privacy-first AI platform designed to analyze
          emotional patterns in text. It provides real-time emotional insights
          while maintaining strict anonymity, data minimization, and ethical
          boundaries.
          <br /><br />
          The platform is built to support emotional awareness and early insight —
          not to replace professional mental health care.
        </p>

        {/* =========================
            AI & MODEL OVERVIEW
        ========================== */}
        <h2 className="text-3xl font-semibold mb-4 text-blue-400 dark:text-blue-400">
          AI & Emotion Analysis Methodology
        </h2>

        <p className="text-slate-700 dark:text-slate-400  max-w-4xl mb-6 leading-relaxed">
          Emotion Support uses modern natural language processing techniques to
          perform multi-class emotion classification on user-provided text.
          The system analyzes linguistic patterns and contextual signals to
          estimate emotional states in real time.
        </p>

        <ul className="list-disc list-inside text-slate-700 dark:text-slate-400  space-y-2 mb-12">
          <li>Transformer-based NLP emotion classification</li>
          <li>Context-aware text processing</li>
          <li>Real-time inference with probability-based outputs</li>
          <li>No long-term storage of user messages</li>
        </ul>

        {/* =========================
            PRIVACY & ETHICS
        ========================== */}
        <h2 className="text-3xl font-semibold mb-4 text-blue-400 dark:text-blue-400">
          Privacy, Safety & Ethical Boundaries
        </h2>

        <p className="text-slate-700 dark:text-slate-400  max-w-4xl mb-6 leading-relaxed">
          Emotional data is highly sensitive. Emotion Support is designed with
          privacy and ethical responsibility as first-class principles.
        </p>

        <ul className="list-disc list-inside text-slate-700 dark:text-slate-400  space-y-2 mb-12">
          <li>No login required for anonymous usage</li>
          <li>No personal identifiers collected</li>
          <li>Messages are processed temporarily and not permanently stored</li>
          <li>High-risk signals are handled cautiously and flagged securely</li>
          <li>No medical diagnosis or treatment recommendations are provided</li>
        </ul>

        {/* =========================
            LIMITATIONS
        ========================== */}
        <h2 className="text-3xl font-semibold mb-4 text-blue-400 dark:text-blue-400">
          Limitations & Responsible Use
        </h2>

        <p className="text-slate-700 dark:text-slate-400  max-w-4xl mb-12 leading-relaxed">
          Emotion Support provides AI-assisted emotional insights based on
          patterns in text. Human emotions are complex, contextual, and dynamic,
          and AI predictions may not always be accurate.
          <br /><br />
          This platform is not a substitute for professional mental health care.
          If a user is experiencing distress or crisis, they are encouraged to
          seek immediate help from qualified professionals or local emergency
          services.
        </p>

        {/* =========================
            TEAM (SECONDARY)
        ========================== */}
        <h2 className="text-3xl font-semibold mb-8 text-blue-400 dark:text-blue-400">
          Project Contributors
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[
            {
              name: "Akanksha",
              role: "Fullstack & ML Engineer",
              skills: "FastAPI, Machine Learning, NLP, System Design",
            },
            {
              name: "Aditya",
              role: "Fullstack & AI Engineer",
              skills: "React, Tailwind CSS, AI-Analysis UX/UI Design",
            },
          ].map((member, i) => (
            <div
              key={i}
              className="flex items-center gap-5 p-6 rounded-xl bg-blue-50 border border-blue-200 dark:bg-slate-800/30 dark:border-slate-700/50 hover:border-blue-400/40 transition-colors"
            >
              <div className="w-20 h-20 rounded-full bg-blue-500 dark:bg-gradient-to-br dark:from-blue-500 dark:to-indigo-600 p-1">

                <div className="w-full h-full rounded-full bg-blue-100 dark:bg-black flex items-center justify-center text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  {member.name[0]}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-blue-500 dark:text-blue-400  text-sm mb-1">
                  {member.role}
                </p>
                <p className="text-slate-700 dark:text-slate-400  text-sm">
                  {member.skills}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* =========================
            CLOSING NOTE
        ========================== */}
        <p className="text-slate-500 text-sm max-w-4xl">
          Emotion Support is an ongoing research-driven project focused on
          responsible AI use in emotionally sensitive contexts.
        </p>

      </div>
    </div>
  );
}
