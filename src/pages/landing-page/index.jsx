import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection.jsx";
import RoleSelectionCards from "./components/RoleSelectionCards";
import DemoCertificateViewer from "./components/DemoCertificateViewer";
import TrustIndicators from "./components/TrustIndicators";
import TrustedBy from "./components/TrustedBy"; // ✅ NEW COMPONENT
import Footer from "./components/Footer";

const LandingPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") || "en";
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener("languageChanged", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
    };
  }, []);

  const pageTitle =
    currentLanguage === "hi"
      ? "SkillChain Credentials - ब्लॉकचेन सत्यापित डिजिटल प्रमाणपत्र"
      : "SkillChain Credentials - Blockchain-Verified Digital Certificates";

  const pageDescription =
    currentLanguage === "hi"
      ? "भारत का पहला ब्लॉकचेन-आधारित डिजिटल क्रेडेंशियल प्लेटफॉर्म। तुरंत सत्यापन, छेड़छाड़-प्रूफ प्रमाणपत्र, और सुरक्षित भंडारण।"
      : "India's first blockchain-based digital credential platform. Instant verification, tamper-proof certificates, and secure storage for educational credentials.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="blockchain, digital certificates, skill verification, NCVET, Skill India, credential management, tamper-proof, instant verification"
        />
        <meta name="author" content="SkillChain Credentials" />

        {/* Open Graph Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skillchain.in" />
        <meta property="og:image" content="https://skillchain.in/og-image.jpg" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://skillchain.in/twitter-image.jpg" />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content={currentLanguage} />
        <link rel="canonical" href="https://skillchain.in/landing-page" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "SkillChain Credentials",
            description: pageDescription,
            url: "https://skillchain.in",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
            },
            provider: {
              "@type": "Organization",
              name: "SkillChain Credentials",
              url: "https://skillchain.in",
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header userRole={null} isAuthenticated={false} />

        {/* Main Content */}
        <main className="relative">
          <HeroSection />
          <RoleSelectionCards />
          <TrustIndicators />

          {/* ✅ Add the Trusted By Industry Section */}
          <TrustedBy />

          <DemoCertificateViewer />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
