"use client";

import React, { useState } from "react";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is WorkerDocs?",
      answer:
        "WorkerDocs is a worker document and profile management platform that lets UK workers and contractors store, organize, and track their work-related documents and qualifications in one secure place.",
    },
    {
      question: "What documents can I keep in WorkerDocs?",
      answer:
        "You can keep essential workforce records including Right to Work share codes, CSCS and trade cards, passport or photo ID details, proof of address, vocational qualifications (like NVQs), and safety certificates.",
    },
    {
      question: "Can I track document expiry dates?",
      answer:
        "Yes. WorkerDocs lets you record expiry dates on cards, tickets, and certificates so you can see at a glance what is active and what needs renewal.",
    },
    {
      question: "Can I update my documents?",
      answer:
        "Yes. Whenever you complete new training, renew a trade card, or update your address, you can update your records directly in your profile.",
    },
    {
      question: "How does WorkerDocs relate to StaffBeacon?",
      answer:
        "WorkerDocs works alongside the StaffBeacon ecosystem. While StaffBeacon helps workers connect with job opportunities, WorkerDocs ensures your documentation, qualifications, and profile are ready for site inductions.",
    },
    {
      question: "How do I get started?",
      answer:
        "Getting started takes just a few minutes. Create your profile, upload or enter your primary work documents, and keep your verified records organized for your next opportunity.",
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0052FF] font-mono">
            QUESTIONS &amp; ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950 font-sans mt-1.5">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-gray-500 font-sans">
            Clear, straightforward answers about WorkerDocs.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const buttonId = `faq-trigger-${idx}`;
            const regionId = `faq-panel-${idx}`;

            return (
              <div
                key={idx}
                className="rounded-xl border border-gray-200/90 bg-white overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  id={buttonId}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={regionId}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-gray-900 hover:text-[#0052FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] transition-colors"
                >
                  <span>{faq.question}</span>
                  <span
                    className="text-[#0052FF] text-xl font-mono leading-none shrink-0 font-medium"
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={regionId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 font-sans"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

