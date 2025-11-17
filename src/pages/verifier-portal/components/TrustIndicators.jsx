import React from "react";

const TrustIndicators = () => {
  const indicators = [
    {
      title: "Blockchain Verified",
      description:
        "All credentials are verified and stored securely on the blockchain ledger.",
    },
    {
      title: "Instant Verification",
      description:
        "Employers and institutions can confirm authenticity instantly.",
    },
    {
      title: "Tamper-Proof",
      description:
        "Once issued, records cannot be modified or forged — fully immutable.",
    },
    {
      title: "Transparent & Trusted",
      description:
        "Every transaction is traceable, ensuring complete trust and auditability.",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Why Verify with SkillChain?
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {indicators.map((item, i) => (
          <div
            key={i}
            className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-gray-50"
          >
            <h3 className="font-semibold text-blue-700 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustIndicators;
