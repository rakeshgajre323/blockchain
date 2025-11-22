import React, { useState } from "react";

const CompanyDashboard = () => {
  const [apparId, setApparId] = useState("");
  const [studentData, setStudentData] = useState(null);

  const verifyStudent = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/company/check/${apparId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    if (data.success) setStudentData(data);
    else alert("Student not found");
  };

  return (
    <div className="container-box">
      <h3 className="text-xl font-semibold mb-4">Verify Student</h3>

      <input
        className="input-field"
        placeholder="Enter APPAR ID"
        onChange={(e) => setApparId(e.target.value)}
      />

      <button className="btn-primary w-full mt-3" onClick={verifyStudent}>
        Verify
      </button>

      {studentData && (
        <div className="mt-5">
          <h4 className="font-semibold">Certificates:</h4>
          <ul className="list-disc ml-6">
            {studentData.certificates.map((c, i) => (
              <li key={i}>{c.title} – {c.issueDate} – {c.issuedBy}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
