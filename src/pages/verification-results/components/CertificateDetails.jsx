import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CertificateDetails = ({ certificate, isValid }) => {
  if (!certificate) return null;

  const skillBadges = certificate?.skills || [];
  
  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Award" size={24} className="text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Certificate Details</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learner Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="User" size={16} className="mr-2 text-primary" />
            Learner Information
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Image
                src={certificate?.learnerPhoto}
                alt={certificate?.learnerPhotoAlt}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-foreground">{certificate?.learnerName}</p>
                <p className="text-sm text-muted-foreground">{certificate?.learnerEmail}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Student ID:</span>
                <span className="font-mono">{certificate?.studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span>{certificate?.learnerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date of Birth:</span>
                <span>{certificate?.dateOfBirth}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="BookOpen" size={16} className="mr-2 text-primary" />
            Course Information
          </h4>
          
          <div className="space-y-3">
            <div>
              <p className="font-medium text-foreground">{certificate?.courseName}</p>
              <p className="text-sm text-muted-foreground">{certificate?.courseCode}</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span>{certificate?.courseDuration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Level:</span>
                <span className="capitalize">{certificate?.courseLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Grade:</span>
                <span className="font-medium text-success">{certificate?.grade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completion:</span>
                <span>{certificate?.completionDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Institution Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="Building" size={16} className="mr-2 text-primary" />
            Issuing Institution
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Image
                src={certificate?.institutionLogo}
                alt={certificate?.institutionLogoAlt}
                className="w-12 h-12 rounded object-contain bg-muted p-1"
              />
              <div>
                <p className="font-medium text-foreground">{certificate?.institutionName}</p>
                <p className="text-sm text-muted-foreground">{certificate?.institutionCode}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">NCVET ID:</span>
                <span className="font-mono">{certificate?.ncvetId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accreditation:</span>
                <span>{certificate?.accreditation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issue Date:</span>
                <span>{certificate?.issueDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Skills Section */}
      {skillBadges?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground flex items-center mb-3">
            <Icon name="Target" size={16} className="mr-2 text-primary" />
            Skills Acquired
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillBadges?.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Certificate ID */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-muted-foreground">Certificate ID:</span>
            <p className="font-mono text-sm mt-1">{certificate?.certificateId}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isValid 
              ? 'bg-success/10 text-success border border-success/20' :'bg-error/10 text-error border border-error/20'
          }`}>
            {isValid ? 'Verified' : 'Invalid'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetails;