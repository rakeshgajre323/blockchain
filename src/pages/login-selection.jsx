// src/pages/login-selection.jsx
import React from "react";
import { Link } from "react-router-dom";

function LoginSelection() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Select Your Login Type</h2>

      <div style={{ marginTop: "30px", display: "flex", gap: "20px", justifyContent: "center" }}>
        <Link to="/login/student">
          <button style={{ padding: "10px 20px" }}>Student Login</button>
        </Link>

        <Link to="/login/institute">
          <button style={{ padding: "10px 20px" }}>Institute Login</button>
        </Link>

        <Link to="/login/company">
          <button style={{ padding: "10px 20px" }}>Company Login</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginSelection;
