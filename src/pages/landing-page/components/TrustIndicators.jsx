import React from "react";

const TrustIndicators = () => {
  const indicators = [
    { label: "Blockchain Verified", description: "Each certificate is permanently recorded on-chain." },
    { label: "Tamper Proof", description: "Impossible to fake or alter issued credentials." },
    { label: "Instant Verification", description: "Employers and institutions can verify within seconds." },
    { label: "Open Access", description: "Learners can share credentials anywhere, anytime." },
  ];

  return (
    <section className="bg-white py-16 px-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">Why Trust SkillChain?</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {indicators.map((item, idx) => (
          <div
            key={idx}
            className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-gray-50"
          >
            <h3 className="font-semibold text-blue-700 mb-2">{item.label}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustIndicators;
