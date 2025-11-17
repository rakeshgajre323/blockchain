import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const certifications = [
  {
    id: 1,
    name: "Skill India",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c9af9c38-1762845922808.png",
    logoAlt: "Skill India government initiative logo with orange and blue colors",
    description: "Official partner of Government of India\'s skill development mission"
  },
  {
    id: 2,
    name: "NCVET",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_13691143e-1762845921406.png",
    logoAlt: "NCVET National Council for Vocational Education and Training official emblem",
    description: "Recognized by National Council for Vocational Education and Training"
  },
  {
    id: 3,
    name: "Digital India",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_15d3bd3bf-1762845919042.png",
    logoAlt: "Digital India initiative logo with tricolor design elements",
    description: "Supporting Digital India transformation initiative"
  }];


  const securityFeatures = [
  {
    icon: "Shield",
    title: "Blockchain Security",
    description: "Tamper-proof credential storage on Ethereum testnet"
  },
  {
    icon: "Lock",
    title: "End-to-End Encryption",
    description: "256-bit SSL encryption for all data transmission"
  },
  {
    icon: "FileCheck",
    title: "IPFS Storage",
    description: "Decentralized storage ensuring permanent accessibility"
  },
  {
    icon: "Verified",
    title: "Digital Signatures",
    description: "Cryptographic signatures for authenticity verification"
  }];


  const statistics = [
  {
    value: "50,000+",
    label: "Certificates Issued",
    icon: "Award"
  },
  {
    value: "500+",
    label: "Partner Institutes",
    icon: "Building"
  },
  {
    value: "99.9%",
    label: "Uptime Guarantee",
    icon: "Activity"
  },
  {
    value: "24/7",
    label: "Support Available",
    icon: "Headphones"
  }];


  return (
    <div className="space-y-8">
      {/* Government Certifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Award" size={20} className="mr-2 text-primary" />
          Government Recognized
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {certifications?.map((cert) =>
          <div key={cert?.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-16 h-8 bg-surface rounded overflow-hidden flex-shrink-0">
                <Image
                src={cert?.logo}
                alt={cert?.logoAlt}
                className="w-full h-full object-contain" />

              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground">{cert?.name}</h4>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Security Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-success" />
          Security Features
        </h3>
        
        <div className="space-y-3">
          {securityFeatures?.map((feature, index) =>
          <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={16} className="text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground">{feature?.title}</h4>
                <p className="text-xs text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Platform Statistics */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="TrendingUp" size={20} className="mr-2 text-primary" />
          Platform Trust
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {statistics?.map((stat, index) =>
          <div key={index} className="text-center p-3 bg-primary/5 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name={stat?.icon} size={16} className="text-primary" />
              </div>
              <div className="text-lg font-bold text-primary">{stat?.value}</div>
              <div className="text-xs text-muted-foreground">{stat?.label}</div>
            </div>
          )}
        </div>
      </div>
      {/* Compliance Information */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Compliance & Standards</p>
            <p>SkillChain Credentials complies with NCVET guidelines, ISO 27001 security standards, and follows Government of India's digital certification framework. All issued credentials are legally valid and recognized by participating employers and institutions.</p>
          </div>
        </div>
      </div>
      {/* Support Contact */}
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-foreground">Need Help?</p>
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Mail" size={12} />
            <span>support@skillchain.edu.in</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Phone" size={12} />
            <span>1800-123-4567</span>
          </div>
        </div>
      </div>
    </div>);

};

export default TrustSignals;