import React, { useEffect, useState } from "react";
import { getCertificates } from "../../api";

useEffect(() => {
  const token = localStorage.getItem("token");
  getCertificates(token).then((data) => {
    if (data.success) setCertificates(data.certificates);
  });
}, []);


const StudentDashboard = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/student/certificates", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    if (data.success) setCertificates(data.certificates);
  };

  return (
    <div className="container-box">
      <h3 className="text-xl font-semibold mb-4">Your Certificates</h3>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th>S.No</th>
            <th>Certificate</th>
            <th>Issued By</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((c, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{c.title}</td>
              <td className="p-2">{c.issuedBy}</td>
              <td className="p-2">{c.issueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
