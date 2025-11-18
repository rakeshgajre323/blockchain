// src/App.jsx
import React, { useEffect, useState } from "react";
import AppRoutes from "./Routes";
import { getHealth } from "./api";   // 👈 Make sure api.js exists

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");

  useEffect(() => {
    getHealth()
      .then((data) => setBackendStatus(data.message))
      .catch(() => setBackendStatus("Backend not working"));
  }, []);

  return (
    <>
      {/* Show API status at top */}
      <div style={{ background: "#e3e3e3", padding: "8px" }}>
        <p>Backend status: {backendStatus}</p>
      </div>

      {/* Keep your routes working */}
      <AppRoutes />
    </>
  );
}

export default App;
