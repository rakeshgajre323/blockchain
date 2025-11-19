import React from "react";

function LoginStudent() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Student Login</h2>
      <input type="email" placeholder="Email" /> <br /><br />
      <input type="password" placeholder="Password" /> <br /><br />
      <button>Login</button>
    </div>
  );
}

export default LoginStudent;
