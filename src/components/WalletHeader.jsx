import React from "react";
import { useNavigate } from "react-router-dom";
import AppIcon from "./AppIcon.jsx";
import "./WalletHeader.css"; // <-- this imports your CSS correctly

const WalletHeader = ({ title = "Learner Wallet", onBack }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <header className="wallet-header">
      <div className="left-section">
        <button onClick={handleBack} title="Go back">
          <AppIcon name="arrow-left" size={24} />
        </button>
        <h1>{title}</h1>
      </div>
      <div className="right-section">
        <AppIcon name="wallet" size={24} />
      </div>
    </header>
  );
};

export default WalletHeader;
