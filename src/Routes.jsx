import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Existing pages
import LandingPage from "./pages/landing-page";
import VerifierPortal from "./pages/verifier-portal";
import IssuerAuthentication from "./pages/issuer-authentication";
import LearnerWallet from "./pages/learner-wallet";
import VerificationResults from "./pages/verification-results";

// New login pages
import LoginSelection from "./pages/login-selection";
import LoginStudent from "./pages/login-student";
import LoginInstitute from "./pages/login-institute";
import LoginCompany from "./pages/login-company";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Login Pages */}
        <Route path="/login" element={<LoginSelection />} />
        <Route path="/login/student" element={<LoginStudent />} />
        <Route path="/login/institute" element={<LoginInstitute />} />
        <Route path="/login/company" element={<LoginCompany />} />

        {/* Other Existing Routes */}
        <Route path="/verifier" element={<VerifierPortal />} />
        <Route path="/issuer" element={<IssuerAuthentication />} />
        <Route path="/wallet" element={<LearnerWallet />} />
        <Route path="/results" element={<VerificationResults />} />

        {/* Redirect all unknown URLs to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
