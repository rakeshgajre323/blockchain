import React from "react";

/**
 * TrustedBy — a responsive partner/trust cards section.
 * Uses Tailwind classes. If you don't use Tailwind, see alternate CSS below.
 */

const partners = [
  {
    id: "skill-india",
    name: "Skill India",
    description: "Aligned with Skill India Mission",
    logo: "/assets/partners/skill-india.svg",
    badge: "Compliant",
  },
  {
    id: "ncvet",
    name: "NCVET",
    description: "NCVET Recognized Standards",
    logo: "/assets/partners/ncvet.svg",
    badge: "Certified",
  },
  {
    id: "blockchain",
    name: "Blockchain Secured",
    description: "Ethereum Blockchain Technology",
    logo: "/assets/partners/blockchain.svg",
    badge: "Secured",
  },
  {
    id: "iso-27001",
    name: "ISO 27001",
    description: "Information Security Standard",
    logo: "/assets/partners/iso27001.svg",
    badge: "Certified",
  },
];

const TrustedBy = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Trusted by Industry Leaders
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Our platform meets the highest standards of security, compliance, and reliability
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p) => (
            <article
              key={p.id}
              className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
              aria-labelledby={`${p.id}-title`}
            >
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                {/* preserve aspect ratio — use img instead of background for accessibility */}
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              <h3 id={`${p.id}-title`} className="text-lg font-semibold text-gray-800">
                {p.name}
              </h3>

              <p className="mt-2 text-sm text-gray-500">{p.description}</p>

              <div className="mt-4 text-sm text-green-600 flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{p.badge}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
