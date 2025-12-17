export default function ContactUs() {
  return (
    <div className="pt-20 pb-16 bg-white dark:bg-slate-950 min-h-screen">

      <div className="max-w-4xl mx-auto px-6">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
          Contact Us
        </h1>

        <p className="text-slate-700 dark:text-slate-400 max-w-2xl mb-12 leading-relaxed">
          We value feedback, questions, and responsible communication.
          If you’d like to reach out regarding the platform, research,
          or general inquiries, you can contact us below.
        </p>

        {/* Contact Card */}
        <div className="rounded-xl bg-blue-50 border border-blue-200 dark:bg-slate-800/30 dark:border-slate-700/50 p-8 mb-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            You can reach the Emotion Support team at:
          </p>

          <a
            href="mailto:emotionsupport.ai@gmail.com"
            className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-300 transition-colors"
          >
            <span className="text-xl">📧</span>
            emotionsupport.ai@gmail.com
          </a>

          <p className="text-slate-500 text-sm mt-4">
            We aim to respond to all inquiries within a reasonable timeframe.
          </p>
        </div>

        {/* When to Contact */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-4">
            When should you contact us?
          </h2>

          <ul className="list-disc list-inside text-slate-700 dark:text-slate-400 space-y-2">
            <li>Questions about how the platform works</li>
            <li>Feedback or suggestions for improvement</li>
            <li>Research or academic inquiries</li>
            <li>Reporting technical issues or concerns</li>
          </ul>
        </div>

        {/* Boundaries */}
        <div className="rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-blue-500 dark:text-blue-400 mb-3">
            Important Note
          </h2>

          <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed">
            Emotion Support does not provide emergency services or professional
            mental health treatment. Please do not use this contact channel
            for urgent emotional distress or crisis situations.
            <br /><br />
            If you or someone else is in immediate danger, please contact
            local emergency services or a qualified mental health professional.
          </p>
        </div>

      </div>
    </div>
  );
}
