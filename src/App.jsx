// src/App.jsx

import React, { useEffect, useState } from "react";
import AppRoutes from "./Routes";
import { getHealth } from "./api"; // Checks backend status

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const data = await getHealth();
        if (data?.message) {
          setBackendStatus(`Backend is working 🚀`);
        } else {
          setBackendStatus("Backend responded but no message received");
        }
      } catch (error) {
        setBackendStatus("Backend not working ❌");
      }
    };

    checkBackend();
  }, []);

  return (
    <>
      {/* 🔹 Status Banner */}
      <div style={{ background: "#f0f0f0", padding: "8px", textAlign: "center" }}>
        <strong>Backend status:</strong> {backendStatus}
      </div>

      {/* 🔹 Main App Routes */}
      <AppRoutes />
    </>
  );
}

export default App;
