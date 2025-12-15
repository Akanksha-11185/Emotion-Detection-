export default function About() {
  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          About Emotion Support
        </h1>

        <p className="text-slate-400 max-w-3xl mb-14 text-lg leading-relaxed">
          Emotion Support is an AI-powered platform built to help users
          understand their emotional state in a private, anonymous, and
          stigma-free way. Our aim is to combine technology and empathy to make
          emotional awareness accessible to everyone.
        </p>

        {/* Team Section */}
        <h2 className="text-3xl font-semibold mb-10 text-blue-400">
          Meet the Team
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Team Member Card */}
          {[
            {
              name: "Akanksha",
              role: "Fullstack & ML Engineer",
              skills: "FastAPI, Machine Learning, NLP, System Design",
            },
            {
              name: "Aditya",
              role: "Fullstack & AI Engineer",
              skills: "React, Tailwind CSS,AI-Analysis UX/UI Design",
            },
          ].map((member, i) => (
            <div
              key={i}
              className="flex items-center gap-6 p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50
                         hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/20
                         transition-all duration-300"
            >
              {/* IMAGE PLACEHOLDER */}
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl font-bold text-blue-400">
                    {member.name[0]}
                  </div>
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-400 mb-2 font-medium">{member.role}</p>
                <p className="text-slate-400">
                  <span className="text-slate-300 font-semibold">Skills:</span>{" "}
                  {member.skills}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="mt-16 max-w-4xl">
          <h2 className="text-3xl font-semibold mb-4 text-blue-400">
            Our Vision
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            We chose this problem statement to address the growing need for
            accessible mental health support. By leveraging AI responsibly,
            Emotion Support provides early emotional insights while maintaining
            strict privacy and ethical boundaries.
          </p>
        </div>
      </div>
    </div>
  );
}
