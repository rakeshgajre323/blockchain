import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Blockchain-Based Skill Credentialing System
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-6">
        Securely issue, verify, and share skill credentials using blockchain technology. 
        Build trust between learners, issuers, and employers.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/issuer-authentication")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/learner-wallet")}
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
        >
          View Credentials
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
