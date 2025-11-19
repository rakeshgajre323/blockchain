import React from "react";
import { useNavigate } from "react-router-dom";

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold mb-6">Select Login Type</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student */}
        <button
          onClick={() => navigate("/login/student")}
          className="p-6 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Student Login
        </button>

        {/* Institute */}
        <button
          onClick={() => navigate("/login/institute")}
          className="p-6 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Institute Login
        </button>

        {/* Company */}
        <button
          onClick={() => navigate("/login/company")}
          className="p-6 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
        >
          Company Login
        </button>
      </div>
    </div>
  );
};

export default LoginSelection;
