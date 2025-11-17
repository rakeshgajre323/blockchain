import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const BlockchainProof = ({ blockchainData, isValid }) => {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard?.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatHash = (hash) => {
    if (!hash) return 'N/A';
    return `${hash?.substring(0, 10)}...${hash?.substring(hash?.length - 10)}`;
  };

  const proofItems = [
    {
      label: 'Transaction Hash',
      value: blockchainData?.transactionHash,
      field: 'txHash',
      icon: 'Hash',
      link: `https://sepolia.etherscan.io/tx/${blockchainData?.transactionHash}`
    },
    {
      label: 'Block Number',
      value: blockchainData?.blockNumber,
      field: 'blockNumber',
      icon: 'Layers',
      link: `https://sepolia.etherscan.io/block/${blockchainData?.blockNumber}`
    },
    {
      label: 'IPFS Hash',
      value: blockchainData?.ipfsHash,
      field: 'ipfsHash',
      icon: 'Database',
      link: `https://gateway.pinata.cloud/ipfs/${blockchainData?.ipfsHash}`
    },
    {
      label: 'Smart Contract',
      value: blockchainData?.contractAddress,
      field: 'contract',
      icon: 'FileCode',
      link: `https://sepolia.etherscan.io/address/${blockchainData?.contractAddress}`
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={24} className="text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Blockchain Proof</h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isValid 
            ? 'bg-success/10 text-success border border-success/20' :'bg-error/10 text-error border border-error/20'
        }`}>
          {isValid ? 'Verified on Blockchain' : 'Verification Failed'}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proofItems?.map((item) => (
          <div key={item?.field} className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{item?.label}</span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => copyToClipboard(item?.value, item?.field)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-smooth"
                  title="Copy to clipboard"
                >
                  <Icon 
                    name={copiedField === item?.field ? "Check" : "Copy"} 
                    size={14} 
                  />
                </button>
                {item?.link && (
                  <a
                    href={item?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-muted-foreground hover:text-foreground transition-smooth"
                    title="View on blockchain explorer"
                  >
                    <Icon name="ExternalLink" size={14} />
                  </a>
                )}
              </div>
            </div>
            <p className="font-mono text-xs text-muted-foreground break-all">
              {item?.value || 'Not available'}
            </p>
            {item?.field === 'txHash' && (
              <p className="text-xs text-muted-foreground mt-1">
                Displayed: {formatHash(item?.value)}
              </p>
            )}
          </div>
        ))}
      </div>
      {/* Verification Timeline */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Clock" size={16} className="mr-2 text-primary" />
          Verification Timeline
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Certificate Issued</p>
              <p className="text-xs text-muted-foreground">{blockchainData?.issueTimestamp}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Blockchain Anchored</p>
              <p className="text-xs text-muted-foreground">{blockchainData?.anchorTimestamp}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Verification Completed</p>
              <p className="text-xs text-muted-foreground">{blockchainData?.verificationTimestamp}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Gas Fee Information */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Gas Used:</span>
            <p className="font-medium">{blockchainData?.gasUsed?.toLocaleString() || 'N/A'}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Gas Price:</span>
            <p className="font-medium">{blockchainData?.gasPrice || 'N/A'} Gwei</p>
          </div>
          <div>
            <span className="text-muted-foreground">Network:</span>
            <p className="font-medium text-primary">Ethereum Sepolia Testnet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainProof;