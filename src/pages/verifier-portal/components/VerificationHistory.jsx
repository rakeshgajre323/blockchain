import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationHistory = ({ onViewDetails }) => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock verification history data
  const mockHistory = [
    {
      id: 'VER-001',
      certificateId: 'CERT-2024-ABC123',
      candidateName: 'Rajesh Kumar',
      candidateNameAlt: 'Professional headshot of Indian man with black hair in white shirt',
      position: 'Full Stack Developer',
      verificationTime: new Date(Date.now() - 300000), // 5 minutes ago
      status: 'valid',
      issuer: 'TechSkills Institute',
      blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      verifiedBy: 'hr@techcorp.com'
    },
    {
      id: 'VER-002',
      certificateId: 'SKL-DEF456-2024',
      candidateName: 'Priya Sharma',
      candidateNameAlt: 'Professional photo of Indian woman with long black hair in blue blazer',
      position: 'Data Scientist',
      verificationTime: new Date(Date.now() - 1800000), // 30 minutes ago
      status: 'valid',
      issuer: 'DataScience Academy',
      blockchainHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
      verifiedBy: 'recruiter@datatech.in'
    },
    {
      id: 'VER-003',
      certificateId: 'INVALID-789XYZ',
      candidateName: 'Unknown Candidate',
      candidateNameAlt: 'Generic placeholder avatar icon',
      position: 'Software Engineer',
      verificationTime: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'invalid',
      issuer: 'Unknown',
      blockchainHash: null,
      verifiedBy: 'admin@verifytech.com'
    },
    {
      id: 'VER-004',
      certificateId: 'NCVET-789ABC-24',
      candidateName: 'Amit Patel',
      candidateNameAlt: 'Professional headshot of Indian man with short black hair in navy suit',
      position: 'Digital Marketing Specialist',
      verificationTime: new Date(Date.now() - 7200000), // 2 hours ago
      status: 'valid',
      issuer: 'NCVET Certified Institute',
      blockchainHash: '0x3c4d5e6f7890abcdef1234567890abcdef123456',
      verifiedBy: 'hr@marketing.co.in'
    },
    {
      id: 'VER-005',
      certificateId: 'CERT-2024-XYZ789',
      candidateName: 'Sneha Reddy',
      candidateNameAlt: 'Professional photo of Indian woman with shoulder-length black hair in red blazer',
      position: 'UI/UX Designer',
      verificationTime: new Date(Date.now() - 10800000), // 3 hours ago
      status: 'pending',
      issuer: 'Design Institute',
      blockchainHash: '0x4d5e6f7890abcdef1234567890abcdef12345678',
      verifiedBy: 'design@creativestudio.in'
    }
  ];

  useEffect(() => {
    // Load verification history from localStorage or API
    const savedHistory = localStorage.getItem('verificationHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory([...parsed, ...mockHistory]);
      } catch (error) {
        setHistory(mockHistory);
      }
    } else {
      setHistory(mockHistory);
    }
  }, []);

  const getStatusConfig = (status) => {
    const configs = {
      valid: {
        icon: 'CheckCircle',
        color: 'text-success',
        bgColor: 'bg-success/10',
        label: 'Valid'
      },
      invalid: {
        icon: 'XCircle',
        color: 'text-error',
        bgColor: 'bg-error/10',
        label: 'Invalid'
      },
      pending: {
        icon: 'Clock',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        label: 'Pending'
      }
    };
    return configs?.[status] || configs?.pending;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const filteredHistory = history?.filter(item => {
    if (filter === 'all') return true;
    return item?.status === filter;
  });

  const sortedHistory = [...filteredHistory]?.sort((a, b) => {
    if (sortBy === 'recent') {
      return b?.verificationTime - a?.verificationTime;
    } else if (sortBy === 'oldest') {
      return a?.verificationTime - b?.verificationTime;
    } else if (sortBy === 'status') {
      return a?.status?.localeCompare(b?.status);
    }
    return 0;
  });

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('verificationHistory');
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg">
              <Icon name="History" size={20} className="text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">Verification History</h3>
              <p className="text-sm text-muted-foreground">Recent certificate verifications</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            iconName="Trash2"
            iconPosition="left"
            disabled={history?.length === 0}
          >
            Clear History
          </Button>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">Filter:</span>
            <div className="flex space-x-1">
              {['all', 'valid', 'invalid', 'pending']?.map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-smooth ${
                    filter === filterOption
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {filterOption?.charAt(0)?.toUpperCase() + filterOption?.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-2 py-1 text-xs bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="status">By Status</option>
            </select>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {sortedHistory?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileSearch" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">No verification history found</p>
            <p className="text-sm text-muted-foreground">
              {filter === 'all' ?'Start verifying certificates to see history here'
                : `No ${filter} verifications found`
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {sortedHistory?.map((item) => {
              const statusConfig = getStatusConfig(item?.status);
              
              return (
                <div key={item?.id} className="p-4 hover:bg-muted/30 transition-smooth">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${statusConfig?.bgColor}`}>
                        <Icon name={statusConfig?.icon} size={16} className={statusConfig?.color} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-sm text-foreground truncate">
                            {item?.candidateName}
                          </h4>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusConfig?.bgColor} ${statusConfig?.color}`}>
                            {statusConfig?.label}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-1">{item?.position}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="font-mono">{item?.certificateId}</span>
                          <span>{formatTimeAgo(item?.verificationTime)}</span>
                          {item?.issuer && <span>{item?.issuer}</span>}
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(item)}
                      iconName="ExternalLink"
                      iconSize={14}
                    >
                      View
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {sortedHistory?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {sortedHistory?.length} of {history?.length} verifications
            </span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Valid: {history?.filter(h => h?.status === 'valid')?.length}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-error rounded-full"></div>
                <span>Invalid: {history?.filter(h => h?.status === 'invalid')?.length}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span>Pending: {history?.filter(h => h?.status === 'pending')?.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationHistory;