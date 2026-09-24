import React from "react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "CREATE YOUR PROFILE",
      description:
        "Add your core worker details, trade skills, and contact information once.",
    },
    {
      num: "02",
      title: "UPLOAD YOUR DOCUMENTS",
      description:
        "Add your Right to Work, trade cards, photo identification, and certifications.",
    },
    {
      num: "03",
      title: "KEEP EVERYTHING UP TO DATE",
      description:
        "Track document verification status and stay aware of approaching renewal dates.",
    },
    {
      num: "04",
      title: "STAY READY FOR YOUR NEXT ROLE",
      description:
        "Keep your compliance profile prepared and accessible for upcoming contract opportunities.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0052FF] font-mono">
            CONNECTED WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950 font-sans mt-1.5">
            How It Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            A simple, connected sequence designed to keep your employment documents
            organised and verified between contracts.
          </p>
        </div>

        {/* 4 Steps Timeline with subtle numbered indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 rounded-xl border border-gray-150 bg-[#FAFAFA] hover:border-blue-200 hover:bg-white transition-all duration-200 group"
            >
              <div>
                {/* Subtle Numbered Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm font-bold text-[#0052FF] bg-blue-50/80 border border-blue-100 px-2.5 py-1 rounded">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-gray-400">
                    STEP {idx + 1} OF 4
                  </span>
                </div>

                <h3 className="text-sm font-bold tracking-wider text-gray-950 font-sans uppercase">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>

              {/* Progress Notch Line */}
              <div className="w-10 h-0.5 bg-gray-200 group-hover:bg-[#0052FF] transition-colors mt-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

