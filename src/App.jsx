// src/App.jsx

import React, { useEffect, useState } from "react";
import AppRoutes from "./Routes";
import { getHealth } from "./api"; // backend health checker

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const data = await getHealth();

        if (data?.message) {
          setBackendStatus("Backend is working 🚀");
        } else {
          setBackendStatus("Backend responded but message missing ⚠");
        }
      } catch (error) {
        setBackendStatus("Backend not working ❌");
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, []);

  return (
    <>
      {/* STATUS BANNER */}
      <div
        style={{
          background: loading ? "#fff3cd" : backendStatus.includes("🚀") ? "#d4edda" : "#f8d7da",
          padding: "8px",
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {loading ? "Checking backend..." : backendStatus}
      </div>

      {/* MAIN ROUTES */}
      <AppRoutes />
    </>
  );
}

export default App;
