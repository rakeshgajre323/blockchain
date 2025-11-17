import React from "react";

const TrustSignals = () => {
  const signals = [
    {
      title: "Secure Blockchain Technology",
      description: "All issued credentials are permanently stored on blockchain for tamper-proof authenticity."
    },
    {
      title: "Verified Issuers Only",
      description: "Only trusted institutions can issue credentials, ensuring reliability and integrity."
    },
    {
      title: "Instant Validation",
      description: "Employers can verify certificates instantly using the blockchain ledger."
    },
    {
      title: "Privacy-Focused",
      description: "Data sharing is permission-based and fully transparent."
    }
  ];

  return (
    <section className="bg-gray-50 py-16 px-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Why Choose SkillChain Authentication?
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {signals.map((signal, i) => (
          <div
            key={i}
            className="p-6 border rounded-xl shadow-sm hover:shadow-md bg-white transition"
          >
            <h3 className="font-semibold text-blue-700 mb-2">{signal.title}</h3>
            <p className="text-gray-600 text-sm">{signal.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSignals;
