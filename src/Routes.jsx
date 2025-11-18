import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import your pages
import LandingPage from "./pages/landing-page";
import VerifierPortal from "./pages/verifier-portal";
import IssuerAuthentication from "./pages/issuer-authentication";
import LearnerWallet from "./pages/learner-wallet";
import VerificationResults from "./pages/verification-results";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
