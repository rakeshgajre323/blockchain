import React, { useState } from "react";

const DemoCertificateViewer = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="py-16 px-6 text-center bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        See How Verifiable Certificates Work
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        This demo shows how blockchain-backed certificates can be securely issued,
        verified, and shared with employers or institutions in seconds.
      </p>

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 border">
        <h3 className="text-lg font-bold text-gray-700">Blockchain Certificate</h3>
        <p className="text-sm text-gray-500 mb-4">Issued by SkillChain University</p>

        <div className="text-left text-gray-700">
          <p><strong>Recipient:</strong> John Doe</p>
          <p><strong>Course:</strong> Blockchain Fundamentals</p>
          <p><strong>Status:</strong> ✅ Verified on Blockchain</p>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showDetails ? "Hide Blockchain Proof" : "View Blockchain Proof"}
        </button>

        {showDetails && (
          <div className="mt-4 text-xs bg-gray-100 p-3 rounded-md text-left font-mono text-gray-600">
            <p><strong>Transaction Hash:</strong></p>
            <p>0x7f3d1a2b4c9e56...e4d7b8a1c3f2</p>
            <p><strong>Block:</strong> #1823047</p>
            <p><strong>Network:</strong> Ethereum Testnet (Sepolia)</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DemoCertificateViewer;
