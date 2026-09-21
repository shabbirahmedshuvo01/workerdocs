import React from "react";

export function TrustStatement() {
  return (
    <section className="bg-[#F8FAFC] border-b border-gray-100 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0052FF]">
          WORKERDOCS / STAFFBEACON
        </span>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
          One profile. One place for your documents.
        </h2>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
          WorkerDocs is designed to keep important employment and qualification
          documents organized in one verified record. Workers no longer need to
          repeatedly search for, rescan, or resubmit the same paperwork every time
          they start a new contract or placement.
        </p>

        {/* 3 simple highlights */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-3xl mx-auto border-t border-gray-200/60 mt-6">
          <div>
            <p className="font-bold text-gray-950 text-sm font-sans">
              Single Worker Profile
            </p>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              Enter your details once
            </p>
          </div>
          <div>
            <p className="font-bold text-[#0052FF] text-sm font-sans">
              organized Credentials
            </p>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              Qualifications &amp; trade cards together
            </p>
          </div>
          <div>
            <p className="font-bold text-gray-950 text-sm font-sans">
              Contract Ready
            </p>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              Ready whenever opportunity calls
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

