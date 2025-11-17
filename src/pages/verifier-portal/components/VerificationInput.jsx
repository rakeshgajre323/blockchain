import React, { useState } from "react";

const VerificationInput = ({ onVerify }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onVerify) onVerify(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-4 justify-center mt-8"
    >
      <input
        type="text"
        placeholder="Enter certificate ID or hash"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Verify
      </button>
    </form>
  );
};

export default VerificationInput;
