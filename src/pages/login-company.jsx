import React from "react";

function LoginCompany() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Company Login</h2>
      <input type="email" placeholder="Email" /> <br /><br />
      <input type="password" placeholder="Password" /> <br /><br />
      <button>Login</button>
    </div>
  );
}

export default LoginCompany;
