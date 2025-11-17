import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages here
import LandingPage from "./pages/landing-page";
import VerifierPortal from "./pages/verifier-portal";
import IssuerAuthentication from "./pages/issuer-authentication";
import LearnerWallet from "./pages/learner-wallet";
import VerificationResults from "./pages/verification-results";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verifier" element={<VerifierPortal />} />
        <Route path="/issuer" element={<IssuerAuthentication />} />
        <Route path="/wallet" element={<LearnerWallet />} />
        <Route path="/results" element={<VerificationResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
