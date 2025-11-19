import React from "react";
import { Link } from "react-router-dom";

const LoginSelection = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Choose Your Login</h1>
      <p>Select your role to continue</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/login/student">
          <button style={btnStyle}>Student Login</button>
        </Link>

        <Link to="/login/institute">
          <button style={btnStyle}>Institute Login</button>
        </Link>

        <Link to="/login/company">
          <button style={btnStyle}>Company Login</button>
        </Link>
      </div>
    </div>
  );
};

const btnStyle = {
  margin: "10px",
  padding: "12px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

export default LoginSelection;
