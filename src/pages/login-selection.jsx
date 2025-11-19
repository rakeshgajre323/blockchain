import React from "react";
import { useNavigate } from "react-router-dom";

function LoginSelection() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Select Login Type</h2>
      <br />
      <button onClick={() => navigate("/login/student")}>Student Login</button><br /><br />
      <button onClick={() => navigate("/login/institute")}>Institute Login</button><br /><br />
      <button onClick={() => navigate("/login/company")}>Company Login</button>
    </div>
  );
}

export default LoginSelection;
