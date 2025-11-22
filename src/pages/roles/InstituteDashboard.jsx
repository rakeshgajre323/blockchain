import React, { useState } from "react";

const InstituteDashboard = () => {
  const [data, setData] = useState({
    studentApparId: "",
    certificate: ""
  });

  const issueCertificate = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/institute/issue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
  };

  return (
    <div className="container-box">
      <h3 className="text-xl font-semibold mb-4">Issue Certificate</h3>

      <input
        className="input-field"
        placeholder="Student APPAR ID"
        onChange={(e) => setData({ ...data, studentApparId: e.target.value })}
      />

      <input
        className="input-field"
        placeholder="Certificate Name"
        onChange={(e) => setData({ ...data, certificate: e.target.value })}
      />

      <button className="btn-primary w-full my-3" onClick={issueCertificate}>
        Issue Certificate
      </button>
    </div>
  );
};

export default InstituteDashboard;
