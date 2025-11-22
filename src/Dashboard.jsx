import React from "react";
import StudentDashboard from "./roles/StudentDashboard";
import InstituteDashboard from "./roles/InstituteDashboard";
import CompanyDashboard from "./roles/CompanyDashboard";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name") || "User";

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {name}</h2>

      {role === "student" && <StudentDashboard />}
      {role === "institute" && <InstituteDashboard />}
      {role === "company" && <CompanyDashboard />}
    </div>
  );
};

export default Dashboard;
